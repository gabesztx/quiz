/*'use strict';

 const express = require('express');
 const app = express();
 const server = require('http').createServer(app);
 const io = require('socket.io')(server);
 const bodyParser = require('body-parser');
 const cookieParser = require('cookie-parser');

 const connection = require('./server/connection.server.js');
 const authentication = require('./server/authentication.server.js');

 const port = process.env.PORT || 5000;
 app
 .use('/node_modules', express.static(__dirname + '/node_modules'))
 .use('/bower_components', express.static(__dirname + '/bower_components'))
 .use('/static', express.static(__dirname + '/static'))
 .use('/build', express.static(__dirname + '/build'))
 .use(bodyParser.json())
 .use(bodyParser.urlencoded({extended: true}))
 .use(cookieParser());

 app.get('/', (req, res)=> {
 res.sendFile(__dirname + '/index.html');
 });

 server.listen(port);
 authentication(app);
 connection(io);*/


'use strict';
import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connection from './server/connection.server.js';
import authentication from './server/authentication.server.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';


const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socket(server);

app
  .use('/node_modules', express.static(__dirname + '/node_modules'))
  .use('/bower_components', express.static(__dirname + '/bower_components'))
  .use('/static', express.static(__dirname + '/static'))
  .use('/build', express.static(__dirname + '/build'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser());

const bundler = webpack(config);
const middleware = webpackMiddleware(bundler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(bundler));

/*app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
});*/


authentication(app);
//connection(io);
server.listen(port);
