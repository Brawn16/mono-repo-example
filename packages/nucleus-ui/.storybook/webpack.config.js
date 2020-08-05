const { resolve } = require("path");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = async ({ config }) => {
  config.module.rules.find(
    rule => rule.test.toString() === "/\\.css$/"
  ).exclude = /\.module\.css$/;

  config.module.rules.push(
    {
      test: /\.module\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [tailwindcss, autoprefixer]
          }
        }
      ],
      include: resolve(__dirname, "..")
    }
  );
  return config;
};
