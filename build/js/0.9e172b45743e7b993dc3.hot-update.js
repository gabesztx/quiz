webpackHotUpdate(0,{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sideEffectNode = document.createElement('h3');
	sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
	sideEffectNode.textContent = 'Lorem Impsumccsssssdsds Dolor';
	
	document.body.appendChild(sideEffectNode);
	
	if (true) {
	  module.hot.accept();
	  module.hot.dispose(function () {
	    sideEffectNode.parentNode.removeChild(sideEffectNode);
	  });
	}

/***/ }

})
//# sourceMappingURL=0.9e172b45743e7b993dc3.hot-update.js.map