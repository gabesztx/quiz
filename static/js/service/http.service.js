'use strict';
class HttpService {
  /**
   * @param $http
   * @param {PostalService} postalService
   * @ngInject
   */
  constructor($http, postalService) {
    this._$http = $http;
    this._postalService = postalService;
    this._postalService.setChannel('socketServerCahnnel');
  }

  /**
   * @param login
   * @param return whoami
   */
  login(logData, callback) {

    this._$http
      .post('/login', logData)
      .then(
        (res)=> {
          callback(res.data);
        }
      )
  }
  /**
   * @param registration
   * @param return whoami
   */
  register(regData, callback) {
    this._$http
      .post('/register', regData)
      .then(
        (res)=> {
          callback(res.data);
        }
      )
  }

  /**
   * @param return userData
   */
  whoami(callback) {
    this._$http
      .get('/whoami')
      .then(
        (res)=> {
          callback(res.data)
        }
      )
  }

  /**
   *  subscribe channel to postal
   */
  watchData(callback, channelName) {
    this._postalService.channelSubscribe(channelName, callback);
  }

  /**
   *  send data channel
   */
  publishData(channelName, data) {
    this._postalService.publish(channelName, data);
  }
}
export default HttpService