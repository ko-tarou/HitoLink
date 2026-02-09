-- 生産者: 直接販売の出品テーブル
CREATE TABLE IF NOT EXISTS direct_sale_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity >= 0),
  delivery_option TEXT NOT NULL DEFAULT 'both' CHECK (delivery_option IN ('pickup_only', 'delivery_only', 'both')),
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_direct_sale_listings_created_by ON direct_sale_listings(created_by);

DROP TRIGGER IF EXISTS direct_sale_listings_updated_at ON direct_sale_listings;
CREATE TRIGGER direct_sale_listings_updated_at
  BEFORE UPDATE ON direct_sale_listings
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
