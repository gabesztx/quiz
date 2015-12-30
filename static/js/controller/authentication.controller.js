class AuthenticationController {
  /**
   * @param $scope
   * @param {UserService} userService
   * @ngInject
   */
  constructor($scope, userService) {
    this._$scope = $scope;
    this._userService = userService;
    this.authSendObj = {name:'',password:''};
  }
  
  submitRegistration(){
    this._userService.userRegister(this.authSendObj)
  }
}
export default AuthenticationController;