/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {

      fontFamily: {
        lora: ['Lora', 'serif'],
        roboto: ['Roboto', 'system-ui'],
        montserrat: ['Montserrat'],
        futura: ['Futura', 'sans-serif']
      },
      backgroundImage: {
        'tagline-gradient': 'repeating-linear-gradient(to right, #a2682a 0%, #be8c3c 8%, #be8c3c 18%, #d3b15f 27%, #faf0a0 35%, #ffffc2 40%, #faf0a0 50%, #d3b15f 58%, #be8c3c 67%, #b17b32 77%, #bb8332 83%, #d4a245 88%, #e1b453 93%, #a4692a 100%);',
        'heading-gradient' : 'linear-gradient(90deg, #BBA15F, #E1CB84, #E2CE85, #B38728, #D7BE6F, #DCC57C, #C19C49, #AA771C);'
      },
      
      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
