/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1180px",
    },
    extend: {
      colors: {
        primary: "#2874f0",
        secondary: "#172337",
        Ftext: "#878787",
      },
    },
  },
  plugins: [],
}

