class CharacterControll {

  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      getMoveCharacter: '&',
      setMoveCharacter: '=',
      characterValue: '=',
      characterListPath: '='
    };
    this.controller = 'characterController';
    this.controllerAs = 'vm';
    this.templateUrl = 'static/templates/character.html';
  }

  link($scope, elem) {

    $scope.vm.initCharacter(elem.children().eq(0));
  }
}
export default CharacterControll;