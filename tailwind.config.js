// tailwind.config.js
const { tailwindTheme } = require('./src/styles/theme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add our custom theme colors to Tailwind
        primary: tailwindTheme.primary,
        secondary: tailwindTheme.secondary,
        tertiary: tailwindTheme.tertiary,
        'background-1': tailwindTheme.background1,
        'background-2': tailwindTheme.background2,
        'primary-hover': tailwindTheme.primaryHover,
      },
      backgroundImage: {
        'main-gradient': `linear-gradient(to bottom, ${tailwindTheme.background1}, ${tailwindTheme.background2})`,
        'cta-gradient': `linear-gradient(to right, ${tailwindTheme.primary}, ${tailwindTheme.tertiary})`,
      },
    },
  },
  plugins: [],
}