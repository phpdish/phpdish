'use strict';

import '../modules/common.js';
import 'jquery-validation';
import UploadFile from '../modules/upload-file.js';
import Util from '../modules/util.js';

//上传 头像
(function(){

    const $changeProfileForm = $('#change-profile-form');

    if ($changeProfileForm.length > 0)  {
        const $uploadCover = $('#upload-cover');
        const $avatar =$('#change_user_profile_avatar');
        if ($uploadCover.length > 0) {
            const $previewImage = $uploadCover.find('[data-role="preview"]');
            new UploadFile('pick-image', {
                onUploaded: (result) => {
                    if (result.status === 200) {
                        const response = $.parseJSON(result.response);
                        $uploadCover.addClass('uploaded');
                        $avatar.val(response.key);
                        $previewImage.attr('src', response.thumb);
                    } else {
                        Util.dialog.message(result.response.message || Translator.trans('ui.server_error'));
                    }
                },
                headers: {
                    'media_mapping': 'avatar'
                }
            });
        }
        $changeProfileForm.validate({
            submitHandler: () => {
                if ($avatar.val().length === 0) {
                    Util.dialog.message(Translator.trans('setting.validation.avatar')).flash();
                    return false;
                }
                return true;
            },
            messages: {
                'change_user_profile[email]': {
                    required: Translator.trans('setting.validation.email')
                },
                'change_user_profile[gender]': {
                    required: Translator.trans('setting.validation.gender')
                },
                'change_user_profile[description]': {
                    required:Translator.trans('setting.validation.description')
                }
            }
        });
    }

})($);