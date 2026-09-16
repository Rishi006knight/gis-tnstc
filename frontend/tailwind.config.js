/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tnstc: {
          navy: '#0f294a',
          blue: '#1E40AF',
          lightBlue: '#3B82F6',
          sky: '#EFF6FF',
          amber: '#D97706',
          orange: '#F59E0B',
          emerald: '#059669',
          gold: '#B45309'
        }
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -5px rgba(30, 64, 175, 0.12)',
      }
    },
  },
  plugins: [],
}
