'use strict';
require('module/common.js');

var parseJson = require('parse-json');
var JSONFormat = require('plugin/json-utils/json-format.js');
var Clipboard = require('clipboard');
var json2xml = require('plugin/json2xml/json2xml.js');
require('plugin/jquery-numberedtextarea/jquery.numberedtextarea.js');
require('plugin/json-utils/jquery.json2xml.js');

function JsonFormat()
{
    var $srcJson = $('#json-src');
    var $targetJson = $('#json-target');
    var $moreAction = $('#more-action');
    var $previewArea = $targetJson.find('[data-role="preview-area"]');

    var $copyToClipboard = $moreAction.find('[data-role="copy-clipboard"]');
    var $compressJson = $moreAction.find('[data-role="compress-json"]');
    var $clearJson = $moreAction.find('[data-role="clear"]');
    var $convertToXml = $moreAction.find('[data-role="to-xml"]');

    var validJson;
    var validJsonString; //正常压缩的json
    var processedResult; //格式化之后的结果,最终被复制的

    this.bindEvents = function(){
        //设置内容
        $srcJson.on('keyup', function(){
            var rawJsonContent = $.trim($srcJson.val());
            var prettyHtml;
            try{
                validJson = parseJson(rawJsonContent);
                validJsonString = JSON.stringify(validJson);
                processedResult = JSON.stringify(validJson, null, 4);
                prettyHtml = new JSONFormat(validJsonString, 4).toString();
            } catch (e) {
                var errorMessage = e.toString();
                prettyHtml = "<pre class='alert alert-danger'>"+errorMessage+"</pre>";
            }
            $previewArea.html(prettyHtml);
        });

        //压缩json字符串
        $compressJson.on('click', function () {
            processedResult = validJsonString;
            $previewArea.html(validJsonString);
        });

        //转换成xml
        $convertToXml.on('click', function(){
            var xmlString = $.json2xml(validJson);
            processedResult = xmlString;
            $previewArea.html('<textarea class="form-control pretty-xml">'+xmlString+'</textarea>');
        });

        //清空
        $clearJson.on('click', function(){
            $srcJson.val('');
            $previewArea.html('');
        });

        //设置粘贴板
        new Clipboard('[data-role="copy-clipboard"]', {
            text: function(){
                if(processedResult){
                    return processedResult;
                }
            }
        });
    };

    this.init = function()
    {
        $('textarea').numberedtextarea();
        this.bindEvents();
        $srcJson.trigger('keyup');
    };
    this.init();
}
new JsonFormat();