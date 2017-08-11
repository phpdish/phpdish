'use strict';

import Route from './route.js';
import * as DialogFactory from './dialog.js';

const token = 'fghxssfgrtgbds78ddsaadcff';
const authUser = 'api';

export default {
    route: new Route(),
    request: function () {
        return this.route.request.apply(this.route, arguments);
    },
    dialog: DialogFactory,

    /**
     * hash的偏移高度
     * @param hash
     * @returns {*}
     */
    hashOffset: function(hash) {
        hash = hash ? hash : location.hash;
        const $hash = $(hash);
        if ($hash.length <= 0) {
            return null
        }
        return $hash.offset().top;
    },
    /**
     * 页面滑行到hash节点
     * @param hash
     */
    goHash: function(hash) {
        const offset = this.hashOffset(hash);
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