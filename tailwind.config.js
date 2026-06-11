/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f1',
          100: '#d9f0dd',
          200: '#b5e1be',
          300: '#85cb95',
          400: '#52b06b',
          500: '#2e8b48',
          600: '#68B581',
          700: '#1a6b32',
          800: '#17552a',
          900: '#144624',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e2e3e6',
          200: '#c4c5cc',
          300: '#9ea0ab',
          400: '#7a7c8a',
          500: '#5f6170',
          600: '#4a4c58',
          700: '#39364E',
          800: '#2d2b3d',
          900: '#1a1a24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};