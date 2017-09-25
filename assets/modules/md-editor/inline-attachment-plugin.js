'use strict';

import InlineAttachment from '../inline-attachment.js';

export default function(){
    console.log(this.textarea);
    new InlineAttachment(this.textarea);
};