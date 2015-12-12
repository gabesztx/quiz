const jsonfile = require('jsonfile');
const file = 'data.json';
//jsonfile.readFile(file, function(err, obj) {});

const users = {};

const addUser = (data, userId)=> {
  const randomPos = parseInt(Math.random() * 100);
  const user = {
    'name': data.userName,
    'id': userId,
    'characterId': data.characterId,
    'me': false,
    'endPos': randomPos
  };
  users[userId] = user;
  return user;
};

const addEndPos = (userId, pos)=> {
  users[userId].endPos = pos;
  return users;
};

const removeUser = (userId)=> {
  delete users[userId];
  return users;
};

const getUserList = ()=> {
  return users;
};

const setUserdataToJson = (userData)=> {
  jsonfile.writeFileSync(file, userData, {spaces: 2});
};

module.exports = {
  'addUser': addUser,
  'addEndPos': addEndPos,
  'removeUser': removeUser,
  'getUserList': getUserList
};