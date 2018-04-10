import '../modules/common.js';
import hljs from 'highlight.js';
import SocialShare from 'social-share-button.js';
import NProgress from 'nprogress';
import 'jquery-pjax';
import AjaxTab from "../modules/ajaxtab";
import Util from "../modules/util";
import {FollowUserIntialization} from "../modules/actions";
import lockButton from '../modules/button-lock.js';
import InlineAttachment from "../modules/inline-attachment";
import SimpleMDE from "simplemde";
import QRCodePayment from "../modules/qrcode-payment";
import md5 from 'blueimp-md5';

//电子书详情页面
const $bookDetails = $('#book-details');
$bookDetails.length > 0 && (function($){
    new AjaxTab($('[data-pjax-container]'), {
        container: '#book-details',
        loader: '#loader',
        before: (container) => {
            Util.htmlPlaceholder(container);
        },
        success: (container) => {
            new FollowUserIntialization(container);
            initBookSummary();
        }
    });
    function initBookSummary(){
        const $addChapter = $bookDetails.find('[data-role="add-chapter"]');
        const btnLock = lockButton($addChapter);
        $addChapter.on('click', function(){
            if (btnLock.isDisabled()) {
                return false;
            }
            btnLock.lock();
            Util.dialog.inputs(Translator.trans('book.chapter_name'), [{name: 'title', required: true}], {
                messages: {
                    title: {
                        "required": Translator.trans('book.required_chapter_name')
                    }
                }
            }, {
                'okValue': Translator.trans('ui.create'),
                'cancelValue': Translator.trans('ui.cancel'),
                width: 350
            }).then((data)=>{
                console.log(data);
                Util.request('book.add_summary', {slug: window.book.slug}, data).done(()=>{
                    location.reload();
                }).fail(()=>{
                    Util.dialog.message(Translator.trans('book.create_chapter_error')).flash();
                });
                btnLock.release();
            }, ()=>{
                btnLock.release();
            });
        });
        //处理action
        const $bookChapters = $bookDetails.find('[data-role="chapter"]');
        $bookChapters.each(function(){
            const $this = $(this);
            const $edit = $this.find('[data-role="edit"]');
            const $addSub = $this.find('[data-role="add-sub"]');
            const $delete = $this.find('[data-role="delete"]');
            const $move = $this.find('[data-role="move"]');

            $edit.on('click', function(){
                Util.dialog.inputs(Translator.trans('book.chapter_name'), [{
                    name: 'title',
                    default: $this.data('title'),
                    required: true
                }], {
                    messages: {
                        title: {
                            "required": Translator.trans('book.required_chapter_name')
                        }
                    }
                }, {
                    'okValue': Translator.trans('ui.create'),
                    'cancelValue': Translator.trans('ui.cancel'),
                    width: 350
                }).then((data)=>{
                    Util.request('book.edit_summary', {slug: window.book.slug, id: $this.data('id')}, data).done(()=>{
                        location.reload();
                    }).fail(()=>{
                        Util.dialog.message(Translator.trans('book.edit_chapter_error')).flash();
                    });
                }, ()=>{
                });
            });
            const deleteLock = lockButton($delete);
            $delete.on('click', ()=>{
                "use strict";
                if (deleteLock.isDisabled()) {
                    return false;
                }
                deleteLock.lock();
                Util.dialog.confirm(Translator.trans('book.confirm_remove_chapter')).then(()=>{
                    let $chapter =  $delete.closest('[data-role="sub-chapter"]');
                    if ($chapter.length === 0) {
                        $chapter = $delete.closest('[data-role="chapter"]');
                    }
                    const chapterId =  $chapter.data('id');
                    Util.request('post.delete', chapterId).done(()=>{
                        Util.dialog.message(Translator.trans('book.remove_success')).flash(()=>{
                            location.reload();
                        });
                    }).fail(()=>{
                        Util.dialog.message(Translator.trans('book.remove_error')).flash();
                    }).always(()=>{
                        deleteLock.release();
                    });
                }, ()=>{
                    deleteLock.release();
                });
            });
            const moveLock = lockButton($move);
            $move.on('click', function(){
                const $this = $(this);
                "use strict";
                if (moveLock.isDisabled()) {
                    return false;
                }
                moveLock.lock();
                let $chapter = $this.closest('[data-role="sub-chapter"]');
                if ($chapter.length === 0) {
                    $chapter = $this.closest('[data-role="chapter"]');
                }
                const chapterId =  $chapter.data('id');
                Util.request('book.move_chapter', {slug: window.book.slug, id: chapterId}, {
                    'direction': $(this).data('direction') || 'up',
                    'step': 1
                }).done(()=>{
                    location.reload();
                }).fail(()=>{
                    Util.dialog.message(Translator.trans('book.move_error')).flash();
                }).always(()=>{
                    moveLock.release();
                });
            });
        });
    }
    initBookSummary();
})($);


