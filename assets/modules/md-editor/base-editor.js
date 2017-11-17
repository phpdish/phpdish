'use strict';

import $ from 'jquery';
import marked from 'marked';
import TextComplete from 'textcomplete/lib/textcomplete';
import TextArea from 'textcomplete/lib/textarea';
import emojione from 'emojione';
import twemoji from 'twemoji';

class BaseEditor
{
    constructor($textarea, $preview, $previewContainer){
        this.textarea = $textarea;
        this.preview = $preview;
        this.previewContainer = $previewContainer;
        this.textCompleteTextArea = new TextArea(this.textarea[0]);
        this.textComplete = new TextComplete(this.textCompleteTextArea);
        this.preview.on('click', () => {
            this.previewContainer.toggleClass('hidden');
        });
    }

    getPlugins(){
        return [];
    }

    rePreview(){
        this.previewContainer.html(this.getHtml() || '没有预览');
    }

    /**
     * 获取编辑器内容
     * @returns {*}
     */
    getContent(){
        return this.textarea.val();
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

    appendContent(content){
        this.setContent(this.getContent() + content);
        return this;
    }

    /**
     * 获取解析之后的html内容
     * @returns {*}
     */
    getHtml(){
        return twemoji.parse(
            emojione.shortnameToUnicode(
                marked(this.getContent())
            )
        );
    }

    /**
     * 启动插件
     */
    enablePlugin() {
        this.getPlugins().forEach(plugin => {
            let callback = plugin;
            if (typeof plugin === 'object') {
                callback = plugin.callback;
            }
            callback.call(this);
        });
        return this;
    }
}

export default BaseEditor;