webpackHotUpdate(0,{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sideEffectNode = document.createElement('h3');
	sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
	sideEffectNode.textContent = 'Lorem Impsum Dolor';
	
	setInterval(function () {
	  sideEffectNode.textContent = 'Lorem Impsum Dolor' + ' ' + window.num++;
	}, 500);
	document.body.appendChild(sideEffectNode);
	
	if (true) {
	  module.hot.accept();
	  module.hot.dispose(function () {
	    sideEffectNode.parentNode.removeChild(sideEffectNode);
	  });
	}

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _main = __webpack_require__(45);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _config = __webpack_require__(56);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _dom = __webpack_require__(35);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.num = 0;
	if (true) {
	  module.hot.accept();
	  //module.hot.dispose(()=> {});
	}

/***/ }

})
//# sourceMappingURL=0.7c61301941504d02d15f.hot-update.js.map