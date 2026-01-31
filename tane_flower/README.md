# TANE.FLOWER & LIFE LABORATORY — ランディングページ

富山県富山市の花と生活雑貨のセレクトショップ「TANE.FLOWER&LIFE LABORATORY」のランディングページです。

## 技術スタック

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Images**: Unsplash（プレースホルダー）

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で表示できます。

## ビルド

```bash
npm run build
npm start
```

## 構成

- **オープニング**: ロゴ・店名が描画されるオープニングアニメーション（約2.8秒後、フェードアウトしてメインへ）
- **Hero**: 全画面の花ビジュアル、パララックス、店名・タグライン
- **Concept**: 創業・移転のストーリー、行単位のスタッガーアニメーション
- **Services**: Flowers & Green / Gift & Wedding / Life & Goods / Workshop のグリッド、ホバー時の拡大・フィルタ
- **Info & Access**: 住所・TEL・営業時間・地図
- **Footer**: Online Shop（BASE）・Instagram リンク、コピーライト

## フォント

- 日本語: Noto Sans JP / Shippori Mincho（明朝）
- 英語: Playfair Display（セリフ体）

## 店舗リンクの差し替え

`src/components/Footer.tsx` の `LINKS` 配列で、BASE・Instagram の実際のURLに差し替えてください。
