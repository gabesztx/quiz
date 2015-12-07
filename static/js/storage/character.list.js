module.exports = {
  a1: {
    className: 'a1',
    config: {
      'width': '120px',
      'height': '90px',
      'durationGlobal': 15,
      'durationEnd': 0.7,
      'durationStart': 0.4
    },
    style:
    '<style>' +
        '.a1{' +
            'width: 100%;' +
            'height: 100%; ' +
            'animation: playMan steps(28);' +
            'animation-iteration-count: infinite !important;' +
            'background-image: url("./static/asset/man.png");' +
        '}' +

        '.stop{' +
            'animation: none; ' +
            'background-position: 0 0' +
        '}' +

      '@keyframes playMan { ' +
      'from { background-position:0 0; } ' +
      'to { background-position: -3360px 0; }' +

    '</style>'
  }
};
