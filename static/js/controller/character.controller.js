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

  initCharacter(element) {
    this.character = element;
    this.characterChild = this.character.eq(0);
    this.refreshDimension();
  }

  moveCharacter(data) {
    this.currentEnd = this.calculatePercent(data);
    this.currentEndData = data;
    this._duration = this.getCharacterDuration(data);
    this.moveEndPos(this.currentEnd);
  }

  refreshDimension() {

    this.characterWidth = this.character[0].offsetWidth;
    this.interactiveDomWidth = this._interactiveDom.offsetWidth;

    if (this.resizeListener) {
      this._$scope.vm.characterValue.endPos = this.getresizeCalculatePositions();
      this.resizeListener = false;
    }
    this._$timeout.cancel(this.anim);
    const getDelayResize = ()=> {
      this.transProperty = 'none';
      this.anim = this._$timeout(()=> {
          this.transProperty = 'all';
          this.resizeListener = true;
          this._duration = this.getCharacterDuration(this.currentEndData);
          console.log(this._duration);
          this.moveEndPos(this.currentEnd);
        },
        300);
    };

    getDelayResize();

    this.moveStartPos(this._$scope.vm.characterValue.startPos);
    this.moveEndPos(this._$scope.vm.characterValue.endPos)

  }

  moveStartPos(data) {
    this._$scope.vm.characterValue.startPos = data;
    this._startPos = this.calculateTransformPercent(data);
    this._$scope.$applyAsync();
  }

  moveEndPos(data) {
    this._$scope.vm.characterValue.endPos = data;
    this._endPos = ((this.calculateTransformPercent(data)) - this._startPos) + data;
    this._$scope.$applyAsync();
  }

  calculatePercent(data) {
    return Math.ceil((data - this.calculateWithDif()) / this.interactiveDomWidth * 100);
  }

  calculateTransformPercent(data) {
    return ((this.interactiveDomWidth - this.characterWidth) / this.characterWidth) * data;
  }

  calculateWithDif() {
    return (this._$window.innerWidth - this.interactiveDomWidth) / 2;
  }

  getCharacterDuration(data) {
    const duration = (this.calculatePercent(data) - this.calculatePercent(this.getDomTransform())) / this.speed;
    return duration < 0 ? -duration : duration;
  }

  getresizeCalculatePositions() {
    return this.calculatePercent(this.getDomTransform());
  }

  getDomTransform() {
    return Math.ceil(getComputedStyle(this.characterChild[0].children[0]).transform.split(',')[4]) + this.calculateWithDif();
  }

  getDomWidthPercent() {
    return Math.ceil((this.characterWidth / this.interactiveDomWidth) * 100);
  }


  get duration() {
    return this._duration + 's';
  }

  get endPos() {
    return this._endPos + '%';
  }

  get startPos() {
    return this._startPos + '%';
  }
}

export default CharacterController;
