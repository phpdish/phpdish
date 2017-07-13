require('module/common.js');
var validation = require('jquery-validation');
var util = require('module/util.js');

(function($){
    var $message = $('#message');
    $message.validate({
        submitHandler: function() {
            util.request('message.add', {}, $message.serialize(), {success: function(response){
                if (response.code == 0) {
                    util.dialog.msg(response.message);
                    $message[0].reset();
                }else{
                    util.dialog.msg(response.message);
                }
            }});
            return false;
        },
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
            $(element).closest('form-control').addClass('has-error');
            error.insertAfter($(element));
        },
        rules: {
            recivers: {
                required: true
            },
            content: {
                required: true
            },
            captcha: {
                required: true
            }
        },
        messages: {
            recivers: {
                required: '请输入收件人!',
            },
            content: {
                required: "请输入消息内容",
            },
            captcha: {
                required: "请输入验证码"
            }
        }
    });
})($);