'use strict';

import artDialog from 'art-dialog';
import 'art-dialog/css/dialog.css';

function Dialog(options){
    options = options || {};

    const dialog = artDialog(options);

    let onEndCallback;

    /**
     * 闪现，定时关闭
     * @param seconds
     * @param callback
     */
    this.flash = function(seconds, callback){
        if (typeof seconds === 'function') {
            callback = seconds;
            seconds = 3;
        }
        seconds = seconds || 3;
        setTimeout(() => this.destroy(callback), seconds * 1000);
    };

    /**
     * 销毁对话框
     */
    this.destroy = function(callback){
        dialog.remove();
        typeof callback === 'function' && callback.call(this);
        typeof onEndCallback === 'function' && onEndCallback.call(this);
    };

    /**
     * 关闭不销毁
     */
    this.close = function(callback){
        dialog.close();
        typeof callback === 'function' && callback.call(this);
    };

    this.show = function(){
        dialog.show();
    };

    /**
     * 注册弹窗关闭时回调
     * @param callback
     */
    this.onEnd = function(callback){
        onEndCallback = callback;
    };

    this.show();
}

/**
 * 消息提示框
 * @param message
 * @param options
 * @returns {Dialog}
 */
export const message = function(message, options){
    options = options || {};
    return new Dialog($.extend(options, {
        content: message
    }));
};

/**
 * 确认框
 * @param message
 * @param options
 * @returns {Promise}
 */
export const confirm = (message, options) => {
    options = options || {};
    return new Promise((resolve, reject) => {
        new Dialog($.extend({
            title: '确认？',
            ok: resolve,
            cancel: reject,
            okValue: '是',
            cancelValue: '否'
        }, options, {
            content: message,
        }));
    });
};

export default Dialog;