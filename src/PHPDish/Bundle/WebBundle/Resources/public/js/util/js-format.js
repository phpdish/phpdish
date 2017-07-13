webpackJsonp([13],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(1);

	var beautify = __webpack_require__(34);

	function JsFormat() {
	    var $srcCode = $('#src-code');
	    var $targetCode = $('#target-code');
	    var $preview = $targetCode.find('[data-role="preview"]');
	    var $indent = $targetCode.find(['data-role="indent"']);
	    //绑定 事件
	    $srcCode.on('keyup', function () {
	        var rawContent = $.trim($srcCode.val());
	        var result = beautify(rawContent, { indent_size: 2, newline_between_rules: true });
	        $preview.val(result);
	    });
	}
	new JsFormat();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);