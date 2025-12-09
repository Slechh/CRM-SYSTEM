/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors:{
        bgApp: "var(--bg-app)",
        bgBlock: "var(--bg-block)",
        userText: "var(--user-text)",
      }
    },
  },
  plugins: [],
};
