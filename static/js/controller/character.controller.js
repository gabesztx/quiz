'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $window
   * @param $interval
   * @param $timeout
   * @param {SocketService} socketService
   * @param {CharacterService} characterService
   * @ngInject
   */
  constructor($scope, $window, $interval, $timeout, socketService, characterService) {
    this._$scope = $scope;
    this._$window = $window;
    this._characterService = characterService;
    this._$interval = $interval;
    this._$timeout = $timeout;
    this._interactiveDom = document.querySelector('.lobby-content');
    this._endPos = this._$scope.vm.characterValue.endPos;
    this._duration = 0;
    this.anim = null;
    this.resizeListener = true;

    //TODO describe channel from Postal
    socketService
      .watchServerData((data)=> {
        this.moveCharacter(data)
      }, this._$scope.vm.characterValue.id + 'move')
      .watchServerData(()=> {
        this.refreshDimension()
      }, this._$scope.vm.characterValue.id + 'refresh');
  }

  /**
   * init own character
   */
  initCharacter(element) {
    this.character = element;
    this.refreshDimension();
  }

  /**
   * move character from click event
   */
  moveCharacter(data) {
    this.currentEnd = this._characterService.calculatePercent(data);
    this._duration = this._characterService.getCharacterDuration(data);
    this.moveEndPos(this.currentEnd);
  }

  /**
   * window resizer interactive dom and refresh dimension params
   */
  refreshDimension() {
    this._characterService.setInteractiveDom(this._interactiveDom);
    this._characterService.setCharacter(this.character);
    if (this.resizeListener) {
      this._$scope.vm.characterValue.endPos = this._characterService.getResizeCalculatePositions();
      this.resizeListener = false;
    }
    this._$timeout.cancel(this.anim);
    const getDelayResize = ()=> {
      this.transProperty = 'none';
      this.anim = this._$timeout(()=> {
          this.transProperty = 'all';
          this.resizeListener = true;
          this._duration = this._characterService.getCharacterDurationResize(this.currentEnd);
          this.moveEndPos(this.currentEnd);
        },
        300);
    };
    getDelayResize();
    this.moveEndPos(this._$scope.vm.characterValue.endPos)
  }

  /**
   * add positions to character
   */
  moveEndPos(data) {
    this._$scope.vm.characterValue.endPos = data;
    this._endPos = ((this._characterService.calculateTransformPercent(data))) + data;
    this._$scope.$applyAsync();
  }

  /**
   * view get character diration
   */
  get duration() {
    return this._duration + 's';
  }

  /**
   * view get character end position
   */
  get endPos() {
    return this._endPos + '%';
  }
}

export default CharacterController;
