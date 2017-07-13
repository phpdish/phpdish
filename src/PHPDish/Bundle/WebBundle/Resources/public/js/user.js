webpackJsonp([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(1);
	var util = __webpack_require__(4);

	(function ($) {
	    var container = $('#uclist').first();
	    container = container || $('#content .entry-content');
	    var page = 2;
	    $('#loading').on('click', function () {
	        var $this = $(this);
	        $this.attr('disabled', true);
	        $this.html('加载更多...');
	        $.get(window.window.resourceUrl, { "page": page }, function (data) {
	            if (data.length != 0) {
	                container.append(data);
	                $this.attr('disabled', false);
	                page++;
	            } else {
	                $this.remove();
	                util.dialog.alert('已经没有更多内容');
	            }
	            $this.html('加载更多');
	        });
	    });
	})($);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);