import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['var(--font-noto-sans-jp)'],
        'playfair': ['var(--font-playfair)'],
      },
      colors: {
        gold: {
          light: '#d4a574',
          DEFAULT: '#c89666',
        },
        cream: {
          light: '#fce4d6',
          DEFAULT: '#f4e4d7',
        },
        ivory: '#fafaf8',
        peach: '#fef7f0',
      },
    },
  },
  plugins: [],
};

export default config;
