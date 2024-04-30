/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        green: {
          300: "#00B37E",
          500: "#00875F",
          700: "#015F43",
        },
        blue: {
          500: "#81D8F7",
        },
        orange: {
          500: "#FBA94C",
        },
        red: {
          500: "#F75A68",
          600: "#dd1c1a",
        },
        gray: {
          100: "#E1E1E6",
          200: "#C4C4CC",
          300: "#8D8D99",
          400: "#3b3b3b",
          500: "#323238",
          600: "#29292E",
          700: "#121214",
          900: "#09090A",
        },
        types: {
          fire: "#f54f4f",
          grass: "#49D0B0",
          water: "#76BEFE",
          electric: "#FCC719",
          dragon: "#f1a541",
          poison: "#BA68C8",
          normal: "#FFD289",
          bug: "#77B28C",
          ground: "#C5A48A",
          rock: "#A27035",
          fighting: "#F44E3F",
          fairy: "#F9D4BB",
          ice: "#AEECEF",
          psychic: "#EEC8E0",
          steel: "#C1B4AE",
          dark: "#71677C",
        },
      },
    },
  },
  plugins: [],
};
