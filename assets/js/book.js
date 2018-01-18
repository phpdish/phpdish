import '../modules/common.js';
import hljs from 'highlight.js';
import SocialShare from 'social-share-button.js';

(function($) {
    //代码高亮
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
})($);

(function($){
    const $bookDetail = $('[data-role="book-detail"]');
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
})($);

(function($){
    const SITES = {
        'google': {
            'label': 'Google+',
            'icon': 'fa fa-google-plus',
            'onClick': function(e) {
                e.preventDefault();
                window.open("https://plus.google.com/share?url="+encodeURIComponent(location.href));
            }
        },
        'weibo': {
            'label': 'Weibo',
            'icon': 'fa fa-weibo',
            'onClick': function(e) {
                e.preventDefault();
                window.open("http://service.weibo.com/share/share.php?content=utf-8&url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title));
            }
        },
    };
})($);

