const users = {};
const addUser = (data, userId)=> {
  const user = {
    'name': data.userName,
    'id': userId,
    'characterId': data.characterId,
    'me': false,
    'positions': parseInt(Math.random() * 100)
  };
  users[userId] = user;
  return user;
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
  'removeUser': removeUser,
  'getUserList': getUserList
};

