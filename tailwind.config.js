/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: ['class', '[data-theme="hombre"]', '[data-theme="mujer"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hombre: {
          fondo: "#365c7a",
          texto: "#fbf2e7",
          primario: "#1080e7",
        },
        mujer: {
          fondo: "#ffeff4",
          texto: "#5a2d45",
          primario: "#e8479b",
        },
      },
    },
  },
  plugins: [typography],
};
