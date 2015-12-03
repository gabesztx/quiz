module.exports = {
  a1: {
    css: {
      'width': '120px',
      'height': '90px',
      'background-image': 'url("./static/asset/man.png")',
      'background-size': 'cover',
      'background-position': '0 0',
      'animation': 'playMan 1s steps(30)',
      'animation-iteration-count': 'infinite',
      'animation-play-state': 'running',
      'transform': 'scaleX(1)',
      'transform': 'translate3d(-50%, 0, 0)',
      '-webkit-transform': 'translate3d(-50%, 0, 0)'
    },
    keyframes: '<style>@keyframes playMan { from { background-position:0 0; } to { background-position: -3600px 0; }</style>'
  }
};
