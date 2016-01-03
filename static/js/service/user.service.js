'use strict';

class UserService {
  /**
   * @param $q
   * @param $location
   * @param {HttpService} httpService
   * @ngInject
   */
  constructor($q, $location, httpService) {
    this._$q = $q;
    this._$location = $location;
    this._httpService = httpService;
    this._userData = null;
  }

  userLogin() {

  }

  userRegister(regData, callback) {
    return this._httpService.register(regData, callback);
  }


  clearUserData() {
    this._userData = null;
  }

  get userData() {
    return this._userData;
  }

}
export default UserService