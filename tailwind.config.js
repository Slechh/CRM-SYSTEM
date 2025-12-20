/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "15px",
          md: "20px",
          lg: "20px",
          xl: "40px",
        },
        screens: {
          DEFAULT: "100%",
          sm: "390px",
          md: "768px",
          lg: "1440px",
          xl: "1920px",
        },
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        bgApp: "var(--bg-app)",
        bgBlock: "var(--bg-block)",
        bgNavBlock: "var(--bg-nav-block)",
        bgModal: "var(--bg-modal)",
        bgLine: "var(--bg-line)",
        userText: "var(--user-text)",
        navText: "var(--nav-text)",
        cardText: "var(--card-text)",
        switcherText: "var(--switcher-text)",
        formBorder: "var(--form-border)",
        overviewSwitcher: "var(--overview-switcher)",
      },
    },
  },
  plugins: [],
};
