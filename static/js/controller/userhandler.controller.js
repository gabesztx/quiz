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
    this.stageResizer();
    this.addResize();
  }

  addResize() {
    this._w.bind('resize', ()=> {
      this.stageResizer();
    });
  }

  stageResizer() {
    Object.keys(this._$scope.vm.userList).forEach((element)=> {
      this._httpService.publishData(element + 'refresh')
    });
  }
  addMouseEvent() {
    this.interactiveDom.bind('mousedown', (e)=> {
      this._socketService.send('addEndPos', e.clientX);
    })
  }
}
export default UserHandlerController;