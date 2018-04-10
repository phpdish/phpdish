'use strict';

import plupload from 'plupload';
import $ from 'jquery';
import Util from './util.js';

class UploadFile{
    constructor(selectorId, options){

        this.selectorId = selectorId;
        this.options = $.extend({
            headers: {

            },
            onUploaded: (response, file) => {
            },
            onError: (error) => {
                Util.dialog.message(error.code + ": " + error.message + '; ' + Translator.trans('upload.try_again_after_refresh'))
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
                    {title : Translator.trans('upload.try_again_after_refresh'), extensions : "jpg,gif,png"}
                ]
            },
            headers: this.options.headers,
            init: {
                FilesAdded: function(uploader) {
                    uploader.start();
                },
                FileUploaded: (uploader, file, result) => {
                    this.options.onUploaded(result, file);
                },
                Error: (uploader, error) => {
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

export default UploadFile;