package handlers

import (
	"encoding/json"
	"net/http"
)

func (h *Handler) SearchProducts(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")
	limit := r.URL.Query().Get("limit")
	if limit == "" {
		limit = "20"
	}
	if q == "" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]interface{}{})
		return
	}
	// Text search (ILIKE) - no pgvector
	rows, err := h.pool.Query(r.Context(),
		`SELECT id, name, type::text, base_price FROM products
WHERE name ILIKE '%'||$1||'%' OR description ILIKE '%'||$1||'%' LIMIT 20`, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, name, ptype string
		var basePrice float64
		if err := rows.Scan(&id, &name, &ptype, &basePrice); err != nil {
			continue
		}
		list = append(list, map[string]interface{}{
			"id": id, "name": name, "type": ptype, "base_price": basePrice, "similarity": 1.0,
		})
	}
	_ = limit
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
