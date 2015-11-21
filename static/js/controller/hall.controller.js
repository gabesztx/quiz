class HallController {
  /**
   * @param $scope
   * @param $timeout
   * @param {SocketService} socketService
   * @ngInject
   */

  constructor($scope, $timeout, socketService) {
    this.userListData = {};
    this._$scope      = $scope;
    this.userName     = 'Gabesz ' + Math.random() * 100;

    socketService.registerController(this);

    socketService.connect(()=> {
      socketService
        .send('addUser', this.userName)
        .send('getUserList');
    });
  }

  addUser(user) {
    this.userListData[user.id] = user;
    this._$scope.$applyAsync();
    console.log('ADD USER TAG', user);
  }

  getUserList(userList) {
    this.userListData = userList;
    this._$scope.$applyAsync();
    console.log('GET USER LIST', userList);
  }

  userDisconnect(userId) {
    delete this.userListData[userId];
    this._$scope.$applyAsync();
    console.log('DISCONNECT USER', userId);
  }
}

export default HallController;