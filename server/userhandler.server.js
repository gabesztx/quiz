'use strict';

import jsonfile from 'jsonfile';
import cookieHandler from './cookie.handler.server';

let users = {};
let userId;

const userValidation = {

  /**
   * check registration is valide
   */
  userRegistratonValidation: (userName) => {
    let isAlready = false;
    Object.keys(users).forEach((key) => {
      if (userName === users[key].userServerData.name) {
        isAlready = true;
      }
    });
    return isAlready;
  },

  /**
   * check login is valide
   */
  userLoginValidation: (userName, password, isLogin) => {
    let isAlready = false;
    Object.keys(users).forEach((key) => {
      if (userName === users[key].userServerData.name && password === users[key].userServerData.password) {
        if (isLogin !== users[key].userServerData.login) {
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


let userHandler = {
  /**
   * login user handler
   */
  loginUser: (userdata, req, res)=> {
    return new Promise((resolve, reject) => {
      if (userValidation.userLoginValidation(
          userdata.name,
          userdata.password,
          userdata.login)) {

        const userId = userHandler.getUserId(userdata.name);
        cookieHandler.setCookie(req, res, {'id': userId, 'login': userdata.login});
        reject(users[userId].whoami);
      }
      else {
        reject({'error': 'Invalide username or password!'})
      }
    });
  },

  /**
   * registration user handler
   */
  registerUser: (userdata, req, res)=> {
    return new Promise((resolve, reject) => {
      if (userValidation.userRegistratonValidation(
          userdata.name,
          userdata.login)) {
        reject({'error': 'Username or password is already!'})
      }
      else {
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
    })
  },

  /**
   * get whoami object handler
   */
  getWhoAmI: (req, res) => {
    const user =
      users[cookieHandler.getCookie(req).id] ?
      users[cookieHandler.getCookie(req).id].whoami : {};
    if (!user.login) {
      console.log('deleted cookie from whoami');
      cookieHandler.clearCookie(res);
    }
    return user.login ? user : {};
  },

  /**
   * get user id from userServerData
   */
  getUserId: (usersName)=> {
    let userID;
    Object.keys(users).forEach((key) => {
      if (users[key].userServerData.name === usersName) {
        userID = key;
      }
    });
    return userID
  }
};

const fileHandler = {
  /**
   * set userData to file
   */
  setUserdataToJson: (dataBase)=> {
    jsonfile.writeFileSync(fileHandler.file, dataBase, {spaces: 2});
  },

  /**
   * get userData from file
   */
  getUserdataToJson: ()=> {
    jsonfile.readFile(fileHandler.file, (err, obj) => {
      users = obj || {};
      userId = Object.keys(users).length;
    });
  },

  file: 'data.json'
};

fileHandler.getUserdataToJson();

export default {
  'getWhoAmI': userHandler.getWhoAmI,
  'loginUser': userHandler.loginUser,
  'registerUser': userHandler.registerUser
/*  'addUser': userHandler.addUser,
  'addEndPos': userHandler.addUserPosition,
  'removeUser': userHandler.removeUser,
  'getUserList': userHandler.getUserList*/
};


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