webpackHotUpdate(0,{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sideEffectNode = document.createElement('h3');
	sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
	sideEffectNode.textCofntent = 'Lorem Impsum Dolor' + ' ' + window.num;
	
	/*setInterval(()=>{
	  sideEffectNode.textCofntent = 'Lorem Impsum Dolor'+' '+window.num++;
	},1000);*/
	document.body.appendChild(sideEffectNode);
	
	if (true) {
	  module.hot.accept();
	  module.hot.dispose(function () {
	    sideEffectNode.parentNode.removeChild(sideEffectNode);
	  });
	}

/***/ }

})
//# sourceMappingURL=0.b093bcfab9fa8d20e4e6.hot-update.js.map