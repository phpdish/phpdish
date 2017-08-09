'use strict';

var layer = require('art-dialog');

function Dialog()
{
    var _this = this;
    this.layer = layer;
    this.open = function(options){
        options = _.merge({
            type: 3
        }, options);
        return layer.open(options);
    };

    /**
     * 提示层
     * @param message
     */
    this.msg = function(message){
        return layer.msg(message);
    };
    this.alert = function(content, options, yes){
        return layer.alert(content, options, yes);
    };
    /**
     * 询问层
     * @param content
     * @param options
     * @param yes
     * @param cancel
     * @returns {*}
     */
    this.confirm = function(content, options, yes, cancel){
        return layer.confirm(content, options, yes, cancel);
    };

    /**
     * 等待
     * @returns {*}
     */
    this.wait = function(){
        return this.layer.load(1);
    };
    /**
     * 关闭dialog
     * @param index
     */
    this.close = function(index){
        index ? this.layer.close(index) : this.layer.closeAll();
    };
}

module.exports = Dialog;