class UserHandlerDirective {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      itsMe: '=',
      userList: '='
    };
    this.controller = 'userHandlerController';
    this.controllerAs = 'vm';
  }

  link($scope, elem) {
    $scope.vm.initStage(elem.children().eq(0));
    $scope.vm.addMouseEvent();

  }
}
export default UserHandlerDirective;