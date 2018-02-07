'use strict';

import '../modules/common.js';
import 'jquery-validation';
import UploadFile from '../modules/upload-file.js';
import Util from '../modules/util.js';
import AjaxTab from '../modules/ajaxtab.js';
import {FollowUserIntialization} from '../modules/actions.js';

//添加专栏
const $addCategoryForm = $('#add-category-form');
$addCategoryForm.length > 0 && (function(){
    const $uploadCover = $('#upload-cover');
    const $chooseCharge = $addCategoryForm.find('[data-role="choose-charge"]');
    const $charge = $addCategoryForm.find('[data-role="charge"]');
    let $categoryCover = $('#category_cover');
    if ($categoryCover.length === 0) {
        $categoryCover = $('#book_cover');
    }
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
    $addCategoryForm.validate({
        submitHandler: () => {
            if ($categoryCover.val().length === 0) {
                Util.dialog.message('请上传封面').flash();
                return false;
            }
            if ($charge.val().length === 0) {
                Util.dialog.message('请选择订阅价格').flash();
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
            },
            'book[name]': {
                required: '请输入书籍名称'
            },
            'book[description]': {
                required: '请输入书籍介绍'
            },
            'book[slug]': {
                required: '请输入个性域名'
            }
        }
    });

    $chooseCharge.on('click', '.btn', function(){
        const $this = $(this);
        $this.siblings('.btn').removeClass('u-btn-primary').end().addClass('u-btn-primary');
        $charge.val($this.data('num'));
    });
    $chooseCharge.find(':input').on('blur', function(){
        
        $chooseCharge.find('.btn').removeClass('u-btn-primary'); //移除之前的选择
        const $this = $(this);
        const num = $.trim($this.val());
        if (num) {
            $charge.val(num * 100);
        } else {
            $charge.val(null);
        }
    });
})($);


//View Category
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
