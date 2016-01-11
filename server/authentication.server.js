'use strict';

const userhandler = require('./userhandler.server.js');
//const loadsh = require('./../bower_components/lodash/lodash.min.js');
const authentication = (app)=> {

  app.post('/login', (req, res)=> {
    userhandler.loginUser(req.body, req, res)
      .then(
        (success)=> {
          res.send(success);
        },
        (error)=> {
          res.send(error);
        }
      );
  });

  app.post('/register', (req, res)=> {
    userhandler.registerUser(req.body, req, res)
      .then(
        (success)=> {
          res.send(success);
        },
        (error)=> {
          res.send(error);
        }
      );
  });

  app.get('/whoami', (req, res)=> {
    res.send(userhandler.getWhoAmI(req,res));
  })
};

module.exports = (app)=> {
  authentication(app);
};
