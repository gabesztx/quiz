'use strict';

class RoutingService {
  /**
   * @param $rootScope
   * @param $location
   * @param $window
   * @param ROUTES
   * @param {UserService} userService
   * @param {RoutingAnimService} routingAnimService
   * @ngInject
   */

  constructor($rootScope, $location, $window, userService, routingAnimService, ROUTES) {
    this._$rootScope = $rootScope;
    this._$location = $location;
    this._$window = $window;
    this._routingAnimService = routingAnimService;
    this._userService = userService;
    this._routes = ROUTES;
    this._prevStatus = false;
    this.getValidationUrlChange();
  }

  isLoginChange(promise) {
    const getCookie = Cookies.get().hasOwnProperty('quiz-token');
    /*console.log('cookie: ', getCookie);
     console.log('prevStatus: ', this._prevStatus);
     console.log('rootscope down: ', this._$rootScope.down);
     console.log('userData: ', this._userService.getUserData());*/

    if (getCookie !== this._prevStatus && this._$rootScope.down) {
      //console.log('remove auth Template');
      this._routingAnimService.removeAuthTemplate(promise);
      this._prevStatus = getCookie;
      return;
    }

    if (getCookie === this._prevStatus) {
      if (this._$location.path() === this._routes.urlPath.authentication) {
        //console.log('set auth Template');
        this._routingAnimService.addAuthTemplate();
        this._prevStatus = getCookie;
        return;
      }
    }

    if (!getCookie && this._routes.urlPath.authentication === this._$location.path()) {
      this._routingAnimService.removeHeaderTemplate(()=> {
        this._prevStatus = false;
      });
      promise.resolve();
      return;
    }

    if (this._userService.getUserData() && getCookie) {
      this._routingAnimService.addHeaderTemplate();
    }

    this._prevStatus = getCookie;
    promise.resolve();

  }

  getValidationChange(promise) {

    const locationPath = this._$location.path();
    const loginUrl = this._routes.urlPath.authentication;
    const isLoginUrl = loginUrl === locationPath;
    const getCookie = Cookies.get().hasOwnProperty('quiz-token');

    if (!this._userService.getUserData() && getCookie) {
      this._userService.getWhoAmI((user)=> {
        if (!user.login) {
          this._$window.location.reload();
          return;
        }
        if (isLoginUrl) {
          this._$location.path(user.path);
          return;
        }
        this._routingAnimService.addHeaderTemplate();
        promise.resolve();
      });

      return;
    }
    promise.resolve();
  }

  getValidationUrlChange() {
    this._$rootScope.$on("$routeChangeStart", (event, next, current) => {

      const userData = this._userService.getUserData();
      const loginUrl = this._routes.urlPath.authentication;
      const getCookie = Cookies.get().hasOwnProperty('quiz-token');
      const cancelRouting = ()=> {
        event.preventDefault();
      };

      if (!getCookie) {
        this._userService.clearUserData();
      }

      if (!getCookie && this._routes.urlPath.authentication !== this._$location.path()) {
        this._$location.path(this._routes.urlPath.authentication);
        return;
      }

      /*if (!getCookie) {
       console.log(loginUrl);
       return
       }
       if (getCookie && !current) {
       this._$location.path(loginUrl);
       return
       }
       if (!next.$$route) {
       console.log('PREEV ELPRE STIO');
       cancelRouting();
       return;
       }


       if (next.$$route.originalPath === loginUrl && userData) {
       console.log('next.$$route.originalPath');
       cancelRouting();
       return;
       }
       if (current.$$route.originalPath === loginUrl && !userData) {
       console.log('current.$$route.originalPath');
       cancelRouting();
       return;
       }*/

    });
  }
}


export default RoutingService


