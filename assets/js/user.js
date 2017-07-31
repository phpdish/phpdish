'use strict';
// require('module/common.js');
var util = require('module/util.js');

$(function($){
    $('[data-role="follow-user"]').on('click', function(){
        var username = $(this).data('username');
        util.request('user.follow', {'username': username}, function(response){
            console.log(response);
        });
    });
});

