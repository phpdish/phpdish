'use strict';

import 'scrolltofixed';
import Util from './util.js';

//固定模块
(function($){
    //固定导航
    $('[data-role="navbar"]').scrollToFixed();
    $('[data-sticky]').scrollToFixed({
        marginTop: 60
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