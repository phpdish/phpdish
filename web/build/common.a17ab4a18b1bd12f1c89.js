webpackJsonp([2],{

/***/ "./assets/modules/common-action.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var util = __webpack_require__("./assets/modules/util.js");
var $document = $(document);

//关注文章
(function () {
    var $savePost = $('[data-role="save-post"]');
    $savePost.on('click', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var postId = $this.data('post-id');
        util.request('post.favorite', postId, function (response) {
            if (response.code == 0) {
                util.dialog.msg(response.message);
                $this.html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
            } else {
                util.dialog.alert(response.message);
            }
            $this._lock = false;
        });
    });
})($);
//关注问题
(function () {
    var $saveQuestion = $('[data-role="save-question"]');
    $saveQuestion.on('click', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        var questionId = $saveQuestion.data('question-id');
        $this._lock = true;
        util.request('question.follow', questionId, function (response) {
            if (response.code == 0) {
                util.dialog.msg(response.message);
                $this.after('<button class="btn btn-default"><i class="fa fa-check"></i> 已关注</button>').remove();
            } else {
                util.dialog.alert(response.message);
            }
            $this._lock = false;
        });
    });
})($);
//取消关注问题
(function () {
    var $unsaveQuestion = $('[data-role="unsave-question"]');
    $unsaveQuestion.on('click', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        var questionId = $saveQuestion.data('question-id');
        $this._lock = true;
        util.dialog.confirm('确认取消收藏?', {}, function () {
            kernel.request('question.unfollow', questionId, function (response) {
                if (response.code == 0) {
                    util.dialog.msg(response.message);
                    $this.closest('li').fadeOut();
                } else {
                    util.dialog.alert(response.message);
                }
                $this._lock = false;
            });
        });
    });
})($);
//关注问题
(function () {
    $document.on('click', '[data-role="follow-topic"]', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var topicId = $this.data('topic-id');
        util.request('topic.follow', topicId, function (response) {
            if (response.code == 0) {
                util.dialog.msg(response.message, 2);
                $this.html('<i class="glyphicon glyphicon-ok"></i> 已关注').removeAttr('data-role');
            } else {
                util.dialog.alert(response.message, 2);
            }
        });
    });
})($);
//取消关注话题
(function () {
    var $unfollowTopic = $('[data-role="unfollow-topic"]');
    $unfollowTopic.on('click', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var topicId = $this.data('topic-id');
        util.dialog.confirm('确认取消收藏?', {}, function () {
            util.request('topic.unfollow', topicId, function (response) {
                if (response.code == 0) {
                    util.dialog.msg(response.message);
                    $this.closest('li').fadeOut();
                } else {
                    util.dialog.alert(response.message);
                }
            });
        });
    });
})($);
//关注用户
(function () {
    $document.on('click', '[data-role="follow-user"]', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var userId = $this.data('user-id');
        util.request('user.follow', userId, function (response) {
            if (response.code == 0) {
                var html = '<button class="btn btn-default btn-sm" data-rolow="unfollow-user" data-user-id="' + userId + '">取消关注</button>';
                $this.after(html).remove();
            } else {
                util.dialog.alert(response.message);
            }
        });
    });
})($);
//取消关注用户
(function () {
    $document.on('click', '[data-role="unfollow-user"]', function () {
        var $this = $(this);
        if ($this._lock) {
            return false;
        }
        $this._lock = true;
        var userId = $this.data('user-id');
        util.request('user.unfollow', userId, function (response) {
            if (response.code == 0) {
                var html = '<button class="btn-u btn-u-red" data-role="follow-user" data-user-id="' + userId + '"><i class="fa fa-plus"></i> 关注</button>';
                $this.after(html).remove();
            } else {
                util.dialog.alert(response.message);
            }
        });
    });
})($);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./assets/modules/common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, _) {

var util = __webpack_require__("./assets/modules/util.js");
var UserQuickNav = __webpack_require__("./assets/modules/user-quick-nav.js");
var scrollToFixed = __webpack_require__("./node_modules/_scrolltofixed@1.0.6@scrolltofixed/jquery-scrolltofixed.js");
//通用性操作
__webpack_require__("./assets/modules/common-action.js");

var $document = $(document);
var $window = $(window);

//验证码刷新
(function ($) {
    var captchaUrl = util.route.getRoutePath('captcha');
    $('[data-role="captcha"]').each(function () {
        var $this = $(this);
        var width = $this.attr('width');
        var height = $this.attr('height');
        var _captchaUrl = captchaUrl + '?width=' + width + '&height=' + height;
        if (!$this.attr('src')) {
            $this.attr('src', _captchaUrl);
        }
        if (!$this.attr('title')) {
            $this.attr('title', '点击更换验证码');
        }
        $this.on('click', function () {
            $this.attr('src', _captchaUrl + '&rc=' + Math.random());
        });
    });
})($);
//用户导航
(function ($) {
    $document.on('pageInit', function (event, response) {
        var $quickNavPanel = $('#float-nav-menu');
        new UserQuickNav($quickNavPanel, response.info);
        floatNav();
    });

    function floatNav() {
        var $main = $("#main"),
            $floatNav = $("#float-nav"),
            $menu = $floatNav.children("#float-nav-menu"),
            main_width = $main.width(),
            nav_width = $floatNav.width(),
            mtop = 0 - 50 - $menu.height() / 2;
        if (main_width + nav_width * 2 + 20 > $window.width()) {
            $floatNav.css({
                "left": "auto",
                "right": "10px",
                "margin-top": mtop,
                "margin-left": 0
            });
        } else {
            $floatNav.css({
                "left": "50%",
                "right": "auto",
                "margin-top": mtop,
                "margin-left": main_width / 2 + 10
            });
        }
        $menu.fadeIn();
    }
})($);

//固定模块
(function ($) {
    //固定导航
    $('[data-role="navbar"]').scrollToFixed();
    var $sidebar = $('#sidebar');
    $sidebar.children('aside').last().scrollToFixed({
        marginTop: 52
    });
})($);

//未读消息显示
(function ($) {
    $document.on('pageInit', function (event, response) {
        if (response.message.unReadMessageNum > 0) {
            $('[data-role="unread-msg-num"]').append('<span class="color-red">(' + response.message.unReadMessageNum + ')</span>');
        }
    });
})($);

//请求初始化数据
(function ($) {
    util.request('page.init', function (response) {
        $document.trigger('pageInit', response);
    });
})($);

//用户quick plate
(function ($) {
    var _userPlateDialogs = {};
    var timer;
    $('[data-plate]').on('mouseover', function () {
        //关闭所有的dialog
        _.forEach(_userPlateDialogs, function (dialog) {
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
            content: htmlContent
        });
        $(dialog.node).hover(function () {
            clearTimeout(timer);
        }, function () {
            dialog.close();
        });
        dialog.show($this[0]);
        util.request('user.plate', userId, function (html) {
            dialog.content(html);
        });
        _userPlateDialogs[userId] = dialog;
    }).on('mouseout', function () {
        var userId = $(this).data('id');
        if (typeof _userPlateDialogs[userId] != 'undefined') {
            timer = setTimeout(function () {
                _userPlateDialogs[userId].close();
            }, 500);
        }
    });
})($);

//滚动监听
(function ($) {
    //Go Up
    var $goTop = $("#goTop");
    function goUp() {
        if ($window.scrollTop() > $window.height() / 2) {
            if ($goTop.is(":hidden")) {
                $goTop.fadeIn();
            }
        } else {
            if ($goTop.is(":visible")) {
                $goTop.fadeOut();
            }
        }
    }
    //点击去页面头部
    $goTop.on('click', function (e) {
        var $this = $(this);
        if (e.target.id == $this.attr("id") || $(e.target).parent().attr("id") == $this.attr("id")) {
            $("html,body").animate({
                scrollTop: "0px"
            }, 800);
        }
    });
    //Go Comment
    var $goComment = $('#goComments');
    $goComment.on('click', function () {
        util.goHash("#comments");
    });
    //滚动监听显隐性
    $window.on('scroll', function () {
        goUp();
    });
})($);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),

