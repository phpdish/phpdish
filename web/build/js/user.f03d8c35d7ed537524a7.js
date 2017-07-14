webpackJsonp([16],{

/***/ "./assets/js/user.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
// require('module/common.js');
// var util = require('module/util.js');

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/_jquery@1.12.4@jquery/dist/jquery.js")))

/***/ })

},["./assets/js/user.js"]);