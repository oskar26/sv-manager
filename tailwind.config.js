/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0e3480',
        secondary: '#f7c41b',
        background: '#f8fafc',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(14, 52, 128, 0.1)',
      },
      screens: {
        xs: '475px',
      }
    },
  },
  plugins: [],
};