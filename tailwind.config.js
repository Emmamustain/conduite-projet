/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce-slow 3s infinite",
      },
      colors: {
        "qt-pink": "#FF6B9D",
        "qt-blue": "#4DA6FF",
        "qt-light-pink": "#FFB6C1",
        "qt-light-blue": "#87CEEB",
      },
    },
  },
  plugins: [],
};
