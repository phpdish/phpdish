'use strict';
require('module/common.js');

var beautify_css = require('js-beautify').css;
var CssFormatProcessor = require('module/css-format.js');
var Clipboard = require('clipboard');

function CssFormat()
{
    var _this = this;

    var $srcPanel = $('#src-panel');
    var $targetPanel = $('#target-panel');
    var $srcCode = $srcPanel.find('[data-role="src-code"]');
    var $preview  = $targetPanel.find('[data-role="preview"]');

    var $moreAction = $('#more-action');
    var $copyToClipboard = $moreAction.find('[data-role="copy-clipboard"]');
    var $compress = $moreAction.find('[data-role="compress"]');
    var $clear = $moreAction.find('[data-role="clear"]');
    //是否完全压缩
    var $isFullyCompress = $moreAction.find('[data-role="fully-comporess"]');

    /**
     * 格式化代码
     * @param rawCode
     * @returns {*}
     */
    this.format = function(rawCode){
        return beautify_css(rawCode, {indent_size: 2, newline_between_rules: true});
    };

    /**
     * 压缩代码
     * @param rawCode
     * @param lineMode
     * @returns {*}
     */
    this.compress = function(rawCode, lineMode){
        return lineMode ? CssFormatProcessor.compressToMultiLine(rawCode) : CssFormatProcessor.compress(rawCode);
    };

    //预览代码
    function preview(code){
        $preview.val(result);
    }

    //绑定 事件
    function bindEvents(){
        //键盘输入
        $srcCode.on('keyup', function(){
            var rawContent = $.trim($srcCode.val());
            preview(_this.format(rawContent));
        });

        //清空
        $clear.on('click', function(){
            $srcCode.val('');
            $preview.val('');
        });

        //压缩
        $compress.on('click', function(){
            var rawContent = $.trim($srcCode.val());
            preview(_this.compress(rawContent, $isFullyCompress.is(':checked')));
        });

        //设置粘贴板
        new Clipboard($copyToClipboard, {
            text: function(){
                return $preview.val();
            }
        });
    }

    function init(){
        bindEvents();
    }
}
new CssFormat();