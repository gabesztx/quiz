
import PostalService from './../service/postal.service.js';
import HttpService from './../service/http.service.js';
import SocketService from './../service/socket.service.js';
import HallController from './../controller/hall.controller.js';

angular.module('socketApp', ['ngAnimate'])
  .service('postalService', PostalService)
  .service('httpService', HttpService)
  .service('socketService', SocketService)
  .controller('hallController', HallController);