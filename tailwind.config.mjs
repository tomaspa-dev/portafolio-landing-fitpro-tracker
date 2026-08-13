/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0A0E14',
        surface: '#111923',
        'surface-2': '#182233',
        accent: '#4ADE80',
        'accent-dim': 'rgba(74, 222, 128, 0.12)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.12' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};