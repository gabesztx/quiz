'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $timeout
   * @param $window
   * @param {PostalService} postalService
   * @param {CharacterService} characterService
   * @ngInject
   */
  constructor($scope, $timeout, postalService) {
    this._$scope = $scope;
    this.currentCharacter = null;
    this.character = null;
    this.characterWidth = null;
    //console.log($scope.vm.characterValue);
    //TODO: ((contener width - caharcter width) / caharcter width)*100
    //TODO: create new user contener
    /*if ($scope.vm.itsMe === $scope.vm.characterValue.id) {
      this.initMyHandler();
      this.addMouseEvent();
    }*/
    //postalService.channelSubscribe('moveCharacter', ()=> { this.moveCharacter()});
  }

  initCharacter(element) {
    this.character = element;
    this.characterWidth = element[0].offsetWidth;
  }

/*  addMouseEvent() {
    this.interactiveDom.bind('mousedown', (e)=> {
      this._$scope.vm.characterValue.positions = e.clientX - this.interactiveDomWidthDif + 'px';
      this._$scope.$apply();
      //this.moveCharacter();
    })
  }*/

  /*addMouseClick() {
   console.log('click')
   };
   removeClickEvent() {
   this.interactiveDom.unbind('mousedown',this.addMouseClick)
   }*/

  moveCharacter() {
    console.log(this.currentCharacter);
  }
}
export default CharacterController;
