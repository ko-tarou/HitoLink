-- 生産者: 栽培管理用テーブル（既存DBに追加する場合に実行）
CREATE TABLE IF NOT EXISTS cultivation_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity_planted DECIMAL(12, 2) NOT NULL CHECK (quantity_planted > 0),
  quantity_harvested DECIMAL(12, 2) CHECK (quantity_harvested IS NULL OR quantity_harvested >= 0),
  harvest_rate DECIMAL(5, 2) CHECK (harvest_rate IS NULL OR (harvest_rate >= 0 AND harvest_rate <= 100)),
  started_at DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_harvest_at DATE,
  status TEXT NOT NULL DEFAULT 'growing' CHECK (status IN ('growing', 'harvested')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cultivation_batches_product ON cultivation_batches(product_id);
CREATE INDEX IF NOT EXISTS idx_cultivation_batches_status ON cultivation_batches(status);
CREATE INDEX IF NOT EXISTS idx_cultivation_batches_started ON cultivation_batches(started_at);

DROP TRIGGER IF EXISTS cultivation_batches_updated_at ON cultivation_batches;
CREATE TRIGGER cultivation_batches_updated_at
  BEFORE UPDATE ON cultivation_batches
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
