  'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';



$('[data-role="follow"]').on('click', '[data-action="follow-user"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    $this.addClass('disabled').attr('disabled', true);
    Util.request('user.follow', {'username': username}).done(function(response){
        $this.attr('data-action', 'unfollow-user')
            .removeClass('btn-u btn-u-red')
            .addClass('btn btn-default')
            .html('取消关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        $this.removeClass('disabled').attr('disabled', false);
    });
}).on('click', '[data-action="unfollow-user"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    $this.addClass('disabled').attr('disabled', true);
    Util.request('user.unfollow', {'username': username}).done(function(response){
        $this.attr('data-action', 'follow-user')
            .removeClass('btn btn-default')
            .addClass('btn-u btn-u-red')
            .html('<i class="if i-plus"></i> 关注');
    }).fail(function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    }).always(() => {
        $this.removeClass('disabled').attr('disabled', false);
    });
});

