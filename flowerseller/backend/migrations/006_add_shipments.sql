-- 生産者: 出荷履歴テーブル（表示専用）
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipped_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  destination TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shipment_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_shipments_shipped_at ON shipments(shipped_at DESC);
CREATE INDEX IF NOT EXISTS idx_shipment_items_shipment ON shipment_items(shipment_id);
