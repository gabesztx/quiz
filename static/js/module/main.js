import PostalService from './../service/postal.service.js';
import HttpService from './../service/http.service.js';
import SocketService from './../service/socket.service.js';
import UserHandlerService from './../service/userhandler.service.js';
import HallController from './../controller/hall.controller.js';
import CharacterControll from './../directive/character.directive.js';

angular.module('socketApp', ['ngAnimate'])
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .service('userHandlerService', UserHandlerService)
  .service('socketService', SocketService)
  .controller('hallController', HallController)
  .directive('userCharacter', () => {return new CharacterControll()});