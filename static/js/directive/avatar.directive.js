class AvatarDirective {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      characterConfig: '=',
      characterAddStyle: '=',
      characterChild: '=',
      characterPos: '=',
      startAnim: '=' // function
    };
    this.controller = /* @ngInject */ function jobPositionPickerController($scope) {
      const self = $scope.vm;
      let oldPosiotion = null;
      self.initAvatar = (elem)=> {
        self.avatar = elem;
        self.avatar.addClass(self.characterConfig.className);
        self.speed = 100 / self.characterConfig.config.durationGlobal;
        self.duration = 0;
        self.scale = 1;
      };

      self.characterAddStyle = (elem)=> {
        elem.append(self.characterConfig.style);
      };

      self.startAnim = (newPos, oldPos, duration)=> {
        if (newPos !== oldPosiotion && oldPosiotion) {
          self.characterChild.removeEventListener("transitionend", self.stopAnimation);
          self.characterChild.addEventListener("transitionend", self.stopAnimation);
          self.startAnimation(duration);
          self.setScaleArrow(newPos, oldPos);
        }
        oldPosiotion = newPos;
      };

      self.startAnimation = (currentDuration)=> {
        self.avatar.removeClass('stop');
        let durationStart = self.characterConfig.config.durationStart;
        let durationEnd = self.characterConfig.config.durationEnd - ((currentDuration / self.speed) * self.characterConfig.config.durationEnd);
        self.duration = durationEnd < durationStart ? durationStart : durationEnd;
      };

      self.stopAnimation = ()=> {
        self.avatar.addClass('stop');
      };

      self.setScaleArrow = (newPos, oldPos)=> {
        self.scale = newPos < oldPos ? -1 : 1;
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