import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0d0d0d', alt: '#111111' },
        card: '#181818',
        text: { DEFAULT: '#efefef', muted: '#666666' },
        accent: { DEFAULT: '#e05020', dark: '#c04018' },
        border: '#242424',
        white: '#ffffff',
        push: '#e03030',
        pull: '#2090e0',
        legs: '#20c050',
        rest: '#666666',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
