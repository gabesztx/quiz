'use strict';
const cookieHandler = require('./cookie.handler.server.js');
const userhandler = require('./userhandler.server.js');
const loadsh = require('./../bower_components/lodash/lodash.min.js');

const authentication = (app)=> {
  app.post('/register', (req, res)=> {
    const setCookie = (name, secret) => {
      res.cookie(name, secret);
    };
    const setObj = (whoami) => {
      res.send(whoami);
    };
    const getSecret = () => {
      return cookieHandler.setSecretCookie(req.body.name);
    };
    userhandler.setUser(req.body, (response)=> {
      if (loadsh._.has(req.cookies, response.name)) {
        setObj(response);
      } else {
        setCookie(response.name, getSecret());
        setObj(response);
      }
    });
  });
};

module.exports = (app)=> {
  authentication(app);
};

