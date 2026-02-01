-- =============================================================================
-- Flower Seller - Supabase Schema
-- 花屋業務効率化アプリ「Flower Seller」データベーススキーマ
-- =============================================================================
-- 対応内容:
-- - 単品・束・アレンジメントの階層的商品管理
-- - ベクトル検索 (pgvector) による自然言語検索
-- - 鮮度管理（水やり記録・廃棄予定日）
-- - 入荷(OCR)・POS・価格一括調整・権限(Admin/Member)
-- =============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE product_type AS ENUM ('single', 'bundle', 'arrangement');
-- single: 単品（花1種）
-- bundle: 束（複数単品のセット）
-- arrangement: アレンジメント（複合構成）

CREATE TYPE payment_method AS ENUM ('cash', 'credit', 'paypay');

CREATE TYPE user_role AS ENUM ('admin', 'member');

CREATE TYPE inbound_status AS ENUM ('pending', 'processed', 'failed');

-- =============================================================================
-- 1. ユーザー・権限
-- =============================================================================

-- プロファイル（Supabase Auth と連携。RLSで Admin/Member を制御）
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'member',
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'ユーザー権限: admin=全データ読み書き・価格変更可, member=閲覧のみ';

-- =============================================================================
-- 2. カテゴリ（価格一括調整・フィルタ用）
-- =============================================================================

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_parent ON public.categories(parent_id);

-- =============================================================================
-- 3. 商品（単品・束・アレンジメント）
-- =============================================================================

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type product_type NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  base_price DECIMAL(12, 2) NOT NULL CHECK (base_price >= 0),
  description TEXT,
  -- 鮮度: 入荷から何日で廃棄予定とするか（NULL=対象外）
  disposal_days INT CHECK (disposal_days IS NULL OR disposal_days > 0),
  -- ベクトル検索用（OpenAI embedding 1536次元）
  embedding vector(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON COLUMN public.products.type IS 'single=単品, bundle=束, arrangement=アレンジメント';
COMMENT ON COLUMN public.products.disposal_days IS '入荷日から廃棄予定日までの日数。鮮度管理用';
COMMENT ON COLUMN public.products.embedding IS '自然言語検索用ベクトル（例: 春っぽい赤い花）';

CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_type ON public.products(type);
CREATE INDEX idx_products_updated ON public.products(updated_at);

-- ベクトル類似度検索用インデックス（IVFFlat。リスト数はデータ量に応じて調整）
CREATE INDEX idx_products_embedding ON public.products
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- =============================================================================
-- 4. 商品構成（束・アレンジメントの子アイテム）
-- =============================================================================

CREATE TABLE public.product_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  child_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parent_product_id, child_product_id),
  CONSTRAINT chk_parent_type CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = parent_product_id AND p.type IN ('bundle', 'arrangement')
    )
  ),
  CONSTRAINT chk_no_self_reference CHECK (parent_product_id != child_product_id)
);

COMMENT ON TABLE public.product_components IS '束・アレンジメントを構成する単品/束の組み合わせと数量';

CREATE INDEX idx_product_components_parent ON public.product_components(parent_product_id);
CREATE INDEX idx_product_components_child ON public.product_components(child_product_id);

-- =============================================================================
-- 5. 在庫バッチ（入荷単位・鮮度管理の単位）
-- =============================================================================

CREATE TABLE public.inventory_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity > 0),
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- 廃棄予定日（鮮度管理）。products.disposal_days から算出または手動設定
  disposal_date DATE,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.inventory_batches IS '入荷単位の在庫。同一商品でも入荷日・廃棄日で複数バッチを持つ';

CREATE INDEX idx_inventory_batches_product ON public.inventory_batches(product_id);
CREATE INDEX idx_inventory_batches_disposal ON public.inventory_batches(disposal_date);
CREATE INDEX idx_inventory_batches_received ON public.inventory_batches(received_at);

-- =============================================================================
-- 6. 水やり記録・リマインド（鮮度管理）
-- =============================================================================

CREATE TABLE public.watering_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inventory_batch_id UUID NOT NULL REFERENCES public.inventory_batches(id) ON DELETE CASCADE,
  watered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  next_watering_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.watering_records IS '水やり実施記録。next_watering_at でリマインド';

CREATE INDEX idx_watering_records_batch ON public.watering_records(inventory_batch_id);
CREATE INDEX idx_watering_records_next ON public.watering_records(next_watering_at) WHERE next_watering_at IS NOT NULL;

-- =============================================================================
-- 7. 入荷記録（OCR 取り込み用）
-- =============================================================================

