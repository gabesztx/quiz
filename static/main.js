import RoutingService from './js/service/routing.service.js';
import RoutingAnimService from './js/service/routinganim.service.js';
import UserService from './js/service/user.service.js';
import PostalService from './js/service/postal.service.js';
import HttpService from './js/service/http.service.js';
import SocketService from './js/service/socket.service.js';
import CharacterService from './js/service/character.service.js';
import {ROUTES} from './js/storage/routeUrl.js';
import {CharacterConfig,isIE} from './js/storage/config.js';

import Header from './componens/Header';

/*import CharacterDirective from './directive/character.directive.js';
 import UserHandlerDirective from './directive/userhandler.directive.js';
 import HallController from './controller/hall.controller.js';
 import AuthenticationController from './controller/authentication.controller.js';
 import UserHandlerController from './controller/userhandler.controller.js';
 import CharacterController from './controller/character.controller.js';
 import WelcomeController from './controller/welcomeController.js';*/

const getConfigRouting = (templateUrl)=> {
  const config = {
    resolve: {
      getUserData: ($q, routingService)=> {
        const defer = $q.defer();
        routingService.getValidationChange(defer);
        return defer.promise;
      },
      isLogin: ($q, routingService)=> {
        const defer = $q.defer();
        routingService.isLoginChange(defer);
        return defer.promise;
      }
    }
  };

  if (templateUrl) {
    config.template = templateUrl;
  } else {
    config.template = '';
  }
  return config;
};

angular.module('socketApp', ['ngRoute', 'ngAnimate'])
  .value('charatcerConfig', CharacterConfig)
  //.value('isIE', isIE)
  .value('ROUTES', ROUTES)
  .service('routingService', RoutingService)
  .service('routingAnimService', RoutingAnimService)
  .service('userService', UserService)
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .service('socketService', SocketService)
  .service('characterService', CharacterService)
  /*  .directive('userHandler', () => {
   return new UserHandlerDirective()
   })

   .directive('userCharacter', () => {
   return new CharacterDirective()
   })*/
  /*  .controller('authenticationController', AuthenticationController)
   .controller('characterController', CharacterController)
   .controller('userHandlerController', UserHandlerController)
   //.controller('hallController', HallController)
   .controller('welcomeController', WelcomeController)*/
  .config(/* @ngInject */ ($routeProvider) => {
    $routeProvider
      .when(ROUTES.urlPath.authentication, getConfigRouting(ROUTES.urlTemplate.authentication))
      .when(ROUTES.urlPath.home, getConfigRouting(ROUTES.urlTemplate.home))
      .when(ROUTES.urlPath.profilesetting, getConfigRouting(ROUTES.urlTemplate.profilesetting))
      .when(ROUTES.urlPath.login, getConfigRouting(ROUTES.urlTemplate.login))
      .otherwise({redirectTo: ROUTES.urlPath.authentication})
  })
  .run(/* @ngInject */ (routingService) => {
  });
