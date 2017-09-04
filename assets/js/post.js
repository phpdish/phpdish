'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';
import {editor} from '../modules/blocks/reply';
import lockButton from '../modules/button-lock.js';

import SimpleMDE from 'simplemde';

/**
 * Post Details
 */
$('#add-reply-form').on('submit', function(){
    const $form = $(this);
    const $btn = $form.find('[data-role="submit" ]');
    const csrfToken = $('#comment__token').val();
    const body = editor.getContent();
    if (body.length === 0) {
        return false;
    }
    const buttonLock = lockButton($btn).text('提交中');
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

/**
 * 添加文章
 */
(function($){
    const postBody = document.getElementById('post_originalBody');
    const $postBody = $(postBody);
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
    }
})($);