/***/ "./assets/modules/dialog.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

var layer = __webpack_require__("./node_modules/_layer-dialog@2.1.0@layer-dialog/src/layer.js");
// require('layer-dialog/skin/layer.css');

function Dialog() {
    var _this = this;
    this.layer = layer;
    this.open = function (options) {
        options = _.merge({
            type: 3
        }, options);
        return layer.open(options);
    };

    /**
     * 提示层
     * @param message
     */
    this.msg = function (message) {
        return layer.msg(message);
    };
    this.alert = function (content, options, yes) {
        return layer.alert(content, options, yes);
    };
    /**
     * 询问层
     * @param content
     * @param options
     * @param yes
     * @param cancel
     * @returns {*}
     */
    this.confirm = function (content, options, yes, cancel) {
        return layer.confirm(content, options, yes, cancel);
    };

    /**
     * 等待
     * @returns {*}
     */
    this.wait = function () {
        return this.layer.load(1);
    };
    /**
     * 关闭dialog
     * @param index
     */
    this.close = function (index) {
        index ? this.layer.close(index) : this.layer.closeAll();
    };
}

module.exports = Dialog;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ "./assets/modules/route.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $ = __webpack_require__(0);

var routes = {
    'page.init': { path: '/pages/init', method: 'POST' }, //页面初始化
    'captcha': '/captcha', ///验证码
    'post.show': '/posts/{id}', //post展示页
    'post.summary': '/posts/summary/{id}', //post的概要信息
    'post.like': { path: '/posts/{id}/like', method: 'POST' },
    'post.unlike': { path: '/posts/{id}/unlike', method: 'POST' },
    'post.favorite': { path: '/posts/{id}/favorites', method: 'POST' },
    'post.analysis': '/posts/{id}/analysis',
    'comment.load': '/posts/{id}/comments',
    'comment.add': { path: '/posts/{id}/comments', 'method': 'POST' },
    'comment.like': { path: '/comments/{id}/like', method: 'POST' },
    'comment.unlike': { path: '/comments/{id}/unlike', method: 'POST' },
    'gift.exchange': { path: '/gifts/{id}/exchange', method: 'POST' },
    'gift.summary': { path: '/gifts/summary/{id}', method: 'POST' },
    'user.follow': { path: '/users/{id}/follow', method: 'POST' },
    'user.unfollow': { path: '/users/{id}/unfollow', method: 'POST' },
    'user.plate': '/users/{id}/plate',
    'user.login': '/users/login',
    'user.register': '/users/register',
    'user.logout': '/users/logout',
    'user.changeAvatar': { path: '/user/users/avatar', method: 'POST' },
    'topic.follow': { path: '/topics/{id}/follow', method: 'POST' },
    'topic.unfollow': { path: '/topics/{id}/unfollow', method: 'POST' },
    'question.follow': { path: '/questions/{id}/follow', method: 'POST' },
    'question.unfollow': { path: '/questions/{id}/unfollow', method: 'POST' },
    'questionReply.add': { path: '/question-replies/add/{questionId}', method: 'POST' }, //添加问题回复
    'question.add': { path: '/questions/add/{topicId}', method: 'POST' }, //添加问题
    'message.add': { path: '/user/messages/add', method: 'POST' }
};

function Route() {
    var _this = this;
    /**
     * name  路由名
     * requirements 占位符 参数id
     * parameters    data请求参数
     * options   对应ajax 的 options
     */
    this.request = function (name, requirements, parameters, options) {
        options = options || {};
        if (typeof requirements == 'function') {
            options.success = requirements;
            requirements = {};
            parameters = {};
        } else if (typeof parameters == 'function') {
            options.success = parameters;
            parameters = {};
        }
        var route = this.getRoute(name, requirements);
        $.extend(options, {
            url: route[0],
            type: route[1],
            data: parameters
        });
        return this.lastRequest = $.ajax(options);
    };
    this.getRoute = function (name, requirements) {
        if (typeof routes[name] != 'undefined') {
            var method, path;
            if (_typeof(routes[name]) == 'object') {
                path = routes[name].path;
                method = routes[name].method;
            } else {
                path = routes[name];
                method = 'GET';
            }
            if (typeof requirements != 'undefined') {
                if ((typeof requirements === 'undefined' ? 'undefined' : _typeof(requirements)) != 'object') {
                    requirements = { id: requirements };
                }
            } else {
                requirements = {};
            }
            $.each(requirements, function (i, n) {
                path = path.replace('{' + i + '}', n);
            });
            return [path, method];
        }
        return false;
    };

    this.getRoutePath = function (name, requirements) {
        if (typeof routes[name] != 'undefined') {
            var path;
            if (_typeof(routes[name]) == 'object') {
                path = routes[name].path;
            } else {
                path = routes[name];
            }
            if (typeof requirements != 'undefined') {
                if ((typeof requirements === 'undefined' ? 'undefined' : _typeof(requirements)) != 'object') {
                    requirements = { id: requirements };
                }
            } else {
                requirements = {};
            }
            $.each(requirements, function (i, n) {
                path = path.replace('{' + i + '}', n);
            });
            return path;
        }
        return false;
    };
}

module.exports = Route;

/***/ }),

/***/ "./assets/modules/user-quick-nav.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_, $) {

var util = __webpack_require__("./assets/modules/util.js");

