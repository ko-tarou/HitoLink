package handlers

import (
	"encoding/json"
	"net/http"

	"flowerseller/backend/middleware"
)

func (h *Handler) ListInboundRecords(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT r.id, r.source_type, r.raw_text, r.image_url, r.status, r.created_by, r.created_at, r.processed_at
FROM inbound_records r ORDER BY r.created_at DESC LIMIT 30`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, sourceType, status string
		var rawText, imageURL interface{}
		var createdBy *string
		var createdAt, processedAt interface{}
		if err := rows.Scan(&id, &sourceType, &rawText, &imageURL, &status, &createdBy, &createdAt, &processedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// Load items for each record
		itemRows, _ := h.pool.Query(r.Context(), `SELECT i.id, i.product_id, i.quantity, i.unit_price, p.name
FROM inbound_items i JOIN products p ON i.product_id = p.id WHERE i.inbound_record_id = $1`, id)
		var items []map[string]interface{}
		if itemRows != nil {
			for itemRows.Next() {
				var iid, pid string
				var qty float64
				var up interface{}
				var pname string
				_ = itemRows.Scan(&iid, &pid, &qty, &up, &pname)
				items = append(items, map[string]interface{}{"id": iid, "product_id": pid, "quantity": qty, "unit_price": up, "products": map[string]interface{}{"name": pname}})
			}
			itemRows.Close()
		}
		list = append(list, map[string]interface{}{
			"id": id, "source_type": sourceType, "raw_text": rawText, "image_url": imageURL,
			"status": status, "created_by": createdBy, "created_at": createdAt, "processed_at": processedAt,
			"inbound_items": items,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) CreateInboundRecord(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	var body struct {
		SourceType string  `json:"source_type"`
		RawText    *string `json:"raw_text"`
		ImageURL   *string `json:"image_url"`
		Items      []struct {
			ProductID string   `json:"product_id"`
			Quantity  float64  `json:"quantity"`
			UnitPrice *float64 `json:"unit_price"`
		} `json:"items"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	sourceType := body.SourceType
	if sourceType == "" {
		sourceType = "ocr"
	}
	var userID *string
	if claims != nil {
		userID = &claims.UserID
	}
	var id string
	err := h.pool.QueryRow(r.Context(),
		`INSERT INTO inbound_records (source_type, raw_text, image_url, status, created_by, processed_at)
VALUES ($1,$2,$3,'processed',$4,now()) RETURNING id`,
		sourceType, body.RawText, body.ImageURL, userID).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	for _, it := range body.Items {
		_, _ = h.pool.Exec(r.Context(),
			`INSERT INTO inbound_items (inbound_record_id, product_id, quantity, unit_price) VALUES ($1,$2,$3,$4)`,
			id, it.ProductID, it.Quantity, it.UnitPrice)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}
