const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },

  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },

  target: "web",
};
