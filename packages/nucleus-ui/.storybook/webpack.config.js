const { resolve } = require("path");

module.exports = async ({ config }) => {
  config.module.rules.find(
    (rule) => rule.test.toString() === "/\\.css$/"
  ).exclude = /\.module\.css$/;

  config.module.rules.push(
    {
      test: /\.module\.css$/,
      use: [
        "style-loader",
        "css-modules-typescript-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        },
      ],
      include: resolve(__dirname, "../"),
    }
  );
  return config;
};
