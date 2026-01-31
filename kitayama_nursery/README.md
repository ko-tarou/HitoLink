# 北山ナーセリー（Kitayama Nursery）LP

北陸最大級の園芸店・造園企業のランディングページです。

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Noto Serif JP（見出し）, Noto Sans JP（本文）

## 開発

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

- **Hero:** パララックス背景・キャッチコピー
- **About:** 会社概要・Philosophy
- **Stats:** 数字のカウントアップ（4000坪・120台・365日）
- **Locations:** 3店舗カード（ホバーで画像ズーム）
- **Products:** Bento Grid（植木・希少植物・造園・園芸教室）
- **Online Store:** Amazon / Yahoo! / アーバンジャングル・LINE
- **Footer:** 会社概要・SNS

## インタラクション

- スムーズスクロール（`html { scroll-behavior: smooth }`）
- マウスストーカー（カーソル追従のぼかし円・デスクトップのみ）
- スクロール連動のふわっと表示アニメーション（Framer Motion）
- 画像の遅延読み込みと表示時のスケールアップ

## 画像

- 本番では `/api/placeholder/幅/高さ` で Picsum へリダイレクトするプレースホルダーを使用可能です。
- 現在は Unsplash / Picsum の画像URLを直接指定しています。
