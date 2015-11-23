class CharacterControll {

  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      //label: '@',
      characterValue: '=',
      characterListPath: '='
    };
    this.controller = function characterController($scope,userHandlerService) {
      //const element = angular.element(document.querySelectorAll('.character-user-contener'));
      //console.log($scope.vm.characterListPath[$scope.vm.characterValue.characterId]);
      //userHandlerService.initCharacter();
      //console.log($scope.vm.characterValue);
      console.log($scope.vm.characterListPath);
      //console.log(characterList);

      //TODO: ((contener width - caharcter width) / caharcter width)*100 (nem kell százalékot számítani!!!!)
      //TODO: create new user contener

    };
    this.controllerAs = 'vm';
    this.templateUrl = 'static/templates/character.html';
  }
}
export default CharacterControll;