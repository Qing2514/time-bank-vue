const withAnimations = require('animated-tailwindcss')

module.exports = withAnimations({
  content: [
    './assets/**/*.{css,sass}',
    './components/**/*.{vue,ts,tsx}',
    './layouts/**/*.{vue,tsx}',
    './pages/**/*.{vue,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Nunito',
          'Noto Sans SC',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
})
