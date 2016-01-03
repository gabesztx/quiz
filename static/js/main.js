import RoutingService from './service/routing.service.js';
import UserService from './service/user.service.js';
import PostalService from './service/postal.service.js';
import HttpService from './service/http.service.js';
import SocketService from './service/socket.service.js';

import CharacterDirective from './directive/character.directive.js';
import UserHandlerDirective from './directive/userhandler.directive.js';
import CharacterService from './service/character.service.js';
import HallController from './controller/hall.controller.js';
import AuthenticationController from './controller/authentication.controller.js';
import UserHandlerController from './controller/userhandler.controller.js';
import CharacterController from './controller/character.controller.js';
import WelcomeController from './controller/welcomeController.js';
import {CharacterConfig,isIE} from './storage/config.js';
import {ROUTES} from './storage/routeUrl.js';

const getConfigRouting = (templateUrl)=> {
  return {
    templateUrl: templateUrl,
    resolve: {
      getUserData: ($q, $location, routingService)=> {
        const defer = $q.defer();
        routingService.getValidationChange(defer);
        return defer.promise;

        /*const slideDom = document.querySelector('.slide-anim');
         const slideAnimEvent = ()=> {
         slideDom.removeEventListener("transitionend", slideAnimEvent);
         console.log('End');
         //defer.resolve();
         };
         if (!slideDom) {
         return false;
         }
         console.log('go');
         slideDom.addEventListener("transitionend", slideAnimEvent);*/
      }
    }
  }
};

angular.module('socketApp', ['ngRoute', 'ngAnimate'])
  .value('charatcerConfig', CharacterConfig)
  .value('isIE', isIE)
  .value('ROUTES', ROUTES)
  .service('routingService', RoutingService)
  .service('userService', UserService)
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
  .controller('authenticationController', AuthenticationController)
  .controller('characterController', CharacterController)
  .controller('userHandlerController', UserHandlerController)
  .controller('hallController', HallController)
  .controller('welcomeController', WelcomeController)
  .config(/* @ngInject */ ($routeProvider) => {

    $routeProvider
      .when(ROUTES.urlPath.authentication, getConfigRouting(ROUTES.urlTemplate.authentication))
      .when(ROUTES.urlPath.home, getConfigRouting(ROUTES.urlTemplate.home))
      .when(ROUTES.urlPath.profilesetting, getConfigRouting(ROUTES.urlTemplate.profilesetting))
      .when(ROUTES.urlPath.login, getConfigRouting(ROUTES.urlTemplate.login))
      .otherwise({redirectTo: ROUTES.urlPath.authentication})
  })
  .run(/* @ngInject */ ($rootScope) => {


  });
/*$(function () {
 FastClick.attach(document.body);
 });*/
