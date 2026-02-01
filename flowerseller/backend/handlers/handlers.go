package handlers

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// Querier abstracts DB access for testing. *pgxpool.Pool implements it.
type Querier interface {
	Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error)
	QueryRow(ctx context.Context, sql string, args ...any) pgx.Row
	Exec(ctx context.Context, sql string, args ...any) (pgconn.CommandTag, error)
}

type Handler struct {
	pool Querier
	jwt  string // for issueToken in auth
}

func New(pool Querier, jwtSecret string) *Handler {
	return &Handler{pool: pool, jwt: jwtSecret}
}
