'use strict';
require('module/common.js');
require('jquery.cookie');
var util = require('module/util.js');
var Vote = require('module/vote.js');
var Comment = require('module/comment.js');
var ContentResize = require('module/content-resize.js');
var Gift = require('module/gift.js');
var postId = window.postId;
var $window = $(window);
//投票
(function($){
    //post投票
    new Vote($('#post-vote'), {
        type: 'post',
        id: postId
    });
})($);

//文章信息
(function ($) {
    var $viewNum = $('[data-num-views]');
    var $commentsNum = $('[data-num-comments]');
    var $postVote = $('#post-vote');
    var $postPraiseNum = $postVote.find('.up .num');
    var $postStampNum = $postVote.find('.down .num');
    util.request('post.summary', postId , function(response){
        if (response.code == 0) {
            var post = response.info.post;
            $viewNum.html(post.views);
            $commentsNum.html(post.comment_checked);
            $postPraiseNum.html(post.praise_nums);
            $postStampNum.html(post.stamp_nums);
        }
    });
})($);

//评论
(function($){
    //comment页面滑行
    if (window.location.hash.indexOf("#comment") === 0) {
        util.goHash("#comments");
    }
    var $loginTips = $('#login-tips');
    var loginTips = {
        yes: '以账号<a href="{link}">{username}</a>登录。',
        no: $('#login-tips-no').html()
    };
    //提示信息显示
    $(document).on('pageInit', function(event, response){
        if(response.code == 0 && response.info.user.id){
            $loginTips.html(loginTips.yes.replace('{link}', response.info.user.homepage).replace('{username}', response.info.user.username));
        }else{
            $loginTips.html(loginTips.no);
        }
    });
    var comment = new Comment(postId);
    //加载评论
    $window.on('scroll', function(){
        comment.load(postId);
    });
})($);

//内容页缩放
new ContentResize($('#content .entry-content'), $('[data-role="content-resize"]'));

//礼品
window.giftId && new Gift(window.giftId);