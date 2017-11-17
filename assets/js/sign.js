'use strict';
require('module/common.js');
require('jquery-validation');

//登录
(function(){
    $("#login-form").validate({
        errorPlacement: function(error, element) {
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
                required: "请输入用户名或者邮箱"
            },
            _password: {
                required: '请输入密码!',
            }
        }
    });
})($);

//注册
(function(){
    $("#register-form").validate({
        errorPlacement: function(error, element) {
            if($(element).attr('type') == 'checkbox'){
                $('#for_policy').append(error);
            }else{
                error.insertAfter($(element).parent());
            }
        },
        rules: {
            'fos_user_registration_form[username]': {
                required: true,
                rangelength: [2,15]
            },
            'fos_user_registration_form[email]': {
                required: true,
                email: true
            },
            'fos_user_registration_form[plainPassword][first]': {
                required: true,
                rangelength: [6,15]
            },
            'fos_user_registration_form[plainPassword][second]': {
                required: true,
                equalTo: '#fos_user_registration_form_plainPassword_first',
            },
            agree_policy: {
                required: true
            }
        },
        messages: {
            'fos_user_registration_form[username]': {
                required: "请输入用户名",
                rangelength: "用户名在2到15位之间"
            },
            'fos_user_registration_form[email]': {
                required: "请输入邮箱",
                email: "邮箱格式错误"
            },
            'fos_user_registration_form[plainPassword][first]': {
                required: '请输入密码!',
                rangelength: "密码在6到15位之间"
            },
            'fos_user_registration_form[plainPassword][second]': {
                required: '请再次输入密码!',
                equalTo: '密码不一致'
            },
            agree_policy: {
                required: '请先同意条款!',
            }
        }
    });
})($);

//forgot
(function(){
    $("#forgot-form").validate({
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
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
                required: '请输入验证码',
            }
        }
    });
})($);

//resetting
(function(){
    $("#resetting-form").validate({
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
            error.insertAfter($(element).prev());
        },
        rules: {
            password: {
                required: true,
                rangelength: [6,15]
            },
            repassword: {
                required: true,
                equalTo: '#password',
                rangelength: [6,15]
            },
            code: {
                required: true,
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
                required: "请输入验证码",
            },
        }
    });
})($);

//social bind
(function($){
    $("#bind-register-form").validate({
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
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
                required: '请先同意条款!',
            }
        }
    });
    $("#bind-login-form").validate({
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
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
                required: '请输入密码!',
            }
        }
    });
})($);