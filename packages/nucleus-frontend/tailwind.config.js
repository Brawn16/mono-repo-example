const ui = require("@tailwindcss/ui");
const theme = require("tailwindcss/defaultTheme");
const { borderWidth } = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [ui({ sidebar: true })],
  purge: false,
  variants: { borderWidth: ["last, first"] },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily.sans],
      },
    },
  },
};
