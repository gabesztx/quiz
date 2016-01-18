webpackHotUpdate(0,{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sideEffectNode = document.createElement('h3');
	sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
	ssideEffectNode.textContent = 'Lorem Impsum Dolor';
	
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
//# sourceMappingURL=0.3ec43d301a9deb70077f.hot-update.js.map