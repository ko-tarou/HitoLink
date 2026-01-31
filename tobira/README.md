# TOBIRA - トベラ ランディングページ

富山県富山市のアンティーク＆リユースセレクトショップ「TOBIRA」のランディングページです。

## 技術スタック

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts（Cormorant Garamond / Noto Sans JP）

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

## プロジェクト構成

```
tobira/
├── app/
│   ├── globals.css      # グローバルスタイル・カラーパレット
│   ├── layout.tsx       # ルートレイアウト・フォント設定
│   └── page.tsx         # トップページ（セクション統合）
├── components/
│   ├── Navigation.tsx   # ハンバーガーメニュー付きヘッダー
│   ├── Hero.tsx         # ファーストビュー
│   ├── About.tsx        # TOBIRAについて（パララックス背景）
│   ├── Collection.tsx   # 取り扱い・サービス（4カテゴリ）
│   ├── Highlights.tsx   # 訪問のヒント
│   └── Access.tsx       # 店舗情報・フッター
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## デザインコンセプト

- **配色:** 深い森のグリーン、古材ブラウン、真鍮ゴールド、オフホワイト
- **雰囲気:** ボタニカル、アンティーク、侘び寂び、没入感
- **アニメーション:** スクロール連動の出現エフェクト、パララックス、ホバー演出
