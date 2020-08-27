const ui = require("@tailwindcss/ui");
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  plugins: [ui({ sidebar: true })],
  purge: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily.sans],
      },
    },
  },
};
