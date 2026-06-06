/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Original dashboard colours (used by all inner pages)
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#F9F6F1',
        },
        border: '#D7CCC8',
        text: {
          primary: '#3E2723',
          muted: '#8D6E63',
        },
        accent: {
          blue: '#6D4C41',
          emerald: '#8D6E63',
        },
        risk: {
          safe: '#2E7D32',
          low: '#2E7D32',
          medium: '#F9A825',
          high: '#D32F2F',
          critical: '#B71C1C',
        },

        // New luxury landing page colours
        gold: {
          50: '#FBF6E9',
          100: '#F5EACC',
          200: '#E8D5A3',
          400: '#C9A84C',
          600: '#9A7A28',
          800: '#6B5218',
        },
        brown: {
          50: '#F5F0EA',
          100: '#E8DDD0',
          200: '#C8B49A',
          400: '#8C6A4A',
          700: '#4A3220',
          900: '#1C1007',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dk: '#F2EDE4',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      boxShadow: {
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}