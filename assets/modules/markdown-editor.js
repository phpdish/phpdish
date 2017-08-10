'use strict';

const SimpleMDE  = require('simplemde');
import 'simplemde/dist/simplemde.min.css';

function MarkdownEditor($element, options)
{
    console.log($element);
    options = $.extend(options, {
        element: document.getElementById('editor')
    });
    const editor = new SimpleMDE(options);
    this.getRawEditor = function(){
        return editor;
    };
    this.getContent = function(){
        return editor.value();
    };

    this.setContent = function(content){
        editor.value(content);
    };
}

export default MarkdownEditor;
