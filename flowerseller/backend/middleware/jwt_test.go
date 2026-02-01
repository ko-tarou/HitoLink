package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestJWT_NoAuth_PassesThrough(t *testing.T) {
	handler := JWT("test-secret")(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := GetClaims(r.Context())
		if claims != nil {
			t.Fatalf("expected nil claims when no Authorization header")
		}
		w.WriteHeader(http.StatusOK)
	}))
	req := httptest.NewRequest(http.MethodGet, "/api/products", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
}

func TestJWT_InvalidToken_PassesThrough(t *testing.T) {
	handler := JWT("test-secret")(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := GetClaims(r.Context())
		if claims != nil {
			t.Fatalf("expected nil claims when token is invalid")
		}
		w.WriteHeader(http.StatusOK)
	}))
	req := httptest.NewRequest(http.MethodGet, "/api/products", nil)
	req.Header.Set("Authorization", "Bearer invalid.jwt.token")
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("expected 200 (pass through), got %d", rec.Code)
	}
}
