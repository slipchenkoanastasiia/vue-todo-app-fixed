/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
    safelist: [
    'bg-gray-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}