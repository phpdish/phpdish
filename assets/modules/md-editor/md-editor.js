'use strict';

import $ from 'jquery';
import marked from 'marked';
import TextComplete from 'textcomplete/lib/textcomplete';
import TextArea from 'textcomplete/lib/textarea';
import mention from './mention-plugin.js';
import githubEmojiPlugin from './github-emoji-plugin.js';

class MDEditor
{
    constructor($element){
        const $actionTabs = $element.find('[role="tablist"]');
        this.tabs = {
            write: $actionTabs.first(),
            preview: $actionTabs.last()
        };
        this.editorTextElement = $element.find('[role="md-editor-write"]');
        this.previewElement = $element.find('[role="md-editor-preview"]');
        this.textCompleteTextArea = new TextArea(this.editorTextElement[0]);
        this.textComplete = new TextComplete(this.textCompleteTextArea);
        this.plugins = [];
        this.prepareUi();
    }

    prepareUi() {
        this.tabs.preview.on('click', () => {
            let html = this.getHtml();
            this.previewElement.html  (html || '没有预览');
        });
    }

    /**
     * 获取编辑器内容
     * @returns {*}
     */
    getContent(){
        return $.trim(this.editorTextElement.val());
    }

    /**
     * 设置内容
     * @param content
     * @returns {MDEditor}
     */
    setContent(content){
        this.editorTextElement.val(content);
        return this;
    }

    append(content){
        this.setContent(this.getContent() + content);
        return this;
    }

    prepend(content){
        this.setContent(content + this.getContent());
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
     * 注册插件
     * @param plugin
     */
    registerPlugin(plugin) {
        this.plugins.push(plugin);
        return this;
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

    /**
     * 注册@功能
     */
    registerMention (){
        this.registerPlugin(mention);
        return this;
    };

    registerGithubEmoji(){
        this.registerPlugin(githubEmojiPlugin);
        return this;
    }
}

export default MDEditor;