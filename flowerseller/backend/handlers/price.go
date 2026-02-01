package handlers

import (
	"encoding/json"
	"math"
	"net/http"

	"github.com/jackc/pgx/v5"

	"flowerseller/backend/middleware"
)

func (h *Handler) ListPriceAdjustmentHistory(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT h.id, h.adjustment_type, h.value, h.category_id, h.created_by, h.created_at, c.name as category_name
FROM price_adjustment_history h
LEFT JOIN categories c ON h.category_id = c.id
ORDER BY h.created_at DESC LIMIT 30`)
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
			"products":    nil,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

// scope: "all" | "category" | "product"
// unit: "percent" | "yen"
// operation: "increase" | "decrease" | "multiply" | "discount"
// Legacy: value + category_id only → scope=all|category, unit=percent, operation=increase
func (h *Handler) ApplyPriceAdjustment(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	var body struct {
		Scope      string  `json:"scope"`       // "all" | "category" | "product"
		ProductID  *string `json:"product_id"`
		CategoryID *string `json:"category_id"`
		Value      float64 `json:"value"`
		Unit       string  `json:"unit"`      // "percent" | "yen"
		Operation  string  `json:"operation"` // "increase" | "decrease" | "multiply" | "discount"
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Scope == "" {
		if body.CategoryID != nil && *body.CategoryID != "" {
			body.Scope = "category"
		} else {
			body.Scope = "all"
		}
	}
	if body.Unit == "" {
		body.Unit = "percent"
	}
	if body.Operation == "" {
		body.Operation = "increase"
	}

	var pgxRows pgx.Rows
	var rowErr error
	switch body.Scope {
	case "product":
		if body.ProductID == nil || *body.ProductID == "" {
			http.Error(w, "product_id required when scope=product", http.StatusBadRequest)
			return
		}
		pgxRows, rowErr = h.pool.Query(r.Context(), `SELECT id, base_price FROM products WHERE id = $1`, *body.ProductID)
	case "category":
		if body.CategoryID == nil || *body.CategoryID == "" {
			http.Error(w, "category_id required when scope=category", http.StatusBadRequest)
			return
		}
		pgxRows, rowErr = h.pool.Query(r.Context(), `SELECT id, base_price FROM products WHERE category_id = $1`, *body.CategoryID)
	default:
		pgxRows, rowErr = h.pool.Query(r.Context(), `SELECT id, base_price FROM products`)
	}
	if rowErr != nil {
		http.Error(w, rowErr.Error(), http.StatusInternalServerError)
		return
	}
	defer pgxRows.Close()

	computeNewPrice := func(basePrice float64) int64 {
		var newPrice float64
		switch body.Unit {
		case "yen":
			switch body.Operation {
			case "increase":
				newPrice = basePrice + body.Value
			case "decrease", "discount":
				newPrice = basePrice - body.Value
			case "multiply":
				newPrice = basePrice + body.Value
			default:
				newPrice = basePrice
			}
		default: // percent
			switch body.Operation {
			case "increase":
				newPrice = basePrice * (1 + body.Value/100)
			case "decrease":
				newPrice = basePrice * (1 - body.Value/100)
			case "multiply":
				newPrice = basePrice * (body.Value / 100)
			case "discount":
				newPrice = basePrice * (1 - body.Value/100)
			default:
				newPrice = basePrice
			}
		}
		if newPrice < 0 {
			newPrice = 0
		}
		return int64(math.Round(newPrice))
	}

	count := 0
	for pgxRows.Next() {
		var id string
		var basePrice float64
		if err := pgxRows.Scan(&id, &basePrice); err != nil {
			continue
		}
		newPrice := computeNewPrice(basePrice)
		_, _ = h.pool.Exec(r.Context(), `UPDATE products SET base_price = $2 WHERE id = $1`, id, newPrice)
		count++
	}

	createdBy := "a0000000-0000-0000-0000-000000000001"
	if claims != nil && claims.UserID != "" {
		createdBy = claims.UserID
	}
	adjType := body.Unit + "_" + body.Operation
	_, _ = h.pool.Exec(r.Context(),
		`INSERT INTO price_adjustment_history (adjustment_type, value, category_id, created_by) VALUES ($1,$2,$3,$4)`,
		adjType, body.Value, body.CategoryID, createdBy)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"updated": count})
}
