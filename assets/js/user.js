'use strict';
require('module/common.js');
var util = require('module/util.js');

(function($){
    var container = $('#uclist').first();
    container = container || $('#content .entry-content');
    var page = 2;
    $('#loading').on('click', function(){
        var $this =  $(this);
        $this.attr('disabled', true);
        $this.html('加载更多...');
        $.get(window.window.resourceUrl, {"page":page}, function(data){
            if (data.length != 0) {
                container.append(data);
                $this.attr('disabled', false);
                page ++ ;
            } else {
                $this.remove();
                util.dialog.alert('已经没有更多内容');
            }
            $this.html('加载更多');
        })
    });
})($);