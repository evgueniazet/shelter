const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, "/src/js/index.js"),
    pets: path.resolve(__dirname, "/src/js/pets.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    clean: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./images/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/index.html"),
      inject: 'body',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/pets.html"),
      inject: 'body',
      filename: 'pets.html',
      chunks: ['pets'],
    }),

    new MiniCssExtractPlugin(),
  ],
};