/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#070b09',
          surface: '#0e1512',
          card: '#111a15',
          border: '#1d2b23',
          borderLight: '#2a3b31',
          text: '#eaf6ef',
          textSecondary: '#c2d6cb',
          dim: '#8fa79a',
          accent: '#10b981',
          accent2: '#34d399',
          accentDeep: '#059669',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #059669, #34d399)',
        'emerald-radial': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        'emerald-glow': 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 60%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        circuitScan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'circuit-scan': 'circuitScan 8s linear infinite',
      },
    },
  },
  plugins: [],
}
