class CharacterControll {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      //label: '@',
      characterValue: '=',
      characterListPath: '='
    };
    this.controller = 'characterController';
    this.controllerAs = 'vm';
    this.templateUrl = 'static/templates/character.html';
  }

  link(scope, elem) {
    scope.setCurrentElement(elem.children().eq(0));
  }
}
export default CharacterControll;