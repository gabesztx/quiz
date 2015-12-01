import PostalService from './service/postal.service.js';
import HttpService from './service/http.service.js';
import SocketService from './service/socket.service.js';
import CharacterDirective from './directive/character.directive.js';
import UserHandlerDirective from './directive/userhandler.directive.js';
import CharacterService from './service/character.service.js';
import HallController from './controller/hall.controller.js';
import UserHandlerController from './controller/userhandler.controller.js';
import CharacterController from './controller/character.controller.js';


angular.module('socketApp', ['ngAnimate'])
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .service('socketService', SocketService)
  .service('characterService', CharacterService)
  .directive('userHandler', () => {
    return new UserHandlerDirective()
  })
  .directive('userCharacter', () => {
    return new CharacterDirective()
  })
  .controller('characterController', CharacterController)
  .controller('userHandlerController', UserHandlerController)
  .controller('hallController', HallController);
