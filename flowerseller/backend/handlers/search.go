package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"flowerseller/backend/jpn"
)

func (h *Handler) SearchProducts(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")
	limitStr := r.URL.Query().Get("limit")
	limit := 20
	if limitStr != "" {
		if n, err := strconv.Atoi(limitStr); err == nil && n > 0 && n <= 100 {
			limit = n
		}
	}
	q = strings.TrimSpace(q)
	if q == "" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]interface{}{})
		return
	}
	// Normalized search (ばら/バラ/薔薇 match) - same as similar products
	queryNorm := jpn.NormalizeForSimilarity(q)
	list, err := h.searchByNormalized(r.Context(), queryNorm, limit)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
