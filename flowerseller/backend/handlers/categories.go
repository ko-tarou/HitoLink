package handlers

import (
	"encoding/json"
	"net/http"
)

func (h *Handler) ListCategories(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT id, name, parent_id, sort_order, created_at, updated_at FROM categories ORDER BY sort_order`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, name string
		var parentID *string
		var sortOrder int
		var createdAt, updatedAt interface{}
		if err := rows.Scan(&id, &name, &parentID, &sortOrder, &createdAt, &updatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id": id, "name": name, "parent_id": parentID, "sort_order": sortOrder,
			"created_at": createdAt, "updated_at": updatedAt,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateCategory(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name      string  `json:"name"`
		ParentID  *string `json:"parent_id"`
		SortOrder int     `json:"sort_order"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO categories (name, parent_id, sort_order) VALUES ($1,$2,$3) RETURNING id`,
		body.Name, body.ParentID, body.SortOrder).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"id": id})
}
