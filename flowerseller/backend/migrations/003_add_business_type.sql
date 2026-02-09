-- 既存DBで users に business_type を追加する場合に実行
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IS NULL OR business_type IN ('seller', 'producer', 'intermediary'));
