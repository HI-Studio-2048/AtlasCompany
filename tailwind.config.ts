import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020817',
          900: '#0A0F1E',
          800: '#0D1629',
          700: '#152238',
          600: '#1E2D4F',
          500: '#2A3F6A',
        },
        gold: {
          100: '#FDF5D8',
          200: '#FAE9A0',
          300: '#F5D77E',
          400: '#E5C158',
          500: '#D4AF37',
          600: '#B8942A',
          700: '#9A7A20',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, #1E2D4F 0%, #0A0F1E 60%, #020817 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5D77E 50%, #D4AF37 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(30,45,79,0.6) 0%, rgba(13,22,41,0.8) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          to: { boxShadow: '0 0 40px rgba(212, 175, 55, 0.7)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
