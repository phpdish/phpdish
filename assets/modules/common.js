'use strict';
import util from './util.js';

const UserQuickNav = require('./user-quick-nav.js');
const scrollToFixed = require('scrolltofixed');
//通用性操作
import './common-action.js';

const $document = $(document);
const $window = $(window);

//验证码刷新
(function($){
    var captchaUrl = util.route.getRoutePath('captcha');
    $('[data-role="captcha"]').each(function(){
        var $this = $(this);
        var width = $this.attr('width');
        var height = $this.attr('height');
        var _captchaUrl = captchaUrl + '?width=' + width + '&height=' + height;
        if(!$this.attr('src')){
            $this.attr('src', _captchaUrl);
        }
        if(!$this.attr('title')){
            $this.attr('title', '点击更换验证码');
        }
        $this.on('click', function(){
            $this.attr('src', _captchaUrl + '&rc=' + Math.random());
        });
    });
})($);
//用户导航
(function($){
    $document.on('pageInit', function(event, response){
        var $quickNavPanel = $('#float-nav-menu');
        new UserQuickNav($quickNavPanel, response.info);
        floatNav();
    });

    function floatNav() {
        var $main = $("#main"),
            $floatNav = $("#float-nav"),
            $menu = $floatNav.children("#float-nav-menu"),
            main_width = $main.width(),
            nav_width = $floatNav.width(),
            mtop = 0 - 50 - $menu.height() / 2;
        if ((main_width + nav_width * 2 + 20) > $window.width()) {
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
    }
})($);

//固定模块
(function($){
    //固定导航
    $('[data-role="navbar"]').scrollToFixed();
    var $sidebar = $('#sidebar');
    $sidebar.children('aside').last().scrollToFixed({
        marginTop: 52
    });
})($);

//未读消息显示
(function ($) {
    $document.on('pageInit', function(event, response){
        if(response.message.unReadMessageNum > 0){
            $('[data-role="unread-msg-num"]').append('<span class="color-red">('+response.message.unReadMessageNum+')</span>');
        }
    });
})($);

//请求初始化数据
(function($){
    util.request('page.init', function(response){
        $document.trigger('pageInit', response);
    });
})($);

//用户quick plate
(function($){
    var _userPlateDialogs = {};
    var timer;
    $('[data-plate]').on('mouseover', function(){
        //关闭所有的dialog
        _.forEach(_userPlateDialogs, function(dialog){
            dialog.close();
        });
        var $this = $(this);
        var userId = $this.data('id');
        clearTimeout(timer);
        //如果已经创建则直接开启
        if (typeof _userPlateDialogs[userId] != 'undefined') {
            if (!_userPlateDialogs[userId].open) {
                _userPlateDialogs[userId].show($this[0]);
            }
            return false;
        }
        var htmlContent = 'loading...';
        var dialog = artDialog({
            id: 'dialog_' + userId,
            align: 'top left',
            content: htmlContent,
        });
        $(dialog.node).hover(function(){
            clearTimeout(timer);
        }, function(){
            dialog.close();
        });
        dialog.show($this[0]);
        util.request('user.plate', userId, function(html){
            dialog.content(html);
        });
        _userPlateDialogs[userId] = dialog;
    }).on('mouseout', function(){
        var userId = $(this).data('id');
        if(typeof _userPlateDialogs[userId] != 'undefined'){
            timer = setTimeout(function(){
                _userPlateDialogs[userId].close();
            }, 500);
        }
    });
})($);

//滚动监听
(function($){
    //Go Up
    var $goTop = $("#goTop");
    function goUp(){
        if ($window.scrollTop() > $window.height() / 2) {
            if ($goTop.is(":hidden")) {
                $goTop.fadeIn()
            }
        } else {
            if ($goTop.is(":visible")) {
                $goTop.fadeOut()
            }
        }
    }
    //点击去页面头部
    $goTop.on('click', function(e){
        var $this = $(this);
        if (e.target.id == $this.attr("id") || $(e.target).parent().attr("id") == $this.attr("id")) {
            $("html,body").animate({
                scrollTop: "0px"
            }, 800);
        }
    });
    //Go Comment
    var $goComment = $('#goComments');
    $goComment.on('click', function(){
        util.goHash("#comments")
    });
    //滚动监听显隐性
    $window.on('scroll', function(){
        goUp();
    });
})($);