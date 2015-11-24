'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $timeout
   * @param {PostalService} postalService
   * @ngInject
   */
  constructor($scope, $timeout, postalService) {
    this._$scope = $scope;
    this._postalService = postalService;
    //$scope.vm.setMoveCharacter = this.moveCharacter;
    //$scope.vm.getMoveCharacter();
    //console.log($scope.vm);
    //console.log($scope.currentElement);
    //console.log($scope.vm.characterListath[$scope.vm.characterValue.characterId]);
    //userHandlerService.initCharacter();
    //console.log($scope.vm.characterValue);
    //console.log('Charcter controller',$scope);
    //$scope.vm.moveCharacter()
    //TODO: ((contener width - caharcter width) / caharcter width)*100 (nem kell százalékot számítani!!!!)
    //TODO: create new user contener
    
    this._postalService.channelSubscribe('moveCharacter', this._moveCharacter = ()=> { this.moveCharacter()});
  }

  initCharacter(element) {
    this._currentDomElement = angular.element(element);
    //this._currentDomElement.css('opacity',0.2)
  }
  moveCharacter() {
    console.log('moveCharacter', this._currentDomElement);
  }

}
export default CharacterController;
