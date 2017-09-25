'use strict';

import 'module/common.js';
import Util from '../modules/util.js';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import marked from 'marked';
import store from 'store';
import SocialShare from 'social-share-button.js';
import lockButton from '../modules/button-lock.js';
import 'inline-attachment/src/inline-attachment.js'
import 'inline-attachment/src/codemirror-4.inline-attachment.js'
import Editor from '../modules/md-editor/editor.js';

//话题详情页
(function($){

    //分享
    new SocialShare('.social-share-container', {
        'theme': 'default'
    });

    (function(){
        //话题操作
        const $topicAction =  $('[data-role="topic-action"]');
        const $removeAction = $topicAction.find('[data-action="remove"]');
        const $recommendAction = $topicAction.find('[data-action="recommend"]');
        const buttonLock = lockButton($removeAction);
        $removeAction.on('click', function(){
            if (buttonLock.isDisabled()) {
                return false;
            }
            buttonLock.lock();
            Util.dialog.confirm('确认删除这个话题吗？').then(() => {
                Util.request('topic.delete', window.topicId).done(() => {
                    Util.dialog.message('话题已经被删除').flash(2, () => {
                        location.href = '/';
                    });
                }).fail((response) => {
                    Util.dialog.message(response.responseObj.error).flash(3);
                }).always(()  => {
                    buttonLock.release();
                });
            }, () => {
                buttonLock.release();
            });
        });
        //推荐位
        const recommendButtonLock = lockButton($recommendAction);
        $recommendAction.on('click', function(){
            if (recommendButtonLock.isDisabled()) {
                return false;
            }
            recommendButtonLock.lock();
            const isRecommended = $recommendAction.data('recommend');
            let message =  isRecommended ? '确认取消推荐吗？' : '确认推荐这个话题吗?';

            Util.dialog.confirm(message).then(() => {
                Util.request('topic.toggleRecommend', window.topicId).done((response) => {
                    let message = response.is_recommended ? '话题已经被推荐' : '话题已经被取消推荐';
                    Util.dialog.message(message).flash(2, () => {
                        location.reload();
                    });
                }).fail((response) => {
                    Util.dialog.message(response.responseObj.error).flash(3);
                }).always(()  => {
                    recommendButtonLock.release();
                });
            }, () => {
                recommendButtonLock.release();
            });
        });
    })($);



    //回复窗口
    (function(){
        const $replyTopic = $('#reply-topic');
        if ($replyTopic.length > 0) {
            const $addReplyForm = $('#add-reply-form');
            const $replyBody = $('#reply_original_body');
            const $preview = $replyTopic.find('[data-action="preview"]');
            const $previewPanel = $replyTopic.find('[data-role="preview-panel"]');
            const editor = new Editor($replyBody, $preview, $previewPanel);
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
        }

    })();

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
        inlineAttachment.editors.codemirror4.attach(editor, {
            uploadUrl: Util.route.getRoutePath('upload'),
            jsonFieldName: 'path',
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
