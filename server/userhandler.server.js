const users = {};
const addUser = (userName, userId)=> {
  const userTag = {
    'name' : userName,
    'me'   : false,
    'id'   : userId
  };
  users[userId] = userTag;
  return userTag;
};
const removeUser = (userId)=> {
  delete users[userId];
  return users;
};
const getUserList = ()=> {
  return users;
};
module.exports = {
  'addUser'     : addUser,
  'removeUser'  : removeUser,
  'getUserList' : getUserList
};