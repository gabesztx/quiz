module.exports = {
  a1: {
    css: {
      'width': '120px',
      'height': '90px',
      'durationGlobal':15,
      'durationEnd':0.7,
      'durationStart':0.3,
      'steps':30,
      'scale':1,
      'bgImage': 'url("./static/asset/man.png")'
    },
    keyframes: '<style>' +
    '@keyframes playMan { ' +
    'from { background-position:0 0; } ' +
    'to { background-position: -3600px 0; }' +
    '</style>'
  }
};
