import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f4",
          100: "#d9ebe3",
          200: "#b6d7c9",
          300: "#88bca7",
          400: "#5d9d83",
          500: "#3d8169",
          600: "#2d6754",
          700: "#265345",
          800: "#214339",
          900: "#1d3830",
          950: "#0e1f1a",
        },
        cream: {
          50: "#fdfcf9",
          100: "#f9f6ef",
          200: "#f3ede1",
          300: "#e9dfca",
          400: "#dcc9a8",
          500: "#cdb488",
        },
        earth: {
          100: "#e8e4dc",
          200: "#d4cec2",
          300: "#b8afa0",
          400: "#9a8e7a",
          500: "#7d7260",
        },
        gold: {
          300: "#e8d5a3",
          400: "#d4b96a",
          500: "#c4a84a",
          600: "#a88b2e",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif JP", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Noto Sans JP", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "grow": "grow 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        grow: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        "paper-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
