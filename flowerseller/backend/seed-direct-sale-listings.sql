-- 生産者: 直接販売の出品サンプル（デモユーザー用）
-- 実行例: docker compose exec -T postgres psql -U flowerseller -d flowerseller < backend/seed-direct-sale-listings.sql
-- id は UUID のため 0-9,a-f のみ。写真は picsum.photos のサンプル画像
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
