import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pakgreen: {
          50: '#e6f4ed',
          100: '#c3e4d4',
          200: '#9bd2b7',
          300: '#6fbd97',
          400: '#48a87a',
          500: '#238e5d',
          600: '#147348',
          700: '#065F46', // Deep Pakistan Green Light
          800: '#01411C', // Official Deep Pakistan Green
          900: '#012c13',
          950: '#00190a',
        },
        pakgold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706', // Warm Sunlight Gold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        scamred: {
          500: '#ef4444',
          600: '#dc2626', // Scam Crimson
          700: '#b91c1c',
        },
        safegreen: {
          500: '#10b981',
          600: '#059669', // Verified Emerald
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaliq', 'serif'],
      },
      animation: {
        'pulse-glowing': 'pulseGlowing 2s infinite',
        'shield-glow': 'shieldGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlowing: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(217, 119, 6, 0.7)' },
          '50%': { transform: 'scale(1.06)', boxShadow: '0 0 0 15px rgba(217, 119, 6, 0)' },
        },
        shieldGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(5, 150, 105, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 18px rgba(5, 150, 105, 0.8))' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
