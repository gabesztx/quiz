const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'static/entry.js')
  ],
  output: {
    path: path.join(__dirname, '/'),
    publicPath: '/',
    filename: 'build/js/main.js'
  },
  //watch: true,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:3]'
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: 'style!css!less?modules&localIdentName=[name]_[local]_[hash:base64:3]'
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['syntax-async-functions', 'syntax-decorators']
        }
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      }
    ]
  },
  plugins: [
    //new ExtractTextPlugin("build/css/style.css"),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        ui: {
          port: 8080,
          weinre: {
            port: 9090
          }
        },
        open: true,
        proxy: 'http://localhost:5000',
        scrollElements: ['.scroller'],
        files: ['build/**/*.*', '*.html']
      },
      {
        reload: false
      }
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};


