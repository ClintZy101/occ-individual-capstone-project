/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-right-to-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'pulseGlow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 1)' },
        },
      },
      'animation': {
        'slide-right-to-left': 'slide-right-to-left 10s linear infinite',
        'pulseGlow': 'pulseGlow 1.5s infinite',
      },
    },
  },
  plugins: [],
});

