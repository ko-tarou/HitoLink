# Flower Seller（フラワーセラー）

花屋の業務効率化アプリ。Go + PostgreSQL（Docker） + Next.js フロント。

## 起動方法（Docker で PostgreSQL）

**事前に Docker Desktop を起動しておいてください。**

### 一発で全部リセット（新 PC・clone 後向け）

マイグレーションを 1 つずつ実行する代わりに、**DB を含め全部リセットして完璧な状態**にできます。新しい PC で clone したあともこの 1 本で OK です。

```bash
# DB ボリューム削除 → Postgres 起動 → schema 適用 → デモデータ投入
./scripts/reset-and-seed.sh

# 新 PC で依存関係も入れる場合
./scripts/reset-and-seed.sh --deps
```

あとは「3. Go バックエンドを起動」「4. Next.js を起動」に進んでください。

---

### 手順でやる場合

プロジェクトルート（`flowerseller` の直下）で、次の順に実行します。**別のプロジェクトで PostgreSQL を使っていても、このプロジェクトはポート 5434 を使うので競合しません。**

### 1. PostgreSQL を Docker で起動

```bash
docker-compose up -d postgres
```

ユーザー `flowerseller`・DB `flowerseller`・パスワード `flowerseller` は自動で作成されます。

### 2. スキーマを適用（初回のみ）

PostgreSQL の起動を数秒待ってから実行します。

```bash
sleep 5
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/schema.sql
```

※ スキーマ適用はコンテナ**内**の Postgres に対して行うので、ポートは気にしなくて大丈夫です。

**既存DBで `email` から `organization_name` へ移行する場合**は、以下を実行してください。

```bash
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/migrations/002_add_organization_name.sql
```

**既存DBで `users` に業態（販売者/生産者/仲介者）を追加する場合**は、以下を実行してください。

```bash
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/migrations/003_add_business_type.sql
```

**生産者の栽培管理（栽培バッチ・収穫率）を使う場合**は、以下を実行してください。

```bash
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/migrations/004_add_cultivation_batches.sql
```

### 2.5 デモデータを投入（初回のみ・任意）

**一発リセットを使う場合**は `./scripts/reset-and-seed.sh` で schema と seed がまとめて適用され、デモログイン（団体名「デモ花屋」/ パスワード「demo」）が必ず使える状態になります。

手動で seed だけ流す場合は、デモユーザー用パスワードハッシュを生成してからにしてください。

```bash
# ハッシュを生成（表示された文字列をコピー）
cd backend && go run ./cmd/gen-bcrypt

# backend/seed.sql の DEMO_HASH_PLACEHOLDER を、上で表示されたハッシュに置き換えてから実行
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/seed.sql
```

カテゴリ・商品・在庫のサンプルが入ります。

### 3. Go バックエンドを起動（ターミナル1）

Docker の Postgres は **ポート 5434** で動いています（他プロジェクトの Postgres と競合しないため）。

```bash
cd backend
go mod tidy   # 初回のみ
DATABASE_URL="postgres://flowerseller:flowerseller@localhost:5434/flowerseller?sslmode=disable" go run .
```

※ すでに `backend` にいる場合は `cd backend` は不要です。

`server listening on :8080` と出れば OK です。

**「connection refused」が出る場合**  
先に `docker-compose up -d postgres` を実行し、PostgreSQL が起動しているか確認してください（`docker-compose ps` で `postgres` が `Up` になっていること）。

### 4. Next.js を起動（ターミナル2）

```bash
npm run dev
```

### 5. ブラウザで開く

**http://localhost:3000** を開きます。ログイン画面が表示されるので、デモデータ投入済みの場合は **団体名「デモ花屋」** / **パスワード「demo」** でログイン。アカウントがない場合は「新規作成」から団体名とパスワードを登録できます。

---

## 構成

- **Backend**: Go (Chi) + PostgreSQL (pgx)
- **DB**: PostgreSQL 15（Docker Compose）
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **認証**: JWT（Cookie に保存）。ログインは**団体名**と**パスワード**で行います。

## 環境変数（任意）

**Go バックエンド**

- `DATABASE_URL`: 未設定時は `postgres://flowerseller:flowerseller@localhost:5432/flowerseller?sslmode=disable`（Docker 利用時はポート **5434** を指定してください）
- `JWT_SECRET`: 未設定時は開発用の固定値
- `PORT`: 未設定時は 8080

**Next.js**

- `NEXT_PUBLIC_API_URL`: 未設定時は `http://localhost:8080`

## ローカル PostgreSQL のみ（Docker を使わない場合）

すでに Mac などに PostgreSQL が入っている場合は、管理者で接続してユーザーと DB を作成してから使います。

```bash
psql -d postgres
```

psql 内で:

```sql
CREATE ROLE flowerseller WITH LOGIN PASSWORD 'flowerseller';
CREATE DATABASE flowerseller OWNER flowerseller;
\q
```

その後、スキーマを適用:

```bash
psql "postgres://flowerseller:flowerseller@localhost:5432/flowerseller?sslmode=disable" -f backend/schema.sql
```

あとは「3. Go バックエンド」「4. Next.js」の手順で起動してください。

## API 概要（Go）

- `POST /auth/signup` - 新規登録（`organization_name`, `password`）
- `POST /auth/login` - ログイン（`organization_name`, `password` → JWT 返却）
- `GET/POST /api/products` - 商品一覧・登録
- `GET/POST /api/inventory_batches` - 在庫バッチ
- `GET/POST /api/watering_records` - 水やり記録
- `GET/POST /api/inbound_records` - 入荷
- `GET/POST /api/sales` - 売上
- `GET /api/price_adjustment_history`, `POST /api/price_adjustment` - 価格一括調整
- `GET /api/search/products?q=...` - 商品検索（テキスト）

認証: `Authorization: Bearer <JWT>`（未ログインでも読み書き可能。JWT があれば created_by にユーザーIDを記録）

## テスト

**Go 単体テスト（JWT ミドルウェア）**

```bash
cd backend
go test ./middleware/... -v
```

**API スモークテスト（バックエンドが localhost:8080 で起動している前提）**

デモデータ投入後、商品・在庫・売上の POST が未認証で通ることを確認します。

```bash
./scripts/api-test.sh
```

環境変数 `API_BASE` で URL を変更できます（例: `API_BASE=http://localhost:8080 ./scripts/api-test.sh`）。

## 類似商品チェック（ばら/バラ）が動かないとき

1. **バックエンドのログを確認**  
   商品名入力時に `[SimilarProducts] name=... nameNorm=... results=...` が出るか確認。出ない場合はリクエストが Go に届いていない（フロントの API 先や CORS を確認）。

2. **フロントのエラー表示**  
   「類似商品の取得に失敗しました」や 404/500 が出る場合は、ブラウザの開発者ツールの Network で `GET .../api/products/similar?name=...` のレスポンスを確認。

3. **直接 API を叩く**  
   ```bash
   curl -s "http://localhost:8080/api/products/similar?name=ばら&limit=5"
   ```  
   空配列 `[]` なら商品が無いか名前が一致していない。JSON が返ればバックエンドは正常。
