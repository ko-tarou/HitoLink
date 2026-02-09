package handlers

import (
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"flowerseller/backend/middleware"
)

// GetMe returns the current user's profile (organization_name, business_type).
// Requires JWT; returns 401 if not authenticated.
func (h *Handler) GetMe(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	if claims == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var orgName string
	var businessType *string
	err := h.pool.QueryRow(r.Context(),
		`SELECT organization_name, business_type FROM users WHERE id = $1`,
		claims.UserID).Scan(&orgName, &businessType)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	bt := ""
	if businessType != nil {
		bt = *businessType
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"organization_name": orgName,
		"business_type":     bt,
	})
}

// UpdateMe updates the current user's password and/or business_type.
// Body: { "password": "newpass" } and/or { "business_type": "seller"|"producer"|"intermediary"|"" }
// Requires JWT.
func (h *Handler) UpdateMe(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	if claims == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var body struct {
		Password     string `json:"password"`
		BusinessType string `json:"business_type"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body.BusinessType != "" && body.BusinessType != "seller" && body.BusinessType != "producer" && body.BusinessType != "intermediary" {
		http.Error(w, "business_type must be seller, producer, or intermediary", http.StatusBadRequest)
		return
	}

	if body.Password != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "hash failed", http.StatusInternalServerError)
			return
		}
		if body.BusinessType != "" {
			_, err = h.pool.Exec(r.Context(),
				`UPDATE users SET password_hash = $1, business_type = $2 WHERE id = $3`,
				string(hash), body.BusinessType, claims.UserID)
		} else {
			_, err = h.pool.Exec(r.Context(),
				`UPDATE users SET password_hash = $1, business_type = NULL WHERE id = $2`,
				string(hash), claims.UserID)
		}
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else if body.BusinessType != "" {
		_, err := h.pool.Exec(r.Context(),
			`UPDATE users SET business_type = $1 WHERE id = $2`,
			body.BusinessType, claims.UserID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		_, err := h.pool.Exec(r.Context(),
			`UPDATE users SET business_type = NULL WHERE id = $1`,
			claims.UserID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"ok": "true"})
}
