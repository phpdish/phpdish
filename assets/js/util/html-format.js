'use strict';
require('module/common.js');

var beautify_html = require('js-beautify').html;

function HtmlFormat()
{
    var $srcCode = $('#src-code');
    var $targetCode = $('#target-code');
    var $preview  = $targetCode.find('[data-role="preview"]');
    var $indent  = $targetCode.find(['data-role="indent"']);
    //绑定 事件
    $srcCode.on('keyup', function(){
        var rawContent = $.trim($srcCode.val());
        var result = beautify_html(rawContent, {indent_size: 2, newline_between_rules: true});
        $preview.val(result);
    });
}
new HtmlFormat();