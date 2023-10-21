module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
  },
}
