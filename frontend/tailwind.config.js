/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f35919',
          50: '#fff6f3',
          100: '#ffede7',
          200: '#ffdad0',
          300: '#ffbcad',
          400: '#ff9279',
          500: '#f35919',
          600: '#df4208',
          700: '#ba3006',
          800: '#94260b',
          900: '#77220e',
          container: '#fff6f3',
        },
        health: {
          safe: '#10b981',
          'safe-bg': '#e6f8f0',
          caution: '#f59e0b',
          'caution-bg': '#fef3c7',
          alert: '#ef4444',
          'alert-bg': '#fee2e2',
        },
        success: {
          DEFAULT: '#10b981',
          bg: '#e6f8f0',
          container: '#e6f8f0',
          dark: '#059669',
        },
        danger: {
          DEFAULT: '#ef4444',
          bg: '#fee2e2',
          container: '#fee2e2',
          dark: '#dc2626',
        },
        error: {
          DEFAULT: '#ef4444',
          bg: '#fee2e2',
          container: '#fee2e2',
          dark: '#dc2626',
        },
        warning: {
          DEFAULT: '#f59e0b',
          bg: '#fef3c7',
          container: '#fef3c7',
          dark: '#d97706',
        },
        surface: {
          DEFAULT: '#f8fafc',
          canvas: '#f8fafc',
          card: '#ffffff',
          dim: '#eff4ff',
          border: '#e2e8f0',
        },
        gray: {
          bg: '#f8fafc',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0px 2px 8px -2px rgba(15, 23, 42, 0.04), 0px 1px 4px -1px rgba(15, 23, 42, 0.02)',
        floating: '0px 12px 28px -6px rgba(15, 23, 42, 0.08), 0px 4px 12px -2px rgba(15, 23, 42, 0.04)',
        coral: '0 10px 25px -4px rgba(243, 89, 25, 0.35)',
        'coral-sm': '0 4px 12px -2px rgba(243, 89, 25, 0.25)',
      },
    },
  },
  plugins: [],
}

