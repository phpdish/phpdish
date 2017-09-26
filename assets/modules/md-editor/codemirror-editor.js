'use strict';

import BaseEditor from './base-editor.js';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import draft from './draft-plugin.js';
import mention from './mention-plugin.js';
import emoji from './emoji-plugin.js';
import inlineAttachment from './inline-attachment-plugin.js';

class CodeMirrorEditor extends BaseEditor {
    constructor($textarea, $preview, $previewContainer) {
        super($textarea, $preview, $previewContainer);
        this.codeMirrorEditor = CodeMirror.fromTextArea($textarea[0], {
            mode: 'markdown',
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            // theme: 'yeti'
        });
        this.handleContentChange();
        this.enablePlugin();
    }

    getContent(){
        return this.codeMirrorEditor.getValue();
    }

    setContent(content){
        this.codeMirrorEditor.setValue(content);
    }
    handleContentChange() {
        this.codeMirrorEditor.on('change', () => {
            let html = this.getHtml();
            this.previewContainer.html(html || '没有预览');
        });
    }

    getPlugins(){
        return [
            () => {
                inlineAttachment(this.codeMirrorEditor);
            },
            () => {
                draft.call(this, {
                    key: 'topic_draft'
                });
            }
        ];
    }
}

export default CodeMirrorEditor;