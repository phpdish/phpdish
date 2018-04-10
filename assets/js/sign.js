'use strict';
require('module/common.js');
require('jquery-validation');
import Util from '../modules/util.js';

//登录
(function(){
    const $loginForm = $("#login-form");
    $loginForm.validate({
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
                required: Translator.trans('sign.validation.username')
            },
            _password: {
                required: Translator.trans('sign.validation.password'),
            }
        }
    });

    //找回密码
    false && $loginForm.find('.forgot-password').on('click', () => {
        Util.dialog.create(Translator.trans('ui.tips'), Translator.trans('sign.validation.forgot_password'), {
            width: 300
        });
        return false;
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
                required: Translator.trans('register.validation.username.required'),
                rangelength: Translator.trans('register.validation.username.required')
            },
            'fos_user_registration_form[email]': {
                required: Translator.trans('register.validation.email.required'),
                email: Translator.trans('register.validation.email.email')
            },
            'fos_user_registration_form[plainPassword][first]': {
                required: Translator.trans('register.validation.password.required'),
                rangelength:Translator.trans('register.validation.password.length')
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