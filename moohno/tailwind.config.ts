import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#fcfcfc",
        darkgray: "#333333",
        accent: "#a8d4e6",
        warmbeige: "#e8dfd4",
      },
      fontFamily: {
        sans: ["var(--font-zen)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "duck-walk": "duck-walk 0.4s steps(2) infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "duck-walk": {
          "0%, 100%": { transform: "translateX(0) scaleX(1)" },
          "50%": { transform: "translateX(4px) scaleX(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
