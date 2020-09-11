const CopyPlugin = require("copy-webpack-plugin");
const { lib } = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { IgnorePlugin } = require("webpack");

const { isLocal } = lib.webpack;

module.exports = {
  devtool: "nosources-source-map",
  entry: lib.entries,
  externals: {
    "aws-sdk": "aws-sdk",
  },
  mode: isLocal ? "development" : "production",
  module: {
    rules: [
      {
        include: /node_modules/,
        test: /\.mjs$/,
        type: "javascript/auto",
      },
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  optimization: isLocal
    ? undefined
    : {
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              keep_classnames: true,
            },
          }),
        ],
      },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: ".env.local",
          noErrorOnMissing: true,
        },
        ".env",
        "jwt.key",
      ],
    }),
    new IgnorePlugin(/pg-native/),
  ],
  resolve: {
    extensions: [".js", ".mjs", ".ts"],
  },
  stats: "errors-only",
};
