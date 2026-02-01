package handlers

import (
	"encoding/json"
	"net/http"

	"flowerseller/backend/middleware"
)

func (h *Handler) ListSales(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT s.id, s.total_amount, s.payment_method::text, s.created_by, s.created_at
FROM sales s ORDER BY s.created_at DESC LIMIT 50`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id string
		var totalAmount float64
		var paymentMethod string
		var createdBy *string
		var createdAt interface{}
		if err := rows.Scan(&id, &totalAmount, &paymentMethod, &createdBy, &createdAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		itemRows, _ := h.pool.Query(r.Context(), `SELECT si.id, si.product_id, si.quantity, si.unit_price, si.subtotal, p.name
FROM sale_items si JOIN products p ON si.product_id = p.id WHERE si.sale_id = $1`, id)
		var items []map[string]interface{}
		if itemRows != nil {
			for itemRows.Next() {
				var iid, pid, pname string
				var qty, up, sub float64
				_ = itemRows.Scan(&iid, &pid, &qty, &up, &sub, &pname)
				items = append(items, map[string]interface{}{"id": iid, "product_id": pid, "quantity": qty, "unit_price": up, "subtotal": sub, "products": map[string]interface{}{"name": pname}})
			}
			itemRows.Close()
		}
		list = append(list, map[string]interface{}{
			"id": id, "total_amount": totalAmount, "payment_method": paymentMethod,
			"created_by": createdBy, "created_at": createdAt, "sale_items": items,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateSale(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	var body struct {
		TotalAmount   float64 `json:"total_amount"`
		PaymentMethod string  `json:"payment_method"`
		Items         []struct {
			ProductID string  `json:"product_id"`
			Quantity  float64 `json:"quantity"`
			UnitPrice float64 `json:"unit_price"`
		} `json:"items"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var userID *string
	if claims != nil && claims.UserID != "" {
		userID = &claims.UserID
	}
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO sales (total_amount, payment_method, created_by) VALUES ($1,$2,$3) RETURNING id`,
		body.TotalAmount, body.PaymentMethod, userID).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	for _, it := range body.Items {
		subtotal := it.Quantity * it.UnitPrice
		_, _ = h.pool.Exec(r.Context(),
			`INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES ($1,$2,$3,$4,$5)`,
			id, it.ProductID, it.Quantity, it.UnitPrice, subtotal)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"id": id})
}
