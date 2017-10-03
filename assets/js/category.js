'use strict';

import '../modules/common.js';
import 'jquery-validation';
import UploadFile from '../modules/upload-file.js';
import Util from '../modules/util.js';

//上传 封面
(function(){
    const $uploadCover = $('#upload-cover');
    const $categoryCover =$('#category_cover');
    if ($uploadCover.length > 0) {
        const $previewImage = $uploadCover.find('[data-role="preview"]');
        new UploadFile('pick-image', {
            onUploaded: (result) => {
                if (result.status === 200) {
                    const response = $.parseJSON(result.response);
                    $uploadCover.addClass('uploaded');
                    $categoryCover.val(response.key);
                    $previewImage.attr('src', response.path);
                } else {
                    Util.dialog.message(result.response.message || '服务器错误，请刷新后重试');
                }
            }
        });
    }
    $('#add-category-form').validate({
        submitHandler: () => {
            if ($categoryCover.val().length === 0) {
                Util.dialog.message('请为你的专栏上传封面').flash();
                return false;
            }
            return true;
        },
        messages: {
            'category[name]': {
                required: '请输入专栏标题'
            },
            'category[description]': {
                required: '请输入专栏介绍'
            },
            'category[slug]': {
                required: '请输入个性域名'
            }
        }
    });
})($);