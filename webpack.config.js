// Generated using webpack-cli https://github.com/webpack/webpack-cli
// Pls do not touch
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: './client/src/index.jsx',
  mode: 'development',
  watch: !isProduction,
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
    publicPath: '/',
  },
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,

  },
  plugins: [new HtmlWebpackPlugin({
    template: './client/src/index.html',
    filename: './index.html',
  })],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
        
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
