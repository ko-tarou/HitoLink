-- 栽培バッチの品目をテキスト入力対応（既存DBで cultivation_batches がある場合）
ALTER TABLE cultivation_batches ADD COLUMN IF NOT EXISTS product_name TEXT;
UPDATE cultivation_batches c SET product_name = p.name FROM products p WHERE c.product_id = p.id AND (c.product_name IS NULL OR c.product_name = '');
UPDATE cultivation_batches SET product_name = '（品目不明）' WHERE product_name IS NULL OR product_name = '';
ALTER TABLE cultivation_batches ALTER COLUMN product_name SET NOT NULL;
ALTER TABLE cultivation_batches ALTER COLUMN product_id DROP NOT NULL;
