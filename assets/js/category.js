'use strict';

import '../modules/common.js';
import plupload from 'plupload';
import $ from 'jquery';
import Util from '../modules/util.js';

class UploadFile{
    constructor(selectorId, options){

        this.selectorId = selectorId;
        this.options = $.extend({
            onUploaded: (response, file) => {
            },
            onError: (error) => {
                Util.dialog.message(error.code + ": " + error.message + '; 请刷新后重试')
            }
        }, options);

        this.uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : selectorId,
            url : Util.route.getRoutePath('upload'),
            file_data_name: 'file',
            filters : {
                max_file_size : '2mb',
                mime_types: [
                    {title : "图片文件", extensions : "jpg,gif,png"},
                ]
            },
            init: {
                FilesAdded: function(uploader) {
                    uploader.start();
                },
                FileUploaded: (uploader, file, result) => {
                    this.options.onUploaded(result, file);
                },
                Error: function(uploader, error) {
                    this.options.onError(error);
                }
            }
        });
        this.uploader.init();
    }

    getUploader(){
        return this.uploader;
    }
}


(function(){
    const $uploadCover = $('#upload-cover');
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


})($);


// new UploadFile($('#category_cover'), 'pick-image');