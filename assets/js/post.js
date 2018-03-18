'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';
import Editor from '../modules/md-editor/editor.js'
import lockButton from '../modules/button-lock.js';

import SimpleMDE from 'simplemde';
import InlineAttachment from '../modules/inline-attachment.js';
import hljs from 'highlight.js';
require('jquery-validation');
import QRCodePayment from '../modules/qrcode-payment.js';
import md5 from 'blueimp-md5';

/**
 * Post Details
 */
const $addComment = $('#add-comment');
$addComment.length > 0 && (function($){
//代码高亮
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
    //添加评论的表单
    const $addCommentForm = $('#add-comment-form');
    let editor;

    if ($addCommentForm.length > 0) {
        const $commentBody = $('#comment_original_body');
        const $preview = $addComment.find('[data-action="preview"]');
        const $previewPanel = $addComment.find('[data-role="preview-panel"]');
        editor = new Editor($commentBody, $preview, $previewPanel);

        const $btn = $addCommentForm.find('[data-role="submit"]');
        const buttonLock = lockButton($btn);
        $addCommentForm.on('submit', function(){
            if(buttonLock.isDisabled()){
                return false;
            }
            const body = editor.getContent();
            if (body.length === 0) {
                Util.dialog.message('请填写内容').flash();
                return false;
            }
            buttonLock.lock();
            const csrfToken = $('#comment__token').val();
            Util.request('comment.add', window.postId, {
                comment: {
                    original_body: body,
                    _token:csrfToken
                }
            }).done(function(response){
                editor.setContent('');
                Util.dialog.message('回复成功').flash(() => location.reload());
            }).fail(function(response){
                Util.dialog.message(response.responseJSON.error);
            }).always(() => {
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
                    Util.dialog.message(response.responseJSON.error).flash(3);
                }).always(()  => {
                    buttonLock.release();
                });
            }, () => {
                buttonLock.release();
            });
        });

        //点赞
        const $voteAction = $this.find('[data-action="vote"]');
        const voteLock = lockButton($voteAction);
        const $icon = $voteAction.find('.fa');
        $voteAction.on('click', function(){
            if (voteLock.isDisabled()) {
                return false;
            }
            voteLock.lock();
            $icon.removeClass('wobble animated')
            Util.request('comment.vote', replyId).done((response) => {
                const $number = $voteAction.find('.number');

                $number.html(response.vote_count);
                if (response.vote_count > 0) {
                    $number.removeClass('hidden');
                } else {
                    $number.addClass('hidden');
                }
                //已经投票的，变成可投票状态
                if (response.is_voted) {
                    $icon.removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');
                    $voteAction.data('voted', true);
                } else {
                    $icon.removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up');
                    $voteAction.data('voted', false);
                }
                $icon.addClass('wobble animated');
            }).fail((response) => {
                Util.dialog.message(response.responseJSON.error).flash(3);
            }).always(()  => {
                voteLock.release();
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
                Util.dialog.message(response.responseJSON.error).flash(3);
            }).always(()  => {
                buttonLock.release();
            });
        }, () => {
            buttonLock.release();
        });
    });

    //投票
    const $voteAction = $('[data-role="vote-post"]');
    const voteButtonLock = lockButton($voteAction);
    $voteAction.on('click', function(){
        if (voteButtonLock.isDisabled()) {
            return false;
        }
        voteButtonLock.lock();
        Util.request('post.vote', window.postId).done((response) => {
            const $number = $voteAction.find('.number');
            $number.html(response.vote_count);
            if (response.vote_count > 0) {
                $number.removeClass('hidden');
            } else {
                $number.addClass('hidden');
            }
            //已经投票的，变成可投票状态
            if (response.is_voted) {
                $voteAction.removeClass('u-btn-outline-primary').addClass('u-btn-primary');
                $voteAction.data('voted', true);
            } else {
                $voteAction.removeClass('u-btn-primary').addClass('u-btn-outline-primary');
                $voteAction.data('voted', false);
            }
        }).fail((response) => {
            Util.dialog.message(response.responseJSON.error).flash(3);
        }).always(()  => {
            voteButtonLock.release();
        });
    });

    //购买
    const $buy = $('[data-role="buy"]');
    $buy.length > 0 && (function(){
        const buttonLock = lockButton($buy);
        const slug = $buy.data('slug');
        $buy.on('click', function(){
            const wait = Util.dialog.wait.ballPulse();
            Util.request('category.follow', {'slug': slug}).done(function(response){
                if (response.require_payment) {
                    new QRCodePayment(response.qrcode);
                    return;
                } else {
                    location.reload();
                }
            }).fail(function(response){
                Util.dialog.message(response.responseJSON.error).flash();
            }).always(() => {
                wait.close();
                buttonLock.release();
            });
        });
    })($);

})($);



/**
 * 添加文章
 */
const postBody = document.getElementById('post_originalBody');
const $postBody = $(postBody);
$postBody.length > 0 && (function($){
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
                uniqueId: 'post_' + md5(location.pathname),
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

    //添加文章验证
    $addPostForm.validate({
        rules: {
            'post[title]': {
                required: true,
                rangelength: [10,150]
            }
        },
        messages: {
            'post[title]': {
                required: "请输入用户名",
                rangelength: "文章标题长度在10到150位之间"
            },
        }
    });
})($);









