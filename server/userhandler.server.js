const users = {};
const addUser = (data, userId)=> {
  const randomPos = parseInt(Math.random() * 100);
  const user = {
    'name': data.userName,
    'id': userId,
    'characterId': data.characterId,
    'me': false,
    'startPos': 0,
    'endPos': 0
  };
  users[userId] = user;
  return user;
};

const addStartPos = (userId, pos)=> {
  users[userId].startPos = pos;
  return users;
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

module.exports = {
  'addUser': addUser,
  'addStartPos': addStartPos,
  'addEndPos': addEndPos,
  'removeUser': removeUser,
  'getUserList': getUserList
};

