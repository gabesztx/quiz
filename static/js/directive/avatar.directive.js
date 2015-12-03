class AvatarDirective {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.bindToController = {
      characterCss: '=',
      characterKeyframe: '=',
      characterAddKeyframe: '=',
      characterCont: '=',
      characterChild: '=',
      characterPos: '=',
      startAnim: '='
    };
    this.controller = /* @ngInject */ function jobPositionPickerController($scope) {
      const self = $scope.vm;
      let oldPosiotion = null;
      self.initAvatar = (elem)=> {
        self.avatar = elem;
        self.avatarStyle = self.characterCss;
      };
      self.characterAddKeyframe = ()=> {
        self.characterCont.append(self.characterKeyframe);
      };
      self.startAnim = ()=> {
        //console.log('startAnim', self.characterPos);
        if (self.characterPos !== oldPosiotion && oldPosiotion) {
          self.characterChild.removeEventListener("transitionend", self.stopAnimation);
          self.characterChild.addEventListener("transitionend", self.stopAnimation);
          self.startAnimation();
        }
        oldPosiotion = self.characterPos;

      };
      self.startAnimation = ()=> {
        console.log('START');
      };

      self.stopAnimation = ()=> {
        console.log('END');
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