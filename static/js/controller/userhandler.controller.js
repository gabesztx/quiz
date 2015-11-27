'use strict';
class UserHandlerController {
  /**
   * @param $scope
   * @param $window
   * @ngInject
   */
  constructor($scope,$window) {
    this._$scope = $scope;
    this._$window = $window;
    this._w = angular.element($window);
  }

  initStage(elem) {
    this.interactiveDom = elem;
    this.addResize();
    this.initStageResizer();
  }

  initStageResizer() {
    this.interactiveDomWidthDif = (this._$window.innerWidth - this.interactiveDom[0].offsetWidth) / 2;
  }

  addResize(){
    this._w.bind('resize', ()=> {
      this.initStageResizer();
      console.log(this._$scope.vm.userList);
    });
  }

  addMouseEvent() {
    this.interactiveDom.bind('mousedown', (e)=> {
      //this._$scope.vm.characterValue.positions = e.clientX - this.interactiveDomWidthDif + 'px';
      console.log(e.clientX - this.interactiveDomWidthDif + 'px');
      //this._$scope.$apply();
      //this.moveCharacter();
    })
  }
}
export default UserHandlerController;
