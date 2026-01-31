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
        sage: {
          50: "#f4f6f2",
          100: "#e8ece4",
          200: "#d4dcc9",
          300: "#b5c4a5",
          400: "#95a87d",
          500: "#7a8f5f",
          600: "#5f7349",
          700: "#4c5a3b",
          800: "#404a33",
          900: "#373f2e",
        },
        cream: {
          50: "#fdfcf9",
          100: "#faf8f2",
          200: "#f5f0e6",
          300: "#ebe3d4",
          400: "#ddd0bb",
        },
        charcoal: {
          50: "#6b6b6b",
          100: "#5a5a5a",
          200: "#4a4a4a",
          300: "#3d3d3d",
          400: "#2d2d2d",
          500: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
