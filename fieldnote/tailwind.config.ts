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
          200: '#ced8c8',
          300: '#aabda3',
          400: '#849d7a',
          500: '#64805a',
          600: '#4e6546',
          700: '#3f5139',
          800: '#354330',
          900: '#2d392b',
        },
        sand: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e6dfd4',
          300: '#d4c9b8',
          400: '#bfaf98',
          500: '#b09d82',
          600: '#a18b6f',
          700: '#86735d',
          800: '#6e5f4f',
          900: '#5a4e43',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'sans-serif'],
        display: ['var(--font-zen-kaku)', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
