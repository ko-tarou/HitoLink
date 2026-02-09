-- Flower Seller デモデータ（schema 適用後に実行）
-- 実行例（Docker の Postgres が 5434 の場合）:
--   プロジェクトルートで: docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/seed.sql

-- デモ用ユーザー（団体名: デモ花屋、パスワード: demo）
-- reset-and-seed.sh 実行時に DEMO_HASH_PLACEHOLDER が go run ./cmd/gen-bcrypt の結果で置換されます
-- business_type を必ず設定し、アカウントと業態の紐付けを一貫させる（producer=生産者で栽培・出荷などデモ）
INSERT INTO users (id, organization_name, password_hash, role, display_name, business_type) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'デモ花屋', 'DEMO_HASH_PLACEHOLDER', 'admin', 'デモ', 'producer')
ON CONFLICT (id) DO UPDATE SET
  organization_name = EXCLUDED.organization_name,
  password_hash = EXCLUDED.password_hash,
  display_name = EXCLUDED.display_name,
  business_type = COALESCE(users.business_type, EXCLUDED.business_type);

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

-- 品質管理画面用デモ（入荷から指定日数経過したバッチ＝一覧に表示される）
-- バラ(赤) disposal_days=7 → 8日前に入荷、チューリップ 5日→6日前、ガーベラ 7日→10日前
INSERT INTO inventory_batches (product_id, quantity, received_at, disposal_date) VALUES
  ('c0000000-0000-0000-0000-000000000001', 20, now() - interval '8 days', CURRENT_DATE - 1),
  ('c0000000-0000-0000-0000-000000000002', 15, now() - interval '6 days', CURRENT_DATE),
  ('c0000000-0000-0000-0000-000000000003', 10, now() - interval '10 days', CURRENT_DATE - 3);

-- 水やりデモデータ（上で入れた在庫バッチのうち先頭2件に次回水やりを設定）
INSERT INTO watering_records (inventory_batch_id, next_watering_at)
SELECT id, now() + interval '1 day' FROM inventory_batches ORDER BY created_at DESC LIMIT 2;

-- 売上デモデータ（直近7日分の日別売上）※再実行時は既存デモを削除してから挿入
DELETE FROM sale_items WHERE sale_id IN (SELECT id FROM sales WHERE id::text LIKE 'd0000000-%');
DELETE FROM sales WHERE id::text LIKE 'd0000000-%';
INSERT INTO sales (id, total_amount, payment_method, created_by, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000001', 1850, 'cash', 'a0000000-0000-0000-0000-000000000001', now() - interval '6 days'),
  ('d0000000-0000-0000-0000-000000000002', 3200, 'credit', 'a0000000-0000-0000-0000-000000000001', now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000003', 500, 'paypay', 'a0000000-0000-0000-0000-000000000001', now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000004', 5180, 'cash', 'a0000000-0000-0000-0000-000000000001', now() - interval '4 days'),
  ('d0000000-0000-0000-0000-000000000005', 700, 'credit', 'a0000000-0000-0000-0000-000000000001', now() - interval '3 days'),
  ('d0000000-0000-0000-0000-000000000006', 3000, 'cash', 'a0000000-0000-0000-0000-000000000001', now() - interval '2 days'),
  ('d0000000-0000-0000-0000-000000000007', 2350, 'paypay', 'a0000000-0000-0000-0000-000000000001', now() - interval '1 day'),
  ('d0000000-0000-0000-0000-000000000008', 1200, 'cash', 'a0000000-0000-0000-0000-000000000001', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 2, 350, 700, now() - interval '6 days'),
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 3, 200, 600, now() - interval '6 days'),
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 2, 180, 360, now() - interval '6 days'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000004', 1, 3000, 3000, now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 1, 350, 350, now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 2, 200, 400, now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 1, 180, 180, now() - interval '5 days'),
  ('d0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000005', 1, 5000, 5000, now() - interval '4 days'),
  ('d0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 1, 350, 350, now() - interval '4 days'),
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 2, 200, 400, now() - interval '3 days'),
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 2, 180, 360, now() - interval '3 days'),
  ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000004', 1, 3000, 3000, now() - interval '2 days'),
  ('d0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000004', 1, 3000, 3000, now() - interval '1 day'),
  ('d0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001', 1, 350, 350, now() - interval '1 day'),
  ('d0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000002', 3, 200, 600, now()),
  ('d0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000003', 2, 180, 360, now());

