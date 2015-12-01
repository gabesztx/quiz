'use strict';
class CharacterController {

  /**
   * @param $scope
   * @param $window
   * @param $interval
   * @param $timeout
   * @param $animateCss
   * @param $animate
   * @param {SocketService} socketService
   * @ngInject
   */

  constructor($scope, $window, $interval, $timeout, $animateCss, $animate, socketService) {
    this._$scope = $scope;
    this._$window = $window;
    this._$interval = $interval;
    this._$timeout = $timeout;
    this._$animateCss = $animateCss;
    this._$animate = $animate;
    this._interactiveDom = document.querySelector('.lobby-content');
    this._startPos = this._$scope.vm.characterValue.startPos;
    this._endPos = this._$scope.vm.characterValue.endPos;
    this.speed = 20;
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
    this.characterChild = this.character.eq(0);
    this.refreshDimension();
  }
  /**
   * move character from click event
   */
  moveCharacter(data) {
    this.currentEnd = this.calculatePercent(data);
    this.currentEndData = data;
    this._duration = this.getCharacterDuration(this.currentEndData);
    this.moveEndPos(this.currentEnd);
  }
  /**
   * window resizer interactive dom and refresh dimension params
   */
  refreshDimension() {
    this.characterWidth = this.character[0].offsetWidth;
    this.interactiveDomWidth = this._interactiveDom.offsetWidth;
    if (this.resizeListener) {
      this._$scope.vm.characterValue.endPos = this.getResizeCalculatePositions();
      this.resizeListener = false;
    }
    
    this._$timeout.cancel(this.anim);
    const getDelayResize = ()=> {
      this.transProperty = 'none';
      this.anim = this._$timeout(()=> {
          this.transProperty = 'all';
          this.resizeListener = true;
          this._duration = this.getCharacterDurationResize(this.currentEnd);
          console.log(this._duration);
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
    this._endPos = ((this.calculateTransformPercent(data)) - this._startPos) + data;
    this._$scope.$applyAsync();
  }
  /**
   * claculate and get click interactive dom position percent
   */
  calculatePercent(data) {
    return Math.ceil((data - this.calculateWithDif()) / this.interactiveDomWidth * 100);
  }
  /**
   * claculate and get character position percent
   */
  calculateTransformPercent(data) {
    return ((this.interactiveDomWidth - this.characterWidth) / this.characterWidth) * data;
  }
  /**
   * claculate and get character position percent
   */
  calculateWithDif() {
    return (this._$window.innerWidth - this.interactiveDomWidth) / 2;
  }
  /**
   * get character duration from interactive dom dimension from click
   */
  getCharacterDuration(data) {
    const duration = (this.calculatePercent(data) - this.calculatePercent(this.getDomTransform())) / this.speed;
    return duration < 0 ? -duration : duration;
  }
  /**
   * get character duration from interactive dom dimension from resize
   */
  getCharacterDurationResize(data) {
    const duration = (data - this.calculatePercent(this.getDomTransform())) / this.speed;
    return duration < 0 ? -duration : duration;
  }
  /**
   * get interactive dom position percent resize
   */
  getResizeCalculatePositions() {
    return this.calculatePercent(this.getDomTransform());
  }
  /**
   * get character transform position
   */
  getDomTransform() {
    return Math.ceil(getComputedStyle(this.characterChild[0].children[0]).transform.split(',')[4]) + this.calculateWithDif();
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
