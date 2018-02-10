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

//书籍详情页面
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
            Util.dialog.inputs('章节名称', [{name: 'title', required: true}], {
                messages: {
                    title: {
                        "required": "请输入章节标题"
                    }
                }
            }, {
                'okValue': '创建',
                'cancelValue': '取消',
                width: 350
            }).then((data)=>{
                console.log(data);
                Util.request('book.add_summary', {slug: window.book.slug}, data).done(()=>{
                    location.reload();
                }).fail(()=>{
                    Util.dialog.message('创建章节失败').flash();
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
            $edit.on('click', function(){
                Util.dialog.inputs('章节名称', [{
                    name: 'title',
                    default: $this.data('title'),
                    required: true
                }], {
                    messages: {
                        title: {
                            "required": "请输入章节标题"
                        }
                    }
                }, {
                    'okValue': '修改',
                    'cancelValue': '取消',
                    width: 350
                }).then((data)=>{
                    Util.request('book.edit_summary', {slug: window.book.slug, id: $this.data('id')}, data).done(()=>{
                        location.reload();
                    }).fail(()=>{
                        Util.dialog.message('修改章节失败').flash();
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
                Util.dialog.confirm('确认删除本章节？').then(()=>{
                    let $chapter =  $delete.closest('[data-role="sub-chapter"]');
                    if ($chapter.length === 0) {
                        $chapter = $delete.closest('[data-role="chapter"]');
                    }
                    const chapterId =  $chapter.data('id');
                    Util.request('post.delete', chapterId).done(()=>{
                        Util.dialog.message('删除成功').flash(()=>{
                            location.reload();
                        });
                    }).fail(()=>{
                        Util.dialog.message('删除失败请重试！').flash();
                    }).always(()=>{
                        deleteLock.release();
                    });
                }, ()=>{
                    deleteLock.release();
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
            uniqueId: 'chapter_draft',
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
                title: 'Markdown 语法',
            }
        ],
    });
    new InlineAttachment(simplemde.codemirror); //处理附件上传的功能
    $addChapterBtn.on('click', () => {
        if ($postTitle.val().length === 0) {
            Util.dialog.message('标题不能为空').flash();
            return false;
        }
        const buttonLock = lockButton($addChapterBtn).lock();
        Util.dialog.confirm('确认发布？').then(()=> {
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
                required: "请输入章节标题",
                rangelength: "标题长度在2到50位之间"
            },
        }
    });
})($);



//书籍阅读页面
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