package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
)

func (h *Handler) ListCultivationBatches(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	q := `SELECT c.id, c.product_id, c.quantity_planted, c.quantity_harvested, c.harvest_rate,
c.started_at, c.expected_harvest_at, c.status, c.notes, c.created_at, c.updated_at,
COALESCE(NULLIF(TRIM(c.product_name), ''), p.name) as product_name
FROM cultivation_batches c LEFT JOIN products p ON c.product_id = p.id WHERE 1=1`
	args := []interface{}{}
	n := 1
	if status == "growing" || status == "harvested" {
		q += ` AND c.status = $` + fmt.Sprint(n)
		args = append(args, status)
		n++
	}
	q += ` ORDER BY c.started_at DESC, c.created_at DESC`
	rows, err := h.pool.Query(r.Context(), q, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, productName, cStatus string
		var productID *string
		var quantityPlanted float64
		var quantityHarvested, harvestRate interface{}
		var startedAt interface{}
		var expectedHarvestAt, notes interface{}
		var createdAt, updatedAt interface{}
		if err := rows.Scan(&id, &productID, &quantityPlanted, &quantityHarvested, &harvestRate,
			&startedAt, &expectedHarvestAt, &cStatus, &notes, &createdAt, &updatedAt, &productName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pid := ""
		if productID != nil {
			pid = *productID
		}
		list = append(list, map[string]interface{}{
			"id":                 id,
			"product_id":        pid,
			"quantity_planted":  quantityPlanted,
			"quantity_harvested": quantityHarvested,
			"harvest_rate":      harvestRate,
			"started_at":        startedAt,
			"expected_harvest_at": expectedHarvestAt,
			"status":            cStatus,
			"notes":             notes,
			"created_at":        createdAt,
			"updated_at":        updatedAt,
			"product_name":      productName,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateCultivationBatch(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ProductName       string   `json:"product_name"`
		QuantityPlanted   float64  `json:"quantity_planted"`
		StartedAt         *string  `json:"started_at"`
		ExpectedHarvestAt *string  `json:"expected_harvest_at"`
		Notes             *string  `json:"notes"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	productName := strings.TrimSpace(body.ProductName)
	if productName == "" || body.QuantityPlanted <= 0 {
		http.Error(w, "product_name and quantity_planted required", http.StatusBadRequest)
		return
	}
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO cultivation_batches (product_name, quantity_planted, started_at, expected_harvest_at, notes, status)
VALUES ($1,$2,COALESCE($3::date, CURRENT_DATE),$4::date,$5,'growing') RETURNING id`,
		productName, body.QuantityPlanted, body.StartedAt, body.ExpectedHarvestAt, body.Notes).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}

func (h *Handler) UpdateCultivationBatch(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}
	var body struct {
		QuantityHarvested *float64 `json:"quantity_harvested"`
		HarvestRate       *float64 `json:"harvest_rate"`
		Status            *string  `json:"status"`
		Notes             *string  `json:"notes"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body.Status != nil && *body.Status != "growing" && *body.Status != "harvested" {
		http.Error(w, "status must be growing or harvested", http.StatusBadRequest)
		return
	}

	// Build dynamic update
	updates := []string{}
	args := []interface{}{}
	n := 1
	if body.QuantityHarvested != nil {
		updates = append(updates, "quantity_harvested = $"+fmt.Sprint(n))
		args = append(args, *body.QuantityHarvested)
		n++
	}
	if body.HarvestRate != nil {
		updates = append(updates, "harvest_rate = $"+fmt.Sprint(n))
		args = append(args, *body.HarvestRate)
		n++
	}
	if body.Status != nil {
		updates = append(updates, "status = $"+fmt.Sprint(n))
		args = append(args, *body.Status)
		n++
	}
	if body.Notes != nil {
		updates = append(updates, "notes = $"+fmt.Sprint(n))
		args = append(args, *body.Notes)
		n++
	}
	if len(updates) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
		return
	}
	args = append(args, id)
	query := "UPDATE cultivation_batches SET "
	for i, u := range updates {
		if i > 0 {
			query += ", "
		}
		query += u
	}
	query += " WHERE id = $" + fmt.Sprint(n)
	_, err := h.pool.Exec(r.Context(), query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
}

func (h *Handler) DeleteCultivationBatch(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}
	_, err := h.pool.Exec(r.Context(), `DELETE FROM cultivation_batches WHERE id = $1`, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
}
