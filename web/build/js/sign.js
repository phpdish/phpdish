webpackJsonp([14],{

/***/ "./assets/js/sign.js":
/*!***************************!*\
  !*** ./assets/js/sign.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _util = __webpack_require__(/*! ../modules/util.js */ "./assets/modules/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! module/common.js */ "./assets/modules/common.js");
__webpack_require__(/*! jquery-validation */ "./node_modules/jquery-validation/dist/jquery.validate.js");


//登录
(function () {
    var $loginForm = $("#login-form");
    $loginForm.validate({
        errorPlacement: function errorPlacement(error, element) {
            error.insertAfter($(element).parent());
        },
        rules: {
            _username: {
                required: true
            },
            _password: {
                required: true
            }
        },
        messages: {
            _username: {
                required: Translator.trans('sign.validation.username')
            },
            _password: {
                required: Translator.trans('sign.validation.password')
            }
        }
    });

    //找回密码
    false && $loginForm.find('.forgot-password').on('click', function () {
        _util2.default.dialog.create(Translator.trans('ui.tips'), Translator.trans('sign.validation.forgot_password'), {
            width: 300
        });
        return false;
    });
})($);

//注册
(function () {
    $("#register-form").validate({
        errorPlacement: function errorPlacement(error, element) {
            if ($(element).attr('type') == 'checkbox') {
                $('#for_policy').append(error);
            } else {
                error.insertAfter($(element).parent());
            }
        },
        rules: {
            'fos_user_registration_form[username]': {
                required: true,
                rangelength: [2, 15]
            },
            'fos_user_registration_form[email]': {
                required: true,
                email: true
            },
            'fos_user_registration_form[plainPassword][first]': {
                required: true,
                rangelength: [6, 15]
            },
            'fos_user_registration_form[plainPassword][second]': {
                required: true,
                equalTo: '#fos_user_registration_form_plainPassword_first'
            },
            agree_policy: {
                required: true
            }
        },
        messages: {
            'fos_user_registration_form[username]': {
                required: Translator.trans('register.validation.username.required'),
                rangelength: Translator.trans('register.validation.username.required')
            },
            'fos_user_registration_form[email]': {
                required: Translator.trans('register.validation.email.required'),
                email: Translator.trans('register.validation.email.email')
            },
            'fos_user_registration_form[plainPassword][first]': {
                required: Translator.trans('register.validation.password.required'),
                rangelength: Translator.trans('register.validation.password.length')
            },
            'fos_user_registration_form[plainPassword][second]': {
                required: Translator.trans('register.validation.second_password.required'),
                equalTo: Translator.trans('register.validation.second_password.equal_to')
            },
            agree_policy: {
                required: Translator.trans('register.validation.agree_policy.required')
            }
        }
    });
})($);

//forgot
(function () {
    $("#forgot-form").validate({
        errorClass: 'error-message',
        errorPlacement: function errorPlacement(error, element) {
            error.insertAfter($(element).prev());
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            captcha: {
                required: true
            }
        },
        messages: {
            email: {
                required: "请输入账号绑定的邮箱",
                email: "邮箱格式错误"
            },
            captcha: {
                required: '请输入验证码'
            }
        }
    });
})($);

//resetting
(function () {
    $("#resetting-form").validate({
        errorClass: 'error-message',
        errorPlacement: function errorPlacement(error, element) {
            error.insertAfter($(element).prev());
        },
        rules: {
            password: {
                required: true,
                rangelength: [6, 15]
            },
            repassword: {
                required: true,
                equalTo: '#password',
                rangelength: [6, 15]
            },
            code: {
                required: true
            }
        },
        messages: {
            password: {
                required: '请输入新密码!',
                rangelength: "密码在6到15位之间"
            },
            repassword: {
                required: '请重复新密码!',
                equalTo: '重复密码不一致',
                rangelength: "密码在6到15位之间"
            },
            code: {
                required: "请输入验证码"
            }
        }
    });
})($);

//social bind
(function ($) {
    $("#bind-register-form").validate({
        errorClass: 'error-message',
        errorPlacement: function errorPlacement(error, element) {
            $('#for_new_' + $(element).attr('name')).append(error);
        },
        rules: {
            username: {
                required: true
            },
            agree_policy: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            agree_policy: {
                required: '请先同意条款!'
            }
        }
    });
    $("#bind-login-form").validate({
        errorClass: 'error-message',
        errorPlacement: function errorPlacement(error, element) {
            $('#for_' + $(element).attr('name')).append(error);
        },
        rules: {
            username: {
                required: true
            },
            pwd: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            pwd: {
                required: '请输入密码!'
            }
        }
    });
})($);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

},["./assets/js/sign.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2lnbi5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiJGxvZ2luRm9ybSIsIiQiLCJ2YWxpZGF0ZSIsImVycm9yUGxhY2VtZW50IiwiZXJyb3IiLCJlbGVtZW50IiwiaW5zZXJ0QWZ0ZXIiLCJwYXJlbnQiLCJydWxlcyIsIl91c2VybmFtZSIsInJlcXVpcmVkIiwiX3Bhc3N3b3JkIiwibWVzc2FnZXMiLCJUcmFuc2xhdG9yIiwidHJhbnMiLCJmaW5kIiwib24iLCJkaWFsb2ciLCJjcmVhdGUiLCJ3aWR0aCIsImF0dHIiLCJhcHBlbmQiLCJyYW5nZWxlbmd0aCIsImVtYWlsIiwiZXF1YWxUbyIsImFncmVlX3BvbGljeSIsImVycm9yQ2xhc3MiLCJwcmV2IiwiY2FwdGNoYSIsInBhc3N3b3JkIiwicmVwYXNzd29yZCIsImNvZGUiLCJ1c2VybmFtZSIsInB3ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7eUNBQUE7O0FBR0E7Ozs7OztBQUZBLG1CQUFBQSxDQUFRLG9EQUFSO0FBQ0EsbUJBQUFBLENBQVEsbUZBQVI7OztBQUdBO0FBQ0EsQ0FBQyxZQUFVO0FBQ1AsUUFBTUMsYUFBYUMsRUFBRSxhQUFGLENBQW5CO0FBQ0FELGVBQVdFLFFBQVgsQ0FBb0I7QUFDaEJDLHdCQUFnQix3QkFBU0MsS0FBVCxFQUFnQkMsT0FBaEIsRUFBeUI7QUFDckNELGtCQUFNRSxXQUFOLENBQWtCTCxFQUFFSSxPQUFGLEVBQVdFLE1BQVgsRUFBbEI7QUFDSCxTQUhlO0FBSWhCQyxlQUFPO0FBQ0hDLHVCQUFXO0FBQ1BDLDBCQUFVO0FBREgsYUFEUjtBQUlIQyx1QkFBVztBQUNQRCwwQkFBVTtBQURIO0FBSlIsU0FKUztBQVloQkUsa0JBQVU7QUFDTkgsdUJBQVc7QUFDUEMsMEJBQVVHLFdBQVdDLEtBQVgsQ0FBaUIsMEJBQWpCO0FBREgsYUFETDtBQUlOSCx1QkFBVztBQUNQRCwwQkFBVUcsV0FBV0MsS0FBWCxDQUFpQiwwQkFBakI7QUFE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QUNILFNBSjZCO0FBSzlCSSxlQUFPO0FBQ0h3QixzQkFBVTtBQUNOdEIsMEJBQVU7QUFESixhQURQO0FBSUhlLDBCQUFjO0FBQ1ZmLDBCQUFVO0FBREE7QUFKWCxTQUx1QjtBQWE5QkUsa0JBQVU7QUFDTm9CLHNCQUFVO0FBQ050QiwwQkFBVTtBQURKLGFBREo7QUFJTmUsMEJBQWM7QUFDVmYsMEJBQVU7QUFEQTtBQUpSO0FBYm9CLEtBQWxDO0FBc0JBVCxNQUFFLGtCQUFGLEVBQXNCQyxRQUF0QixDQUErQjtBQUMzQndCLG9CQUFZLGVBRGU7QUFFM0J2Qix3QkFBZ0Isd0JBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3JDSixjQUFFLFVBQVVBLEVBQUVJLE9BQUYsRUFBV2UsSUFBWCxDQUFnQixNQUFoQixDQUFaLEVBQXFDQyxNQUFyQyxDQUE0Q2pCLEtBQTVDO0FBQ0gsU0FKMEI7QUFLM0JJLGVBQU87QUFDSHdCLHNCQUFVO0FBQ050QiwwQkFBVTtBQURKLGFBRFA7QUFJSHVCLGlCQUFLO0FBQ0R2QiwwQkFBVTtBQURUO0FBSkYsU0FMb0I7QUFhM0JFLGtCQUFVO0FBQ05vQixzQkFBVTtBQUNOdEIsMEJBQVU7QUFESixhQURKO0FBSU51QixpQkFBSztBQUNEdkIsMEJBQVU7QUFEVDtBQUpDO0FBYmlCLEtBQS9CO0FBc0JILENBN0NELEVBNkNHVCxDQTdDSCxFIiwiZmlsZSI6ImpzL3NpZ24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbnJlcXVpcmUoJ21vZHVsZS9jb21tb24uanMnKTtcclxucmVxdWlyZSgnanF1ZXJ5LXZhbGlkYXRpb24nKTtcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vbW9kdWxlcy91dGlsLmpzJztcclxuXHJcbi8v55m75b2VXHJcbihmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgJGxvZ2luRm9ybSA9ICQoXCIjbG9naW4tZm9ybVwiKTtcclxuICAgICRsb2dpbkZvcm0udmFsaWRhdGUoe1xyXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcigkKGVsZW1lbnQpLnBhcmVudCgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgIF91c2VybmFtZToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3Bhc3N3b3JkOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICBfdXNlcm5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBUcmFuc2xhdG9yLnRyYW5zKCdzaWduLnZhbGlkYXRpb24udXNlcm5hbWUnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfcGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBUcmFuc2xhdG9yLnRyYW5zKCdzaWduLnZhbGlkYXRpb24ucGFzc3dvcmQnKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v5om+5Zue5a+G56CBXHJcbiAgICBmYWxzZSAmJiAkbG9naW5Gb3JtLmZpbmQoJy5mb3Jnb3QtcGFzc3dvcmQnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgVXRpbC5kaWFsb2cuY3JlYXRlKFRyYW5zbGF0b3IudHJhbnMoJ3VpLnRpcHMnKSwgVHJhbnNsYXRvci50cmFucygnc2lnbi52YWxpZGF0aW9uLmZvcmdvdF9wYXNzd29yZCcpLCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSkoJCk7XHJcblxyXG4vL+azqOWGjFxyXG4oZnVuY3Rpb24oKXtcclxuICAgICQoXCIjcmVnaXN0ZXItZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmKCQoZWxlbWVudCkuYXR0cigndHlwZScpID09ICdjaGVja2JveCcpe1xyXG4gICAgICAgICAgICAgICAgJCgnI2Zvcl9wb2xpY3knKS5hcHBlbmQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKCQoZWxlbWVudCkucGFyZW50KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgICAnZm9zX3VzZXJfcmVnaXN0cmF0aW9uX2Zvcm1bdXNlcm5hbWVdJzoge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogWzIsMTVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICdmb3NfdXNlcl9yZWdpc3RyYXRpb25fZm9ybVtlbWFpbF0nOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICdmb3NfdXNlcl9yZWdpc3RyYXRpb25fZm9ybVtwbGFpblBhc3N3b3JkXVtmaXJzdF0nOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJhbmdlbGVuZ3RoOiBbNiwxNV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2Zvc191c2VyX3JlZ2lzdHJhdGlvbl9mb3JtW3BsYWluUGFzc3dvcmRdW3NlY29uZF0nOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVxdWFsVG86ICcjZm9zX3VzZXJfcmVnaXN0cmF0aW9uX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFncmVlX3BvbGljeToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgJ2Zvc191c2VyX3JlZ2lzdHJhdGlvbl9mb3JtW3VzZXJuYW1lXSc6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBUcmFuc2xhdG9yLnRyYW5zKCdyZWdpc3Rlci52YWxpZGF0aW9uLnVzZXJuYW1lLnJlcXVpcmVkJyksXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogVHJhbnNsYXRvci50cmFucygncmVnaXN0ZXIudmFsaWRhdGlvbi51c2VybmFtZS5yZXF1aXJlZCcpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICdmb3NfdXNlcl9yZWdpc3RyYXRpb25fZm9ybVtlbWFpbF0nOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogVHJhbnNsYXRvci50cmFucygncmVnaXN0ZXIudmFsaWRhdGlvbi5lbWFpbC5yZXF1aXJlZCcpLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IFRyYW5zbGF0b3IudHJhbnMoJ3JlZ2lzdGVyLnZhbGlkYXRpb24uZW1haWwuZW1haWwnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnZm9zX3VzZXJfcmVnaXN0cmF0aW9uX2Zvcm1bcGxhaW5QYXNzd29yZF1bZmlyc3RdJzoge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFRyYW5zbGF0b3IudHJhbnMoJ3JlZ2lzdGVyLnZhbGlkYXRpb24ucGFzc3dvcmQucmVxdWlyZWQnKSxcclxuICAgICAgICAgICAgICAgIHJhbmdlbGVuZ3RoOlRyYW5zbGF0b3IudHJhbnMoJ3JlZ2lzdGVyLnZhbGlkYXRpb24ucGFzc3dvcmQubGVuZ3RoJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2Zvc191c2VyX3JlZ2lzdHJhdGlvbl9mb3JtW3BsYWluUGFzc3dvcmRdW3NlY29uZF0nOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogVHJhbnNsYXRvci50cmFucygncmVnaXN0ZXIudmFsaWRhdGlvbi5zZWNvbmRfcGFzc3dvcmQucmVxdWlyZWQnKSxcclxuICAgICAgICAgICAgICAgIGVxdWFsVG86IFRyYW5zbGF0b3IudHJhbnMoJ3JlZ2lzdGVyLnZhbGlkYXRpb24uc2Vjb25kX3Bhc3N3b3JkLmVxdWFsX3RvJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWdyZWVfcG9saWN5OiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogVHJhbnNsYXRvci50cmFucygncmVnaXN0ZXIudmFsaWRhdGlvbi5hZ3JlZV9wb2xpY3kucmVxdWlyZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCQpO1xyXG5cclxuXHJcblxyXG5cclxuLy9mb3Jnb3RcclxuKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiI2ZvcmdvdC1mb3JtXCIpLnZhbGlkYXRlKHtcclxuICAgICAgICBlcnJvckNsYXNzOiAnZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKCQoZWxlbWVudCkucHJldigpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhcHRjaGE6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogXCLor7fovpPlhaXotKblj7fnu5HlrprnmoTpgq7nrrFcIixcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBcIumCrueuseagvOW8j+mUmeivr1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhcHRjaGE6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl6aqM6K+B56CBJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgkKTtcclxuXHJcbi8vcmVzZXR0aW5nXHJcbihmdW5jdGlvbigpe1xyXG4gICAgJChcIiNyZXNldHRpbmctZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgZXJyb3JDbGFzczogJ2Vycm9yLW1lc3NhZ2UnLFxyXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcigkKGVsZW1lbnQpLnByZXYoKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogWzYsMTVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXF1YWxUbzogJyNwYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogWzYsMTVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvZGU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICfor7fovpPlhaXmlrDlr4bnoIEhJyxcclxuICAgICAgICAgICAgICAgIHJhbmdlbGVuZ3RoOiBcIuWvhueggeWcqDbliLAxNeS9jeS5i+mXtFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36YeN5aSN5paw5a+G56CBIScsXHJcbiAgICAgICAgICAgICAgICBlcXVhbFRvOiAn6YeN5aSN5a+G56CB5LiN5LiA6Ie0JyxcclxuICAgICAgICAgICAgICAgIHJhbmdlbGVuZ3RoOiBcIuWvhueggeWcqDbliLAxNeS9jeS5i+mXtFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvZGU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIuivt+i+k+WFpemqjOivgeeggVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgkKTtcclxuXHJcbi8vc29jaWFsIGJpbmRcclxuKGZ1bmN0aW9uKCQpe1xyXG4gICAgJChcIiNiaW5kLXJlZ2lzdGVyLWZvcm1cIikudmFsaWRhdGUoe1xyXG4gICAgICAgIGVycm9yQ2xhc3M6ICdlcnJvci1tZXNzYWdlJyxcclxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJCgnI2Zvcl9uZXdfJyArICQoZWxlbWVudCkuYXR0cignbmFtZScpKS5hcHBlbmQoZXJyb3IpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFncmVlX3BvbGljeToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIuivt+i+k+WFpeeUqOaIt+WQjVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFncmVlX3BvbGljeToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICfor7flhYjlkIzmhI/mnaHmrL4hJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNiaW5kLWxvZ2luLWZvcm1cIikudmFsaWRhdGUoe1xyXG4gICAgICAgIGVycm9yQ2xhc3M6ICdlcnJvci1tZXNzYWdlJyxcclxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJCgnI2Zvcl8nICsgJChlbGVtZW50KS5hdHRyKCduYW1lJykpLmFwcGVuZChlcnJvcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgICB1c2VybmFtZToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHdkOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICB1c2VybmFtZToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwi6K+36L6T5YWl55So5oi35ZCNXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHdkOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ+ivt+i+k+WFpeWvhueggSEnLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCQpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9zaWduLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==