'use strict';

import 'module/common.js';
import Util from '../modules/util.js';
import store from 'store';
import SocialShare from 'social-share-button.js';
import lockButton from '../modules/button-lock.js';
import Editor from '../modules/md-editor/editor.js';
import CodeMirrorEditor from '../modules/md-editor/codemirror-editor.js';
import hljs from 'highlight.js';
import AjaxTab from '../modules/ajaxtab.js';

//话题列表页
//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#list-container',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    }
});

//话题详情页
(function($){

    //分享
    new SocialShare('.social-share-container', {
        'theme': 'default'
    });
    //代码高亮
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
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
        const $addReplyForm = $('#add-reply-form');
        const $repliesPanel = $('#reply-list');
        let editor;
        //form 表单
        if ($addReplyForm.length > 0) {
            const $replyBody = $('#reply_original_body');
            const $preview = $replyTopic.find('[data-action="preview"]');
            const $previewPanel = $replyTopic.find('[data-role="preview-panel"]');
            const $submitBtn = $addReplyForm.find('[data-role="submit-form"]');
            editor = new Editor($replyBody, $preview, $previewPanel);
            const replyTopicLock = lockButton($submitBtn);
            //添加回复表单提交
            $addReplyForm.on('submit', function(){
                if(replyTopicLock.isDisabled()){
                    return false;
                }
                let body = editor.getContent();
                if(body.length === 0){
                    Util.dialog.message('请填写内容').flash();
                    return false;
                }
                replyTopicLock.lock();
                Util.request('topic.addReply', window.topicId, $addReplyForm).success(function(response){
                    $replyBody.val('');
                    Util.dialog.message('回复成功').flash(() => location.reload());
                }).complete(function(){
                    replyTopicLock.release();
                });
                return false;
            });
        }

        //Reply list
        $repliesPanel.find('[data-role="reply"]').each(function(){
            const $this = $(this);
            const replyId = $this.data('reply-id');
            const username = $this.data('username');
            //回复层主
            if (editor) {
                $this.find('[data-action="mention"]').on('click', function(){
                    editor.appendContent(`@${username} `);
                    Util.goHash('#add-reply-form');
                });
            }
            //删除回复
            const $removeAction = $this.find('[data-action="remove"]');
            const buttonLock = lockButton($removeAction);
            $removeAction.on('click', function(){
                if (buttonLock.isDisabled()) {
                    return false;
                }
                buttonLock.lock();
                Util.dialog.confirm('确认删除这个回复吗？').then(() => {
                    Util.request('topicReply.delete', replyId).done(() => {
                        Util.dialog.message('回复已经被删除').flash(2, () => {
                            $this.fadeOut();
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
        });

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
        const editor = new CodeMirrorEditor($topicBody, $preview, $previewPanel);
        //提交表单
        $('#add-topic-form').on('submit', function(){
            if ($topicTitle.val().length === 0 || editor.getContent().length === 0) {
                Util.dialog.message('请填写空缺的内容').flash();
                return false;
            }
            $topicBody.val(editor.getContent());
            store.remove('topic_draft');
        });
    }
})($);
