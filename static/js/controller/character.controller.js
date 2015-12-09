'use strict';
import AvatarController from './avatar.controller.js';
class CharacterController extends AvatarController{
  /**
   * @param $scope
   * @param $window
   * @param $timeout
   * @param {SocketService} socketService
   * @param charatcerConfig
   * @ngInject
   */
  constructor($scope, $window, $timeout, socketService, charatcerConfig, isIE) {
    super($scope, charatcerConfig, $scope.vm.characterValue.characterId);
    this._$scope = $scope;
    this._$window = $window;
    this._$timeout = $timeout;
    this._socketService = socketService;
    this._charatcerConfig = charatcerConfig[$scope.vm.characterValue.characterId];
    this._interactiveDom = angular.element(document.querySelector('.lobby-content'));
    this._duration = 0;
    this.anim = null;
    this.resizeListener = true;
    this.splitNum = isIE ? 12 : 4;
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
    this._$timeout(()=> {
      this.character = element;
      this.character.append(this._charatcerConfig.style);
      this.characterChild = element.children().eq(0)[0];
      this.interactiveDomWidth = this._interactiveDom[0].offsetWidth;
      this.characterWidth = this._charatcerConfig.config.width;
      this.currentEnd = this._$scope.vm.characterValue.endPos;
      this._initAvatar(element.children().children  ().eq(0), this.characterChild);
      this.addNewPosition(this._$scope.vm.characterValue.endPos);
    });
  }
  /**
   * add mouse event to interactive dom
   */
  addMouseEvent() {
    this._interactiveDom.bind('mousedown', (e)=> {
      this._socketService.send('addEndPos', this.calculatePercent(e.clientX));
    })
  }

  getCalculatePositionsDif(pos) {
    const currentPos = pos - this.calculatePercent(this.getDomTransform());
    const calculatePos = currentPos < 0 ? -currentPos : currentPos;
    if (calculatePos > 4) {
      return calculatePos;
    }
  }

  /**
   * move character from click event
   */
  moveCharacter(data) {
    this.currentEnd = data;
    this._duration = this.getCharacterDuration(data);
    this.addNewPosition(this.currentEnd);

  }

  /**
   * add positions to character
   */
  addNewPosition(data) {
    //TODO: IE bug (currentScaleArrow)
    const currentScaleArrow = this.calculatePercent(this.getDomTransform());
    this._$scope.vm.characterValue.endPos = data;
    this._startAnim(data, currentScaleArrow, this._duration);
    this._endPos = ((this.calculateTransformPercent(data))) + data;
    this._$scope.$applyAsync();

  }

  /**
   * window resizer interactive dom and refresh dimension params
   */
/*  refreshPositions() {

    console.log(this.character[0].offsetWidth);
  }*/

  /**
   * window resizer interactive dom and refresh dimension params
   */
  refreshDimension() {
    this.interactiveDomWidth = this._interactiveDom[0].offsetWidth;
    this.characterWidth = this._charatcerConfig.config.width;
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
      }, 100);

    };

    getDelayResize();
    this.addNewPosition(this._$scope.vm.characterValue.endPos)
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
    const duration = (data - this.calculatePercent(this.getDomTransform()))  / this._charatcerConfig.config.durationGlobal;
    const durationDef = duration === 0 ? duration+0.1 : duration;
    return durationDef < 0 ? -durationDef : durationDef;
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
      return Math.ceil(getComputedStyle(this.characterChild).transform.split(',')[this.splitNum]) + this.calculateWithDif();
  }
}

export default CharacterController;
