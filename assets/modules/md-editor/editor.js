'use strict';

import mention from './mention-plugin.js';
import emoji from './emoji-plugin.js';
import inlineAttachment from './inline-attachment-plugin.js';
import BaseEditor from './base-editor.js';

class Editor extends BaseEditor
{
    constructor($textarea, $preview, $previewContainer){
        super($textarea, $preview, $previewContainer);
        this.handleContentChange();
        this.enablePlugin();
    }

    getPlugins(){
        return [
            mention,
            emoji,
            inlineAttachment
        ];
    }

    handleContentChange() {
        this.textarea.on('keyup', () => {
            this.rePreview();
        });
    }

}

export default Editor;