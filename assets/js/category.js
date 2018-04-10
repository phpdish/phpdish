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
                    Util.dialog.message(result.response.message || Translator.trans('ui.server_error'));
                }
            }
        });
    }

    $addCategoryForm.validate({
        submitHandler: () => {
            if ($categoryCover.val().length === 0) {
                Util.dialog.message(Translator.trans('category.upload_cover')).flash();
                return false;
            }
            if ($charge.val().length === 0) {
                Util.dialog.message(Translator.trans('category.please_choose_price')).flash();
                return false;
            }
            return true;
        },
        messages: {
            'category[name]': {
                required: Translator.trans('category.validation.name')
            },
            'category[description]': {
                required: Translator.trans('category.validation.description')
            },
            'category[slug]': {
                required: Translator.trans('category.validation.slug')
            },
            'book[name]': {
                required: Translator.trans('book.validation.name')
            },
            'book[description]': {
                required: Translator.trans('book.validation.description')
            },
            'book[slug]': {
                required: Translator.trans('book.validation.slug')
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

    //编辑状态下，设置订阅价的状态
    if ($charge.val() > 0) {
        const charge =  $charge.val();
        const $targetNode = $chooseCharge.find(`[data-num="${charge}"]`);
        if ($targetNode.length > 0) {
            $targetNode.siblings('.btn').removeClass('u-btn-primary').end().addClass('u-btn-primary');
        } else {
            $chooseCharge.find(':input').val(parseFloat(charge / 100).toFixed(2));
        }
    }
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
