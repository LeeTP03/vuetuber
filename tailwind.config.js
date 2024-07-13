/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
}