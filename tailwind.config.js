module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans 3", 'sans-serif']
      },
      colors: {
        'primary-color': 'rgb(var(--primary-color) / <alpha-value>)',
        'secondary-color': 'rgb(var(--secondary-color) / <alpha-value>)',
        'secondary-color-light': 'rgb(var(--secondary-color-light) / <alpha-value>)',
        'tertiary-color': 'rgb(var(--tertiary-color) / <alpha-value>)',
        'accent-text-color': 'rgb(var(--accent-text-color) / <alpha-value>)',
        'body-text-color': 'rgb(var(--body-text-color) / <alpha-value>)',
        'field-border': 'rgb(var(--field-border) / <alpha-value>)',
        'accent-color': 'rgb(var(--accent-color) / <alpha-value>)'
      }
    },
  },
  plugins: [],
}