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

  userLogin(logData, callback) {
    return this._httpService.login(logData, (res)=> {
      this._userData = res;
      callback(this._userData);
    });
  }

  userRegister(regData, callback) {
    return this._httpService.register(regData, (res)=> {
      this._userData = res;
      callback(this._userData);
    });
  }

  getWhoAmI(callback) {
    return this._httpService.whoami((res)=> {
      this._userData = res;
      callback(this._userData);
    });
  }

  getUserData() {
    return this._userData;
  }

  clearUserData() {
    this._userData = null;
  }

}
export default UserService