const CopyPlugin = require("copy-webpack-plugin");
const { lib } = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { IgnorePlugin } = require("webpack");

module.exports = {
  entry: lib.entries,
  externals: {
    argon2: "argon2",
    "aws-sdk": "aws-sdk",
  },
  mode: "production",
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        sourceMap: true,
        terserOptions: {
          keep_classnames: true,
          sourceMap: true,
        },
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [".env", ".env.local", "jwt.key"],
    }),
    new IgnorePlugin(/pg-native/),
  ],
  resolve: {
    extensions: [".js", ".mjs", ".ts"],
  },
  stats: {
    warnings: false,
  },
  target: "node",
};
