package handlers

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type Handler struct {
	pool *pgxpool.Pool
	jwt  string // for issueToken in auth
}

func New(pool *pgxpool.Pool, jwtSecret string) *Handler {
	return &Handler{pool: pool, jwt: jwtSecret}
}
