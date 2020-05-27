const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const mode = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development');

  const plugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ];

  const cssLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ];

  if (mode === "production") {
    plugins.unshift(
      new MiniCssExtractPlugin({
        filename: 'emails-input.css',
      })
    )
    cssLoaders.unshift(
      MiniCssExtractPlugin.loader,
    );
  } else {
    cssLoaders.unshift("style-loader");
  }

  return {
    mode,

    entry: ['./src/index.js'],

    output: {
      library: 'EmailsInput',
      libraryTarget: 'umd',
      globalObject: '(typeof self !== "undefined" ? self : this)',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist'),
      filename: 'emails-input.js',
      publicPath: config.get('publicPath')
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          use: cssLoaders,
        }
      ]
    },

    plugins,

    devServer: {
      // Open browser on server start
      open: config.get('open')
    },

    // Generate source map
    devtool: ('production' === process.env.NODE_ENV ? 'source-map' : 'eval-cheap-module-source-map'),
  };
};
