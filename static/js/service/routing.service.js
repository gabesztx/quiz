'use strict';

class RoutingService {
  /**
   * @param $rootScope
   * @param $location
   * @param {UserService} userService
   * @ngInject
   */

  constructor($rootScope, $location, userService, ROUTES) {
    this._$rootScope  = $rootScope;
    this._$location   = $location;
    this._userService = userService;
    this._routes      = ROUTES;
    this.getValidationUrlChange();
  }

  getValidationChange(promise) {
    const locationPath = this._$location.path();
    const login        = this._routes.urlPath.authentication;
    const getCookie    = Cookies.get().hasOwnProperty('quiz-token');

    if (!getCookie) {
      this._userService.clearUserData();
    }

    if (!getCookie && !this._userService.getUserData()) {
      this._$location.path(this._routes.urlPath.authentication);
    }

    if (!getCookie && locationPath === login) {
      promise.resolve();
      return;
    }

    if (!this._userService.getUserData() && getCookie) {
      this._userService.getWhoAmI((res)=> {
        if (locationPath === login) {
          this._$location.path(res.path);
        }
        promise.resolve();
      });
      return;
    }
    promise.resolve();
  }

  getValidationUrlChange() {
    this._$rootScope.$on("$routeChangeStart", (event, next, current) => {
      const userData = this._userService.getUserData();
      const login    = this._routes.urlPath.authentication;

      const cancelRouting = ()=> {
        event.preventDefault();
      };

      if (!next.$$route) {
        cancelRouting();
        return;
      }
      if (next.$$route.originalPath === login && userData) {
        cancelRouting();
      }
      if (current.$$route.originalPath === login && !userData) {
        cancelRouting();
      }

    });
  }
}
export default RoutingService