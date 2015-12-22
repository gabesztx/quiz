import PostalService from './service/postal.service.js';
import HttpService from './service/http.service.js';
import SocketService from './service/socket.service.js';

import CharacterDirective from './directive/character.directive.js';
import UserHandlerDirective from './directive/userhandler.directive.js';
import CharacterService from './service/character.service.js';
import HallController from './controller/hall.controller.js';
import UserHandlerController from './controller/userhandler.controller.js';
import CharacterController from './controller/character.controller.js';
import {CharacterConfig,isIE} from './storage/config.js';
import {ROUTES} from './storage/routeUrl.js';
import {ROUTEURL} from './storage/routeUrl.js';


const getConfigRouting = (templateUrl, controller, resolve)=> {
  return {
    templateUrl: templateUrl,
    resolve: {
      changeSlide: ()=> {
        const a = 'valami';
        const slideDom = document.querySelector('.slide-anim');

        /*slideDom.removeEventListener("transitionend", ()=>{
         });*/

        if(!slideDom) { return false; }
        slideDom.addEventListener("transitionend", ()=> {
          console.log('End');
        });


        return a;
      }
    }
  }
};

angular.module('socketApp', ['ngRoute', 'ngAnimate'])
  .value('charatcerConfig', CharacterConfig)
  .value('isIE', isIE)
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
  .config(/* @ngInject */ ($routeProvider) => {
    $routeProvider
      .when(ROUTES.index, getConfigRouting(ROUTEURL.index))
      .when(ROUTES.setting, getConfigRouting(ROUTEURL.setting))
      .otherwise({
        redirectTo: ROUTES.index
      })

  });