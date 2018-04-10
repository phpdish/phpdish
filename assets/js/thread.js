'use strict';

import '../modules/common.js';
import 'jquery-validation';
import UploadFile from '../modules/upload-file.js';
import Util from '../modules/util.js';
import AjaxTab from '../modules/ajaxtab.js';
import {FollowUserIntialization} from '../modules/actions.js';

//上传 封面
(function(){
    const $uploadCover = $('#upload-cover');
    const $threadCover =$('#thread_cover');
    if ($uploadCover.length > 0) {
        const $previewImage = $uploadCover.find('[data-role="preview"]');
        new UploadFile('pick-image', {
            onUploaded: (result) => {
                if (result.status === 200) {
                    const response = $.parseJSON(result.response);
                    $uploadCover.addClass('uploaded');
                    $threadCover.val(response.key);
                    $previewImage.attr('src', response.path);
                } else {
                    Util.dialog.message(result.response.message || Translator.trans('ui.server_error'));
                }
            }
        });
    }
    $('#add-thread-form').validate({
        submitHandler: () => {
            if ($threadCover.val().length === 0) {
                Util.dialog.message(Translator.trans('thread.validation.cover')).flash();
                return false;
            }
            return true;
        },
        messages: {
            'thread[name]': {
                required: Translator.trans('thread.validation.name')
            },
            'thread[description]': {
                required: Translator.trans('thread.validation.description')
            },
            'thread[slug]': {
                required: Translator.trans('thread.validation.slug')
            }
        }
    });
})($);

//View thread
//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#list-container',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    },
    success: (container) => {
        new FollowUserIntialization(container);
    }
});
