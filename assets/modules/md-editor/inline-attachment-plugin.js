'use strict';

import InlineAttachment from '../inline-attachment.js';

export default function(element){
    new InlineAttachment(element || this.textarea);
};