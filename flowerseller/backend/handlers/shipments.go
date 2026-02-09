package handlers

import (
	"encoding/json"
	"net/http"
)

// ListShipments は出荷履歴を出荷日時の新しい順で返す（読取専用）。
func (h *Handler) ListShipments(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT id, shipped_at, destination, notes, created_at
FROM shipments ORDER BY shipped_at DESC LIMIT 50`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id string
		var shippedAt, createdAt interface{}
		var destination, notes *string
		if err := rows.Scan(&id, &shippedAt, &destination, &notes, &createdAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		itemRows, _ := h.pool.Query(r.Context(),
			`SELECT id, product_name, quantity FROM shipment_items WHERE shipment_id = $1 ORDER BY created_at`,
			id)
		var items []map[string]interface{}
		if itemRows != nil {
			for itemRows.Next() {
				var iid, pname string
				var qty float64
				_ = itemRows.Scan(&iid, &pname, &qty)
				items = append(items, map[string]interface{}{
					"id": iid, "product_name": pname, "quantity": qty,
				})
			}
			itemRows.Close()
		}
		list = append(list, map[string]interface{}{
			"id":          id,
			"shipped_at":  shippedAt,
			"destination": destination,
			"notes":       notes,
			"created_at":  createdAt,
			"items":       items,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
