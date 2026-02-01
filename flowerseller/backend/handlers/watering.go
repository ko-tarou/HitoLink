package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"flowerseller/backend/middleware"
)

func (h *Handler) ListWateringRecords(w http.ResponseWriter, r *http.Request) {
	batchID := r.URL.Query().Get("inventory_batch_id")
	nextBefore := r.URL.Query().Get("next_watering_before")
	q := `SELECT w.id, w.inventory_batch_id, w.watered_at, w.next_watering_at, w.created_by, w.created_at,
b.id as b_id, p.name as p_name
FROM watering_records w JOIN inventory_batches b ON w.inventory_batch_id = b.id JOIN products p ON b.product_id = p.id WHERE 1=1`
	args := []interface{}{}
	n := 1
	if batchID != "" {
		q += ` AND w.inventory_batch_id = $` + fmt.Sprint(n)
		args = append(args, batchID)
		n++
	}
	if nextBefore != "" {
		q += ` AND w.next_watering_at <= $` + fmt.Sprint(n) + ` AND w.next_watering_at IS NOT NULL`
		args = append(args, nextBefore)
		n++
	}
	q += ` ORDER BY w.watered_at DESC`
	rows, err := h.pool.Query(r.Context(), q, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, batchID string
		var wateredAt, nextWateringAt, createdAt interface{}
		var createdBy *string
		var bID, pName string
		if err := rows.Scan(&id, &batchID, &wateredAt, &nextWateringAt, &createdBy, &createdAt, &bID, &pName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id": id, "inventory_batch_id": batchID, "watered_at": wateredAt, "next_watering_at": nextWateringAt,
			"created_by": createdBy, "created_at": createdAt,
			"inventory_batches": map[string]interface{}{"products": map[string]interface{}{"name": pName}},
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateWateringRecord(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	var body struct {
		InventoryBatchID string  `json:"inventory_batch_id"`
		NextWateringAt   *string `json:"next_watering_at"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var id string
	var createdBy *string
	if claims != nil {
		createdBy = &claims.UserID
	}
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO watering_records (inventory_batch_id, next_watering_at, created_by) VALUES ($1,$2::timestamptz,$3) RETURNING id`,
		body.InventoryBatchID, body.NextWateringAt, createdBy).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}
