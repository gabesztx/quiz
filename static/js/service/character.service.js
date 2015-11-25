'use strict';
class CharacterService {
  /**
   * @param {PostalService} postalService
   * @ngInject
   */
  constructor(postalService) {
    this.interactiveDom = angular.element(document.querySelector('.lobby-content'));

  }
  initMyHandler(){
    console.log('CharacterServices', this.interactiveDom);
  }

}
export default CharacterService;

