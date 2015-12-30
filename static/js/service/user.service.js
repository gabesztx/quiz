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
  userRegister(regData) {
    this._httpService.register(regData);
    //console.log();
  }
  getUser() {
    //const defer = this._$q.defer();
    //return defer.promise;
  }

  clearUserData() {
    this._userData = null;
  }

  get userData() {
    return this._userData;
  }

}
export default UserService