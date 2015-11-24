class UserHandler {
  /**
   * @param $scope
   * @ngInject
   */
  constructor() {
    console.log('UserHandler');
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      bla: '='
    };
    this.controllerAs = 'vm';
    return function ($scope, elem, attr){

      //$scope.vm.bla();
      console.log($scope);
    }


  }
  
}
export default UserHandler;