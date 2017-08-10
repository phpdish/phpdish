'use strict';

import util from './util.js';

function UserQuickNav($quickNavPanel, data){
    /**
     * 组合用户导航
     * @param navs
     * @returns {string}
     */
    this.combineUserNav = function(navs){
        let navInfo = '';
        _.forEach(navs, function(nav, key){
            navInfo += '<a href="' + nav.url + '" title="' + nav.text + '"><em>' + nav.text + "</em>";
            if(nav.num){
                navInfo += '(' + nav.num + ')';
            }
            navInfo += '</a>';
        });
        navInfo += '<a class="logout_url" href="' + util.route.getRoutePath('user.logout') + '" title="退出登录">&laquo;退出登录</a>';
        return navInfo;
    };

    this.init =  function(){
        const ucId = "#ucenterAvatar",
            hid = "#ucenterHome";
        const $userHome = $('<li  id="ucenterAvatar"><a id="ucenterHome"></a></li>');
        const $userHomeALink = $userHome.find('#ucenterHome');
        if(!data.user.id){
            $userHomeALink.attr({
                "title": data.user.welcome,
                "href": util.route.getRoutePath('user.login')
            });
        }else{
            const navInfo = this.combineUserNav(data.user.navs);
            $userHomeALink.attr({
                "title": data.user.username,
                "href": data.user.homepage
            }).css({
                "background-image": "url(" + util.htmlDecode(data.user.avatar) + ")"
            }).append('<div id="userInfoBox" class="floatBoxWrapper"><div class="floatBox"><a class="fn" href="' + data.user.homepage + '">' + data.user.username + "</a>" + navInfo + "</div></div>");
        }
        $quickNavPanel.prepend($userHome);
    };

    this.init();
}

export default UserQuickNav;