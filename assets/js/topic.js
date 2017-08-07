'use strict';
require('module/common.js');
var Editor = require('module/editor.js');
var util = require('module/util.js');
require('jquery-validation');

//话题列表页与话题详情页公用
var $contentTextarea = $('#content-textarea');
//编辑器
if($contentTextarea.length > 0){
    var editor = new Editor($contentTextarea);
}
//话题详情页
(function($){
    var $addReplyForm = $('#add-reply-form');

    // //回复艾特
    // $('[data-at]').on('click', document, function(){
    //    var $this = $(this);
    //    var username = $this.data('at');
    //    if(typeof username != 'undefined' && username.length != 0){
    //        editor.$txt.prepend('回复 @' + username + ' :');
    //    }
    //    util.goHash($addReplyForm);
    // });
    //回复验证
    $addReplyForm.validate({
       submitHandler: function() {
           if($addReplyForm._lock){
               return false;
           }
           var contentText = editor.$txt.formatText();
           if($.trim(contentText).length == 0){
                util.dialog.msg('请填写内容');
               return false;
           }
           $addReplyForm._lock = true;
           util.request('topicReply.add', {topicId: window.topicId}, $addReplyForm.serialize(), {success: function(response){
               if (response.code==0) {
                   util.dialog.msg(response.message, 2);
                   setTimeout(function(){
                       location.reload();
                   }, 1000);
               } else {
                   util.dialog.alert(response.message, 2);
               }
               $addReplyForm._lock = false;
           }});
           return false;
       },
       errorPlacement: function(error, element) {
           error.insertAfter($(element));
       },
       rules: {
           content: {
               required: true
           }
       },
       messages: {
           content: {
               required: '请填写内容',
           }
       }
   });
})($);

//添加话题
(function($){
    var $addQuestionForm = $('#add-question-form');
    $addQuestionForm.validate({
        submitHandler: function() {
            var contentText = editor.$txt.formatText();
            if($.trim(contentText).length == 0){
                util.dialog.msg('请填写内容');
                return false;
            }
            if($addQuestionForm._lock){
                return false;
            }
            $addQuestionForm._lock = true;
            util.request('question.add', {topicId: window.topicId}, $addQuestionForm.serialize(), {success: function(response){
                if (response.code == 0) {
                    util.dialog.msg(response.message);
                    setTimeout(function(){
                        location.reload();
                    }, 1000);
                } else {
                    util.dialog.alert(response.message);
                }
            }});
            return false;
        },
        errorClass: 'color-red',
        errorPlacement: function(error, element) {
            error.insertAfter($(element));
        },
        rules: {
            title: {
                required: true,
                minlength:6,
                maxlength:50
            },
            content: {
                required: true
            }
        },
        messages: {
            title: {
                required: '请输入标题',
                minlength: "标题不得少于6个字",
                maxlength: "标题不得多余50个字"
            },
            content: {
                required: '内容不得为空',
            }
        }
    });
})($);

