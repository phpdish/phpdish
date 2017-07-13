webpackJsonp([9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(1);
	__webpack_require__(28);

	//修改个人信息
	(function ($) {
	    $("#profile").validate({
	        errorClass: 'error-message',
	        errorPlacement: function (error, element) {
	            $(element).closest('form-control').addClass('has-error');
	            error.insertAfter($(element));
	        },
	        rules: {
	            username: {
	                required: true
	            },
	            gender: {
	                required: true
	            },
	            email: {
	                email: true
	            },
	            site_url: {
	                url: true
	            },
	            "profile[qq]": {
	                number: true
	            },
	            "profile[mobile_phone]": {
	                number: true,
	                rangelength: [11, 11]
	            },
	            "profile[birth]": {
	                dateISO: true
	            }
	        },
	        messages: {
	            username: {
	                required: '请输入用户名!'
	            },
	            gender: {
	                required: '性别不得为空!'
	            },
	            email: {
	                email: '邮箱格式不正确!'
	            },
	            site_url: {
	                url: "请输入合法的网址"
	            },
	            "profile[qq]": {
	                number: "qq必须是纯数字"
	            },
	            "profile[mobile_phone]": {
	                number: "手机号是纯数字",
	                rangelength: "手机号是11位纯数字"
	            },
	            "profile[birth]": {
	                dateISO: "生日必须是合法日期"
	            }
	        }
	    });
	})($);

	//修改密码
	(function ($) {
	    $("#change-password-form").validate({
	        errorClass: 'error-message',
	        errorPlacement: function (error, element) {
	            $(element).closest('form-control').addClass('has-error');
	            error.insertAfter($(element));
	        },
	        rules: {
	            old_password: {
	                required: true,
	                rangelength: [6, 15]
	            },
	            password: {
	                required: true,
	                rangelength: [6, 15]
	            },
	            repassword: {
	                required: true,
	                equalTo: '#password',
	                rangelength: [6, 15]
	            }
	        },
	        messages: {
	            old_password: {
	                required: '请输入旧密码!',
	                rangelength: "密码在6到15位之间"
	            },
	            password: {
	                required: '请输入新密码!',
	                rangelength: "密码在6到15位之间"
	            },
	            repassword: {
	                required: '请重复新密码!',
	                equalTo: '重复密码不一致',
	                rangelength: "密码在6到15位之间"
	            }
	        }
	    });
	})($);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);