webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(1);
	__webpack_require__(12);
	var util = __webpack_require__(4);
	var Vote = __webpack_require__(13);
	var Comment = __webpack_require__(15);
	var ContentResize = __webpack_require__(16);
	var Gift = __webpack_require__(17);
	var postId = window.postId;
	var $window = $(window);
	//投票
	(function ($) {
	    //post投票
	    new Vote($('#post-vote'), {
	        type: 'post',
	        id: postId
	    });
	})($);

	//文章信息
	(function ($) {
	    var $viewNum = $('[data-num-views]');
	    var $commentsNum = $('[data-num-comments]');
	    var $postVote = $('#post-vote');
	    var $postPraiseNum = $postVote.find('.up .num');
	    var $postStampNum = $postVote.find('.down .num');
	    util.request('post.summary', postId, function (response) {
	        if (response.code == 0) {
	            var post = response.info.post;
	            $viewNum.html(post.views);
	            $commentsNum.html(post.comment_checked);
	            $postPraiseNum.html(post.praise_nums);
	            $postStampNum.html(post.stamp_nums);
	        }
	    });
	})($);

	//评论
	(function ($) {
	    //comment页面滑行
	    if (window.location.hash.indexOf("#comment") === 0) {
	        util.goHash("#comments");
	    }
	    var $loginTips = $('#login-tips');
	    var loginTips = {
	        yes: '以账号<a href="{link}">{username}</a>登录。',
	        no: $('#login-tips-no').html()
	    };
	    //提示信息显示
	    $(document).on('pageInit', function (event, response) {
	        if (response.code == 0 && response.info.user.id) {
	            $loginTips.html(loginTips.yes.replace('{link}', response.info.user.homepage).replace('{username}', response.info.user.username));
	        } else {
	            $loginTips.html(loginTips.no);
	        }
	    });
	    var comment = new Comment(postId);
	    //加载评论
	    $window.on('scroll', function () {
	        comment.load(postId);
	    });
	})($);

	//内容页缩放
	new ContentResize($('#content .entry-content'), $('[data-role="content-resize"]'));

	//礼品
	window.giftId && new Gift(window.giftId);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function (factory) {
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// CommonJS
			factory(require('jquery'));
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {

		var pluses = /\+/g;

		function encode(s) {
			return config.raw ? s : encodeURIComponent(s);
		}

		function decode(s) {
			return config.raw ? s : decodeURIComponent(s);
		}

		function stringifyCookieValue(value) {
			return encode(config.json ? JSON.stringify(value) : String(value));
		}

		function parseCookieValue(s) {
			if (s.indexOf('"') === 0) {
				// This is a quoted cookie as according to RFC2068, unescape...
				s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}

			try {
				// Replace server-side written pluses with spaces.
				// If we can't decode the cookie, ignore it, it's unusable.
				// If we can't parse the cookie, ignore it, it's unusable.
				s = decodeURIComponent(s.replace(pluses, ' '));
				return config.json ? JSON.parse(s) : s;
			} catch(e) {}
		}

		function read(s, converter) {
			var value = config.raw ? s : parseCookieValue(s);
			return $.isFunction(converter) ? converter(value) : value;
		}

		var config = $.cookie = function (key, value, options) {

			// Write

			if (value !== undefined && !$.isFunction(value)) {
				options = $.extend({}, config.defaults, options);

				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setTime(+t + days * 864e+5);
				}

				return (document.cookie = [
					encode(key), '=', stringifyCookieValue(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path    ? '; path=' + options.path : '',
					options.domain  ? '; domain=' + options.domain : '',
					options.secure  ? '; secure' : ''
				].join(''));
			}

			// Read

			var result = key ? undefined : {};

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			var cookies = document.cookie ? document.cookie.split('; ') : [];

			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = parts.join('=');

				if (key && key === name) {
					// If second argument (value) is a function it's a converter...
					result = read(cookie, value);
					break;
				}

				// Prevent storing a cookie that we couldn't decode.
				if (!key && (cookie = read(cookie)) !== undefined) {
					result[name] = cookie;
				}
			}

			return result;
		};

		config.defaults = {};

		$.removeCookie = function (key, options) {
			if ($.cookie(key) === undefined) {
				return false;
			}

			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return !$.cookie(key);
		};

	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, $) {'use strict';

	var util = __webpack_require__(4);
	var Cookies = __webpack_require__(14);

	function Vote($voteGroup, options) {
	    var $up = $voteGroup.find('[data-choose="like"]');
	    var $down = $voteGroup.find('[data-choose="unlike"]');
	    //合并配置
	    options = _.merge({
	        'cookie': true //启用cookie防止多次点击
	    }, options);
	    //如果优先配置了则不会在自动获取
	    var type = options.type || $voteGroup.data('type');
	    var id = options.id || $voteGroup.data('id');

	    function checkEnabled() {
	        if ($voteGroup.hasClass('disabled')) {
	            return false;
	        }
	        //检查cookie
	        return !(options.cookie && Cookies.get('_vote_' + type + id));
	    }

	    /**
	     * 获取路由名
	     * @param choose
	     * @returns {string}
	     */
	    function getVoteRouteName(choose) {
	        return type + '.' + choose;
	    }

	    /**
	     * 处理点击事件
	     * @param choose
	     */
	    function handle(choose) {
	        var _this = this;
	        if (this._processing) {
	            return false;
	        }
	        //无法处理
	        if (!checkEnabled()) {
	            $voteGroup.removeClass('disabled').addClass('disabled');
	            return false;
	        }
	        var $this = $(this);
	        _this._processing = true; // 防止重复操作
	        util.request(getVoteRouteName(choose), id, function (response) {
	            if (response.code == 0) {
	                $this.addClass("active");
	                var cookieTime = 3600 * 24;
	                $this.children(".num").html(choose == 'like' ? response.info.vote.praise_nums : response.info.vote.stamp_nums);
	                Cookies.set('_vote_' + type + id, choose, { path: '/', expires: 1 });
	                if (options.cookie) {
	                    $voteGroup.addClass('disabled');
	                }
	            }
	        }).complete(function () {
	            _this._processing = false;
	        });
	    }

	    function init() {
	        //如果启用了cookie防重复点击
	        if (!checkEnabled()) {
	            $voteGroup.removeClass('disabled').addClass('disabled');
	            return false;
	        }
	        $up.on('click', function () {
	            handle.call(this, 'like');
	        });
	        $down.on('click', function () {
	            handle.call(this, 'unlike');
	        });
	    }
	    init();
	}

	Vote.TYPE_POST = 'post';
	Vote.TYPE_COMMENT = 'comment';

	module.exports = Vote;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.3
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					return (document.cookie = [
						key, '=', value,
						attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						attributes.path ? '; path=' + attributes.path : '',
						attributes.domain ? '; domain=' + attributes.domain : '',
						attributes.secure ? '; secure' : ''
					].join(''));
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, _) {'use strict';

	var util = __webpack_require__(4);
	var Vote = __webpack_require__(13);

	//表情配置
	var looks = {
	    "uri": "http:\/\/s.duomeng.me\/look\/",
	    "files": {
	        "\u5475\u5475": "hehe.gif",
	        "\u563b\u563b": "xixi.gif",
	        "\u54c8\u54c8": "haha.gif",
	        "\u53ef\u7231": "keai.gif",
	        "\u53ef\u601c": "kelian.gif",
	        "\u6316\u9f3b\u5c4e": "wabishi.gif",
	        "\u5403\u60ca": "chijing.gif",
	        "\u5bb3\u7f9e": "haixiu.gif",
	        "\u6324\u773c": "jiyan.gif",
	        "\u95ed\u5634": "bizui.gif",
	        "\u9119\u89c6": "bishi.gif",
	        "\u7231\u4f60": "aini.gif",
	        "\u6cea": "lei.gif",
	        "\u5077\u7b11": "touxiao.gif",
	        "\u4eb2\u4eb2": "qinqin.gif",
	        "\u751f\u75c5": "shengbing.gif",
	        "\u592a\u5f00\u5fc3": "taikaixin.gif",
	        "\u61d2\u5f97\u7406\u4f60": "landelini.gif",
	        "\u53f3\u54fc\u54fc": "youhengheng.gif",
	        "\u5de6\u54fc\u54fc": "zuohengheng.gif",
	        "\u5618": "xu.gif",
	        "\u8870": "shuai.gif",
	        "\u59d4\u5c48": "weiqu.gif",
	        "\u5410": "tu.gif",
	        "\u54c8\u6b20": "haqian.gif",
	        "\u62b1\u62b1": "baobao.gif",
	        "\u6012": "nu.gif",
	        "\u7591\u95ee": "yiwen.gif",
	        "\u998b\u5634": "chanzui.gif",
	        "\u62dc\u62dc": "baibai.gif",
	        "\u601d\u8003": "sikao.gif",
	        "\u6c57": "han.gif",
	        "\u56f0": "kun.gif",
	        "\u7761": "shui.gif",
	        "\u94b1": "qian.gif",
	        "\u5931\u671b": "shiwang.gif",
	        "\u9177": "ku.gif",
	        "\u8272": "se.gif",
	        "\u54fc": "heng.gif",
	        "\u9f13\u638c": "guzhang.gif",
	        "\u6655": "yun.gif",
	        "\u60b2\u4f24": "beishang.gif",
	        "\u6293\u72c2": "zhuakuang.gif",
	        "\u9ed1\u7ebf": "heixian.gif"
	    }
	};
	function Comment(postId) {
	    var _this = this;
	    var $window = $(window);
	    var $document = $(document);
	    var $comments = $('#comments');
	    var $commentsPanel = $comments.find('[data-role="comments-panel"]');
	    var $commentsThread = $('#thread-comments');
	    var $commentsLoading = $('#comments-loading');
	    var $respond = $('#respond');

	    //添加评论
	    var $commentForm = $('#commentform'),
	        $submitBtn = $("#commentsubmit"),
	        $content = $("#comment"),
	        $errorAlert = $('#comment-error-alert'),
	        $successTips = $('#comment-success-tips');

	    //回复评论
	    var $parentId = $('#parent-id');

	    //记载评论
	    this.load = function (postId, page) {
	        if (_this._loading) {
	            return false;
	        }
	        page = page || _this.page || 1;
	        if (!$commentsLoading.hasClass('loaded') && $commentsLoading.offset().top - $window.height() - $window.scrollTop() <= 0) {
	            _this._loading = true;
	            util.request('comment.load', postId, { 'page': page }, {
	                success: function (data) {
	                    $comments.after($commentsLoading.addClass("loaded").hide());
	                    $commentsPanel.html(data);
	                    if (window.location.hash.indexOf("#comment") === 0) {
	                        util.goHash();
	                    }
	                    _this.page++;
	                    _this._loading = false;
	                    $comments.trigger('commentLoad', data);
	                }
	            });
	        }
	    };

	    //从链接更新评论
	    function loadCommentsFromUrl(url) {
	        if (_this._loading) {
	            return false;
	        }
	        if (!$commentsLoading.hasClass('loaded') && $commentsLoading.offset().top - $window.height() - $window.scrollTop() <= 0) {
	            _this._loading = true;
	            $.get(url, function (data) {
	                $comments.after($commentsLoading.addClass("loaded").hide());
	                $commentsPanel.html(data);
	                _this._loading = false;
	                if (window.location.hash.indexOf("#comment") === 0) {
	                    util.goHash();
	                }
	                $comments.trigger('commentLoad', data);
	            });
	        }
	    }

	    //移动form表单
	    function moveForm($srcComment, $activeReply) {
	        var commentId = $srcComment.data('id');
	        if ($srcComment.children('form').length > 0) {
	            $activeReply.removeClass("highlight");
	            $parentId.val(0);
	            $respond.append($commentForm);
	            $srcComment.isReply = 0;
	        } else {
	            $comments.find('[data-role="reply"]').removeClass("highlight");
	            $activeReply.addClass("highlight");
	            $parentId.val(commentId);
	            $srcComment.append($commentForm);
	            util.goHash($srcComment);
	            $srcComment.isReply = 1;
	        }
	        return false;
	    }

	    //绑定加载评论
	    this.bindLoadComment = function () {
	        //翻页更新评论
	        $comments.on('click', '#pagination-comments a', function () {
	            var url = $(this).attr("href");
	            $('#thread-comments').html($commentsLoading.removeClass("loaded").show());
	            loadCommentsFromUrl(url);
	            util.goHash("#thread-comments");
	            return false;
	        });
	        $comments.on('commentLoad', function () {
	            $comments.find('[data-role="comment"]').each(function () {
	                var $this = $(this);
	                //防止楼层嵌套查找出错
	                $this.children('article').find('[data-role="reply"]').on('click', function () {
	                    moveForm($this, $(this));
	                });
	            });

	            $comments.find('[data-role="vote"]').each(function () {
	                new Vote($(this));
	            });
	        });
	    };

	    var $facePanel = $('#looks-image');
	    /**
	     * 准备评论表情
	     * @returns {boolean}
	     */
	    function prepareCommentLooks() {
	        $facePanel.on('click', function () {
	            if (!looks || $content.is(":disabled")) {
	                return false;
	            }
	            if (typeof $facePanel.data("original-title") == "undefined") {
	                var html = '<ul id="looks-list" class="clearfix">';
	                _.forEach(looks.files, function (file, title) {
	                    html += '<li title="' + title + '"><img src="' + looks.uri + file + '" alt="' + title + '" width="22" height="22" />';
	                });
	                html += "</ul>";
	                $facePanel.popover({
	                    container: "#commentform",
	                    trigger: "manual",
	                    html: true,
	                    placement: "right",
	                    template: '<div class="popover look-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" id="looks"></div></div>',
	                    content: html
	                });
	            }
	            $facePanel.popover("toggle");
	        });
	        $commentForm.on('click', '#looks li', function () {
	            var val = $content.val(),
	                length = val.length,
	                selectionStart = $content.prop("selectionStart"),
	                look = "[" + $(this).attr("title") + "]",
	                selectionRange = selectionStart + look.length;
	            $content.val(val.slice(0, selectionStart) + look + val.slice(selectionStart, length)).focus();
	            $content[0].setSelectionRange(selectionRange, selectionRange);
	            $facePanel.popover("hide");
	            return false;
	        });
	        //点击
	        $document.on('click', function (event) {
	            if ($facePanel.data('original-title') != 'undefined') {
	                var $looks = $('#looks');
	                var isFacePanel = $facePanel.is(event.target) || $facePanel.has(event.target).length > 0;
	                var isLookPanel = $looks.is(event.target) || $looks.has(event.target).length > 0;
	                if (!isFacePanel && !isLookPanel) {
	                    $facePanel.popover("hide");
	                }
	            }
	        });
	    }

	    /**
	     * 绑定添加评论
	     */
	    this.bindAddComment = function (postId) {
	        //处理评论框
	        prepareCommentLooks();
	        $commentForm.on('submit', function () {
	            $submitBtn.button("loading");
	            util.request('comment.add', postId, $commentForm.serialize(), {
	                beforeSend: function () {
	                    $content.prop("disabled", true);
	                },
	                success: function (response) {
	                    if (response.code == 0) {
	                        $successTips.html(response.message).fadeIn(400, function () {
	                            setTimeout(function () {
	                                $successTips.fadeOut();
	                            }, 3000);
	                        });
	                        $content.val('');
	                    } else {
	                        $errorAlert.html(response.message).fadeIn(400, function () {
	                            setTimeout(function () {
	                                $errorAlert.fadeOut();
	                            }, 3000);
	                        });
	                    }
	                    $submitBtn.button("reset");
	                    $content.prop("disabled", false);
	                }
	            });
	            return false;
	        });
	    };
	    //初始化
	    this.bindAddComment(postId);
	    this.bindLoadComment();
	}

	module.exports = Comment;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	function ContentResize($contentContainer, $resize) {
	    function handle() {
	        var $this = $(this);
	        $this.addClass("disabled");
	        $this.siblings().removeClass("disabled");
	        $contentContainer.css($this.data("type") == "small" ? {
	            "font-size": "initial"
	        } : {
	            "font-size": "larger"
	        });
	    }
	    $resize.on("click", function () {
	        handle.apply(this);
	    });
	    $resize.on("click", function () {
	        handle.apply(this);
	    });
	}

	module.exports = ContentResize;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var util = __webpack_require__(4);

	function Gift(giftId) {
	    var $action = $('#exchange-action'),
	        $tips = $('#exchange-tips'),
	        $confirm = $('#exchange-confirm'),
	        $info = $('#gift-info'),
	        $exchangeNum = $('#exchange_num'),
	        $exchange = $('#exchange'),
	        $giftContent = $('#gift-content'),
	        $showGiftAction = $('#show-gift-action');

	    var $document = $('document');

	    function initGift(response) {
	        var gift = response.info.gift;
	        if (!gift) {
	            return;
	        }
	        //展示提示有隐藏区
	        if (gift.hidden_content) {
	            $showGiftAction.show();
	            $giftContent.show().children('.content').html(gift.hidden_content);
	        }
	        $exchange.html(gift.exchange.title);
	        $exchangeNum.html(gift.exchange.nums);

	        if (gift.exchange.enable) {
	            $exchange.removeClass('disabled btn-default').addClass('btn-success');
	            //积分大于0的需要兑换确认
	            if (parseInt(gift.points) > 0) {
	                $exchange.attr({
	                    'data-toggle': 'collapse',
	                    'href': '#exchange-confirm',
	                    'aria-expanded': 'false',
	                    'aria-controls': 'exchange-confirm'
	                });
	            } else {
	                $exchange.addClass('exchange-submit');
	            }
	        } else if (gift.exchange.reason == 1) {
	            $exchange.removeClass('disabled btn-default').addClass('btn-success');
	            $exchange.html('请您先登录').on('click', function () {
	                window.location.href = util.route.getRoutePath('user.login');
	                return false;
	            });
	        }
	        $info.find('.credit em').html(gift.points);
	        $info.find('.stock em').html(gift.stock < 0 ? '不限量' : gift.stock);
	        $info.find('.buyers em').html(gift.exchange_nums);
	    }

	    /**
	     * 兑换礼物
	     * @returns {boolean}
	     */
	    function exchange() {
	        $exchange.button('loading');
	        util.request('gift.exchange', giftId, function (response) {
	            initGift(response);
	            if (response.code == 0) {
	                $exchange.html(response.message);
	            } else {
	                $tips.html(response.message).addClass('text-danger');
	                $exchange.html(response.message).removeClass('btn-success').addClass('btn-default disabled').prop('disabled', true);
	                return false;
	            }
	        });
	        return false;
	    }

	    function init() {
	        util.request('gift.summary', giftId, function (response) {
	            initGift(response);
	        });
	        $exchange.on('click', function () {
	            if ($(this).hasClass('exchange-submit')) {
	                exchange();
	            }
	        });
	        $('#exchange-cancel').on('click', function () {
	            $confirm.collapse('hide');
	        });
	        $('#exchange-submit').on('click', function () {
	            $confirm.collapse('hide');
	            exchange();
	        });
	    }
	    init();
	}

	module.exports = Gift;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);