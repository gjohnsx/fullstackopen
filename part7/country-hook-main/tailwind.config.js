/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greg: '#02506E',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
