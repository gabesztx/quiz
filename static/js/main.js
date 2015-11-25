import PostalService from './service/postal.service.js';
import HttpService from './service/http.service.js';
import SocketService from './service/socket.service.js';
import CharacterService from './service/character.service.js';
import HallController from './controller/hall.controller.js';
import CharacterController from './controller/character.controller.js';
import CharacterDirective from './directive/character.directive.js';

angular.module('socketApp', ['ngAnimate'])
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .service('socketService', SocketService)
  .service('characterService', CharacterService)
  //.directive('userHandler', () => {return new UserHandler()})
  .directive('userCharacter', () => {return new CharacterDirective()})
  .controller('hallController', HallController)
  .controller('characterController', CharacterController);

//TODO: megcsinálni a user handler / user handler controller directivat és ott lekezelni a lobbyt és a userek pozicióját