var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: './',
  hot: true,
  filename: ['main.js'],
  publicPath: '/',
  noInfo: false,
  stats: {
    colors: true
  }
});

server.listen(8080, 'localhost', function () {
});


/*import express from 'express';
 import bodyParser from 'body-parser';
 import cookieParser from 'cookie-parser';
 import connection from './server/connection.server.js';
 import authentication from './server/authentication.server.js';

 const app = express();
 const server = require('http').createServer(app);
 const io = require('socket.io')(server);
 const port = process.env.PORT || 5000;


 app
 .use('/node_modules', express.static(__dirname + '/node_modules'))
 .use('/bower_components', express.static(__dirname + '/bower_components'))
 .use('/static', express.static(__dirname + '/static'))
 .use('/build', express.static(__dirname + '/build'))
 .use(bodyParser.json())
 .use(bodyParser.urlencoded({extended: true}))
 .use(cookieParser());*/


/*(function () {
 // Step 1: Create & configure a webpack compiler
 var webpack = require('webpack');
 var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
 var compiler = webpack(webpackConfig);
 // Step 2: Attach the dev middleware to the compiler & the server
 app.use(require("webpack-dev-middleware")(compiler,
 {
 noInfo: true,
 publicPath: "/assets/",
 watchOptions: {
 aggregateTimeout: 300,
 poll: true
 },
 headers: {"X-Custom-Header": "yes"},
 stats: {
 colors: true
 }

 }));

 // Step 3: Attach the hot middleware to the compiler & the server
 app.use(require("webpack-hot-middleware")(compiler, {
 log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
 }));
 })();*/
