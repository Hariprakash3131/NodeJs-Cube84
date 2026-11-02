/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0B0C',
          surface: '#141416',
          elevated: '#1B1B1E',
          card: 'rgba(20, 20, 22, 0.75)'
        },
        text: {
          primary: '#F3F3F4',
          secondary: '#A3A3AA',
          muted: '#686873',
        },
        accent: {
          DEFAULT: '#D9FF3D', // Electric citron / lime accent
          hover: '#C5EC27',
          glow: 'rgba(217, 255, 61, 0.25)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.18)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Fraunces"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em',
        ultra: '0.2em',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
