class HallController {
  /**
   * @param $scope
   * @param {SocketService} socketService
   * @ngInject
   */
  constructor($scope, socketService) {
    console.log('smnjdjdjb');
    this._$scope = $scope;
    this.userListData = {};
    this._socketService = socketService;
    this.userName = 'anonymous ' + parseInt(Math.random() * 100, 10);
    this.registerServerChannel();
    socketService.connect(()=> {
      socketService
        .send('addUser', this.userName)
        .send('getUserList');
    });
  }

  addUser(user) {
    this.userListData[user.id] = user;
    this._$scope.$applyAsync();
    console.log('addUser', user);
  }

  getUserList(userList) {
    this.userListData = userList;
    this._$scope.$applyAsync();
    console.log('getUserList', userList);
  }

  userDisconnect(userId) {
    delete this.userListData[userId];
    this._$scope.$applyAsync();
    console.log('userDisconnect', userId);
  }

  registerServerChannel(){
    this._socketService
      .watchServerData((data)=> {
        this.addUser(data);
      }, 'addUser')
      .watchServerData((data)=> {
        this.getUserList(data);
      }, 'getUserList')
      .watchServerData((data)=> {
        this.userDisconnect(data);
      }, 'userDisconnect');
  }

}

export default HallController;