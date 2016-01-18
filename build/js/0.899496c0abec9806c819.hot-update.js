webpackHotUpdate(0,{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sideEffectNode = document.createElement('h3');
	sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
	sideEffectNode.textContent = 'Lorem Impsum Dolor';
	var num = 0;
	setInterval(function () {
	  num++;
	  sideEffectNode.textContent = 'Lorem Impsum Dolor' + ' ' + num;
	}, 500);
	document.body.appendChild(sideEffectNode);
	
	if (true) {
	  module.hot.accept();
	  module.hot.dispose(function () {
	    sideEffectNode.parentNode.removeChild(sideEffectNode);
	  });
	}

/***/ }

})
//# sourceMappingURL=0.899496c0abec9806c819.hot-update.js.map