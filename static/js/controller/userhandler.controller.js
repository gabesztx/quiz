'use strict';
class UserHandlerController {
  /**
   * @param $scope
   * @param $window
   * @param $timeout
   * @param {SocketService} socketService
   * @param {HttpService} httpService
   * @ngInject
   */
  constructor($scope, $window, $timeout, socketService, httpService) {
    this._$scope = $scope;
    this._socketService = socketService;
    this._httpService = httpService;
    this._$window = $window;
    this._$timeout = $timeout;
    this._w = angular.element($window);

  }

  initStage(elem) {
    this.interactiveDom = elem;
    this._$timeout(()=> {
    });
    this.stageResizer();
    this.addResize();
  }

  addResize() {
    this._w.bind('resize', ()=> {
      this.stageResizer();
    });
  }

  stageResizer() {
    this.interactiveDomWidthDif = (this._$window.innerWidth - this.interactiveDom[0].offsetWidth) / 2;
    Object.keys(this._$scope.vm.userList).forEach((element)=> {
      console.log(this._$scope.vm.userList[element]);
      this._httpService.publishData(element + 'refresh')
    });
  }

  addMouseEvent() {
    this.interactiveDom.bind('mousedown', (e)=> {
      const pos = Math.ceil((e.clientX - this.interactiveDomWidthDif) / this.interactiveDom[0].offsetWidth * 100);
      this._socketService.send('addStartPos', pos);
    })
  }
}
export default UserHandlerController;