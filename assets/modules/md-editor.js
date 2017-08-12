'use strict';

import $ from 'jquery';
import marked from 'marked';

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

    getHtml(){
        return marked(this.getContent());
    }
}

export default MDEditor;