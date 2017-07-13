window.kernel = new Kernel($, window, document);
kernel.looks = {
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
}
/*页面核心处理函数*/
kernel.callbacks = {
    lazyload: function(){
        $(".entry-thumbnail img, img.avatar, img.look").lazyload({
            effect: "show"
        });
        $("#sidebar img.avatar,#sidebar img.look").lazyload({
            effect: "show"
        })
    },
    initVote: function(){
        $('.vote-group').each(function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var id = $(this).data('id');
            var type = $(this).data('vote-type');
            cookie = kernel.utils.getCookie('vote_' + type + '_' + id);
            if (cookie != null && (cookie == 'like' || cookie == 'unlike')) {
                cookie = (cookie == 'like') ? 'up' : 'down';
                $(this).addClass('disabled').children("." + cookie).addClass("active disabled").siblings().addClass('disabled')
            }
        });
    },
    initPost: function(event, data){
        if(data.post){
            $("[data-num-views='true']").html(data.post.views);
            $("[data-num-comments='true']").html(data.post.comment_checked);
            $("#post-vote .up .num").html(data.post.praise_nums);
            $("#post-vote .updown .num").html(data.post.stamp_nums);
        }
        if(data.user.id){
            $('#login-tips').html(kernel.loginTips.yes.replace('{link}', data.user.homepage).replace('{username}', data.user.username));
        }else{
            $('#login-tips').html(kernel.loginTips.no);
        }
    },
    initUser: function(event, data){
        if(data.user){
            /*写入参数*/
            kernel.data.set('user', data.user);
            var float_menu_id = "#float-nav-menu",
            uc_id = "#ucenterAvatar",
            hid = "#ucenterHome";
            $(float_menu_id).prepend($("<li/>").attr({
                "id": uc_id.replace("#", "")
            }).html($("<a/>").attr({
                "id": hid.replace("#", "")
            })));
            if(data.user.id){
                var user_info = "";
                $.each(data.user.navs, function(key, nav) {
                    user_info += '<a href="' + nav.url + '" title="' + nav.text + '"><em>' + nav.text + "</em>";
                    if(nav.num){
                        user_info += '(' + nav.num + ')';
                    }
                    user_info += '</a>';
                });
                user_info += '<a class="logout_url" href="' + kernel.getRoutePath('user.logout') + '" title="退出登录">&laquo;退出登录</a>';
                $(hid).attr({
                    "title": data.user.username,
                    "href": data.user.homepage
                }).css({
                    "background-image": "url(" + kernel.utils.htmlDecode(data.user.avatar) + ")"
                }).prepend('<div id="userInfoBox" class="floatBoxWrapper"><div class="floatBox"><a class="fn" href="' + data.user.homepage + '">' + data.user.username + "</a>" + user_info + "</div></div>");
            }else{
                $(hid).attr({
                    "title": data.user.welcome,
                    "href": kernel.getRoutePath('user.login')
                })
            }
        }
    },
    initUserPlate: function(){
        var d = {};
        var timer;
        $('[data-plate]').on('mouseover', function(){
            var target = $(this);
            var userId = target.attr('data-id');
            //关闭所有弹窗
            $.each(d, function(i, n){
                n.close();
            });
            clearTimeout(timer);
            if(typeof d[userId] == 'undefined'){
                var content = 'loading...';
            }else{
                if (! d[userId].open) {
                    d[userId].show(target[0]);
                }
                return false;
            }
            d[userId]= dialog({
                id: 'dialog_' + userId,
                align: 'top left',
                'content': content,
            });
            $(d[userId].node).hover(function(){
                clearTimeout(timer);
            }, function(){
                d[userId].close();
            });
            d[userId].show(target[0]);
            kernel.request('user.plate', userId, function(html){
                d[userId].content(html);
            });
        }).on('mouseout', function(){
            var userId = $(this).attr('data-id');
            if(typeof d[userId] != 'undefined'){
                timer = setTimeout(function(){
                    d[userId].close();
                }, 500);
             }
        });
    },
    vote: function(type, id, choose, $this) {
        var routeName = type+'.'+choose;
        $this.parent().addClass("disabled").children().addClass("disabled");
        kernel.request(routeName, id, function(response){
            if(response.code == 0) {
                $this.addClass("active");
                var cookieTime = 3600 * 24
                $this.children(".num").html(choose == 'like' ? response.info.vote.praise_nums : response.info.vote.stamp_nums);
                kernel.utils.setCookie("vote_" + type + "_" + id, choose, cookieTime, "/")
            }
        });
        return false;
    },
    hideLookPopover: function() {
        var actionID = "#looks-image";
        if ($(actionID + ":hover").length <= 0) {
            $(actionID).popover("hide")
        }
        kernel.$document.off("click", "body", this.hideLookPopover);
    },
    codePrettify: function() {
        $(".entry-content code").each(function() {
            if ($(this).hasClass("prettyprint")) {
                return
            }
            if ($(this).parent("pre").length > 0 || $(this).parent(".prettyprint").length > 0) {
                return
            }
            if ($(this).data("linenums")) {
                $(this).wrap("<pre />").parent().addClass("prettyprint linenums")
            } else {
                $(this).addClass("prettyprint")
            }
        });
        if ($(".prettyprint").length > 0) {
            $.getScript(kernel.cpfuri, function() {
                prettyPrint()
            })
        }
    },
    floatNav: function() {
        var $main = $("#main"),
        $floatNav = $("#float-nav"),
        $menu = $floatNav.children("#float-nav-menu"),
        main_width = $main.width(),
        nav_width = $floatNav.width(),
        mtop = 0 - 50 - $menu.height() / 2;
        if ((main_width + nav_width * 2 + 20) > kernel.$window.width()) {
            $floatNav.css({
                "left": "auto",
                "right": "10px",
                "margin-top": mtop,
                "margin-left": 0
            });
        } else {
            $floatNav.css({
                "left": "50%",
                "right": "auto",
                "margin-top": mtop,
                "margin-left": main_width / 2 + 10
            });
        }
        $menu.fadeIn();
    },
    fixedLastAside: function(rs) {
        if (!kernel.data.get('readied')) {
            return
        }
        var $masthead = $("#masthead"),
        $main = $("#main"),
        $content = $("#content"),
        $sidebar = $("#sidebar"),
        $e = $sidebar.children("aside").last();
        if ($e.length <= 0 || $content.height() <= $sidebar.height()) {
            return
        }
        var st = kernel.$window.scrollTop(),
        etop = parseInt($e.css("marginTop"));
        if (!$e.attr("data-offset-top") || $e.hasClass("static") || rs) {
            $e.attr("data-offset-top", $e.offset().top - etop).css("width", $sidebar.width())
        }
        var ot = $e.attr("data-offset-top"),
        et = ot - st,
        $nav = $masthead.children(".navbar"),
        t = $nav.outerHeight(),
        w = kernel.$window.width();
        if (w > 991) {
            var mot = $main.offset().top,
            eot = $main.outerHeight() + mot - $e.outerHeight(true),
            nh = $nav.outerHeight(true);
            if (et <= t && false === $e.hasClass("fixed")) {
                $e.removeClass("absolute static").addClass("fixed").css({
                    "top": t
                });
            }
            if ((st - etop) >= eot - nh && false === $e.hasClass("absolute")) {
                $e.removeClass("fixed static").addClass("absolute").css({
                    "top": eot - $masthead.outerHeight(true)
                })
            }
        }
        if ((w < 992 || et > t) && false === $e.hasClass("static")) {
            $e.removeClass("fixed absolute").addClass("static");
        }
    },
    fixedNavbar: function() {
        var $m = $("#masthead"),
        $h = $m.find(".header-content"),
        $n = $m.find(".navbar"),
        ht = $h.outerHeight(true),
        st = kernel.$window.scrollTop();
        $m.css("height", $n.outerHeight() + ht);
        if (st >= ht && kernel.$window.width() >= 768) {
            $n.removeClass("navbar-static-top").addClass("navbar-fixed-top")
        }
        if (st < ht) {
            $n.removeClass("navbar-fixed-top").addClass("navbar-static-top")
        }
    },
    loadComments: function() {
        if (kernel.data.get('commentsLoading')) {
            return;
        }
        $comments = $('#comments');
        $commentsThread = $('#thread-comments');
        $commentsLoading = $('#comments-loading');
        if ($commentsLoading.length > 0 && $commentsLoading.hasClass("loaded") == false && ($commentsLoading.offset().top - kernel.$window.height() - kernel.$window.scrollTop()) <= 0) {
            kernel.data.set('commentsLoading', 1)
            var page = kernel.data.get('page', 1);
            var postId = kernel.data.get('postId', 0);
            kernel.request('comments.load',postId, {'page': page}, {
                success: function(data){
                    $comments.after($commentsLoading.addClass("loaded").hide()).append(data);
                    kernel.data.set('commentsLoading', 0)
                    kernel.callbacks.initVote();
                    kernel.callbacks.lazyload();
                    if (window.location.hash.indexOf("#comment") === 0) {
                        kernel.utils.goHash();
                    }
                }
            });
        }
    },
    loadCommentsFromUrl: function(url) {
        if (kernel.data.get('commentsLoading')) {
            return;
        }
        $comments = $('#comments');
        $commentsThread = $('#thread-comments');
        $commentsLoading = $('#comments-loading');
        if ($commentsLoading.length > 0 && $commentsLoading.hasClass("loaded") == false && ($commentsLoading.offset().top - kernel.$window.height() - kernel.$window.scrollTop()) <= 0) {
            kernel.data.set('commentsLoading', 1);
            $.get(url, function(data){
                $comments.after($commentsLoading.addClass("loaded").hide()).append(data);
                kernel.data.set('commentsLoading', 0)
                kernel.callbacks.initVote();
                kernel.callbacks.lazyload();
                if (window.location.hash.indexOf("#comment") === 0) {
                    kernel.goHash();
                }
            });
        }
    },
    moveForm: function(comment, parent, respond, post) {
        var c = "#" + comment;
        var l = $("#commentform .help-block a");
        if ($(c).next("form").length > 0) {
            $(c).find(".comment-reply-link").removeClass("highlight");
            $("#parent_id").val("0");
            $("#" + respond).append($("#commentform"));
            kernel.data.set('isReply', 0);
        } else {
            $(".comment-reply-link").removeClass("highlight");
            $(c).find(".comment-reply-link").addClass("highlight");
            $("#parent_id").val(parent);
            $(c).after($("#commentform"));
            kernel.utils.goHash("#" + comment);
            kernel.data.set('isReply', 1);
        }
        return false;
    },
    scroll: function() {
        this.loadComments();
        this.fixedLastAside(0);
        this.fixedNavbar();
        var $goTop = $("#goTop");
        if (kernel.$window.scrollTop() > (kernel.$window.height() / 2)) {
            if ($goTop.is(":hidden")) {
                $goTop.fadeIn()
            }
        } else {
            if ($goTop.is(":visible")) {
                $goTop.fadeOut()
            }
        }
    },
    resize: function() {
        this.fixedLastAside(1);
        this.fixedNavbar();
        this.floatNav();
    }
};
kernel.actionMap = {
    'follow-user': function(){
        if(kernel.data.get('lock')){
            return false;
        }
        kernel.data.set('lock', true);
        var $this = $(this);
        var userId = $this.attr('data-user-id');
        kernel.request('user.follow', userId, function(response){
            if(response.code == 0){
                var html = '<button class="btn btn-default btn-sm" data-action="unfollow-user" data-user-id="'+ userId +'">取消关注</button>';
                $this.after(html).remove();
            }else{
                kernel.vendor.dialog.tip(response.message, 2);
            }
        });
        kernel.data.set('lock', false);
    },
    'unfollow-user': function(){
        if(kernel.data.get('lock')){
            return false;
        }
        kernel.data.set('lock', true);
        var $this = $(this);
        var userId = $this.attr('data-user-id');
        kernel.request('user.unfollow', userId, function(response){
            if(response.code == 0){
                var html = '<button class="btn-u btn-u-red" data-action="follow-user" data-user-id="'+ userId +'"><i class="fa fa-plus"></i> 关注</button>';
                $this.after(html).remove();
            }else{
                kernel.vendor.dialog.tip(response.message, 2);
            }
        });
        kernel.data.set('lock', false);
    },
    'follow-topic': function(){
        var $this = $(this);
        var topicId = $this.attr('data-topic-id');
        kernel.request('topic.follow', topicId, function(response){
            if(response.code == 0){
                kernel.vendor.dialog.tip(response.message, 2);
                $this.html('<i class="glyphicon glyphicon-ok"></i> 已关注').removeAttr('data-action');
            }else{
                kernel.vendor.dialog.alert(response.message, 2);
            }
        });
    },
    'unfollow-topic': function(){
        var $this = $(this);
        var topicId = $this.attr('data-topic-id');
        kernel.vendor.dialog.dialog('提示', '确认取消关注?', function(){
            kernel.request('topic.unfollow', topicId, function(response){
                if(response.code == 0){
                    $this.closest('li').fadeOut();
                }else{
                    kernel.vendor.dialog.alert(response.message, 2);
                }
            });
        });
    },
    'follow-question': function(){
        var $this = $(this);
        var questionId = $this.attr('data-question-id');
        kernel.request('question.follow', questionId, function(response){
            if(response.code == 0){
                kernel.vendor.dialog.tip(response.message, 2);
                $this.after('<button class="btn btn-default"><i class="fa fa-check"></i> 已关注</button>').remove();
            }else{
                kernel.vendor.dialog.alert(response.message, 2);
            }
        });
    },
    'unfollow-question': function(){
        var $this = $(this);
        var questionId = $this.attr('data-question-id');
        kernel.vendor.dialog.dialog('提示', '确认取消收藏?', function(){
            kernel.request('question.unfollow', questionId, function(response){
                if(response.code == 0){
                    $this.closest('li').fadeOut();
                }else{
                    kernel.vendor.dialog.alert(response.message, 2);
                }
            });
        });
    },
    'favorite-post': function(){
        var $this = $(this);
        var postId = $this.attr('data-post-id');
        kernel.request('post.favorite', postId, function(response){
            if(response.code == 0){
                kernel.vendor.dialog.tip(response.message, 2);
                $this.html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
            }else{
                kernel.vendor.dialog.alert(response.message, 2);
            }
        });
    },
};
kernel.ready(function(){
    var _this = this;
    /*运行action绑定*/
    this.$document.on('click', '[data-action]', function(){
        var action = $(this).attr('data-action');
        _this.actionMap[action].call(this);
    });
    /*#comment后缀滑动窗口*/
    if (window.location.hash.indexOf("#comment") === 0) {
        this.utils.goHash("#comments");
    }
    /*user plate*/
    this.callbacks.initUserPlate();
    /*设置全局事件*/
    this.$document.on("click", "#goTop", function(e) {
        if (e.target.id == $(this).attr("id") || $(e.target).parent().attr("id") == $(this).attr("id")) {
            $("html,body").animate({
                scrollTop: "0px"
            }, 800);
        }
    }).on("click", "#goBottom", function() {
        this.utils.goHash("#colophon");
    }).on("click", "#goVote", function() {
        this.utils.goHash("#post-vote");
    }).on("click", "#refresh", function() {
        location.reload();
    }).on("mouseenter", "#pageShare", function() {
        var $qrcode = $("#shareQrcode");
        if (!$qrcode.attr("src")) {
            $qrcode.attr("src", $qrcode.data("api") + _this.pageUrl);
        }
    }).on("click", "#sharePrompt", function(e) {
        prompt($(this).data("notice"), document.title + " " + location.href);
        return false
    }).on("mouseenter mouseleave", ".dropdown", function(e) {
        if (_this.$window.width() > 767) {
            if (e.type == "mouseenter") {
                $(this).addClass("open")
            } else {
                $(this).removeClass("open")
            }
        }
    }).on("click", ".dropdown-toggle", function() {
        if ($(this).attr("href")) {
            window.location = $(this).attr("href")
        }
    });
    var pageType = this.data.get('pageType');
    /*具体页面的针对处理*/
    if(pageType == 'post-show'){
        /*初始化投票按钮*/
        this.callbacks.initVote();
        this.$document.on("click", "#goComments", function() {
            _this.utils.goHash("#comments")
        }).on("click", "#set-font-small, #set-font-big", function() {
            $(this).addClass("disabled");
            $(this).siblings().removeClass("disabled");
            $("#content .entry-content").css($(this).attr("id") == "set-font-small" ? {
                "font-size": "initial"
            }: {
                "font-size": "larger"
            })
        }).on("click", ".vote-group a", function(e) {
            $this = $(this);
            if ($this.hasClass("disabled")) {
                return;
            }
            var lastTime = kernel.data.get('voteTime');
            if ((event.timeStamp - lastTime) < 1000) {
                return;
            }
            var parent = $this.parent();
            var type=parent.data('vote-type'),
            id=parent.data('id'),
            choose=$this.data('choose');
            _this.callbacks.vote(type, id, choose, $this);
        }).on("click", "#pagination-comments a", function() {
            if ($('#comments-loading').length <= 0) {
                return false;
            }
            var url = $(this).attr("href");
            $('#thread-comments').html($('#comments-loading').removeClass("loaded").show());
            _this.callbacks.loadCommentsFromUrl(url);
            _this.utils.goHash("#thread-comments");
            return false
        }).on("submit", "#commentform", function() {
            var submitBtn = $("#commentsubmit"),
            content = $("#comment"),
            $errorAlert = $('#comment-error-alert'),
            $successTips = $('#comment-success-tips'),
            postId = $(this).data('id');
            submitBtn.button("loading");
            _this.request('comments.add', postId, $(this).serialize(), {
                beforeSend: function() {
                    content.prop("disabled", true);
                },
                success: function(response){
                    if (response.code == 0) {
                        $successTips.html(response.message).fadeIn(400, function() {
                            setTimeout(function() {
                                $successTips.fadeOut()
                            }, 3000);
                        });
                        content.val('');
                    } else {
                        $errorAlert.html(response.message).fadeIn(400, function() {
                            setTimeout(function() {
                                $errorAlert.fadeOut()
                            }, 3000);
                        });
                    }
                    submitBtn.button("reset");
                    content.prop("disabled", false);
                    _this.callbacks.lazyload()
                }
            });
            return false
        }).on("click", "#looks-image", function() {
            if (!_this.looks || $("#comment").prop("disabled")) {
                return false;
            }
            var html = '<ul id="looks-list" class="clearfix">';
            $.each(_this.looks.files, function(title, file) {
                html += '<li title="' + title + '"><img src="' + kernel.looks.uri + file + '" alt="' + title + '" width="22" height="22" />'
            });
            html += "</ul>";
            if (typeof $(this).data("original-title") == "undefined") {
                $(this).popover({
                    container: "#commentform",
                    trigger: "manual",
                    html: true,
                    placement: "right",
                    template: '<div class="popover look-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" id="looks"></div></div>',
                    content: html
                })
            }
            $(this).popover("toggle");
            _this.$document.on("click", "body", _this.callbacks.hideLookPopover);
        }).on("click", "#looks li", function() {
            var cid = "#comment",
            val = $(cid).val(),
            length = val.length,
            selectionStart = $(cid).prop("selectionStart"),
            look = "[" + $(this).attr("title") + "]",
            selectionRange = selectionStart + look.length;
            $(cid).val(val.slice(0, selectionStart) + look + val.slice(selectionStart, length)).focus();
            $(cid)[0].setSelectionRange(selectionRange, selectionRange);
            kernel.callbacks.hideLookPopover();
            return false
        }).on("click", "#privacy-action", function() {
            if ($("#comment").prop("disabled")) {
                return false
            }
            var active = $(this).hasClass("active"),
            codeStart = "[pem]",
            codeEnd = "[/pem]",
            code = active ? codeEnd: codeStart,
            cid = "#comment",
            val = $(cid).val(),
            length = val.length,
            selectionStart = $(cid).prop("selectionStart"),
            selectionEnd = $(cid).prop("selectionEnd"),
            selectionRange = selectionStart,
            start = val.slice(selectionStart - codeStart.length, selectionStart) == codeStart,
            end = val.slice(selectionEnd, selectionEnd + codeEnd.length) == codeEnd,
            newVal = val;
            if (!start || !end) {
                if (selectionStart === selectionEnd) {
                    if (selectionStart === length) {
                        newVal = val + codeStart + codeEnd;
                        selectionRange = selectionStart + codeStart.length
                    } else {
                        newVal = val.slice(0, selectionStart) + code + val.slice(selectionStart, length);
                        $(this).button((active ? "reset": "endtag")).button("toggle");
                        selectionRange = selectionStart + code.length
                    }
                } else {
                    var c = val.slice(selectionStart, selectionEnd),
                    c = c.replace(codeStart, "").replace(codeEnd, "");
                    newVal = val.slice(0, selectionStart) + codeStart + c + codeEnd + val.slice(selectionEnd, length);
                    selectionRange = selectionStart + c.length + codeStart.length + codeEnd.length
                }
            }
            $(cid).val(newVal).focus();
            $(cid)[0].setSelectionRange(selectionRange, selectionRange)
        });
    }
    /*window事件*/
    this.$window.scroll(function() {
        _this.callbacks.scroll()
    }).resize(function() {
        _this.callbacks.resize()
    })
    /*页面结构修改*/
    this.callbacks.fixedLastAside(1);
    this.callbacks.fixedNavbar();
    /*page init*/
    this.hooks.on('pageInit', function(event, data){
       this.callbacks.initUser(event, data);
       this.callbacks.floatNav(event, data);
    });
    this.request('page.init', {}, this.data.get('pageInit', {requires: ['user']}), {
        success: function(response){
            if(response.code == 0){
                _this.hooks.trigger('pageInit', [response.info]);
            }
        }
    })
});