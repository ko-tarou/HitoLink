package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSignup_InvalidJSON_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	req := httptest.NewRequest(http.MethodPost, "/auth/signup", bytes.NewReader([]byte("not json")))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Signup(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestSignup_EmptyOrganizationName_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	body := map[string]string{"organization_name": "", "password": "pass123"}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/auth/signup", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Signup(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
	if rec.Body.String() != "organization_name and password required\n" {
		t.Errorf("expected 'organization_name and password required', got %q", rec.Body.String())
	}
}

func TestSignup_EmptyPassword_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	body := map[string]string{"organization_name": "花屋A", "password": ""}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/auth/signup", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Signup(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestLogin_InvalidJSON_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewReader([]byte("not json")))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Login(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestLogin_EmptyOrganizationName_Returns400(t *testing.T) {
	h := New(&mockQuerier{}, "secret")
	body := map[string]string{"organization_name": "", "password": "pass"}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Login(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", rec.Code)
	}
}

func TestLogin_UserNotFound_Returns401(t *testing.T) {
	// QueryRow returns ErrNoRows -> "invalid credentials"
	h := New(&mockQuerier{}, "secret")
	body := map[string]string{"organization_name": "存在しない団体", "password": "pass"}
	raw, _ := json.Marshal(body)
	req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewReader(raw))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.Login(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", rec.Code)
	}
}
