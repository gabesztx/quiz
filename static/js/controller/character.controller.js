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
    this.interactiveDom = angular.element(document.querySelector('.lobby-content'));
    this.addMouseEvent();
  }
  
  initCharacter(element) {
    this._currentDomElement = angular.element(element);
  }

  addMouseEvent(){
    //this.interactiveDom.bind('touchstart mousedown',this.addMouseClick)
    this.interactiveDom.bind('touchstart mousedown',(e)=>{
      console.log(e.offsetX);
      //this.moveCharacter();
    })
  }
  
  //addMouseClick(){console.log('click')};
  
  removeClickEvent(){
    this.interactiveDom.unbind('touchstart mousedown',this.addMouseClick)
  }
  
  moveCharacter() {
    console.log(this._currentDomElement);
  }
}
export default CharacterController;