//添加章节
const chapterBody = document.getElementById('chapter_originalBody');
const $chapterBody = $(chapterBody);
$chapterBody.length > 0 && (function($){
    const $postTitle = $('#chapter_title');
    const $addChapterForm = $('#add-chapter-form');
    const $addChapterBtn = $('[data-action="add-chapter"]');

    const simplemde = new SimpleMDE({
        element: chapterBody,
        autofocus: true,
        spellChecker: false,
        status: false,
        indentWithTabs: false,
        tabSize: 4,
        autosave: {
            enabled: true,
            uniqueId: 'chapter_' + md5(location.pathname),
            delay: 1000,
        },
        toolbar: [
            "bold", "italic", "heading", "|", "quote", "code", "table",
            "horizontal-rule", "unordered-list", "ordered-list", "|",
            "link", "image", "|",  "side-by-side", "fullscreen", "preview", "|",
            {
                name: 'guide',
                action: 'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                className: 'fa fa-info-circle',
                title: Translator.trans('editor.markdown_synax'),
            }
        ],
    });
    new InlineAttachment(simplemde.codemirror); //处理附件上传的功能
    $addChapterBtn.on('click', () => {
        if ($postTitle.val().length === 0) {
            Util.dialog.message(Translator.trans('book.validation.name')).flash();
            return false;
        }
        const buttonLock = lockButton($addChapterBtn).lock();
        Util.dialog.confirm(Translator.trans('book.confirm_publish')).then(()=> {
            $addChapterForm.submit();
            return true;
        }, () => {
            buttonLock.release();
            return false;
        });
        return false;
    });

    //添加文章验证
    $addChapterForm.validate({
        rules: {
            'chapter[title]': {
                required: true,
                rangelength: [2,50]
            }
        },
        messages: {
            'chapter[title]': {
                required: Translator.trans('book.chapter.validation.title.required'),
                rangelength: Translator.trans('book.chapter.validation.title.length_between')
            },
        }
    });
})($);



//电子书阅读页面
const $bookView = $('[data-role="book-view"]');
$bookView.length > 0 && (function($){
    const $bookSummary = $bookView.find('[data-role="summary"]');
    const $summaryToggleBtn = $bookView.find('[data-role="toggle-summary"]');
    $summaryToggleBtn.on('click', function(){
        $bookView.toggleClass('with-summary');
    });
    //分享
    new SocialShare($bookView.find('[data-role="social-share"]'), {
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
                $bookSummary.find('li.sub-chapter-item').removeClass('active');
                const $subCharacters = $relatedTarget.closest('.sub-chapter');
                if ($subCharacters.length > 0) {
                    $relatedTarget.closest('.sub-chapter-item').addClass('active');
                } else {
                    $relatedTarget.closest('.chapter').addClass('active');
                }
            }
            //代码高亮
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
            NProgress.done();
        });
    })($);

    //购买
    const $buy = $('[data-role="buy"]');
    $buy.length > 0 && (function(){
        const buttonLock = lockButton($buy);
        const slug = $buy.data('slug');
        $buy.on('click', function(){
            const wait = Util.dialog.wait.ballPulse();
            Util.request('category.follow', {'slug': slug}).done(function(response){
                if (response.require_payment) {
                    new QRCodePayment(response.qrcode);
                    return;
                } else {
                    location.reload();
                }
            }).fail(function(response){
                Util.dialog.message(response.responseJSON.error).flash();
            }).always(() => {
                wait.close();
                buttonLock.release();
            });
        });
    })($);
})($);