const userhandler = require('./userhandler.js');

const connectSocket = (io)=> {
  io.on('connection', (socket) => {

    socket.on('addUser', (userName) => {
      socket.broadcast.emit('addUser', userhandler.addUser(userName, socket.id));
    });

    socket.on('getUserList', () => {
      io.to(socket.id).emit('getUserList', userhandler.getUserList());
    });

    socket.on('disconnect', () => {
      userhandler.removeUser(socket.id);
      io.emit('disconnect', socket.id);
    });
  });
};
module.exports = (io)=> {
  connectSocket(io);
};