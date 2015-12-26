import PostalService from './service/postal.service.js';
import HttpService from './service/http.service.js';
import SocketService from './service/socket.service.js';

import CharacterDirective from './directive/character.directive.js';
import UserHandlerDirective from './directive/userhandler.directive.js';
import CharacterService from './service/character.service.js';
import HallController from './controller/hall.controller.js';
import UserHandlerController from './controller/userhandler.controller.js';
import CharacterController from './controller/character.controller.js';
import WelcomeController from './controller/welcomeController.js';
import {CharacterConfig,isIE} from './storage/config.js';
import {ROUTES} from './storage/routeUrl.js';
import {ROUTEURL} from './storage/routeUrl.js';

const getConfigRouting = (templateUrl)=> {
  return {
    templateUrl: templateUrl,
    resolve: {
      changeSlide: ($q)=> {
        const defer = $q.defer();
        return defer.promise;
        /*        const defer = $q.defer();
         const slideDom = document.querySelector('.slide-anim');
         const slideAnimEvent = ()=> {
         slideDom.removeEventListener("transitionend", slideAnimEvent);
         console.log('End');
         //defer.resolve();
         };
         if (!slideDom) {
         return false;
         }
         console.log('go');
         slideDom.addEventListener("transitionend", slideAnimEvent);
         return defer.promise;*/
      }
    }
  }
};

angular.module('socketApp', ['ngRoute', 'ngAnimate'])
  .value('charatcerConfig', CharacterConfig)
  .value('isIE', isIE)
  .value('ROUTES', ROUTES)
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
  .controller('hallController', HallController)
  .controller('welcomeController', WelcomeController)
  .config(/* @ngInject */ ($routeProvider) => {
    $routeProvider
      .when(ROUTES.home, getConfigRouting(ROUTEURL.home))
      .when(ROUTES.profilesetting, getConfigRouting(ROUTEURL.profilesetting))
      .otherwise({
        redirectTo: ROUTES.home
      })

  })
  .run(/* @ngInject */ ($rootScope, $window) => {
  });

/*$(function () {
 FastClick.attach(document.body);
 });*/