-- 生産者: 栽培管理デモデータ（現在栽培中・収穫済み）
INSERT INTO cultivation_batches (id, product_name, quantity_planted, quantity_harvested, harvest_rate, started_at, expected_harvest_at, status, notes, created_at, updated_at) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'バラ（赤）', 200, NULL, NULL, CURRENT_DATE - 90, CURRENT_DATE + 275, 'growing', NULL, now(), now()),
  ('f0000000-0000-0000-0000-000000000002', 'チューリップ', 150, NULL, NULL, CURRENT_DATE - 60, CURRENT_DATE + 305, 'growing', NULL, now(), now()),
  ('f0000000-0000-0000-0000-000000000003', 'ガーベラ', 100, 85, 85.00, CURRENT_DATE - 120, CURRENT_DATE + 245, 'growing', NULL, now(), now()),
  ('f0000000-0000-0000-0000-000000000004', 'トルコキキョウ', 80, 72, 90.00, CURRENT_DATE - 100, CURRENT_DATE + 265, 'harvested', '初回収穫済み', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 生産者: 出荷履歴デモデータ（花の束のみ。ブーケ・アレンジは含めない）
INSERT INTO shipments (id, shipped_at, destination, notes, created_at) VALUES
  ('e0000000-0000-0000-0000-000000000001', now() - interval '5 days', '花市場 A', '定期便', now() - interval '5 days'),
  ('e0000000-0000-0000-0000-000000000002', now() - interval '3 days', 'デモ花屋 本店', NULL, now() - interval '3 days'),
  ('e0000000-0000-0000-0000-000000000003', now() - interval '1 day', '花市場 A', NULL, now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO shipment_items (id, shipment_id, product_name, quantity, created_at) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'バラ（赤）', 100, now() - interval '5 days'),
  ('e1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'チューリップ', 80, now() - interval '5 days'),
  ('e1000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'ガーベラ', 50, now() - interval '5 days'),
  ('e1000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'バラ（赤）', 30, now() - interval '3 days'),
  ('e1000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'バラ10本束', 5, now() - interval '3 days'),
  ('e1000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003', 'チューリップ', 60, now() - interval '1 day'),
  ('e1000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000003', 'ガーベラ', 40, now() - interval '1 day'),
  ('e1000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000003', 'バラ10本束', 8, now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- 生産者: 直接販売の出品サンプル（写真は picsum.photos のサンプル画像）
INSERT INTO direct_sale_listings (id, created_by, product_name, price, quantity, delivery_option, image_url, description, created_at, updated_at) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'バラ（赤）10本', 1200, 20, 'both', 'https://picsum.photos/seed/rose1/400/400', '採れたての赤バラです。現地受け取り・配送どちらも可。', now(), now()),
  ('a1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'チューリップ 5本束', 800, 15, 'both', 'https://picsum.photos/seed/tulip1/400/400', '春のチューリップ。色はお任せください。', now(), now()),
  ('a1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'ガーベラ 1本', 200, 50, 'pickup_only', 'https://picsum.photos/seed/gerbera1/400/400', '現地受け取りのみ。ハウスでお渡しします。', now(), now()),
  ('a1000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'トルコキキョウ 10本', 1500, 8, 'delivery_only', 'https://picsum.photos/seed/lisianthus1/400/400', '配送のみ。のし・ラッピング対応可。', now(), now()),
  ('a1000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'バラ10本束', 2800, 12, 'both', 'https://picsum.photos/seed/rose2/400/400', '赤バラ10本の束。ギフトにどうぞ。', now(), now()),
  ('a1000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'ユリ 3本', 900, 10, 'both', 'https://picsum.photos/seed/lily1/400/400', '白・ピンクのユリ。香りが良いです。', now(), now()),
  ('a1000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'カーネーション 5本', 600, 25, 'pickup_only', 'https://picsum.photos/seed/carnation1/400/400', 'ハウス直送。現地受け取りのみ。', now(), now()),
  ('a1000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'ひまわり 3本', 500, 30, 'both', 'https://picsum.photos/seed/sunflower1/400/400', '夏の定番。明るい黄色です。', now(), now())
ON CONFLICT (id) DO NOTHING;
