'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';
import {editor} from '../modules/blocks/reply';

import lockButton from '../modules/button-lock.js';


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










