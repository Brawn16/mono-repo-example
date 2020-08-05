require("dotenv").config();

module.exports = {
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-knobs",
    "@storybook/addon-actions",

    "@storybook/addon-viewport",
    "@storybook/preset-typescript"
  ],
  stories: ["../src/**/*.stories.tsx"]
};
