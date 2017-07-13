'use strict';
var util = require('./util.js');
var Jcrop = require('plugin/Jcrop/js/jquery.Jcrop.min.js');
require('plugin/Jcrop/css/jquery.Jcrop.min.css');

var dmuploader  = require('plugin/uploader/src/dmuploader.min.js');

function processUploadImage($fileUploadArea, successCallback, errorCallback){
    //ajax上传
    var uploadedFileNumber = 0;
    var index = 0;
    $fileUploadArea.dmUploader({
        url: "/attachments/add",
        dataType: 'json',
        allowedTypes: 'image/*',
        fileName: 'upfile',
        onBeforeUpload: function(id){
            index = util.dialog.wait();
        },
        onUploadSuccess: function (id, data) {
            util.dialog.close(index);
            successCallback(data);
        },
        onUploadError: function (id, message) {
            util.dialog.alert(message);
            typeof errorCallback == 'function' && errorCallback(data);
        },
        onComplete: function(){
            util.dialog.close(index);
        },
        onFallbackMode: function(message){
            alert('Browser not supported(do something else here!): ' + message);
        }
    });
}


function Avatar($fileUploadArea, $avatarCropArea, $parameterForm, $save, $cancel)
{
    var $path = $parameterForm.find('[data-role="path"]');
    var $sizeX = $parameterForm.find('[data-role="size-x"]');
    var $sizeY = $parameterForm.find('[data-role="size-y"]');
    var $sizeWidth = $parameterForm.find('[data-role="size-width"]');
    var $sizeHeight = $parameterForm.find('[data-role="size-height"]');

    //记录参数
    function recordParameters(c) {
        $sizeX.val(c.x);
        $sizeY.val(c.y);
        $sizeWidth.val(c.w);
        $sizeHeight.val(c.h);
    }
    //Jcrop
    var jcrop;
    processUploadImage($fileUploadArea, function(data){
        console.log(data);
        $avatarCropArea.attr('src', data.url).show();
        $path.val(data.imagePath);
        $save.show();
        $cancel.show();
        $avatarCropArea.Jcrop({
            onSelect: recordParameters,
            onChange: recordParameters,
            onRelease: function(){recordParameters({x:0, y:0, w:0, h:0})},
            aspectRatio: 1
        }, function(){
            jcrop = this;
            console.log(jcrop);
        });
    });
    //绑定事件
    this.bindEvent = function(){
        //取消释放
        $cancel.on('click', function(){
            if(typeof jcrop == 'object'){
                jcrop.release();
            }
        });
        $save.on('click', function(){
            if($path.val()== '' || $sizeX.val()=='' || $sizeY.val()=='' || $sizeWidth.val() == '' || $sizeHeight.val() == ''){
                util.dialog.alert('请选中一块区域');
                return false;
            }
            if($save._lock){
                return false;
            }
            $save._lock = true;
            util.request('user.changeAvatar', {}, $parameterForm.serialize(), {success: function(response){
                if(response.code == 0){
                    util.dialog.msg(response.message);
                    setTimeout(function(){
                        location.reload();
                    }, 2000);
                } else {
                    util.dialog.alert(response.message);
                }
                $save._lock = false;
            }});
        })
    };

    this.bindEvent();
}

module.exports = Avatar;