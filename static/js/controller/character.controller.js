'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $timeout
   * @param $window
   * @param {SocketService} socketService
   * @ngInject
   */
  constructor($scope, $timeout, $window, socketService) {
    this._$scope = $scope;
    this._$window = $window;

    socketService
      .watchServerData((data)=> {
        this.moveCharacterStart(data)
      }, this._$scope.vm.characterValue.id + 'move')
      .watchServerData(()=> {
        this.refresCharacterPos()
      }, this._$scope.vm.characterValue.id + 'refresh');
  }

  initCharacter(element) {
    this.character = element;
  }

  refresCharacterPos() {
    this.characterWidth = this.character[0].offsetWidth;
    this.interactiveDomWidth = document.querySelector('.lobby-content').offsetWidth;
    this.moveCharacterStart(this._$scope.vm.characterValue.startPos)
  }

  moveCharacterStart(data) {
    this.charcterPosition = ((this.interactiveDomWidth - this.characterWidth) / this.characterWidth) * data;
    this._$scope.vm.characterValue.startPos = data;
    this._$scope.$applyAsync();
  }
  get startPos(){
    return this.charcterPosition + '%';
  }
}
export default CharacterController;
