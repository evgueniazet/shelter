const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, "/src/js/index.js"),
    pets: path.resolve(__dirname, "/src/js/pets.js"),
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  mode: 'development',
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
      template: __dirname + "/src/index.html",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/pets.html",
      filename: 'pets.html',
      chunks: ['pets'],
    }),
  ],
  devServer: {
    static: './',
    port: 3000,
    open: true,
    hot: true,
  },
};