import characterList from './../storage/character.list.js';

class HallController {
  /**
   * @param $scope
   * @param $timeout
   * @param $interval
   * @param {SocketService} socketService
   * @ngInject
   */
  constructor($scope, $timeout, $interval, socketService) {
    this._$scope = $scope;
    this._$timeout = $timeout;
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
  /**
   * add user to stage from server
   */
  addUser(user) {
    this.userListData[user.id] = user;
    this._$scope.$applyAsync();
    //console.log('addUser', user);
  }
  /**
   * get all user to stage from server
   */
  getUserList(userListData) {
    this.userListData = userListData.list;
    this._$scope.$applyAsync();
  }
  /**
   * register own id
   */
  whoAmI(id) {
    this.myId = id;
  }
  /**
   * user leave to server
   */
  disconnectUser(userId) {
    delete this.userListData[userId];
    this._$scope.$applyAsync();
    //console.log('disconnectUser', userId);
  }
  /**
   * subscribe controller channels
   */
  registerServerChannel() {
    //TODO describe channel from Postal
    this._socketService
      .watchServerData((data)=> {
        this.addUser(data);
      }, 'addUser')
      .watchServerData((data)=> {
        this.getUserList(data);
      }, 'getUserList')
      .watchServerData((data)=> {
        this.whoAmI(data);
      }, 'whoAmI')
      .watchServerData((data)=> {
        this.disconnectUser(data);
      }, 'disconnectUser');
  }
}
export default HallController;