'use strict';


class ConnectionService {

  constructor() {
    this.socket;
    //this.socketUrl = '192.168.1.128';
    this.socketUrl = 'https://lensaquiz.herokuapp.com';
    this.port = '5000';
    this.isConnected = false;
  }

  /**
   * @returns return connect
   */
  connect(callback) {
    this.socket = io
      .connect(this.socketUrl)
      .on('connect', () => {
        this.isConnected = true;
        this.subscribeChannels();
        callback();
      });
  }

  /**
   * @returns return disconnect
   */
  disconnect() {
    this.socket.disconnect();
    this.isConnected = false;
  }

  /**
   * @returns subscribeChannels
   */
  subscribeChannels() {
    this.socket

      .on('addUser', (userTag)=> {
        this.scope.addUser(userTag);
      })

      .on('getUserList', (userList)=> {
        this.scope.getUserList(userList);
      })

      .on('disconnect', (userId)=> {
        this.scope.userDisconnect(userId);
      })
  }

}
export default ConnectionService