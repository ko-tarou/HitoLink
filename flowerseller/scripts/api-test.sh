#!/usr/bin/env bash
# API スモークテスト（Go バックエンドが localhost:8080 で起動している前提）
set -e
BASE="${API_BASE:-http://localhost:8080}"

echo "=== GET /api/categories (no auth) ==="
curl -sS -o /dev/null -w "%{http_code}" "$BASE/api/categories" | grep -q 200 && echo " OK" || (echo " FAIL"; exit 1)

echo "=== GET /api/products (no auth) ==="
curl -sS -o /dev/null -w "%{http_code}" "$BASE/api/products" | grep -q 200 && echo " OK" || (echo " FAIL"; exit 1)

echo "=== POST /api/products (no auth) ==="
CODE=$(curl -sS -o /tmp/products_resp.json -w "%{http_code}" -X POST "$BASE/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"テスト商品","type":"single","base_price":100}')
if [ "$CODE" = "201" ]; then
  echo " OK (201)"
  cat /tmp/products_resp.json
else
  echo " Response: $CODE"
  cat /tmp/products_resp.json
  [ "$CODE" = "201" ] && exit 0 || exit 1
fi

echo "=== GET /api/inventory_batches (no auth) ==="
curl -sS -o /dev/null -w "%{http_code}" "$BASE/api/inventory_batches" | grep -q 200 && echo " OK" || (echo " FAIL"; exit 1)

echo "=== POST /api/inventory_batches (no auth) ==="
# seed の商品ID（バラ）を使用
PRODUCT_ID="c0000000-0000-0000-0000-000000000001"
CODE=$(curl -sS -o /tmp/inv_resp.json -w "%{http_code}" -X POST "$BASE/api/inventory_batches" \
  -H "Content-Type: application/json" \
  -d "{\"product_id\":\"$PRODUCT_ID\",\"quantity\":10}")
[ "$CODE" = "201" ] && echo " OK (201)" || (echo " Response: $CODE"; cat /tmp/inv_resp.json; [ "$CODE" = "201" ] && exit 0 || exit 1)

echo "=== POST /api/sales (no auth) ==="
CODE=$(curl -sS -o /tmp/sales_resp.json -w "%{http_code}" -X POST "$BASE/api/sales" \
  -H "Content-Type: application/json" \
  -d "{\"total_amount\":100,\"payment_method\":\"cash\",\"items\":[{\"product_id\":\"$PRODUCT_ID\",\"quantity\":1,\"unit_price\":100}]}")
[ "$CODE" = "201" ] && echo " OK (201)" || (echo " Response: $CODE"; cat /tmp/sales_resp.json; [ "$CODE" = "201" ] && exit 0 || exit 1)

echo "=== All API smoke tests passed ==="
