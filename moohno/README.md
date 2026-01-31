# Cafe & Zakka moohno（モーノ）ランディングページ

白に包まれた癒やしの時間をコンセプトにした、富山県富山市のカフェ＆雑貨「moohno」のランディングページです。

## 技術スタック

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Font:** Google Fonts（Zen Kaku Gothic New / Playfair Display）

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
npm start
```

## 構成

- **Hero** … フルスクリーンビジュアル、キャッチコピー
- **About** … コンセプト（10周年、白基調、アヒルと金魚）
- **Menu** … スイーツ・ランチ・ドリンク（カード表示）
- **Shop** … 雑貨・オーダーメイド家具
- **Info & Access** … 住所・営業時間・電話・地図リンク

## 主な機能

- ローディング時のアヒルマスコットアニメーション
- マウスストーカー（PC）
- スクロール連動のフェードイン・パララックス
- レスポンシブ対応（スマホ・タブレット・PC）
- 固定ヘッダー（スクロールで背景表示）

## 画像について

Unsplash のプレースホルダー画像を使用しています。本番では実際の店舗・メニュー写真に差し替えてください。

## 地図について

`components/InfoAccess.tsx` の地図エリアは「Google Map で開く」リンクのプレースホルダーです。実際の Google Map 埋め込みコードに差し替え可能です。
