import '../modules/common.js';
import hljs from 'highlight.js';

(function($) {
    //代码高亮
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
})($);

(function($){
    const $bookDetail = $('[data-role="book-detail"]');
    const $summaryToggleBtn = $bookDetail.find('.js-toolbar-action');
    $summaryToggleBtn.on('click', function(){
        $bookDetail.toggleClass('with-summary');
    });
})($);