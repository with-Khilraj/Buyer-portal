export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002147",
        "primary-dark": "#001b3d",
        secondary: "#8E793E",
        "secondary-light": "#dec482",
        surface: "#f9f9fb",
        "surface-container": "#eeeef0",
      },
      fontFamily: {
        serif: ["Noto Serif", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};