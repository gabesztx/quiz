const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'static'),
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    './entry.js'
  ],
  output: {
    path: path.join(__dirname, 'build/js'),
    publicPath: '/',
    filename: "main.js"
  },
  watch: true,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          plugins: ['syntax-async-functions', 'syntax-decorators'],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("../css/style.css"),
/*    new BrowserSyncPlugin(
      {
        files: ['build/css/!*.css'],
        port: 3000,
        //proxy: 'http://localhost:8080',
        open: true,
        "server": './'
      }, {
        reload: false
      }
    ),*/
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};


