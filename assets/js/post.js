'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';
import Editor from '../modules/md-editor/editor.js'
import lockButton from '../modules/button-lock.js';

import SimpleMDE from 'simplemde';
import InlineAttachment from '../modules/inline-attachment.js';
import hljs from 'highlight.js';

/**
 * Post Details
 */
(function($){

    //代码高亮
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    //添加评论的表单
    const $addComment = $('#add-comment');
    const $addCommentForm = $('#add-comment-form');
    let editor;

    if ($addCommentForm.length > 0) {
        const $commentBody = $('#comment_original_body');
        const $preview = $addComment.find('[data-action="preview"]');
        const $previewPanel = $addComment.find('[data-role="preview-panel"]');
        editor = new Editor($commentBody, $preview, $previewPanel);
        $addCommentForm.on('submit', function(){
            const $form = $(this);
            const $btn = $form.find('[data-role="submit"]');
            const csrfToken = $('#comment__token').val();

            const body = editor.getContent();
            if (body.length === 0) {
                return false;
            }
            const buttonLock = lockButton($btn).text('提交中').lock();
            Util.request('comment.add', window.postId, {
                comment: {
                    original_body: body,
                    _token:csrfToken
                }
            }).done(function(response){
                editor.setContent('');
                Util.dialog.message('回复成功').flash();
            }).fail(function(response){
                Util.dialog.message(response.responseObj.error);
            }).always(() => {
                console.log('释放锁');
                buttonLock.release();
            });
            return false;
        });
    }

    //Reply list
    const $repliesPanel = $('#reply-list');
    $repliesPanel.find('[data-role="reply"]').each(function(){
        const $this = $(this);
        const replyId = $this.data('reply-id');
        const username = $this.data('username');
        //回复层主
        if (editor) {
            $this.find('[data-action="mention"]').on('click', function(){
                editor.appendContent(`@${username} `);
                Util.goHash('#add-comment-form');
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
            Util.dialog.confirm('确认删除这个评论吗？').then(() => {
                Util.request('comment.delete', replyId).done(() => {
                    Util.dialog.message('评论已经被删除').flash(2, () => {
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

    //Post Action
    const $postAction = $('[data-role="post-action"]');
    const $removeAction = $postAction.find('[data-action="remove"]');
    const buttonLock = lockButton($removeAction);
    $removeAction.on('click', () => {
        if (buttonLock.isDisabled()) {
            return false;
        }
        buttonLock.lock();
        Util.dialog.confirm('确认删除这篇文章吗？').then(() => {
            Util.request('post.delete', window.postId).done(() => {
                Util.dialog.message('文章已经被删除').flash(2, () => {
                    location.href = Util.route.getRoutePath('posts');
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

})($);



/**
 * 添加文章
 */
(function($){
    const postBody = document.getElementById('post_originalBody');
    const $postBody = $(postBody);
    const $postTitle = $('#post_title');
    const $addPostForm = $('#add-post-form');
    const $addPostBtn = $('[data-action="add-post"]');

    if (postBody) {
        const simplemde = new SimpleMDE({
            element: postBody,
            autofocus: true,
            spellChecker: false,
            status: false,
            indentWithTabs: false,
            tabSize: 4,
            autosave: {
                enabled: true,
                uniqueId: 'post_draft',
                delay: 1000,
            },
            toolbar: [
                "bold", "italic", "heading", "|", "quote", "code", "table",
                "horizontal-rule", "unordered-list", "ordered-list", "|",
                "link", "image", "|",  "side-by-side", "fullscreen", "preview", "|",
                {
                    name: 'guide',
                    action: 'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                    className: 'fa fa-info-circle',
                    title: 'Markdown 语法',
                }
            ],
        });
        new InlineAttachment(simplemde.codemirror); //处理附件上传的功能

        $addPostBtn.on('click', () => {
            if ($postTitle.val().length === 0 || simplemde.value().length === 0) {
                Util.dialog.message('文章标题和内容不能为空').flash();
                return false;
            }
            const buttonLock = lockButton($addPostBtn).lock();
            Util.dialog.confirm('确认发布这篇文章？').then(()=> {
                $addPostForm.submit();
                return true;
            }, () => {
                buttonLock.release();
                return false;
            });
            return false;
        });
    }
})($);









