'use strict';

import $ from 'jquery';
import marked from 'marked';
import TextComplete from 'textcomplete/lib/textcomplete';
import TextArea from 'textcomplete/lib/textarea';
import mention from './mention-plugin.js';
import emoji from './emoji-plugin.js';
import inlineAttachment from './inline-attachment-plugin.js';

class Editor
{
    constructor($textarea, $preview, $previewContainer){
        this.textarea = $textarea;
        this.preview = $preview;
        this.previewContainer = $previewContainer;

        this.textCompleteTextArea = new TextArea(this.textarea[0]);
        this.textComplete = new TextComplete(this.textCompleteTextArea);
        this.plugins = [
            mention,
            emoji,
            inlineAttachment
        ];
        this.prepareUi();
        this.enablePlugin();
    }

    prepareUi() {
        this.preview.on('click', () => {
            this.previewContainer.toggleClass('hidden');
        });

        this.textarea.on('click', () => {
            let html = this.getHtml();
            this.previewContainer.html(html || '没有预览');
        });
    }

    /**
     * 获取编辑器内容
     * @returns {*}
     */
    getContent(){
        return $.trim(this.textarea.val());
    }

    /**
     * 设置内容
     * @param content
     * @returns {MDEditor}
     */
    setContent(content){
        this.textarea.val(content);
        return this;
    }

    /**
     * 获取解析之后的html内容
     * @returns {*}
     */
    getHtml(){
        return marked(this.getContent());
    }

    /**
     * 启动插件
     */
    enablePlugin() {
        this.plugins.forEach(plugin => {
            let callback = plugin;
            if (typeof plugin === 'object') {
                callback = plugin.callback;
            }
            callback.call(this);
        });
        return this;
    }
}

export default Editor;