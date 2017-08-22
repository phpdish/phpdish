'use strict';

import Util from './util.js';
import lockButton from '../modules/button-lock.js';

//关注专栏
$('[data-role="follow-category"]').on('click', '[data-action="follow"]', function(){
    const $this = $(this);
    const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
    console.log(slug);
    const buttonLock = lockButton($this);

    Util.request('category.follow', {'slug': slug}).done(function(response){
        $this.attr('data-action', 'unfollow').removeClass('btn-follow').addClass('btn btn-unfollow')
            .html('已关注');

    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        buttonLock.release();
    });
}).on('click', '[data-action="unfollow"]', function(){
    const $this = $(this);
    const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
    const buttonLock = lockButton($this);
    Util.request('category.unfollow', {'slug': slug}).done(function(response){
        $this.attr('data-action', 'follow').removeClass('btn-unfollow').addClass('btn-follow')
            .html('<i class="if i-plus"></i> 关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        buttonLock.release();
    });
});

/**
//关注文章
(function() {
    var $savePost = $('[data-role="save-post"]');
    $savePost.on('click', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var postId = $this.data('post-id');
        util.request('post.favorite', postId, function (response) {
            if (response.code == 0) {
                util.dialog.msg(response.message);
                $this.html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
            } else {
                util.dialog.alert(response.message);
            }
            $this._lock = false;
        });
    });
})($);
//关注问题
(function() {
    var $saveQuestion = $('[data-role="save-question"]');
    $saveQuestion.on('click', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        var questionId = $saveQuestion.data('question-id');
        $this._lock = true;
        util.request('question.follow', questionId, function(response){
            if(response.code == 0){
                util.dialog.msg(response.message);
                $this.after('<button class="btn btn-default"><i class="fa fa-check"></i> 已关注</button>').remove();
            }else{
                util.dialog.alert(response.message);
            }
            $this._lock = false;
        });
    });
})($);
//取消关注问题
(function() {
    var $unsaveQuestion = $('[data-role="unsave-question"]');
    $unsaveQuestion.on('click', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        var questionId = $saveQuestion.data('question-id');
        $this._lock = true;
        util.dialog.confirm('确认取消收藏?', {}, function(){
            kernel.request('question.unfollow', questionId, function(response){
                if(response.code == 0){
                    util.dialog.msg(response.message);
                    $this.closest('li').fadeOut();
                }else{
                    util.dialog.alert(response.message);
                }
                $this._lock = false;
            });
        });
    });
})($);
//关注问题
(function() {
    $document.on('click', '[data-role="follow-topic"]', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        $this._lock = true;
        var topicId = $this.data('topic-id');
        util.request('topic.follow', topicId, function(response){
            if(response.code == 0){
                util.dialog.msg(response.message, 2);
                $this.html('<i class="glyphicon glyphicon-ok"></i> 已关注').removeAttr('data-role');
            }else{
                util.dialog.alert(response.message, 2);
            }
        });
    });
})($);
//取消关注话题
(function() {
    var $unfollowTopic = $('[data-role="unfollow-topic"]');
    $unfollowTopic.on('click', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        $this._lock = true;
        var topicId = $this.data('topic-id');
        util.dialog.confirm('确认取消收藏?', {}, function() {
            util.request('topic.unfollow', topicId, function (response) {
                if (response.code == 0) {
                    util.dialog.msg(response.message);
                    $this.closest('li').fadeOut();
                } else {
                    util.dialog.alert(response.message);
                }
            });
        });
    });
})($);
//关注用户
(function() {
    $document.on('click', '[data-role="follow-user"]', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        $this._lock = true;
        var userId = $this.data('user-id');
        util.request('user.follow', userId, function(response){
            if(response.code == 0){
                var html = '<button class="btn btn-default btn-sm" data-rolow="unfollow-user" data-user-id="'+ userId +'">取消关注</button>';
                $this.after(html).remove();
            }else{
                util.dialog.alert(response.message);
            }
        });
    });
})($);
//取消关注用户
(function() {
    $document.on('click', '[data-role="unfollow-user"]', function(){
        var $this = $(this);
        if($this._lock){
            return false;
        }
        $this._lock = true;
        var userId = $this.data('user-id');
        util.request('user.unfollow', userId, function(response){
            if(response.code == 0){
                var html = '<button class="btn-u btn-u-red" data-role="follow-user" data-user-id="'+ userId +'"><i class="fa fa-plus"></i> 关注</button>';
                $this.after(html).remove();
            }else{
                util.dialog.alert(response.message);
            }
        });
    });
})($);

 **/