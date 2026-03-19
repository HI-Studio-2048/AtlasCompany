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
          950: '#000000',
          900: '#0A0A0A',
          800: '#111111',
          700: '#161616',
          600: '#1C1C1C',
          500: '#262626',
        },
        gold: {
          100: '#FFEAED',
          200: '#FFBFC6',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, #1C1C1C 0%, #0A0A0A 60%, #000000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #DC2626 0%, #F87171 50%, #DC2626 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(28,28,28,0.6) 0%, rgba(17,17,17,0.8) 100%)',
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
          from: { boxShadow: '0 0 20px rgba(220,38,38,0.3)' },
          to: { boxShadow: '0 0 40px rgba(220,38,38,0.7)' },
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
