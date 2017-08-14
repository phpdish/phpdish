'use strict';

import '../modules/common.js';
import Util from '../modules/util.js';



$('[data-action="follow-user"]').on('click', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    Util.request('user.follow', {'username': username}, function(response){
        console.log(response);
    });
});

$('[data-action="unfollow-user"]').on('click', function(){
    const $this = $(this);
    const username = $this.data('username') || $this.closest('[data-username]').data('username');
    Util.request('user.unfollow', {'username': username}, function(response){
        console.log(response);
    });
});

