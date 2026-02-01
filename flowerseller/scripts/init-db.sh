#!/bin/sh
# Apply schema to Postgres. Usage: ./scripts/init-db.sh [connection string]
# Default: postgres://flowerseller:flowerseller@localhost:5432/flowerseller?sslmode=disable
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/.." && pwd)"
SCHEMA="${ROOT}/backend/schema.sql"
DSN="${1:-postgres://flowerseller:flowerseller@localhost:5432/flowerseller?sslmode=disable}"
echo "Applying schema from $SCHEMA to database..."
psql "$DSN" -f "$SCHEMA" 2>/dev/null || PGPASSWORD=flowerseller psql -h localhost -U flowerseller -d flowerseller -f "$SCHEMA"
