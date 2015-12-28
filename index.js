'use strict';

const express      = require('express');
const app          = express();
const server       = require('http').createServer(app);
const io           = require('socket.io')(server);
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

//const cookieHandler = require('./server/cookie.handler.server.js');
const connection   = require('./server/connection.server.js');
const loadsh       = require('./bower_components/lodash/lodash.min.js');
const port         = process.env.PORT || 5000;

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

app.get('/whoami', (req, res)=> {
  if (loadsh._.isEmpty(req.cookies)) {}
  //res.cookie('cookie_value', 'meszi12aaa');
  //res.send('whoamiok');
});
//cookieHandler(app);

/*app.post('/register', function (req, res) {
 //console.log('register');
 //console.log(req.body.name);
 //res.send('post ok');
 });*/
server.listen(port);
connection(io);
