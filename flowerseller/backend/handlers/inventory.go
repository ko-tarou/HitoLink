package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (h *Handler) ListInventoryBatches(w http.ResponseWriter, r *http.Request) {
	productID := r.URL.Query().Get("product_id")
	disposalBefore := r.URL.Query().Get("disposal_before")
	q := `SELECT b.id, b.product_id, b.quantity, b.received_at, b.disposal_date, b.location, b.created_at, b.updated_at,
p.id as p_id, p.name as p_name, p.type::text as p_type, p.base_price
FROM inventory_batches b JOIN products p ON b.product_id = p.id WHERE 1=1`
	args := []interface{}{}
	n := 1
	if productID != "" {
		q += ` AND b.product_id = $` + fmt.Sprint(n)
		args = append(args, productID)
		n++
	}
	if disposalBefore != "" {
		q += ` AND b.disposal_date <= $` + fmt.Sprint(n)
		args = append(args, disposalBefore)
		n++
	}
	q += ` ORDER BY b.received_at DESC`
	rows, err := h.pool.Query(r.Context(), q, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, productID string
		var quantity float64
		var receivedAt, disposalDate, location interface{}
		var createdAt, updatedAt interface{}
		var pID, pName, pType string
		var basePrice float64
		if err := rows.Scan(&id, &productID, &quantity, &receivedAt, &disposalDate, &location, &createdAt, &updatedAt, &pID, &pName, &pType, &basePrice); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id": id, "product_id": productID, "quantity": quantity, "received_at": receivedAt,
			"disposal_date": disposalDate, "location": location, "created_at": createdAt, "updated_at": updatedAt,
			"products": map[string]interface{}{"id": pID, "name": pName, "type": pType, "base_price": basePrice},
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateInventoryBatch(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ProductID   string  `json:"product_id"`
		Quantity    float64 `json:"quantity"`
		ReceivedAt  *string `json:"received_at"`
		DisposalDate *string `json:"disposal_date"`
		Location    *string `json:"location"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO inventory_batches (product_id, quantity, received_at, disposal_date, location)
VALUES ($1,$2,COALESCE($3::timestamptz, now()),$4::date,$5) RETURNING id`,
		body.ProductID, body.Quantity, body.ReceivedAt, body.DisposalDate, body.Location).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}

func (h *Handler) UpdateInventoryBatch(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	_, err := h.pool.Exec(r.Context(),
		`UPDATE inventory_batches SET quantity=COALESCE($2,quantity), disposal_date=COALESCE($3::date,disposal_date), location=COALESCE($4,location) WHERE id=$1`,
		id, body["quantity"], body["disposal_date"], body["location"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
