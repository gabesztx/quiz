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
    this._interactiveDom = document.querySelector('.lobby-content');
    this._startPos = this._$scope.vm.characterValue.startPos;
    this._endPos = this._$scope.vm.characterValue.endPos;
    this._duration = 0;
    this.speed = 5;

    socketService
      .watchServerData((data)=> {
        this.moveCharacter(data)
      }, this._$scope.vm.characterValue.id + 'move')
      .watchServerData(()=> {
        this.refresCharacterPos()
      }, this._$scope.vm.characterValue.id + 'refresh');
  }

  initCharacter(element) {
    this.character = element;
    this.characterChild = this.character.children().eq(0);
    this.getDomTransform();
    this.refresCharacterPos();
  }

  refresCharacterPos() {
    this.characterWidth = this.character[0].offsetWidth;
    this.interactiveDomWidth = this._interactiveDom.offsetWidth;
    this.moveStartPos(this._$scope.vm.characterValue.startPos);
    this.moveEndPos(this._$scope.vm.characterValue.endPos);
  }

  moveCharacter(data) {
    this.setDuration(data);
    //this.moveEndPos(this.calculatePercent(data));
  }

  setDuration(data) {
    const transformData = this.calculatePercent(data);
    const interactiveDomPos = this.calculatePercent(this.getDomTransform());
    const duration = transformData - interactiveDomPos;
    const durationSec = duration < 0 ? -duration : duration;
    const characterSpeed = (this.speed / durationSec) * this.speed;

    
    //console.log(characterSpeed);
    //this._duration = characterSpeed;
    //console.log(this.getDomTransform());
    //console.log(this.interactiveDomWidth, transformData, data - this.calculateWithDif());
    /* this._$interval(()=>s{
     console.log('szma', transformData);
     },10);*/
    //this.characterWidth = this.character[0].offsetWidth;
    //this.interactiveDomWidth = this._interactiveDom.offsetWidth;


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
/*   this._$interval(()=>{
 console.log();
 },10)*/