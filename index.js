'use strict';

const express        = require('express');
const app            = express();
const server         = require('http').createServer(app);
const io             = require('socket.io')(server);
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');


const connection     = require('./server/connection.server.js');
const authentication = require('./server/authentication.server.js');

const port           = process.env.PORT || 5000;
app
  .use('/node_modules', express.static(__dirname + '/node_modules'))
  .use('/bower_components', express.static(__dirname + '/bower_components'))
  .use('/static', express.static(__dirname + '/static'))
  .use('/dist', express.static(__dirname + '/dist'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser());

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
});
server.listen(port);
authentication(app);
connection(io);