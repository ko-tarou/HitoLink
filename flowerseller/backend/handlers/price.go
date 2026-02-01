package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/jackc/pgx/v5"

	"flowerseller/backend/middleware"
)

func (h *Handler) ListPriceAdjustmentHistory(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT h.id, h.adjustment_type, h.value, h.category_id, h.created_by, h.created_at, c.name as category_name
FROM price_adjustment_history h LEFT JOIN categories c ON h.category_id = c.id ORDER BY h.created_at DESC LIMIT 30`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, adjType string
		var value float64
		var categoryID *string
		var createdBy string
		var createdAt interface{}
		var categoryName *string
		if err := rows.Scan(&id, &adjType, &value, &categoryID, &createdBy, &createdAt, &categoryName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id": id, "adjustment_type": adjType, "value": value, "category_id": categoryID,
			"created_by": createdBy, "created_at": createdAt,
			"categories": map[string]interface{}{"name": categoryName},
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) ApplyPriceAdjustment(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	var body struct {
		Value      float64 `json:"value"`
		CategoryID *string `json:"category_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var rowErr error
	var pgxRows pgx.Rows
	if body.CategoryID != nil && *body.CategoryID != "" {
		pgxRows, rowErr = h.pool.Query(r.Context(), `SELECT id, base_price FROM products WHERE category_id = $1`, *body.CategoryID)
	} else {
		pgxRows, rowErr = h.pool.Query(r.Context(), `SELECT id, base_price FROM products`)
	}
	if rowErr != nil {
		http.Error(w, rowErr.Error(), http.StatusInternalServerError)
		return
	}
	defer pgxRows.Close()
	multiplier := 1 + body.Value/100
	count := 0
	for pgxRows.Next() {
		var id string
		var basePrice float64
		if err := pgxRows.Scan(&id, &basePrice); err != nil {
			continue
		}
		newPrice := int(basePrice * multiplier)
		if newPrice < 0 {
			newPrice = 0
		}
		_, _ = h.pool.Exec(r.Context(), `UPDATE products SET base_price = $2 WHERE id = $1`, id, newPrice)
		count++
	}
	createdBy := "a0000000-0000-0000-0000-000000000001" // 未ログイン時は seed のデモユーザー
	if claims != nil && claims.UserID != "" {
		createdBy = claims.UserID
	}
	_, _ = h.pool.Exec(r.Context(),
		`INSERT INTO price_adjustment_history (adjustment_type, value, category_id, created_by) VALUES ('percentage',$1,$2,$3)`,
		body.Value, body.CategoryID, createdBy)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"updated": count})
}
