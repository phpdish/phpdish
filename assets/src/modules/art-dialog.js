'use strict';

function createDialog(options) {
    return artDialog(options);
}

function Dialog()
{
    var _this = this;

    /**
     * 提示层
     * @param message
     * @param options
     */
    this.msg = function(message, options){
        options = _.merge({
            timeout: 3,
            content: message
        }, options);
        var dialog = createDialog(options).show();
        if (options.timeout) {
            setTimeout(function(){
                dialog.close();
            }, options.timeout * 1000);
        }
        return dialog;
    };
    /**
     * 提示，手动确认
     * @param message
     * @param options
     * @returns {*}
     */
    this.alert = function(message, options){
        options = _.merge({
            title: "提示",
            okValue: '确定',
            content: message
        }, options);
        return createDialog(options).show();
    };

    /**
     * 询问层
     * @param message
     * @param yes
     * @param cancel
     * @param options
     * @returns {*}
     */
    this.confirm = function(message, yes, cancel, options){
        options = _.merge({
            title: "确认",
            okValue: '确定',
            cancelValue: '取消',
            "ok": function(){
                if (typeof yes == 'function') {
                    return yes.call(this, this);
                }
            },
            "cancel": function(){
                if (typeof cancel == 'function') {
                    return cancel.call(this, this);
                }
            },
            content: message
        }, options);
        return createDialog(options).show();
    };

    /**
     * 等待
     * @returns {*}
     */
    this.wait = function(){
        var options = _.merge({
        });
        return createDialog(options).show();
    };

    /**
     * 创建dialog
     * @param title
     * @param content
     * @param yes
     * @param cancel
     * @param options
     * @returns {*}
     */
    this.create = function(title, content, yes, cancel, options){
        options = _.merge({
            "title": title,
            okValue: '确定',
            "ok": function(){
                if (typeof yes == 'function') {
                    return yes.call(this, this);
                }
            },
            "cancel": function(){
                if (typeof cancel == 'function') {
                    return cancel.call(this, this);
                }
            },
            cancelValue:'取消',
            "content": content
        }, options);
        return createDialog(options).show();
    };
}

module.exports = Dialog;