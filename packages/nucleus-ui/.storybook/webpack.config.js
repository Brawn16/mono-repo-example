const { resolve } = require("path");

module.exports = async ({ config }) => {
  config.module.rules.push({
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
  });
  return config;
};
