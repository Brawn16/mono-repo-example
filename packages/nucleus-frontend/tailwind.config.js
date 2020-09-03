const ui = require("@tailwindcss/ui");
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [ui()],
  theme: {
    extend: {
      colors: {
        "sdh-blue": "#1c2453",
        "sdh-yellow": "#f7ac39",
      },
      fontFamily: {
        montserrat: ["Montserrat", "Lato", ...theme.fontFamily.sans],
        sans: ["Lato", ...theme.fontFamily.sans],
      },
      fontSize: {
        base: "1.125rem",
        lg: "1.2rem",
      },
    },
  },
};