CREATE TABLE public.inbound_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type TEXT NOT NULL DEFAULT 'ocr', -- 'ocr' | 'manual'
  raw_text TEXT,
  image_url TEXT,
  status inbound_status NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE TABLE public.inbound_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbound_record_id UUID NOT NULL REFERENCES public.inbound_records(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity DECIMAL(12, 2) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inbound_items_record ON public.inbound_items(inbound_record_id);
CREATE INDEX idx_inbound_records_status ON public.inbound_records(status);

-- =============================================================================
-- 8. 売上・POS（決済方法記録のみ、フェーズ1）
-- =============================================================================

CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
  payment_method payment_method NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sale_items_sale ON public.sale_items(sale_id);
CREATE INDEX idx_sales_created ON public.sales(created_at);
CREATE INDEX idx_sales_payment ON public.sales(payment_method);

-- =============================================================================
-- 9. 価格一括調整の履歴（監査用）
-- =============================================================================

CREATE TABLE public.price_adjustment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adjustment_type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage' | 'fixed'
  value DECIMAL(10, 2) NOT NULL, -- 例: 10 = +10%, -5 = -5%
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL, -- NULL = 全商品
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.price_adjustment_history IS '一括値上げ/値下げの履歴。value は % で正=値上げ・負=値下げ';

CREATE INDEX idx_price_adjustment_created ON public.price_adjustment_history(created_at);
CREATE INDEX idx_price_adjustment_category ON public.price_adjustment_history(category_id);

-- =============================================================================
-- 10. トリガー: updated_at 自動更新
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER inventory_batches_updated_at
  BEFORE UPDATE ON public.inventory_batches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 11. RLS (Row Level Security)
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watering_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbound_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbound_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_adjustment_history ENABLE ROW LEVEL SECURITY;

-- 自プロファイルは読める
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 管理者のみプロファイルの role 更新可（必要なら別途 Admin API で実施）
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ヘルパー: 現在ユーザーが管理者か
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- カテゴリ: 全員読める / 書けるのは管理者のみ
CREATE POLICY "Anyone can read categories"
  ON public.categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE TO authenticated USING (public.is_admin());

-- 商品: 全員読める / 書けるのは管理者のみ
CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 商品構成: 同上
CREATE POLICY "Anyone can read product_components"
  ON public.product_components FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage product_components"
  ON public.product_components FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 在庫バッチ: 同上
CREATE POLICY "Anyone can read inventory_batches"
  ON public.inventory_batches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage inventory_batches"
  ON public.inventory_batches FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 水やり: 読める全員 / 記録は管理者のみ（必要に応じて member も記録可に変更可能）
CREATE POLICY "Anyone can read watering_records"
  ON public.watering_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage watering_records"
  ON public.watering_records FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 入荷: 同上
CREATE POLICY "Anyone can read inbound_records"
  ON public.inbound_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage inbound_records"
  ON public.inbound_records FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Anyone can read inbound_items"
  ON public.inbound_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage inbound_items"
  ON public.inbound_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 売上: 全員読める / 登録は管理者のみ（POS 操作は管理者想定。member にも売上登録させたい場合は policy 追加）
CREATE POLICY "Anyone can read sales"
  ON public.sales FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage sales"
  ON public.sales FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Anyone can read sale_items"
  ON public.sale_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage sale_items"
  ON public.sale_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 価格調整履歴: 全員読める / 記録は管理者のみ
CREATE POLICY "Anyone can read price_adjustment_history"
  ON public.price_adjustment_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert price_adjustment_history"
  ON public.price_adjustment_history FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- 新規サインアップ時に profiles を自動作成（Supabase Auth フックまたは Edge Function で実施推奨）
-- ここではトリガーで profiles がない場合に INSERT する例（auth.users への INSERT 後は DB トリガーでは不可のため、アプリ側で INSERT 推奨）
-- 例: ON auth.users INSERT 後、public.profiles に INSERT する処理は Application または Supabase Dashboard の SQL で実行

-- =============================================================================
-- 12. 自然言語検索用ヘルパー（ベクトル類似度）
-- =============================================================================

-- クエリベクトルと類似度で検索する関数（アプリから embedding を渡して呼び出す）
CREATE OR REPLACE FUNCTION public.search_products_by_embedding(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.5,
  match_count INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type product_type,
  category_id UUID,
  base_price DECIMAL(12,2),
  similarity FLOAT
) AS $$
  SELECT
    p.id,
    p.name,
    p.type,
    p.category_id,
    p.base_price,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.products p
  WHERE p.embedding IS NOT NULL
    AND (1 - (p.embedding <=> query_embedding)) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION public.search_products_by_embedding IS '自然言語を embedding に変換したうえで、類似度検索する際に使用';
