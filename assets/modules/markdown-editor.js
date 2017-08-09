'use strict';

import SimpleMDE  from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

function MarkdownEditor($element, options)
{
    options = $.extend(options, {
        element: $element[0]
    });
    const editor = new SimpleMDE(options);
}

export default MarkdownEditor;
