'use strict';

import '../modules/common.js';
import plupload from 'plupload';
import $ from 'jquery';
import Util from '../modules/util.js';

class UploadFile{
    constructor($selector, buttonId){
        this.selector = $selector;
        const uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : buttonId, // you can pass an id...
            container: $selector[0], //
            url : 'upload.php',

            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png"},
                ]
            },
            init: {
                PostInit: function() {
                },
                FilesAdded: function(uploader, files) {
                    uploader.start();
                },
                UploadProgress: function(uploader, file) {
                },
                Error: function(uploader, error) {
                    Util.dialog.message(error.code + ": " + error.message + '; 请刷新后重试')
                }
            }
        });
        uploader.init();
    }
}

new UploadFile($('#category_cover'), 'pick-image');