/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2874f0',
        secondary: '#fb641b',
        gray: {
          100: '#f8f8f8',
          200: '#f1f3f6',
          300: '#e0e0e0',
          400: '#666666',
          500: '#212121'
        }
      }
    }
  },
  plugins: []
};