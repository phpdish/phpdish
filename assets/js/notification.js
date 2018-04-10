'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';

(function(){
    const $messageBody = $('#message_body');
    $('#reply-chat-form').on('submit', () => {
        if ($messageBody.val().length === 0) {
            Util.dialog.message(Translator.trans('notification.reply_content_cannot_be_empty')).flash();
            return false;
        }
    });
})($);