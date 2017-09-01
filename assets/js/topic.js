'use strict';

import 'jquery-validation';
import 'module/common.js';
import 'bootstrap-select';

import Util from '../modules/util.js';
import {editor} from '../modules/blocks/reply';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import marked from 'marked';
import store from 'store';

//话题详情页
(function($){
    const $addReplyForm = $('#add-reply-form');
    //添加回复表单提交
    $addReplyForm.on('submit', function(){
        if($addReplyForm.lock){
            return false;
        }
        let body = editor.getContent();
        if(body.length === 0){
            Util.dialog.message('请填写内容').flash();
            return false;
        }
        $addReplyForm.lock = true;
        Util.request('topic.addReply', window.topicId, {reply: {original_body: body}}).success(function(response){
            Util.dialog.message('回复成功').flash(() => location.reload());
        }).complete(function(){
            $addReplyForm.lock = false;
        });
        return false;
    });
})($);

/**
 * 添加topic
 */
(function($){
    const editorElement = document.getElementById("topic_originalBody");
    const $preview = $('[data-action="preview"]');
    const $previewPanel = $('[data-role="preview-panel"]');
    const $topicTitle = $('#topic_title');
    const $topicBody = $(editorElement);
    if (editorElement) {
        const editor = CodeMirror.fromTextArea(editorElement, {
            mode: 'markdown',
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            // theme: 'yeti'
        });
        //还原draft
        const draft = store.get('topic_draft');
        draft.body && editor.setValue(draft.body);
        draft.title && $topicTitle.val(draft.title);

        editor.on('change', () => {
            const value = editor.getValue();
            //设置draft
            store.set('topic_draft', {
                title: $topicTitle.val(),
                body: value
            });
            //预览
            const html = marked(value);
            $previewPanel.html(html);
        });
        $preview.on('click', () => {
            console.log('click');
            $previewPanel.toggleClass('hidden');
        });
        //提交表单
        $('#add-topic-form').on('submit', function(){
            $topicBody.val(editor.getValue());
        });
    }
})($);

//
// //添加话题
// (function($){
//     var $addQuestionForm = $('#add-question-form');
//     $addQuestionForm.validate({
//         submitHandler: function() {
//             var contentText = editor.$txt.formatText();
//             if($.trim(contentText).length == 0){
//                 util.dialog.msg('请填写内容');
//                 return false;
//             }
//             if($addQuestionForm._lock){
//                 return false;
//             }
//             $addQuestionForm._lock = true;
//             util.request('question.add', {topicId: window.topicId}, $addQuestionForm.serialize(), {success: function(response){
//                 if (response.code == 0) {
//                     util.dialog.msg(response.message);
//                     setTimeout(function(){
//                         location.reload();
//                     }, 1000);
//                 } else {
//                     util.dialog.alert(response.message);
//                 }
//             }});
//             return false;
//         },
//         errorClass: 'color-red',
//         errorPlacement: function(error, element) {
//             error.insertAfter($(element));
//         },
//         rules: {
//             title: {
//                 required: true,
//                 minlength:6,
//                 maxlength:50
//             },
//             content: {
//                 required: true
//             }
//         },
//         messages: {
//             title: {
//                 required: '请输入标题',
//                 minlength: "标题不得少于6个字",
//                 maxlength: "标题不得多余50个字"
//             },
//             content: {
//                 required: '内容不得为空',
//             }
//         }
//     });
// })($);

