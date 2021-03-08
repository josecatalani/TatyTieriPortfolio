const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns:[
        { from: path.resolve(__dirname, "../src/_data"), to: "data" },
        {
          from: path.resolve(__dirname, "../src/admin"),
          to: "admin",
        },
        {
          from: path.resolve(__dirname, "../src/assets/images"),
          to: "assets/images",
        }
    ]}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
    ],
  },
};
