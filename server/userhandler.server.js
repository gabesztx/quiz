'use strict';
const jsonfile = require('jsonfile');
const cookieHandler = require('./cookie.handler.server.js');
let users = {};
let userId;


const userChecker = (userName, password, isLogin, checkValue) => {
  this.action = {

    register: ()=> {
      let isAlready = false;
      Object.keys(users).forEach((key) => {
        if (userName === users[key].userServerData.name) {
          isAlready = true;
        }
      });
      return isAlready;
    },

    login: ()=> {
      let isAlready = false;
      Object.keys(users).forEach((key) => {
        if (userName === users[key].userServerData.name && password === users[key].userServerData.password) {
          if(isLogin !== users[key].userServerData.login){
            users[key].userServerData.login = isLogin;
            users[key].whoami.login = isLogin;
            fileHandler.setUserdataToJson(users);
          }
          isAlready = true;
        }
      });
      return isAlready;
    }
  };

  return this.action[checkValue]();
};

const getUserId = (usersName)=> {
  let userID;
  Object.keys(users).forEach((key) => {
    if (users[key].userServerData.name === usersName) {
      userID = key;
    }
  });
  return userID

};

let userHandler = {

  loginUser: (userdata, req, res)=> {
    return new Promise((resolve, reject) => {
      if (userChecker(userdata.name, userdata.password, userdata.login, 'login')) {
        const userId = getUserId(userdata.name);
        cookieHandler.setCookie(req, res, {'id': userId, 'login': userdata.login});
        reject(users[userId].whoami);
      } else {
        reject(authError.loginError)
      }
    });
  },

  registerUser: (userdata, req, res)=> {
    return new Promise((resolve, reject) => {
      if (userChecker(userdata.name, userdata.password, userdata.login, 'register')) {
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
        cookieHandler.setCookie(req, res, {'id': userId, 'login': userdata.login});
        resolve(users[userId].whoami);
        userId++;
      }
    });

  },

  getWhoAmI: (req, res) => {
    const user = users[cookieHandler.getCookie(req).id] ? users[cookieHandler.getCookie(req).id].whoami : {};
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
  'loginUser': userHandler.loginUser,
  'registerUser': userHandler.registerUser,
  'addUser': userHandler.addUser,
  'addEndPos': userHandler.addUserPosition,
  'removeUser': userHandler.removeUser,
  'getUserList': userHandler.getUserList
};
