'use strict';
class CharacterController {
  /**
   * @param $scope
   * @param $window
   * @param $interval
   * @param $timeout
   * @param {SocketService} socketService
   * @ngInject
   */
  constructor($scope, $window, $interval, $timeout, socketService) {
    this._$scope = $scope;
    this._$window = $window;
    this._$interval = $interval;
    this._$timeout = $timeout;
    this._socketService = socketService;
    this._interactiveDom = angular.element(document.querySelector('.lobby-content'));
    this._duration = 0;
    this.anim = null;
    this.resizeListener = true;
    this.speed = 20;
    
    

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
    this.characterChild = element.children().eq(0);
    this.currentEnd = this._$scope.vm.characterValue.endPos;
    this.refreshPositions();
    this.moveEndPos(this._$scope.vm.characterValue.endPos)
  }

  /**
   * add mouse event to interactive dom
   */
  addMouseEvent() {
    this._interactiveDom.bind('mousedown', (e)=> {
      this._socketService.send('addEndPos', this.calculatePercent(e.clientX));
    })
  }

  /**
   * move character from click event
   */
  moveCharacter(data) {
    this.currentEnd = data;
    this._duration = this.getCharacterDuration(data) || 0;
    this.moveEndPos(this.currentEnd);
  }

  /**
   * add positions to character
   */
  moveEndPos(data) {
    this._$scope.vm.characterValue.endPos = data;
    this._endPos = ((this.calculateTransformPercent(data))) + data;
    this._$scope.$applyAsync();
    this.addAnimationListener();
  }
  /**
   *
   */
  moveEndPosDone(){
    console.log('end');
  }

  /**
   *
   */
  addAnimationListener(){
    this.characterChild[0].removeEventListener("transitionend", this.moveEndPosDone);
    this.characterChild[0].addEventListener("transitionend", this.moveEndPosDone);
  }
  /**
   * window resizer interactive dom and refresh dimension params
   */
  refreshPositions() {
    this.interactiveDomWidth = this._interactiveDom[0].offsetWidth;
    this.characterWidth = this.character[0].offsetWidth;
  }

  /**
   * window resizer interactive dom and refresh dimension params
   */
  refreshDimension() {
    this.interactiveDomWidth = this._interactiveDom[0].offsetWidth;
    this.characterWidth = this.characterChild[0].offsetWidth;
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
          this.moveCharacter(this.currentEnd);
        },
        300);
    };
    getDelayResize();
    this.moveEndPos(this._$scope.vm.characterValue.endPos)
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
    const duration = (data - this.calculatePercent(this.getDomTransform())) / this.speed;
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
    return Math.ceil(getComputedStyle(this.characterChild[0]).transform.split(',')[4]) + this.calculateWithDif();
  }
}

export default CharacterController;
