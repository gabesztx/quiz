'use strict';
class CharacterService {
  /**
   * @ngInject
   */
  constructor($window) {
    this._$window = $window;
    this.speed = 20;
  }

  /**
   * set current interactive dom
   */
  setInteractiveDom(elem) {
    this.interactiveDomWidth = elem.offsetWidth;
  }

  /**
   * set current character
   */
  setCharacter(elem) {
    this.characterWidth = elem[0].offsetWidth;
    this.characterChild = elem.eq(0);
  }

  /**
   * claculate and get click interactive dom position percent
   */
  calculatePercent(data) {
    return Math.ceil((data - this.calculateWithDif()) / this.interactiveDomWidth * 100);
  }

  /**
   * claculate and get character position percent
   */
  calculateTransformPercent(data) {
    return ((this.interactiveDomWidth - this.characterWidth) / this.characterWidth) * data;
  }

  /**
   * claculate and get character position percent
   */
  calculateWithDif() {
    return (this._$window.innerWidth - this.interactiveDomWidth) / 2;
  }

  /**
   * get character duration from interactive dom dimension from click
   */
  getCharacterDuration(data) {
    const duration = (this.calculatePercent(data) - this.calculatePercent(this.getDomTransform())) / this.speed;
    return duration < 0 ? -duration : duration;
  }

  /**
   * get character duration from interactive dom dimension from resize
   */
  getCharacterDurationResize(data) {
    const duration = (data - this.calculatePercent(this.getDomTransform())) / this.speed;
    return duration < 0 ? -duration : duration;
  }

  /**
   * get interactive dom position percent resize
   */
  getResizeCalculatePositions() {
    return this.calculatePercent(this.getDomTransform());
  }

  /**
   * get character transform position
   */
  getDomTransform() {
    return Math.ceil(getComputedStyle(this.characterChild[0].children[0]).transform.split(',')[4]) + this.calculateWithDif();
  }

}
export default CharacterService;

