/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fuel: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
      },
      boxShadow: {
        premium: '0 20px 50px rgba(15, 23, 42, 0.18)',
        premiumDark: '0 20px 50px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(900px circle at 10% 10%, rgba(34, 197, 94, 0.20) 0%, rgba(34, 197, 94, 0) 60%), radial-gradient(900px circle at 90% 10%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0) 58%)',
      },
    },
  },
  plugins: [],
};
