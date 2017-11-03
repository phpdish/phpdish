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
                        Util.dialog.message(result.response.message || '服务器错误，请刷新后重试');
                    }
                },
                headers: {
                    'Upload_Avatar': true
                }
            });
        }
        $changeProfileForm.validate({
            submitHandler: () => {
                if ($avatar.val().length === 0) {
                    Util.dialog.message('请设置你的头像').flash();
                    return false;
                }
                return true;
            },
            messages: {
                'change_user_profile[email]': {
                    required: '请填写邮箱'
                },
                'change_user_profile[gender]': {
                    required: '请选择您的性别'
                }
            }
        });
    }

})($);