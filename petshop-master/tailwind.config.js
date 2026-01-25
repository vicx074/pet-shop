/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'petclin-green': '#006400',
        'petclin-light': '#008F39',
        'petclin-orange': '#FF8C00', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Anton', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}