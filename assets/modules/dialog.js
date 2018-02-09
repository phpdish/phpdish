'use strict';

import artDialog from 'art-dialog';
import 'art-dialog/css/dialog.css';
import _ from 'lodash';
import 'jquery-validation';
import util from './util.js';

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
 * 创建dialg
 * @param title
 * @param content
 * @param options
 * @returns {Dialog}
 */
export const create = (title, content, options) => {
    options = options || {};
    return new Dialog($.extend(options, {
        "title": title,
        "content": content
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

export const inputs = (title, inputs, validateOptions, options) => {
    options = options || {};
    const dialogFormId = '_dialog_form_' + util.generateMixed(10);
    let html = `<form id="${dialogFormId}">`;
    _.each(inputs, (input)=>{
        html += '<div class="form-group">'
            + (input.label ? `<label>${input.label}</label>` : '')
            + `<input class="form-control" type="text" value="${input.default || ''}" name="${input.name}" ${input.required ? "required=\"required\"" : ''}/>`
        + '</div>';
    });
    html += '</form>';
    return new Promise((resolve, reject)=>{

        const yes = function(){
            const $form = $('#' + dialogFormId);
            $form.validate(validateOptions || {});

            if (!$form.valid()) {
                return false;
            }
            let data = {};
            const array = $form.serializeArray();
            array.forEach((item)=>{
                data[item.name] = item.value;
            });
            resolve(data);
        };

        new Dialog(_.merge({
            title: title,
            content: html,
            ok: yes,
            cancel: reject,
            okValue: '是',
            cancelValue: '否'
        }, options));
    });

};

class Wait {
    constructor(){
        this.dialog =  null;
    }
    pacman(){
        const html =  '<div class="pacman"><div></div><div></div><div></div><div></div><div></div></div>';
        this.dialog = create(false, html);
        return this;
    }
    ballPulse(){
        const html =  '<div class="ball-pulse"><div></div><div></div><div></div></div>';
        this.dialog = create(false, html);
        return this;
    }
    close(){
        this.dialog && this.dialog.destroy();
    }
}
export const wait = new Wait();

export default Dialog;