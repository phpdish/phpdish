'use strict';

var Route = require('./route.js');
var Dialog = require('./dialog.js');

var token = 'fghxssfgrtgbds78ddsaadcff';
var authUser = 'api';

module.exports = {
    route: new Route(),
    request: function () {
        return this.route.request.apply(this.route, arguments);
    },
    dialog: new Dialog(),
    /**
     * hash的偏移高度
     * @param hash
     * @returns {*}
     */
    hashOffset: function(hash) {
        hash = hash ? hash : location.hash;
        var $hash = $(hash);
        if ($hash.length <= 0) {
            return null
        }
        var offset = $hash.offset().top;
        return offset;
    },
    /**
     * 页面滑行到hash节点
     * @param hash
     */
    goHash: function(hash) {
        var offset = this.hashOffset(hash);
        if (null !== offset) {
            $("html,body").animate({
                scrollTop: offset
            }, 800)
        }
    },
    htmlEncode: function(value) {
        return $("<div/>").text(value).html();
    },
    htmlDecode: function(value) {
        return $("<div/>").html(value).text();
    },
    getToken:function(){
        return token;
    },
    getAuthUser: function() {
        return authUser;
    }
};