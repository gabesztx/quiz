'use strict';

class SocketService {
  /**
   * @param {HttpService} httpService
   * @ngInject
   */
  constructor(httpService) {
    this._httpService = httpService;
    this.socketUrl = '192.168.1.128:5000';
    //this.socketUrl = 'https://lensaquiz.herokuapp.com';
  }

  /**
   * @param socket connect
   */
  socketInit(userData){
    this.connect(()=> {
        this.send('addUser', userData);
        this.send('getUserList');
    });
  };

  /**
   * @param return register and watch server data channels
   */
  watchServerData(callback, channelName) {
    this._httpService.watchData(callback, channelName);
    return this;
  };

  /**
   * @returns server connect callback
   */
  connect(callback) {
    this.socket = io
      .connect(this.socketUrl)
      .on('connect', () => {
        this.setServerChannels();
        callback();
      });
  };

  /**
   * @returns return disconnect
   */
  disconnect() {
    this.socket.disconnect();
  };

  /**
   * @returns serverChannels
   */
  setServerChannels() {
    this.socket
      .on('addUser', (userTag)=> {
        this._httpService.publishData('addUser', userTag);
      })
      .on('getUserList', (userList)=> {
        this._httpService.publishData('getUserList', userList);
      })
      .on('disconnect', (userId)=> {
        this._httpService.publishData('disconnectUser', userId);
      })
  };

  /**
   * @param send value to server
   */
  send(channelName, value) {
    this.socket.emit(channelName, value || '');
    return this;
  };
}
export default SocketService