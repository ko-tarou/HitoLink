-- Flower Seller デモデータ（schema 適用後に実行）
-- 実行例（Docker の Postgres が 5433 の場合）:
--   プロジェクトルートで: docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/seed.sql

-- デモ用ユーザー（価格調整履歴の created_by 用。パスワードは "demo"）
INSERT INTO users (id, email, password_hash, role, display_name) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'demo@flowerseller.local', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'デモ')
ON CONFLICT (id) DO NOTHING;

-- カテゴリ
INSERT INTO categories (id, name, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000001', '切り花', 1),
  ('b0000000-0000-0000-0000-000000000002', '束', 2),
  ('b0000000-0000-0000-0000-000000000003', 'アレンジ', 3)
ON CONFLICT (id) DO NOTHING;

-- 商品（単品・束・アレンジ）
INSERT INTO products (id, name, type, category_id, base_price, description, disposal_days) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'バラ（赤）', 'single', 'b0000000-0000-0000-0000-000000000001', 350, '春っぽい赤い花', 7),
  ('c0000000-0000-0000-0000-000000000002', 'チューリップ', 'single', 'b0000000-0000-0000-0000-000000000001', 200, '春の花', 5),
  ('c0000000-0000-0000-0000-000000000003', 'ガーベラ', 'single', 'b0000000-0000-0000-0000-000000000001', 180, '明るい色の花', 7),
  ('c0000000-0000-0000-0000-000000000004', 'バラ10本束', 'bundle', 'b0000000-0000-0000-0000-000000000002', 3000, '赤バラ10本の束', 7),
  ('c0000000-0000-0000-0000-000000000005', '春のブーケ', 'arrangement', 'b0000000-0000-0000-0000-000000000003', 5000, '春の花のアレンジメント', 5)
ON CONFLICT (id) DO NOTHING;

-- 在庫バッチ（入荷サンプル）※ seed は初回1回だけ実行推奨
INSERT INTO inventory_batches (product_id, quantity, disposal_date) VALUES
  ('c0000000-0000-0000-0000-000000000001', 50, CURRENT_DATE + 7),
  ('c0000000-0000-0000-0000-000000000002', 30, CURRENT_DATE + 5),
  ('c0000000-0000-0000-0000-000000000004', 10, CURRENT_DATE + 7);

-- 水やりデモデータ（上で入れた在庫バッチのうち先頭2件に次回水やりを設定）
INSERT INTO watering_records (inventory_batch_id, next_watering_at)
SELECT id, now() + interval '1 day' FROM inventory_batches ORDER BY created_at DESC LIMIT 2;
