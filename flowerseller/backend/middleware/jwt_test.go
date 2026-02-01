package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func createTestToken(secret, userID, role string) (string, error) {
	claims := &Claims{
		RegisteredClaims: jwt.RegisteredClaims{ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour))},
		UserID:           userID,
		Role:             role,
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return t.SignedString([]byte(secret))
}

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

func TestJWT_ValidToken_SetsClaims(t *testing.T) {
	secret := "test-secret"
	token, err := createTestToken(secret, "user-123", "member")
	if err != nil {
		t.Fatalf("create test token: %v", err)
	}
	handler := JWT(secret)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := GetClaims(r.Context())
		if claims == nil {
			t.Fatalf("expected claims when token is valid")
		}
		if claims.UserID != "user-123" || claims.Role != "member" {
			t.Errorf("expected user_id=user-123 role=member, got user_id=%s role=%s", claims.UserID, claims.Role)
		}
		w.WriteHeader(http.StatusOK)
	}))
	req := httptest.NewRequest(http.MethodGet, "/api/products", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
}
