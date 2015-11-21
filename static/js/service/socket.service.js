'use strict';
import ConnectionService from './../service/connection.service.js';

class SocketService extends ConnectionService {
  constructor() {
    super();
  }

  /**
   * @param register this current controller
   */
  registerController(vm) {
    this.scope = vm;
    return this;
  }

  /**
   * @param send value to server
   */
  send(channelName, value) {
    this.socket.emit(channelName, value || '');
    return this;
  }

}
export default SocketService