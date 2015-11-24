const userhandler = require('./userhandler.server.js');
const connectSocket = (io)=> {
  io.on('connection', (socket) => {
    socket.on('addUser', (userName) => {
      socket.broadcast
        .emit('addUser',
          userhandler
            .addUser(userName, socket.id));
    });
    socket.on('getUserList', () => {
      io
        .to(socket.id)
        .emit('getUserList',
          userhandler
            .getUserList(),socket.id);
    });
    socket.on('disconnect', () => {
      io
        .emit('disconnect', socket.id);
      userhandler
        .removeUser(socket.id);
    });
  });
};
module.exports = (io)=> {
  connectSocket(io);
};