
import SocketService from './../service/socket.service.js';
import HallController from './../controller/hall.controller.js';

angular.module('socketApp', ['ngAnimate'])
  .service('socketService', SocketService)
  .controller('hallController', HallController);