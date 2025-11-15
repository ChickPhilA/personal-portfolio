/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        viga: ['"Viga"', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive']
      },
      backgroundImage: {
        'home': "url('../src/images/home_photo.JPG')"
      },
      colors: {
        'transparent': 'rgba(0, 0, 0, 0)'
      }
    },
  },
  plugins: [],
};