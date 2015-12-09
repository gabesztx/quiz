class AvatarController {
  /**
   * @param $scope
   * @ngInject
   */
  constructor($scope, charatcerConfig, characterId) {
    this._initAvatar = this.initAvatar;
    this._startAnim = this.startAnim;
    this._charatcerConfig = charatcerConfig[characterId];
    this.oldPosiotion = 0;
  }

  startAnim(newPos, oldPos, duration) {
    this.getPos = newPos;
    if (newPos !== this.oldPosiotion && this.oldPosiotion) {
      this.characterChild.removeEventListener("transitionend", this.stopAnimation);
      this.characterChild.addEventListener("transitionend", this.stopAnimation);
      this.startAnimation(duration);
      this.setScaleArrow(newPos, oldPos);
    }
    this.oldPosiotion = newPos;
  }

  stopAnimation = ()=> {
    this.avatar.addClass('stop');
  };
  startAnimation = (currentDuration)=> {
    this.avatar.removeClass('stop');
    let durationStart = this._charatcerConfig.config.durationStart;
    let durationEnd = this._charatcerConfig.config.durationEnd - ((currentDuration / this.speed) * this._charatcerConfig.config.durationEnd);

    this._durationAnim = durationEnd < durationStart ? durationStart : durationEnd;
  };

  setScaleArrow(newPos, oldPos) {
    this.scale = newPos < oldPos ? -1 : 1;
  };

  initAvatar(elem, child) {
    this.avatar = elem;
    this.characterChild = child;
    this.avatar.addClass(this._charatcerConfig.className);
    this.speed = 100 / (this._charatcerConfig.config.durationGlobal);
    this._durationAnim = 0;
    this.scale = 1;
  };

  get pos() {
    return this.getPos;
  }

  get durationAnim() {
    return this._durationAnim + 's';
  }

  get characterScale() {
    return this.scale;
  }
}
export default AvatarController;