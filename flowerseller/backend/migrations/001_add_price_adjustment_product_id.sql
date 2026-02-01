-- 既存DBで price_adjustment_history に product_id を追加する場合に実行
-- 新規セットアップでは backend/schema.sql に含まれているため不要
ALTER TABLE price_adjustment_history
  ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES products(id) ON DELETE SET NULL;
