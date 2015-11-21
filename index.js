const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;
const connection = require('./server/connection.js');

app
  .use('/node_modules', express.static(__dirname + '/node_modules'))
  .use('/bower_components', express.static(__dirname + '/bower_components'))
  .use('/static', express.static(__dirname + '/static'))
  .use('/dist', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port);
connection(io);



