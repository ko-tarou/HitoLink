package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestListCategories_EmptyDB_Returns200AndEmptyArray(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Get("/categories", h.ListCategories)

	req := httptest.NewRequest(http.MethodGet, "/categories", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
	var list []interface{}
	if err := json.NewDecoder(rec.Body).Decode(&list); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	if len(list) != 0 {
		t.Errorf("expected empty list, got len %d", len(list))
	}
}

func TestListCategories_DBError_Returns500(t *testing.T) {
	h := New(&mockQuerier{queryErr: errMockDB}, "secret")
	r := chi.NewRouter()
	r.Get("/categories", h.ListCategories)

	req := httptest.NewRequest(http.MethodGet, "/categories", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("expected 500, got %d", rec.Code)
	}
}

func TestCreateCategory_InvalidJSON_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Post("/categories", h.CreateCategory)

	req := httptest.NewRequest(http.MethodPost, "/categories", bytes.NewReader([]byte("not json")))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestCreateCategory_DBError_Returns500(t *testing.T) {
	h := New(&mockQuerier{queryRowErr: errMockDB}, "secret")
	r := chi.NewRouter()
	r.Post("/categories", h.CreateCategory)

	body := map[string]interface{}{"name": "Flowers", "sort_order": 1}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/categories", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("expected 500, got %d", rec.Code)
	}
}
