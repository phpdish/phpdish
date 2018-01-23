import '../modules/common.js';
import hljs from 'highlight.js';
import SocialShare from 'social-share-button.js';
import NProgress from 'nprogress';
import 'jquery-pjax';
import AjaxTab from "../modules/ajaxtab";
import Util from "../modules/util";
import {FollowUserIntialization} from "../modules/actions";

//书籍阅读页面
const $bookDetail = $('[data-role="book-detail"]');
$bookDetail.length > 0 && (function($){
    const $bookSummary = $bookDetail.find('[data-role="summary"]');
    const $summaryToggleBtn = $bookDetail.find('[data-role="toggle-summary"]');
    $summaryToggleBtn.on('click', function(){
        $bookDetail.toggleClass('with-summary');
    });
    //分享
    new SocialShare($bookDetail.find('[data-role="social-share"]'), {
        'theme': 'dark-square',
        'facebook': false,
        'twitter': false
    });
    //代码高亮
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    (function($){
        const $document = $(document);
        const $characters = $bookSummary.find('li.chapter');
        $.pjax.defaults.timeout = 50000;
        $(document).pjax('ul.summary li a', '#pjax-container')
        $document.on('pjax:start', function() {
            NProgress.start();
        });
        $document.on('pjax:end', function(event) {
            if (event.relatedTarget) {
                const $relatedTarget = $(event.relatedTarget);
                $characters.removeClass('active');
                $relatedTarget.closest('.chapter').addClass('active');
            }
            NProgress.done();
        });
    })($);
})($);



//View Category
//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#list-container',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    },
    success: (container) => {
        new FollowUserIntialization(container);
    }
});