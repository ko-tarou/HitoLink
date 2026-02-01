-- Flower Seller - Self-hosted PostgreSQL Schema (Go backend)
-- No Supabase auth.users; no RLS. App-level auth.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 名前の類似度検索（商品登録時の重複チェック用）
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ENUMS
CREATE TYPE product_type AS ENUM ('single', 'bundle', 'arrangement');
CREATE TYPE payment_method AS ENUM ('cash', 'credit', 'paypay');
CREATE TYPE user_role AS ENUM ('admin', 'member');
CREATE TYPE inbound_status AS ENUM ('pending', 'processed', 'failed');

-- Users (replaces Supabase auth.users + profiles)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'member',
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_normalized TEXT,
  type product_type NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  base_price DECIMAL(12, 2) NOT NULL CHECK (base_price >= 0),
  description TEXT,
  disposal_days INT CHECK (disposal_days IS NULL OR disposal_days > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON COLUMN products.name_normalized IS '類似検索用: ひらがな統一（カタカナ→ひらがな、漢字→ひらがな）';
-- 既存DBにカラム追加: ALTER TABLE products ADD COLUMN name_normalized TEXT; 既存行は商品の更新保存で自動設定される。

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_name_normalized ON products(name_normalized) WHERE name_normalized IS NOT NULL;
CREATE INDEX idx_products_updated ON products(updated_at);

CREATE TABLE product_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  child_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parent_product_id, child_product_id),
  CONSTRAINT chk_no_self_reference CHECK (parent_product_id != child_product_id)
);

CREATE TABLE inventory_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity > 0),
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  disposal_date DATE,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inventory_batches_product ON inventory_batches(product_id);
CREATE INDEX idx_inventory_batches_disposal ON inventory_batches(disposal_date);

CREATE TABLE watering_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inventory_batch_id UUID NOT NULL REFERENCES inventory_batches(id) ON DELETE CASCADE,
  watered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  next_watering_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_watering_records_batch ON watering_records(inventory_batch_id);
CREATE INDEX idx_watering_records_next ON watering_records(next_watering_at) WHERE next_watering_at IS NOT NULL;

CREATE TABLE inbound_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type TEXT NOT NULL DEFAULT 'ocr',
  raw_text TEXT,
  image_url TEXT,
  status inbound_status NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE TABLE inbound_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbound_record_id UUID NOT NULL REFERENCES inbound_records(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inbound_items_record ON inbound_items(inbound_record_id);

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
  payment_method payment_method NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX idx_sales_created ON sales(created_at);

CREATE TABLE price_adjustment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adjustment_type TEXT NOT NULL DEFAULT 'percentage',
  value DECIMAL(10, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_price_adjustment_created ON price_adjustment_history(created_at);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER inventory_batches_updated_at BEFORE UPDATE ON inventory_batches FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
