'use strict';
require('module/common.js');
require('jquery-validation');
var Editor = require('module/editor.js');
var util = require('module/util.js');

var $contentTextarea  = $('#content-textarea');
//编辑器
if($contentTextarea.length > 0){
    var editor = new Editor($contentTextarea);
}

(function($){
    $('#is_original').change(function(){
        if($(this).val() == 1){
            $('#reprint').hide();
        }else{
            $('#reprint').show();
        }
    });
    var $addPostForm = $('#add-post-form');
    $addPostForm.validate({
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
            $(element).closest('form-control').addClass('has-error');
            error.insertAfter($(element));
        },
        rules: {
            'title': {
                required: true,
                minlength: 5
            },
            'category_id': {
                required: true,
            },
            'article[content]': {
                required: true,
                minlength: 300
            },
            'reprint_address':{
                url:true
            }
        },
        messages: {
            'title': {
                required: '请输入标题!',
                minlength: '标题不得小于5个字'
            },
            'category_id': {
                required: '请选择投稿的分类!'
            },
            'article[content]': {
                required: "文章内容不得为空",
                minlength: "文章长度不得少于300字"
            },
            'reprint_address':{
                url:"原文地址不是合法的url"
            }
        }
    });
    $addPostForm.on('submit', function(){
        var contentText = editor.$txt.formatText();
        if($.trim(contentText).length == 0){
            util.dialog.msg('请填写内容');
            return false;
        }
    });
})($);