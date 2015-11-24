import characterList from './../storage/character.list.js';

class HallController {
  /**
   * @param $scope
   * @param $timeout
   * @param $interval
   * @param {SocketService} socketService
   * @param {PostalService} postalService
   * @ngInject
   */
  constructor($scope, $timeout, $interval,socketService, postalService) {
    this._$scope = $scope;
    this._postalService = postalService;
    this.myId = '';
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
    this.userListData = userListData.list;
    this.myId = userListData.myId;
    this._$scope.$applyAsync();
    //console.log('getUserList', userListData);
  }

  disconnectUser(userId) {
    delete this.userListData[userId];
    this._$scope.$applyAsync();
    //console.log('disconnectUser', userId);
  }

  moveCharacter() {
    this._postalService.publish('moveCharacter');
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