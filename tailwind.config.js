/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        tow: {
          primary: '#FF6B35', // Vibrant Orange
          primaryDark: '#E85D31',
          accent: '#FF9F73', // Light peach/orange accent
          ink: '#111111',
          lightText: '#EAEAEA',
          surface: '#FDFBF7', // Off-white/warm
          surfaceBright: '#FFFFFF',
          surfaceDark: '#1A1A1A',
          muted: '#5B5B66',
          border: '#E0DDD8',
          borderDark: '#333333',
          bg: '#F5F2EB', // Soft beige bg
          bgMuted: '#EAE5DB',
          bgDark: '#0A0A0A', // Dark mode bg
          bgDarkMuted: '#141414',
        },
      },
      boxShadow: {
        soft: '0 16px 40px -20px rgba(15, 15, 30, 0.28)',
        card: '0 1px 0 rgba(15, 15, 30, 0.04), 0 12px 32px -18px rgba(15, 15, 30, 0.2)',
      },
      backgroundImage: {
        'tow-hero':
          'radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.15), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255, 159, 115, 0.1), transparent 42%), linear-gradient(135deg, #F5F2EB 0%, #EAE5DB 100%)',
        'tow-atmosphere':
          'radial-gradient(ellipse 100% 60% at 85% 0%, rgba(255, 107, 53, 0.07), transparent 55%), radial-gradient(ellipse 80% 50% at 0% 100%, rgba(255, 159, 115, 0.06), transparent 50%)',
      },
    },
  },
  plugins: [],
}

