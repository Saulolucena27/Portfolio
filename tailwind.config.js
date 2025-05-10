/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tiger-black": "#000000",
        "tiger-bronze": "#b97836",
        "tiger-dark": "#7d5023",
        "tiger-light": "#e8a653",
      },
      fontFamily: {
        heading: ["Anton", "sans-serif"], // Adicione esta linha
        sans: ["Inter", "sans-serif"], // E esta também
      },
    },
  },
  plugins: [],
};
