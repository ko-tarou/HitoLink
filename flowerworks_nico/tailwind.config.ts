import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFCF8',
        'pale-beige': '#F5F2EB',
        'sage': {
          50: '#F4F6F2',
          100: '#E8EDE0',
          200: '#D4DDC8',
          300: '#A8B89A',
          400: '#7A8F6A',
          500: '#5C6F4E',
          600: '#4A5A3E',
        },
        'dusty-pink': {
          50: '#FBF6F5',
          100: '#F5EAE8',
          200: '#E8D4D0',
          300: '#D4A89F',
          400: '#C0887A',
          500: '#A86F62',
        },
        charcoal: '#2C2C2C',
        'charcoal-light': '#4A4A4A',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-zen-kaku)', 'sans-serif'],
      },
      animation: {
        'zoom-slow': 'zoom-slow 20s ease-out forwards',
      },
      keyframes: {
        'zoom-slow': {
          '0%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
