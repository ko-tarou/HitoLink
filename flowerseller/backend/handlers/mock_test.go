package handlers

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// emptyRows implements pgx.Rows (no rows).
type emptyRows struct{}

func (emptyRows) Next() bool                   { return false }
func (emptyRows) Scan(...any) error             { return nil }
func (emptyRows) Close()                       {}
func (emptyRows) Err() error                    { return nil }
func (emptyRows) CommandTag() pgconn.CommandTag { return pgconn.CommandTag{} }
func (emptyRows) FieldDescriptions() []pgconn.FieldDescription { return nil }
func (emptyRows) Values() ([]any, error)        { return nil, nil }
func (emptyRows) RawValues() [][]byte           { return nil }
func (emptyRows) Conn() *pgx.Conn               { return nil }

// errRow implements pgx.Row; Scan returns ErrNoRows or a given error.
type errRow struct{ err error }

func (e errRow) Scan(...any) error {
	if e.err != nil {
		return e.err
	}
	return pgx.ErrNoRows
}

// mockQuerier implements Querier for tests.
type mockQuerier struct {
	queryErr    error
	queryRowErr error
	execErr     error
}

func (m *mockQuerier) Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error) {
	if m.queryErr != nil {
		return nil, m.queryErr
	}
	return emptyRows{}, nil
}

func (m *mockQuerier) QueryRow(ctx context.Context, sql string, args ...any) pgx.Row {
	if m.queryRowErr != nil {
		return errRow{m.queryRowErr}
	}
	return errRow{}
}

func (m *mockQuerier) Exec(ctx context.Context, sql string, args ...any) (pgconn.CommandTag, error) {
	if m.execErr != nil {
		return pgconn.CommandTag{}, m.execErr
	}
	return pgconn.CommandTag{}, nil
}

var errMockDB = errors.New("mock db error")
