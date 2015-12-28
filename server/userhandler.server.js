//const jsonfile = require('jsonfile');
//const file = 'data.json';
//jsonfile.readFile(file, function(err, obj) {});
'use strict';
const users = {};
const userHandler = {
  addUser: (data, socketID)=> {
    const user = {
      'name'        : data.userName,
      'id'          : socketID,
      'characterId' : data.characterId,
      'endPos'      : parseInt(Math.random() * 100)
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
  }
};
/*const setUserdataToJson = (userData)=> {
 jsonfile.writeFileSync(file, userData, {spaces: 2});
 };*/

module.exports = {
  'addUser'     : userHandler.addUser,
  'addEndPos'   : userHandler.addUserPosition,
  'removeUser'  : userHandler.removeUser,
  'getUserList' : userHandler.getUserList
};
