import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f6f3',
          100: '#e6ebe2',
          200: '#cfd9c8',
          300: '#aabfa3',
          400: '#82a078',
          500: '#63845c',
          600: '#4d6946',
          700: '#3f553a',
          800: '#354531',
          900: '#2d3a2b',
        },
        beige: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e8dfd2',
          300: '#d9c9b4',
          400: '#c7af92',
          500: '#b89878',
          600: '#ab876a',
          700: '#8f6e58',
          800: '#765b4b',
          900: '#614c3f',
        },
        terracotta: {
          50: '#fdf6f4',
          100: '#fbeae6',
          200: '#f8d9d1',
          300: '#f2bdb0',
          400: '#e99682',
          500: '#dd7358',
          600: '#c95a3e',
          700: '#a94632',
          800: '#8c3c2e',
          900: '#75352a',
        },
        cream: '#fdfbf7',
        'soft-white': '#faf8f5',
      },
      fontFamily: {
        heading: ['Zen Old Mincho', 'var(--font-zen-old-mincho)', 'serif'],
        body: ['Zen Kaku Gothic New', 'var(--font-zen-kaku)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
