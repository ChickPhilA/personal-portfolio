/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        viga: ['"Viga"', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive']
      },
    },
  },
  plugins: [],
};