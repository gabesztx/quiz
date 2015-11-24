'use strict';
class CharacterController {
  /**
   * @param $scope
   * @ngInject
   */
  constructor($scope) {
    //$scope.vm.setMoveCharacter = this.moveCharacter;
    //$scope.vm.getMoveCharacter();
    //console.log($scope.vm);
    //console.log($scope.currentElement);
    //console.log($scope.vm.characterListPath[$scope.vm.characterValue.characterId]);
    //userHandlerService.initCharacter();
    console.log($scope.vm.characterValue);
    //console.log('Charcter controller',$scope);
    //$scope.vm.moveCharacter()
    //TODO: ((contener width - caharcter width) / caharcter width)*100 (nem kell százalékot számítani!!!!)
    //TODO: create new user contener
  }

  initCharacter(element) {

    this._currentDomElement = element;
    console.log('init',this._currentDomElement);
  }

  moveCharacter() {
    console.log('moveCharacter', this._currentDomElement);

  }

}
export default CharacterController;
