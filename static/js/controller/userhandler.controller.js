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
  /**
   * init interactive dom to handler
   */
  initStage(elem) {
    this.interactiveDom = elem;
    this.stageResizer();
    this.addResize();
  }
  /**
   * add windows resizer event
   */
  addResize() {
    this._w.bind('resize', ()=> {
      this.stageResizer();
    });
  }
  /**
   * add windows handler
   */
  stageResizer() {
    Object.keys(this._$scope.vm.userList).forEach((element)=> {
      this._httpService.publishData(element + 'refresh')
    });
  }
  /**
   * add mouse event to interactive dom
   */
  addMouseEvent() {
    this.interactiveDom.bind('mousedown', (e)=> {
      this._socketService.send('addEndPos', e.clientX);
    })
  }
}
export default UserHandlerController;