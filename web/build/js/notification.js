webpackJsonp([15],{

/***/ "./assets/js/notification.js":
/*!***********************************!*\
  !*** ./assets/js/notification.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(/*! ../modules/common.js */ "./assets/modules/common.js");

var _util = __webpack_require__(/*! ../modules/util.js */ "./assets/modules/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var $messageBody = $('#message_body');
    $('#reply-chat-form').on('submit', function () {
        if ($messageBody.val().length === 0) {
            _util2.default.dialog.message(Translator.trans('notification.reply_content_cannot_be_empty')).flash();
            return false;
        }
    });
})($);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

},["./assets/js/notification.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbm90aWZpY2F0aW9uLmpzIl0sIm5hbWVzIjpbIiRtZXNzYWdlQm9keSIsIiQiLCJvbiIsInZhbCIsImxlbmd0aCIsImRpYWxvZyIsIm1lc3NhZ2UiLCJUcmFuc2xhdG9yIiwidHJhbnMiLCJmbGFzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7eUNBQUE7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBLENBQUMsWUFBVTtBQUNQLFFBQU1BLGVBQWVDLEVBQUUsZUFBRixDQUFyQjtBQUNBQSxNQUFFLGtCQUFGLEVBQXNCQyxFQUF0QixDQUF5QixRQUF6QixFQUFtQyxZQUFNO0FBQ3JDLFlBQUlGLGFBQWFHLEdBQWIsR0FBbUJDLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ2pDLDJCQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0JDLFdBQVdDLEtBQVgsQ0FBaUIsNENBQWpCLENBQXBCLEVBQW9GQyxLQUFwRjtBQUNBLG1CQUFPLEtBQVA7QUFDSDtBQUNKLEtBTEQ7QUFNSCxDQVJELEVBUUdSLENBUkgsRSIsImZpbGUiOiJqcy9ub3RpZmljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4uL21vZHVsZXMvY29tbW9uLmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vbW9kdWxlcy91dGlsLmpzJztcclxuXHJcbihmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJG1lc3NhZ2VCb2R5ID0gJCgnI21lc3NhZ2VfYm9keScpO1xyXG4gICAgJCgnI3JlcGx5LWNoYXQtZm9ybScpLm9uKCdzdWJtaXQnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCRtZXNzYWdlQm9keS52YWwoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgVXRpbC5kaWFsb2cubWVzc2FnZShUcmFuc2xhdG9yLnRyYW5zKCdub3RpZmljYXRpb24ucmVwbHlfY29udGVudF9jYW5ub3RfYmVfZW1wdHknKSkuZmxhc2goKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgkKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvbm90aWZpY2F0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==