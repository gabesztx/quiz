'use strict';
const baseURL = './static/template';
class RoutingAnimService {
  /**
   * @param $rootScope
   * @param $window
   * @param $location
   * @param $timeout
   * @param ROUTES
   * @ngInject
   */

  constructor($rootScope, $window, $location, $timeout, ROUTES) {
    this._$rootScope = $rootScope;
    this._$window = $window;
    this._$location = $location;
    this._$timeout = $timeout;
    this._routes = ROUTES;
  }

  addAuthTemplate() {
    this.rootScopeEventOff = this._$rootScope.$on('$includeContentLoaded', ()=> {
      this._$timeout(()=> {
        this._$rootScope.down = true;
      }, 150);
    });
    this._$timeout(()=> {
      this._$rootScope.isAuth = baseURL + '/authentication.html';
    });

  }

  removeAuthTemplate(promise) {
    this.addAuthAnimEvent(()=> {
      this.rootScopeEventOff();
      this._$rootScope.isAuth = null;
      promise.resolve();
    }, 'authentication');
    this._$timeout(()=> {
      this._$rootScope.down = false;
      this.addHeaderTemplate();
      promise.resolve();
    });
  }

  addHeaderTemplate() {
    this._$timeout(()=> {
      this._$rootScope.isHeader = true;
    });
  }

  removeHeaderTemplate(callback) {
    this.addAuthAnimEvent(()=> {
      callback();
      this.addAuthTemplate();
    }, 'header-page');
    this._$rootScope.isHeader = false;
  }

  addAuthAnimEvent(callback, className) {
    const dom = document.querySelector('.' + className);
    const animEnd = ()=> {
      removeHandler();
      callback();
    };
    const animChildEnd = (e)=> {
      e.stopPropagation();
    };
    const removeHandler = ()=> {
      dom.removeEventListener("transitionend", animEnd);
      dom.children[0].removeEventListener("transitionend", animChildEnd)
    };
    dom.addEventListener("transitionend", animEnd);
    dom.children[0].addEventListener("transitionend", animChildEnd)
  }

}
export default RoutingAnimService