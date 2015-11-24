import characterList from './../storage/character.list.js';

class HallController {
  /**
   * @param $scope
   * @param $timeout
   * @param {SocketService} socketService
   * @ngInject
   */
  constructor($scope, $timeout, socketService) {
    this._$scope = $scope;
    this.userListData = {};
    this._socketService = socketService;
    this._characterList = characterList;

    this.userData = {
      userName: 'anonymous ' + parseInt(Math.random() * 100, 10),
      characterId: 'a1'
    };

    this.registerServerChannel();
    socketService.socketInit(this.userData);
  }

  addUser(user) {
    this.userListData[user.id] = user;
    this._$scope.$applyAsync();
    //console.log('addUser', user);
  }

  getUserList(userListData) {
    this.userListData = userListData;
    this._$scope.$applyAsync();
    //console.log('getUserList', userListData);
  }

  disconnectUser(userId) {
    delete this.userListData[userId];
    this._$scope.$applyAsync();
    //console.log('disconnectUser', userId);
  }

  moveCharacter() {
    console.log('move Character!');
  }

  registerServerChannel() {
    this._socketService
      .watchServerData((data)=> {
        this.addUser(data);
      }, 'addUser')
      .watchServerData((data)=> {
        this.getUserList(data);
      }, 'getUserList')
      .watchServerData((data)=> {
        this.disconnectUser(data);
      }, 'disconnectUser');
  }
}

export default HallController;