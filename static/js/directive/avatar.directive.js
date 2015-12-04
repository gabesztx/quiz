class AvatarDirective {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      characterConfig: '=',
      characterKeyframe: '=',
      characterAddKeyframe: '=',
      characterCont: '=',
      characterChild: '=',
      characterPos: '=',
      currentSpeed: '=',
      startAnim: '='
    };
    this.controller = /* @ngInject */ function jobPositionPickerController($scope, $timeout) {
      const self = $scope.vm;
      let oldPosiotion = null;
      self.initAvatar = (elem)=> {
        self.speed = 100 / self.currentSpeed;
        self.avatar = elem;
        self.animName = 'playMan';
        self.duration = 0;
        self.scale = 1;
        self.steps = 0;
        self.avatarConfig = {
          bgImage: self.characterConfig.css.bgImage,
          width: self.characterConfig.css.width,
          height: self.characterConfig.css.height
        };
      };
      self.characterAddKeyframe = ()=> {
        self.characterCont.append(self.characterConfig.keyframes);
      };
      self.startAnim = (newPos, oldPos, duration)=> {
        if (newPos !== oldPosiotion && oldPosiotion) {
          self.characterChild.removeEventListener("transitionend", self.stopAnimation);
          self.characterChild.addEventListener("transitionend", self.stopAnimation);
          self.setDuration(duration);
          self.setScaleArrow(newPos, oldPos);
          self.startAnimation();
        }
        oldPosiotion = newPos;
      };
      self.setScaleArrow = (newPos, oldPos)=> {
        self.scale = newPos < oldPos ? -1 : 1;
      };
      self.startAnimation = ()=> {
        self.steps = self.characterConfig.css.steps;
      };
      self.stopAnimation = ()=> {
        self.steps = 0;
        $scope.$applyAsync();
      };
      self.setDuration = (currentDuration)=> {
        let durationStart = self.characterConfig.css.durationStart;
        let durationEnd = self.characterConfig.css.durationEnd - ((currentDuration / self.speed) * self.characterConfig.css.durationEnd);
        let speed = durationEnd < durationStart ? durationStart : durationEnd;
        self.duration = speed
      };
    };
    this.controllerAs = 'vm';
    this.templateUrl = 'static/templates/avatar.html';
  }

  link($scope, elem) {
    $scope.vm.initAvatar(elem.children());
  }
}
export default AvatarDirective;