function UserQuickNav($quickNavPanel, data) {
    /**
     * 组合用户导航
     * @param navs
     * @returns {string}
     */
    this.combineUserNav = function (navs) {
        var navInfo = '';
        _.forEach(navs, function (nav, key) {
            navInfo += '<a href="' + nav.url + '" title="' + nav.text + '"><em>' + nav.text + "</em>";
            if (nav.num) {
                navInfo += '(' + nav.num + ')';
            }
            navInfo += '</a>';
        });
        navInfo += '<a class="logout_url" href="' + util.route.getRoutePath('user.logout') + '" title="退出登录">&laquo;退出登录</a>';
        return navInfo;
    };

    this.init = function () {
        var ucId = "#ucenterAvatar",
            hid = "#ucenterHome";
        var $userHome = $('<li  id="ucenterAvatar"><a id="ucenterHome"></a></li>');
        var $userHomeALink = $userHome.find('#ucenterHome');
        if (!data.user.id) {
            $userHomeALink.attr({
                "title": data.user.welcome,
                "href": util.route.getRoutePath('user.login')
            });
        } else {
            var navInfo = this.combineUserNav(data.user.navs);
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

module.exports = UserQuickNav;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),

/***/ "./assets/modules/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var Route = __webpack_require__("./assets/modules/route.js");
var Dialog = __webpack_require__("./assets/modules/dialog.js");

var token = 'fghxssfgrtgbds78ddsaadcff';
var authUser = 'api';

module.exports = {
    route: new Route(),
    request: function request() {
        return this.route.request.apply(this.route, arguments);
    },
    dialog: new Dialog(),
    /**
     * hash的偏移高度
     * @param hash
     * @returns {*}
     */
    hashOffset: function hashOffset(hash) {
        hash = hash ? hash : location.hash;
        var $hash = $(hash);
        if ($hash.length <= 0) {
            return null;
        }
        var offset = $hash.offset().top;
        return offset;
    },
    /**
     * 页面滑行到hash节点
     * @param hash
     */
    goHash: function goHash(hash) {
        var offset = this.hashOffset(hash);
        if (null !== offset) {
            $("html,body").animate({
                scrollTop: offset
            }, 800);
        }
    },
    htmlEncode: function htmlEncode(value) {
        return $("<div/>").text(value).html();
    },
    htmlDecode: function htmlDecode(value) {
        return $("<div/>").html(value).text();
    },
    getToken: function getToken() {
        return token;
    },
    getAuthUser: function getAuthUser() {
        return authUser;
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./node_modules/_layer-dialog@2.1.0@layer-dialog/src/layer.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_RESULT__;﻿/*!

 @Name：layer v2.1 弹层组件
 @Author：贤心
 @Site：http://layer.layui.com
 @License：LGPL
        
 */

;!function(window, undefined){
"use strict";

var $, win, ready = {
    getPath: function(){
        var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
        if(script.getAttribute('merge')) return;
        return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }(),
    
    //屏蔽Enter触发弹层
    enter: function(e){
        if(e.keyCode === 13) e.preventDefault();
    },
    config: {}, end: {},
    btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],
    
    //五种原始层模式
    type: ['dialog', 'page', 'iframe', 'loading', 'tips']
};

//默认内置方法。
var layer = {
    v: '2.1',
    ie6: !!window.ActiveXObject&&!window.XMLHttpRequest,
    index: 0,
    path: ready.getPath,
    config: function(options, fn){
        var item = 0;
        options = options || {};
        layer.cache = ready.config = $.extend(ready.config, options);
        layer.path = ready.config.path || layer.path;
        typeof options.extend === 'string' && (options.extend = [options.extend]);
        layer.use('skin/layer.css', (options.extend && options.extend.length > 0) ? (function loop(){
            var ext = options.extend;
            layer.use(ext[ext[item] ? item : item-1], item < ext.length ? function(){
                ++item; 
                return loop;
            }() : fn);
        }()) : fn);
        return this;
    },
    
    //载入配件
    use: function(module, fn, readyMethod){
        var i = 0, head = $('head')[0];
        var module = module.replace(/\s/g, '');
        var iscss = /\.css$/.test(module);
        var node = document.createElement(iscss ? 'link' : 'script');
        var id = 'layui_layer_' + module.replace(/\.|\//g, '');
        if(!layer.path) return;
        if(iscss){
            node.rel = 'stylesheet';
        }
        node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : layer.path + module;
        node.id = id;
        if(!$('#'+ id)[0]){
            head.appendChild(node);
        }
        //轮询加载就绪
        ;(function poll() {
            ;(iscss ? parseInt($('#'+id).css('width')) === 1989 : layer[readyMethod||id]) ? function(){
                fn && fn();
                try { iscss || head.removeChild(node); } catch(e){};
            }() : setTimeout(poll, 100);
        }());
        return this;
    },
    
    ready: function(path, fn){
        var type = typeof path === 'function';
        if(type) fn = path;
        layer.config($.extend(ready.config, function(){
           return type ? {} : {path: path};
        }()), fn);
        return this;
    },
    
    //各种快捷引用
    alert: function(content, options, yes){
        var type = typeof options === 'function';
        if(type) yes = options;
        return layer.open($.extend({
            content: content,
            yes: yes
        }, type ? {} : options));
    }, 
    
    confirm: function(content, options, yes, cancel){ 
        var type = typeof options === 'function';
        if(type){
            cancel = yes;
            yes = options;
        }
        return layer.open($.extend({
            content: content,
            btn: ready.btn,
            yes: yes,
            cancel: cancel
        }, type ? {} : options));
    },
    
    msg: function(content, options, end){ //最常用提示层
        var type = typeof options === 'function', rskin = ready.config.skin;
        var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'layui-layer-msg';
        var shift = doms.anim.length - 1;
        if(type) end = options;
        return layer.open($.extend({
            content: content,
            time: 3000,
            shade: false,
            skin: skin,
            title: false,
            closeBtn: false,
            btn: false,
            end: end
        }, (type && !ready.config.skin) ? {
            skin: skin + ' layui-layer-hui',
            shift: shift
        } : function(){
           options = options || {};
           if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
               options.skin = skin + ' ' + (options.skin||'layui-layer-hui');
           }
           return options;
        }()));  
    },
    
    load: function(icon, options){
        return layer.open($.extend({
            type: 3,
            icon: icon || 0,
            shade: 0.01
        }, options));
    }, 
    
    tips: function(content, follow, options){
        return layer.open($.extend({
            type: 4,
            content: [content, follow],
            closeBtn: false,
            time: 3000,
            maxWidth: 210
        }, options));
    }
};

var Class = function(setings){    
    var that = this;
    that.index = ++layer.index;
    that.config = $.extend({}, that.config, ready.config, setings);
    that.creat();
};

Class.pt = Class.prototype;

//缓存常用字符
var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
doms.anim = ['layui-anim', 'layui-anim-01', 'layui-anim-02', 'layui-anim-03', 'layui-anim-04', 'layui-anim-05', 'layui-anim-06'];

//默认配置
Class.pt.config = {
    type: 0,
    shade: 0.3,
    fix: true,
    move: doms[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0, //0表示不自动关闭
    zIndex: 19891014, 
    maxWidth: 360,
    shift: 0,
    icon: -1,
    scrollbar: true, //是否允许浏览器滚动条
    tips: 2
};

//容器
Class.pt.vessel = function(conType, callback){
    var that = this, times = that.index, config = that.config;
    var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
    var ismax = config.maxmin && (config.type === 1 || config.type === 2);
    var titleHTML = (config.title ? '<div class="layui-layer-title" style="'+ (titype ? config.title[1] : '') +'">' 
        + (titype ? config.title[0] : config.title) 
    + '</div>' : '');
    
    config.zIndex = zIndex;
    callback([
        //遮罩
        config.shade ? ('<div class="layui-layer-shade" id="layui-layer-shade'+ times +'" times="'+ times +'" style="'+ ('z-index:'+ (zIndex-1) +'; background-color:'+ (config.shade[1]||'#000') +'; opacity:'+ (config.shade[0]||config.shade) +'; filter:alpha(opacity='+ (config.shade[0]*100||config.shade*100) +');') +'"></div>') : '',
        
        //主体
        '<div class="'+ doms[0] +' '+ (doms.anim[config.shift]||'') + (' layui-layer-'+ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin||'') +'" id="'+ doms[0] + times +'" type="'+ ready.type[config.type] +'" times="'+ times +'" showtime="'+ config.time +'" conType="'+ (conType ? 'object' : 'string') +'" style="z-index: '+ zIndex +'; width:'+ config.area[0] + ';height:' + config.area[1] + (config.fix ? '' : ';position:absolute;') +'">'
            + (conType && config.type != 2 ? '' : titleHTML)
            +'<div class="layui-layer-content'+ ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' :'') + (config.type == 3 ? ' layui-layer-loading'+config.icon : '') +'">'
                + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico'+ config.icon +'"></i>' : '')
                + (config.type == 1 && conType ? '' : (config.content||''))
            +'</div>'
            + '<span class="layui-layer-setwin">'+ function(){
                var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="layui-layer-ico '+ doms[7] +' '+ doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) +'" href="javascript:;"></a>');
                return closebtn;
            }() + '</span>'
            + (config.btn ? function(){
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for(var i = 0, len = config.btn.length; i < len; i++){
                    button += '<a class="'+ doms[6] +''+ i +'">'+ config.btn[i] +'</a>'
                }
                return '<div class="'+ doms[6] +'">'+ button +'</div>'
            }() : '')
        +'</div>'
    ], titleHTML);
    return that;
};

//创建骨架
Class.pt.creat = function(){
    var that = this, config = that.config, times = that.index, nodeIndex;
    var content = config.content, conType = typeof content === 'object';
    
    if(typeof config.area === 'string'){
        config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
    }
    
    switch(config.type){
        case 0:
            config.btn = ('btn' in config) ? config.btn : ready.btn[0];
            layer.closeAll('dialog');
        break;
        case 2:
            var content = config.content = conType ? config.content : [config.content||'http://layer.layui.com', 'auto'];
            config.content = '<iframe scrolling="'+ (config.content[1]||'auto') +'" allowtransparency="true" id="'+ doms[4] +''+ times +'" name="'+ doms[4] +''+ times +'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
        case 3:
            config.title = false;
            config.closeBtn = false;
            config.icon === -1 && (config.icon === 0);
            layer.closeAll('loading');
        break;
        case 4:
            conType || (config.content = [config.content, 'body']);
            config.follow = config.content[1];
            config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
            config.title = false;
            config.shade = false;
            config.fix = false;
            config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
            config.tipsMore || layer.closeAll('tips');
        break;
    }
    
    //建立容器
    that.vessel(conType, function(html, titleHTML){
        $('body').append(html[0]);
        conType ? function(){
            (config.type == 2 || config.type == 4) ? function(){
                $('body').append(html[1]);
            }() : function(){
                if(!content.parents('.'+doms[0])[0]){
                    content.show().addClass('layui-layer-wrap').wrap(html[1]);
                    $('#'+ doms[0] + times).find('.'+doms[5]).before(titleHTML);
                }
            }();
        }() : $('body').append(html[1]);
        that.layero = $('#'+ doms[0] + times);
        config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
    }).auto(times);

    config.type == 2 && layer.ie6 && that.layero.find('iframe').attr('src', content[0]);
    $(document).off('keydown', ready.enter).on('keydown', ready.enter);
    that.layero.on('keydown', function(e){
        $(document).off('keydown', ready.enter);
    });

    //坐标自适应浏览器窗口尺寸
    config.type == 4 ? that.tips() : that.offset();
    if(config.fix){
        win.on('resize', function(){
            that.offset();
            (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
            config.type == 4 && that.tips();
        });
    }
    
    config.time <= 0 || setTimeout(function(){
        layer.close(that.index)
    }, config.time);
    that.move().callback();
};

//自适应
Class.pt.auto = function(index){
    var that = this, config = that.config, layero = $('#'+ doms[0] + index);
    if(config.area[0] === '' && config.maxWidth > 0){
        //为了修复IE7下一个让人难以理解的bug
        if(/MSIE 7/.test(navigator.userAgent) && config.btn){
            layero.width(layero.innerWidth());
        }
        layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }
    var area = [layero.innerWidth(), layero.innerHeight()];
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    function setHeight(elem){
        elem = layero.find(elem);
        elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding'))|0));
    }
    switch(config.type){
        case 2: 
            setHeight('iframe');
        break;
        default:
            if(config.area[1] === ''){
                if(config.fix && area[1] >= win.height()){
                    area[1] = win.height();
                    setHeight('.'+doms[5]);
                }
            } else {
                setHeight('.'+doms[5]);
            }
        break;
    }
    return that;
};

//计算坐标
Class.pt.offset = function(){
    var that = this, config = that.config, layero = that.layero;
    var area = [layero.outerWidth(), layero.outerHeight()];
    var type = typeof config.offset === 'object';
    that.offsetTop = (win.height() - area[1])/2;
    that.offsetLeft = (win.width() - area[0])/2;
    if(type){
        that.offsetTop = config.offset[0];
        that.offsetLeft = config.offset[1]||that.offsetLeft;
    } else if(config.offset !== 'auto'){
        that.offsetTop = config.offset;
        if(config.offset === 'rb'){ //右下角
            that.offsetTop = win.height() - area[1];
            that.offsetLeft = win.width() - area[0];
        }
    }
    if(!config.fix){
        that.offsetTop = /%$/.test(that.offsetTop) ? 
            win.height()*parseFloat(that.offsetTop)/100
        : parseFloat(that.offsetTop);
        that.offsetLeft = /%$/.test(that.offsetLeft) ? 
            win.width()*parseFloat(that.offsetLeft)/100
        : parseFloat(that.offsetLeft);
        that.offsetTop += win.scrollTop();
        that.offsetLeft += win.scrollLeft();
    }
    layero.css({top: that.offsetTop, left: that.offsetLeft});
};

//Tips
Class.pt.tips = function(){
    var that = this, config = that.config, layero = that.layero;
    var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
    if(!follow[0]) follow = $('body');
    var goal = {
        width: follow.outerWidth(),
        height: follow.outerHeight(),
        top: follow.offset().top,
        left: follow.offset().left
    }, tipsG = layero.find('.layui-layer-TipsG');
    
    var guide = config.tips[0];
    config.tips[1] || tipsG.remove();
    
    goal.autoLeft = function(){
        if(goal.left + layArea[0] - win.width() > 0){
            goal.tipLeft = goal.left + goal.width - layArea[0];
            tipsG.css({right: 12, left: 'auto'});
        } else {
            goal.tipLeft = goal.left;
        };
    };
    
    //辨别tips的方位
    goal.where = [function(){ //上                
        goal.autoLeft();
        goal.tipTop = goal.top - layArea[1] - 10;
        tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
    }, function(){ //右
        goal.tipLeft = goal.left + goal.width + 10;
        goal.tipTop = goal.top;
        tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]); 
    }, function(){ //下
        goal.autoLeft();
        goal.tipTop = goal.top + goal.height + 10;
        tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
    }, function(){ //左
        goal.tipLeft = goal.left - layArea[0] - 10;
        goal.tipTop = goal.top;
        tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
    }];
    goal.where[guide-1]();
    
    /* 8*2为小三角形占据的空间 */
    if(guide === 1){
        goal.top - (win.scrollTop() + layArea[1] + 8*2) < 0 && goal.where[2]();
    } else if(guide === 2){
        win.width() - (goal.left + goal.width + layArea[0] + 8*2) > 0 || goal.where[3]()
    } else if(guide === 3){
        (goal.top - win.scrollTop() + goal.height + layArea[1] + 8*2) - win.height() > 0 && goal.where[0]();
    } else if(guide === 4){
       layArea[0] + 8*2 - goal.left > 0 && goal.where[1]()
    }

    layero.find('.'+doms[5]).css({
        'background-color': config.tips[1], 
        'padding-right': (config.closeBtn ? '30px' : '')
    });
    layero.css({left: goal.tipLeft, top: goal.tipTop});
}

//拖拽层
Class.pt.move = function(){
    var that = this, config = that.config, conf = {
        setY: 0,
        moveLayer: function(){
            var layero = conf.layero, mgleft = parseInt(layero.css('margin-left'));
            var lefts = parseInt(conf.move.css('left'));
            mgleft === 0 || (lefts = lefts - mgleft);
            if(layero.css('position') !== 'fixed'){
                lefts = lefts - layero.parent().offset().left;
                conf.setY = 0;
            }
            layero.css({left: lefts, top: parseInt(conf.move.css('top')) - conf.setY});
        }
    };
    
    var movedom = that.layero.find(config.move);
    config.move && movedom.attr('move', 'ok');
    movedom.css({cursor: config.move ? 'move' : 'auto'});
    
    $(config.move).on('mousedown', function(M){    
        M.preventDefault();
        if($(this).attr('move') === 'ok'){
            conf.ismove = true;
            conf.layero = $(this).parents('.'+ doms[0]);
            var xx = conf.layero.offset().left, yy = conf.layero.offset().top, ww = conf.layero.outerWidth() - 6, hh = conf.layero.outerHeight() - 6;
            if(!$('#layui-layer-moves')[0]){
                $('body').append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+ xx +'px; top:'+ yy +'px; width:'+ ww +'px; height:'+ hh +'px; z-index:2147483584"></div>');
            }
            conf.move = $('#layui-layer-moves');
            config.moveType && conf.move.css({visibility: 'hidden'});
           
            conf.moveX = M.pageX - conf.move.position().left;
            conf.moveY = M.pageY - conf.move.position().top;
            conf.layero.css('position') !== 'fixed' || (conf.setY = win.scrollTop());
        }
    });
    
    $(document).mousemove(function(M){
        if(conf.ismove){
            var offsetX = M.pageX - conf.moveX, offsetY = M.pageY - conf.moveY;
            M.preventDefault();

            //控制元素不被拖出窗口外
            if(!config.moveOut){
                conf.setY = win.scrollTop();
                var setRig = win.width() - conf.move.outerWidth(), setTop = conf.setY;               
                offsetX < 0 && (offsetX = 0);
                offsetX > setRig && (offsetX = setRig); 
                offsetY < setTop && (offsetY = setTop);
                offsetY > win.height() - conf.move.outerHeight() + conf.setY && (offsetY = win.height() - conf.move.outerHeight() + conf.setY);
            }
            
            conf.move.css({left: offsetX, top: offsetY});    
            config.moveType && conf.moveLayer();
            
            offsetX = offsetY = setRig = setTop = null;
        }                                                 
    }).mouseup(function(){
        try{
            if(conf.ismove){
                conf.moveLayer();
                conf.move.remove();
                config.moveEnd && config.moveEnd();
            }
            conf.ismove = false;
        }catch(e){
            conf.ismove = false;
        }
    });
    return that;
};

Class.pt.callback = function(){
    var that = this, layero = that.layero, config = that.config;
    that.openLayer();
    if(config.success){
        if(config.type == 2){
            layero.find('iframe').on('load', function(){
                config.success(layero, that.index);
            });
        } else {
            config.success(layero, that.index);
        }
    }
    layer.ie6 && that.IE6(layero);
    
    //按钮
    layero.find('.'+ doms[6]).children('a').on('click', function(){
        var index = $(this).index();
        config['btn'+(index+1)] && config['btn'+(index+1)](that.index, layero);
        if(index === 0){
            config.yes ? config.yes(that.index, layero) : layer.close(that.index);
        } else if(index === 1){
            cancel();
        } else {
            config['btn'+(index+1)] || layer.close(that.index);
        }
    });
    
    //取消
    function cancel(){
        var close = config.cancel && config.cancel(that.index);
        close === false || layer.close(that.index);
    }
    
    //右上角关闭回调
    layero.find('.'+ doms[7]).on('click', cancel);
    
    //点遮罩关闭
    if(config.shadeClose){
        $('#layui-layer-shade'+ that.index).on('click', function(){
            layer.close(that.index);
        });
    } 
    
    //最小化
    layero.find('.layui-layer-min').on('click', function(){
        layer.min(that.index, config);
        config.min && config.min(layero);
    });
    
    //全屏/还原
    layero.find('.layui-layer-max').on('click', function(){
        if($(this).hasClass('layui-layer-maxmin')){
            layer.restore(that.index);
            config.restore && config.restore(layero);
        } else {
            layer.full(that.index, config);
            config.full && config.full(layero);
        }
    });

    config.end && (ready.end[that.index] = config.end);
};

//for ie6 恢复select
ready.reselect = function(){
    $.each($('select'), function(index , value){
        var sthis = $(this);
        if(!sthis.parents('.'+doms[0])[0]){
            (sthis.attr('layer') == 1 && $('.'+doms[0]).length < 1) && sthis.removeAttr('layer').show(); 
        }
        sthis = null;
    });
}; 

Class.pt.IE6 = function(layero){
    var that = this, _ieTop = layero.offset().top;
    
    //ie6的固定与相对定位
    function ie6Fix(){
        layero.css({top : _ieTop + (that.config.fix ? win.scrollTop() : 0)});
    };
    ie6Fix();
    win.scroll(ie6Fix);

    //隐藏select
    $('select').each(function(index , value){
        var sthis = $(this);
        if(!sthis.parents('.'+doms[0])[0]){
            sthis.css('display') === 'none' || sthis.attr({'layer' : '1'}).hide();
        }
        sthis = null;
    });
};

//需依赖原型的对外方法
Class.pt.openLayer = function(){
    var that = this;
    
    //置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function(layero){
        var setZindex = function(){
            layer.zIndex++;
            layero.css('z-index', layer.zIndex + 1);
        };
        layer.zIndex = parseInt(layero[0].style.zIndex);
        layero.on('mousedown', setZindex);
        return layer.zIndex;
    };
};

ready.record = function(layero){
    var area = [
        layero.outerWidth(),
        layero.outerHeight(),
        layero.position().top, 
        layero.position().left + parseFloat(layero.css('margin-left'))
    ];
    layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
    layero.attr({area: area});
};

ready.rescollbar = function(index){
    if(doms.html.attr('layer-full') == index){
        if(doms.html[0].style.removeProperty){
            doms.html[0].style.removeProperty('overflow');
        } else {
            doms.html[0].style.removeAttribute('overflow');
        }
        doms.html.removeAttr('layer-full');
    }
};

/** 内置成员 */

window.layer = layer;

//获取子iframe的DOM
layer.getChildFrame = function(selector, index){
    index = index || $('.'+doms[4]).attr('times');
    return $('#'+ doms[0] + index).find('iframe').contents().find(selector);    
};

//得到当前iframe层的索引，子iframe时使用
layer.getFrameIndex = function(name){
    return $('#'+ name).parents('.'+doms[4]).attr('times');
};

//iframe层自适应宽高
layer.iframeAuto = function(index){
    if(!index) return;
    var heg = layer.getChildFrame('html', index).outerHeight();
    var layero = $('#'+ doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    layero.css({height: heg + titHeight + btnHeight});
    layero.find('iframe').css({height: heg});
};

//重置iframe url
layer.iframeSrc = function(index, url){
    $('#'+ doms[0] + index).find('iframe').attr('src', url);
};

//设定层的样式
layer.style = function(index, options){
    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    if(type === ready.type[1] || type === ready.type[2]){
        layero.css(options);
        if(type === ready.type[2]){
            layero.find('iframe').css({
                height: parseFloat(options.height) - titHeight - btnHeight
            });
        }
    }
};

//最小化
layer.min = function(index, options){
    var layero = $('#'+ doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    ready.record(layero);
    layer.style(index, {width: 180, height: titHeight, overflow: 'hidden'});
    layero.find('.layui-layer-min').hide();
    layero.attr('type') === 'page' && layero.find(doms[4]).hide();
    ready.rescollbar(index);
};

//还原
layer.restore = function(index){
    var layero = $('#'+ doms[0] + index), area = layero.attr('area').split(',');
    var type = layero.attr('type');
    layer.style(index, {
        width: parseFloat(area[0]), 
        height: parseFloat(area[1]), 
        top: parseFloat(area[2]), 
        left: parseFloat(area[3]),
        overflow: 'visible'
    });
    layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
    layero.find('.layui-layer-min').show();
    layero.attr('type') === 'page' && layero.find(doms[4]).show();
    ready.rescollbar(index);
};

//全屏
layer.full = function(index){
    var layero = $('#'+ doms[0] + index), timer;
    ready.record(layero);
    if(!doms.html.attr('layer-full')){
        doms.html.css('overflow','hidden').attr('layer-full', index);
    }
    clearTimeout(timer);
    timer = setTimeout(function(){
        var isfix = layero.css('position') === 'fixed';
        layer.style(index, {
             top: isfix ? 0 : win.scrollTop(),
             left: isfix ? 0 : win.scrollLeft(),
             width: win.width(),
             height: win.height()
        });
        layero.find('.layui-layer-min').hide();
    }, 100);
};

//改变title
layer.title = function(name, index){
    var title = $('#'+ doms[0] + (index||layer.index)).find(doms[1]);
    title.html(name);
};

//关闭layer总方法
layer.close = function(index){
    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
    if(!layero[0]) return;
    if(type === ready.type[1] && layero.attr('conType') === 'object'){
        layero.children(':not(.'+ doms[5] +')').remove();
        for(var i = 0; i < 2; i++){
            layero.find('.layui-layer-wrap').unwrap().hide();
        }
    } else {
        //低版本IE 回收 iframe
        if(type === ready.type[2]){
            try {
                var iframe = $('#'+doms[4]+index)[0];
                iframe.contentWindow.document.write('');
                iframe.contentWindow.close();
                layero.find('.'+doms[5])[0].removeChild(iframe);
            } catch(e){}
        }
        layero[0].innerHTML = '';
        layero.remove();
    }
    $('#layui-layer-moves, #layui-layer-shade' + index).remove();
    layer.ie6 && ready.reselect();
    ready.rescollbar(index);
    $(document).off('keydown', ready.enter);
    typeof ready.end[index] === 'function' && ready.end[index]();
    delete ready.end[index]; 
};

//关闭所有层
layer.closeAll = function(type){
    $.each($('.'+doms[0]), function(){
        var othis = $(this);
        var is = type ? (othis.attr('type') === type) : 1;
        is && layer.close(othis.attr('times'));
        is = null;
    });
};

//主入口
ready.run = function(){
    $ = jQuery; 
    win = $(window);
    doms.html = $('html');
    layer.open = function(deliver){
        var o = new Class(deliver);
        return o.index;
    };
};

 true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
    ready.run();
    return layer;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : function(){
   ready.run();
   layer.use('skin/layer.css');
}();

}(window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./node_modules/_scrolltofixed@1.0.6@scrolltofixed/jquery-scrolltofixed.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*
 * ScrollToFixed
 * https://github.com/bigspotteddog/ScrollToFixed
 * 
 * Copyright (c) 2011 Joseph Cava-Lynch
 * MIT license
 */
(function($) {
    $.isScrollToFixed = function(el) {
        return !!$(el).data('ScrollToFixed');
    };

    $.ScrollToFixed = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this
        // class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element.
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object.
        base.$el.data('ScrollToFixed', base);

        // A flag so we know if the scroll has been reset.
        var isReset = false;

        // The element that was given to us to fix if scrolled above the top of
        // the page.
        var target = base.$el;

        var position;
        var originalPosition;
        var originalOffsetTop;
        var originalZIndex;

        // The offset top of the element when resetScroll was called. This is
        // used to determine if we have scrolled past the top of the element.
        var offsetTop = 0;

        // The offset left of the element when resetScroll was called. This is
        // used to move the element left or right relative to the horizontal
        // scroll.
        var offsetLeft = 0;
        var originalOffsetLeft = -1;

        // This last offset used to move the element horizontally. This is used
        // to determine if we need to move the element because we would not want
        // to do that for no reason.
        var lastOffsetLeft = -1;

        // This is the element used to fill the void left by the target element
        // when it goes fixed; otherwise, everything below it moves up the page.
        var spacer = null;

        var spacerClass;

        var className;

        // Capture the original offsets for the target element. This needs to be
        // called whenever the page size changes or when the page is first
        // scrolled. For some reason, calling this before the page is first
        // scrolled causes the element to become fixed too late.
        function resetScroll() {
            // Set the element to it original positioning.
            target.trigger('preUnfixed.ScrollToFixed');
            setUnfixed();
            target.trigger('unfixed.ScrollToFixed');

            // Reset the last offset used to determine if the page has moved
            // horizontally.
            lastOffsetLeft = -1;

            // Capture the offset top of the target element.
            offsetTop = target.offset().top;

            // Capture the offset left of the target element.
            offsetLeft = target.offset().left;

            // If the offsets option is on, alter the left offset.
            if (base.options.offsets) {
                offsetLeft += (target.offset().left - target.position().left);
            }

            if (originalOffsetLeft == -1) {
                originalOffsetLeft = offsetLeft;
            }

            position = target.css('position');

            // Set that this has been called at least once.
            isReset = true;

            if (base.options.bottom != -1) {
                target.trigger('preFixed.ScrollToFixed');
                setFixed();
                target.trigger('fixed.ScrollToFixed');
            }
        }

        function getLimit() {
            var limit = base.options.limit;
            if (!limit) return 0;

            if (typeof(limit) === 'function') {
                return limit.apply(target);
            }
            return limit;
        }

        // Returns whether the target element is fixed or not.
        function isFixed() {
            return position === 'fixed';
        }

        // Returns whether the target element is absolute or not.
        function isAbsolute() {
            return position === 'absolute';
        }

        function isUnfixed() {
            return !(isFixed() || isAbsolute());
        }

        // Sets the target element to fixed. Also, sets the spacer to fill the
        // void left by the target element.
        function setFixed() {
            // Only fix the target element and the spacer if we need to.
            if (!isFixed()) {
                // Set the spacer to fill the height and width of the target
                // element, then display it.
                spacer.css({
                    'display' : target.css('display'),
                    'width' : target.outerWidth(true),
                    'height' : target.outerHeight(true),
                    'float' : target.css('float')
                });

                // Set the target element to fixed and set its width so it does
                // not fill the rest of the page horizontally. Also, set its top
                // to the margin top specified in the options.

                cssOptions={
                    'z-index' : base.options.zIndex,
                    'position' : 'fixed',
                    'top' : base.options.bottom == -1?getMarginTop():'',
                    'bottom' : base.options.bottom == -1?'':base.options.bottom,
                    'margin-left' : '0px'
                }
                if (!base.options.dontSetWidth){ cssOptions['width']=target.css('width'); };

                target.css(cssOptions);
                
                target.addClass(base.options.baseClassName);
                
                if (base.options.className) {
                    target.addClass(base.options.className);
                }

                position = 'fixed';
            }
        }

        function setAbsolute() {

            var top = getLimit();
            var left = offsetLeft;

            if (base.options.removeOffsets) {
                left = '';
                top = top - offsetTop;
            }

            cssOptions={
              'position' : 'absolute',
              'top' : top,
              'left' : left,
              'margin-left' : '0px',
              'bottom' : ''
            }
            if (!base.options.dontSetWidth){ cssOptions['width']=target.css('width'); };

            target.css(cssOptions);

            position = 'absolute';
        }

        // Sets the target element back to unfixed. Also, hides the spacer.
        function setUnfixed() {
            // Only unfix the target element and the spacer if we need to.
            if (!isUnfixed()) {
                lastOffsetLeft = -1;

                // Hide the spacer now that the target element will fill the
                // space.
                spacer.css('display', 'none');

                // Remove the style attributes that were added to the target.
                // This will reverse the target back to the its original style.
                target.css({
                    'z-index' : originalZIndex,
                    'width' : '',
                    'position' : originalPosition,
                    'left' : '',
                    'top' : originalOffsetTop,
                    'margin-left' : ''
                });

                target.removeClass('scroll-to-fixed-fixed');

                if (base.options.className) {
                    target.removeClass(base.options.className);
                }

                position = null;
            }
        }

        // Moves the target element left or right relative to the horizontal
        // scroll position.
        function setLeft(x) {
            // Only if the scroll is not what it was last time we did this.
            if (x != lastOffsetLeft) {
                // Move the target element horizontally relative to its original
                // horizontal position.
                target.css('left', offsetLeft - x);

                // Hold the last horizontal position set.
                lastOffsetLeft = x;
            }
        }

        function getMarginTop() {
            var marginTop = base.options.marginTop;
            if (!marginTop) return 0;

            if (typeof(marginTop) === 'function') {
                return marginTop.apply(target);
            }
            return marginTop;
        }

        // Checks to see if we need to do something based on new scroll position
        // of the page.
        function checkScroll() {
            if (!$.isScrollToFixed(target)) return;
            var wasReset = isReset;

            // If resetScroll has not yet been called, call it. This only
            // happens once.
            if (!isReset) {
                resetScroll();
            } else if (isUnfixed()) {
                // if the offset has changed since the last scroll,
                // we need to get it again.

                // Capture the offset top of the target element.
                offsetTop = target.offset().top;

                // Capture the offset left of the target element.
                offsetLeft = target.offset().left;
            }

            // Grab the current horizontal scroll position.
            var x = $(window).scrollLeft();

            // Grab the current vertical scroll position.
            var y = $(window).scrollTop();

            // Get the limit, if there is one.
            var limit = getLimit();

            // If the vertical scroll position, plus the optional margin, would
            // put the target element at the specified limit, set the target
            // element to absolute.
            if (base.options.minWidth && $(window).width() < base.options.minWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.maxWidth && $(window).width() > base.options.maxWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.bottom == -1) {
                // If the vertical scroll position, plus the optional margin, would
                // put the target element at the specified limit, set the target
                // element to absolute.
                if (limit > 0 && y >= limit - getMarginTop()) {
                    if (!isAbsolute() || !wasReset) {
                        postPosition();
                        target.trigger('preAbsolute.ScrollToFixed');
                        setAbsolute();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                // If the vertical scroll position, plus the optional margin, would
                // put the target element above the top of the page, set the target
                // element to fixed.
                } else if (y >= offsetTop - getMarginTop()) {
                    if (!isFixed() || !wasReset) {
                        postPosition();
                        target.trigger('preFixed.ScrollToFixed');

                        // Set the target element to fixed.
                        setFixed();

                        // Reset the last offset left because we just went fixed.
                        lastOffsetLeft = -1;

                        target.trigger('fixed.ScrollToFixed');
                    }
                    // If the page has been scrolled horizontally as well, move the
                    // target element accordingly.
                    setLeft(x);
                } else {
                    // Set the target element to unfixed, placing it where it was
                    // before.
                    if (!isUnfixed() || !wasReset) {
                        postPosition();
                        target.trigger('preUnfixed.ScrollToFixed');
                        setUnfixed();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                }
            } else {
                if (limit > 0) {
                    if (y + $(window).height() - target.outerHeight(true) >= limit - (getMarginTop() || -getBottom())) {
                        if (isFixed()) {
                            postPosition();
                            target.trigger('preUnfixed.ScrollToFixed');

                            if (originalPosition === 'absolute') {
                                setAbsolute();
                            } else {
                                setUnfixed();
                            }

                            target.trigger('unfixed.ScrollToFixed');
                        }
                    } else {
                        if (!isFixed()) {
                            postPosition();
                            target.trigger('preFixed.ScrollToFixed');
                            setFixed();
                        }
                        setLeft(x);
                        target.trigger('fixed.ScrollToFixed');
                    }
                } else {
                    setLeft(x);
                }
            }
        }

        function getBottom() {
            if (!base.options.bottom) return 0;
            return base.options.bottom;
        }

        function postPosition() {
            var position = target.css('position');

            if (position == 'absolute') {
                target.trigger('postAbsolute.ScrollToFixed');
            } else if (position == 'fixed') {
                target.trigger('postFixed.ScrollToFixed');
            } else {
                target.trigger('postUnfixed.ScrollToFixed');
            }
        }

        var windowResize = function(event) {
            // Check if the element is visible before updating it's position, which
            // improves behavior with responsive designs where this element is hidden.
            if(target.is(':visible')) {
                isReset = false;
                checkScroll();
            }
        }

        var windowScroll = function(event) {
            (!!window.requestAnimationFrame) ? requestAnimationFrame(checkScroll) : checkScroll();
        }

        // From: http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED
        var isPositionFixedSupported = function() {
            var container = document.body;

            if (document.createElement && container && container.appendChild && container.removeChild) {
                var el = document.createElement('div');

                if (!el.getBoundingClientRect) return null;

                el.innerHTML = 'x';
                el.style.cssText = 'position:fixed;top:100px;';
                container.appendChild(el);

                var originalHeight = container.style.height,
                originalScrollTop = container.scrollTop;

                container.style.height = '3000px';
                container.scrollTop = 500;

                var elementTop = el.getBoundingClientRect().top;
                container.style.height = originalHeight;

                var isSupported = (elementTop === 100);
                container.removeChild(el);
                container.scrollTop = originalScrollTop;

                return isSupported;
            }

            return null;
        }

        var preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        // Initializes this plugin. Captures the options passed in, turns this
        // off for devices that do not support fixed position, adds the spacer,
        // and binds to the window scroll and resize events.
        base.init = function() {
            // Capture the options for this plugin.
            base.options = $.extend({}, $.ScrollToFixed.defaultOptions, options);

            originalZIndex = target.css('z-index')

            // Turn off this functionality for devices that do not support it.
            // if (!(base.options && base.options.dontCheckForPositionFixedSupport)) {
            //     var fixedSupported = isPositionFixedSupported();
            //     if (!fixedSupported) return;
            // }

            // Put the target element on top of everything that could be below
            // it. This reduces flicker when the target element is transitioning
            // to fixed.
            base.$el.css('z-index', base.options.zIndex);

            // Create a spacer element to fill the void left by the target
            // element when it goes fixed.
            spacer = $('<div />');

            position = target.css('position');
            originalPosition = target.css('position');

            originalOffsetTop = target.css('top');

            // Place the spacer right after the target element.
            if (isUnfixed()) base.$el.after(spacer);

            // Reset the target element offsets when the window is resized, then
            // check to see if we need to fix or unfix the target element.
            $(window).bind('resize.ScrollToFixed', windowResize);

            // When the window scrolls, check to see if we need to fix or unfix
            // the target element.
            $(window).bind('scroll.ScrollToFixed', windowScroll);

            // For touch devices, call checkScroll directlly rather than
            // rAF wrapped windowScroll to animate the element
            if ('ontouchmove' in window) {
              $(window).bind('touchmove.ScrollToFixed', checkScroll);
            }

            if (base.options.preFixed) {
                target.bind('preFixed.ScrollToFixed', base.options.preFixed);
            }
            if (base.options.postFixed) {
                target.bind('postFixed.ScrollToFixed', base.options.postFixed);
            }
            if (base.options.preUnfixed) {
                target.bind('preUnfixed.ScrollToFixed', base.options.preUnfixed);
            }
            if (base.options.postUnfixed) {
                target.bind('postUnfixed.ScrollToFixed', base.options.postUnfixed);
            }
            if (base.options.preAbsolute) {
                target.bind('preAbsolute.ScrollToFixed', base.options.preAbsolute);
            }
            if (base.options.postAbsolute) {
                target.bind('postAbsolute.ScrollToFixed', base.options.postAbsolute);
            }
            if (base.options.fixed) {
                target.bind('fixed.ScrollToFixed', base.options.fixed);
            }
            if (base.options.unfixed) {
                target.bind('unfixed.ScrollToFixed', base.options.unfixed);
            }

            if (base.options.spacerClass) {
                spacer.addClass(base.options.spacerClass);
            }

            target.bind('resize.ScrollToFixed', function() {
                spacer.height(target.height());
            });

            target.bind('scroll.ScrollToFixed', function() {
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');
                checkScroll();
            });

            target.bind('detach.ScrollToFixed', function(ev) {
                preventDefault(ev);

                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');

                $(window).unbind('resize.ScrollToFixed', windowResize);
                $(window).unbind('scroll.ScrollToFixed', windowScroll);

                target.unbind('.ScrollToFixed');

                //remove spacer from dom
                spacer.remove();

                base.$el.removeData('ScrollToFixed');
            });

            // Reset everything.
            windowResize();
        };

        // Initialize the plugin.
        base.init();
    };

    // Sets the option defaults.
    $.ScrollToFixed.defaultOptions = {
        marginTop : 0,
        limit : 0,
        bottom : -1,
        zIndex : 1000,
        baseClassName: 'scroll-to-fixed-fixed'
    };

    // Returns enhanced elements that will fix to the top of the page when the
    // page is scrolled.
    $.fn.scrollToFixed = function(options) {
        return this.each(function() {
            (new $.ScrollToFixed(this, options));
        });
    };
})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.$;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = window._;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./assets/modules/common.js");


/***/ })

},[2]);