const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + "/src/js/index.js",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      inject: 'body'
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    static: './',
    port: 3000,
    open: true,
    hot: true,
  },
};