class CharacterDirective {
  constructor() {
    this.restrict = 'E';
    this.scope    = {};
    this.bindToController = {
      characterValue    : '=',
      characterListPath : '=',
      itsMe             : '='
    };
    this.controller   = 'characterController';
    this.controllerAs = 'vm';
    this.templateUrl  = 'static/templates/character.html';
  }
  link($scope, elem) {
    $scope.vm.initCharacter(elem.children().eq(0));
    if($scope.vm.characterValue.id === $scope.vm.itsMe){
      $scope.vm.addMouseEvent();
    }
  }
}
export default CharacterDirective;