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
   * @param return userData
   */
  register(regData) {
      this._$http
        .post('/register', regData)
        .then(
          (res)=> {
            console.log(res.data);
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