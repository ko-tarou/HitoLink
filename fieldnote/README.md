# フィールドノート立山店 - ランディングページ

モンベルヴィレッジ立山のコンセプトショップ「フィールドノート立山店」のLPです。

## 技術スタック

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Font:** Google Fonts (Noto Sans JP, Zen Kaku Gothic New)

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

- `app/page.tsx` - メインページ
- `app/layout.tsx` - ルートレイアウト・フォント設定
- `components/` - Hero, Concept, Products, LocationInfo, VillageFacilities, Footer, Header

## デザイン

- アースカラー（セージグリーン、サンドベージュ、チャコールグレー）
- ミニマルで余白を活かしたレイアウト
- スクロール連動のフェードイン、ホバー時のマイクロインタラクション
