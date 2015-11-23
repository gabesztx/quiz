'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param {UserHandlerService} userHandlerService
   * @ngInject
   */
  constructor($scope, userHandlerService) {
    $scope.setCurrentElement = (element)=> {
      console.log(element);
    };
    //console.log($scope.vm.characterListPath[$scope.vm.characterValue.characterId]);
    //userHandlerService.initCharacter();
    //console.log($scope.vm.characterValue);
    //TODO: ((contener width - caharcter width) / caharcter width)*100 (nem kell százalékot számítani!!!!)
    //TODO: create new user contener
  }
  addUser(user) {
    //console.log('addUser', user);
  }
}

export default CharacterController;
