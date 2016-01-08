class AuthenticationController {
  /**
   * @param $scope
   * @param $location
   * @param {UserService} userService
   * @ngInject
   */

  constructor($scope, $location, userService) {
    this._$scope = $scope;
    this._$location = $location;
    this._userService = userService;
    this.authSendObj =
    {
      name: '',
      password: '',
      login: true
    };
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
}
export default AuthenticationController;