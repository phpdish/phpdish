'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';



$('[data-role="follow"]').on('click', '[data-action="follow-user"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    Util.request('user.follow', {'username': username}).then(function(response){
        $this.attr('data-action', 'unfollow-user')
            .removeClass('btn-u btn-u-red')
            .addClass('btn btn-sm btn-default')
            .html('取消关注');
    }, function(response){
        Util.dialog.message(response.responseJSON.error).flash();
    });
}).on('click', '[data-action="unfollow-user"]', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    Util.request('user.unfollow', {'username': username}, function(response){
    });
});

