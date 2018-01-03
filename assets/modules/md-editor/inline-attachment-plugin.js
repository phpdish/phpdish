'use strict';

import InlineAttachment from '../inline-attachment.js';

export default function(element){
    // console.log(this);
    const inlineAttachment = new InlineAttachment(element || this.textarea, {
        onFileUploaded: (response) => {
            this.rePreview();
        }
    });
};