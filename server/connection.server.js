const userhandler = require('./userhandler.server.js');
const connectSocket = (io)=> {
  io.on('connection', (socket) => {
    socket.on('addUser', (userName) => {
      socket.broadcast.emit('addUser', userhandler.addUser(userName, socket.id));
    });
    socket.on('getUserList', () => {
      io.to(socket.id).emit('getUserList', userhandler.getUserList(), socket.id);
    });
    socket.on('whoAmI', () => {
      io.to(socket.id).emit('whoAmI', socket.id);
    });
    socket.on('addStartPos', (pos) => {
      //io.emit('addStartPos', socket.id, pos);
      userhandler.addStartPos(socket.id, pos);
    });

    socket.on('addEndPos', (pos) => {
      io.emit('addEndPos', socket.id, pos);
      userhandler.addEndPos(socket.id, pos);
    });

    socket.on('disconnect', () => {
      io.emit('disconnect', socket.id);
      userhandler.removeUser(socket.id);
    });
  });
};
module.exports = (io)=> {
  connectSocket(io);
};