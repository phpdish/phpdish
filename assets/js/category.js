'use strict';

import '../modules/common.js';
import 'jquery-validation';
import UploadFile from '../modules/upload-file.js';

//上传 封面
(function(){
    const $uploadCover = $('#upload-cover');
    if ($uploadCover.length > 0) {
        const $previewImage = $uploadCover.find('[data-role="preview"]');
        const $categoryCover =$('#category_cover');
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