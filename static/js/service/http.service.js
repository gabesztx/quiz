'use strict';
class HttpService {
  /**
   * @param {PostalService} postalService
   * @ngInject
   */
  constructor(postalService) {
    this._postalService = postalService;
    this._postalService.setChannel('socketServerCahnnel');
  }

  /**
   *  subscribe channel to postal
   */
  watchData(callback, channelName) {
    this._postalService.channelSubscribe(channelName, callback);
  }

  publishData(channelName, data) {
    this._postalService.publish(channelName, data);
  }
}
export default HttpService