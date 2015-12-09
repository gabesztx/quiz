'use strict';
class UserHandlerController {
  /**
   * @param $scope
   * @param $window
   * @param {HttpService} httpService
   * @param {CharacterService} characterService
   * @ngInject
   */
  constructor($scope, $window, httpService, characterService) {
    this._$scope = $scope;
    this._httpService = httpService;
    this._characterService = characterService;
    this._$window = $window;
    this._w = angular.element($window);
  }

  /**
   * init interactive dom to handler
   */
  initStage(elem) {
    this.interactiveDom = elem;
    this.prevValue = null;
    this.stageResizer();
    this.addResize();
  }

  /**
   * add window resizer event
   */
  addResize() {
    //TODO unbind
    this._w.bind('resize', ()=> {
      this.stageResizer();
    });
  }

  /**
   * add window handler
   */
  stageResizer() {
    Object.keys(this._$scope.vm.userList).forEach((element)=> {
      this._httpService.publishData(element + 'refresh')
    });
  }
}
export default UserHandlerController;