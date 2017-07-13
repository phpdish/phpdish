'use strict';
var util = require('./util.js');
var Vote = require('./vote.js');


//表情配置
var looks = {
    "uri": "http:\/\/s.duomeng.me\/look\/",
    "files": {
        "\u5475\u5475": "hehe.gif",
        "\u563b\u563b": "xixi.gif",
        "\u54c8\u54c8": "haha.gif",
        "\u53ef\u7231": "keai.gif",
        "\u53ef\u601c": "kelian.gif",
        "\u6316\u9f3b\u5c4e": "wabishi.gif",
        "\u5403\u60ca": "chijing.gif",
        "\u5bb3\u7f9e": "haixiu.gif",
        "\u6324\u773c": "jiyan.gif",
        "\u95ed\u5634": "bizui.gif",
        "\u9119\u89c6": "bishi.gif",
        "\u7231\u4f60": "aini.gif",
        "\u6cea": "lei.gif",
        "\u5077\u7b11": "touxiao.gif",
        "\u4eb2\u4eb2": "qinqin.gif",
        "\u751f\u75c5": "shengbing.gif",
        "\u592a\u5f00\u5fc3": "taikaixin.gif",
        "\u61d2\u5f97\u7406\u4f60": "landelini.gif",
        "\u53f3\u54fc\u54fc": "youhengheng.gif",
        "\u5de6\u54fc\u54fc": "zuohengheng.gif",
        "\u5618": "xu.gif",
        "\u8870": "shuai.gif",
        "\u59d4\u5c48": "weiqu.gif",
        "\u5410": "tu.gif",
        "\u54c8\u6b20": "haqian.gif",
        "\u62b1\u62b1": "baobao.gif",
        "\u6012": "nu.gif",
        "\u7591\u95ee": "yiwen.gif",
        "\u998b\u5634": "chanzui.gif",
        "\u62dc\u62dc": "baibai.gif",
        "\u601d\u8003": "sikao.gif",
        "\u6c57": "han.gif",
        "\u56f0": "kun.gif",
        "\u7761": "shui.gif",
        "\u94b1": "qian.gif",
        "\u5931\u671b": "shiwang.gif",
        "\u9177": "ku.gif",
        "\u8272": "se.gif",
        "\u54fc": "heng.gif",
        "\u9f13\u638c": "guzhang.gif",
        "\u6655": "yun.gif",
        "\u60b2\u4f24": "beishang.gif",
        "\u6293\u72c2": "zhuakuang.gif",
        "\u9ed1\u7ebf": "heixian.gif"
    }
};
function Comment(postId) {
    var _this = this;
    var $window = $(window);
    var $document = $(document);
    var $comments = $('#comments');
    var $commentsPanel = $comments.find('[data-role="comments-panel"]');
    var $commentsThread = $('#thread-comments');
    var $commentsLoading = $('#comments-loading');
    var $respond = $('#respond');

    //添加评论
    var $commentForm = $('#commentform'),
        $submitBtn = $("#commentsubmit"),
        $content = $("#comment"),
        $errorAlert = $('#comment-error-alert'),
        $successTips = $('#comment-success-tips');

    //回复评论
    var $parentId = $('#parent-id');

    //记载评论
    this.load = function(postId, page){
        if(_this._loading){
            return false;
        }
        page = page  || _this.page || 1;
        if (!$commentsLoading.hasClass('loaded') && ($commentsLoading.offset().top - $window.height() - $window.scrollTop()) <= 0) {
            _this._loading = true;
            util.request('comment.load',postId, {'page': page}, {
                success: function(data){
                    $comments.after($commentsLoading.addClass("loaded").hide());
                    $commentsPanel.html(data);
                    if (window.location.hash.indexOf("#comment") === 0) {
                        util.goHash();
                    }
                    _this.page++;
                    _this._loading = false;
                    $comments.trigger('commentLoad', data);
                }
            });
        }
    };

    //从链接更新评论
    function loadCommentsFromUrl(url) {
        if(_this._loading){
            return false;
        }
        if (!$commentsLoading.hasClass('loaded') &&  ($commentsLoading.offset().top - $window.height() - $window.scrollTop()) <= 0) {
            _this._loading = true;
            $.get(url, function (data) {
                $comments.after($commentsLoading.addClass("loaded").hide())
                $commentsPanel.html(data);
                _this._loading = false;
                if (window.location.hash.indexOf("#comment") === 0) {
                    util.goHash();
                }
                $comments.trigger('commentLoad', data);
            });
        }
    }

    //移动form表单
    function moveForm($srcComment, $activeReply) {
        var commentId = $srcComment.data('id');
        if ($srcComment.children('form').length > 0) {
            $activeReply.removeClass("highlight");
            $parentId.val(0);
            $respond.append($commentForm);
            $srcComment.isReply = 0;
        } else {
            $comments.find('[data-role="reply"]').removeClass("highlight");
            $activeReply.addClass("highlight");
            $parentId.val(commentId);
            $srcComment.append($commentForm);
            util.goHash($srcComment);
            $srcComment.isReply = 1;
        }
        return false;
    }

    //绑定加载评论
    this.bindLoadComment = function(){
        //翻页更新评论
        $comments.on('click', '#pagination-comments a', function(){
            var url = $(this).attr("href");
            $('#thread-comments').html($commentsLoading.removeClass("loaded").show());
            loadCommentsFromUrl(url);
            util.goHash("#thread-comments");
            return false
        });
        $comments.on('commentLoad', function(){
            $comments.find('[data-role="comment"]').each(function(){
                var $this = $(this);
                //防止楼层嵌套查找出错
                $this.children('article').find('[data-role="reply"]').on('click', function(){
                    moveForm($this, $(this));
                });
            });

            $comments.find('[data-role="vote"]').each(function(){
                new Vote($(this));
            });
        });
    };
    
    var $facePanel = $('#looks-image');
    /**
     * 准备评论表情
     * @returns {boolean}
     */
    function prepareCommentLooks() {
        $facePanel.on('click', function(){
            if (!looks || $content.is(":disabled")) {
                return false;
            }
            if (typeof $facePanel.data("original-title") == "undefined") {
                var html = '<ul id="looks-list" class="clearfix">';
                _.forEach(looks.files, function(file, title) {
                    html += '<li title="' + title + '"><img src="' + looks.uri + file + '" alt="' + title + '" width="22" height="22" />'
                });
                html += "</ul>";
                $facePanel.popover({
                    container: "#commentform",
                    trigger: "manual",
                    html: true,
                    placement: "right",
                    template: '<div class="popover look-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" id="looks"></div></div>',
                    content: html
                })
            }
            $facePanel.popover("toggle");
        });
        $commentForm.on('click', '#looks li', function(){
            var val = $content.val(),
                length = val.length,
                selectionStart = $content.prop("selectionStart"),
                look = "[" + $(this).attr("title") + "]",
                selectionRange = selectionStart + look.length;
            $content.val(val.slice(0, selectionStart) + look + val.slice(selectionStart, length)).focus();
            $content[0].setSelectionRange(selectionRange, selectionRange);
            $facePanel.popover("hide");
            return false
        });
        //点击
        $document.on('click', function(event){
            if($facePanel.data('original-title') != 'undefined'){
                var $looks = $('#looks');
                var isFacePanel = $facePanel.is(event.target) || $facePanel.has(event.target).length  > 0;
                var  isLookPanel = $looks.is(event.target) || $looks.has(event.target).length  > 0;
                if(!isFacePanel && !isLookPanel){
                    $facePanel.popover("hide");
                }
            }
        });

    }

    /**
     * 绑定添加评论
     */
    this.bindAddComment = function(postId){
        //处理评论框
        prepareCommentLooks();
        $commentForm.on('submit', function(){
            $submitBtn.button("loading");
            util.request('comment.add', postId, $commentForm.serialize(), {
                beforeSend: function() {
                    $content.prop("disabled", true);
                },
                success: function(response){
                    if (response.code == 0) {
                        $successTips.html(response.message).fadeIn(400, function() {
                            setTimeout(function() {
                                $successTips.fadeOut()
                            }, 3000);
                        });
                        $content.val('');
                    } else {
                        $errorAlert.html(response.message).fadeIn(400, function(){
                            setTimeout(function() {
                                $errorAlert.fadeOut()
                            }, 3000);
                        });
                    }
                    $submitBtn.button("reset");
                    $content.prop("disabled", false);
                }
            });
            return false;
        });
    };
    //初始化
    this.bindAddComment(postId);
    this.bindLoadComment();
}

module.exports = Comment;