const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",

  entry: path.resolve(__dirname, "../src/index.jsx"),

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
    ],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
};
