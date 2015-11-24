import PostalService from './../service/postal.service.js';
import HttpService from './../service/http.service.js';
import SocketService from './../service/socket.service.js';
//import UserHandlerService from './../service/userhandler.service.js';
import HallController from './../controller/hall.controller.js';
import CharacterController from './../controller/character.controller.js';
import CharacterControll from './../directive/character.directive.js';
import UserHandler from './../directive/userhandler.directive.js';

angular.module('socketApp', ['ngAnimate'])
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .directive('userHandler', () => {return new UserHandler()})
  //.service('userHandlerService', UserHandlerService)
  .service('socketService', SocketService)
  .controller('hallController', HallController)
  .controller('characterController', CharacterController)
  .directive('userCharacter', () => {return new CharacterControll()});
