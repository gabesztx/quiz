class AuthenticationController {
  /**
   * @param $scope
   * @param $rootScope
   * @param $location
   * @param $timeout
   * @param {UserService} userService
   * @ngInject
   */

  constructor($scope, $rootScope, $location, $timeout, userService) {
    this._$scope = $scope;
    this._$location = $location;
    this._$timeout = $timeout;
    this._userService = userService;
    this.authSendObj =
    {
      name: '',
      password: '',
      login: false
    };
    console.log('AuthenticationController');
  }

  submitRegistration() {
    this._userService.userRegister(this.authSendObj, (res)=> {
      this.errorMsg = '';
      if (res.error) {
        this.errorMsg = res.error;
        return;
      }
      this._$location.path(res.path);
    })
  }

  submitLogin() {
    this._userService.userLogin(this.authSendObj, (res)=> {
      this.errorMsg = '';
      if (res.error) {
        this.errorMsg = res.error;
        return;
      }
      console.log('SUUUBMIT OOK', res);
      this._$location.path(res.path);
    })
  }
}

export default AuthenticationController;
