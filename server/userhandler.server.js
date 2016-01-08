'use strict';
const jsonfile = require('jsonfile');
const cookieHandler = require('./cookie.handler.server.js');
let users = {};
let userId;

const chekUsers = (users, userName, userObj, userObjKey)=> {
  let isAlready = false;
  Object.keys(users).forEach((key) => {
    if (userName === users[key][userObj][userObjKey]) {
      isAlready = true;
    }
  });
  return isAlready;
};

let userHandler = {
  registerUser: (userdata, req, res)=> {
    return new Promise((resolve, reject) => {
      if (chekUsers(users, userdata.name, 'userServerData', 'name')) {
        console.log('ERROR');
        reject(authError.registerError)
      } else {
        users[userId] = {
          'userServerData': userdata,
          'whoami': {
            name: userdata.name,
            login: userdata.login,
            path: '/home'
          }
        };
        fileHandler.setUserdataToJson(users);
        cookieHandler.setCookie(req, res, {'id':userId, 'login':userdata.login});
        resolve(users[userId].whoami);
        userId++;
      }
    });

  },

  getWhoAmI: (req, res) => {
    const user = users[cookieHandler.getCookie(req).id].whoami;
    if (!user.login) {
      console.log('getWhoAmI and deleted cookie');
      cookieHandler.clearCookie(res);
    }
    return user.login ? user : {};
  }


  /* setFileDataBase: (users)=> {
   fileHandler.setUserdataToJson(users);
   },*/
  /*
   addUser: (data, socketID)=> {
   const user = {
   'name': data.userName,
   'id': socketID,
   'characterId': data.characterId,
   'endPos': parseInt(Math.random() * 100)
   };
   users[socketID] = user;
   return user;
   },
   removeUser: (userId)=> {
   delete users[userId];
   return users;
   },
   getUserList: ()=> {
   return users;
   },
   addUserPosition: (userId, pos)=> {
   users[userId].endPos = pos;
   return users;
   }*/
};

const fileHandler = {
  file: 'data.json',
  setUserdataToJson: (dataBase)=> {
    jsonfile.writeFileSync(fileHandler.file, dataBase, {spaces: 2});
  },
  getUserdataToJson: ()=> {
    jsonfile.readFile(fileHandler.file, (err, obj) => {
      users = obj || {};
      userId = Object.keys(users).length;
    });
  }
};

const authError = {
  'registerError': {
    'error': 'Username or password is already!'
  },
  'loginError': {
    'error': 'Invalide username or password!'
  }
};


fileHandler.getUserdataToJson();

module.exports = {
  'getWhoAmI': userHandler.getWhoAmI,
  'registerUser': userHandler.registerUser,
  'addUser': userHandler.addUser,
  'addEndPos': userHandler.addUserPosition,
  'removeUser': userHandler.removeUser,
  'getUserList': userHandler.getUserList
};
