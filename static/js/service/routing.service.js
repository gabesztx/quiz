'use strict';

class RoutingService {
  /**
   * @param $q
   * @param $location
   * @param {HttpService} httpService
   * @ngInject
   */
  constructor($q, $location, httpService, ROUTES) {
    this._$q = $q;
    this._$location = $location;
    this._httpService = httpService;
    this._routes = ROUTES;

  }
  getValidationChange(promise) {
    const locationPath = this._$location.path();
    const getCookie = Cookies.get().hasOwnProperty('quiz-token');
    if(!getCookie && locationPath === this._routes.urlPath.authentication){
      promise.resolve();
    }
    if(!getCookie && locationPath !== this._routes.urlPath.authentication){
      this._$location.path(this._routes.urlPath.authentication)
    }
  }
}
export default RoutingService