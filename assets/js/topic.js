'use strict';

import 'module/common.js';
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
        const draft = store.get('topic_draft') || {};
        draft.title && $topicTitle.val(draft.title);
        if (draft.body) {
            editor.setValue(draft.body);
            makePreviewHtml(draft.body);
        }

        editor.on('change', () => {
            const markdown = editor.getValue();
            //设置draft
            store.set('topic_draft', {
                title: $topicTitle.val(),
                body: markdown
            });
            //预览
            makePreviewHtml(markdown);
        });

        $preview.on('click', () => {
            console.log('click');
            $previewPanel.toggleClass('hidden');
        });

        //提交表单
        $('#add-topic-form').on('submit', function(){
            if ($topicTitle.val().length === 0 || editor.getValue().length === 0) {
                Util.dialog.message('请填写空缺的内容').flash();
                return false;
            }
            $topicBody.val(editor.getValue());
            store.remove('topic_draft');
        });
    }
    /**
     * 准备预览区域
     * @param markdown
     */
    function makePreviewHtml(markdown) {
        const html = marked(markdown);
        $previewPanel.html(html);
    }
})($);
