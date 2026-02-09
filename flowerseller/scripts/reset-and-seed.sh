#!/usr/bin/env bash
# DB を含め全部リセットし、schema + デモデータ投入まで行う。
# 新しい PC で clone したあと、このスクリプト 1 本で完璧な状態にできる。
#
# 使い方（プロジェクトルートで）:
#   ./scripts/reset-and-seed.sh
# 依存関係も入れる（新 PC 用）:
#   ./scripts/reset-and-seed.sh --deps

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

WITH_DEPS=false
for arg in "$@"; do
  case "$arg" in
    --deps) WITH_DEPS=true ;;
    -h|--help)
      echo "Usage: $0 [--deps]"
      echo "  --deps  go mod tidy + npm install も実行（新 PC クローン時向け）"
      exit 0
      ;;
  esac
done

echo "=== Flower Seller: フルリセット＆シード ==="
echo "プロジェクトルート: $ROOT"
echo ""

# Docker があるか
if ! command -v docker >/dev/null 2>&1; then
  echo "エラー: Docker がインストールされていません。Docker Desktop などを入れてから実行してください。"
  exit 1
fi

# docker-compose があるか（v2 は docker compose サブコマンド）
COMPOSE_CMD="docker-compose"
if ! command -v docker-compose >/dev/null 2>&1; then
  if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
  else
    echo "エラー: docker-compose が見つかりません。Docker Desktop で Compose を有効にしてください。"
    exit 1
  fi
fi

echo "1. 既存コンテナ・ボリュームを削除..."
$COMPOSE_CMD down -v 2>/dev/null || true

echo "2. PostgreSQL を起動..."
$COMPOSE_CMD up -d postgres

echo "3. PostgreSQL の起動を待機..."
for i in $(seq 1 30); do
  if $COMPOSE_CMD exec -T postgres pg_isready -U flowerseller -d flowerseller 2>/dev/null; then
    echo "   Postgres ready."
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "エラー: PostgreSQL が 30 秒以内に起動しませんでした。"
    exit 1
  fi
  sleep 1
done

echo "4. スキーマを適用..."
$COMPOSE_CMD exec -T postgres psql -U flowerseller -d flowerseller < backend/schema.sql

echo "4.5. 追加テーブル用マイグレーション（出荷履歴・直接販売）を適用..."
for mig in backend/migrations/006_add_shipments.sql backend/migrations/007_add_direct_sale_listings.sql; do
  $COMPOSE_CMD exec -T postgres psql -U flowerseller -d flowerseller < "$mig"
done

echo "5. デモ用パスワードのハッシュを生成（団体名: デモ花屋 / パスワード: demo）..."
if ! command -v go >/dev/null 2>&1; then
  echo "エラー: デモユーザー用のハッシュ生成に Go が必要です。Go をインストールするか、backend で go run ./cmd/gen-bcrypt を実行して得たハッシュを backend/seed.sql の DEMO_HASH_PLACEHOLDER と差し替えてください。"
  exit 1
fi
DEMO_HASH=$(cd "$ROOT/backend" && go run ./cmd/gen-bcrypt 2>/dev/null) || true
if [ -z "$DEMO_HASH" ]; then
  echo "エラー: ハッシュの生成に失敗しました。backend で go mod tidy のあと go run ./cmd/gen-bcrypt を実行して確認してください。"
  exit 1
fi

echo "6. デモデータを投入..."
sed "s|DEMO_HASH_PLACEHOLDER|$DEMO_HASH|g" backend/seed.sql | $COMPOSE_CMD exec -T postgres psql -U flowerseller -d flowerseller

echo "6.5. 直接販売サンプルデータを投入..."
$COMPOSE_CMD exec -T postgres psql -U flowerseller -d flowerseller < backend/seed-direct-sale-listings.sql

if [ "$WITH_DEPS" = true ]; then
  echo "7. 依存関係をインストール（--deps）..."
  (cd backend && go mod tidy)
  npm install
else
  echo "7. 依存関係はスキップ（新 PC の場合は ./scripts/reset-and-seed.sh --deps を実行）"
fi

echo ""
echo "=== 完了 ==="
echo "DB をリセットし、schema + デモデータを投入しました。"
echo ""
echo "次のステップ:"
echo "  1) バックエンド起動（ターミナル1）:"
echo "     cd backend"
echo "     DATABASE_URL=\"postgres://flowerseller:flowerseller@localhost:5434/flowerseller?sslmode=disable\" go run ."
echo ""
echo "  2) フロント起動（ターミナル2）:"
echo "     npm run dev"
echo ""
echo "  3) ブラウザで http://localhost:3000 を開く"
echo "     ログイン: 団体名「デモ花屋」 / パスワード「demo」"
echo ""
