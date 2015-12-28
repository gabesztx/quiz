'use strict';
class WelcomeController {
  /**
   * @param $scope
   * @param $location
   * @ngInject
   */
  constructor($scope, $location, ROUTES) {
    this._$scope = $scope;
    this._$location = $location;
    this._routes = ROUTES;
  }

  pathLink() {
    this._$location.path(this._routes.setting);
  }
}
export default WelcomeController ;