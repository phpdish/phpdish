`use strict`;

import 'inline-attachment/src/inline-attachment.js'
import 'inline-attachment/src/jquery.inline-attachment.js'
import 'inline-attachment/src/codemirror-4.inline-attachment.js'
import $ from 'jquery';
import Util from  './util.js';

class InlineAttachment
{
    constructor(element, options){
        options = $.extend({
            uploadUrl: Util.route.getRoutePath('upload'),
            jsonFieldName: 'path',
        }, options);
        if (element instanceof $) {
            element.inlineattachment(options);
        } else {
            inlineAttachment.editors.codemirror4.attach(element, options);
        }
    }
}

export default InlineAttachment;