'use strict';

import Util from './util.js';
import lockButton from '../modules/button-lock.js';

//关注专栏
$('[data-role="follow-category"]').on('click', '[data-action="follow"]', function(){
    const $this = $(this);
    const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
    const buttonLock = lockButton($this);

    Util.request('category.follow', {'slug': slug}).done(function(response){
        $this.attr('data-action', 'unfollow').removeClass('u-btn-deeporange').addClass('btn-default')
            .html('<i class="if i-check"></i> 已关注');

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
        $this.attr('data-action', 'follow').removeClass('btn-default').addClass('u-btn-deeporange')
            .html('<i class="if i-plus"></i> 关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        buttonLock.release();
    });
});

/**
 * 用户关注
 */
$('[data-role="follow"]').on('click', '[data-action="follow"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    const buttonLock = lockButton($this);
    Util.request('user.follow', {'username': username}).done(function(response){
        $this.attr('data-action', 'unfollow').removeClass('u-btn-deeporange').addClass('btn-default')
            .html('<i class="if i-check"></i> 已关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        buttonLock.release();
    });
}).on('click', '[data-action="unfollow"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    const buttonLock = lockButton($this);
    Util.request('user.unfollow', {'username': username}).done(function(response){
        $this.attr('data-action', 'follow').removeClass('btn-default').addClass('u-btn-deeporange')
            .html('<i class="if i-plus"></i> 关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        buttonLock.release();
    });
});