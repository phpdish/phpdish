'use strict';

import $ from 'jquery';
import marked from 'marked';
import TextComplete from 'textcomplete/lib/textcomplete';
import TextArea from 'textcomplete/lib/textarea';

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
    registerMention (users){
        this.textComplete.register([
            // {
            //     match: /(^|\s):(\w+)$/,
            //     search: function (term, callback) {
            //         callback(emojies.filter(emoji => { return emoji.startsWith(term); }));
            //     },
            //     replace: function (value) {
            //         return '$1:' + value + ': ';
            //     }
            // },
            {
                match: /\B@(\S*)$/,
                search: function(term, callback) {
                    callback(users.fiter((username)=> {
                        return username.startsWith(term)
                        || username.toLowerCase().startsWith(term.toLowerCase());
                    }));
                },
                index: 1,
                replace: function(mention) {
                    return "@${mention}";
                }
            }
        ]);
    }
}

export default MDEditor;