-- 既存DBで email から organization_name へ移行する場合に実行
-- 新規セットアップでは backend/schema.sql に organization_name が含まれているため不要

-- organization_name カラムを追加（email がある場合のマイグレーション）
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN IF NOT EXISTS organization_name TEXT;
    UPDATE users SET organization_name = split_part(email, '@', 1)
      WHERE organization_name IS NULL OR organization_name = '';
    UPDATE users SET organization_name = 'default'
      WHERE organization_name IS NULL OR organization_name = '';
    -- デモユーザーを団体名「デモ花屋」に統一
    UPDATE users SET organization_name = 'デモ花屋'
      WHERE id = 'a0000000-0000-0000-0000-000000000001';
    ALTER TABLE users ALTER COLUMN organization_name SET NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_organization_name ON users(organization_name);
    ALTER TABLE users DROP COLUMN IF EXISTS email;
  END IF;
END $$;
