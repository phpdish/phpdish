webpackJsonp([16],{

/***/ "./assets/js/user.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
// require('module/common.js');

var util = __webpack_require__("./assets/modules/util.js");

$(function ($) {
    $('[data-role="follow-user"]').on('click', function () {
        var username = $(this).data('username');
        util.request('user.follow', { 'username': username }, function (response) {
            console.log(response);
        });
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},["./assets/js/user.js"]);