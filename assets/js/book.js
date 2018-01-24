import '../modules/common.js';
import hljs from 'highlight.js';
import SocialShare from 'social-share-button.js';
import NProgress from 'nprogress';
import 'jquery-pjax';
import AjaxTab from "../modules/ajaxtab";
import Util from "../modules/util";
import {FollowUserIntialization} from "../modules/actions";
import lockButton from '../modules/button-lock.js';

//书籍详情页面
const $bookDetails = $('#book-details');

(function(){
    const $addChapter = $bookDetails.find('[data-role="add-chapter"]');
    const btnLock = lockButton($addChapter);
    $addChapter.on('click', function(){
        if (btnLock.isDisabled()) {
            return false;
        }
        btnLock.lock();
        Util.dialog.inputs('章节名称', [{name: 'title', required: true}], {
            messages: {
                title: {
                    "required": "请输入章节标题"
                }
            }
        }, {
            'okValue': '创建',
            'cancelValue': '取消'
        }).then((data)=>{
            console.log(data);
            Util.request('book.add_chapter', {slug: window.book.slug}, data).done(()=>{
                location.reload();
            }).fail(()=>{
                Util.dialog.message('创建章节失败').flash();
            });
            btnLock.release();
        }, ()=>{
            btnLock.release();
        });
    });
})($);

//书籍阅读页面
const $bookView = $('[data-role="book-view"]');
$bookView.length > 0 && (function($){
    const $bookSummary = $bookView.find('[data-role="summary"]');
    const $summaryToggleBtn = $bookView.find('[data-role="toggle-summary"]');
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



//View Book
//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#book-details',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    },
    success: (container) => {
        new FollowUserIntialization(container);
    }
});