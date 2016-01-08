'use strict';

class RoutingService {
  /**
   * @param $rootScope
   * @param $location
   * @param $window
   * @param {UserService} userService
   * @ngInject
   */

  constructor($rootScope, $location, $window, userService, ROUTES) {
    this._$rootScope = $rootScope;
    this._$location = $location;
    this._$window = $window;
    this._userService = userService;
    this._routes = ROUTES;
    this.getValidationUrlChange();
  }

  getValidationChange(promise) {
    const locationPath = this._$location.path();
    const loginUrl = this._routes.urlPath.authentication;
    const isLoginUrl = loginUrl === locationPath;
    const getCookie = Cookies.get().hasOwnProperty('quiz-token');

    if (!getCookie) {
      console.log('clear data');
      this._userService.clearUserData();
    }

    if (!getCookie && !this._userService.getUserData()) {
      this._$location.path(this._routes.urlPath.authentication);
      promise.resolve();
      return;
    }

    if (!getCookie && isLoginUrl) {
      promise.resolve();
      return;
    }
    //TODO: loginUrl true / falset lekezelni
    if (!this._userService.getUserData() && getCookie) {
    //if (!this._userService.getUserData()) {
      this._userService.getWhoAmI((user)=> {
        if(!user.login){
          this._$window.location.reload();
        }
        if (isLoginUrl) {
          console.log('oda ugrik ahgol volt');
          this._$location.path(user.path);
        }
        //promise.resolve();
      });
      //return;
    }
    console.log('resolve');
    promise.resolve();
  }

  getValidationUrlChange() {
    this._$rootScope.$on("$routeChangeStart", (event, next, current) => {
      const userData = this._userService.getUserData();
      const loginUrl = this._routes.urlPath.authentication;
      const cancelRouting = ()=> {
        event.preventDefault();
      };

      if (!next.$$route) {
        cancelRouting();
        return;
      }
      if (next.$$route.originalPath === loginUrl && userData) {
        cancelRouting();
      }
      if (current.$$route.originalPath === loginUrl && !userData) {
        cancelRouting();
      }

    });
  }
}
export default RoutingService