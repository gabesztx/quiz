'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $timeout
   * @param {PostalService} postalService
   * @param {CharacterService} characterService
   * @ngInject
   */
  constructor($scope, $timeout, postalService) {
    this._$scope = $scope;
    //postalService.channelSubscribe('moveCharacter', ()=> { this.moveCharacter()});
    //TODO: ((contener width - caharcter width) / caharcter width)*100
    //TODO: create new user contener
    if($scope.vm.itsMe === $scope.vm.characterValue.id){
     this.initMyHandler();
    }
  }

  initMyHandler(){
  }
  initCharacter(element) {
    this._currentDomElement = angular.element(element);
  }
  moveCharacter() {
  }
}
export default CharacterController;
