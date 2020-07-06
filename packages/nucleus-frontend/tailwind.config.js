const ui = require("@tailwindcss/ui");
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [ui({ sidebar: true })],
  purge: ["**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily.sans],
      },
    },
  },
};
