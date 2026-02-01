package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestListProducts_EmptyDB_Returns200AndEmptyArray(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Get("/products", h.ListProducts)

	req := httptest.NewRequest(http.MethodGet, "/products", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
	if rec.Header().Get("Content-Type") != "application/json" {
		t.Errorf("expected application/json, got %s", rec.Header().Get("Content-Type"))
	}
	var list []interface{}
	if err := json.NewDecoder(rec.Body).Decode(&list); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	if len(list) != 0 {
		t.Errorf("expected empty list, got len %d", len(list))
	}
}

func TestListProducts_QueryParams_Accepted(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Get("/products", h.ListProducts)

	req := httptest.NewRequest(http.MethodGet, "/products?sort_by=name&order=asc&type=cut&category_id=cat-1", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
}

func TestListProducts_DBError_Returns500(t *testing.T) {
	h := New(&mockQuerier{queryErr: errMockDB}, "secret")
	r := chi.NewRouter()
	r.Get("/products", h.ListProducts)

	req := httptest.NewRequest(http.MethodGet, "/products", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("expected 500, got %d", rec.Code)
	}
}

func TestGetProduct_NotFound_Returns404(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Get("/products/{id}", h.GetProduct)

	req := httptest.NewRequest(http.MethodGet, "/products/nonexistent", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Errorf("expected 404, got %d", rec.Code)
	}
}

func TestCreateProduct_InvalidJSON_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Post("/products", h.CreateProduct)

	req := httptest.NewRequest(http.MethodPost, "/products", bytes.NewReader([]byte("not json")))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
	if rec.Body.String() != "invalid json\n" {
		t.Errorf("expected body 'invalid json', got %q", rec.Body.String())
	}
}

func TestCreateProduct_DBError_Returns500(t *testing.T) {
	h := New(&mockQuerier{queryRowErr: errMockDB}, "secret")
	r := chi.NewRouter()
	r.Post("/products", h.CreateProduct)

	body := map[string]interface{}{
		"name": "Rose", "type": "cut", "base_price": 500,
	}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/products", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("expected 500, got %d", rec.Code)
	}
}

func TestUpdateProduct_InvalidJSON_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	r := chi.NewRouter()
	r.Patch("/products/{id}", h.UpdateProduct)

	req := httptest.NewRequest(http.MethodPatch, "/products/id1", bytes.NewReader([]byte("not json")))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestDeleteProduct_DBError_Returns500(t *testing.T) {
	h := New(&mockQuerier{execErr: errMockDB}, "secret")
	r := chi.NewRouter()
	r.Delete("/products/{id}", h.DeleteProduct)

	req := httptest.NewRequest(http.MethodDelete, "/products/id1", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("expected 500, got %d", rec.Code)
	}
}
