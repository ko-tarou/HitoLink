# Flower Seller（フラワーセラー）

花屋の業務効率化アプリ。Go + PostgreSQL（Docker） + Next.js フロント。

## 起動方法（Docker で PostgreSQL）

**事前に Docker Desktop を起動しておいてください。**

プロジェクトルート（`flowerseller` の直下）で、次の順に実行します。

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

### 2.5 デモデータを投入（初回のみ・任意）

**プロジェクトルート**（`flowerseller` の直下）で実行してください。`backend` にいる場合は `cd ..` で戻ってから実行します。

```bash
docker-compose exec -T postgres psql -U flowerseller -d flowerseller < backend/seed.sql
```

カテゴリ・商品・在庫のサンプルが入ります。

### 3. Go バックエンドを起動（ターミナル1）

Docker の Postgres は **ポート 5433** で動いています（ローカルの 5432 と競合しないため）。

```bash
cd backend
go mod tidy   # 初回のみ
DATABASE_URL="postgres://flowerseller:flowerseller@localhost:5433/flowerseller?sslmode=disable" go run .
```

`server listening on :8080` と出れば OK です。

### 4. Next.js を起動（ターミナル2）

```bash
npm run dev
```

### 5. ブラウザで開く

**http://localhost:3000** を開いて利用します。

---

## 構成

- **Backend**: Go (Chi) + PostgreSQL (pgx)
- **DB**: PostgreSQL 15（Docker Compose）
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **認証**: JWT（Cookie に保存）

## 環境変数（任意）

**Go バックエンド**

- `DATABASE_URL`: 未設定時は `postgres://flowerseller:flowerseller@localhost:5432/flowerseller?sslmode=disable`
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

- `POST /auth/signup` - 新規登録
- `POST /auth/login` - ログイン（JWT 返却）
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
