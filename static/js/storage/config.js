const CharacterConfig = {
  a1: {
    className: 'a1',
    config: {
      'width': 120,
      'height': 90,
      'durationGlobal': 15,
      'durationEnd': 0.7,
      'durationStart': 0.5
    },
    style:
    '<style>' +
        '.a1{' +
            'width: 100%;' +
            'height: 100%; ' +
            'animation: playa1Anim steps(28);' +
            'animation-iteration-count: infinite !important;' +
            'background-image: url("./static/asset/a1.png");' +
        '}' +

        '.stopa1{' +
            'animation: none; ' +
            'background-position: 0 0' +
        '}' +

      '@keyframes playa1Anim { ' +
      'from { background-position:0 0; } ' +
      'to { background-position: -3360px 0; }' +

    '</style>'
  },
  a2: {
    className: 'a2',
    config: {
      'width': 130,
      'height': 98,
      'durationGlobal': 8,
      'durationEnd': 1,
      'durationStart': 0.5
    },
    style:
    '<style>' +
    '.a2{' +
    'width: 100%;' +
    'height: 100%; ' +
    'animation: playa2Anim steps(49);' +
    'animation-iteration-count: infinite !important;' +
    'background-image: url("./static/asset/a2.png");' +
    'background-position: -2210px 0'+
    '}' +

    '.stopa2{' +
    'animation: none; ' +
    'background-position: -2210px 0' +
    '}' +

    '@keyframes playa2Anim { ' +
    'from { background-position:0 0; } ' +
    'to { background-position: -6370px 0; }' +

    '</style>'
  }
};
const isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
export {CharacterConfig, isIE};