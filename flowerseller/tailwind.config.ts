import type { Config } from "tailwindcss";

/**
 * デジタル庁デザインシステム準拠のデザイントークン
 * - 12カラムグリッド / 余白は8の倍数 (4, 8, 16, 24, 32...)
 * - コントラスト比 WCAG 2.1 AA 以上（文字 4.5:1）
 * - フォーカスインジケータを消さない
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      colors: {
        // ベース: 白 / 薄いグレー
        base: {
          DEFAULT: "#FFFFFF",
          subtle: "#F5F5F5",
          muted: "#E8E8E8",
        },
        // テキスト: 視認性の高いダークグレー（WCAG AA）
        // 注: "text" は Tailwind のフォントサイズと被るため foreground も定義
        text: {
          DEFAULT: "#1A1A1A",
          secondary: "#333333",
          muted: "#5C5C5C",
          disabled: "#888888",
        },
        foreground: {
          DEFAULT: "#1A1A1A",
          secondary: "#333333",
          muted: "#5C5C5C",
        },
        // アクセント（リンク・ボタン・フォーカス）
        primary: {
          DEFAULT: "#0067C0",
          hover: "#004D8E",
          light: "#E6F2FC",
        },
        // 境界線
        border: {
          DEFAULT: "#D8D8D8",
          light: "#E8E8E8",
        },
        // エラー（色だけに依存しないようアイコン・文言も併用）
        error: {
          DEFAULT: "#D13438",
          light: "#FDE7E8",
        },
        // 成功
        success: {
          DEFAULT: "#107C10",
          light: "#E6F4E6",
        },
      },
      spacing: {
        // 8の倍数を基本 (4, 8, 16, 24, 32, 40, 48, 56, 64)
        "18": "4.5rem",
        "22": "5.5rem",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "1.8",
      },
      ringWidth: {
        focus: "2px",
      },
      outlineOffset: {
        focus: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
