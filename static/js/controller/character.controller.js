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
    this.interactiveDom = null;
    this.interactiveDomWidth = null;
    this.currentCharacter = null;
    this.character = null;
    this.characterPostion = null;
    this.characterWidth = null;

    //TODO: ((contener width - caharcter width) / caharcter width)*100
    //TODO: create new user contener
    if ($scope.vm.itsMe === $scope.vm.characterValue.id) {
      this.initMyHandler();
      this.addMouseEvent();
    }
    //postalService.channelSubscribe('moveCharacter', ()=> { this.moveCharacter()});
  }

  initMyHandler() {
    this.interactiveDom = angular.element(document.querySelector('.lobby-content'));
    this.interactiveDomWidth = this.interactiveDom[0].offsetWidth;
  }

  initCharacter(element) {
    this.character = element;
    this.characterWidth = element[0].offsetWidth;
  }

  addMouseEvent() {
    //this.interactiveDom.bind('touchstart mousedown',this.addMouseClick)
    this.interactiveDom.bind('touchstart mousedown', (e)=> {
      console.log(e.offsetX);
      //this.moveCharacter();
    })
  }

  /*addMouseClick() {
    console.log('click')
  };

  removeClickEvent() {
    this.interactiveDom.unbind('touchstart mousedown',this.addMouseClick)
  }*/

  moveCharacter() {
    console.log(this.currentCharacter);
  }
}
export default CharacterController;
