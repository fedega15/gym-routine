import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#F2F6F5', alt: '#E6EDEB' },
        text: { DEFAULT: '#1A2A2A', muted: '#5E7272' },
        accent: { DEFAULT: '#4ECDC4', dark: '#3AA89F' },
        warm: '#4ECDC4',
        border: '#C0D0CD',
        white: '#FAFCFB',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
