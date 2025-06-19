/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          'Nunito',
          'Comic Neue',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        primary: colors.pink,
        mint: {
          50: '#e6fff7',
          100: '#b8ffe3',
          200: '#7fffd4',
          300: '#5fffd0',
          400: '#3fffc1',
          500: '#2de6a6',
          600: '#1dbb85',
          700: '#15996b',
          800: '#0e7a54',
          900: '#095c3d',
        },
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      borderRadius: {
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        pastel: '0 2px 8px 0 rgba(255, 182, 193, 0.12), 0 1.5px 4px 0 rgba(127, 255, 212, 0.10)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["pastel"],
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
} 