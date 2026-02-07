package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"flowerseller/backend/middleware"

	"github.com/go-chi/chi/v5"
)

// ListMarketplaceListings は全生産者の出品一覧を返す（販売者・仲介者の直接購入用）。生産者名を JOIN で付与。
func (h *Handler) ListMarketplaceListings(w http.ResponseWriter, r *http.Request) {
	rows, err := h.pool.Query(r.Context(),
		`SELECT l.id, l.product_name, l.price, l.quantity, l.delivery_option, l.image_url, l.description, l.created_at, l.updated_at,
u.id as producer_id, u.organization_name as producer_name
FROM direct_sale_listings l
JOIN users u ON l.created_by = u.id
ORDER BY l.updated_at DESC LIMIT 100`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, productName, deliveryOption, producerID, producerName string
		var price, quantity float64
		var imageURL, description *string
		var createdAt, updatedAt interface{}
		if err := rows.Scan(&id, &productName, &price, &quantity, &deliveryOption, &imageURL, &description, &createdAt, &updatedAt, &producerID, &producerName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id":              id,
			"product_name":    productName,
			"price":           price,
			"quantity":        quantity,
			"delivery_option": deliveryOption,
			"image_url":       imageURL,
			"description":     description,
			"created_at":      createdAt,
			"updated_at":      updatedAt,
			"producer_id":     producerID,
			"producer_name":   producerName,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

// ListDirectSaleListings はログイン中の生産者の出品一覧を返す。
func (h *Handler) ListDirectSaleListings(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	if claims == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	rows, err := h.pool.Query(r.Context(),
		`SELECT id, product_name, price, quantity, delivery_option, image_url, description, created_at, updated_at
FROM direct_sale_listings WHERE created_by = $1 ORDER BY updated_at DESC`,
		claims.UserID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []map[string]interface{}
	for rows.Next() {
		var id, productName, deliveryOption string
		var price, quantity float64
		var imageURL, description *string
		var createdAt, updatedAt interface{}
		if err := rows.Scan(&id, &productName, &price, &quantity, &deliveryOption, &imageURL, &description, &createdAt, &updatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, map[string]interface{}{
			"id":              id,
			"product_name":    productName,
			"price":           price,
			"quantity":        quantity,
			"delivery_option": deliveryOption,
			"image_url":       imageURL,
			"description":     description,
			"created_at":      createdAt,
			"updated_at":      updatedAt,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

// UpdateDirectSaleListing は自分の出品を更新する。created_by が一致する場合のみ。
func (h *Handler) UpdateDirectSaleListing(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	if claims == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}
	var body struct {
		ProductName    *string  `json:"product_name"`
		Price          *float64 `json:"price"`
		Quantity       *float64 `json:"quantity"`
		DeliveryOption *string  `json:"delivery_option"`
		ImageURL       *string  `json:"image_url"`
		Description    *string  `json:"description"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.DeliveryOption != nil && *body.DeliveryOption != "pickup_only" && *body.DeliveryOption != "delivery_only" && *body.DeliveryOption != "both" {
		http.Error(w, "delivery_option must be pickup_only, delivery_only, or both", http.StatusBadRequest)
		return
	}
	updates := []string{}
	args := []interface{}{}
	n := 1
	if body.ProductName != nil {
		updates = append(updates, "product_name = $"+fmt.Sprint(n))
		args = append(args, strings.TrimSpace(*body.ProductName))
		n++
	}
	if body.Price != nil {
		updates = append(updates, "price = $"+fmt.Sprint(n))
		args = append(args, *body.Price)
		n++
	}
	if body.Quantity != nil {
		updates = append(updates, "quantity = $"+fmt.Sprint(n))
		args = append(args, *body.Quantity)
		n++
	}
	if body.DeliveryOption != nil {
		updates = append(updates, "delivery_option = $"+fmt.Sprint(n))
		args = append(args, *body.DeliveryOption)
		n++
	}
	if body.ImageURL != nil {
		updates = append(updates, "image_url = $"+fmt.Sprint(n))
		args = append(args, *body.ImageURL)
		n++
	}
	if body.Description != nil {
		updates = append(updates, "description = $"+fmt.Sprint(n))
		args = append(args, *body.Description)
		n++
	}
	if len(updates) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
		return
	}
	args = append(args, id, claims.UserID)
	query := `UPDATE direct_sale_listings SET ` + strings.Join(updates, ", ") +
		` WHERE id = $` + fmt.Sprint(n) + ` AND created_by = $` + fmt.Sprint(n+1)
	result, err := h.pool.Exec(r.Context(), query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if result.RowsAffected() == 0 {
		http.Error(w, "not found or forbidden", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
}
