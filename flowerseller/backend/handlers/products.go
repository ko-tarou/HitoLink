package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"unicode"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
	"flowerseller/backend/jpn"
)

func (h *Handler) ListProducts(w http.ResponseWriter, r *http.Request) {
	sortBy := r.URL.Query().Get("sort_by")
	if sortBy == "" {
		sortBy = "updated_at"
	}
	order := r.URL.Query().Get("order")
	if order != "asc" && order != "desc" {
		order = "desc"
	}
	typeFilter := r.URL.Query().Get("type")
	categoryID := r.URL.Query().Get("category_id")

	orderCol := "updated_at"
	switch sortBy {
	case "name", "base_price":
		orderCol = sortBy
	}
	orderDir := "DESC"
	if order == "asc" {
		orderDir = "ASC"
	}
	q := `SELECT p.id, p.name, p.type::text, p.category_id, p.base_price, p.description, p.disposal_days, p.created_at, p.updated_at, c.name as category_name
FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`
	args := []interface{}{}
	argNum := 1
	if typeFilter != "" {
		q += ` AND p.type = $` + fmt.Sprint(argNum)
		args = append(args, typeFilter)
		argNum++
	}
	if categoryID != "" {
		q += ` AND p.category_id = $` + fmt.Sprint(argNum)
		args = append(args, categoryID)
		argNum++
	}
	q += ` ORDER BY p.` + orderCol + ` ` + orderDir
	rows, err := h.pool.Query(r.Context(), q, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, name, ptype string
		var categoryID *string
		var basePrice float64
		var description *string
		var disposalDays *int
		var categoryName *string
		var createdAt, updatedAt interface{}
		if err := rows.Scan(&id, &name, &ptype, &categoryID, &basePrice, &description, &disposalDays, &createdAt, &updatedAt, &categoryName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id": id, "name": name, "type": ptype, "category_id": categoryID,
			"base_price": basePrice, "description": description, "disposal_days": disposalDays,
			"created_at": createdAt, "updated_at": updatedAt,
			"categories": map[string]interface{}{"name": categoryName},
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var name, ptype string
	var categoryID *string
	var basePrice float64
	var description *string
	var disposalDays *int
	var categoryName *string
	var createdAt, updatedAt interface{}
	err := h.pool.QueryRow(r.Context(),
		`SELECT p.id, p.name, p.type::text, p.category_id, p.base_price, p.description, p.disposal_days, p.created_at, p.updated_at, c.name
FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1`, id).
		Scan(&id, &name, &ptype, &categoryID, &basePrice, &description, &disposalDays, &createdAt, &updatedAt, &categoryName)
	if err == pgx.ErrNoRows {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id": id, "name": name, "type": ptype, "category_id": categoryID,
		"base_price": basePrice, "description": description, "disposal_days": disposalDays,
		"created_at": createdAt, "updated_at": updatedAt,
		"categories": map[string]interface{}{"name": categoryName},
	})
}

func (h *Handler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name        string  `json:"name"`
		Type        string  `json:"type"`
		CategoryID  *string `json:"category_id"`
		BasePrice   float64 `json:"base_price"`
		Description *string `json:"description"`
		DisposalDays *int   `json:"disposal_days"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	norm := jpn.NormalizeForSimilarity(body.Name)
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO products (name, name_normalized, type, category_id, base_price, description, disposal_days)
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
		body.Name, norm, body.Type, body.CategoryID, body.BasePrice, body.Description, body.DisposalDays).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}

func (h *Handler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	// Simple: only allow name, type, category_id, base_price, description, disposal_days
	_, err := h.pool.Exec(r.Context(),
		`UPDATE products SET name=COALESCE($2,name), type=COALESCE($3,type), category_id=COALESCE($4,category_id),
base_price=COALESCE($5,base_price), description=COALESCE($6,description), disposal_days=COALESCE($7,disposal_days) WHERE id=$1`,
		id, body["name"], body["type"], body["category_id"], body["base_price"], body["description"], body["disposal_days"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// keep name_normalized in sync (recompute from current name)
	var nameVal string
	if err := h.pool.QueryRow(r.Context(), `SELECT name FROM products WHERE id = $1`, id).Scan(&nameVal); err == nil {
		norm := jpn.NormalizeForSimilarity(nameVal)
		_, _ = h.pool.Exec(r.Context(), `UPDATE products SET name_normalized = $1 WHERE id = $2`, norm, id)
	}
	w.WriteHeader(http.StatusOK)
}

func (h *Handler) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	_, err := h.pool.Exec(r.Context(), `DELETE FROM products WHERE id = $1`, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// normalizeQuery trims and collapses spaces for consistent matching (no API, free).
func normalizeQuery(s string) string {
	s = strings.TrimSpace(s)
	var b strings.Builder
	var prevSpace bool
	for _, r := range s {
		if unicode.IsSpace(r) {
			if !prevSpace {
				b.WriteRune(' ')
				prevSpace = true
			}
		} else {
			b.WriteRune(r)
			prevSpace = false
		}
	}
	return strings.TrimSpace(b.String())
}

// similarByNormalized fetches products and filters in Go by normalized name (ばら vs バラ→ばら). Works without name_normalized column.
func (h *Handler) similarByNormalized(ctx context.Context, nameNorm string, limit int) ([]map[string]interface{}, error) {
	rows, err := h.pool.Query(ctx, `SELECT id, name, type::text, base_price FROM products ORDER BY name LIMIT 500`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []map[string]interface{}
	for rows.Next() {
		var id, nameVal, ptype string
		var basePrice float64
		if err := rows.Scan(&id, &nameVal, &ptype, &basePrice); err != nil {
			return nil, err
		}
		n := jpn.NormalizeForSimilarity(nameVal)
		if nameNorm != "" && (strings.Contains(n, nameNorm) || strings.Contains(nameNorm, n)) {
			out = append(out, map[string]interface{}{
				"id": id, "name": nameVal, "type": ptype, "base_price": basePrice, "similarity": 1.0,
			})
			if len(out) >= limit {
				break
			}
		}
	}
	return out, nil
}

// searchByNormalized fetches products and filters by normalized name/description. Only matches when
// product name (or description) contains the query — not the reverse, so "ばら" won't match 菊 or サンプル.
func (h *Handler) searchByNormalized(ctx context.Context, queryNorm string, limit int) ([]map[string]interface{}, error) {
	if queryNorm == "" {
		return nil, nil
	}
	rows, err := h.pool.Query(ctx, `SELECT id, name, COALESCE(description,''), type::text, base_price FROM products ORDER BY name LIMIT 500`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []map[string]interface{}
	for rows.Next() {
		var id, nameVal, descriptionVal, ptype string
		var basePrice float64
		if err := rows.Scan(&id, &nameVal, &descriptionVal, &ptype, &basePrice); err != nil {
			return nil, err
		}
		nName := jpn.NormalizeForSimilarity(nameVal)
		nDesc := jpn.NormalizeForSimilarity(descriptionVal)
		// Strict: only when name or description contains the full query (not when query contains name)
		matches := strings.Contains(nName, queryNorm) || strings.Contains(nDesc, queryNorm)
		if matches {
			out = append(out, map[string]interface{}{
				"id": id, "name": nameVal, "type": ptype, "base_price": basePrice, "similarity": 1.0,
			})
			if len(out) >= limit {
				break
			}
		}
	}
	return out, nil
}

// SimilarProducts returns products with similar name. Uses in-memory normalized match first (ばら/バラ/薔薇).
func (h *Handler) SimilarProducts(w http.ResponseWriter, r *http.Request) {
	rawName := normalizeQuery(r.URL.Query().Get("name"))
	nameNorm := jpn.NormalizeForSimilarity(rawName)
	limitStr := r.URL.Query().Get("limit")
	limit := 5
	if limitStr != "" {
		if n, err := strconv.Atoi(limitStr); err == nil && n > 0 && n <= 20 {
			limit = n
		}
	}
	if rawName == "" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]interface{}{})
		return
	}

	// Always use in-memory normalized match (DB schema independent; ばら matches バラ)
	list, err := h.similarByNormalized(r.Context(), nameNorm, limit)
	if err != nil {
		log.Printf("[SimilarProducts] similarByNormalized err: %v (name=%q nameNorm=%q)", err, rawName, nameNorm)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Printf("[SimilarProducts] name=%q nameNorm=%q limit=%d results=%d", rawName, nameNorm, limit, len(list))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
