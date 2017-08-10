'use strict';

import 'jquery-validation';
import 'module/common.js';
import Util from '../modules/util.js';
import nunjucks from 'nunjucks';

//话题详情页
(function($){
    const $editorElement = $('#editor');
    const $addReplyForm = $('#add-reply-form');
    const $repliesPanel = $('#topic-replies-panel');

    //添加回复表单提交
    $addReplyForm.on('submit', function(){
        if($addReplyForm.lock){
            return false;
        }
        let body = $.trim($editorElement.val());
        if(body.length === 0){
            Util.dialog.msg('请填写内容');
            return false;
        }
        $addReplyForm.lock = true;
        Util.request('topic.addReply', window.topicId, {reply: {original_body: body}}).success(function(response){
            const html = nunjucks.render('../templates/topic/reply_item.njk', {
                'reply': response.reply
            });
            console.log(html, response);

        }).complete(function(){
            $addReplyForm.lock = false;
        });
        return false;
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

