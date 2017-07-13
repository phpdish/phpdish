webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(1);
	var Editor = __webpack_require__(18);
	var util = __webpack_require__(4);
	__webpack_require__(28);

	//问题列表页与问题详情页公用
	var $contentTextarea = $('#content-textarea');
	//编辑器
	if ($contentTextarea.length > 0) {
	    var editor = new Editor($contentTextarea);
	}
	//问题详情页
	(function ($) {
	    var $addReplyForm = $('#add-reply-form');
	    //回复艾特
	    $('[data-at]').on('click', document, function () {
	        var $this = $(this);
	        var username = $this.data('at');
	        if (typeof username != 'undefined' && username.length != 0) {
	            editor.$txt.prepend('回复 @' + username + ' :');
	        }
	        util.goHash($addReplyForm);
	    });
	    //回复验证
	    $addReplyForm.validate({
	        submitHandler: function () {
	            var contentText = editor.$txt.formatText();
	            if ($.trim(contentText).length == 0) {
	                util.dialog.msg('请填写内容');
	                return false;
	            }
	            if ($addReplyForm._lock) {
	                return false;
	            }
	            $addReplyForm._lock = true;
	            util.request('questionReply.add', { questionId: window.questionId }, $addReplyForm.serialize(), { success: function (response) {
	                    if (response.code == 0) {
	                        util.dialog.msg(response.message, 2);
	                        setTimeout(function () {
	                            location.reload();
	                        }, 1000);
	                    } else {
	                        util.dialog.alert(response.message, 2);
	                    }
	                    $addReplyForm._lock = false;
	                } });
	            return false;
	        },
	        errorPlacement: function (error, element) {
	            error.insertAfter($(element));
	        },
	        rules: {
	            content: {
	                required: true
	            }
	        },
	        messages: {
	            content: {
	                required: '请填写内容'
	            }
	        }
	    });
	})($);

	//添加问题
	(function ($) {
	    var $addQuestionForm = $('#add-question-form');
	    $addQuestionForm.validate({
	        submitHandler: function () {
	            var contentText = editor.$txt.formatText();
	            if ($.trim(contentText).length == 0) {
	                util.dialog.msg('请填写内容');
	                return false;
	            }
	            if ($addQuestionForm._lock) {
	                return false;
	            }
	            $addQuestionForm._lock = true;
	            util.request('question.add', { topicId: window.topicId }, $addQuestionForm.serialize(), { success: function (response) {
	                    if (response.code == 0) {
	                        util.dialog.msg(response.message);
	                        setTimeout(function () {
	                            location.reload();
	                        }, 1000);
	                    } else {
	                        util.dialog.alert(response.message);
	                    }
	                } });
	            return false;
	        },
	        errorClass: 'color-red',
	        errorPlacement: function (error, element) {
	            error.insertAfter($(element));
	        },
	        rules: {
	            title: {
	                required: true,
	                minlength: 6,
	                maxlength: 50
	            },
	            content: {
	                required: true
	            }
	        },
	        messages: {
	            title: {
	                required: '请输入标题',
	                minlength: "标题不得少于6个字",
	                maxlength: "标题不得多余50个字"
	            },
	            content: {
	                required: '内容不得为空'
	            }
	        }
	    });
	})($);
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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {var wangEditor = __webpack_require__(19);
	// require('wangeditor/dist/css/wangEditor.min.css');
	var util = __webpack_require__(4);
	var Emotions = __webpack_require__(27);

	/**
	 * 转换表情数据
	 * @param emotions
	 * @returns {Array}
	 */
	function convertEmotions(emotions) {
	    return _.map(emotions, function (emotion) {
	        emotion.value = '[' + emotion.value + ']';
	        return emotion;
	    });
	}

	function Editor($element, options) {
	    options = _.merge({
	        toolbar: ['link', 'unlink', 'eraser', 'quote', '|', 'emotion', 'img', 'video', 'location', '|', 'insertcode'],
	        element: $element,
	        upload: true
	    }, options);

	    //公共配置
	    wangEditor.config.printLog = false;
	    var editor = new wangEditor(options.element);
	    editor.config.menus = options.toolbar;
	    //配置上传
	    editor.config.uploadImgUrl = '/attachments/add?src=wangeditor';
	    editor.config.uploadParams = {
	        token: util.getToken(),
	        user: util.getAuthUser()
	    };
	    editor.config.uploadImgFileName = 'upfile';
	    //配置emotion
	    editor.config.emotions = {
	        baiduPaoPao: {
	            title: "泡泡",
	            data: convertEmotions(Emotions.getEmotion('baidu.pp'))
	        },
	        baiduTuzik: {
	            title: "兔斯基",
	            data: convertEmotions(Emotions.getEmotion('baidu.tsj'))
	        },
	        youkuDefault: {
	            title: "优酷",
	            data: convertEmotions(Emotions.getEmotion('youku.default'))
	        }
	    };
	    editor.create();
	    return editor;
	}

	module.exports = Editor;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {(function (factory) {
	    if (typeof window.define === 'function') {
	        if (window.define.amd) {
	            // AMD模式
	            window.define('wangEditor', ["jquery"], factory);
	        } else if (window.define.cmd) {
	            // CMD模式
	            window.define(function (require, exports, module) {
	                return factory;
	            });
	        } else {
	            // 全局模式
	            factory(__webpack_provided_window_dot_jQuery);
	        }
	    } else if (typeof module === "object" && typeof module.exports === "object") {
	        // commonjs

	        // 引用 css —— webapck
	        window.wangEditorCssPath ? __webpack_require__(20)(window.wangEditorCssPath) : __webpack_require__(26);
	        module.exports = factory(
	            // 传入 jquery ，支持使用 npm 方式或者自己定义jquery的路径
	            window.wangEditorJQueryPath ? __webpack_require__(20)(window.wangEditorJQueryPath) : __webpack_require__(2)
	        );
	    } else {
	        // 全局模式
	        factory(__webpack_provided_window_dot_jQuery);
	    }
	})(function($){
	    
	    // 验证是否引用jquery
	    if (!$ || !$.fn || !$.fn.jquery) {
	        alert('在引用wangEditor.js之前，先引用jQuery，否则无法使用 wangEditor');
	        return;
	    }

	    // 定义扩展函数
	    var _e = function (fn) {
	        var E = window.wangEditor;
	        if (E) {
	            // 执行传入的函数
	            fn(E, $);
	        }
	    };
	// 定义构造函数
	(function (window, $) {
	    if (window.wangEditor) {
	        // 重复引用
	        alert('一个页面不能重复引用 wangEditor.js 或 wangEditor.min.js ！！！');
	        return;
	    }

	    // 编辑器（整体）构造函数
	    var E = function (elem) {
	        // 支持 id 和 element 两种形式
	        if (typeof elem === 'string') {
	            elem = '#' + elem;
	        }

	        // ---------------获取基本节点------------------
	        var $elem = $(elem);
	        if ($elem.length !== 1) {
	            return;
	        }
	        var nodeName = $elem[0].nodeName;
	        if (nodeName !== 'TEXTAREA' && nodeName !== 'DIV') {
	            // 只能是 textarea 和 div ，其他类型的元素不行
	            return;   
	        }
	        this.valueNodeName = nodeName.toLowerCase();
	        this.$valueContainer = $elem;

	        // 记录 elem 的 prev 和 parent（最后渲染 editor 要用到）
	        this.$prev = $elem.prev();
	        this.$parent = $elem.parent();

	        // ------------------初始化------------------
	        this.init();
	    };

	    E.fn = E.prototype;

	    E.$body = $('body');
	    E.$document = $(document);
	    E.$window = $(window);
	    E.userAgent = navigator.userAgent;
	    E.getComputedStyle = window.getComputedStyle;
	    E.w3cRange = typeof document.createRange === 'function';
	    E.hostname = location.hostname.toLowerCase();
	    E.websiteHost = 'wangeditor.github.io|www.wangeditor.com|wangeditor.coding.me';
	    E.isOnWebsite = E.websiteHost.indexOf(E.hostname) >= 0;
	    E.docsite = 'http://www.kancloud.cn/wangfupeng/wangeditor2/113961';

	    // 暴露给全局对象
	    window.wangEditor = E;

	    // 注册 plugin 事件，用于用户自定义插件
	    // 用户在引用 wangEditor.js 之后，还可以通过 E.plugin() 注入自定义函数，
	    // 该函数将会在 editor.create() 方法的最后一步执行
	    E.plugin = function (fn) {
	        if (!E._plugins) {
	            E._plugins = [];
	        }

	        if (typeof fn === 'function') {
	            E._plugins.push(fn);
	        }
	    };

	})(window, $);
	// editor 绑定事件
	_e(function (E, $) {

	    E.fn.init = function () {

	        // 初始化 editor 默认配置
	        this.initDefaultConfig();

	        // 增加container
	        this.addEditorContainer();

	        // 增加编辑区域
	        this.addTxt();

	        // 增加menuContainer
	        this.addMenuContainer();

	        // 初始化菜单集合
	        this.menus = {};

	        // 初始化commandHooks
	        this.commandHooks();

	    };

	});
	// editor api
	_e(function (E, $) {

	    // 预定义 ready 事件
	    E.fn.ready = function (fn) {

	        if (!this.readyFns) {
	            this.readyFns = [];
	        }

	        this.readyFns.push(fn);
	    };

	    // 处理ready事件
	    E.fn.readyHeadler = function () {
	        var fns = this.readyFns;

	        while (fns.length) {
	            fns.shift().call(this);
	        }
	    };

	    // 更新内容到 $valueContainer
	    E.fn.updateValue = function () {
	        var editor = this;
	        var $valueContainer = editor.$valueContainer;
	        var $txt = editor.txt.$txt;

	        if ($valueContainer === $txt) {
	            // 传入生成编辑器的div，即是编辑区域
	            return;
	        }

	        var value = $txt.html();
	        $valueContainer.val(value);
	    };

	    // 获取初始化的内容
	    E.fn.getInitValue = function () {
	        var editor = this;
	        var $valueContainer = editor.$valueContainer;
	        var currentValue = '';
	        var nodeName = editor.valueNodeName;
	        if (nodeName === 'div') {
	            currentValue = $valueContainer.html();
	        } else if (nodeName === 'textarea') {
	            currentValue = $valueContainer.val();
	        }

	        return currentValue;
	    };

	    // 触发菜单updatestyle
	    E.fn.updateMenuStyle = function () {
	        var menus = this.menus;

	        $.each(menus, function (k, menu) {
	            menu.updateSelected();
	        });
	    };

	    // 除了传入的 menuIds，其他全部启用
	    E.fn.enableMenusExcept = function (menuIds) {
	        if (this._disabled) {
	            // 编辑器处于禁用状态，则不执行改操作
	            return;
	        }
	        // menuIds参数：支持数组和字符串
	        menuIds = menuIds || [];
	        if (typeof menuIds === 'string') {
	            menuIds = [menuIds];
	        }

	        $.each(this.menus, function (k, menu) {
	            if (menuIds.indexOf(k) >= 0) {
	                return;
	            }
	            menu.disabled(false);
	        });
	    };

	    // 除了传入的 menuIds，其他全部禁用
	    E.fn.disableMenusExcept = function (menuIds) {
	        if (this._disabled) {
	            // 编辑器处于禁用状态，则不执行改操作
	            return;
	        }
	        // menuIds参数：支持数组和字符串
	        menuIds = menuIds || [];
	        if (typeof menuIds === 'string') {
	            menuIds = [menuIds];
	        }

	        $.each(this.menus, function (k, menu) {
	            if (menuIds.indexOf(k) >= 0) {
	                return;
	            }
	            menu.disabled(true);
	        });
	    };

	    // 隐藏所有 dropPanel droplist modal
	    E.fn.hideDropPanelAndModal = function () {
	        var menus = this.menus;

	        $.each(menus, function (k, menu) {
	            var m = menu.dropPanel || menu.dropList || menu.modal;
	            if (m && m.hide) {
	                m.hide();
	            }
	        });
	    };

	});
	// selection range API
	_e(function (E, $) {

	    // 用到 w3c range 的函数，如果检测到浏览器不支持 w3c range，则赋值为空函数
	    var ieRange = !E.w3cRange;
	    function emptyFn() {}

	    // 设置或读取当前的range
	    E.fn.currentRange = function (cr){
	        if (cr) {
	            this._rangeData = cr;
	        } else {
	            return this._rangeData;
	        }
	    };

	    // 将当前选区折叠
	    E.fn.collapseRange = function (range, opt) {
	        // opt 参数说明：'start'-折叠到开始; 'end'-折叠到结束
	        opt = opt || 'end';
	        opt = opt === 'start' ? true : false;

	        range = range || this.currentRange();
	        
	        if (range) {
	            // 合并，保存
	            range.collapse(opt);
	            this.currentRange(range);
	        }
	    };

	    // 获取选区的文字
	    E.fn.getRangeText = ieRange ? emptyFn : function (range) {
	        range = range || this.currentRange();
	        if (!range) {
	            return;
	        }
	        return range.toString();
	    };

	    // 获取选区对应的DOM对象
	    E.fn.getRangeElem = ieRange ? emptyFn : function (range) {
	        range = range || this.currentRange();
	        var dom = range.commonAncestorContainer;

	        if (dom.nodeType === 1) {
	            return dom;
	        } else {
	            return dom.parentNode;
	        }
	    };

	    // 选区内容是否为空？
	    E.fn.isRangeEmpty = ieRange ? emptyFn : function (range) {
	        range = range || this.currentRange();

	        if (range && range.startContainer) {
	            if (range.startContainer === range.endContainer) {
	                if (range.startOffset === range.endOffset) {
	                    return true;
	                }
	            }
	        }

	        return false;
	    };

	    // 保存选区数据
	    E.fn.saveSelection = ieRange ? emptyFn : function (range) {
	        var self = this,
	            _parentElem,
	            selection,
	            txt = self.txt.$txt.get(0);

	        if (range) {
	            _parentElem = range.commonAncestorContainer;
	        } else {
	            selection = document.getSelection();
	            if (selection.getRangeAt && selection.rangeCount) {
	                range = document.getSelection().getRangeAt(0);
	                _parentElem = range.commonAncestorContainer;
	            }
	        }
	        // 确定父元素一定要包含在编辑器区域内
	        if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem) ) {
	            // 保存选择区域
	            self.currentRange(range);
	        }
	    };

	    // 恢复选中区域
	    E.fn.restoreSelection = ieRange ? emptyFn : function (range) {
	        var selection;

	        range = range || this.currentRange();

	        if (!range) {
	            return;
	        }

	        // 使用 try catch 来防止 IE 某些情况报错
	        try {
	            selection = document.getSelection();
	            selection.removeAllRanges();
	            selection.addRange(range);
	        } catch (ex) {
	            E.error('执行 editor.restoreSelection 时，IE可能会有异常，不影响使用');
	        }
	    };

	    // 根据elem恢复选区
	    E.fn.restoreSelectionByElem = ieRange ? emptyFn : function (elem, opt) {
	        // opt参数说明：'start'-折叠到开始，'end'-折叠到结束，'all'-全部选中
	        if (!elem) {
	            return;
	        }
	        opt = opt || 'end'; // 默认为折叠到结束

	        // 根据elem获取选区
	        this.setRangeByElem(elem);

	        // 根据 opt 折叠选区
	        if (opt === 'start') {
	            this.collapseRange(this.currentRange(), 'start');
	        }
	        if (opt === 'end') {
	            this.collapseRange(this.currentRange(), 'end');
	        }
	        
	        // 恢复选区
	        this.restoreSelection();
	    };

	    // 初始化选区
	    E.fn.initSelection = ieRange ? emptyFn : function () {
	        var editor = this;
	        if( editor.currentRange() ){
	            //如果currentRange有值，则不用再初始化
	            return;
	        }

	        var range;
	        var $txt = editor.txt.$txt;
	        var $firstChild = $txt.children().first();
	        
	        if ($firstChild.length) {
	            editor.restoreSelectionByElem($firstChild.get(0));
	        }
	    };

	    // 根据元素创建选区
	    E.fn.setRangeByElem = ieRange ? emptyFn : function (elem) {
	        var editor = this;
	        var txtElem = editor.txt.$txt.get(0);
	        if (!elem || !$.contains(txtElem, elem)) {
	            return;
	        }

	        // 找到elem的第一个 textNode 和 最后一个 textNode
	        var firstTextNode = elem.firstChild;
	        while (firstTextNode) {
	            if (firstTextNode.nodeType === 3) {
	                break;
	            }
	            // 继续向下
	            firstTextNode = firstTextNode.firstChild;
	        }
	        var lastTextNode = elem.lastChild;
	        while (lastTextNode) {
	            if (lastTextNode.nodeType === 3) {
	                break;
	            }
	            // 继续向下
	            lastTextNode = lastTextNode.lastChild;
	        }
	        
	        var range = document.createRange();
	        if (firstTextNode && lastTextNode) {
	            // 说明 elem 有内容，能取到子元素
	            range.setStart(firstTextNode, 0);
	            range.setEnd(lastTextNode, lastTextNode.textContent.length);
	        } else {
	            // 说明 elem 无内容
	            range.setStart(elem, 0);
	            range.setEnd(elem, 0);
	        }

	        // 保存选区
	        editor.saveSelection(range);
	    };

	});
	// selection range API - IE8及以下
	_e(function (E, $) {

	    if (E.w3cRange) {
	        // 说明支持 W3C 的range方法
	        return;
	    }

	    // -----------------IE8时，需要重写以下方法-------------------

	    // 获取选区的文字
	    E.fn.getRangeText = function (range) {
	        range = range || this.currentRange();
	        if (!range) {
	            return;
	        }
	        return range.text;
	    };

	    // 获取选区对应的DOM对象
	    E.fn.getRangeElem = function (range) {
	        range = range || this.currentRange();
	        if (!range) {
	            return;
	        }
	        var dom = range.parentElement();

	        if (dom.nodeType === 1) {
	            return dom;
	        } else {
	            return dom.parentNode;
	        }
	    };

	    // 选区内容是否为空？
	    E.fn.isRangeEmpty = function (range) {
	        range = range || this.currentRange();

	        if (range && range.text) {
	            return false;
	        }

	        return true;
	    };

	    // 保存选区数据
	    E.fn.saveSelection = function (range) {
	        var self = this,
	            _parentElem,
	            selection,
	            txt = self.txt.$txt.get(0);

	        if (range) {
	            _parentElem = range.parentElement();
	        } else {
	            range = document.selection.createRange();
	            if(typeof range.parentElement === 'undefined'){
	                //IE6、7中，insertImage后会执行此处
	                //由于找不到range.parentElement，所以干脆将_parentElem赋值为null
	                _parentElem = null;
	            }else{
	                _parentElem = range.parentElement();
	            }
	        }

	        // 确定父元素一定要包含在编辑器区域内
	        if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem) ) {
	            // 保存选择区域
	            self.currentRange(range);
	        }
	    };

	    // 恢复选中区域
	    E.fn.restoreSelection = function (currentRange){
	        var editor = this,
	            selection,
	            range;

	        currentRange = currentRange || editor.currentRange();
	        if(!currentRange){
	            return;
	        }

	        range = document.selection.createRange();
	        try {
	            // 此处，plupload上传上传图片时，IE8-会报一个『参数无效』的错误
	            range.setEndPoint('EndToEnd', currentRange);
	        } catch (ex) {

	        }
	        
	        if(currentRange.text.length === 0){
	            try {
	                // IE8 插入表情会报错
	                range.collapse(false);
	            } catch (ex) {
	                
	            }
	            
	        }else{
	            range.setEndPoint('StartToStart', currentRange);
	        }
	        range.select();
	    };

	});
	// editor command hooks
	_e(function (E, $) {
	    
	    E.fn.commandHooks = function () {
	        var editor = this;
	        var commandHooks = {};
	        
	        // insertHtml
	        commandHooks.insertHtml = function (html) {
	            var $elem = $(html);
	            var rangeElem = editor.getRangeElem();
	            var targetElem;
	            
	            targetElem = editor.getLegalTags(rangeElem);
	            if (!targetElem) {
	                return;
	            }

	            $(targetElem).after($elem);
	        };

	        // 保存到对象
	        editor.commandHooks = commandHooks;
	    };

	});
	// editor command API
	_e(function (E, $) {

	    // 基本命令
	    E.fn.command = function (e, commandName, commandValue, callback) {
	        var editor = this;
	        var hooks;
	        
	        function commandFn() {
	            if (!commandName) {
	                return;
	            }
	            if (editor.queryCommandSupported(commandName)) {
	                // 默认命令
	                document.execCommand(commandName, false, commandValue);
	            } else {
	                // hooks 命令
	                hooks = editor.commandHooks;
	                if (commandName in hooks) {
	                    hooks[commandName](commandValue);
	                }
	            }
	        }

	        this.customCommand(e, commandFn, callback);
	    };

	    // 针对一个elem对象执行基础命令
	    E.fn.commandForElem = function (elemOpt, e, commandName, commandValue, callback) {
	        // 取得查询elem的查询条件和验证函数
	        var selector;
	        var check;
	        if (typeof elemOpt === 'string') {
	            selector = elemOpt;
	        } else {
	            selector = elemOpt.selector;
	            check = elemOpt.check;
	        }

	        // 查询elem
	        var rangeElem = this.getRangeElem();
	        rangeElem = this.getSelfOrParentByName(rangeElem, selector, check);

	        // 根据elem设置range
	        if (rangeElem) {
	            this.setRangeByElem(rangeElem);
	        }

	        // 然后执行基础命令
	        this.command(e, commandName, commandValue, callback);
	    };

	    // 自定义命令
	    E.fn.customCommand = function (e, commandFn, callback) {
	        var editor = this;
	        var range = editor.currentRange();

	        if (!range) {
	            // 目前没有选区，则无法执行命令
	            e && e.preventDefault();
	            return;
	        }
	        // 记录内容，以便撤销（执行命令之前就要记录）
	        editor.undoRecord();

	        // 恢复选区（有 range 参数）
	        this.restoreSelection(range);

	        // 执行命令事件
	        commandFn.call(editor);

	        // 保存选区（无参数，要从浏览器直接获取range信息）
	        this.saveSelection();
	        // 重新恢复选区（无参数，要取得刚刚从浏览器得到的range信息）
	        this.restoreSelection();

	        // 执行 callback
	        if (callback && typeof callback === 'function') {
	            callback.call(editor);
	        }

	        // 最后插入空行
	        editor.txt.insertEmptyP();

	        // 包裹暴露的img和text
	        editor.txt.wrapImgAndText();

	        // 更新内容
	        editor.updateValue();

	        // 更新菜单样式
	        editor.updateMenuStyle();

	        // 隐藏 dropPanel dropList modal  设置 200ms 间隔
	        function hidePanelAndModal() {
	            editor.hideDropPanelAndModal();
	        } 
	        setTimeout(hidePanelAndModal, 200);

	        if (e) {
	            e.preventDefault();
	        }
	    };

	    // 封装 document.queryCommandValue 函数
	    // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
	    E.fn.queryCommandValue = function (commandName) {
	        var result = '';
	        try {
	            result = document.queryCommandValue(commandName);
	        } catch (ex) {

	        }
	        return result;
	    };

	    // 封装 document.queryCommandState 函数
	    // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
	    E.fn.queryCommandState = function (commandName) {
	        var result = false;
	        try {
	            result = document.queryCommandState(commandName);
	        } catch (ex) {

	        }
	        return result;
	    };

	    // 封装 document.queryCommandSupported 函数
	    E.fn.queryCommandSupported = function (commandName) {
	        var result = false;
	        try {
	            result = document.queryCommandSupported(commandName);
	        } catch (ex) {

	        }
	        return result;
	    };

	});
	// dom selector
	_e(function (E, $) {

	    var matchesSelector;

	    // matchesSelector hook
	    function _matchesSelectorForIE(selector) {
	        var elem = this;
	        var $elems = $(selector);
	        var result = false;

	        // 用jquery查找 selector 所有对象，如果其中有一个和传入 elem 相同，则证明 elem 符合 selector
	        $elems.each(function () {
	            if (this === elem) {
	                result = true;
	                return false;
	            }
	        });

	        return result;
	    }

	    // 从当前的elem，往上去查找合法标签 如 p head table blockquote ul ol 等
	    E.fn.getLegalTags = function (elem) {
	        var legalTags = this.config.legalTags;
	        if (!legalTags) {
	            E.error('配置项中缺少 legalTags 的配置');
	            return;
	        }
	        return this.getSelfOrParentByName(elem, legalTags);
	    };

	    // 根据条件，查询自身或者父元素，符合即返回
	    E.fn.getSelfOrParentByName = function (elem, selector, check) {

	        if (!elem || !selector) {
	            return;
	        }

	        if (!matchesSelector) {
	            // 定义 matchesSelector 函数
	            matchesSelector = elem.webkitMatchesSelector || 
	                              elem.mozMatchesSelector ||
	                              elem.oMatchesSelector || 
	                              elem.matchesSelector;
	        }
	        if (!matchesSelector) {
	            // 如果浏览器本身不支持 matchesSelector 则使用自定义的hook
	            matchesSelector = _matchesSelectorForIE;
	        }

	        var txt = this.txt.$txt.get(0);

	        while (elem && txt !== elem && $.contains(txt, elem)) {
	            if (matchesSelector.call(elem, selector)) {
	                // 符合 selector 查询条件

	                if (!check) {
	                    // 没有 check 验证函数，直接返回即可
	                    return elem;
	                }

	                if (check(elem)) {
	                    // 如果有 check 验证函数，还需 check 函数的确认
	                    return elem;
	                }
	            }

	            // 如果上一步没经过验证，则将跳转到父元素
	            elem = elem.parentNode;
	        }

	        return;
	    };

	});
	// undo redo
	_e(function (E, $) {

	    var length = 20;  // 缓存的最大长度
	    function _getRedoList(editor) {
	        if (editor._redoList == null) {
	            editor._redoList = [];
	        }
	        return editor._redoList;
	    }
	    function _getUndoList(editor) {
	        if (editor._undoList == null) {
	            editor._undoList = [];
	        }
	        return editor._undoList;
	    }

	    // 数据处理
	    function _handle(editor, data, type) {
	        // var range = data.range;
	        // var range2 = range.cloneRange && range.cloneRange();
	        var val = data.val;
	        var html = editor.txt.$txt.html();

	        if(val == null) {
	            return;
	        }

	        if (val === html) {
	            if (type === 'redo') { 
	                editor.redo();
	                return;
	            } else if (type === 'undo') {
	                editor.undo();
	                return;
	            } else {
	                return;
	            }
	        }

	        // 保存数据
	        editor.txt.$txt.html(val);
	        // 更新数据到textarea（有必要的话）
	        editor.updateValue();

	        // onchange 事件
	        if (editor.onchange && typeof editor.onchange === 'function') {
	            editor.onchange.call(editor);
	        }

	        // ?????
	        // 注释：$txt 被重新赋值之后，range会被重置，cloneRange() 也不好使
	        // // 重置选区
	        // if (range2) {
	        //     editor.restoreSelection(range2);
	        // }
	    }

	    // 记录
	    E.fn.undoRecord = function () {
	        var editor = this;
	        var $txt = editor.txt.$txt;
	        var val = $txt.html();
	        var undoList = _getUndoList(editor);
	        var redoList = _getRedoList(editor);
	        var currentVal = undoList.length ? undoList[0] : '';

	        if (val === currentVal.val) {
	            return;
	        }

	        // 清空 redolist
	        if (redoList.length) {
	            redoList = [];
	        }

	        // 添加数据到 undoList
	        undoList.unshift({
	            range: editor.currentRange(),  // 将当前的range也记录下
	            val: val
	        });

	        // 限制 undoList 长度
	        if (undoList.length > length) {
	            undoList.pop();
	        }
	    };

	    // undo 操作
	    E.fn.undo = function () {
	        var editor = this;
	        var undoList = _getUndoList(editor);
	        var redoList = _getRedoList(editor);

	        if (!undoList.length) {
	            return;
	        }

	        // 取出 undolist 第一个值，加入 redolist
	        var data = undoList.shift();
	        redoList.unshift(data);

	        // 并修改编辑器的内容
	        _handle(this, data, 'undo');
	    };

	    // redo 操作
	    E.fn.redo = function () {
	        var editor = this;
	        var undoList = _getUndoList(editor);
	        var redoList = _getRedoList(editor);
	        if (!redoList.length) {
	            return;
	        }

	        // 取出 redolist 第一个值，加入 undolist
	        var data = redoList.shift();
	        undoList.unshift(data);

	        // 并修改编辑器的内容
	        _handle(this, data, 'redo');
	    };
	});
	// 暴露给用户的 API
	_e(function (E, $) {

	    // 创建编辑器
	    E.fn.create = function () {
	        var editor = this;

	        // 检查 E.$body 是否有值
	        // 如果在 body 之前引用了 js 文件，body 尚未加载，可能没有值
	        if (!E.$body || E.$body.length === 0) {
	            E.$body = $('body');
	            E.$document = $(document);
	            E.$window = $(window);
	        }

	        // 执行 addMenus 之前：
	        // 1. 允许用户修改 editor.UI 自定义配置UI
	        // 2. 允许用户通过修改 editor.menus 来自定义配置菜单
	        // 因此要在 create 时执行，而不是 init           
	        editor.addMenus();

	        // 渲染
	        editor.renderMenus();
	        editor.renderMenuContainer();
	        editor.renderTxt();
	        editor.renderEditorContainer();

	        // 绑定事件
	        editor.eventMenus();
	        editor.eventMenuContainer();
	        editor.eventTxt();

	        // 处理ready事件
	        editor.readyHeadler();

	        // 初始化选区
	        editor.initSelection();

	        // $txt 快捷方式
	        editor.$txt = editor.txt.$txt;

	        // 执行用户自定义事件，通过 E.ready() 添加
	        var _plugins = E._plugins;
	        if (_plugins && _plugins.length) {
	            $.each(_plugins, function (k, val) {
	                val.call(editor);
	            });
	        }
	    };

	    // 禁用编辑器
	    E.fn.disable = function () {
	        this.txt.$txt.removeAttr('contenteditable');
	        this.disableMenusExcept();

	        // 先禁用，再记录状态
	        this._disabled = true;
	    };
	    // 启用编辑器
	    E.fn.enable = function () {
	        // 先解除状态记录，再启用
	        this._disabled = false;
	        this.txt.$txt.attr('contenteditable', 'true');
	        this.enableMenusExcept();
	    };

	    // 销毁编辑器
	    E.fn.destroy = function () {
	        var self = this;
	        var $valueContainer = self.$valueContainer;
	        var $editorContainer = self.$editorContainer;
	        var valueNodeName = self.valueNodeName;

	        if (valueNodeName === 'div') {
	            // div 生成的编辑器
	            $valueContainer.removeAttr('contenteditable');
	            $editorContainer.after($valueContainer);
	            $editorContainer.hide();
	        } else {
	            // textarea 生成的编辑器
	            $valueContainer.show();
	            $editorContainer.hide();
	        }
	    };

	    // 撤销 销毁编辑器
	    E.fn.undestroy = function () {
	        var self = this;
	        var $valueContainer = self.$valueContainer;
	        var $editorContainer = self.$editorContainer;
	        var $menuContainer = self.menuContainer.$menuContainer;
	        var valueNodeName = self.valueNodeName;

	        if (valueNodeName === 'div') {
	            // div 生成的编辑器
	            $valueContainer.attr('contenteditable', 'true');
	            $menuContainer.after($valueContainer);
	            $editorContainer.show();
	        } else {
	            // textarea 生成的编辑器
	            $valueContainer.hide();
	            $editorContainer.show();
	        }
	    };

	    // 清空内容的快捷方式
	    E.fn.clear = function () {
	        var editor = this;
	        var $txt = editor.txt.$txt;
	        $txt.html('<p><br></p>');
	        editor.restoreSelectionByElem($txt.find('p').get(0));
	    };

	});
	// menuContainer 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var MenuContainer = function (editor) {
	        this.editor = editor;
	        this.init();
	    };

	    MenuContainer.fn = MenuContainer.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.MenuContainer = MenuContainer;

	});
	// MenuContainer.fn bind fn
	_e(function (E, $) {

	    var MenuContainer = E.MenuContainer;

	    // 初始化
	    MenuContainer.fn.init = function () {
	        var self = this;
	        var $menuContainer = $('<div class="wangEditor-menu-container clearfix"></div>');

	        self.$menuContainer = $menuContainer;

	        // change shadow
	        self.changeShadow();
	    };

	    // 编辑区域滚动时，增加shadow
	    MenuContainer.fn.changeShadow = function () {
	        var $menuContainer = this.$menuContainer;
	        var editor = this.editor;
	        var $txt = editor.txt.$txt;

	        $txt.on('scroll', function () {
	            if ($txt.scrollTop() > 10) {
	                $menuContainer.addClass('wangEditor-menu-shadow');
	            } else {
	                $menuContainer.removeClass('wangEditor-menu-shadow');
	            }
	        });
	    };

	});
	// MenuContainer.fn API
	_e(function (E, $) {

	    var MenuContainer = E.MenuContainer;

	    MenuContainer.fn.render = function () {
	        var $menuContainer = this.$menuContainer;
	        var $editorContainer = this.editor.$editorContainer;

	        $editorContainer.append($menuContainer);
	    };
	    
	    // 获取菜单栏的高度
	    MenuContainer.fn.height = function () {
	        var $menuContainer = this.$menuContainer;
	        return $menuContainer.height();
	    };

	    // 添加菜单
	    MenuContainer.fn.appendMenu = function (groupIdx, menu) {
	        // 判断是否需要新增一个菜单组
	        this._addGroup(groupIdx);
	        // 增加菜单（返回 $menuItem）
	        return this._addOneMenu(menu);
	    };
	    MenuContainer.fn._addGroup = function (groupIdx) {
	        var $menuContainer = this.$menuContainer;
	        var $menuGroup;
	        if (!this.$currentGroup || this.currentGroupIdx !== groupIdx) {
	            $menuGroup = $('<div class="menu-group clearfix"></div>');
	            $menuContainer.append($menuGroup);

	            this.$currentGroup = $menuGroup;
	            this.currentGroupIdx = groupIdx;
	        }
	    };
	    MenuContainer.fn._addOneMenu = function (menu) {
	        var $menuNormal = menu.$domNormal;
	        var $menuSelected = menu.$domSelected;

	        var $menuGroup = this.$currentGroup;
	        var $item = $('<div class="menu-item clearfix"></div>');
	        $menuSelected.hide();
	        $item.append($menuNormal).append($menuSelected);
	        $menuGroup.append($item);

	        return $item;
	    };

	});
	// menu 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var Menu = function (opt) {
	        this.editor = opt.editor;
	        this.id = opt.id;
	        this.title = opt.title;
	        this.$domNormal = opt.$domNormal;
	        this.$domSelected = opt.$domSelected || opt.$domNormal;

	        // document.execCommand 的参数
	        this.commandName = opt.commandName;
	        this.commandValue = opt.commandValue;
	        this.commandNameSelected = opt.commandNameSelected || opt.commandName;
	        this.commandValueSelected = opt.commandValueSelected || opt.commandValue;
	    };

	    Menu.fn = Menu.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.Menu = Menu;
	});
	// Menu.fn 初始化绑定的事件
	_e(function (E, $) {

	    var Menu = E.Menu;

	    // 初始化UI
	    Menu.fn.initUI = function () {
	        var editor = this.editor;
	        var uiConfig = editor.UI.menus;
	        var menuId = this.id;
	        var menuUI = uiConfig[menuId];

	        if (this.$domNormal && this.$domSelected) {
	            // 自定义的菜单中，已经传入了 $dom 无需从配置文件中查找生成
	            return;
	        }

	        if (menuUI == null) {
	            E.warn('editor.UI配置中，没有菜单 "' + menuId + '" 的UI配置，只能取默认值');
	            
	            // 必须写成 uiConfig['default'];
	            // 写成 uiConfig.default IE8会报错
	            menuUI = uiConfig['default'];
	        }

	        // 正常状态
	        this.$domNormal = $(menuUI.normal);

	        // 选中状态
	        if (/^\./.test(menuUI.selected)) {
	            // 增加一个样式
	            this.$domSelected = this.$domNormal.clone().addClass(menuUI.selected.slice(1));
	        } else {
	            // 一个新的dom对象
	            this.$domSelected = $(menuUI.selected);
	        }
	    };

	});
	// Menu.fn API
	_e(function (E, $) {

	    var Menu = E.Menu;

	    // 渲染菜单
	    Menu.fn.render = function (groupIdx) {
	        // 渲染UI
	        this.initUI();
	        
	        var editor = this.editor;
	        var menuContainer = editor.menuContainer;
	        var $menuItem = menuContainer.appendMenu(groupIdx, this);
	        var onRender = this.onRender;

	        // 渲染tip
	        this._renderTip($menuItem);

	        // 执行 onRender 函数
	        if (onRender && typeof onRender === 'function') {
	            onRender.call(this);
	        }
	    };
	    Menu.fn._renderTip = function ($menuItem) {
	        var self = this;
	        var editor = self.editor;
	        var title = self.title;
	        var $tip = $('<div class="menu-tip"></div>');
	        // var $triangle = $('<i class="tip-triangle"></i>'); // 小三角

	        // 计算 tip 宽度
	        var $tempDiv;
	        if (!self.tipWidth) {
	            // 设置一个纯透明的 p（absolute;top:-10000px;不会显示在内容区域）
	            // 内容赋值为 title ，为了计算tip宽度
	            $tempDiv = $('<p style="opacity:0; filter:Alpha(opacity=0); position:absolute;top:-10000px;">' + title + '</p>');
	            // 先添加到body，计算完再 remove
	            E.$body.append($tempDiv);
	            editor.ready(function () {
	                var editor = this;
	                var titleWidth = $tempDiv.outerWidth() + 5; // 多出 5px 的冗余
	                var currentWidth = $tip.outerWidth();
	                var currentMarginLeft = parseFloat($tip.css('margin-left'), 10);
	                // 计算完，拿到数据，则弃用
	                $tempDiv.remove();
	                $tempDiv = null;

	                // 重新设置样式
	                $tip.css({
	                    width: titleWidth,
	                    'margin-left': currentMarginLeft + (currentWidth - titleWidth)/2
	                });

	                // 存储
	                self.tipWidth = titleWidth;
	            });
	        }

	        // $tip.append($triangle);
	        $tip.append(title);
	        $menuItem.append($tip);

	        function show() {
	            $tip.show();
	        }
	        function hide() {
	            $tip.hide();
	        }

	        var timeoutId;
	        $menuItem.find('a').on('mouseenter', function (e) {
	            if (!self.active() && !self.disabled()) {
	                timeoutId = setTimeout(show, 200);
	            }
	        }).on('mouseleave', function (e) {
	            timeoutId && clearTimeout(timeoutId);
	            hide();
	        }).on('click', hide);
	    };

	    // 绑定事件
	    Menu.fn.bindEvent = function () {
	        var self = this;

	        var $domNormal = self.$domNormal;
	        var $domSelected = self.$domSelected;

	        // 试图获取该菜单定义的事件（未selected），没有则自己定义
	        var clickEvent = self.clickEvent;
	        if (!clickEvent) {
	            clickEvent = function (e) {
	                // -----------dropPanel dropList modal-----------
	                var dropObj = self.dropPanel || self.dropList || self.modal;
	                if (dropObj && dropObj.show) {
	                    if (dropObj.isShowing) {
	                        dropObj.hide();
	                    } else {
	                        dropObj.show();
	                    }
	                    return;
	                }

	                // -----------command-----------
	                var editor = self.editor;
	                var commandName;
	                var commandValue;

	                var selected = self.selected;
	                if (selected) {
	                    commandName = self.commandNameSelected;
	                    commandValue = self.commandValueSelected;
	                } else {
	                    commandName = self.commandName;
	                    commandValue = self.commandValue;
	                }

	                if (commandName) {
	                    // 执行命令
	                    editor.command(e, commandName, commandValue);
	                } else {
	                    // 提示
	                    E.warn('菜单 "' + self.id + '" 未定义click事件');
	                    e.preventDefault();
	                }
	            };
	        }
	        // 获取菜单定义的selected情况下的点击事件
	        var clickEventSelected = self.clickEventSelected || clickEvent;

	        // 将事件绑定到菜单dom上
	        $domNormal.click(function (e) {
	            if (!self.disabled()) {
	                clickEvent.call(self, e);
	                self.updateSelected();
	            }
	            e.preventDefault();
	        });
	        $domSelected.click(function (e) {
	            if (!self.disabled()) {
	                clickEventSelected.call(self, e);
	                self.updateSelected();
	            }
	            e.preventDefault();
	        });
	    };

	    // 更新选中状态
	    Menu.fn.updateSelected = function () {
	        var self = this;
	        var editor = self.editor;

	        // 试图获取用户自定义的判断事件
	        var updateSelectedEvent = self.updateSelectedEvent;
	        if (!updateSelectedEvent) {
	            // 用户未自定义，则设置默认值
	            updateSelectedEvent = function () {
	                var self = this;
	                var editor = self.editor;
	                var commandName = self.commandName;
	                var commandValue = self.commandValue;

	                if (commandValue) {
	                    if (editor.queryCommandValue(commandName).toLowerCase() === commandValue.toLowerCase()) {
	                        return true;
	                    }
	                } else if (editor.queryCommandState(commandName)) {
	                    return true;
	                }

	                return false;
	            };
	        }

	        // 获取结果
	        var result = updateSelectedEvent.call(self);
	        result = !!result;

	        // 存储结果、显示效果
	        self.changeSelectedState(result);
	    };

	    // 切换选中状态、显示效果
	    Menu.fn.changeSelectedState = function (state) {
	        var self = this;
	        var selected = self.selected;

	        if (state != null && typeof state === 'boolean') {
	            if (selected === state) {
	                // 计算结果和当前的状态一样
	                return;
	            }
	            // 存储结果
	            self.selected = state;

	            // 切换菜单的显示
	            if (state) {
	                // 选中
	                self.$domNormal.hide();
	                self.$domSelected.show();
	            } else {
	                // 未选中
	                self.$domNormal.show();
	                self.$domSelected.hide();
	            }
	        } // if
	    };

	    // 点击菜单，显示了 dropPanel modal 时，菜单的状态 
	    Menu.fn.active = function (active) {
	        if (active == null) {
	            return this._activeState;
	        }
	        this._activeState = active;
	    };
	    Menu.fn.activeStyle = function (active) {
	        var selected = this.selected;
	        var $dom = this.$domNormal;
	        var $domSelected = this.$domSelected;

	        if (active) {
	            $dom.addClass('active');
	            $domSelected.addClass('active');
	        } else {
	            $dom.removeClass('active');
	            $domSelected.removeClass('active');
	        }

	        // 记录状态 （ menu hover 时会取状态用 ）
	        this.active(active);
	    };

	    // 菜单的启用和禁用
	    Menu.fn.disabled = function (opt) {
	        // 参数为空，取值
	        if (opt == null) {
	            return !!this._disabled;
	        }

	        if (this._disabled === opt) {
	            // 要设置的参数值和当前参数只一样，无需再次设置
	            return;
	        }

	        var $dom = this.$domNormal;
	        var $domSelected = this.$domSelected;

	        // 设置样式
	        if (opt) {
	            $dom.addClass('disable');
	            $domSelected.addClass('disable');
	        } else {
	            $dom.removeClass('disable');
	            $domSelected.removeClass('disable');
	        }

	        // 存储
	        this._disabled = opt;
	    };

	});
	// dropList 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var DropList = function (editor, menu, opt) {
	        this.editor = editor;
	        this.menu = menu;

	        // list 的数据源，格式 {'commandValue': 'title', ...}
	        this.data = opt.data;
	        // 要为每个item自定义的模板
	        this.tpl = opt.tpl;
	        // 为了执行 editor.commandForElem 而传入的elem查询方式
	        this.selectorForELemCommand = opt.selectorForELemCommand;

	        // 执行事件前后的钩子
	        this.beforeEvent = opt.beforeEvent;
	        this.afterEvent = opt.afterEvent;

	        // 初始化
	        this.init();
	    };

	    DropList.fn = DropList.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.DropList = DropList;
	});
	// dropList fn bind
	_e(function (E, $) {

	    var DropList = E.DropList;

	    // init
	    DropList.fn.init = function () {
	        var self = this;

	        // 生成dom对象
	        self.initDOM();

	        // 绑定command事件
	        self.bindEvent();

	        // 声明隐藏的事件
	        self.initHideEvent();
	    };

	    // 初始化dom结构
	    DropList.fn.initDOM = function () {
	        var self = this;
	        var data = self.data;
	        var tpl = self.tpl || '<span>{#title}</span>';
	        var $list = $('<div class="wangEditor-drop-list clearfix"></div>');

	        var itemContent;
	        var $item;
	        $.each(data, function (commandValue, title) {
	            itemContent = tpl.replace(/{#commandValue}/ig, commandValue).replace(/{#title}/ig, title);
	            $item = $('<a href="#" commandValue="' + commandValue + '"></a>');
	            $item.append(itemContent);
	            $list.append($item);
	        });

	        self.$list = $list;
	    };

	    // 绑定事件
	    DropList.fn.bindEvent = function () {
	        var self = this;
	        var editor = self.editor;
	        var menu = self.menu;
	        var commandName = menu.commandName;
	        var selectorForELemCommand = self.selectorForELemCommand;
	        var $list = self.$list;

	        // 执行事件前后的钩子函数
	        var beforeEvent = self.beforeEvent;
	        var afterEvent = self.afterEvent;

	        $list.on('click', 'a[commandValue]', function (e) {
	            // 正式命令执行之前
	            if (beforeEvent && typeof beforeEvent === 'function') {
	                beforeEvent.call(e);
	            }

	            // 执行命令
	            var commandValue = $(e.currentTarget).attr('commandValue');
	            if (menu.selected && editor.isRangeEmpty() && selectorForELemCommand) {
	                // 当前处于选中状态，并且选中内容为空
	                editor.commandForElem(selectorForELemCommand, e, commandName, commandValue);
	            } else {
	                // 当前未处于选中状态，或者有选中内容。则执行默认命令
	                editor.command(e, commandName, commandValue);
	            }

	            // 正式命令之后的钩子
	            if (afterEvent && typeof afterEvent === 'function') {
	                afterEvent.call(e);
	            }
	        });
	    };

	    // 点击其他地方，立即隐藏 droplist
	    DropList.fn.initHideEvent = function () {
	        var self = this;

	        // 获取 list elem
	        var thisList = self.$list.get(0);

	        E.$body.on('click', function (e) {
	            if (!self.isShowing) {
	                return;
	            }
	            var trigger = e.target;

	            // 获取菜单elem
	            var menu = self.menu;
	            var menuDom;
	            if (menu.selected) {
	                menuDom = menu.$domSelected.get(0);
	            } else {
	                menuDom = menu.$domNormal.get(0);
	            }

	            if (menuDom === trigger || $.contains(menuDom, trigger)) {
	                // 说明由本菜单点击触发的
	                return;
	            }

	            if (thisList === trigger || $.contains(thisList, trigger)) {
	                // 说明由本list点击触发的
	                return;
	            }

	            // 其他情况，隐藏 list
	            self.hide();
	        });

	        E.$window.scroll(function () {
	            self.hide();
	        });

	        E.$window.on('resize', function () {
	            self.hide();
	        });
	    };

	});
	// dropListfn api
	_e(function (E, $) {
	    
	    var DropList = E.DropList;

	    // 渲染
	    DropList.fn._render = function () {
	        var self = this;
	        var editor = self.editor;
	        var $list = self.$list;

	        // 渲染到页面
	        editor.$editorContainer.append($list);

	        // 记录状态
	        self.rendered = true;
	    };

	    // 定位
	    DropList.fn._position = function () {
	        var self = this;
	        var $list = self.$list;
	        var editor = self.editor;
	        var menu = self.menu;
	        var $menuContainer = editor.menuContainer.$menuContainer;
	        var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
	        // 注意这里的 offsetParent() 要返回 .menu-item 的 position
	        // 因为 .menu-item 是 position:relative
	        var menuPosition = $menuDom.offsetParent().position();

	        // 取得 menu 的位置、尺寸属性
	        var menuTop = menuPosition.top;
	        var menuLeft = menuPosition.left;
	        var menuHeight = $menuDom.offsetParent().height();
	        var menuWidth = $menuDom.offsetParent().width();

	        // 取得 list 的尺寸属性
	        var listWidth = $list.outerWidth();
	        // var listHeight = $list.outerHeight();

	        // 取得 $txt 的尺寸
	        var txtWidth = editor.txt.$txt.outerWidth();

	        // ------------开始计算-------------

	        // 初步计算 list 位置属性
	        var top = menuTop + menuHeight;
	        var left = menuLeft + menuWidth/2;
	        var marginLeft = 0 - menuWidth/2;

	        // 如果超出了有边界，则要左移（且和右侧有间隙）
	        var valWithTxt = (left + listWidth) - txtWidth;
	        if (valWithTxt > -10) {
	            marginLeft = marginLeft - valWithTxt - 10;
	        }
	        // 设置样式
	        $list.css({
	            top: top,
	            left: left,
	            'margin-left': marginLeft
	        });

	        // 如果因为向下滚动而导致菜单fixed，则再加一步处理
	        if (editor._isMenufixed) {
	            top = top + (($menuContainer.offset().top + $menuContainer.outerHeight()) - $list.offset().top);

	            // 重新设置top
	            $list.css({
	                top: top
	            });
	        }
	    };

	    // 显示
	    DropList.fn.show = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.rendered) {
	            // 第一次show之前，先渲染
	            self._render();
	        }

	        if (self.isShowing) {
	            return;
	        }

	        var $list = self.$list;
	        $list.show();

	        // 定位
	        self._position();

	        // 记录状态
	        self.isShowing = true;

	        // 菜单状态
	        menu.activeStyle(true);
	    };

	    // 隐藏
	    DropList.fn.hide = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.isShowing) {
	            return;
	        }

	        var $list = self.$list;
	        $list.hide();

	        // 记录状态
	        self.isShowing = false;

	        // 菜单状态
	        menu.activeStyle(false);
	    };
	});
	// dropPanel 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var DropPanel = function (editor, menu, opt) {
	        this.editor = editor;
	        this.menu = menu;
	        this.$content = opt.$content;
	        this.width = opt.width || 200;
	        this.height = opt.height;
	        this.onRender = opt.onRender;

	        // init
	        this.init();
	    };

	    DropPanel.fn = DropPanel.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.DropPanel = DropPanel;
	});
	// dropPanel fn bind
	_e(function (E, $) {

	    var DropPanel = E.DropPanel;

	    // init
	    DropPanel.fn.init = function () {
	        var self = this;

	        // 生成dom对象
	        self.initDOM();

	        // 声明隐藏的事件
	        self.initHideEvent();
	    };

	    // init DOM
	    DropPanel.fn.initDOM = function () {
	        var self = this;
	        var $content = self.$content;
	        var width = self.width;
	        var height = self.height;
	        var $panel = $('<div class="wangEditor-drop-panel clearfix"></div>');
	        var $triangle = $('<div class="tip-triangle"></div>');

	        $panel.css({
	            width: width,
	            height: height ? height : 'auto'
	        });
	        $panel.append($triangle);
	        $panel.append($content);

	        // 添加对象数据
	        self.$panel = $panel;
	        self.$triangle = $triangle;
	    };

	    // 点击其他地方，立即隐藏 dropPanel
	    DropPanel.fn.initHideEvent = function () {
	        var self = this;

	        // 获取 panel elem
	        var thisPanle = self.$panel.get(0);

	        E.$body.on('click', function (e) {
	            if (!self.isShowing) {
	                return;
	            }
	            var trigger = e.target;

	            // 获取菜单elem
	            var menu = self.menu;
	            var menuDom;
	            if (menu.selected) {
	                menuDom = menu.$domSelected.get(0);
	            } else {
	                menuDom = menu.$domNormal.get(0);
	            }

	            if (menuDom === trigger || $.contains(menuDom, trigger)) {
	                // 说明由本菜单点击触发的
	                return;
	            }

	            if (thisPanle === trigger || $.contains(thisPanle, trigger)) {
	                // 说明由本panel点击触发的
	                return;
	            }

	            // 其他情况，隐藏 panel
	            self.hide();
	        });

	        E.$window.scroll(function (e) {
	            self.hide();
	        });

	        E.$window.on('resize', function () {
	            self.hide();
	        });
	    };

	});
	// dropPanel fn api
	_e(function (E, $) {
	   
	    var DropPanel = E.DropPanel;

	    // 渲染
	    DropPanel.fn._render = function () {
	        var self = this;
	        var onRender = self.onRender;
	        var editor = self.editor;
	        var $panel = self.$panel;

	        // 渲染到页面
	        editor.$editorContainer.append($panel);

	        // 渲染后的回调事件
	        onRender && onRender.call(self);

	        // 记录状态
	        self.rendered = true;
	    };

	    // 定位
	    DropPanel.fn._position = function () {
	        var self = this;
	        var $panel = self.$panel;
	        var $triangle = self.$triangle;
	        var editor = self.editor;
	        var $menuContainer = editor.menuContainer.$menuContainer;
	        var menu = self.menu;
	        var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
	        // 注意这里的 offsetParent() 要返回 .menu-item 的 position
	        // 因为 .menu-item 是 position:relative
	        var menuPosition = $menuDom.offsetParent().position();

	        // 取得 menu 的位置、尺寸属性
	        var menuTop = menuPosition.top;
	        var menuLeft = menuPosition.left;
	        var menuHeight = $menuDom.offsetParent().height();
	        var menuWidth = $menuDom.offsetParent().width();

	        // 取得 panel 的尺寸属性
	        var panelWidth = $panel.outerWidth();
	        // var panelHeight = $panel.outerHeight();

	        // 取得 $txt 的尺寸
	        var txtWidth = editor.txt.$txt.outerWidth();

	        // ------------开始计算-------------

	        // 初步计算 panel 位置属性
	        var top = menuTop + menuHeight;
	        var left = menuLeft + menuWidth/2;
	        var marginLeft = 0 - panelWidth/2;
	        var marginLeft2 = marginLeft;  // 下文用于和 marginLeft 比较，来设置三角形tip的位置

	        // 如果超出了左边界，则移动回来（要和左侧有10px间隙）
	        if ((0 - marginLeft) > (left - 10)) {
	            marginLeft = 0 - (left - 10);
	        }

	        // 如果超出了有边界，则要左移（且和右侧有10px间隙）
	        var valWithTxt = (left + panelWidth + marginLeft) - txtWidth;
	        if (valWithTxt > -10) {
	            marginLeft = marginLeft - valWithTxt - 10;
	        }

	        // 设置样式
	        $panel.css({
	            top: top,
	            left: left,
	            'margin-left': marginLeft
	        });

	        // 如果因为向下滚动而导致菜单fixed，则再加一步处理
	        if (editor._isMenufixed) {
	            top = top + (($menuContainer.offset().top + $menuContainer.outerHeight()) - $panel.offset().top);

	            // 重新设置top
	            $panel.css({
	                top: top
	            });
	        }

	        // 设置三角形 tip 的位置
	        $triangle.css({
	            'margin-left': marginLeft2 - marginLeft - 5
	        });
	    };

	    // focus 第一个 input
	    DropPanel.fn.focusFirstInput = function () {
	        var self = this;
	        var $panel = self.$panel;
	        $panel.find('input[type=text],textarea').each(function () {
	            var $input = $(this);
	            if ($input.attr('disabled') == null) {
	                $input.focus();
	                return false;
	            }
	        });
	    };

	    // 显示
	    DropPanel.fn.show = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.rendered) {
	            // 第一次show之前，先渲染
	            self._render();
	        }

	        if (self.isShowing) {
	            return;
	        }

	        var $panel = self.$panel;
	        $panel.show();

	        // 定位
	        self._position();

	        // 记录状态
	        self.isShowing = true;

	        // 菜单状态
	        menu.activeStyle(true);

	        if (E.w3cRange) {
	            // 高级浏览器
	            self.focusFirstInput();
	        } else {
	            // 兼容 IE8 input placeholder
	            E.placeholderForIE8($panel);
	        }
	    };

	    // 隐藏
	    DropPanel.fn.hide = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.isShowing) {
	            return;
	        }

	        var $panel = self.$panel;
	        $panel.hide();

	        // 记录状态
	        self.isShowing = false;

	        // 菜单状态
	        menu.activeStyle(false);
	    };

	});
	// modal 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var Modal = function (editor, menu, opt) {
	        this.editor = editor;
	        this.menu = menu;
	        this.$content = opt.$content;

	        this.init();
	    };

	    Modal.fn = Modal.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.Modal = Modal;
	});
	// modal fn bind
	_e(function (E, $) {

	    var Modal = E.Modal;

	    Modal.fn.init = function () {
	        var self = this;

	        // 初始化dom
	        self.initDom();

	        // 初始化隐藏事件
	        self.initHideEvent();
	    };

	    // 初始化dom
	    Modal.fn.initDom = function () {
	        var self = this;
	        var $content = self.$content;
	        var $modal = $('<div class="wangEditor-modal"></div>');
	        var $close = $('<div class="wangEditor-modal-close"><i class="wangeditor-menu-img-cancel-circle"></i></div>');

	        $modal.append($close);
	        $modal.append($content);

	        // 记录数据
	        self.$modal = $modal;
	        self.$close = $close;
	    };

	    // 初始化隐藏事件
	    Modal.fn.initHideEvent = function () {
	        var self = this;
	        var $close = self.$close;
	        var modal = self.$modal.get(0);

	        // 点击 $close 按钮，隐藏
	        $close.click(function () {
	            self.hide();
	        });

	        // 点击其他部分，隐藏
	        E.$body.on('click', function (e) {
	            if (!self.isShowing) {
	                return;
	            }
	            var trigger = e.target;

	            // 获取菜单elem
	            var menu = self.menu;
	            var menuDom;
	            if (menu) {
	                if (menu.selected) {
	                    menuDom = menu.$domSelected.get(0);
	                } else {
	                    menuDom = menu.$domNormal.get(0);
	                }

	                if (menuDom === trigger || $.contains(menuDom, trigger)) {
	                    // 说明由本菜单点击触发的
	                    return;
	                }
	            }

	            if (modal === trigger || $.contains(modal, trigger)) {
	                // 说明由本panel点击触发的
	                return;
	            }

	            // 其他情况，隐藏 panel
	            self.hide();
	        });
	    };
	});
	// modal fn api
	_e(function (E, $) {

	    var Modal = E.Modal;

	    // 渲染
	    Modal.fn._render = function () {
	        var self = this;
	        var editor = self.editor;
	        var $modal = self.$modal;

	        // $modal的z-index，在配置的z-index基础上再 +10
	        $modal.css('z-index', editor.config.zindex + 10 + '');

	        // 渲染到body最后面
	        E.$body.append($modal);

	        // 记录状态
	        self.rendered = true;
	    };

	    // 定位
	    Modal.fn._position = function () {
	        var self = this;
	        var $modal = self.$modal;
	        var top = $modal.offset().top;
	        var width = $modal.outerWidth();
	        var height = $modal.outerHeight();
	        var marginLeft = 0 - (width / 2);
	        var marginTop = 0 - (height / 2);
	        var sTop = E.$window.scrollTop();

	        // 保证modal最顶部，不超过浏览器上边框
	        if ((height / 2) > top) {
	            marginTop = 0 - top;
	        }

	        $modal.css({
	            'margin-left': marginLeft + 'px',
	            'margin-top': (marginTop + sTop) + 'px'
	        });
	    };

	    // 显示
	    Modal.fn.show = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.rendered) {
	            // 第一次show之前，先渲染
	            self._render();
	        }

	        if (self.isShowing) {
	            return;
	        }
	        // 记录状态
	        self.isShowing = true;

	        var $modal = self.$modal;
	        $modal.show();

	        // 定位
	        self._position();

	        // 激活菜单状态
	        menu && menu.activeStyle(true);
	    };

	    // 隐藏
	    Modal.fn.hide = function () {
	        var self = this;
	        var menu = self.menu;
	        if (!self.isShowing) {
	            return;
	        }
	        // 记录状态
	        self.isShowing = false;

	        // 隐藏
	        var $modal = self.$modal;
	        $modal.hide();

	        // 菜单状态
	        menu && menu.activeStyle(false);
	    };
	});
	// txt 构造函数
	_e(function (E, $) {

	    // 定义构造函数
	    var Txt = function (editor) {
	        this.editor = editor;

	        // 初始化
	        this.init();
	    };

	    Txt.fn = Txt.prototype;

	    // 暴露给 E 即 window.wangEditor
	    E.Txt = Txt;
	});
	// Txt.fn bind fn
	_e(function (E, $) {

	    var Txt = E.Txt;

	    // 初始化
	    Txt.fn.init = function () {
	        var self = this;
	        var editor = self.editor;
	        var $valueContainer = editor.$valueContainer;
	        var currentValue = editor.getInitValue();
	        var $txt;

	        if ($valueContainer.get(0).nodeName === 'DIV') {
	            // 如果传入生成编辑器的元素就是div，则直接使用
	            $txt = $valueContainer;
	            $txt.addClass("wangEditor-txt");
	            $txt.attr('contentEditable', 'true');
	        } else {
	            // 如果不是div（是textarea），则创建一个div
	            $txt = $(
	                '<div class="wangEditor-txt" contentEditable="true">' +
	                    currentValue +
	                '</div>'
	            );
	        }

	        // 试图最后插入一个空行，ready之后才行
	        editor.ready(function () {
	            self.insertEmptyP();
	        });

	        self.$txt = $txt;

	        // 删除时，如果没有内容了，就添加一个 <p><br></p>
	        self.contentEmptyHandle();

	        // enter时，不能使用 div 换行
	        self.bindEnterForDiv();

	        // enter时，用 p 包裹 text
	        self.bindEnterForText();

	        // tab 插入4个空格
	        self.bindTabEvent();

	        // 处理粘贴内容
	        self.bindPasteFilter();

	        // $txt.formatText() 方法
	        self.bindFormatText();

	        // 定义 $txt.html() 方法
	        self.bindHtml();
	    };

	    // 删除时，如果没有内容了，就添加一个 <p><br></p>
	    Txt.fn.contentEmptyHandle = function () {
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;
	        var $p;

	        $txt.on('keydown', function (e) {
	            if (e.keyCode !== 8) {
	                return;
	            }
	            var txtHtml = $.trim($txt.html().toLowerCase());
	            if (txtHtml === '<p><br></p>') {
	                // 如果最后还剩余一个空行，就不再继续删除了
	                e.preventDefault();
	                return;
	            }
	        });

	        $txt.on('keyup', function (e) {
	            if (e.keyCode !== 8) {
	                return;
	            }
	            var txtHtml = $.trim($txt.html().toLowerCase());
	            // ff时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
	            if (!txtHtml || txtHtml === '<br>') {
	                // 内容空了
	                $p = $('<p><br/></p>');
	                $txt.html(''); // 一定要先清空，否则在 ff 下有问题
	                $txt.append($p);
	                editor.restoreSelectionByElem($p.get(0));
	            }
	        });
	    };

	    // enter时，不能使用 div 换行
	    Txt.fn.bindEnterForDiv = function () {
	        var tags = E.config.legalTags; // 配置中编辑器要求的合法标签，如 p head table blockquote ul ol 等
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;

	        var $keydownDivElem;
	        function divHandler() {
	            if (!$keydownDivElem) {
	                return;
	            }

	            var $pElem = $('<p>' + $keydownDivElem.html() + '</p>');
	            $keydownDivElem.after($pElem);
	            $keydownDivElem.remove();
	        }

	        $txt.on('keydown keyup', function (e) {
	            if (e.keyCode !== 13) {
	                return;
	            }
	            // 查找合法标签
	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getLegalTags(rangeElem);
	            var $targetElem;
	            var $pElem;

	            if (!targetElem) {
	                // 没找到合法标签，就去查找 div
	                targetElem = editor.getSelfOrParentByName(rangeElem, 'div');
	                if (!targetElem) {
	                    return;
	                }
	                $targetElem = $(targetElem);

	                if (e.type === 'keydown') {
	                    // 异步执行（同步执行会出现问题）
	                    $keydownDivElem = $targetElem;
	                    setTimeout(divHandler, 0);
	                }

	                if (e.type === 'keyup') {
	                    // 将 div 的内容移动到 p 里面，并移除 div
	                    $pElem = $('<p>' + $targetElem.html() + '</p>');
	                    $targetElem.after($pElem);
	                    $targetElem.remove();

	                    // 如果是回车结束，将选区定位到行首
	                    editor.restoreSelectionByElem($pElem.get(0), 'start');
	                }
	            }
	        });
	    };

	    // enter时，用 p 包裹 text
	    Txt.fn.bindEnterForText = function () {
	        var self = this;
	        var $txt = self.$txt;
	        var handle;
	        $txt.on('keyup', function (e) {
	            if (e.keyCode !== 13) {
	                return;
	            }
	            if (!handle) {
	                handle = function() {
	                    self.wrapImgAndText();
	                };
	            }
	            setTimeout(handle);
	        });
	    };

	    // tab 时，插入4个空格
	    Txt.fn.bindTabEvent = function () {
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;

	        $txt.on('keydown', function (e) {
	            if (e.keyCode !== 9) {
	                // 只监听 tab 按钮
	                return;
	            }
	            // 如果浏览器支持 insertHtml 则插入4个空格。如果不支持，就不管了
	            if (editor.queryCommandSupported('insertHtml')) {
	                editor.command(e, 'insertHtml', '&nbsp;&nbsp;&nbsp;&nbsp;');
	            }
	        });
	    };

	    // 处理粘贴内容
	    Txt.fn.bindPasteFilter = function () {
	        var self = this;
	        var editor = self.editor;
	        var resultHtml = '';  //存储最终的结果
	        var $txt = self.$txt;
	        var legalTags = editor.config.legalTags;
	        var legalTagArr = legalTags.split(',');

	        $txt.on('paste', function (e) {
	            if (!editor.config.pasteFilter) {
	                // 配置中取消了粘贴过滤
	                return;
	            }

	            var currentNodeName = editor.getRangeElem().nodeName;
	            if (currentNodeName === 'TD' || currentNodeName === 'TH') {
	                // 在表格的单元格中粘贴，忽略所有内容。否则会出现异常情况
	                return;
	            }

	            resultHtml = ''; // 先清空 resultHtml

	            var pasteHtml, $paste;
	            var data = e.clipboardData || e.originalEvent.clipboardData;
	            var ieData = window.clipboardData;

	            if (editor.config.pasteText) {
	                // 只粘贴纯文本

	                if (data && data.getData) {
	                    // w3c
	                    pasteHtml = data.getData('text/plain');
	                } else if (ieData && ieData.getData) {
	                    // IE
	                    pasteHtml = ieData.getData('text');
	                } else {
	                    // 其他情况
	                    return;
	                }

	                // 拼接为 <p> 标签
	                if (pasteHtml) {
	                    resultHtml = '<p>' + pasteHtml + '</p>';
	                }

	            } else {
	                // 粘贴过滤了样式的、只有标签的 html

	                if (data && data.getData) {
	                    // w3c

	                    // 获取粘贴过来的html
	                    pasteHtml = data.getData('text/html');
	                    if (pasteHtml) {
	                        // 创建dom
	                        $paste = $('<div>' + pasteHtml + '</div>');
	                        // 处理，并将结果存储到 resultHtml 『全局』变量
	                        handle($paste.get(0));
	                    } else {
	                        // 得不到html，试图获取text
	                        pasteHtml = data.getData('text/plain');
	                        if (pasteHtml) {
	                            // 替换特殊字符
	                            pasteHtml = pasteHtml.replace(/[ ]/g, '&nbsp;')
	                                                 .replace(/</g, '&lt;')
	                                                 .replace(/>/g, '&gt;')
	                                                 .replace(/\n/g, '</p><p>');
	                            // 拼接
	                            resultHtml = '<p>' + pasteHtml + '</p>';

	                            // 查询链接
	                            resultHtml = resultHtml.replace(/<p>(https?:\/\/.*?)<\/p>/ig, function (match, link) {
	                                return '<p><a href="' + link + '" target="_blank">' + link + '</p>';
	                            });
	                        }
	                    }
	                    
	                } else if (ieData && ieData.getData) {
	                    // IE 直接从剪切板中取出纯文本格式
	                    resultHtml = ieData.getData('text');
	                    if (!resultHtml) {
	                        return;
	                    }
	                    // 拼接为 <p> 标签
	                    resultHtml = '<p>' + resultHtml + '</p>';
	                    resultHtml = resultHtml.replace(new RegExp('\n', 'g'), '</p><p>');
	                } else {
	                    // 其他情况
	                    return;
	                }
	            }

	            // 执行命令
	            if (resultHtml) {
	                editor.command(e, 'insertHtml', resultHtml);

	                // 删除内容为空的 p 和嵌套的 p
	                self.clearEmptyOrNestP();
	            }
	        });

	        // 处理粘贴的内容
	        function handle(elem) {
	            if (!elem || !elem.nodeType || !elem.nodeName) {
	                return;
	            }
	            var $elem;
	            var nodeName = elem.nodeName.toLowerCase();
	            var nodeType = elem.nodeType;
	            var childNodesClone;

	            // 只处理文本和普通node标签
	            if (nodeType !== 3 && nodeType !== 1) {
	                return;
	            }

	            $elem = $(elem);

	            // 如果是容器，则继续深度遍历
	            if (nodeName === 'div') {
	                childNodesClone = [];
	                $.each(elem.childNodes, function (index, item) {
	                    // elem.childNodes 可获取TEXT节点，而 $elem.children() 就获取不到
	                    // 先将 elem.childNodes 拷贝一份，一面在循环递归过程中 elem 发生变化
	                    childNodesClone.push(item);
	                });
	                // 遍历子元素，执行操作
	                $.each(childNodesClone, function () {
	                    handle(this);
	                });
	                return;
	            }
	            
	            if (legalTagArr.indexOf(nodeName) >= 0) {
	                // 如果是合法标签之内的，则根据元素类型，获取值
	                resultHtml += getResult(elem);
	            } else if (nodeType === 3) {
	                // 如果是文本，则直接插入 p 标签
	                resultHtml += '<p>' + elem.textContent + '</p>';
	            } else if (nodeName === 'br') {
	                // <br>保留
	                resultHtml += '<br/>';
	            }
	            else {
	                // 忽略的标签
	                if (['meta', 'style', 'script', 'object', 'form', 'iframe', 'hr'].indexOf(nodeName) >= 0) {
	                    return;
	                }
	                // 其他标签，移除属性，插入 p 标签
	                $elem = $(removeAttrs(elem));
	                // 注意，这里的 clone() 是必须的，否则会出错
	                resultHtml += $('<div>').append($elem.clone()).html();
	            }
	        }

	        // 获取元素的结果
	        function getResult(elem) {
	            var nodeName = elem.nodeName.toLowerCase();
	            var $elem;
	            var htmlForP = '';
	            var htmlForLi = '';

	            if (['blockquote'].indexOf(nodeName) >= 0) {

	                // 直接取出元素text即可
	                $elem = $(elem);
	                return '<' + nodeName + '>' + $elem.text() + '</' + nodeName + '>';

	            } else if (['p', 'h1', 'h2', 'h3', 'h4', 'h5'].indexOf(nodeName) >= 0) {

	                //p head 取出 text 和链接
	                elem = removeAttrs(elem);
	                $elem = $(elem);
	                htmlForP = $elem.html();

	                // 剔除 a img 之外的元素
	                htmlForP = htmlForP.replace(/<.*?>/ig, function (tag) {
	                    if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
	                        return tag;
	                    } else {
	                        return '';
	                    }
	                });

	                return '<' + nodeName + '>' + htmlForP + '</' + nodeName + '>';

	            } else if (['ul', 'ol'].indexOf(nodeName) >= 0) {
	                
	                // ul ol元素，获取子元素（li元素）的text link img，再拼接
	                $elem = $(elem);
	                $elem.children().each(function () {
	                    var $li = $(removeAttrs(this));
	                    var html = $li.html();

	                    html = html.replace(/<.*?>/ig, function (tag) {
	                        if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
	                            return tag;
	                        } else {
	                            return '';
	                        }
	                    });

	                    htmlForLi += '<li>' + html + '</li>';
	                });
	                return '<' + nodeName + '>' + htmlForLi + '</' + nodeName + '>';
	            
	            } else {
	                
	                // 其他元素，移除元素属性
	                $elem = $(removeAttrs(elem));
	                return $('<div>').append($elem).html();
	            }
	        }

	        // 移除一个元素（子元素）的attr
	        function removeAttrs(elem) {
	            var attrs = elem.attributes || [];
	            var attrNames = [];
	            var exception = ['href', 'target', 'src', 'alt', 'rowspan', 'colspan']; //例外情况

	            // 先存储下elem中所有 attr 的名称
	            $.each(attrs, function (key, attr) {
	                if (attr && attr.nodeType === 2) {
	                    attrNames.push(attr.nodeName);
	                }
	            });
	            // 再根据名称删除所有attr
	            $.each(attrNames, function (key, attr) {
	                if (exception.indexOf(attr) < 0) {
	                    // 除了 exception 规定的例外情况，删除其他属性
	                    elem.removeAttribute(attr);
	                }
	            });


	            // 递归子节点
	            var children = elem.childNodes;
	            if (children.length) {
	                $.each(children, function (key, value) {
	                    removeAttrs(value);
	                });
	            }

	            return elem;
	        }
	    };

	    // 绑定 $txt.formatText() 方法
	    Txt.fn.bindFormatText = function () {
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;
	        var legalTags = E.config.legalTags;
	        var legalTagArr = legalTags.split(',');
	        var length = legalTagArr.length;
	        var regArr = [];

	        // 将 E.config.legalTags 配置的有效字符，生成正则表达式
	        $.each(legalTagArr, function (k, tag) {
	            var reg = '\>\\s*\<(' + tag + ')\>';
	            regArr.push(new RegExp(reg, 'ig'));
	        });

	        // 增加 li 
	        regArr.push(new RegExp('\>\\s*\<(li)\>', 'ig'));

	        // 增加 tr
	        regArr.push(new RegExp('\>\\s*\<(tr)\>', 'ig'));

	        // 增加 code
	        regArr.push(new RegExp('\>\\s*\<(code)\>', 'ig'));

	        // 生成 formatText 方法
	        $txt.formatText = function () {
	            var $temp = $('<div>');
	            var html = $txt.html();

	            // 去除空格
	            html = html.replace(/\s*</ig, '<');

	            // 段落、表格之间换行
	            $.each(regArr, function (k, reg) {
	                if (!reg.test(html)) {
	                    return;
	                }
	                html = html.replace(reg, function (matchStr, tag) {
	                    return '>\n<' + tag + '>';
	                });
	            });

	            $temp.html(html);
	            return $temp.text();
	        };
	    };

	    // 定制 $txt.html 方法
	    Txt.fn.bindHtml = function () {
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;
	        var $valueContainer = editor.$valueContainer;
	        var valueNodeName = editor.valueNodeName;

	        $txt.html = function (html) {
	            var result;

	            if (valueNodeName === 'div') {
	                // div 生成的编辑器，取值、赋值，都直接触发jquery的html方法
	                result = $.fn.html.call($txt, html);
	            }

	            // textarea 生成的编辑器，则需要考虑赋值时，也给textarea赋值

	            if (html === undefined) {
	                // 取值，直接触发jquery原生html方法
	                result = $.fn.html.call($txt);

	                // 替换 html 中，src和href属性中的 & 字符。
	                // 因为 .html() 或者 .innerHTML 会把所有的 & 字符都改成 &amp; 但是 src 和 href 中的要保持 &
	                result = result.replace(/(href|src)\=\"(.*)\"/igm, function (a, b, c) {
	                    return b + '="' + c.replace('&amp;', '&') + '"';
	                });
	            } else {
	                // 赋值，需要同时给 textarea 赋值
	                result = $.fn.html.call($txt, html);
	                $valueContainer.val(html);
	            }

	            if (html === undefined) {
	                return result;
	            } else {
	                // 手动触发 change 事件，因为 $txt 监控了 change 事件来判断是否需要执行 editor.onchange 
	                $txt.change();
	            }
	        };
	    };
	});
	// Txt.fn api
	_e(function (E, $) {

	    var Txt = E.Txt;

	    var txtChangeEventNames = 'propertychange change click keyup input paste';

	    // 渲染
	    Txt.fn.render = function () {
	        var $txt = this.$txt;
	        var $editorContainer = this.editor.$editorContainer;
	        $editorContainer.append($txt);
	    };

	    // 计算高度
	    Txt.fn.initHeight = function () {
	        var editor = this.editor;
	        var $txt = this.$txt;
	        var valueContainerHeight = editor.$valueContainer.height();
	        var menuHeight = editor.menuContainer.height();
	        var txtHeight = valueContainerHeight - menuHeight;

	        // 限制最小为 50px
	        txtHeight = txtHeight < 50 ? 50 : txtHeight;

	        $txt.height(txtHeight);

	        // 记录原始高度
	        editor.valueContainerHeight = valueContainerHeight;

	        // 设置 max-height
	        this.initMaxHeight(txtHeight, menuHeight);
	    };

	    // 计算最大高度
	    Txt.fn.initMaxHeight = function (txtHeight, menuHeight) {
	        var editor = this.editor;
	        var $menuContainer = editor.menuContainer.$menuContainer;
	        var $txt = this.$txt;
	        var $wrap = $('<div>');

	        // 需要浏览器支持 max-height，否则不管
	        if (window.getComputedStyle && 'max-height'in window.getComputedStyle($txt.get(0))) {
	            // 获取 max-height 并判断是否有值
	            var maxHeight = parseInt(editor.$valueContainer.css('max-height'));
	            if (isNaN(maxHeight)) {
	                return;
	            }

	            // max-height 和『全屏』暂时有冲突
	            if (editor.menus.fullscreen) {
	                E.warn('max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用');
	                return;
	            }

	            // 标记
	            editor.useMaxHeight = true;

	            // 设置maxheight
	            $wrap.css({
	                'max-height': (maxHeight - menuHeight) + 'px',
	                'overflow-y': 'auto'
	            });
	            $txt.css({
	                'height': 'auto',
	                'overflow-y': 'visible',
	                'min-height': txtHeight + 'px'
	            });

	            // 滚动式，菜单阴影
	            $wrap.on('scroll', function () {
	                if ($txt.parent().scrollTop() > 10) {
	                    $menuContainer.addClass('wangEditor-menu-shadow');
	                } else {
	                    $menuContainer.removeClass('wangEditor-menu-shadow');
	                }
	            });

	            // 需在编辑器区域外面再包裹一层
	            $txt.wrap($wrap);
	        }
	    };

	    // 保存选区
	    Txt.fn.saveSelectionEvent = function () {
	        var $txt = this.$txt;
	        var editor = this.editor;
	        var timeoutId;
	        var dt = Date.now();

	        function save() {
	            editor.saveSelection();
	        }

	        // 同步保存选区
	        function saveSync() {
	            // 100ms之内，不重复保存
	            if (Date.now() - dt < 100) {
	                return;
	            }

	            dt = Date.now();
	            save();
	        }

	        // 异步保存选区
	        function saveAync() {
	            // 节流，防止高频率重复操作
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }
	            timeoutId = setTimeout(save, 300);
	        }

	        // txt change 、focus、blur 时随时保存选区
	        $txt.on(txtChangeEventNames + ' focus blur', function (e) {
	            // 先同步保存选区，为了让接下来就马上要执行 editor.getRangeElem() 的程序
	            // 能够获取到正确的 rangeElem
	            saveSync();

	            // 再异步保存选区，为了确定更加准确的选区，为后续的操作做准备
	            saveAync();
	        });

	        // 鼠标拖拽选择时，可能会拖拽到编辑器区域外面再松手，此时 $txt 就监听不到 click事件了
	        $txt.on('mousedown', function () {
	            $txt.on('mouseleave.saveSelection', function (e) {
	                // 先同步后异步，如上述注释
	                saveSync();
	                saveAync();

	                // 顺道吧菜单状态也更新了
	                editor.updateMenuStyle();
	            });
	        }).on('mouseup', function () {
	            $txt.off('mouseleave.saveSelection');
	        });
	        
	    };

	    // 随时更新 value
	    Txt.fn.updateValueEvent = function () {
	        var $txt = this.$txt;
	        var editor = this.editor;
	        var timeoutId, oldValue;

	        // 触发 onchange 事件
	        function doOnchange() {
	            var val = $txt.html();
	            if (oldValue === val) {
	                // 无变化
	                return;
	            }

	            // 触发 onchange 事件
	            if (editor.onchange && typeof editor.onchange === 'function') {
	                editor.onchange.call(editor);
	            }

	            // 更新内容
	            editor.updateValue();

	            // 记录最新内容
	            oldValue = val;
	        }

	        // txt change 时随时更新内容
	        $txt.on(txtChangeEventNames, function (e) {
	            // 初始化
	            if (oldValue == null) {
	                oldValue = $txt.html();
	            }

	            // 监控内容变化（停止操作 100ms 之后立即执行）
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }
	            timeoutId = setTimeout(doOnchange, 100);
	        });
	    };

	    // 随时更新 menustyle
	    Txt.fn.updateMenuStyleEvent = function () {
	        var $txt = this.$txt;
	        var editor = this.editor;

	        // txt change 时随时更新内容
	        $txt.on(txtChangeEventNames, function (e) {
	            editor.updateMenuStyle();
	        });
	    };

	    // 最后插入试图插入 <p><br><p>
	    Txt.fn.insertEmptyP = function () {
	        var $txt = this.$txt;
	        var $children = $txt.children();

	        if ($children.length === 0) {
	            $txt.append($('<p><br></p>'));
	            return;
	        }

	        if ($.trim($children.last().html()).toLowerCase() !== '<br>') {
	            $txt.append($('<p><br></p>'));
	        }
	    };

	    // 将编辑器暴露出来的文字和图片，都用 p 来包裹
	    Txt.fn.wrapImgAndText = function () {
	        var $txt = this.$txt;
	        var $imgs = $txt.children('img');
	        var txt = $txt[0];
	        var childNodes = txt.childNodes;
	        var childrenLength = childNodes.length;
	        var i, childNode, p;

	        // 处理图片
	        $imgs.length && $imgs.each(function () {
	            $(this).wrap('<p>');
	        });

	        // 处理文字
	        for (i = 0; i < childrenLength; i++) {
	            childNode = childNodes[i];
	            if (childNode.nodeType === 3 && childNode.textContent && $.trim(childNode.textContent)) {
	                $(childNode).wrap('<p>');
	            }
	        }
	    };

	    // 清空内容为空的<p>，以及重复包裹的<p>（在windows下的chrome粘贴文字之后，会出现上述情况）
	    Txt.fn.clearEmptyOrNestP = function () {
	        var $txt = this.$txt;
	        var $pList = $txt.find('p');

	        $pList.each(function () {
	            var $p = $(this);
	            var $children = $p.children();
	            var childrenLength = $children.length;
	            var $firstChild;
	            var content = $.trim($p.html());

	            // 内容为空的p
	            if (!content) {
	                $p.remove();
	                return;
	            }

	            // 嵌套的p
	            if (childrenLength === 1) {
	                $firstChild = $children.first();
	                if ($firstChild.get(0) && $firstChild.get(0).nodeName === 'P') {
	                    $p.html( $firstChild.html() );
	                }
	            }
	        });
	    };

	    // 获取 scrollTop
	    Txt.fn.scrollTop = function (val) {
	        var self = this;
	        var editor = self.editor;
	        var $txt = self.$txt;

	        if (editor.useMaxHeight) {
	            return $txt.parent().scrollTop(val);
	        } else {
	            return $txt.scrollTop(val);
	        }
	    };

	    // 鼠标hover时候，显示p、head的高度
	    Txt.fn.showHeightOnHover = function () {
	        var editor = this.editor;
	        var $editorContainer = editor.$editorContainer;
	        var menuContainer = editor.menuContainer;
	        var $txt = this.$txt;
	        var $tip = $('<i class="height-tip"><i>');
	        var isTipInTxt = false;

	        function addAndShowTip($target) {
	            if (!isTipInTxt) {
	                $editorContainer.append($tip);
	                isTipInTxt = true;
	            }

	            var txtTop = $txt.position().top;
	            var txtHeight = $txt.outerHeight();

	            var height = $target.height();
	            var top = $target.position().top;
	            var marginTop = parseInt($target.css('margin-top'), 10);
	            var paddingTop = parseInt($target.css('padding-top'), 10);
	            var marginBottom = parseInt($target.css('margin-bottom'), 10);
	            var paddingBottom = parseInt($target.css('padding-bottom'), 10);

	            // 计算初步的结果
	            var resultHeight = height + paddingTop + marginTop + paddingBottom + marginBottom;
	            var resultTop = top + menuContainer.height();
	            
	            // var spaceValue;

	            // // 判断是否超出下边界
	            // spaceValue = (resultTop + resultHeight) - (txtTop + txtHeight);
	            // if (spaceValue > 0) {
	            //     resultHeight = resultHeight - spaceValue;
	            // }

	            // // 判断是否超出了下边界
	            // spaceValue = txtTop > resultTop;
	            // if (spaceValue) {
	            //     resultHeight = resultHeight - spaceValue;
	            //     top = top + spaceValue;
	            // }

	            // 按照最终结果渲染
	            $tip.css({
	                height: height + paddingTop + marginTop + paddingBottom + marginBottom,
	                top: top + menuContainer.height()
	            });
	        }
	        function removeTip() {
	            if (!isTipInTxt) {
	                return;
	            }
	            $tip.remove();
	            isTipInTxt = false;
	        }

	        $txt.on('mouseenter', 'ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre', function (e) {
	            addAndShowTip($(e.currentTarget));
	        }).on('mouseleave', function () {
	            removeTip();
	        });
	    };

	});
	// 工具函数
	_e(function (E, $) {

	    // IE8 [].indexOf()
	    if(!Array.prototype.indexOf){
	        //IE低版本不支持 arr.indexOf 
	        Array.prototype.indexOf = function(elem){
	            var i = 0,
	                length = this.length;
	            for(; i<length; i++){
	                if(this[i] === elem){
	                    return i;
	                }
	            }
	            return -1;
	        };
	        //IE低版本不支持 arr.lastIndexOf
	        Array.prototype.lastIndexOf = function(elem){
	            var length = this.length;
	            for(length = length - 1; length >= 0; length--){
	                if(this[length] === elem){
	                    return length;
	                }
	            }
	            return -1;
	        };
	    }

	    // IE8 Date.now()
	    if (!Date.now) {
	        Date.now = function () {
	            return new Date().valueOf(); 
	        };
	    }

	    // console.log && console.warn && console.error
	    var console = window.console;
	    var emptyFn = function () {};
	    $.each(['info', 'log', 'warn', 'error'], function (key, value) {
	        if (console == null) {
	            E[value] = emptyFn;
	        } else {
	            E[value] = function (info) {
	                // 通过配置来控制打印输出
	                if (E.config && E.config.printLog) {
	                    console[value]('wangEditor提示: ' + info);
	                }
	            };
	        }
	    });

	    // 获取随机数
	    E.random = function () {
	        return Math.random().toString().slice(2);
	    };

	    // 浏览器是否支持 placeholder
	    E.placeholder = 'placeholder' in document.createElement('input');

	    // 兼容IE8的 input placeholder
	    E.placeholderForIE8 = function ($container) {
	        if (E.placeholder) {
	            return;
	        }
	        $container.find('input[placeholder]').each(function () {
	            var $input = $(this);
	            var placeholder = $input.attr('placeholder');

	            if ($input.val() === '') {
	                $input.css('color', '#666');
	                $input.val(placeholder);

	                $input.on('focus.placeholder click.placeholder', function () {
	                    $input.val('');
	                    $input.css('color', '#333');
	                    $input.off('focus.placeholder click.placeholder');
	                });
	            }
	        });
	    };
	});
	// 语言包
	_e(function (E, $) {
	    E.langs = {};
	    
	    // 中文
	    E.langs['zh-cn'] = {
	        bold: '粗体',
	        underline: '下划线',
	        italic: '斜体',
	        forecolor: '文字颜色',
	        bgcolor: '背景色',
	        strikethrough: '删除线',
	        eraser: '清空格式',
	        source: '源码',
	        quote: '引用',
	        fontfamily: '字体',
	        fontsize: '字号',
	        head: '标题',
	        orderlist: '有序列表',
	        unorderlist: '无序列表',
	        alignleft: '左对齐',
	        aligncenter: '居中',
	        alignright: '右对齐',
	        link: '链接',
	        text: '文本',
	        submit: '提交',
	        cancel: '取消',
	        unlink: '取消链接',
	        table: '表格',
	        emotion: '表情',
	        img: '图片',
	        video: '视频',
	        'width': '宽',
	        'height': '高',
	        location: '位置',
	        loading: '加载中',
	        searchlocation: '搜索位置',
	        dynamicMap: '动态地图',
	        clearLocation: '清除位置',
	        langDynamicOneLocation: '动态地图只能显示一个位置',
	        insertcode: '插入代码',
	        undo: '撤销',
	        redo: '重复',
	        fullscreen: '全屏',
	        openLink: '打开链接'
	    };

	    // 英文
	    E.langs.en = {
	        bold: 'Bold',
	        underline: 'Underline',
	        italic: 'Italic',
	        forecolor: 'Color',
	        bgcolor: 'Backcolor',
	        strikethrough: 'Strikethrough',
	        eraser: 'Eraser',
	        source: 'Codeview',
	        quote: 'Quote',
	        fontfamily: 'Font family',
	        fontsize: 'Font size',
	        head: 'Head',
	        orderlist: 'Ordered list',
	        unorderlist: 'Unordered list',
	        alignleft: 'Align left',
	        aligncenter: 'Align center',
	        alignright: 'Align right',
	        link: 'Insert link',
	        text: 'Text',
	        submit: 'Submit',
	        cancel: 'Cancel',
	        unlink: 'Unlink',
	        table: 'Table',
	        emotion: 'Emotions',
	        img: 'Image',
	        video: 'Video',
	        'width': 'width',
	        'height': 'height',
	        location: 'Location',
	        loading: 'Loading',
	        searchlocation: 'search',
	        dynamicMap: 'Dynamic',
	        clearLocation: 'Clear',
	        langDynamicOneLocation: 'Only one location in dynamic map',
	        insertcode: 'Insert Code',
	        undo: 'Undo',
	        redo: 'Redo',
	        fullscreen: 'Full screnn',
	        openLink: 'open link'
	    };
	});
	// 全局配置
	_e(function (E, $) {

	    E.config = {};

	    // 全屏时的 z-index
	    E.config.zindex = 10000;

	    // 是否打印log
	    E.config.printLog = true;

	    // 菜单吸顶：false - 不吸顶；number - 吸顶，值为top值
	    E.config.menuFixed = 0;

	    // 编辑源码时，过滤 javascript
	    E.config.jsFilter = true;

	    // 编辑器允许的标签
	    E.config.legalTags = 'p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre';

	    // 语言包
	    E.config.lang = E.langs['zh-cn'];

	    // 菜单配置
	    E.config.menus = [
	        'source',
	        '|',
	        'bold',
	        'underline',
	        'italic',
	        'strikethrough',
	        'eraser',
	        'forecolor',
	        'bgcolor',
	        '|',
	        'quote',
	        'fontfamily',
	        'fontsize',
	        'head',
	        'unorderlist',
	        'orderlist',
	        'alignleft',
	        'aligncenter',
	        'alignright',
	        '|',
	        'link',
	        'unlink',
	        'table',
	        'emotion',
	        '|',
	        'img',
	        'video',
	        'location',
	        'insertcode',
	        '|',
	        'undo',
	        'redo',
	        'fullscreen'
	    ];

	    // 颜色配置
	    E.config.colors = {
	        // 'value': 'title'
	        '#880000': '暗红色',
	        '#800080': '紫色',
	        '#ff0000': '红色',
	        '#ff00ff': '鲜粉色',
	        '#000080': '深蓝色',
	        '#0000ff': '蓝色',
	        '#00ffff': '湖蓝色',
	        '#008080': '蓝绿色',
	        '#008000': '绿色',
	        '#808000': '橄榄色',
	        '#00ff00': '浅绿色',
	        '#ffcc00': '橙黄色',
	        '#808080': '灰色',
	        '#c0c0c0': '银色',
	        '#000000': '黑色',
	        '#ffffff': '白色'
	    };

	    // 字体
	    E.config.familys = [
	        '宋体', '黑体', '楷体', '微软雅黑',
	        'Arial', 'Verdana', 'Georgia',
	        'Times New Roman', 'Microsoft JhengHei',
	        'Trebuchet MS', 'Courier New', 'Impact', 'Comic Sans MS', 'Consolas'
	    ];

	    // 字号
	    E.config.fontsizes = {
	        // 格式：'value': 'title'
	        1: '12px',
	        2: '13px',
	        3: '16px',
	        4: '18px',
	        5: '24px',
	        6: '32px',
	        7: '48px'
	    };

	    // 表情包
	    E.config.emotionsShow = 'icon'; // 显示项，默认为'icon'，也可以配置成'value'
	    E.config.emotions = {
	        // 'default': {
	        //     title: '默认',
	        //     data: './emotions.data'
	        // },
	        'weibo': {
	            title: '微博表情',
	            data: [
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
	                    value: '[草泥马]'    
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
	                    value: '[神马]'    
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
	                    value: '[浮云]'    
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif',
	                    value: '[给力]'    
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif',
	                    value: '[围观]'    
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif',
	                    value: '[威武]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif',
	                    value: '[熊猫]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif',
	                    value: '[兔子]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif',
	                    value: '[奥特曼]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif',
	                    value: '[囧]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif',
	                    value: '[互粉]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif',
	                    value: '[礼物]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif',
	                    value: '[呵呵]'
	                },
	                {
	                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif',
	                    value: '[哈哈]'
	                }
	            ]
	        }
	    };

	    // 百度地图的key
	    E.config.mapAk = 'TVhjYjq1ICT2qqL5LdS8mwas';

	    // 上传图片的配置
	    // server地址
	    E.config.uploadImgUrl = '';
	    // 超时时间
	    E.config.uploadTimeout = 20 * 1000;
	    // 用于存储上传回调事件
	    E.config.uploadImgFns = {};
	    // 自定义上传图片的filename
	    // E.config.uploadImgFileName = 'customFileName';

	    // 自定义上传，设置为 true 之后，显示上传图标
	    E.config.customUpload = false;
	    // 自定义上传的init事件
	    // E.config.customUploadInit = function () {....};

	    // 自定义上传时传递的参数（如 token）
	    E.config.uploadParams = {
	        /* token: 'abcdef12345' */
	    };

	    // 自定义上传是的header参数
	    E.config.uploadHeaders = {
	         /* 'Accept' : 'text/x-json' */
	    };

	    // 隐藏网络图片，默认为 false
	    E.config.hideLinkImg = false;

	    // 是否过滤粘贴内容
	    E.config.pasteFilter = true;

	    // 是否粘贴纯文本，当 editor.config.pasteFilter === false 时候，此配置将失效
	    E.config.pasteText = false;

	    // 插入代码时，默认的语言
	    E.config.codeDefaultLang = 'javascript';

	});
	// 全局UI
	_e(function (E, $) {

	     E.UI = {};

	     // 为菜单自定义配置的UI
	     E.UI.menus = {
	        // 这个 default 不加引号，在 IE8 会报错
	        'default': {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',
	            selected: '.selected'
	        },
	        bold: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',
	            selected: '.selected'
	        },
	        underline: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',
	            selected: '.selected'
	        },
	        italic: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',
	            selected: '.selected'
	        },
	        forecolor: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-pencil"></i></a>',
	            selected: '.selected'
	        },
	        bgcolor: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-brush"></i></a>',
	            selected: '.selected'
	        },
	        strikethrough: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-strikethrough"></i></a>',
	            selected: '.selected'
	        },
	        eraser: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-eraser"></i></a>',
	            selected: '.selected'
	        },
	        quote: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',
	            selected: '.selected'
	        },
	        source: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>',
	            selected: '.selected'
	        },
	        fontfamily: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-font2"></i></a>',
	            selected: '.selected'
	        },
	        fontsize: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>',
	            selected: '.selected'
	        },
	        head: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',
	            selected: '.selected'
	        },
	        orderlist: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-numbered"></i></a>',
	            selected: '.selected'
	        },
	        unorderlist: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',
	            selected: '.selected'
	        },
	        alignleft: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-left"></i></a>',
	            selected: '.selected'
	        },
	        aligncenter: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-center"></i></a>',
	            selected: '.selected'
	        },
	        alignright: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-right"></i></a>',
	            selected: '.selected'
	        },
	        link: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-link"></i></a>',
	            selected: '.selected'
	        },
	        unlink: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-unlink"></i></a>',
	            selected: '.selected'
	        },
	        table: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-table"></i></a>',
	            selected: '.selected'
	        },
	        emotion: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',
	            selected: '.selected'
	        },
	        img: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>',
	            selected: '.selected'
	        },
	        video: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>',
	            selected: '.selected'
	        },
	        location: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-location"></i></a>',
	            selected: '.selected'
	        },
	        insertcode: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-terminal"></i></a>',
	            selected: '.selected'
	        },
	        undo: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-ccw"></i></a>',
	            selected: '.selected'
	        },
	        redo: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-cw"></i></a>',
	            selected: '.selected'
	        },
	        fullscreen: {
	            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>',
	            selected: '<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-shrink2"></i></a>'
	        }
	     };
	     
	});
	// 对象配置
	_e(function (E, $) {

	    E.fn.initDefaultConfig = function () {
	        var editor = this;
	        editor.config = $.extend({}, E.config);
	        editor.UI = $.extend({}, E.UI);
	    };

	});
	// 增加 container
	_e(function (E, $) {

	    E.fn.addEditorContainer = function () {
	        this.$editorContainer = $('<div class="wangEditor-container"></div>');
	    };

	});
	// 增加编辑区域对象
	_e(function (E, $) {

	    E.fn.addTxt = function () {
	        var editor = this;
	        var txt = new E.Txt(editor);

	        editor.txt = txt;
	    };

	});
	// 增加menuContainer对象
	_e(function (E, $) {

	    E.fn.addMenuContainer = function () {
	        var editor = this;
	        editor.menuContainer = new E.MenuContainer(editor);
	    };

	});
	// 增加menus
	_e(function (E, $) {

	    // 存储创建菜单的函数
	    E.createMenuFns = [];
	    E.createMenu = function (fn) {
	        E.createMenuFns.push(fn);
	    };

	    // 创建所有菜单
	    E.fn.addMenus = function () {
	        var editor = this;
	        var menuIds = editor.config.menus;

	        // 检验 menuId 是否在配置中存在
	        function check(menuId) {
	            if (menuIds.indexOf(menuId) >= 0) {
	                return true;
	            }
	            return false;
	        }

	        // 遍历所有的菜单创建函数，并执行
	        $.each(E.createMenuFns, function (k, createMenuFn) {
	            createMenuFn.call(editor, check);
	        });
	    };

	});
	// bold菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'bold';
	        if (!check(menuId)) {
	            return;
	        }

	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.bold,
	            commandName: 'Bold'
	        });

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 如果选区有内容，则执行基础命令
	                editor.command(e, 'Bold');
	            } else {
	                // 如果选区没有内容
	                editor.commandForElem('b,strong,h1,h2,h3,h4,h5', e, 'Bold');
	            }
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// underline菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'underline';
	        if (!check(menuId)) {
	            return;
	        }

	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.underline,
	            commandName: 'Underline'
	        });

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 如果选区有内容，则执行基础命令
	                editor.command(e, 'Underline');
	            } else {
	                // 如果选区没有内容
	                editor.commandForElem('u,a', e, 'Underline');
	            }
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// italic 菜单
	_e(function (E, $) {
	    
	    E.createMenu(function (check) {
	        var menuId = 'italic';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.italic,
	            commandName: 'Italic'
	        });

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 如果选区有内容，则执行基础命令
	                editor.command(e, 'Italic');
	            } else {
	                // 如果选区没有内容
	                editor.commandForElem('i', e, 'Italic');
	            }
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// forecolor 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'forecolor';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var configColors = editor.config.colors;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.forecolor
	        });

	        // 创建 dropPanel
	        var $content = $('<div></div>');
	        $.each(configColors, function (k, v) {
	            $content.append(
	                [
	                    '<a href="#" class="color-item"',
	                    '    title="' + v + '" commandValue="' + k + '" ',
	                    '    style="color: ' + k + '" ',
	                    '><i class="wangeditor-menu-img-pencil"></i></a>'
	                ].join('')
	            );
	        });
	        $content.on('click', 'a[commandValue]', function (e) {
	            // 执行命令
	            var $elem = $(this);
	            var commandValue = $elem.attr('commandValue');

	            if (menu.selected && editor.isRangeEmpty()) {
	                // 当前处于选中状态，并且选中内容为空
	                editor.commandForElem('font[color]', e, 'forecolor', commandValue);
	            } else {
	                // 当前未处于选中状态，或者有选中内容。则执行默认命令
	                editor.command(e, 'forecolor', commandValue);
	            }
	        });
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 125
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[color]');
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// bgcolor 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'bgcolor';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var configColors = editor.config.colors;

	        // 检查元素是否有 background-color: 内联样式
	        function checkElemFn(elem) {
	            var cssText;
	            if (elem && elem.style && elem.style.cssText != null) {
	                cssText = elem.style.cssText;
	                if (cssText && cssText.indexOf('background-color:') >= 0) {
	                    return true;
	                }
	            }
	            return false;
	        }

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.bgcolor
	        });

	        // 创建 dropPanel
	        var $content = $('<div></div>');
	        $.each(configColors, function (k, v) {
	            $content.append(
	                [
	                    '<a href="#" class="color-item"',
	                    '    title="' + v + '" commandValue="' + k + '" ',
	                    '    style="color: ' + k + '" ',
	                    '><i class="wangeditor-menu-img-brush"></i></a>'
	                ].join('')
	            );
	        });
	        $content.on('click', 'a[commandValue]', function (e) {
	            // 执行命令

	            var $elem = $(this);
	            var commandValue = $elem.attr('commandValue');

	            if (menu.selected && editor.isRangeEmpty()) {
	                // 当前处于选中状态，并且选中内容为空。使用 commandForElem 执行命令
	                editor.commandForElem({
	                    selector: 'span,font',
	                    check: checkElemFn
	                }, e, 'BackColor', commandValue);
	            } else {
	                // 当前未处于选中状态，或者有选中内容。则执行默认命令
	                editor.command(e, 'BackColor', commandValue);
	            }
	        });
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 125
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'span,font', checkElemFn);
	            
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// strikethrough 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'strikethrough';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.strikethrough,
	            commandName: 'StrikeThrough'
	        });

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 如果选区有内容，则执行基础命令
	                editor.command(e, 'StrikeThrough');
	            } else {
	                // 如果选区没有内容
	                editor.commandForElem('strike', e, 'StrikeThrough');
	            }
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// eraser 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'eraser';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.eraser,
	            commandName: 'RemoveFormat'
	        });

	        // 定义点击事件
	        menu.clickEvent = function (e) {
	            var isRangeEmpty = editor.isRangeEmpty();

	            if (!isRangeEmpty) {
	                // 选区不是空的，则执行默认命令
	                editor.command(e, 'RemoveFormat');
	                return;
	            }

	            var $clearElem;

	            // 自定义的命令函数
	            function commandFn() {
	                var editor = this;
	                var rangeElem;
	                var pElem, $pElem;
	                var quoteElem, $quoteElem;
	                var listElem, $listElem;

	                // 获取选区 elem
	                rangeElem = editor.getRangeElem();
	                // 第一步，获取 quote 父元素
	                quoteElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
	                if (quoteElem) {
	                    $quoteElem = $(quoteElem);
	                    $clearElem = $('<p>' + $quoteElem.text() + '</p>');
	                    $quoteElem.after($clearElem).remove();
	                }
	                // 第二步，获取 p h 父元素
	                pElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5');
	                if (pElem) {
	                    $pElem = $(pElem);
	                    $clearElem = $('<p>' + $pElem.text() + '</p>');
	                    $pElem.after($clearElem).remove();
	                }
	                // 第三步，获取list
	                listElem = editor.getSelfOrParentByName(rangeElem, 'ul,ol');
	                if (listElem) {
	                    $listElem = $(listElem);
	                    $clearElem = $('<p>' + $listElem.text() + '</p>');
	                    $listElem.after($clearElem).remove();
	                }
	            }

	            // 自定义 callback 事件
	            function callback() {
	                // callback中，设置range为clearElem
	                var editor = this;
	                if ($clearElem) {
	                    editor.restoreSelectionByElem($clearElem.get(0));
	                }
	            }

	            // 执行自定义命令
	            editor.customCommand(e, commandFn, callback);
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// source 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'source';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var txtHtml;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.source
	        });

	        menu.isShowCode = false;

	        // 更新内容
	        function updateValue() {
	            var $code = menu.$codeTextarea;
	            var $txt = editor.txt.$txt;
	            var value = $.trim($code.val()); // 取值

	            if (!value) {
	                value = '<p><br></p>';
	            }
	            
	            // 过滤js代码
	            if (editor.config.jsFilter) {
	                
	                value = value.replace(/<script[\s\S]*?<\/script>/ig, '');
	            }
	            // 赋值
	            try {
	                $txt.html(value);
	            } catch (ex) {
	                // 更新 html 源码出错，一般都是取消了 js 过滤之后，js报错导致的
	            }
	        }

	        // 定义click事件
	        menu.clickEvent = function (e) {
	            var self = this;
	            var editor = self.editor;
	            var $txt = editor.txt.$txt;
	            var txtOuterHeight = $txt.outerHeight();
	            var txtHeight = $txt.height();

	            if (!self.$codeTextarea) {
	                self.$codeTextarea = $('<textarea class="code-textarea"></textarea>');
	            }
	            var $code = self.$codeTextarea;
	            $code.css({
	                height: txtHeight,
	                'margin-top': txtOuterHeight - txtHeight
	            });

	            // 赋值
	            $code.val($txt.html());

	            // 监控变化
	            $code.on('change', function (e) {
	                updateValue();
	            });

	            // 渲染
	            $txt.after($code).hide();
	            $code.show();

	            // 更新状态
	            menu.isShowCode = true;

	            // 执行 updateSelected 事件
	            this.updateSelected();

	            // 禁用其他菜单
	            editor.disableMenusExcept('source');

	            // 记录当前html值
	            txtHtml = $txt.html();
	        };

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var self = this;
	            var editor = self.editor;
	            var $txt = editor.txt.$txt;
	            var $code = self.$codeTextarea;
	            var value;

	            if (!$code) {
	                return;
	            }

	            // 更新内容
	            updateValue();

	            // 渲染
	            $code.after($txt).hide();
	            $txt.show();

	            // 更新状态
	            menu.isShowCode = false;

	            // 执行 updateSelected 事件
	            this.updateSelected();

	            // 启用其他菜单
	            editor.enableMenusExcept('source');

	            // 判断是否执行 onchange 事件
	            if ($txt.html() !== txtHtml) {
	                if (editor.onchange && typeof editor.onchange === 'function') {
	                    editor.onchange.call(editor);
	                }
	            }
	        };

	        // 定义切换选中状态事件
	        menu.updateSelectedEvent = function () {
	            return this.isShowCode;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// quote 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'quote';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.quote,
	            commandName: 'formatBlock',
	            commandValue: 'blockquote'
	        });

	        // 定义click事件
	        menu.clickEvent = function (e) {
	            var rangeElem = editor.getRangeElem();
	            var $rangeElem;
	            if (!rangeElem) {
	                e.preventDefault();
	                return;
	            }
	            var currentQuote = editor.getSelfOrParentByName(rangeElem, 'blockquote');
	            var $quote;

	            if (currentQuote) {
	                // 说明当前在quote之内，不做任何处理
	                e.preventDefault();
	                return;
	            }

	            rangeElem = editor.getLegalTags(rangeElem);
	            $rangeElem = $(rangeElem);

	            // 无文字，则不允许执行引用
	            if (!$rangeElem.text()) {
	                return;
	            }


	            if (!rangeElem) {
	                // 执行默认命令
	                // IE8 下执行此处（不过，经测试代码无效，也不报错）
	                editor.command(e, 'formatBlock', 'blockquote');
	                return;
	            }

	            // 自定义command事件
	            function commandFn() {
	                $quote = $('<p>' + $rangeElem.text() + '</p>');
	                $rangeElem.after($quote).remove();
	                $quote.wrap('<blockquote>');
	            }

	            // 自定义 callback 事件
	            function callback() {
	                // callback中，设置range为quote
	                var editor = this;
	                if ($quote) {
	                    editor.restoreSelectionByElem($quote.get(0));
	                }
	            }

	            // 执行自定义命令
	            editor.customCommand(e, commandFn, callback);
	        };

	        // 定义选中状态下的click事件
	        menu.clickEventSelected = function (e) {
	            var rangeElem;
	            var quoteElem;
	            var $lastChild;

	            // 获取当前选区的elem，并试图往上找 quote 元素
	            rangeElem = editor.getRangeElem();
	            quoteElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
	            if (!quoteElem) {
	                // 没找到，则返回
	                e.preventDefault();
	                return;
	            }

	            // 自定义的command事件
	            function commandFn() {
	                var $quoteElem;
	                var $children;

	                $quoteElem = $(quoteElem);
	                $children = $quoteElem.children();
	                if ($children.length) {
	                    $children.each(function (k) {
	                        var $item = $(this);
	                        if ($item.get(0).nodeName === 'P') {
	                            $quoteElem.after($item);
	                        } else {
	                            $quoteElem.after('<p>' + $item.text() + '</p>');
	                        }
	                        $lastChild = $item;  // 记录最后一个子元素，用于callback中的range定位
	                    });
	                    $quoteElem.remove();
	                    return;
	                }
	            }

	            // 自定义的callback函数
	            function callback() {
	                // callback中，设置range为lastChild
	                var editor = this;
	                if ($lastChild) {
	                    editor.restoreSelectionByElem($lastChild.get(0));
	                }
	            }

	            // 执行自定义命令
	            editor.customCommand(e, commandFn, callback);
	        };

	        // 定义更新选中状态的事件
	        menu.updateSelectedEvent = function () {
	            var self = this; //菜单对象
	            var editor = self.editor;
	            var rangeElem;

	            rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');

	            if (rangeElem) {
	                return true;
	            }

	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;

	        // --------------- 两次点击 enter 跳出引用 ---------------
	        editor.ready(function () {
	            var editor = this;
	            var $txt = editor.txt.$txt;
	            var isPrevEnter = false;  // 是不是刚刚在quote中按了 enter 键
	            $txt.on('keydown', function (e) {
	                if (e.keyCode !== 13) {
	                    // 不是 enter 键
	                    isPrevEnter = false;
	                    return;
	                }

	                var rangeElem = editor.getRangeElem();
	                rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
	                if (!rangeElem) {
	                    // 选区不是 quote
	                    isPrevEnter = false;
	                    return;
	                }

	                if (!isPrevEnter) {
	                    // 最近没有在qote中按enter键
	                    isPrevEnter = true;
	                    return;
	                }

	                var currentRangeElem = editor.getRangeElem();
	                var $currentRangeElem = $(currentRangeElem);
	                if ($currentRangeElem.length) {
	                    $currentRangeElem.parent().after($currentRangeElem);
	                }

	                // 设置选区
	                editor.restoreSelectionByElem(currentRangeElem, 'start');

	                isPrevEnter = false;
	                // 阻止默认行文
	                e.preventDefault();

	            });
	        }); // editor.ready(

	        // --------------- 处理quote中无内容时不能删除的问题 ---------------
	        editor.ready(function () {
	            var editor = this;
	            var $txt = editor.txt.$txt;
	            var $rangeElem;

	            function commandFn() {
	                $rangeElem && $rangeElem.remove();
	            }
	            function callback() {
	                if (!$rangeElem) {
	                    return;
	                }
	                var $prev = $rangeElem.prev();
	                if ($prev.length) {
	                    // 有 prev 则定位到 prev 最后
	                    editor.restoreSelectionByElem($prev.get(0));
	                } else {
	                    // 无 prev 则初始化选区
	                    editor.initSelection();
	                }
	            }

	            $txt.on('keydown', function (e) {
	                if (e.keyCode !== 8) {
	                    // 不是 backspace 键
	                    return;
	                }

	                var rangeElem = editor.getRangeElem();
	                rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
	                if (!rangeElem) {
	                    // 选区不是 quote
	                    return;
	                }
	                $rangeElem = $(rangeElem);

	                var text = $rangeElem.text();
	                if (text) {
	                    // quote 中还有内容
	                    return;
	                }
	                editor.customCommand(e, commandFn, callback);

	            }); // $txt.on
	        }); // editor.ready(
	    });

	});
	// 字体 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'fontfamily';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var configFamilys = editor.config.familys;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.fontfamily,
	            commandName: 'fontName'
	        });

	        // 初始化数据
	        var data  = {};
	        /*
	            data 需要的结构
	            {
	                'commandValue': 'title'
	                ...
	            }
	        */
	        $.each(configFamilys, function (k, v) {
	            // configFamilys 是数组，data 是对象
	            data[v] = v;
	        });

	        // 创建droplist
	        var tpl = '<span style="font-family:{#commandValue};">{#title}</span>';
	        menu.dropList = new E.DropList(editor, menu, {
	            data: data,
	            tpl: tpl,
	            selectorForELemCommand: 'font[face]'  // 为了执行 editor.commandForElem 而传入的elem查询方式
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[face]');
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });
	});
	// 字号 菜单
	_e(function (E, $) {
	    E.createMenu(function (check) {
	        var menuId = 'fontsize';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var configSize = editor.config.fontsizes;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.fontsize,
	            commandName: 'fontSize'
	        });

	        // 初始化数据
	        var data  = configSize;
	        /*
	            data 需要的结构
	            {
	                'commandValue': 'title'
	                ...
	            }
	        */

	        // 创建droplist
	        var tpl = '<span style="font-size:{#title};">{#title}</span>';
	        menu.dropList = new E.DropList(editor, menu, {
	            data: data,
	            tpl: tpl,
	            selectorForELemCommand: 'font[size]'  // 为了执行 editor.commandForElem 而传入的elem查询方式
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[size]');
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });
	});
	// head 菜单
	_e(function (E, $) {
	    E.createMenu(function (check) {
	        var menuId = 'head';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.head,
	            commandName: 'formatBlock'
	        });

	        // 初始化数据
	        var data  = {
	            '<h1>': '标题1',
	            '<h2>': '标题2',
	            '<h3>': '标题3',
	            '<h4>': '标题4',
	            '<h5>': '标题5'
	        };
	        /*
	            data 需要的结构
	            {
	                'commandValue': 'title'
	                ...
	            }
	        */

	        var isOrderedList;
	        function beforeEvent(e) {
	            if (editor.queryCommandState('InsertOrderedList')) {
	                isOrderedList = true;

	                // 先取消有序列表
	                editor.command(e, 'InsertOrderedList');
	            } else {
	                isOrderedList = false;
	            }
	        }

	        function afterEvent(e) {
	            if (isOrderedList) {
	                // 再设置有序列表
	                editor.command(e, 'InsertOrderedList');
	            }
	        }

	        // 创建droplist
	        var tpl = '{#commandValue}{#title}';
	        menu.dropList = new E.DropList(editor, menu, {
	            data: data,
	            tpl: tpl,
	            // 对 ol 直接设置 head，会出现每个 li 的 index 都变成 1 的问题，因此要先取消 ol，然后设置 head，最后再增加上 ol
	            beforeEvent: beforeEvent,
	            afterEvent: afterEvent
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'h1,h2,h3,h4,h5');
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });
	});
	// unorderlist 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'unorderlist';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.unorderlist,
	            commandName: 'InsertUnorderedList'
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// orderlist 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'orderlist';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.orderlist,
	            commandName: 'InsertOrderedList'
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// alignleft 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'alignleft';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.alignleft,
	            commandName: 'JustifyLeft'
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
	                var cssText;
	                if (elem && elem.style && elem.style.cssText != null) {
	                    cssText = elem.style.cssText;
	                    if (cssText && /text-align:\s*left;/.test(cssText)) {
	                        return true;
	                    }
	                }
	                if ($(elem).attr('align') === 'left') {
	                    // ff 中，设置align-left之后，会是 <p align="left">xxx</p>
	                    return true;
	                }
	                return false;
	            });
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// aligncenter 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'aligncenter';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.aligncenter,
	            commandName: 'JustifyCenter'
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
	                var cssText;
	                if (elem && elem.style && elem.style.cssText != null) {
	                    cssText = elem.style.cssText;
	                    if (cssText && /text-align:\s*center;/.test(cssText)) {
	                        return true;
	                    }
	                }
	                if ($(elem).attr('align') === 'center') {
	                    // ff 中，设置align-center之后，会是 <p align="center">xxx</p>
	                    return true;
	                }
	                return false;
	            });
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// alignright 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'alignright';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.alignright,
	            commandName: 'JustifyRight'
	        });

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
	                var cssText;
	                if (elem && elem.style && elem.style.cssText != null) {
	                    cssText = elem.style.cssText;
	                    if (cssText && /text-align:\s*right;/.test(cssText)) {
	                        return true;
	                    }
	                }
	                if ($(elem).attr('align') === 'right') {
	                    // ff 中，设置align-right之后，会是 <p align="right">xxx</p>
	                    return true;
	                }
	                return false;
	            });
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// link 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'link';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.link
	        });

	        // 创建 dropPanel
	        var $content = $('<div></div>');
	        var $div1 = $('<div style="margin:20px 10px;" class="clearfix"></div>');
	        var $div2 = $div1.clone();
	        var $div3 = $div1.clone().css('margin', '0 10px');
	        var $textInput = $('<input type="text" class="block" placeholder="' + lang.text + '"/>');
	        var $urlInput = $('<input type="text" class="block" placeholder="' + lang.link + '"/>');
	        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
	        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

	        $div1.append($textInput);
	        $div2.append($urlInput);
	        $div3.append($btnSubmit).append($btnCancel);
	        $content.append($div1).append($div2).append($div3);
	        
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 300
	        });

	        // 定义click事件
	        menu.clickEvent = function (e) {
	            var menu = this;
	            var dropPanel = menu.dropPanel;

	            // -------------隐藏----------------
	            if (dropPanel.isShowing) {
	                dropPanel.hide();
	                return;
	            }

	            // -------------显示----------------

	            // 重置 input
	            $textInput.val('');
	            $urlInput.val('http://');

	            // 获取url
	            var url = '';
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'a');
	            if (rangeElem) {
	                url = rangeElem.href || '';
	            }

	            // 获取 text
	            var text = '';
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 选区不是空
	                text = editor.getRangeText() || '';
	            } else if (rangeElem) {
	                // 如果选区空，并且在 a 标签之内
	                text = rangeElem.textContent || rangeElem.innerHTML;
	            }

	            // 设置 url 和 text
	            url && $urlInput.val(url);
	            text && $textInput.val(text);

	            // 如果有选区内容，textinput 不能修改
	            if (!isRangeEmpty) {
	                $textInput.attr('disabled', true);
	            } else {
	                $textInput.removeAttr('disabled');
	            }

	            // 显示（要设置好了所有input的值和属性之后再显示）
	            dropPanel.show();
	        };

	        // 定义 update selected 事件
	        menu.updateSelectedEvent = function () {
	            var rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'a');
	            if (rangeElem) {
	                return true;
	            }
	            return false;
	        };

	        // 『取消』 按钮
	        $btnCancel.click(function (e) {
	            e.preventDefault();
	            menu.dropPanel.hide();
	        });

	        // 『确定』按钮
	        $btnSubmit.click(function (e) {
	            e.preventDefault();
	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getSelfOrParentByName(rangeElem, 'a');
	            var isRangeEmpty = editor.isRangeEmpty();

	            var $linkElem, linkHtml;
	            var commandFn, callback;
	            var $txt = editor.txt.$txt;
	            var $oldLinks, $newLinks;
	            var uniqId = 'link' + E.random();

	            // 获取数据
	            var url = $.trim($urlInput.val());
	            var text = $.trim($textInput.val());

	            if (!url) {
	                menu.dropPanel.focusFirstInput();
	                return;
	            }
	            if (!text) {
	                text = url;
	            }

	            if (!isRangeEmpty) {
	                // 选中区域有内容，则执行默认命令

	                // 获取目前 txt 内所有链接，并为当前链接做一个标记
	                $oldLinks = $txt.find('a');
	                $oldLinks.attr(uniqId, '1');

	                // 执行命令 
	                editor.command(e, 'createLink', url);

	                // 去的没有标记的链接，即刚刚插入的链接
	                $newLinks = $txt.find('a').not('[' + uniqId + ']');
	                $newLinks.attr('target', '_blank'); // 增加 _blank

	                // 去掉之前做的标记
	                $oldLinks.removeAttr(uniqId);

	            } else if (targetElem) {
	                // 无选中区域，在 a 标签之内，修改该 a 标签的内容和链接
	                $linkElem = $(targetElem);
	                commandFn = function () {
	                    $linkElem.attr('href', url);
	                    $linkElem.text(text);
	                };
	                callback = function () {
	                    var editor = this;
	                    editor.restoreSelectionByElem(targetElem);
	                };
	                // 执行命令
	                editor.customCommand(e, commandFn, callback);
	            } else {
	                // 无选中区域，不在 a 标签之内，插入新的链接

	                linkHtml = '<a href="' + url + '" target="_blank">' + text + '</a>';
	                if (E.userAgent.indexOf('Firefox') > 0) {
	                    linkHtml += '<span>&nbsp;</span>';
	                }
	                editor.command(e, 'insertHtml', linkHtml);
	            }

	        });
	        
	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// unlink 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'unlink';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.unlink,
	            commandName: 'unLink'
	        });

	        // click 事件
	        menu.clickEvent = function  (e) {
	            var isRangeEmpty = editor.isRangeEmpty();
	            if (!isRangeEmpty) {
	                // 有选中区域，或者IE8，执行默认命令
	                editor.command(e, 'unLink');
	                return;
	            }

	            // 无选中区域...

	            var rangeElem = editor.getRangeElem();
	            var aElem = editor.getSelfOrParentByName(rangeElem, 'a');
	            if (!aElem) {
	                // 不在 a 之内，返回
	                e.preventDefault();
	                return;
	            }

	            // 在 a 之内
	            var $a = $(aElem);
	            var $span = $('<span>' + $a.text() + '</span>');
	            function commandFn() {
	                $a.after($span).remove();
	            }
	            function callback() {
	                editor.restoreSelectionByElem($span.get(0));
	            }
	            editor.customCommand(e, commandFn, callback);
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// table 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'table';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.table
	        });

	        // dropPanel 内容
	        var $content = $('<div style="font-size: 14px; color: #666; text-align:right;"></div>');
	        var $table = $('<table class="choose-table" style="margin-bottom:10px;margin-top:5px;">');
	        var $row = $('<span>0</span>');
	        var $rowspan = $('<span> 行 </span>');
	        var $col = $('<span>0</span>');
	        var $colspan = $('<span> 列</span>');
	        var $tr;
	        var i, j;

	        // 创建一个n行n列的表格
	        for (i = 0; i < 15; i++) {
	            $tr = $('<tr index="' + (i + 1) + '">');
	            for (j = 0; j < 20; j++) {
	                $tr.append($('<td index="' + (j + 1) + '">'));
	            }
	            $table.append($tr);
	        }
	        $content.append($table);
	        $content.append($row).append($rowspan).append($col).append($colspan);

	        // 定义table事件
	        $table.on('mouseenter', 'td', function (e) {
	            var $currentTd = $(e.currentTarget);
	            var currentTdIndex = $currentTd.attr('index');
	            var $currentTr = $currentTd.parent();
	            var currentTrIndex = $currentTr.attr('index');

	            // 显示
	            $row.text(currentTrIndex);
	            $col.text(currentTdIndex);

	            // 遍历设置背景颜色
	            $table.find('tr').each(function () {
	                var $tr = $(this);
	                var trIndex = $tr.attr('index');
	                if (parseInt(trIndex, 10) <= parseInt(currentTrIndex, 10)) {
	                    // 该行需要可能需要设置背景色
	                    $tr.find('td').each(function () {
	                        var $td = $(this);
	                        var tdIndex = $td.attr('index');
	                        if (parseInt(tdIndex, 10) <= parseInt(currentTdIndex, 10)) {
	                            // 需要设置背景色
	                            $td.addClass('active');
	                        } else {
	                            // 需要移除背景色
	                            $td.removeClass('active');
	                        }
	                    });
	                } else {
	                    // 改行不需要设置背景色
	                    $tr.find('td').removeClass('active');
	                }
	            });
	        }).on('mouseleave', function (e) {
	            // mouseleave 删除背景色
	            $table.find('td').removeClass('active');

	            $row.text(0);
	            $col.text(0);
	        });

	        // 插入表格
	        $table.on('click', 'td', function (e) {
	            var $currentTd = $(e.currentTarget);
	            var currentTdIndex = $currentTd.attr('index');
	            var $currentTr = $currentTd.parent();
	            var currentTrIndex = $currentTr.attr('index');

	            var rownum = parseInt(currentTrIndex, 10);
	            var colnum = parseInt(currentTdIndex, 10);

	            // -------- 拼接tabel html --------

	            var i, j;
	            var tableHtml = '<table>';
	            for (i = 0; i < rownum; i++) {
	                tableHtml += '<tr>';

	                for (j = 0; j < colnum; j++) {
	                    tableHtml += '<td><span>&nbsp;</span></td>';
	                }
	                tableHtml += '</tr>';
	            }
	            tableHtml += '</table>';

	            // -------- 执行命令 --------
	            editor.command(e, 'insertHtml', tableHtml);
	        });

	        // 创建 panel
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 262
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// emotion 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'emotion';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var config = editor.config;
	        var lang = config.lang;
	        var configEmotions = config.emotions;
	        var emotionsShow = config.emotionsShow;

	        // 记录每一个表情图片的地址
	        editor.emotionUrls = [];

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.emotion
	        });

	        // 添加表情图片的函数
	        function insertEmotionImgs(data, $tabContent) {
	            // 添加表情图片
	            $.each(data, function (k, emotion) {
	                var src = emotion.icon || emotion.url;
	                var value = emotion.value || emotion.title;
	                // 通过配置 editor.config.emotionsShow 的值来修改插入到编辑器的内容（图片/value）
	                var commandValue = emotionsShow === 'icon' ? src : value;
	                var $command = $('<a href="#" commandValue="' + commandValue + '"></a>');
	                var $img = $('<img>');
	                $img.attr('_src', src);  // 先将 src 复制到 '_src' 属性，先不加载

	                $command.append($img);
	                $tabContent.append($command);

	                // 记录下每一个表情图片的地址
	                editor.emotionUrls.push(src);
	            });
	        }

	        // 拼接 dropPanel 内容
	        var $panelContent = $('<div class="panel-tab"></div>');
	        var $tabContainer = $('<div class="tab-container"></div>');
	        var $contentContainer = $('<div class="content-container emotion-content-container"></div>');
	        $.each(configEmotions, function (k, emotion) {
	            var title = emotion.title;
	            var data = emotion.data;

	            E.log('正在处理 ' + title + ' 表情的数据...');

	            // 增加该组表情的tab和content
	            var $tab = $('<a href="#">' + title +' </a>');
	            $tabContainer.append($tab);
	            var $tabContent = $('<div class="content"></div>');
	            $contentContainer.append($tabContent);

	            // tab 切换事件
	            $tab.click(function (e) {
	                $tabContainer.children().removeClass('selected');
	                $contentContainer.children().removeClass('selected');
	                $tabContent.addClass('selected');
	                $tab.addClass('selected');
	                e.preventDefault();
	            });

	            // 处理data
	            if (typeof data === 'string') {
	                // url 形式，需要通过ajax从该url获取数据
	                E.log('将通过 ' + data + ' 地址ajax下载表情包');
	                $.get(data, function (result) {
	                    result = $.parseJSON(result);
	                    E.log('下载完毕，得到 ' + result.length + ' 个表情');
	                    insertEmotionImgs(result, $tabContent);
	                });
	                
	            } else if ( Object.prototype.toString.call(data).toLowerCase().indexOf('array') > 0 ) {
	                // 数组，即 data 直接就是表情包数据
	                insertEmotionImgs(data, $tabContent);
	            } else {
	                // 其他情况，data格式不对
	                E.error('data 数据格式错误，请修改为正确格式，参考文档：' + E.docsite);
	                return;
	            }
	        });
	        $panelContent.append($tabContainer).append($contentContainer);

	        // 默认显示第一个tab
	        $tabContainer.children().first().addClass('selected');
	        $contentContainer.children().first().addClass('selected');

	        // 插入表情command事件
	        $contentContainer.on('click', 'a[commandValue]', function (e) {
	            var $a = $(e.currentTarget);
	            var commandValue = $a.attr('commandValue');
	            var img;

	            // commandValue 有可能是图片url，也有可能是表情的 value，需要区别对待

	            if (emotionsShow === 'icon') {
	                // 插入图片
	                editor.command(e, 'InsertImage', commandValue);
	            } else {
	                // 插入value
	                editor.command(e, 'insertHtml', '<span>' + commandValue + '</span>');
	            }

	            e.preventDefault();
	        });

	        // 添加panel
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $panelContent,
	            width: 350
	        });

	        // 定义click事件（异步加载表情图片）
	        menu.clickEvent = function (e) {
	            var menu = this;
	            var dropPanel = menu.dropPanel;

	            // -------------隐藏-------------
	            if (dropPanel.isShowing) {
	                dropPanel.hide();
	                return;
	            }

	            // -------------显示-------------
	            dropPanel.show();

	            // 异步加载图片
	            if (menu.imgLoaded) {
	                return;
	            }
	            $contentContainer.find('img').each(function () {
	                var $img = $(this);
	                var _src = $img.attr('_src');
	                $img.on('error', function () {
	                    E.error('加载不出表情图片 ' + _src);
	                });
	                $img.attr('src', _src);
	                $img.removeAttr('_src');
	            });
	            menu.imgLoaded = true;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// img 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'img';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.img
	        });

	        // 创建 panel content
	        var $panelContent = $('<div class="panel-tab"></div>');
	        var $tabContainer = $('<div class="tab-container"></div>');
	        var $contentContainer = $('<div class="content-container"></div>');
	        $panelContent.append($tabContainer).append($contentContainer);

	        // tab
	        var $uploadTab = $('<a href="#">上传图片</a>');
	        var $linkTab = $('<a href="#">网络图片</a>');
	        $tabContainer.append($uploadTab).append($linkTab);

	        // 上传图片 content
	        var $uploadContent = $('<div class="content"></div>');
	        $contentContainer.append($uploadContent);

	        // 网络图片 content
	        var $linkContent = $('<div class="content"></div>');
	        $contentContainer.append($linkContent);
	        linkContentHandler(editor, menu, $linkContent);

	        // 添加panel
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $panelContent,
	            width: 400,
	            onRender: function () {
	                // 渲染后的回调事件，用于执行自定义上传的init
	                // 因为渲染之后，上传面板的dom才会被渲染到页面，才能让第三方空间获取到
	                var init = editor.config.customUploadInit;
	                init && init.call(editor);
	            }
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;

	        // tab 切换事件
	        function tabToggle() {
	            $uploadTab.click(function (e) {
	                $tabContainer.children().removeClass('selected');
	                $contentContainer.children().removeClass('selected');
	                $uploadContent.addClass('selected');
	                $uploadTab.addClass('selected');
	                e.preventDefault();
	            });
	            $linkTab.click(function (e) {
	                $tabContainer.children().removeClass('selected');
	                $contentContainer.children().removeClass('selected');
	                $linkContent.addClass('selected');
	                $linkTab.addClass('selected');
	                e.preventDefault();

	                // focus input
	                if (E.placeholder) {
	                    $linkContent.find('input[type=text]').focus();
	                }
	            });

	            // 默认情况
	            // $uploadTab.addClass('selected');
	            // $uploadContent.addClass('selected');
	            $uploadTab.click();
	        }

	        // 隐藏上传图片
	        function hideUploadImg() {
	            $tabContainer.remove();
	            $uploadContent.remove();
	            $linkContent.addClass('selected');
	        }

	        // 隐藏网络图片
	        function hideLinkImg() {
	            $tabContainer.remove();
	            $linkContent.remove();
	            $uploadContent.addClass('selected');
	        }

	        // 判断用户是否配置了上传图片
	        editor.ready(function () {
	            var editor = this;
	            var config = editor.config;
	            var uploadImgUrl = config.uploadImgUrl;
	            var customUpload = config.customUpload;
	            var linkImg = config.hideLinkImg;
	            var $uploadImgPanel;

	            if (uploadImgUrl || customUpload) {
	                // 第一，暴露出 $uploadContent 以便用户自定义 ！！！重要
	                editor.$uploadContent = $uploadContent;

	                // 第二，绑定tab切换事件
	                tabToggle();

	                if (linkImg) {
	                    // 隐藏网络图片
	                    hideLinkImg();
	                }
	            } else {
	                // 未配置上传图片功能
	                hideUploadImg();
	            }

	            // 点击 $uploadContent 立即隐藏 dropPanel
	            // 为了兼容IE8、9的上传，因为IE8、9使用 modal 上传
	            // 这里使用异步，为了不妨碍高级浏览器通过点击 $uploadContent 选择文件
	            function hidePanel() {
	                menu.dropPanel.hide();
	            }
	            $uploadContent.click(function () {
	                setTimeout(hidePanel);
	            });
	        });
	    });

	    // --------------- 处理网络图片content ---------------
	    function linkContentHandler (editor, menu, $linkContent) {
	        var lang = editor.config.lang;
	        var $urlContainer = $('<div style="margin:20px 10px 10px 10px;"></div>');
	        var $urlInput = $('<input type="text" class="block" placeholder="http://"/>');
	        $urlContainer.append($urlInput);
	        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
	        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

	        $linkContent.append($urlContainer).append($btnSubmit).append($btnCancel);

	        // 取消
	        $btnCancel.click(function (e) {
	            e.preventDefault();
	            menu.dropPanel.hide();
	        });

	        // callback 
	        function callback() {
	            $urlInput.val('');
	        }

	        // 确定
	        $btnSubmit.click(function (e) {
	            e.preventDefault();
	            var url = $.trim($urlInput.val());
	            if (!url) {
	                // 无内容
	                $urlInput.focus();
	                return;
	            }

	            var imgHtml = '<img style="max-width:100%;" src="' + url + '"/>';
	            editor.command(e, 'insertHtml', imgHtml, callback);
	        });
	    }

	});
	// video 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'video';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;
	        var reg = /^<(iframe)|(embed)/i;  // <iframe... 或者 <embed... 格式

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.video
	        });

	        // 创建 panel 内容
	        var $content = $('<div></div>');
	        var $linkInputContainer = $('<div style="margin:20px 10px;"></div>');
	        var $linkInput = $('<input type="text" class="block" placeholder=\'格式如：<iframe src="..." frameborder=0 allowfullscreen></iframe>\'/>');
	        $linkInputContainer.append($linkInput);
	        var $sizeContainer = $('<div style="margin:20px 10px;"></div>');
	        var $widthInput = $('<input type="text" value="640" style="width:50px;text-align:center;"/>');
	        var $heightInput = $('<input type="text" value="498" style="width:50px;text-align:center;"/>');
	        $sizeContainer.append('<span> ' + lang.width + ' </span>')
	                      .append($widthInput)
	                      .append('<span> px &nbsp;&nbsp;&nbsp;</span>')
	                      .append('<span> ' + lang.height + ' </span>')
	                      .append($heightInput)
	                      .append('<span> px </span>');
	        var $btnContainer = $('<div></div>');
	        var $howToCopy = $('<a href="http://www.kancloud.cn/wangfupeng/wangeditor2/134973" target="_blank" style="display:inline-block;margin-top:10px;margin-left:10px;color:#999;">如何复制视频链接？</a>');
	        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
	        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
	        $btnContainer.append($howToCopy).append($btnSubmit).append($btnCancel);
	        $content.append($linkInputContainer).append($sizeContainer).append($btnContainer);

	        // 取消按钮
	        $btnCancel.click(function (e) {
	            e.preventDefault();
	            $linkInput.val('');
	            menu.dropPanel.hide();
	        });

	        // 确定按钮
	        $btnSubmit.click(function (e) {
	            e.preventDefault();
	            var link = $.trim($linkInput.val());
	            var $link;
	            var width = parseInt($widthInput.val());
	            var height = parseInt($heightInput.val());
	            var $div = $('<div>');
	            var html = '<p>{content}</p>';

	            // 验证数据
	            if (!link) {
	                menu.dropPanel.focusFirstInput();
	                return;
	            }

	            if (!reg.test(link)) {
	                alert('视频链接格式错误！');
	                menu.dropPanel.focusFirstInput();
	                return;
	            }

	            if (isNaN(width) || isNaN(height)) {
	                alert('宽度或高度不是数字！');
	                return;
	            }

	            $link = $(link);

	            // 设置高度和宽度
	            $link.attr('width', width)
	                 .attr('height', height);

	            // 拼接字符串
	            html = html.replace('{content}', $div.append($link).html());

	            // 执行命令
	            editor.command(e, 'insertHtml', html);
	            $linkInput.val('');
	        });

	        // 创建panel
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 400
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// location 菜单
	_e(function (E, $) {

	    // 判断浏览器的 input 是否支持 keyup
	    var inputKeyup = (function (input) {
	        return 'onkeyup' in input;
	    })(document.createElement('input'));

	    // 百度地图的key
	    E.baiduMapAk = 'TVhjYjq1ICT2qqL5LdS8mwas';

	    // 一个页面中，如果有多个编辑器，地图会出现问题。这个参数记录一下，如果超过 1 就提示
	    E.numberOfLocation = 0;

	    E.createMenu(function (check) {
	        var menuId = 'location';
	        if (!check(menuId)) {
	            return;
	        }

	        if (++E.numberOfLocation > 1) {
	            E.error('目前不支持在一个页面多个编辑器上同时使用地图，可通过自定义菜单配置去掉地图菜单');
	            return;
	        }

	        var editor = this;
	        var config = editor.config;
	        var lang = config.lang;
	        var ak = config.mapAk;

	        // 地图的变量存储到这个地方
	        editor.mapData = {};
	        var mapData = editor.mapData;

	        // ---------- 地图事件 ----------
	        mapData.markers = [];
	        mapData.mapContainerId = 'map' + E.random();

	        mapData.clearLocations = function () {
	            var map = mapData.map;
	            if (!map) {
	                return;
	            }
	            map.clearOverlays();

	            //同时，清空marker数组
	            mapData.markers = [];
	        };

	        mapData.searchMap = function () {
	            var map = mapData.map;
	            if (!map) {
	                return;
	            }

	            var BMap = window.BMap;
	            var cityName = $cityInput.val();
	            var locationName = $searchInput.val();
	            var myGeo, marker;

	            if(cityName !== ''){
	                if(!locationName || locationName === ''){
	                    map.centerAndZoom(cityName, 11);
	                }

	                //地址解析
	                if(locationName && locationName !== ''){
	                    myGeo = new BMap.Geocoder();
	                    // 将地址解析结果显示在地图上,并调整地图视野
	                    myGeo.getPoint(locationName, function(point){
	                        if (point) {
	                            map.centerAndZoom(point, 13);
	                            marker = new BMap.Marker(point);
	                            map.addOverlay(marker);
	                            marker.enableDragging();  //允许拖拽
	                            mapData.markers.push(marker);  //将marker加入到数组中
	                        }else{
	                            // alert('未找到');
	                            map.centerAndZoom(cityName, 11);  //找不到则重新定位到城市
	                        }
	                    }, cityName);
	                }
	            } // if(cityName !== '')
	        };

	        // load script 之后的 callback
	        var hasCallback = false;
	        window.baiduMapCallBack = function(){
	            // 避免重复加载
	            if (hasCallback) {
	                return;
	            } else {
	                hasCallback = true;
	            }

	            var BMap = window.BMap;
	            if (!mapData.map) {
	                // 创建Map实例
	                mapData.map = new BMap.Map(mapData.mapContainerId);
	            }
	            var map = mapData.map;

	            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

	            //根据IP定位
	            function locationFun(result){
	                var cityName = result.name;
	                map.setCenter(cityName);

	                // 设置城市名称
	                $cityInput.val(cityName);
	                if (E.placeholder) {
	                    $searchInput.focus();
	                }
	                var timeoutId, searchFn;
	                if (inputKeyup) {
	                   // 并绑定搜索事件 - input 支持 keyup
	                   searchFn = function (e) {
	                       if (e.type === 'keyup' && e.keyCode === 13) {
	                           e.preventDefault();
	                       }
	                       if (timeoutId) {
	                           clearTimeout(timeoutId);
	                       }
	                       timeoutId = setTimeout(mapData.searchMap, 500);
	                   };
	                   $cityInput.on('keyup change paste', searchFn);
	                   $searchInput.on('keyup change paste', searchFn); 
	                } else {
	                    // 并绑定搜索事件 - input 不支持 keyup
	                    searchFn = function () {
	                        if (!$content.is(':visible')) {
	                            // panel 不显示了，就不用再监控了
	                            clearTimeout(timeoutId);
	                            return;
	                        }

	                        var currentCity = '';
	                        var currentSearch = '';
	                        var city = $cityInput.val();
	                        var search = $searchInput.val();

	                        if (city !== currentCity || search !== currentSearch) {
	                            // 刚获取的数据和之前的数据不一致，执行查询
	                            mapData.searchMap();
	                            // 更新数据
	                            currentCity = city;
	                            currentSearch = search;
	                        }

	                        // 继续监控
	                        if (timeoutId) {
	                            clearTimeout(timeoutId);
	                        }
	                        timeoutId = setTimeout(searchFn, 1000);
	                    };
	                    // 开始监控
	                    timeoutId = setTimeout(searchFn, 1000);
	                }
	            }
	            var myCity = new BMap.LocalCity();
	            myCity.get(locationFun);

	            //鼠标点击，创建位置
	            map.addEventListener("click", function(e){
	                var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); 
	                map.addOverlay(marker);  
	                marker.enableDragging();
	                mapData.markers.push(marker);  //加入到数组中
	            }, false);
	        };

	        mapData.loadMapScript = function () {
	            var script = document.createElement("script");
	            script.type = "text/javascript";
	            script.src = "https://api.map.baidu.com/api?v=2.0&ak=" + ak + "&s=1&callback=baiduMapCallBack";  // baiduMapCallBack是一个本地函数
	            try {
	                // IE10- 报错
	                document.body.appendChild(script);
	            } catch (ex) {
	                E.error('加载地图过程中发生错误');
	            }
	        };

	        // 初始化地图
	        mapData.initMap = function () {
	            if (window.BMap) {
	                // 不是第一次，直接处理地图即可
	                window.baiduMapCallBack();
	            } else {
	                // 第一次，先加载地图 script，再处理地图（script加载完自动执行处理）
	                mapData.loadMapScript();
	            }
	        };

	        // ---------- 创建 menu 对象 ----------

	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.location
	        });

	        editor.menus[menuId] = menu;

	        // ---------- 构建UI ----------

	        // panel content 
	        var $content = $('<div></div>');

	        // 搜索框
	        var $inputContainer = $('<div style="margin:10px 0;"></div>');
	        var $cityInput = $('<input type="text"/>');
	        $cityInput.css({
	            width: '80px',
	            'text-align': 'center'
	        });
	        var $searchInput = $('<input type="text"/>');
	        $searchInput.css({
	            width: '300px',
	            'margin-left': '10px'
	        }).attr('placeholder', lang.searchlocation);
	        var $clearBtn = $('<button class="right link">' + lang.clearLocation + '</button>');
	        $inputContainer.append($clearBtn)
	                       .append($cityInput)
	                       .append($searchInput);
	        $content.append($inputContainer);

	        // 清除位置按钮
	        $clearBtn.click(function (e) {
	            $searchInput.val('');
	            $searchInput.focus();
	            mapData.clearLocations();
	            e.preventDefault();
	        });

	        // 地图
	        var $map = $('<div id="' + mapData.mapContainerId + '"></div>');
	        $map.css({
	            height: '260px',
	            width: '100%',
	            position: 'relative',
	            'margin-top': '10px',
	            border: '1px solid #f1f1f1'
	        });
	        var $mapLoading = $('<span>' + lang.loading + '</span>');
	        $mapLoading.css({
	            position: 'absolute',
	            width: '100px',
	            'text-align': 'center',
	            top: '45%',
	            left: '50%',
	            'margin-left': '-50px'
	        });
	        $map.append($mapLoading);
	        $content.append($map);

	        // 按钮
	        var $btnContainer = $('<div style="margin:10px 0;"></div>');
	        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
	        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
	        var $checkLabel = $('<label style="display:inline-block;margin-top:10px;color:#666;"></label>');
	        var $check = $('<input type="checkbox">');
	        $checkLabel.append($check).append('<span style="display:inline-block;margin-left:5px;">  ' + lang.dynamicMap + '</span>');
	        $btnContainer.append($checkLabel)
	                     .append($btnSubmit)
	                     .append($btnCancel);
	        $content.append($btnContainer);

	        function callback() {
	            $searchInput.val('');
	        }

	        // 『取消』按钮事件
	        $btnCancel.click(function (e) {
	            e.preventDefault();
	            callback();
	            menu.dropPanel.hide();
	        });

	        // 『确定』按钮事件
	        $btnSubmit.click(function (e) {
	            e.preventDefault();
	            var map = mapData.map,
	                isDynamic = $check.is(':checked'),
	                markers =  mapData.markers,

	                center = map.getCenter(),
	                centerLng = center.lng,
	                centerLat = center.lat,

	                zoom = map.getZoom(),

	                size = map.getSize(),
	                sizeWidth = size.width,
	                sizeHeight = size.height,

	                position,
	                src,
	                iframe;

	            if(isDynamic){
	                //动态地址
	                src = 'http://ueditor.baidu.com/ueditor/dialogs/map/show.html#';
	            }else{
	                //静态地址
	                src = 'http://api.map.baidu.com/staticimage?';
	            }

	            //src参数
	            src = src +'center=' + centerLng + ',' + centerLat +
	                '&zoom=' + zoom +
	                '&width=' + sizeWidth +
	                '&height=' + sizeHeight;
	            if(markers.length > 0){
	                src = src + '&markers=';

	                //添加所有的marker
	                $.each(markers, function(key, value){
	                    position = value.getPosition();
	                    if(key > 0){
	                        src = src + '|';
	                    }
	                    src = src + position.lng + ',' + position.lat;
	                });
	            }

	            if(isDynamic){
	                if(markers.length > 1){
	                    alert( lang.langDynamicOneLocation );
	                    return;
	                }

	                src += '&markerStyles=l,A';

	                //插入iframe
	                iframe = '<iframe class="ueditor_baidumap" src="{src}" frameborder="0" width="' + sizeWidth + '" height="' + sizeHeight + '"></iframe>';
	                iframe = iframe.replace('{src}', src);
	                editor.command(e, 'insertHtml', iframe, callback);
	            }else{
	                //插入图片
	                editor.command(e, 'insertHtml', '<img style="max-width:100%;" src="' + src + '"/>', callback);
	            }
	        });

	        // 根据 UI 创建菜单 panel
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 500
	        });

	        // ---------- 事件 ----------

	        // render 时执行事件
	        menu.onRender = function () {
	            if (ak === E.baiduMapAk) {
	                E.warn('建议在配置中自定义百度地图的mapAk，否则可能影响地图功能，文档：' + E.docsite);
	            }
	        };

	        // click 事件
	        menu.clickEvent = function (e) {
	            var menu = this;
	            var dropPanel = menu.dropPanel;
	            var firstTime = false;

	            // -------------隐藏-------------
	            if (dropPanel.isShowing) {
	                dropPanel.hide();
	                return;
	            }

	            // -------------显示-------------
	            if (!mapData.map) {
	                // 第一次，先加载地图
	                firstTime = true;
	            }
	            
	            dropPanel.show();
	            mapData.initMap();

	            if (!firstTime) {
	                $searchInput.focus();
	            }
	        };

	    });

	});
	// insertcode 菜单
	_e(function (E, $) {

	    // 加载 highlightjs 代码
	    function loadHljs() {
	        if (E.userAgent.indexOf('MSIE 8') > 0) {
	            // 不支持 IE8
	            return;
	        }
	        if (window.hljs) {
	            // 不要重复加载
	            return;
	        }
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = "//cdn.bootcss.com/highlight.js/9.2.0/highlight.min.js";
	        document.body.appendChild(script);
	    }
	    

	    E.createMenu(function (check) {
	        var menuId = 'insertcode';
	        if (!check(menuId)) {
	            return;
	        }

	        // 加载 highlightjs 代码
	        setTimeout(loadHljs, 0);

	        var editor = this;
	        var config = editor.config;
	        var lang = config.lang;
	        var $txt = editor.txt.$txt;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.insertcode
	        });

	        // click 事件
	        menu.clickEvent = function (e) {
	            var menu = this;
	            var dropPanel = menu.dropPanel;

	            // 隐藏
	            if (dropPanel.isShowing) {
	                dropPanel.hide();
	                return;
	            }

	            // 显示
	            $textarea.val('');
	            dropPanel.show();

	            // highlightjs 语言列表
	            var hljs = window.hljs;
	            if (hljs && hljs.listLanguages) {
	                if ($langSelect.children().length !== 0) {
	                    return;
	                }
	                $langSelect.css({
	                    'margin-top': '9px',
	                    'margin-left': '5px'
	                });
	                $.each(hljs.listLanguages(), function (key, lang) {
	                    if (lang === 'xml') {
	                        lang = 'html';
	                    }
	                    if (lang === config.codeDefaultLang) {
	                        $langSelect.append('<option value="' + lang + '" selected="selected">' + lang + '</option>');
	                    } else {
	                        $langSelect.append('<option value="' + lang + '">' + lang + '</option>');
	                    }
	                });
	            } else {
	                $langSelect.hide();
	            }
	        };

	        // 选中状态下的 click 事件
	        menu.clickEventSelected = function (e) {
	            var menu = this;
	            var dropPanel = menu.dropPanel;

	            // 隐藏
	            if (dropPanel.isShowing) {
	                dropPanel.hide();
	                return;
	            }

	            // 显示
	            dropPanel.show();

	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getSelfOrParentByName(rangeElem, 'pre');
	            var $targetElem;
	            var className;
	            if (targetElem) {
	                // 确定找到 pre 之后，再找 code
	                targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
	            }
	            if (!targetElem) {
	                return;
	            }
	            $targetElem = $(targetElem);

	            // 赋值内容
	            $textarea.val($targetElem.text());
	            if ($langSelect) {
	                // 赋值语言
	                className = $targetElem.attr('class');
	                if (className) {
	                    $langSelect.val(className.split(' ')[0]);
	                }
	            }
	        };

	        // 定义更新选中状态的事件
	        menu.updateSelectedEvent = function () {
	            var self = this; //菜单对象
	            var editor = self.editor;
	            var rangeElem;

	            rangeElem = editor.getRangeElem();
	            rangeElem = editor.getSelfOrParentByName(rangeElem, 'pre');

	            if (rangeElem) {
	                return true;
	            }

	            return false;
	        };

	        // 创建 panel
	        var $content = $('<div></div>');
	        var $textarea = $('<textarea></textarea>');
	        var $langSelect = $('<select></select>');
	        contentHandle($content);
	        menu.dropPanel = new E.DropPanel(editor, menu, {
	            $content: $content,
	            width: 500
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;

	        // ------ 增加 content 内容 ------
	        function contentHandle($content) {
	            // textarea 区域
	            var $textareaContainer = $('<div></div>');
	            $textareaContainer.css({
	                margin: '15px 5px 5px 5px',
	                height: '160px',
	                'text-align': 'center'
	            });
	            $textarea.css({
	                width: '100%',
	                height: '100%',
	                padding: '10px'
	            });
	            $textarea.on('keydown', function (e) {
	                // 取消 tab 键默认行为
	                if (e.keyCode === 9) {
	                    e.preventDefault();
	                }
	            });
	            $textareaContainer.append($textarea);
	            $content.append($textareaContainer);

	            // 按钮区域
	            var $btnContainer = $('<div></div>');
	            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
	            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

	            $btnContainer.append($btnSubmit).append($btnCancel).append($langSelect);
	            $content.append($btnContainer);

	            // 取消按钮
	            $btnCancel.click(function (e) {
	                e.preventDefault();
	                menu.dropPanel.hide();
	            });

	            // 确定按钮
	            var codeTpl = '<pre style="max-width:100%;overflow-x:auto;"><code{#langClass}>{#content}</code></pre>';
	            $btnSubmit.click(function (e) {
	                e.preventDefault();
	                var val = $textarea.val();
	                if (!val) {
	                    // 无内容
	                    $textarea.focus();
	                    return;
	                }

	                var rangeElem = editor.getRangeElem();
	                if ($.trim($(rangeElem).text()) && codeTpl.indexOf('<p><br></p>') !== 0) {
	                    codeTpl = '<p><br></p>' + codeTpl;
	                }

	                var lang = $langSelect ? $langSelect.val() : ''; // 获取高亮语言
	                var langClass = '';
	                var doHightlight = function () {
	                    $txt.find('pre code').each(function (i, block) {
	                        var $block = $(block);
	                        if ($block.attr('codemark')) {
	                            // 有 codemark 标记的代码块，就不再重新格式化了
	                            return;
	                        } else if (window.hljs) {
	                            // 新代码块，格式化之后，立即标记 codemark
	                            window.hljs.highlightBlock(block);
	                            $block.attr('codemark', '1');
	                        }
	                    });
	                };

	                // 语言高亮样式
	                if (lang) {
	                    langClass = ' class="' + lang + ' hljs"';
	                }

	                // 替换标签
	                val = val.replace(/&/gm, '&amp;')
	                         .replace(/</gm, '&lt;')
	                         .replace(/>/gm, '&gt;');

	                // ---- menu 未选中状态 ----
	                if (!menu.selected) {
	                    // 拼接html
	                    var html = codeTpl.replace('{#langClass}', langClass).replace('{#content}', val);
	                    editor.command(e, 'insertHtml', html, doHightlight);
	                    return;
	                }

	                // ---- menu 选中状态 ----
	                var targetElem = editor.getSelfOrParentByName(rangeElem, 'pre');
	                var $targetElem;
	                if (targetElem) {
	                    // 确定找到 pre 之后，再找 code
	                    targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
	                }
	                if (!targetElem) {
	                    return;
	                }
	                $targetElem = $(targetElem);

	                function commandFn() {
	                    var className;
	                    if (lang) {
	                        className = $targetElem.attr('class');
	                        if (className !== lang + ' hljs') {
	                            $targetElem.attr('class', lang + ' hljs');
	                        }
	                    }
	                    $targetElem.html(val);
	                }
	                function callback() {
	                    editor.restoreSelectionByElem(targetElem);
	                    doHightlight();
	                }
	                editor.customCommand(e, commandFn, callback);
	            });
	        }

	        // ------ enter 时，不另起标签，只换行 ------
	        $txt.on('keydown', function (e) {
	            if (e.keyCode !== 13) {
	                return;
	            }
	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
	            if (!targetElem) {
	                return;
	            }

	            editor.command(e, 'insertHtml', '\n');
	        });

	        // ------ 点击时，禁用其他标签 ------
	        function updateMenu() {
	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
	            if (targetElem) {
	                // 在 code 之内，禁用其他菜单
	                editor.disableMenusExcept('insertcode');
	            } else {
	                // 不是在 code 之内，启用其他菜单
	                editor.enableMenusExcept('insertcode');
	            }
	        }
	        $txt.on('keydown click', function (e) {
	            // 此处必须使用 setTimeout 异步处理，否则不对
	            setTimeout(updateMenu);
	        });
	    });

	});
	// undo 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'undo';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.undo
	        });

	        // click 事件
	        menu.clickEvent = function (e) {
	            editor.undo();
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;


	        // ------------ 初始化时、enter 时、打字中断时，做记录 ------------
	        // ------------ ctrl + z 是调用记录撤销，而不是使用浏览器默认的撤销 ------------
	        editor.ready(function () {
	            var editor = this;
	            var $txt = editor.txt.$txt;
	            var timeoutId;

	            // 执行undo记录
	            function undo() {
	                editor.undoRecord();
	            }

	            $txt.on('keydown', function (e) {
	                var keyCode = e.keyCode;

	                // 撤销 ctrl + z
	                if (e.ctrlKey && keyCode === 90) {
	                    editor.undo();
	                    return;
	                }

	                if (keyCode === 13) {
	                    // enter 做记录
	                    undo();
	                } else {
	                    // keyup 之后 1s 之内不操作，则做一次记录
	                    if (timeoutId) {
	                        clearTimeout(timeoutId);
	                    }
	                    timeoutId = setTimeout(undo, 1000);
	                }
	            });

	            // 初始化做记录
	            editor.undoRecord();
	        });
	    });

	});
	// redo 菜单
	_e(function (E, $) {

	    E.createMenu(function (check) {
	        var menuId = 'redo';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var lang = editor.config.lang;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.redo
	        });

	        // click 事件
	        menu.clickEvent = function (e) {
	            editor.redo();
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// 全屏 菜单
	_e(function (E, $) {

	    // 记录全屏时的scrollTop
	    var scrollTopWhenFullScreen;

	    E.createMenu(function (check) {
	        var menuId = 'fullscreen';
	        if (!check(menuId)) {
	            return;
	        }
	        var editor = this;
	        var $txt = editor.txt.$txt;
	        var config = editor.config;
	        var zIndexConfig = config.zindex || 10000;
	        var lang = config.lang;

	        var isSelected = false;
	        var zIndex;

	        var maxHeight;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,
	            id: menuId,
	            title: lang.fullscreen
	        });

	        // 定义click事件
	        menu.clickEvent = function (e) {
	            // 增加样式
	            var $editorContainer = editor.$editorContainer;
	            $editorContainer.addClass('wangEditor-fullscreen');

	            // （先保存当前的）再设置z-index
	            zIndex = $editorContainer.css('z-index');
	            $editorContainer.css('z-index', zIndexConfig);

	            var $wrapper;
	            var txtHeight = $txt.height();
	            var txtOuterHeight = $txt.outerHeight();

	            if (editor.useMaxHeight) {
	                // 记录 max-height，并暂时去掉maxheight
	                maxHeight = $txt.css('max-height');
	                $txt.css('max-height', 'none');

	                // 如果使用了maxHeight， 将$txt从它的父元素中移出来
	                $wrapper = $txt.parent();
	                $wrapper.after($txt);
	                $wrapper.remove();
	                $txt.css('overflow-y', 'auto');
	            }

	            // 设置高度到全屏
	            var menuContainer = editor.menuContainer;
	            $txt.height(
	                E.$window.height() - 
	                menuContainer.height() - 
	                (txtOuterHeight - txtHeight)  // 去掉内边距和外边距
	            );

	            // 取消menuContainer的内联样式（menu吸顶时，会为 menuContainer 设置一些内联样式）
	            editor.menuContainer.$menuContainer.attr('style', '');

	            // 保存状态
	            isSelected = true;

	            // 记录编辑器是否全屏
	            editor.isFullScreen = true;

	            // 记录设置全屏时的高度
	            scrollTopWhenFullScreen = E.$window.scrollTop();
	        };

	        // 定义选中状态的 click 事件
	        menu.clickEventSelected = function (e) {
	            // 取消样式
	            var $editorContainer = editor.$editorContainer;
	            $editorContainer.removeClass('wangEditor-fullscreen');
	            $editorContainer.css('z-index', zIndex);

	            // 还原height
	            if (editor.useMaxHeight) {
	                $txt.css('max-height', maxHeight);
	            } else {
	                // editor.valueContainerHeight 在 editor.txt.initHeight() 中事先保存了
	                editor.$valueContainer.css('height', editor.valueContainerHeight);
	            }

	            // 重新计算高度
	            editor.txt.initHeight();

	            // 保存状态
	            isSelected = false;

	            // 记录编辑器是否全屏
	            editor.isFullScreen = false;

	            // 还原scrollTop
	            if (scrollTopWhenFullScreen != null) {
	                E.$window.scrollTop(scrollTopWhenFullScreen);
	            }
	        };

	        // 定义选中事件
	        menu.updateSelectedEvent = function (e) {
	            return isSelected;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// 渲染menus
	_e(function (E, $) {

	    E.fn.renderMenus = function () {

	        var editor = this;
	        var menus = editor.menus;
	        var menuIds = editor.config.menus;
	        var menuContainer = editor.menuContainer;

	        var menu;
	        var groupIdx = 0;
	        $.each(menuIds, function (k, v) {
	            if (v === '|') {
	                groupIdx++;
	                return;
	            }

	            menu = menus[v];
	            if (menu) {
	                menu.render(groupIdx);
	            }
	        });
	    };

	});
	// 渲染menus
	_e(function (E, $) {

	    E.fn.renderMenuContainer = function () {

	        var editor = this;
	        var menuContainer = editor.menuContainer;
	        var $editorContainer = editor.$editorContainer;

	        menuContainer.render();

	    };

	});
	// 渲染 txt
	_e(function (E, $) {

	    E.fn.renderTxt = function () {

	        var editor = this;
	        var txt = editor.txt;

	        txt.render();

	        // ready 时候，计算txt的高度
	        editor.ready(function () {
	            txt.initHeight();
	        });
	    };

	});
	// 渲染 container
	_e(function (E, $) {

	    E.fn.renderEditorContainer = function () {

	        var editor = this;
	        var $valueContainer = editor.$valueContainer;
	        var $editorContainer = editor.$editorContainer;
	        var $txt = editor.txt.$txt;
	        var $prev, $parent;

	        // 将编辑器渲染到页面中
	        if ($valueContainer === $txt) {
	            $prev = editor.$prev;
	            $parent = editor.$parent;

	            if ($prev && $prev.length) {
	                // 有前置节点，就插入到前置节点的后面
	                $prev.after($editorContainer);
	            } else {
	                // 没有前置节点，就直接插入到父元素
	                $parent.prepend($editorContainer);
	            }

	        } else {
	            $valueContainer.after($editorContainer);
	            $valueContainer.hide();
	        }

	        // 设置宽度（这样设置宽度有问题）
	        // $editorContainer.css('width', $valueContainer.css('width'));
	    };

	});
	// 菜单事件
	_e(function (E, $) {

	    // 绑定每个菜单的click事件
	    E.fn.eventMenus = function () {

	        var menus = this.menus;

	        // 绑定菜单的点击事件
	        $.each(menus, function (k, v) {
	            v.bindEvent();
	        });

	    };

	});
	// 菜单container事件
	_e(function (E, $) {

	    E.fn.eventMenuContainer = function () {

	    };

	});
	// 编辑区域事件
	_e(function (E, $) {

	    E.fn.eventTxt = function () {

	        var txt = this.txt;

	        // txt内容变化时，保存选区
	        txt.saveSelectionEvent();

	        // txt内容变化时，随时更新 value
	        txt.updateValueEvent();

	        // txt内容变化时，随时更新 menu style
	        txt.updateMenuStyleEvent();

	        // // 鼠标hover时，显示 p head 高度（暂时关闭这个功能）
	        // if (!/ie/i.test(E.userAgent)) {
	        //     // 暂时不支持IE
	        //     txt.showHeightOnHover();
	        // }
	    };

	});
	// 上传图片事件
	_e(function (E, $) {

	    E.plugin(function () {
	        var editor = this;
	        var fns = editor.config.uploadImgFns; // editor.config.uploadImgFns = {} 在config文件中定义了

	        // -------- 定义load函数 --------
	        fns.onload || (fns.onload = function (resultText, xhr) {
	            E.log('上传结束，返回结果为 ' + resultText);

	            var editor = this;
	            var originalName = editor.uploadImgOriginalName || '';  // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
	            var img;
	            if (resultText.indexOf('error|') === 0) {
	                // 提示错误
	                E.warn('上传失败：' + resultText.split('|')[1]);
	                alert(resultText.split('|')[1]);
	            } else {
	                E.log('上传成功，即将插入编辑区域，结果为：' + resultText);

	                // 将结果插入编辑器
	                img = document.createElement('img');
	                img.onload = function () {
	                    var html = '<img src="' + resultText + '" alt="' + originalName + '" style="max-width:100%;"/>';
	                    editor.command(null, 'insertHtml', html);

	                    E.log('已插入图片，地址 ' + resultText);
	                    img = null;
	                };
	                img.onerror = function () {
	                    E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + resultText);
	                    img = null;
	                };
	                img.src = resultText;
	            }

	        });

	        // -------- 定义tiemout函数 --------
	        fns.ontimeout || (fns.ontimeout = function (xhr) {
	            E.error('上传图片超时');
	            alert('上传图片超时');
	        });

	        // -------- 定义error函数 --------
	        fns.onerror || (fns.onerror = function (xhr) {
	            E.error('上传上图片发生错误');
	            alert('上传上图片发生错误');
	        });

	    });
	});
	// xhr 上传图片
	_e(function (E, $) {

	    if (!window.FileReader || !window.FormData) {
	        // 如果不支持html5的文档操作，直接返回
	        return;
	    }

	    E.plugin(function () {

	        var editor = this;
	        var config = editor.config;
	        var uploadImgUrl = config.uploadImgUrl;
	        var uploadTimeout = config.uploadTimeout;

	        // 获取配置中的上传事件
	        var uploadImgFns = config.uploadImgFns;
	        var onload = uploadImgFns.onload;
	        var ontimeout = uploadImgFns.ontimeout;
	        var onerror = uploadImgFns.onerror;

	        if (!uploadImgUrl) {
	            return;
	        }

	        // -------- 将以base64的图片url数据转换为Blob --------
	        function convertBase64UrlToBlob(urlData, filetype){
	            //去掉url的头，并转换为byte
	            var bytes = window.atob(urlData.split(',')[1]);
	            
	            //处理异常,将ascii码小于0的转换为大于0
	            var ab = new ArrayBuffer(bytes.length);
	            var ia = new Uint8Array(ab);
	            var i;
	            for (i = 0; i < bytes.length; i++) {
	                ia[i] = bytes.charCodeAt(i);
	            }

	            return new Blob([ab], {type : filetype});
	        }

	        // -------- 插入图片的方法 --------
	        function insertImg(src, event) {
	            var img = document.createElement('img');
	            img.onload = function () {
	                var html = '<img src="' + src + '" style="max-width:100%;"/>';
	                editor.command(event, 'insertHtml', html);

	                E.log('已插入图片，地址 ' + src);
	                img = null;
	            };
	            img.onerror = function () {
	                E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + src);
	                img = null;
	            };
	            img.src = src;
	        }

	        // -------- onprogress 事件 --------
	        function updateProgress(e) {
	            if (e.lengthComputable) {
	                var percentComplete = e.loaded / e.total;
	                editor.showUploadProgress(percentComplete * 100);
	            }
	        }

	        // -------- xhr 上传图片 --------
	        editor.xhrUploadImg = function (opt) {
	            // opt 数据
	            var event = opt.event;
	            var fileName = opt.filename || '';
	            var base64 = opt.base64;
	            var fileType = opt.fileType || 'image/png'; // 无扩展名则默认使用 png
	            var name = opt.name || 'wangEditor_upload_file';
	            var loadfn = opt.loadfn || onload;
	            var errorfn = opt.errorfn || onerror;
	            var timeoutfn = opt.timeoutfn || ontimeout;

	            // 上传参数（如 token）
	            var params = editor.config.uploadParams || {};

	            // headers
	            var headers = editor.config.uploadHeaders || {};

	            // 获取文件扩展名
	            var fileExt = 'png';  // 默认为 png
	            if (fileName.indexOf('.') > 0) {
	                // 原来的文件名有扩展名
	                fileExt = fileName.slice(fileName.lastIndexOf('.') - fileName.length + 1);
	            } else if (fileType.indexOf('/') > 0 && fileType.split('/')[1]) {
	                // 文件名没有扩展名，通过类型获取，如从 'image/png' 取 'png'
	                fileExt = fileType.split('/')[1];
	            }

	            // ------------ begin 预览模拟上传 ------------
	            if (E.isOnWebsite) {
	                E.log('预览模拟上传');
	                insertImg(base64, event);
	                return;
	            }
	            // ------------ end 预览模拟上传 ------------

	            // 变量声明
	            var xhr = new XMLHttpRequest();
	            var timeoutId;
	            var src;
	            var formData = new FormData();

	            // 超时处理
	            function timeoutCallback() {
	                if (timeoutId) {
	                    clearTimeout(timeoutId);
	                }
	                if (xhr && xhr.abort) {
	                    xhr.abort();
	                }

	                // 超时了就阻止默认行为
	                event.preventDefault();

	                // 执行回调函数，提示什么内容，都应该在回调函数中定义
	                timeoutfn && timeoutfn.call(editor, xhr);

	                // 隐藏进度条
	                editor.hideUploadProgress();
	            }

	            xhr.onload = function () {
	                if (timeoutId) {
	                    clearTimeout(timeoutId);
	                }

	                // 记录文件名到 editor.uploadImgOriginalName ，插入图片时，可做 alt 属性用
	                editor.uploadImgOriginalName = fileName;
	                if (fileName.indexOf('.') > 0) {
	                    editor.uploadImgOriginalName = fileName.split('.')[0];
	                }

	                // 执行load函数，任何操作，都应该在load函数中定义
	                loadfn && loadfn.call(editor, xhr.responseText, xhr);

	                // 隐藏进度条
	                editor.hideUploadProgress();
	            };
	            xhr.onerror = function () {
	                if (timeoutId) {
	                    clearTimeout(timeoutId);
	                }

	                // 超时了就阻止默认行为
	                event.preventDefault();

	                // 执行error函数，错误提示，应该在error函数中定义
	                errorfn && errorfn.call(editor, xhr);

	                // 隐藏进度条
	                editor.hideUploadProgress();
	            };
	            // xhr.onprogress = updateProgress;
	            xhr.upload.onprogress = updateProgress;

	            // 填充数据
	            formData.append(name, convertBase64UrlToBlob(base64, fileType), E.random() + '.' + fileExt);

	            // 添加参数
	            $.each(params, function (key, value) {
	                formData.append(key, value);
	            });

	            // 开始上传
	            xhr.open('POST', uploadImgUrl, true);
	            // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 将参数解析成传统form的方式上传

	            // 修改自定义配置的headers
	            $.each(headers, function (key, value) {
	                xhr.setRequestHeader(key, value);
	            });

	            // 跨域上传时，传cookie
	            xhr.withCredentials = true;

	            // 发送数据
	            xhr.send(formData);
	            timeoutId = setTimeout(timeoutCallback, uploadTimeout);

	            E.log('开始上传...并开始超时计算');
	        };
	    });
	});
	// 进度条
	_e(function (E, $) {

	    E.plugin(function () {

	        var editor = this;
	        var menuContainer = editor.menuContainer;
	        var menuHeight = menuContainer.height();
	        var $editorContainer = editor.$editorContainer;
	        var width = $editorContainer.width();
	        var $progress = $('<div class="wangEditor-upload-progress"></div>');

	        // 渲染事件
	        var isRender = false;
	        function render() {
	            if (isRender) {
	                return;
	            }
	            isRender = true;

	            $progress.css({
	                top: menuHeight + 'px'
	            });
	            $editorContainer.append($progress);
	        }

	        // ------ 显示进度 ------
	        editor.showUploadProgress = function (progress) {
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }

	            // 显示之前，先判断是否渲染
	            render();

	            $progress.show();
	            $progress.width(progress * width / 100);
	        };

	        // ------ 隐藏进度条 ------
	        var timeoutId;
	        function hideProgress() {
	            $progress.hide();
	            timeoutId = null;
	        }
	        editor.hideUploadProgress = function (time) {
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }
	            time = time || 750;
	            timeoutId = setTimeout(hideProgress, time);
	        };
	    });
	});
	// upload img 插件
	_e(function (E, $) {

	    E.plugin(function () {
	        var editor = this;
	        var config = editor.config;
	        var uploadImgUrl = config.uploadImgUrl;
	        var uploadTimeout = config.uploadTimeout;
	        var event;

	        if (!uploadImgUrl) {
	            return;
	        }

	        // 获取editor的上传dom
	        var $uploadContent = editor.$uploadContent;
	        if (!$uploadContent) {
	            return;
	        }

	        // 自定义UI，并添加到上传dom节点上
	        var $uploadIcon = $('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');
	        $uploadContent.append($uploadIcon);

	        // ---------- 构建上传对象 ----------
	        var upfile = new E.UploadFile({
	            editor: editor,
	            uploadUrl: uploadImgUrl,
	            timeout: uploadTimeout,
	            fileAccept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'    // 只允许选择图片 
	        });

	        // 选择本地文件，上传
	        $uploadIcon.click(function (e) {
	            event = e;
	            upfile.selectFiles();
	        });
	    });
	});
	// h5 方式上传图片
	_e(function (E, $) {

	    if (!window.FileReader || !window.FormData) {
	        // 如果不支持html5的文档操作，直接返回
	        return;
	    }

	    // 构造函数
	    var UploadFile = function (opt) {
	        this.editor = opt.editor;
	        this.uploadUrl = opt.uploadUrl;
	        this.timeout = opt.timeout;
	        this.fileAccept = opt.fileAccept;
	        this.multiple = true;
	    };

	    UploadFile.fn = UploadFile.prototype;

	    // clear
	    UploadFile.fn.clear = function () {
	        this.$input.val('');
	        E.log('input value 已清空');
	    };

	    // 渲染
	    UploadFile.fn.render = function () {
	        var self = this;
	        if (self._hasRender) {
	            // 不要重复渲染
	            return;
	        }

	        E.log('渲染dom');

	        var fileAccept = self.fileAccept;
	        var acceptTpl = fileAccept ? 'accept="' + fileAccept + '"' : '';
	        var multiple = self.multiple;
	        var multipleTpl = multiple ? 'multiple="multiple"' : '';
	        var $input = $('<input type="file" ' + acceptTpl + ' ' + multipleTpl + '/>');
	        var $container = $('<div style="visibility:hidden;"></div>');

	        $container.append($input);
	        E.$body.append($container);

	        // onchange 事件
	        $input.on('change', function (e) {
	            self.selected(e, $input.get(0));
	        });

	        // 记录对象数据
	        self.$input = $input;

	        // 记录
	        self._hasRender = true;
	    };

	    // 选择
	    UploadFile.fn.selectFiles = function () {
	        var self = this;

	        E.log('使用 html5 方式上传');

	        // 先渲染
	        self.render();

	        // 选择
	        E.log('选择文件');
	        self.$input.click();
	    };

	    // 选中文件之后
	    UploadFile.fn.selected = function (e, input) {
	        var self = this;
	        var files = input.files || [];
	        if (files.length === 0) {
	            return;
	        }

	        E.log('选中 ' + files.length + ' 个文件');

	        // 遍历选中的文件，预览、上传
	        $.each(files, function (key, value) {
	            self.upload(value);
	        });
	    };

	    // 上传单个文件
	    UploadFile.fn.upload = function (file) {
	        var self = this;
	        var editor = self.editor;
	        var filename = file.name || '';
	        var fileType = file.type || '';
	        var uploadImgFns = editor.config.uploadImgFns;
	        var uploadFileName = editor.config.uploadImgFileName || 'wangEditorH5File';
	        var onload = uploadImgFns.onload;
	        var ontimeout = uploadImgFns.ontimeout;
	        var onerror = uploadImgFns.onerror;
	        var reader = new FileReader();

	        if (!onload || !ontimeout || !onerror) {
	            E.error('请为编辑器配置上传图片的 onload ontimeout onerror 回调事件');
	            return;
	        }


	        E.log('开始执行 ' + filename + ' 文件的上传');

	        // 清空 input 数据
	        function clearInput() {
	            self.clear();
	        }

	        // onload事件
	        reader.onload = function (e) {
	            E.log('已读取' + filename + '文件');

	            var base64 = e.target.result || this.result;
	            editor.xhrUploadImg({
	                event: e,
	                filename: filename,
	                base64: base64,
	                fileType: fileType,
	                name: uploadFileName,
	                loadfn: function (resultText, xhr) {
	                    clearInput();
	                    // 执行配置中的方法
	                    var editor = this;
	                    onload.call(editor, resultText, xhr);
	                },
	                errorfn: function (xhr) {
	                    clearInput();
	                    if (E.isOnWebsite) {
	                        alert('wangEditor官网暂时没有服务端，因此报错。实际项目中不会发生');
	                    }
	                    // 执行配置中的方法
	                    var editor = this;
	                    onerror.call(editor, xhr);
	                },
	                timeoutfn: function (xhr) {
	                    clearInput();
	                    if (E.isOnWebsite) {
	                        alert('wangEditor官网暂时没有服务端，因此超时。实际项目中不会发生');
	                    }
	                    // 执行配置中的方法
	                    var editor = this;
	                    ontimeout(editor, xhr);
	                }
	            });
	        };

	        // 开始取文件
	        reader.readAsDataURL(file);
	    };

	    // 暴露给 E
	    E.UploadFile = UploadFile;

	});
	// form方式上传图片
	_e(function (E, $) {

	    if (window.FileReader && window.FormData) {
	        // 如果支持 html5 上传，则返回
	        return;
	    }
	    
	    // 构造函数
	    var UploadFile = function (opt) {
	        this.editor = opt.editor;
	        this.uploadUrl = opt.uploadUrl;
	        this.timeout = opt.timeout;
	        this.fileAccept = opt.fileAccept;
	        this.multiple = false;
	    };

	    UploadFile.fn = UploadFile.prototype;

	    // clear
	    UploadFile.fn.clear = function () {
	        this.$input.val('');
	        E.log('input value 已清空');
	    };

	    // 隐藏modal
	    UploadFile.fn.hideModal = function () {
	        this.modal.hide();
	    };

	    // 渲染
	    UploadFile.fn.render = function () {
	        var self = this;
	        var editor = self.editor;
	        var uploadFileName = editor.config.uploadImgFileName || 'wangEditorFormFile';
	        if (self._hasRender) {
	            // 不要重复渲染
	            return;
	        }

	        // 服务器端路径
	        var uploadUrl = self.uploadUrl;

	        E.log('渲染dom');

	        // 创建 form 和 iframe
	        var iframeId = 'iframe' + E.random();
	        var $iframe = $('<iframe name="' + iframeId + '" id="' + iframeId + '" frameborder="0" width="0" height="0"></iframe>');
	        var multiple = self.multiple;
	        var multipleTpl = multiple ? 'multiple="multiple"' : '';
	        var $p = $('<p>选择图片并上传</p>');
	        var $input = $('<input type="file" ' + multipleTpl + ' name="' + uploadFileName + '"/>');
	        var $btn = $('<input type="submit" value="上传"/>');
	        var $form = $('<form enctype="multipart/form-data" method="post" action="' + uploadUrl + '" target="' + iframeId + '"></form>');
	        var $container = $('<div style="margin:10px 20px;"></div>');

	        $form.append($p).append($input).append($btn);

	        // 增加用户配置的参数，如 token
	        $.each(editor.config.uploadParams, function (key, value) {
	            $form.append( $('<input type="hidden" name="' + key + '" value="' + value + '"/>') );
	        });

	        $container.append($form);
	        $container.append($iframe);

	        self.$input = $input;
	        self.$iframe = $iframe;

	        // 生成 modal
	        var modal = new E.Modal(editor, undefined, {
	            $content: $container
	        });
	        self.modal = modal;

	        // 记录
	        self._hasRender = true;
	    };

	    // 绑定 iframe load 事件
	    UploadFile.fn.bindLoadEvent = function () {
	        var self = this;
	        if (self._hasBindLoad) {
	            // 不要重复绑定
	            return;
	        }

	        var editor = self.editor;
	        var $iframe = self.$iframe;
	        var iframe = $iframe.get(0);
	        var iframeWindow = iframe.contentWindow;
	        var onload = editor.config.uploadImgFns.onload;

	        // 定义load事件
	        function onloadFn() {
	            var resultText = $.trim(iframeWindow.document.body.innerHTML);
	            if (!resultText) {
	                return;
	            }

	            // 获取文件名
	            var fileFullName = self.$input.val();  // 结果如 C:\folder\abc.png 格式
	            var fileOriginalName = fileFullName;
	            if (fileFullName.lastIndexOf('\\') >= 0) {
	                // 获取 abc.png 格式
	                fileOriginalName = fileFullName.slice(fileFullName.lastIndexOf('\\') + 1);
	                if (fileOriginalName.indexOf('.') > 0) {
	                    // 获取 abc （即不带扩展名的文件名）
	                    fileOriginalName = fileOriginalName.split('.')[0];
	                }
	            }

	            // 将文件名暂存到 editor.uploadImgOriginalName ，插入图片时，可作为 alt 属性来用
	            editor.uploadImgOriginalName = fileOriginalName;

	            // 执行load函数，插入图片的操作，应该在load函数中执行
	            onload.call(editor, resultText);

	            // 清空 input 数据
	            self.clear();

	            // 隐藏modal
	            self.hideModal();
	        }

	        // 绑定 load 事件
	        if (iframe.attachEvent) {
	            iframe.attachEvent('onload', onloadFn);
	        } else {
	            iframe.onload = onloadFn;
	        }

	        // 记录
	        self._hasBindLoad = true;
	    };

	    UploadFile.fn.show = function () {
	        var self = this;
	        var modal = self.modal;

	        function show() {
	            modal.show();
	            self.bindLoadEvent();
	        }
	        setTimeout(show);
	    };

	    // 选择
	    UploadFile.fn.selectFiles = function () {
	        var self = this;

	        E.log('使用 form 方式上传');

	        // 先渲染
	        self.render();

	        // 先清空
	        self.clear();

	        // 显示
	        self.show();
	    };

	    // 暴露给 E
	    E.UploadFile = UploadFile;

	});
	// upload img 插件 粘贴图片
	_e(function (E, $) {
	    
	    E.plugin(function () {
	        var editor = this;
	        var txt = editor.txt;
	        var $txt = txt.$txt;
	        var config = editor.config;
	        var uploadImgUrl = config.uploadImgUrl;
	        var uploadFileName = config.uploadImgFileName || 'wangEditorPasteFile';
	        var pasteEvent;
	        var $imgsBeforePaste;

	        // 未配置上传图片url，则忽略
	        if (!uploadImgUrl) {
	            return;
	        }

	        // -------- 非 chrome 下，通过查找粘贴的图片的方式上传 --------
	        function findPasteImgAndUpload() {
	            var reg = /^data:(image\/\w+);base64/;
	            var $imgs = $txt.find('img');

	            E.log('粘贴后，检查到编辑器有' + $imgs.length + '个图片。开始遍历图片，试图找到刚刚粘贴过来的图片');

	            $.each($imgs, function () {
	                var img = this;
	                var $img = $(img);
	                var flag;
	                var base64 = $img.attr('src');
	                var type;

	                // 判断当前图片是否是粘贴之前的
	                $imgsBeforePaste.each(function () {
	                    if (img === this) {
	                        // 当前图片是粘贴之前的
	                        flag = true;
	                        return false;
	                    }
	                });

	                // 当前图片是粘贴之前的，则忽略
	                if (flag) {
	                    return;
	                }

	                E.log('找到一个粘贴过来的图片');

	                if (reg.test(base64)) {
	                    // 得到的粘贴的图片是 base64 格式，符合要求
	                    E.log('src 是 base64 格式，可以上传');
	                    type = base64.match(reg)[1];
	                    editor.xhrUploadImg({
	                        event: pasteEvent,
	                        base64: base64,
	                        fileType: type,
	                        name: uploadFileName
	                    });
	                } else {
	                    E.log('src 为 ' + base64 + ' ，不是 base64 格式，暂时不支持上传');
	                }

	                // 最终移除原图片
	                $img.remove();
	            });

	            E.log('遍历结束');
	        }

	        // 开始监控粘贴事件
	        $txt.on('paste', function (e) {
	            pasteEvent = e;
	            var data = pasteEvent.clipboardData || pasteEvent.originalEvent.clipboardData;
	            var text;
	            var items;

	            // -------- 试图获取剪切板中的文字，有文字的情况下，就不处理图片粘贴 --------
	            if (data == null) {
	                text = window.clipboardData && window.clipboardData.getData('text');
	            } else {
	                text = data.getData('text/plain') || data.getData('text/html');
	            }
	            if (text) {
	                return;
	            }

	            items = data && data.items;
	            if (items) {
	                // -------- chrome 可以用 data.items 取出图片 -----
	                E.log('通过 data.items 得到了数据');

	                $.each(items, function (key, value) {
	                    var fileType = value.type || '';
	                    if(fileType.indexOf('image') < 0) {
	                        // 不是图片
	                        return;
	                    }

	                    var file = value.getAsFile();
	                    var reader = new FileReader();

	                    E.log('得到一个粘贴图片');

	                    reader.onload = function (e) {
	                        E.log('读取到粘贴的图片');

	                        // 执行上传
	                        var base64 = e.target.result || this.result;
	                        editor.xhrUploadImg({
	                            event: pasteEvent,
	                            base64: base64,
	                            fileType: fileType,
	                            name: uploadFileName
	                        });
	                    };

	                    //读取粘贴的文件
	                    reader.readAsDataURL(file);
	                });
	            } else {
	                // -------- 非 chrome 不能用 data.items 取图片 -----

	                E.log('未从 data.items 得到数据，使用检测粘贴图片的方式');

	                // 获取
	                $imgsBeforePaste = $txt.find('img');
	                E.log('粘贴前，检查到编辑器有' + $imgsBeforePaste.length + '个图片');

	                // 异步上传找到的图片
	                setTimeout(findPasteImgAndUpload, 0);
	            }
	        });

	    });
	});
	// 拖拽上传图片 插件 
	_e(function (E, $) {

	    E.plugin(function () {

	        var editor = this;
	        var txt = editor.txt;
	        var $txt = txt.$txt;
	        var config = editor.config;
	        var uploadImgUrl = config.uploadImgUrl;
	        var uploadFileName = config.uploadImgFileName || 'wangEditorDragFile';

	        // 未配置上传图片url，则忽略
	        if (!uploadImgUrl) {
	            return;
	        }

	        // 阻止浏览器默认行为
	        E.$document.on('dragleave drop dragenter dragover', function (e) {
	            e.preventDefault();
	        });

	        // 监控 $txt drop 事件
	        $txt.on('drop', function (dragEvent) {
	            dragEvent.preventDefault();

	            var originalEvent = dragEvent.originalEvent;
	            var files = originalEvent.dataTransfer && originalEvent.dataTransfer.files;

	            if (!files || !files.length) {
	                return;
	            }

	            $.each(files, function (k, file) {
	                var type = file.type;
	                var name = file.name;

	                if (type.indexOf('image/') < 0) {
	                    // 只接收图片
	                    return;
	                }

	                E.log('得到图片 ' + name);

	                var reader = new FileReader();
	                reader.onload = function (e) {
	                    E.log('读取到图片 ' + name);

	                    // 执行上传
	                    var base64 = e.target.result || this.result;
	                    editor.xhrUploadImg({
	                        event: dragEvent,
	                        base64: base64,
	                        fileType: type,
	                        name: uploadFileName
	                    });
	                };

	                //读取粘贴的文件
	                reader.readAsDataURL(file);

	            });
	        });
	    });

	});
	// 编辑器区域 table toolbar
	_e(function (E, $) {

	    E.plugin(function () {
	        var editor = this;
	        var txt = editor.txt;
	        var $txt = txt.$txt;
	        var html = '';
	        // 说明：设置了 max-height 之后，$txt.parent() 负责滚动处理
	        var $currentTxt = editor.useMaxHeight ? $txt.parent() : $txt;
	        var $currentTable;

	        // 用到的dom节点
	        var isRendered = false;
	        var $toolbar = $('<div class="txt-toolbar"></div>');
	        var $triangle = $('<div class="tip-triangle"></div>');
	        var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
	        var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
	        var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');

	        // 渲染到页面
	        function render() {
	            if (isRendered) {
	                return;
	            }
	            
	            // 绑定事件
	            bindEvent();

	            // 拼接 渲染到页面上
	            $toolbar.append($triangle)
	                    .append($delete)
	                    .append($zoomSmall)
	                    .append($zoomBig);
	            editor.$editorContainer.append($toolbar);
	            isRendered = true;
	        }

	        // 绑定事件
	        function bindEvent() {
	            // 统一执行命令的方法
	            var commandFn;
	            function command(e, callback) {
	                // 执行命令之前，先存储html内容
	                html = $txt.html();
	                // 监控内容变化
	                var cb = function  () {
	                    if (callback) {
	                        callback();
	                    }
	                    if (html !== $txt.html()) {
	                        $txt.change();
	                    }
	                };
	                // 执行命令
	                if (commandFn) {
	                    editor.customCommand(e, commandFn, cb);
	                }
	            }

	            // 删除
	            $delete.click(function (e) {
	                commandFn = function () {
	                    $currentTable.remove();
	                };
	                command(e, function () {
	                    setTimeout(hide, 100);
	                });
	            });

	            // 放大
	            $zoomBig.click(function (e) {
	                commandFn = function () {
	                    $currentTable.css({
	                        width: '100%'
	                    });
	                };
	                command(e, function () {
	                    setTimeout(show);
	                });
	            });

	            // 缩小
	            $zoomSmall.click(function (e) {
	                commandFn = function () {
	                    $currentTable.css({
	                        width: 'auto'
	                    });
	                };
	                command(e, function () {
	                    setTimeout(show);
	                });
	            });
	        }

	        // 显示 toolbar
	        function show() {
	            if (editor._disabled) {
	                // 编辑器已经被禁用，则不让显示
	                return;
	            }
	            if ($currentTable == null) {
	                return;
	            }
	            $currentTable.addClass('clicked');
	            var tablePosition = $currentTable.position();
	            var tableTop = tablePosition.top;
	            var tableLeft = tablePosition.left;
	            var tableHeight = $currentTable.outerHeight();
	            var tableWidth = $currentTable.outerWidth();

	            // --- 定位 toolbar ---

	            // 计算初步结果
	            var top = tableTop + tableHeight;
	            var left = tableLeft;
	            var marginLeft = 0;

	            var txtTop = $currentTxt.position().top;
	            var txtHeight = $currentTxt.outerHeight();
	            if (top > (txtTop + txtHeight)) {
	                // top 不得超出编辑范围
	                top = txtTop + txtHeight;
	            }

	            // 显示（方便计算 margin）
	            $toolbar.show();

	            // 计算 margin
	            var width = $toolbar.outerWidth();
	            marginLeft = tableWidth / 2 - width / 2;

	            // 定位
	            $toolbar.css({
	                top: top + 5,
	                left: left,
	                'margin-left': marginLeft
	            });
	            // 如果定位太靠左了
	            if (marginLeft < 0) {
	                // 得到三角形的margin-left
	                $toolbar.css('margin-left', '0');
	                $triangle.hide();
	            } else {
	                $triangle.show();
	            }
	        }
	        
	        // 隐藏 toolbar
	        function hide() {
	            if ($currentTable == null) {
	                return;
	            }
	            $currentTable.removeClass('clicked');
	            $currentTable = null;
	            $toolbar.hide();
	        }

	        // click table 事件
	        $currentTxt.on('click', 'table', function (e) {
	            var $table = $(e.currentTarget);

	            // 渲染
	            render();

	            if ($currentTable && ($currentTable.get(0) === $table.get(0))) {
	                setTimeout(hide, 100);
	                return;
	            }

	            // 显示 toolbar
	            $currentTable = $table;
	            show();

	            // 阻止冒泡
	            e.preventDefault();
	            e.stopPropagation();
	            
	        }).on('click keydown scroll', function (e) {
	            setTimeout(hide, 100);
	        });
	        E.$body.on('click keydown scroll', function (e) {
	            setTimeout(hide, 100);
	        });
	    });

	});
	// 编辑器区域 img toolbar
	_e(function (E, $) {

	    if (E.userAgent.indexOf('MSIE 8') > 0) {
	        return;
	    }
	    
	    E.plugin(function () {
	        var editor = this;
	        var lang = editor.config.lang;
	        var txt = editor.txt;
	        var $txt = txt.$txt;
	        var html = '';
	        // 说明：设置了 max-height 之后，$txt.parent() 负责滚动处理
	        var $currentTxt = editor.useMaxHeight ? $txt.parent() : $txt;
	        var $editorContainer = editor.$editorContainer;
	        var $currentImg;
	        var currentLink = '';

	        // 用到的dom节点
	        var isRendered = false;
	        var $dragPoint = $('<div class="img-drag-point"></div>');

	        var $toolbar = $('<div class="txt-toolbar"></div>');
	        var $triangle = $('<div class="tip-triangle"></div>');

	        var $menuContainer = $('<div></div>');
	        var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
	        var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
	        var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');
	        // var $floatLeft = $('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>');
	        // var $noFloat = $('<a href="#"><i class="wangeditor-menu-img-align-justify"></i></a>');
	        // var $floatRight = $('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>');
	        var $alignLeft = $('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>');
	        var $alignCenter = $('<a href="#"><i class="wangeditor-menu-img-align-center"></i></a>');
	        var $alignRight = $('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>');
	        var $link = $('<a href="#"><i class="wangeditor-menu-img-link"></i></a>');
	        var $unLink = $('<a href="#"><i class="wangeditor-menu-img-unlink"></i></a>');

	        var $linkInputContainer = $('<div style="display:none;"></div>');
	        var $linkInput = $('<input type="text" style="height:26px; margin-left:10px; width:200px;"/>');
	        var $linkBtnSubmit = $('<button class="right">' + lang.submit + '</button>');
	        var $linkBtnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

	        // 记录是否正在拖拽
	        var isOnDrag = false;

	        // 获取 / 设置 链接
	        function imgLink(e, url) {
	            if (!$currentImg) {
	                return;
	            }
	            var commandFn;
	            var callback = function () {
	                // 及时保存currentLink
	                if (url != null) {
	                    currentLink = url;
	                }
	                if (html !== $txt.html()) {
	                    $txt.change();
	                }
	            };
	            var $link;
	            var inLink = false;
	            var $parent = $currentImg.parent();
	            if ($parent.get(0).nodeName.toLowerCase() === 'a') {
	                // 父元素就是图片链接
	                $link = $parent;
	                inLink = true;
	            } else {
	                // 父元素不是图片链接，则重新创建一个链接
	                $link = $('<a target="_blank"></a>');
	            }

	            if (url == null) {
	                // url 无值，是获取链接
	                return $link.attr('href') || '';
	            } else if (url === '') {
	                // url 是空字符串，是取消链接
	                if (inLink) {
	                    commandFn = function () {
	                        $currentImg.unwrap();
	                    };
	                }
	            } else {
	                // url 有值，是设置链接
	                if (url === currentLink) {
	                    return;
	                }
	                commandFn = function () {
	                    $link.attr('href', url);

	                    if (!inLink) {
	                        // 当前图片未包含在链接中，则包含进来
	                        $currentImg.wrap($link);
	                    }
	                };
	            }

	            // 执行命令
	            if (commandFn) {
	                // 记录下执行命令之前的html内容
	                html = $txt.html();
	                // 执行命令
	                editor.customCommand(e, commandFn, callback);
	            }
	        }

	        // 渲染到页面
	        function render() {
	            if (isRendered) {
	                return;
	            }
	            
	            // 绑定事件
	            bindToolbarEvent();
	            bindDragEvent();

	            // 菜单放入 container
	            $menuContainer.append($delete)
	                            .append($zoomSmall)
	                            .append($zoomBig)
	                            // .append($floatLeft)
	                            // .append($noFloat)
	                            // .append($floatRight);
	                            .append($alignLeft)
	                            .append($alignCenter)
	                            .append($alignRight)
	                            .append($link)
	                            .append($unLink);

	            // 链接input放入container
	            $linkInputContainer.append($linkInput)
	                               .append($linkBtnCancel)
	                               .append($linkBtnSubmit);

	            // 拼接 渲染到页面上
	            $toolbar.append($triangle)
	                    .append($menuContainer)
	                    .append($linkInputContainer);
	                    
	            editor.$editorContainer.append($toolbar).append($dragPoint);
	            isRendered = true;
	        }

	        // 绑定toolbar事件
	        function bindToolbarEvent() {
	            // 统一执行命令的方法
	            var commandFn;
	            function customCommand(e, callback) {
	                var cb;
	                // 记录下执行命令之前的html内容
	                html = $txt.html();
	                cb = function () {
	                    if (callback) {
	                        callback();
	                    }
	                    if (html !== $txt.html()) {
	                        $txt.change();
	                    }
	                };
	                // 执行命令
	                if (commandFn) {
	                    editor.customCommand(e, commandFn, cb);
	                }
	            }

	            // 删除
	            $delete.click(function (e) {
	                // 删除之前先unlink
	                imgLink(e, '');

	                // 删除图片
	                commandFn = function () {
	                    $currentImg.remove();
	                };
	                customCommand(e, function () {
	                    setTimeout(hide, 100);
	                });
	            });

	            // 放大
	            $zoomBig.click(function (e) {
	                commandFn = function () {
	                    var img = $currentImg.get(0);
	                    var width = img.width;
	                    var height = img.height;
	                    width = width * 1.1;
	                    height = height * 1.1;

	                    $currentImg.css({
	                        width: width + 'px',
	                        height: height + 'px'
	                    });
	                };
	                customCommand(e, function () {
	                    setTimeout(show);
	                });
	            });

	            // 缩小
	            $zoomSmall.click(function (e) {
	                commandFn = function () {
	                    var img = $currentImg.get(0);
	                    var width = img.width;
	                    var height = img.height;
	                    width = width * 0.9;
	                    height = height * 0.9;

	                    $currentImg.css({
	                        width: width + 'px',
	                        height: height + 'px'
	                    });
	                };
	                customCommand(e, function () {
	                    setTimeout(show);
	                });
	            });

	            // // 左浮动
	            // $floatLeft.click(function (e) {
	            //     commandFn = function () {
	            //         $currentImg.css({
	            //             float: 'left'
	            //         });
	            //     };
	            //     customCommand(e, function () {
	            //         setTimeout(hide, 100);
	            //     });
	            // });

	            // alignLeft
	            $alignLeft.click(function (e) {
	                commandFn = function () {
	                    // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
	                    $currentImg.parents('p').css({
	                        'text-align': 'left'
	                    }).attr('align', 'left');
	                };
	                customCommand(e, function () {
	                    setTimeout(hide, 100);
	                });
	            });

	            // // 右浮动
	            // $floatRight.click(function (e) {
	            //     commandFn = function () {
	            //         $currentImg.css({
	            //             float: 'right'
	            //         });
	            //     };
	            //     customCommand(e, function () {
	            //         setTimeout(hide, 100);
	            //     });
	            // });

	            // alignRight
	            $alignRight.click(function (e) {
	                commandFn = function () {
	                    // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
	                    $currentImg.parents('p').css({
	                        'text-align': 'right'
	                    }).attr('align', 'right');
	                };
	                customCommand(e, function () {
	                    setTimeout(hide, 100);
	                });
	            });

	            // // 无浮动
	            // $noFloat.click(function (e) {
	            //     commandFn = function () {
	            //         $currentImg.css({
	            //             float: 'none'
	            //         });
	            //     };
	            //     customCommand(e, function () {
	            //         setTimeout(hide, 100);
	            //     });
	            // });

	            // alignCenter
	            $alignCenter.click(function (e) {
	                commandFn = function () {
	                    // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
	                    $currentImg.parents('p').css({
	                        'text-align': 'center'
	                    }).attr('align', 'center');
	                };
	                customCommand(e, function () {
	                    setTimeout(hide, 100);
	                });
	            });

	            // link
	            // 显示链接input
	            $link.click(function (e) {
	                e.preventDefault();

	                // 获取当前链接，并显示
	                currentLink = imgLink(e);
	                $linkInput.val(currentLink);

	                $menuContainer.hide();
	                $linkInputContainer.show();
	            });
	            // 设置链接
	            $linkBtnSubmit.click(function (e) {
	                e.preventDefault();

	                var url = $.trim($linkInput.val());
	                if (url) {
	                    // 设置链接，同时会自动更新 currentLink 的值
	                    imgLink(e, url);
	                }

	                // 隐藏 toolbar
	                setTimeout(hide);
	            });
	            // 取消设置链接
	            $linkBtnCancel.click(function (e) {
	                e.preventDefault();

	                // 重置链接 input
	                $linkInput.val(currentLink);

	                $menuContainer.show();
	                $linkInputContainer.hide();
	            });

	            // unlink
	            $unLink.click(function (e) {
	                e.preventDefault();

	                // 执行 unlink
	                imgLink(e, '');

	                // 隐藏 toolbar
	                setTimeout(hide);
	            });
	        }

	        // 绑定drag事件
	        function bindDragEvent() {
	            var _x, _y;
	            var dragMarginLeft, dragMarginTop;
	            var imgWidth, imgHeight;

	            function mousemove (e) {
	                var diffX, diffY;

	                // 计算差额
	                diffX = e.pageX - _x;
	                diffY = e.pageY - _y;

	                // --------- 计算拖拽点的位置 ---------
	                var currentDragMarginLeft = dragMarginLeft + diffX;
	                var currentDragMarginTop = dragMarginTop + diffY;
	                $dragPoint.css({
	                    'margin-left': currentDragMarginLeft,
	                    'margin-top': currentDragMarginTop
	                });

	                // --------- 计算图片的大小 ---------
	                var currentImgWidth = imgWidth + diffX;
	                var currentImggHeight = imgHeight + diffY;
	                $currentImg && $currentImg.css({
	                    width: currentImgWidth,
	                    height: currentImggHeight
	                });
	            }

	            $dragPoint.on('mousedown', function(e){
	                if (!$currentImg) {
	                    return;
	                }
	                // 当前鼠标位置
	                _x = e.pageX;
	                _y = e.pageY;

	                // 当前拖拽点的位置
	                dragMarginLeft = parseFloat($dragPoint.css('margin-left'), 10);
	                dragMarginTop = parseFloat($dragPoint.css('margin-top'), 10);

	                // 当前图片的大小
	                imgWidth = $currentImg.width();
	                imgHeight = $currentImg.height();

	                // 隐藏 $toolbar
	                $toolbar.hide();

	                // 绑定计算事件
	                E.$document.on('mousemove._dragResizeImg', mousemove);
	                E.$document.on('mouseup._dragResizeImg', function (e) {
	                    // 取消绑定
	                    E.$document.off('mousemove._dragResizeImg');
	                    E.$document.off('mouseup._dragResizeImg');

	                    // 隐藏，并还原拖拽点的位置
	                    hide();
	                    $dragPoint.css({
	                        'margin-left': dragMarginLeft,
	                        'margin-top': dragMarginTop
	                    });

	                    // 记录
	                    isOnDrag = false;
	                });

	                // 记录
	                isOnDrag = true;
	            });
	        }

	        // 显示 toolbar
	        function show() {
	            if (editor._disabled) {
	                // 编辑器已经被禁用，则不让显示
	                return;
	            }
	            if ($currentImg == null) {
	                return;
	            }
	            $currentImg.addClass('clicked');
	            var imgPosition = $currentImg.position();
	            var imgTop = imgPosition.top;
	            var imgLeft = imgPosition.left;
	            var imgHeight = $currentImg.outerHeight();
	            var imgWidth = $currentImg.outerWidth();


	            // --- 定位 dragpoint ---
	            $dragPoint.css({
	                top: imgTop + imgHeight,
	                left: imgLeft + imgWidth
	            });

	            // --- 定位 toolbar ---

	            // 计算初步结果
	            var top = imgTop + imgHeight;
	            var left = imgLeft;
	            var marginLeft = 0;

	            var txtTop = $currentTxt.position().top;
	            var txtHeight = $currentTxt.outerHeight();
	            if (top > (txtTop + txtHeight)) {
	                // top 不得超出编辑范围
	                top = txtTop + txtHeight;
	            } else {
	                // top 超出编辑范围，dragPoint就不显示了
	                $dragPoint.show();
	            }

	            // 显示（方便计算 margin）
	            $toolbar.show();

	            // 计算 margin
	            var width = $toolbar.outerWidth();
	            marginLeft = imgWidth / 2 - width / 2;

	            // 定位
	            $toolbar.css({
	                top: top + 5,
	                left: left,
	                'margin-left': marginLeft
	            });
	            // 如果定位太靠左了
	            if (marginLeft < 0) {
	                // 得到三角形的margin-left
	                $toolbar.css('margin-left', '0');
	                $triangle.hide();
	            } else {
	                $triangle.show();
	            }

	            // disable 菜单
	            editor.disableMenusExcept();
	        }
	        
	        // 隐藏 toolbar
	        function hide() {
	            if ($currentImg == null) {
	                return;
	            }
	            $currentImg.removeClass('clicked');
	            $currentImg = null;

	            $toolbar.hide();
	            $dragPoint.hide();

	            // enable 菜单
	            editor.enableMenusExcept();
	        }

	        // 判断img是否是一个表情
	        function isEmotion(imgSrc) {
	            var result = false;
	            if (!editor.emotionUrls) {
	                return result;
	            }
	            $.each(editor.emotionUrls, function (index, url) {
	                var flag = false;
	                if (imgSrc === url) {
	                    result = true;
	                    flag = true;
	                }
	                if (flag) {
	                    return false;  // break 循环
	                }
	            });
	            return result;
	        }

	        // click img 事件
	        $currentTxt.on('mousedown', 'img', function (e) {
	            e.preventDefault();
	        }).on('click', 'img', function (e) {
	            var $img = $(e.currentTarget);
	            var src = $img.attr('src');

	            if (!src || isEmotion(src)) {
	                // 是一个表情图标
	                return;
	            }

	            // ---------- 不是表情图标 ---------- 

	            // 渲染
	            render();

	            if ($currentImg && ($currentImg.get(0) === $img.get(0))) {
	                setTimeout(hide, 100);
	                return;
	            }

	            // 显示 toolbar
	            $currentImg = $img;
	            show();

	            // 默认显示menuContainer，其他默认隐藏
	            $menuContainer.show();
	            $linkInputContainer.hide();

	            // 阻止冒泡
	            e.preventDefault();
	            e.stopPropagation();
	            
	        }).on('click keydown scroll', function (e) {
	            if (!isOnDrag) {
	                setTimeout(hide, 100);
	            }
	        });

	    });

	});
	// 编辑区域 link toolbar
	_e(function (E, $) {
	    E.plugin(function () {
	        var editor = this;
	        var lang = editor.config.lang;
	        var $txt = editor.txt.$txt;

	        // 当前命中的链接
	        var $currentLink;

	        var $toolbar = $('<div class="txt-toolbar"></div>');
	        var $triangle = $('<div class="tip-triangle"></div>');
	        var $triggerLink = $('<a href="#" target="_blank"><i class="wangeditor-menu-img-link"></i> ' + lang.openLink + '</a>');
	        var isRendered;

	        // 记录当前的显示/隐藏状态
	        var isShow = false;

	        var showTimeoutId, hideTimeoutId;
	        var showTimeoutIdByToolbar, hideTimeoutIdByToolbar;

	        // 渲染 dom
	        function render() {
	            if (isRendered) {
	                return;
	            }

	            $toolbar.append($triangle)
	                    .append($triggerLink);

	            editor.$editorContainer.append($toolbar);

	            isRendered = true;
	        }

	        // 定位
	        function setPosition() {
	            if (!$currentLink) {
	                return;
	            }

	            var position = $currentLink.position();
	            var left = position.left;
	            var top = position.top;
	            var height = $currentLink.height();

	            // 初步计算top值
	            var topResult = top + height + 5;

	            // 判断 toolbar 是否超过了编辑器区域的下边界
	            var menuHeight = editor.menuContainer.height();
	            var txtHeight = editor.txt.$txt.outerHeight();
	            if (topResult > menuHeight + txtHeight) {
	                topResult = menuHeight + txtHeight + 5;
	            }

	            // 最终设置
	            $toolbar.css({
	                top: topResult,
	                left: left
	            });
	        }

	        // 显示 toolbar
	        function show() {
	            if (isShow) {
	                return;
	            }

	            if (!$currentLink) {
	                return;
	            }

	            render();

	            $toolbar.show();

	            // 设置链接
	            var href = $currentLink.attr('href');
	            $triggerLink.attr('href', href);

	            // 定位
	            setPosition();

	            isShow = true;
	        }

	        // 隐藏 toolbar
	        function hide() {
	            if (!isShow) {
	                return;
	            }

	            if (!$currentLink) {
	                return;
	            }

	            $toolbar.hide();
	            isShow = false;
	        }

	        // $txt 绑定事件
	        $txt.on('mouseenter', 'a', function (e) {
	            // 延时 500ms 显示toolbar
	            if (showTimeoutId) {
	                clearTimeout(showTimeoutId);
	            }
	            showTimeoutId = setTimeout(function () {
	                var a = e.currentTarget;
	                var $a = $(a);
	                $currentLink = $a;

	                var $img = $a.children('img');
	                if ($img.length) {
	                    // 该链接下包含一个图片

	                    // 图片点击时，隐藏toolbar
	                    $img.click(function (e) {
	                        hide();
	                    });

	                    if ($img.hasClass('clicked')) {
	                        // 图片还处于clicked状态，则不显示toolbar
	                        return;
	                    }
	                }

	                // 显示toolbar
	                show();
	            }, 500);
	        }).on('mouseleave', 'a', function (e) {
	            // 延时 500ms 隐藏toolbar
	            if (hideTimeoutId) {
	                clearTimeout(hideTimeoutId);
	            }
	            hideTimeoutId = setTimeout(hide, 500);
	        }).on('click keydown scroll', function (e) {
	            setTimeout(hide, 100);
	        });
	        // $toolbar 绑定事件
	        $toolbar.on('mouseenter', function (e) {
	            // 先中断掉 $txt.mouseleave 导致的隐藏
	            if (hideTimeoutId) {
	                clearTimeout(hideTimeoutId);
	            }
	        }).on('mouseleave', function (e) {
	            // 延时 500ms 显示toolbar
	            if (showTimeoutIdByToolbar) {
	                clearTimeout(showTimeoutIdByToolbar);
	            }
	            showTimeoutIdByToolbar = setTimeout(hide, 500);
	        });
	    });
	});
	// menu吸顶
	_e(function (E, $) {

	    E.plugin(function () {
	        var editor = this;
	        var menuFixed = editor.config.menuFixed;
	        if (menuFixed === false || typeof menuFixed !== 'number') {
	            // 没有配置菜单吸顶
	            return;
	        }
	        var bodyMarginTop = parseFloat(E.$body.css('margin-top'), 10);
	        if (isNaN(bodyMarginTop)) {
	            bodyMarginTop = 0;
	        }

	        var $editorContainer = editor.$editorContainer;
	        var editorTop = $editorContainer.offset().top;
	        var editorHeight = $editorContainer.outerHeight();
	        
	        var $menuContainer = editor.menuContainer.$menuContainer;
	        var menuCssPosition = $menuContainer.css('position');
	        var menuCssTop = $menuContainer.css('top');
	        var menuTop = $menuContainer.offset().top;
	        var menuHeight = $menuContainer.outerHeight();
	        
	        var $txt = editor.txt.$txt;

	        E.$window.scroll(function () {
	            //全屏模式不支持
	            if (editor.isFullScreen) {
	                return;
	            }

	            var sTop = E.$window.scrollTop();

	            // 需要重新计算宽度，因为浏览器可能此时出现滚动条
	            var menuWidth = $menuContainer.width();

	            // 如果 menuTop === 0 说明此前编辑器一直隐藏，后来显示出来了，要重新计算相关数据
	            if (menuTop === 0) {
	                menuTop = $menuContainer.offset().top;
	                editorTop = $editorContainer.offset().top;
	                editorHeight = $editorContainer.outerHeight();
	                menuHeight = $menuContainer.outerHeight();
	            }

	            if (sTop >= menuTop && sTop + menuFixed + menuHeight + 30 < editorTop + editorHeight) {
	                // 吸顶
	                $menuContainer.css({
	                    position: 'fixed',
	                    top: menuFixed
	                });

	                // 固定宽度
	                $menuContainer.width(menuWidth);

	                // 增加body margin-top
	                E.$body.css({
	                    'margin-top': bodyMarginTop + menuHeight
	                });

	                // 记录
	                if (!editor._isMenufixed) {
	                    editor._isMenufixed = true;
	                }
	            } else {
	                // 取消吸顶
	                $menuContainer.css({
	                    position: menuCssPosition,
	                    top: menuCssTop
	                });

	                // 取消宽度固定
	                $menuContainer.css('width', '100%');

	                // 还原 body margin-top
	                E.$body.css({
	                    'margin-top': bodyMarginTop
	                });

	                // 撤销记录
	                if (editor._isMenufixed) {
	                    editor._isMenufixed = false;
	                }
	            }
	        });
	    });

	});
	// 缩进 菜单插件
	_e(function (E, $) {

	    // 用 createMenu 方法创建菜单
	    E.createMenu(function (check) {

	        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
	        var menuId = 'indent';

	        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
	        if (!check(menuId)) {
	            return;
	        }

	        // this 指向 editor 对象自身
	        var editor = this;

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,  // 编辑器对象
	            id: menuId,  // 菜单id
	            title: '缩进', // 菜单标题

	            // 正常状态和选中装下的dom对象，样式需要自定义
	            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-indent-left"></i></a>'),
	            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-indent-left"></i></a>')
	        });

	        // 菜单正常状态下，点击将触发该事件
	        menu.clickEvent = function (e) {
	            var elem = editor.getRangeElem();
	            var p = editor.getSelfOrParentByName(elem, 'p');
	            var $p;

	            if (!p) {
	                // 未找到 p 元素，则忽略
	                return e.preventDefault();
	            }
	            $p = $(p);

	            // 使用自定义命令
	            function commandFn() {
	                $p.css('text-indent', '2em');
	            }
	            editor.customCommand(e, commandFn);
	        };

	        // 菜单选中状态下，点击将触发该事件
	        menu.clickEventSelected = function (e) {
	            var elem = editor.getRangeElem();
	            var p = editor.getSelfOrParentByName(elem, 'p');
	            var $p;

	            if (!p) {
	                // 未找到 p 元素，则忽略
	                return e.preventDefault();
	            }
	            $p = $(p);

	            // 使用自定义命令
	            function commandFn() {
	                $p.css('text-indent', '0');
	            }
	            editor.customCommand(e, commandFn);
	        };

	        // 根据当前选区，自定义更新菜单的选中状态或者正常状态
	        menu.updateSelectedEvent = function () {
	            // 获取当前选区所在的父元素
	            var elem = editor.getRangeElem();
	            var p = editor.getSelfOrParentByName(elem, 'p');
	            var $p;
	            var indent;

	            if (!p) {
	                // 未找到 p 元素，则标记为未处于选中状态
	                return false;
	            }
	            $p = $(p);
	            indent = $p.css('text-indent');

	            if (!indent || indent === '0px') {
	                // 得到的p，text-indent 属性是 0，则标记为未处于选中状态
	                return false;
	            }

	            // 找到 p 元素，并且 text-indent 不是 0，则标记为选中状态
	            return true;
	        };

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;
	    });

	});
	// 行高 菜单插件
	_e(function (E, $) {

	    // 用 createMenu 方法创建菜单
	    E.createMenu(function (check) {

	        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
	        var menuId = 'lineheight';

	        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
	        if (!check(menuId)) {
	            return;
	        }

	        // this 指向 editor 对象自身
	        var editor = this;

	        // 由于浏览器自身不支持 lineHeight 命令，因此要做一个hook
	        editor.commandHooks.lineHeight = function (value) {
	            var rangeElem = editor.getRangeElem();
	            var targetElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,pre');
	            if (!targetElem) {
	                return;
	            }
	            $(targetElem).css('line-height', value + '');
	        };

	        // 创建 menu 对象
	        var menu = new E.Menu({
	            editor: editor,  // 编辑器对象
	            id: menuId,  // 菜单id
	            title: '行高', // 菜单标题
	            commandName: 'lineHeight', // 命令名称

	            // 正常状态和选中装下的dom对象，样式需要自定义
	            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),
	            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')
	        });

	        // 数据源
	        var data  = {
	            // 格式： 'value' : 'title'
	            '1.0': '1.0倍',
	            '1.5': '1.5倍',
	            '1.8': '1.8倍',
	            '2.0': '2.0倍',
	            '2.5': '2.5倍',
	            '3.0': '3.0倍'
	        };

	        // 为menu创建droplist对象
	        var tpl = '<span style="line-height:{#commandValue}">{#title}</span>';
	        menu.dropList = new E.DropList(editor, menu, {
	            data: data,  // 传入数据源
	            tpl: tpl  // 传入模板
	        });

	        // 增加到editor对象中
	        editor.menus[menuId] = menu;

	    });

	});
	// 自定义上传
	_e(function (E, $) {

	    E.plugin(function () {

	        var editor = this;
	        var customUpload = editor.config.customUpload;
	        if (!customUpload) {
	            return;
	        } else if (editor.config.uploadImgUrl) {
	            alert('自定义上传无效，详看浏览器日志console.log');
	            E.error('已经配置了 uploadImgUrl ，就不能再配置 customUpload ，两者冲突。将导致自定义上传无效。');
	            return;
	        }

	        var $uploadContent = editor.$uploadContent;
	        if (!$uploadContent) {
	            E.error('自定义上传，无法获取 editor.$uploadContent');
	        }

	        // UI
	        var $uploadIcon = $('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');
	        $uploadContent.append($uploadIcon);

	        // 设置id，并暴露
	        var btnId = 'upload' + E.random();
	        var containerId = 'upload' + E.random();
	        $uploadIcon.attr('id', btnId);
	        $uploadContent.attr('id', containerId);

	        editor.customUploadBtnId = btnId;
	        editor.customUploadContainerId = containerId;
	    });

	});
	// 版权提示
	_e(function (E, $) {
	    E.info('本页面富文本编辑器由 wangEditor 提供 http://wangeditor.github.io/ ');
	});
	    
	    // 最终返回wangEditor构造函数
	    return window.wangEditor;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./lib/jquery-1.10.2.min": 21,
		"./lib/jquery-1.10.2.min.js": 21,
		"./lib/jquery-2.2.1": 24,
		"./lib/jquery-2.2.1.js": 24,
		"./wangEditor": 19,
		"./wangEditor.js": 19,
		"./wangEditor.min": 25,
		"./wangEditor.min.js": 25
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 20;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, _, $, module) {/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
	*/
	(function (e, t) {
	    var n, r, i = typeof t, o = e.location, a = e.document, s = a.documentElement, l = __webpack_provided_window_dot_jQuery, u = e.$, c = {}, p = [], f = "1.10.2", d = p.concat, h = p.push, g = p.slice, m = p.indexOf, y = c.toString, v = c.hasOwnProperty, b = f.trim, x = function (e, t) { return new x.fn.init(e, t, r) }, w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = /\S+/g, C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, E = /^[\],:{}\s]*$/, S = /(?:^|:|,)(?:\s*\[)+/g, A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, D = /^-ms-/, L = /-([\da-z])/gi, H = function (e, t) { return t.toUpperCase() }, q = function (e) { (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready()) }, _ = function () { a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q)) }; x.fn = x.prototype = { jquery: f, constructor: x, init: function (e, n, r) { var i, o; if (!e) return this; if ("string" == typeof e) { if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e); if (i[1]) { if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), k.test(i[1]) && x.isPlainObject(n)) for (i in n) x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]); return this } if (o = a.getElementById(i[2]), o && o.parentNode) { if (o.id !== i[2]) return r.find(e); this.length = 1, this[0] = o } return this.context = a, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this)) }, selector: "", length: 0, toArray: function () { return g.call(this) }, get: function (e) { return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e] }, pushStack: function (e) { var t = x.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function (e, t) { return x.each(this, e, t) }, ready: function (e) { return x.ready.promise().done(e), this }, slice: function () { return this.pushStack(g.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (e) { var t = this.length, n = +e + (0 > e ? t : 0); return this.pushStack(n >= 0 && t > n ? [this[n]] : []) }, map: function (e) { return this.pushStack(x.map(this, function (t, n) { return e.call(t, n, t) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: h, sort: [].sort, splice: [].splice }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () { var e, n, r, i, o, a, s = arguments[0] || {}, l = 1, u = arguments.length, c = !1; for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l) ; u > l; l++) if (null != (o = arguments[l])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r)); return s }, x.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), noConflict: function (t) { return e.$ === x && (e.$ = u), t && __webpack_provided_window_dot_jQuery === x && (__webpack_provided_window_dot_jQuery = l), x }, isReady: !1, readyWait: 1, holdReady: function (e) { e ? x.readyWait++ : x.ready(!0) }, ready: function (e) { if (e === !0 ? !--x.readyWait : !x.isReady) { if (!a.body) return setTimeout(x.ready); x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [x]), x.fn.trigger && x(a).trigger("ready").off("ready")) } }, isFunction: function (e) { return "function" === x.type(e) }, isArray: Array.isArray || function (e) { return "array" === x.type(e) }, isWindow: function (e) { return null != e && e == e.window }, isNumeric: function (e) { return !isNaN(parseFloat(e)) && isFinite(e) }, type: function (e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e }, isPlainObject: function (e) { var n; if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1; try { if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) return !1 } catch (r) { return !1 } if (x.support.ownLast) for (n in e) return v.call(e, n); for (n in e); return n === t || v.call(e, n) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, error: function (e) { throw Error(e) }, parseHTML: function (e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || a; var r = k.exec(e), i = !n && []; return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes)) }, parseJSON: function (n) { return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t) }, parseXML: function (n) { var r, i; if (!n || "string" != typeof n) return null; try { e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n)) } catch (o) { r = t } return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r }, noop: function () { }, globalEval: function (t) { t && x.trim(t) && (e.execScript || function (t) { e.eval.call(e, t) })(t) }, camelCase: function (e) { return e.replace(D, "ms-").replace(L, H) }, nodeName: function (e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function (e, t, n) { var r, i = 0, o = e.length, a = M(e); if (n) { if (a) { for (; o > i; i++) if (r = t.apply(e[i], n), r === !1) break } else for (i in e) if (r = t.apply(e[i], n), r === !1) break } else if (a) { for (; o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break; return e }, trim: b && !b.call("\ufeff\u00a0") ? function (e) { return null == e ? "" : b.call(e) } : function (e) { return null == e ? "" : (e + "").replace(C, "") }, makeArray: function (e, t) { var n = t || []; return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n }, inArray: function (e, t, n) { var r; if (t) { if (m) return m.call(t, e, n); for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n } return -1 }, merge: function (e, n) { var r = n.length, i = e.length, o = 0; if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++]; return e.length = i, e }, grep: function (e, t, n) { var r, i = [], o = 0, a = e.length; for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]); return i }, map: function (e, t, n) { var r, i = 0, o = e.length, a = M(e), s = []; if (a) for (; o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), null != r && (s[s.length] = r); return d.apply([], s) }, guid: 1, proxy: function (e, n) { var r, i, o; return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), i = function () { return e.apply(n || this, r.concat(g.call(arguments))) }, i.guid = e.guid = e.guid || x.guid++, i) : t }, access: function (e, n, r, i, o, a, s) { var l = 0, u = e.length, c = null == r; if ("object" === x.type(r)) { o = !0; for (l in r) x.access(e, n, l, r[l], !0, a, s) } else if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) { return c.call(x(e), n) })), n)) for (; u > l; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r))); return o ? e : c ? n.call(e) : u ? n(e[0], r) : a }, now: function () { return (new Date).getTime() }, swap: function (e, t, n, r) { var i, o, a = {}; for (o in t) a[o] = e.style[o], e.style[o] = t[o]; i = n.apply(e, r || []); for (o in t) e.style[o] = a[o]; return i } }), x.ready.promise = function (t) { if (!n) if (n = x.Deferred(), "complete" === a.readyState) setTimeout(x.ready); else if (a.addEventListener) a.addEventListener("DOMContentLoaded", q, !1), e.addEventListener("load", q, !1); else { a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q); var r = !1; try { r = null == e.frameElement && a.documentElement } catch (i) { } r && r.doScroll && function o() { if (!x.isReady) { try { r.doScroll("left") } catch (e) { return setTimeout(o, 50) } _(), x.ready() } }() } return n.promise(t) }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) { c["[object " + t + "]"] = t.toLowerCase() }); function M(e) { var t = e.length, n = x.type(e); return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e) } r = x(a), function (e, t) { var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date, w = e.document, T = 0, C = 0, N = st(), k = st(), E = st(), S = !1, A = function (e, t) { return e === t ? (S = !0, 0) : 0 }, j = typeof t, D = 1 << 31, L = {}.hasOwnProperty, H = [], q = H.pop, _ = H.push, M = H.push, O = H.slice, F = H.indexOf || function (e) { var t = 0, n = this.length; for (; n > t; t++) if (this[t] === e) return t; return -1 }, B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = R.replace("w", "w#"), $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]", I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)", z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), X = RegExp("^" + P + "*," + P + "*"), U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), V = RegExp(P + "*[+~]"), Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"), J = RegExp(I), G = RegExp("^" + W + "$"), Q = { ID: RegExp("^#(" + R + ")"), CLASS: RegExp("^\\.(" + R + ")"), TAG: RegExp("^(" + R.replace("w", "w*") + ")"), ATTR: RegExp("^" + $), PSEUDO: RegExp("^" + I), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"), bool: RegExp("^(?:" + B + ")$", "i"), needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i") }, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /^(?:input|select|textarea|button)$/i, tt = /^h\d$/i, nt = /'|\\/g, rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), it = function (e, t, n) { var r = "0x" + t - 65536; return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r) }; try { M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType } catch (ot) { M = { apply: H.length ? function (e, t) { _.apply(e, O.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function at(e, t, n, i) { var o, a, s, l, u, c, d, m, y, x; if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) return n; if (1 !== (l = t.nodeType) && 9 !== l) return []; if (h && !i) { if (o = Z.exec(e)) if (s = o[1]) { if (9 === l) { if (a = t.getElementById(s), !a || !a.parentNode) return n; if (a.id === s) return n.push(a), n } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) return n.push(a), n } else { if (o[2]) return M.apply(n, t.getElementsByTagName(e)), n; if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) return M.apply(n, t.getElementsByClassName(s)), n } if (r.qsa && (!g || !g.test(e))) { if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) { c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", u = c.length; while (u--) c[u] = m + yt(c[u]); y = V.test(e) && t.parentNode || t, x = c.join(",") } if (x) try { return M.apply(n, y.querySelectorAll(x)), n } catch (T) { } finally { d || t.removeAttribute("id") } } } return kt(e.replace(z, "$1"), t, n, i) } function st() { var e = []; function t(n, r) { return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r } return t } function lt(e) { return e[b] = !0, e } function ut(e) { var t = f.createElement("div"); try { return !!e(t) } catch (n) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function ct(e, t) { var n = e.split("|"), r = e.length; while (r--) o.attrHandle[n[r]] = t } function pt(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D); if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function ft(e) { return function (t) { var n = t.nodeName.toLowerCase(); return "input" === n && t.type === e } } function dt(e) { return function (t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } } function ht(e) { return lt(function (t) { return t = +t, lt(function (n, r) { var i, o = e([], n.length, t), a = o.length; while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i])) }) }) } s = at.isXML = function (e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, r = at.support = {}, p = at.setDocument = function (e) { var n = e ? e.ownerDocument || e : w, i = n.defaultView; return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function () { p() }), r.attributes = ut(function (e) { return e.className = "i", !e.getAttribute("className") }), r.getElementsByTagName = ut(function (e) { return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length }), r.getElementsByClassName = ut(function (e) { return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length }), r.getById = ut(function (e) { return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length }), r.getById ? (o.find.ID = function (e, t) { if (typeof t.getElementById !== j && h) { var n = t.getElementById(e); return n && n.parentNode ? [n] : [] } }, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { return e.getAttribute("id") === t } }) : (delete o.find.ID, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id"); return n && n.value === t } }), o.find.TAG = r.getElementsByTagName ? function (e, n) { return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, o.find.CLASS = r.getElementsByClassName && function (e, n) { return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function (e) { e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked") }), ut(function (e) { var t = n.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:") })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function (e) { r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I) }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, A = d.compareDocumentPosition ? function (e, t) { if (e === t) return S = !0, 0; var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t); return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1 } : function (e, t) { var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t]; if (e === t) return S = !0, 0; if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0; if (o === a) return pt(e, t); r = e; while (r = r.parentNode) s.unshift(r); r = t; while (r = r.parentNode) l.unshift(r); while (s[i] === l[i]) i++; return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0 }, n) : f }, at.matches = function (e, t) { return at(e, null, null, t) }, at.matchesSelector = function (e, t) { if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) try { var n = y.call(e, t); if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (i) { } return at(t, f, null, [e]).length > 0 }, at.contains = function (e, t) { return (e.ownerDocument || e) !== f && p(e), v(e, t) }, at.attr = function (e, n) { (e.ownerDocument || e) !== f && p(e); var i = o.attrHandle[n.toLowerCase()], a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t; return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a }, at.error = function (e) { throw Error("Syntax error, unrecognized expression: " + e) }, at.uniqueSort = function (e) { var t, n = [], i = 0, o = 0; if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) { while (t = e[o++]) t === e[o] && (i = n.push(o)); while (i--) e.splice(n[i], 1) } return e }, a = at.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) n += a(e) } else if (3 === i || 4 === i) return e.nodeValue } else for (; t = e[r]; r++) n += a(t); return n }, o = at.selectors = { cacheLength: 50, createPseudo: lt, match: Q, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e }, PSEUDO: function (e) { var n, r = !e[5] && e[2]; return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(rt, it).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = N[e + " "]; return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function (e) { return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "") }) }, ATTR: function (e, t, n) { return function (r) { var i = at.attr(r, e); return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0 } }, CHILD: function (e, t, n, r, i) { var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t; return 1 === r && 0 === i ? function (e) { return !!e.parentNode } : function (t, n, l) { var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s; if (m) { if (o) { while (g) { p = t; while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1; h = g = "only" === e && !h && "nextSibling" } return !0 } if (h = [a ? m.firstChild : m.lastChild], a && v) { c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d]; while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) { c[e] = [T, d, f]; break } } else if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) f = u[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0 } } }, PSEUDO: function (e, t) { var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e); return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function (e, n) { var i, o = r(e, t), a = o.length; while (a--) i = F.call(e, o[a]), e[i] = !(n[i] = o[a]) }) : function (e) { return r(e, 0, n) }) : r } }, pseudos: { not: lt(function (e) { var t = [], n = [], r = l(e.replace(z, "$1")); return r[b] ? lt(function (e, t, n, i) { var o, a = r(e, null, i, []), s = e.length; while (s--) (o = a[s]) && (e[s] = !(t[s] = o)) }) : function (e, i, o) { return t[0] = e, r(t, null, o, n), !n.pop() } }), has: lt(function (e) { return function (t) { return at(e, t).length > 0 } }), contains: lt(function (e) { return function (t) { return (t.textContent || t.innerText || a(t)).indexOf(e) > -1 } }), lang: lt(function (e) { return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(), function (t) { var n; do if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType); return !1 } }), target: function (t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function (e) { return e === d }, focus: function (e) { return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: function (e) { return e.disabled === !1 }, disabled: function (e) { return e.disabled === !0 }, checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1; return !0 }, parent: function (e) { return !o.pseudos.empty(e) }, header: function (e) { return tt.test(e.nodeName) }, input: function (e) { return et.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type) }, first: ht(function () { return [0] }), last: ht(function (e, t) { return [t - 1] }), eq: ht(function (e, t, n) { return [0 > n ? n + t : n] }), even: ht(function (e, t) { var n = 0; for (; t > n; n += 2) e.push(n); return e }), odd: ht(function (e, t) { var n = 1; for (; t > n; n += 2) e.push(n); return e }), lt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; --r >= 0;) e.push(r); return e }), gt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; t > ++r;) e.push(r); return e }) } }, o.pseudos.nth = o.pseudos.eq; for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) o.pseudos[n] = ft(n); for (n in { submit: !0, reset: !0 }) o.pseudos[n] = dt(n); function gt() { } gt.prototype = o.filters = o.pseudos, o.setFilters = new gt; function mt(e, t) { var n, r, i, a, s, l, u, c = k[e + " "]; if (c) return t ? 0 : c.slice(0); s = e, l = [], u = o.preFilter; while (s) { (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({ value: n, type: r[0].replace(z, " ") }), s = s.slice(n.length)); for (a in o.filter) !(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({ value: n, type: a, matches: r }), s = s.slice(n.length)); if (!n) break } return t ? s.length : s ? at.error(e) : k(e, l).slice(0) } function yt(e) { var t = 0, n = e.length, r = ""; for (; n > t; t++) r += e[t].value; return r } function vt(e, t, n) { var r = t.dir, o = n && "parentNode" === r, a = C++; return t.first ? function (t, n, i) { while (t = t[r]) if (1 === t.nodeType || o) return e(t, n, i) } : function (t, n, s) { var l, u, c, p = T + " " + a; if (s) { while (t = t[r]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0 } else while (t = t[r]) if (1 === t.nodeType || o) if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) { if ((l = u[1]) === !0 || l === i) return l === !0 } else if (u = c[r] = [p], u[1] = e(t, n, s) || i, u[1] === !0) return !0 } } function bt(e) { return e.length > 1 ? function (t, n, r) { var i = e.length; while (i--) if (!e[i](t, n, r)) return !1; return !0 } : e[0] } function xt(e, t, n, r, i) { var o, a = [], s = 0, l = e.length, u = null != t; for (; l > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s)); return a } function wt(e, t, n, r, i, o) { return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function (o, a, s, l) { var u, c, p, f = [], d = [], h = a.length, g = o || Nt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : xt(g, f, e, s, l), y = n ? i || (o ? e : h || r) ? [] : a : m; if (n && n(m, y, s, l), r) { u = xt(y, d), r(u, [], s, l), c = u.length; while (c--) (p = u[c]) && (y[d[c]] = !(m[d[c]] = p)) } if (o) { if (i || e) { if (i) { u = [], c = y.length; while (c--) (p = y[c]) && u.push(m[c] = p); i(null, y = [], u, l) } c = y.length; while (c--) (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p)) } } else y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y) }) } function Tt(e) { var t, n, r, i = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], l = a ? 1 : 0, c = vt(function (e) { return e === t }, s, !0), p = vt(function (e) { return F.call(t, e) > -1 }, s, !0), f = [function (e, n, r) { return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r)) }]; for (; i > l; l++) if (n = o.relative[e[l].type]) f = [vt(bt(f), n)]; else { if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) { for (r = ++l; i > r; r++) if (o.relative[e[r].type]) break; return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({ value: " " === e[l - 2].type ? "*" : "" })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e)) } f.push(n) } return bt(f) } function Ct(e, t) { var n = 0, r = t.length > 0, a = e.length > 0, s = function (s, l, c, p, d) { var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, C = u, N = s || a && o.find.TAG("*", d && l.parentNode || l), k = T += null == C ? 1 : Math.random() || .1; for (w && (u = l !== f && l, i = n) ; null != (h = N[b]) ; b++) { if (a && h) { g = 0; while (m = e[g++]) if (m(h, l, c)) { p.push(h); break } w && (T = k, i = ++n) } r && ((h = !m && h) && v--, s && x.push(h)) } if (v += b, r && b !== v) { g = 0; while (m = t[g++]) m(x, y, l, c); if (s) { if (v > 0) while (b--) x[b] || y[b] || (y[b] = q.call(p)); y = xt(y) } M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p) } return w && (T = k, u = C), x }; return r ? lt(s) : s } l = at.compile = function (e, t) { var n, r = [], i = [], o = E[e + " "]; if (!o) { t || (t = mt(e)), n = t.length; while (n--) o = Tt(t[n]), o[b] ? r.push(o) : i.push(o); o = E(e, Ct(i, r)) } return o }; function Nt(e, t, n) { var r = 0, i = t.length; for (; i > r; r++) at(e, t[r], n); return n } function kt(e, t, n, i) { var a, s, u, c, p, f = mt(e); if (!i && 1 === f.length) { if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) { if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) return n; e = e.slice(s.shift().value.length) } a = Q.needsContext.test(e) ? 0 : s.length; while (a--) { if (u = s[a], o.relative[c = u.type]) break; if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) { if (s.splice(a, 1), e = i.length && yt(s), !e) return M.apply(n, i), n; break } } } return l(e, f)(i, t, !h, n, V.test(e)), n } r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function (e) { return 1 & e.compareDocumentPosition(f.createElement("div")) }), ut(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || ct("type|href|height|width", function (e, n, r) { return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2) }), r.attributes && ut(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || ct("value", function (e, n, r) { return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue }), ut(function (e) { return null == e.getAttribute("disabled") }) || ct(B, function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains }(e); var O = {}; function F(e) { var t = O[e] = {}; return x.each(e.match(T) || [], function (e, n) { t[n] = !0 }), t } x.Callbacks = function (e) { e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e); var n, r, i, o, a, s, l = [], u = !e.once && [], c = function (t) { for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) { r = !1; break } n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable()) }, p = { add: function () { if (l) { var t = l.length; (function i(t) { x.each(t, function (t, n) { var r = x.type(n); "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n) }) })(arguments), n ? o = l.length : r && (s = t, c(r)) } return this }, remove: function () { return l && x.each(arguments, function (e, t) { var r; while ((r = x.inArray(t, l, r)) > -1) l.splice(r, 1), n && (o >= r && o--, a >= r && a--) }), this }, has: function (e) { return e ? x.inArray(e, l) > -1 : !(!l || !l.length) }, empty: function () { return l = [], o = 0, this }, disable: function () { return l = u = r = t, this }, disabled: function () { return !l }, lock: function () { return u = t, r || p.disable(), this }, locked: function () { return !u }, fireWith: function (e, t) { return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this }, fire: function () { return p.fireWith(this, arguments), this }, fired: function () { return !!i } }; return p }, x.extend({ Deferred: function (e) { var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]], n = "pending", r = { state: function () { return n }, always: function () { return i.done(arguments).fail(arguments), this }, then: function () { var e = arguments; return x.Deferred(function (n) { x.each(t, function (t, o) { var a = o[0], s = x.isFunction(e[t]) && e[t]; i[o[1]](function () { var e = s && s.apply(this, arguments); e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments) }) }), e = null }).promise() }, promise: function (e) { return null != e ? x.extend(e, r) : r } }, i = {}; return r.pipe = r.then, x.each(t, function (e, o) { var a = o[2], s = o[3]; r[o[1]] = a.add, s && a.add(function () { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () { return i[o[0] + "With"](this === i ? r : this, arguments), this }, i[o[0] + "With"] = a.fireWith }), r.promise(i), e && e.call(i, i), i }, when: function (e) { var t = 0, n = g.call(arguments), r = n.length, i = 1 !== r || e && x.isFunction(e.promise) ? r : 0, o = 1 === i ? e : x.Deferred(), a = function (e, t, n) { return function (r) { t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n) } }, s, l, u; if (r > 1) for (s = Array(r), l = Array(r), u = Array(r) ; r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i; return i || o.resolveWith(u, n), o.promise() } }), x.support = function (t) {
	        var n, r, o, s, l, u, c, p, f, d = a.createElement("div"); if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t; s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled; try { delete d.test } catch (h) { t.deleteExpando = !1 } o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function () { t.noCloneEvent = !1 }), d.cloneNode(!0).click()); for (f in { submit: !0, change: !0, focusin: !0 }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1; d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip; for (f in x(t)) break; return t.ownLast = "0" !== f, x(function () { var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", l = a.getElementsByTagName("body")[0]; l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l, null != l.style.zoom ? { zoom: 1 } : {}, function () { t.boxSizing = 4 === d.offsetWidth }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || { width: "4px" }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null) }), n = s = l = u = r = o = null, t
	    }({}); var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, P = /([A-Z])/g; function R(e, n, r, i) { if (x.acceptData(e)) { var o, a, s = x.expando, l = e.nodeType, u = l ? x.cache : e, c = l ? e[s] : e[s] && s; if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : { toJSON: x.noop }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o } } function W(e, t, n) { if (x.acceptData(e)) { var r, i, o = e.nodeType, a = o ? x.cache : e, s = o ? e[x.expando] : x.expando; if (a[s]) { if (t && (r = n ? a[s] : a[s].data)) { x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length; while (i--) delete r[t[i]]; if (n ? !I(r) : !x.isEmptyObject(r)) return } (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null) } } } x.extend({ cache: {}, noData: { applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (e) { return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e) }, data: function (e, t, n) { return R(e, t, n) }, removeData: function (e, t) { return W(e, t) }, _data: function (e, t, n) { return R(e, t, n, !0) }, _removeData: function (e, t) { return W(e, t, !0) }, acceptData: function (e) { if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1; var t = e.nodeName && x.noData[e.nodeName.toLowerCase()]; return !t || t !== !0 && e.getAttribute("classid") === t } }), x.fn.extend({ data: function (e, n) { var r, i, o = null, a = 0, s = this[0]; if (e === t) { if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) { for (r = s.attributes; r.length > a; a++) i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s, i, o[i])); x._data(s, "parsedAttrs", !0) } return o } return "object" == typeof e ? this.each(function () { x.data(this, e) }) : arguments.length > 1 ? this.each(function () { x.data(this, e, n) }) : s ? $(s, e, x.data(s, e)) : null }, removeData: function (e) { return this.each(function () { x.removeData(this, e) }) } }); function $(e, n, r) { if (r === t && 1 === e.nodeType) { var i = "data-" + n.replace(P, "-$1").toLowerCase(); if (r = e.getAttribute(i), "string" == typeof r) { try { r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r } catch (o) { } x.data(e, n, r) } else r = t } return r } function I(e) { var t; for (t in e) if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) return !1; return !0 } x.extend({ queue: function (e, n, r) { var i; return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), i || []) : t }, dequeue: function (e, t) { t = t || "fx"; var n = x.queue(e, t), r = n.length, i = n.shift(), o = x._queueHooks(e, t), a = function () { x.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return x._data(e, n) || x._data(e, n, { empty: x.Callbacks("once memory").add(function () { x._removeData(e, t + "queue"), x._removeData(e, n) }) }) } }), x.fn.extend({ queue: function (e, n) { var r = 2; return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function () { var t = x.queue(this, e, n); x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e) }) }, dequeue: function (e) { return this.each(function () { x.dequeue(this, e) }) }, delay: function (e, t) { return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) { var r = setTimeout(t, e); n.stop = function () { clearTimeout(r) } }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, n) { var r, i = 1, o = x.Deferred(), a = this, s = this.length, l = function () { --i || o.resolveWith(a, [a]) }; "string" != typeof e && (n = e, e = t), e = e || "fx"; while (s--) r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l)); return l(), o.promise(n) } }); var z, X, U = /[\t\r\n\f]/g, V = /\r/g, Y = /^(?:input|select|textarea|button|object)$/i, J = /^(?:a|area)$/i, G = /^(?:checked|selected)$/i, Q = x.support.getSetAttribute, K = x.support.input; x.fn.extend({ attr: function (e, t) { return x.access(this, x.attr, e, t, arguments.length > 1) }, removeAttr: function (e) { return this.each(function () { x.removeAttr(this, e) }) }, prop: function (e, t) { return x.access(this, x.prop, e, t, arguments.length > 1) }, removeProp: function (e) { return e = x.propFix[e] || e, this.each(function () { try { this[e] = t, delete this[e] } catch (n) { } }) }, addClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).addClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) { o = 0; while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " "); n.className = x.trim(r) } return this }, removeClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).removeClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) { o = 0; while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " "); n.className = e ? x.trim(r) : "" } return this }, toggleClass: function (e, t) { var n = typeof e; return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function (n) { x(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function () { if ("string" === n) { var t, r = 0, o = x(this), a = e.match(T) || []; while (t = a[r++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t) } else (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "") }) }, hasClass: function (e) { var t = " " + e + " ", n = 0, r = this.length; for (; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) return !0; return !1 }, val: function (e) { var n, r, i, o = this[0]; { if (arguments.length) return i = x.isFunction(e), this.each(function (n) { var o; 1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function (e) { return null == e ? "" : e + "" })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o)) }); if (o) return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V, "") : null == n ? "" : n) } } }), x.extend({ valHooks: { option: { get: function (e) { var t = x.find.attr(e, "value"); return null != t ? t : e.text } }, select: { get: function (e) { var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; for (; s > l; l++) if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) { if (t = x(n).val(), o) return t; a.push(t) } return a }, set: function (e, t) { var n, r, i = e.options, o = x.makeArray(t), a = i.length; while (a--) r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0); return n || (e.selectedIndex = -1), o } } }, attr: function (e, n, r) { var o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : (x.removeAttr(e, n), t)) }, removeAttr: function (e, t) { var n, r, i = 0, o = t && t.match(T); if (o && 1 === e.nodeType) while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), e.removeAttribute(Q ? n : r) }, attrHooks: { type: { set: function (e, t) { if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, propFix: { "for": "htmlFor", "class": "className" }, prop: function (e, n, r) { var i, o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n] }, propHooks: { tabIndex: { get: function (e) { var t = x.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1 } } } }), X = { set: function (e, t, n) { return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, n } }, x.each(x.expr.match.bool.source.match(/\w+/g), function (e, n) { var r = x.expr.attrHandle[n] || x.find.attr; x.expr.attrHandle[n] = K && Q || !G.test(n) ? function (e, n, i) { var o = x.expr.attrHandle[n], a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null; return x.expr.attrHandle[n] = o, a } : function (e, n, r) { return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null } }), K && Q || (x.attrHooks.value = { set: function (e, n, r) { return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r) } }), Q || (z = { set: function (e, n, r) { var i = e.getAttributeNode(r); return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t } }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null }, x.valHooks.button = { get: function (e, n) { var r = e.getAttributeNode(n); return r && r.specified ? r.value : t }, set: z.set }, x.attrHooks.contenteditable = { set: function (e, t, n) { z.set(e, "" === t ? !1 : t, n) } }, x.each(["width", "height"], function (e, n) { x.attrHooks[n] = { set: function (e, r) { return "" === r ? (e.setAttribute(n, "auto"), r) : t } } })), x.support.hrefNormalized || x.each(["href", "src"], function (e, t) { x.propHooks[t] = { get: function (e) { return e.getAttribute(t, 4) } } }), x.support.style || (x.attrHooks.style = { get: function (e) { return e.style.cssText || t }, set: function (e, t) { return e.style.cssText = t + "" } }), x.support.optSelected || (x.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null } }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { x.propFix[this.toLowerCase()] = this }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio", "checkbox"], function () { x.valHooks[this] = { set: function (e, n) { return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t } }, x.support.checkOn || (x.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }); var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/; function it() { return !0 } function ot() { return !1 } function at() { try { return a.activeElement } catch (e) { } } x.event = { global: {}, add: function (e, n, r, o, a) { var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e); if (v) { r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function (e) { return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments) }, f.elem = e), n = (n || "").match(T) || [""], u = n.length; while (u--) s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({ type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && x.expr.match.needsContext.test(a), namespace: m.join(".") }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), x.event.global[g] = !0); e = null } }, remove: function (e, t, n, r, i) { var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e); if (m && (c = m.events)) { t = (t || "").match(T) || [""], u = t.length; while (u--) if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) { p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a)); l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), delete c[d]) } else for (d in c) x.event.remove(e, d + t[u], n, r, !0); x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events")) } }, trigger: function (n, r, i, o) { var s, l, u, c, p, f, d, h = [i || a], g = v.call(n, "type") ? n.type : n, m = v.call(n, "namespace") ? n.namespace.split(".") : []; if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r, [n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) { if (!o && !p.noBubble && !x.isWindow(i)) { for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode) ; u; u = u.parentNode) h.push(u), f = u; f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e) } d = 0; while ((u = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault(); if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) { f = i[l], f && (i[l] = null), x.event.triggered = g; try { i[g]() } catch (y) { } x.event.triggered = t, f && (i[l] = f) } return n.result } }, dispatch: function (e) { e = x.event.fix(e); var n, r, i, o, a, s = [], l = g.call(arguments), u = (x._data(this, "events") || {})[e.type] || [], c = x.event.special[e.type] || {}; if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) { s = x.event.handlers.call(this, e, u), n = 0; while ((o = s[n++]) && !e.isPropagationStopped()) { e.currentTarget = o.elem, a = 0; while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, e), e.result } }, handlers: function (e, n) { var r, i, o, a, s = [], l = n.delegateCount, u = e.target; if (l && u.nodeType && (!e.button || "click" !== e.type)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) { for (o = [], a = 0; l > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [u]).length), o[r] && o.push(i); o.length && s.push({ elem: u, handlers: o }) } return n.length > l && s.push({ elem: this, handlers: n.slice(l) }), s }, fix: function (e) { if (e[x.expando]) return e; var t, n, r, i = e.type, o = e, s = this.fixHooks[i]; s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length; while (t--) n = r[t], e[n] = o[n]; return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) { var r, i, o, s = n.button, l = n.fromElement; return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e } }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== at() && this.focus) try { return this.focus(), !1 } catch (e) { } }, delegateType: "focusin" }, blur: { trigger: function () { return this === at() && this.blur ? (this.blur(), !1) : t }, delegateType: "focusout" }, click: { trigger: function () { return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t }, _default: function (e) { return x.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function (e) { e.result !== t && (e.originalEvent.returnValue = e.result) } } }, simulate: function (e, t, n, r) { var i = x.extend(new x.Event, n, { type: e, isSimulated: !0, originalEvent: {} }); r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault() } }, x.removeEvent = a.removeEventListener ? function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) } : function (e, t, n) { var r = "on" + t; e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n)) }, x.Event = function (e, n) { return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e, n) }, x.Event.prototype = { isDefaultPrevented: ot, isPropagationStopped: ot, isImmediatePropagationStopped: ot, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1) }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = it, this.stopPropagation() } }, x.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) { x.event.special[e] = { delegateType: t, bindType: t, handle: function (e) { var n, r = this, i = e.relatedTarget, o = e.handleObj; return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n } } }), x.support.submitBubbles || (x.event.special.submit = { setup: function () { return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function (e) { var n = e.target, r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t; r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function (e) { e._submit_bubble = !0 }), x._data(r, "submitBubbles", !0)) }), t) }, postDispatch: function (e) { e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0)) }, teardown: function () { return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t) } }), x.support.changeBubbles || (x.event.special.change = { setup: function () { return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function (e) { "checked" === e.originalEvent.propertyName && (this._just_changed = !0) }), x.event.add(this, "click._change", function (e) { this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0) })), !1) : (x.event.add(this, "beforeactivate._change", function (e) { var t = e.target; Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function (e) { !this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0) }), x._data(t, "changeBubbles", !0)) }), t) }, handle: function (e) { var n = e.target; return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t }, teardown: function () { return x.event.remove(this, "._change"), !Z.test(this.nodeName) } }), x.support.focusinBubbles || x.each({ focus: "focusin", blur: "focusout" }, function (e, t) { var n = 0, r = function (e) { x.event.simulate(t, e.target, x.event.fix(e), !0) }; x.event.special[t] = { setup: function () { 0 === n++ && a.addEventListener(e, r, !0) }, teardown: function () { 0 === --n && a.removeEventListener(e, r, !0) } } }), x.fn.extend({ on: function (e, n, r, i, o) { var a, s; if ("object" == typeof e) { "string" != typeof n && (r = r || n, n = t); for (a in e) this.on(a, n, r, e[a], o); return this } if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this; return 1 === o && (s = i, i = function (e) { return x().off(e), s.apply(this, arguments) }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function () { x.event.add(this, e, i, r, n) }) }, one: function (e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function (e, n, r) { var i, o; if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this; if ("object" == typeof e) { for (o in e) this.off(o, n, e[o]); return this } return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () { x.event.remove(this, e, r, n) }) }, trigger: function (e, t) { return this.each(function () { x.event.trigger(e, t, this) }) }, triggerHandler: function (e, n) { var r = this[0]; return r ? x.event.trigger(e, n, r, !0) : t } }); var st = /^.[^:#\[\.,]*$/, lt = /^(?:parents|prev(?:Until|All))/, ut = x.expr.match.needsContext, ct = { children: !0, contents: !0, next: !0, prev: !0 }; x.fn.extend({ find: function (e) { var t, n = [], r = this, i = r.length; if ("string" != typeof e) return this.pushStack(x(e).filter(function () { for (t = 0; i > t; t++) if (x.contains(r[t], this)) return !0 })); for (t = 0; i > t; t++) x.find(e, r[t], n); return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n }, has: function (e) { var t, n = x(e, this), r = n.length; return this.filter(function () { for (t = 0; r > t; t++) if (x.contains(this, n[t])) return !0 }) }, not: function (e) { return this.pushStack(ft(this, e || [], !0)) }, filter: function (e) { return this.pushStack(ft(this, e || [], !1)) }, is: function (e) { return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0; for (; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) { n = o.push(n); break } return this.pushStack(o.length > 1 ? x.unique(o) : o) }, index: function (e) { return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e), r = x.merge(this.get(), n); return this.pushStack(x.unique(r)) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }); function pt(e, t) { do e = e[t]; while (e && 1 !== e.nodeType); return e } x.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return x.dir(e, "parentNode") }, parentsUntil: function (e, t, n) { return x.dir(e, "parentNode", n) }, next: function (e) { return pt(e, "nextSibling") }, prev: function (e) { return pt(e, "previousSibling") }, nextAll: function (e) { return x.dir(e, "nextSibling") }, prevAll: function (e) { return x.dir(e, "previousSibling") }, nextUntil: function (e, t, n) { return x.dir(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return x.dir(e, "previousSibling", n) }, siblings: function (e) { return x.sibling((e.parentNode || {}).firstChild, e) }, children: function (e) { return x.sibling(e.firstChild) }, contents: function (e) { return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes) } }, function (e, t) { x.fn[e] = function (n, r) { var i = x.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i) } }), x.extend({ filter: function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) { return 1 === e.nodeType })) }, dir: function (e, n, r) { var i = [], o = e[n]; while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) 1 === o.nodeType && i.push(o), o = o[n]; return i }, sibling: function (e, t) { var n = []; for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }); function ft(e, t, n) { if (x.isFunction(t)) return x.grep(e, function (e, r) { return !!t.call(e, r, e) !== n }); if (t.nodeType) return x.grep(e, function (e) { return e === t !== n }); if ("string" == typeof t) { if (st.test(t)) return x.filter(t, e, n); t = x.filter(t, e) } return x.grep(e, function (e) { return x.inArray(e, t) >= 0 !== n }) } function dt(e) { var t = ht.split("|"), n = e.createDocumentFragment(); if (n.createElement) while (t.length) n.createElement(t.pop()); return n } var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Ct = /^(?:checkbox|radio)$/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, jt = dt(a), Dt = jt.appendChild(a.createElement("div")); At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({ text: function (e) { return x.access(this, function (e) { return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e)) }, null, e, arguments.length) }, append: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.appendChild(e) } }) }, prepend: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function (e, t) { var n, r = e ? x.filter(e, this) : this, i = 0; for (; null != (n = r[i]) ; i++) t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), n.parentNode.removeChild(n)); return this }, empty: function () { var e, t = 0; for (; null != (e = this[t]) ; t++) { 1 === e.nodeType && x.cleanData(Ft(e, !1)); while (e.firstChild) e.removeChild(e.firstChild); e.options && x.nodeName(e, "select") && (e.options.length = 0) } return this }, clone: function (e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () { return x.clone(this, e, t) }) }, html: function (e) { return x.access(this, function (e) { var n = this[0] || {}, r = 0, i = this.length; if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t; if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) { e = e.replace(vt, "<$1></$2>"); try { for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), n.innerHTML = e); n = 0 } catch (o) { } } n && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var e = x.map(this, function (e) { return [e.nextSibling, e.parentNode] }), t = 0; return this.domManip(arguments, function (n) { var r = e[t++], i = e[t++]; i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r)) }, !0), t ? this : this.remove() }, detach: function (e) { return this.remove(e, !0) }, domManip: function (e, t, n) { e = d.apply([], e); var r, i, o, a, s, l, u = 0, c = this.length, p = this, f = c - 1, h = e[0], g = x.isFunction(h); if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) return this.each(function (r) { var i = p.eq(r); g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n) }); if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) { for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) i = l, u !== f && (i = x.clone(i, !0, !0), o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u); if (o) for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) i = a[u], kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, ""))); l = r = null } return this } }); function Lt(e, t) { return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e } function Ht(e) { return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e } function qt(e) { var t = Et.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e } function _t(e, t) { var n, r = 0; for (; null != (n = e[r]) ; r++) x._data(n, "globalEval", !t || x._data(t[r], "globalEval")) } function Mt(e, t) { if (1 === t.nodeType && x.hasData(e)) { var n, r, i, o = x._data(e), a = x._data(t, o), s = o.events; if (s) { delete a.handle, a.events = {}; for (n in s) for (r = 0, i = s[n].length; i > r; r++) x.event.add(t, n, s[n][r]) } a.data && (a.data = x.extend({}, a.data)) } } function Ot(e, t) { var n, r, i; if (1 === t.nodeType) { if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) { i = x._data(t); for (r in i.events) x.removeEvent(t, r, i.handle); t.removeAttribute(x.expando) } "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue) } } x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) { x.fn[e] = function (e) { var n, r = 0, i = [], o = x(e), a = o.length - 1; for (; a >= r; r++) n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get()); return this.pushStack(i) } }); function Ft(e, n) { var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t; if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]) ; a++) !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n)); return n === t || n && x.nodeName(e, n) ? x.merge([e], s) : s } function Bt(e) { Ct.test(e.type) && (e.defaultChecked = e.checked) } x.extend({
	        clone: function (e, t, n) { var r, i, o, a, s, l = x.contains(e.ownerDocument, e); if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]) ; ++a) r[a] && Ot(i, r[a]); if (t) if (n) for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]) ; a++) Mt(i, r[a]); else Mt(e, o); return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, o }, buildFragment: function (e, t, n, r) { var i, o, a, s, l, u, c, p = e.length, f = dt(t), d = [], h = 0; for (; p > h; h++) if (o = e[h], o || 0 === o) if ("object" === x.type(o)) x.merge(d, o.nodeType ? [o] : o); else if (wt.test(o)) { s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0]; while (i--) s = s.lastChild; if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) { o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; while (i--) x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u) } x.merge(d, s.childNodes), s.textContent = ""; while (s.firstChild) s.removeChild(s.firstChild); s = f.lastChild } else d.push(t.createTextNode(o)); s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0; while (o = d[h++]) if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), s = Ft(f.appendChild(o), "script"), a && _t(s), n)) { i = 0; while (o = s[i++]) kt.test(o.type || "") && n.push(o) } return s = null, f }, cleanData: function (e, t) {
	            var n, r, o, a, s = 0, l = x.expando, u = x.cache, c = x.support.deleteExpando, f = x.event.special; for (; null != (n = e[s]) ; s++) if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
	                if (a.events) for (r in a.events) f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
	                u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o))
	            }
	        }, _evalUrl: function (e) { return x.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }
	    }), x.fn.extend({ wrapAll: function (e) { if (x.isFunction(e)) return this.each(function (t) { x(this).wrapAll(e.call(this, t)) }); if (this[0]) { var t = x(e, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild; return e }).append(this) } return this }, wrapInner: function (e) { return x.isFunction(e) ? this.each(function (t) { x(this).wrapInner(e.call(this, t)) }) : this.each(function () { var t = x(this), n = t.contents(); n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function (e) { var t = x.isFunction(e); return this.each(function (n) { x(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function () { return this.parent().each(function () { x.nodeName(this, "body") || x(this).replaceWith(this.childNodes) }).end() } }); var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + w + ")(.*)$", "i"), Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + w + ")", "i"), Gt = { BODY: "block" }, Qt = { position: "absolute", visibility: "hidden", display: "block" }, Kt = { letterSpacing: 0, fontWeight: 400 }, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"]; function tn(e, t) { if (t in e) return t; var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length; while (i--) if (t = en[i] + n, t in e) return t; return r } function nn(e, t) { return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e) } function rn(e, t) { var n, r, i, o = [], a = 0, s = e.length; for (; s > a; a++) r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display")))); for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none")); return e } x.fn.extend({ css: function (e, n) { return x.access(this, function (e, n, r) { var i, o, a = {}, s = 0; if (x.isArray(n)) { for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = x.css(e, n[s], !1, o); return a } return r !== t ? x.style(e, n, r) : x.css(e, n) }, e, n, arguments.length > 1) }, show: function () { return rn(this, !0) }, hide: function () { return rn(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { nn(this) ? x(this).show() : x(this).hide() }) } }), x.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Wt(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": x.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (e, n, r, i) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var o, a, s, l = x.camelCase(n), u = e.style; if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n]; if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try { u[n] = r } catch (c) { } } }, css: function (e, n, r, i) { var o, a, s, l = x.camelCase(n); return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a } }), e.getComputedStyle ? (Rt = function (t) { return e.getComputedStyle(t, null) }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s.getPropertyValue(n) || s[n] : t, u = e.style; return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l }) : a.documentElement.currentStyle && (Rt = function (e) { return e.currentStyle }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s[n] : t, u = e.style; return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l }); function on(e, t, n) { var r = Vt.exec(t); return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t } function an(e, t, n, r, i) { var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; for (; 4 > o; o += 2) "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i))); return a } function sn(e, t, n) { var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o); if (0 >= i || null == i) { if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i; r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0 } return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px" } function ln(e) { var t = a, n = Gt[e]; return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n } function un(e, t) { var n = x(t.createElement(e)).appendTo(t.body), r = x.css(n[0], "display"); return n.remove(), r } x.each(["height", "width"], function (e, n) { x.cssHooks[n] = { get: function (e, r, i) { return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function () { return sn(e, n, i) }) : sn(e, n, i) : t }, set: function (e, t, r) { var i = r && Rt(e); return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0) } } }), x.support.opacity || (x.cssHooks.opacity = { get: function (e, t) { return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "" }, set: function (e, t) { var n = e.style, r = e.currentStyle, i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || ""; n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i) } }), x(function () { x.support.reliableMarginRight || (x.cssHooks.marginRight = { get: function (e, n) { return n ? x.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"]) : t } }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, n) { x.cssHooks[n] = { get: function (e, r) { return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t } } }) }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) { return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display")) }, x.expr.filters.visible = function (e) { return !x.expr.filters.hidden(e) }), x.each({ margin: "", padding: "", border: "Width" }, function (e, t) { x.cssHooks[e + t] = { expand: function (n) { var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; for (; 4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0]; return i } }, Ut.test(e) || (x.cssHooks[e + t].set = on) }); var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i; x.fn.extend({ serialize: function () { return x.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = x.prop(this, "elements"); return e ? x.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e)) }).map(function (e, t) { var n = x(this).val(); return null == n ? null : x.isArray(n) ? x.map(n, function (e) { return { name: t.name, value: e.replace(fn, "\r\n") } }) : { name: t.name, value: n.replace(fn, "\r\n") } }).get() } }), x.param = function (e, n) { var r, i = [], o = function (e, t) { t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () { o(this.name, this.value) }); else for (r in e) gn(r, e[r], n, o); return i.join("&").replace(cn, "+") }; function gn(e, t, n, r) { var i; if (x.isArray(t)) x.each(t, function (t, i) { n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) }); else if (n || "object" !== x.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r) } x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) { x.fn[t] = function (e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), x.fn.extend({ hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } }); var mn, yn, vn = x.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = x.fn.load, An = {}, jn = {}, Dn = "*/".concat("*"); try { yn = o.href } catch (Ln) { yn = a.createElement("a"), yn.href = "", yn = yn.href } mn = En.exec(yn.toLowerCase()) || []; function Hn(e) { return function (t, n) { "string" != typeof t && (n = t, t = "*"); var r, i = 0, o = t.toLowerCase().match(T) || []; if (x.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } } function qn(e, n, r, i) { var o = {}, a = e === jn; function s(l) { var u; return o[l] = !0, x.each(e[l] || [], function (e, l) { var c = l(n, r, i); return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1) }), u } return s(n.dataTypes[0]) || !o["*"] && s("*") } function _n(e, n) { var r, i, o = x.ajaxSettings.flatOptions || {}; for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]); return r && x.extend(!0, e, r), e } x.fn.load = function (e, n, r) { if ("string" != typeof e && Sn) return Sn.apply(this, arguments); var i, o, a, s = this, l = e.indexOf(" "); return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({ url: e, type: a, dataType: "html", data: n }).done(function (e) { o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e) }).complete(r && function (e, t) { s.each(r, o || [e.responseText, t, e]) }), this }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { x.fn[t] = function (e) { return this.on(t, e) } }), x.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: yn, type: "GET", isLocal: Cn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (e, t) { return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e) }, ajaxPrefilter: Hn(An), ajaxTransport: Hn(jn), ajax: function (e, n) { "object" == typeof e && (n = e, e = t), n = n || {}; var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event, h = x.Deferred(), g = x.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, b = 0, w = "canceled", C = { readyState: 0, getResponseHeader: function (e) { var t; if (2 === b) { if (!c) { c = {}; while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2] } t = c[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function () { return 2 === b ? a : null }, setRequestHeader: function (e, t) { var n = e.toLowerCase(); return b || (e = v[n] = v[n] || e, y[e] = t), this }, overrideMimeType: function (e) { return b || (p.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (2 > b) for (t in e) m[t] = [m[t], e[t]]; else C.always(e[C.status]); return this }, abort: function (e) { var t = e || w; return u && u.abort(t), k(0, t), this } }; if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), qn(An, p, n, C), 2 === b) return C; l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]); for (i in p.headers) C.setRequestHeader(i, p.headers[i]); if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) return C.abort(); w = "abort"; for (i in { success: 1, error: 1, complete: 1 }) C[i](p[i]); if (u = qn(jn, p, n, C)) { C.readyState = 1, l && d.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (s = setTimeout(function () { C.abort("timeout") }, p.timeout)); try { b = 1, u.send(y, k) } catch (N) { if (!(2 > b)) throw N; k(-1, N) } } else k(-1, "No Transport"); function k(e, n, r, i) { var c, y, v, w, T, N = n; 2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]), g.fireWith(f, [C, N]), l && (d.trigger("ajaxComplete", [C, p]), --x.active || x.event.trigger("ajaxStop"))) } return C }, getJSON: function (e, t, n) { return x.get(e, t, n, "json") }, getScript: function (e, n) { return x.get(e, t, n, "script") } }), x.each(["get", "post"], function (e, n) { x[n] = function (e, r, i, o) { return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({ url: e, type: n, dataType: o, data: r, success: i }) } }); function Mn(e, n, r) { var i, o, a, s, l = e.contents, u = e.dataTypes; while ("*" === u[0]) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type")); if (o) for (s in l) if (l[s] && l[s].test(o)) { u.unshift(s); break } if (u[0] in r) a = u[0]; else { for (s in r) { if (!u[0] || e.converters[s + " " + u[0]]) { a = s; break } i || (i = s) } a = a || i } return a ? (a !== u[0] && u.unshift(a), r[a]) : t } function On(e, t, n, r) { var i, o, a, s, l, u = {}, c = e.dataTypes.slice(); if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a]; o = c.shift(); while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) { if (a = u[l + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) { a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1])); break } if (a !== !0) if (a && e["throws"]) t = a(t); else try { t = a(t) } catch (p) { return { state: "parsererror", error: a ? p : "No conversion from " + l + " to " + o } } } return { state: "success", data: t } } x.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (e) { return x.globalEval(e), e } } }), x.ajaxPrefilter("script", function (e) { e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1) }), x.ajaxTransport("script", function (e) { if (e.crossDomain) { var n, r = a.head || x("head")[0] || a.documentElement; return { send: function (t, i) { n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) { (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success")) }, r.insertBefore(n, r.firstChild) }, abort: function () { n && n.onload(t, !0) } } } }); var Fn = [], Bn = /(=)\?(?=&|$)|\?\?/; x.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = Fn.pop() || x.expando + "_" + vn++; return this[e] = !0, e } }), x.ajaxPrefilter("json jsonp", function (n, r, i) { var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data"); return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () { return s || x.error(o + " was not called"), s[0] }, n.dataTypes[0] = "json", a = e[o], e[o] = function () { s = arguments }, i.always(function () { e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t }), "script") : t }); var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function () { var e; for (e in Pn) Pn[e](t, !0) }; function In() { try { return new e.XMLHttpRequest } catch (t) { } } function zn() { try { return new e.ActiveXObject("Microsoft.XMLHTTP") } catch (t) { } } x.ajaxSettings.xhr = e.ActiveXObject ? function () { return !this.isLocal && In() || zn() } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function (n) { if (!n.crossDomain || x.support.cors) { var r; return { send: function (i, o) { var a, s, l = n.xhr(); if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s]; n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"); try { for (s in i) l.setRequestHeader(s, i[s]) } catch (u) { } l.send(n.hasContent && n.data || null), r = function (e, i) { var s, u, c, p; try { if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) 4 !== l.readyState && l.abort(); else { p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText); try { c = l.statusText } catch (f) { c = "" } s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404 } } catch (d) { i || o(-1, d) } p && o(s, c, p, u) }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r() }, abort: function () { r && r(t, !0) } } } }); var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = { "*": [function (e, t) { var n = this.createTween(e, t), r = n.cur(), i = Yn.exec(t), o = i && i[3] || (x.cssNumber[e] ? "" : "px"), a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)), s = 1, l = 20; if (a && a[3] !== o) { o = o || a[3], i = i || [], a = +r || 1; do s = s || ".5", a /= s, x.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l) } return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n }] }; function Kn() { return setTimeout(function () { Xn = t }), Xn = x.now() } function Zn(e, t, n) { var r, i = (Qn[t] || []).concat(Qn["*"]), o = 0, a = i.length; for (; a > o; o++) if (r = i[o].call(n, t, e)) return r } function er(e, t, n) { var r, i, o = 0, a = Gn.length, s = x.Deferred().always(function () { delete l.elem }), l = function () { if (i) return !1; var t = Xn || Kn(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; for (; l > a; a++) u.tweens[a].run(o); return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1) }, u = s.promise({ elem: e, props: x.extend({}, t), opts: x.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Xn || Kn(), duration: n.duration, tweens: [], createTween: function (t, n) { var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing); return u.tweens.push(r), r }, stop: function (t) { var n = 0, r = t ? u.tweens.length : 0; if (i) return this; for (i = !0; r > n; n++) u.tweens[n].run(1); return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this } }), c = u.props; for (tr(c, u.opts.specialEasing) ; a > o; o++) if (r = Gn[o].call(u, e, c, u.opts)) return r; return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always) } function tr(e, t) { var n, r, i, o, a; for (n in e) if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) { o = a.expand(o), delete e[r]; for (n in o) n in e || (e[n] = o[n], t[n] = i) } else t[r] = i } x.Animation = x.extend(er, { tweener: function (e, t) { x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); var n, r = 0, i = e.length; for (; i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t) }, prefilter: function (e, t) { t ? Gn.unshift(e) : Gn.push(e) } }); function nr(e, t, n) { var r, i, o, a, s, l, u = this, c = {}, p = e.style, f = e.nodeType && nn(e), d = x._data(e, "fxshow"); n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () { s.unqueued || l() }), s.unqueued++, u.always(function () { u.always(function () { s.unqueued--, x.queue(e, "fx").length || s.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function () { p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2] })); for (r in t) if (i = t[r], Vn.exec(i)) { if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) continue; c[r] = d && d[r] || x.style(e, r) } if (!x.isEmptyObject(c)) { d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), f ? x(e).show() : u.done(function () { x(e).hide() }), u.done(function () { var t; x._removeData(e, "fxshow"); for (t in c) x.style(e, t, c[t]) }); for (r in c) a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0)) } } function rr(e, t, n, r, i) { return new rr.prototype.init(e, t, n, r, i) } x.Tween = rr, rr.prototype = { constructor: rr, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px") }, cur: function () { var e = rr.propHooks[this.prop]; return e && e.get ? e.get(this) : rr.propHooks._default.get(this) }, run: function (e) { var t, n = rr.propHooks[this.prop]; return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this } }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = { _default: { get: function (e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function (e) { x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, x.each(["toggle", "show", "hide"], function (e, t) { var n = x.fn[t]; x.fn[t] = function (e, r, i) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i) } }), x.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(nn).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (e, t, n, r) { var i = x.isEmptyObject(e), o = x.speed(t, n, r), a = function () { var t = er(this, x.extend({}, e), o); (i || x._data(this, "finish")) && t.stop(!0) }; return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a) }, stop: function (e, n, r) { var i = function (e) { var t = e.stop; delete e.stop, t(r) }; return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () { var t = !0, n = null != e && e + "queueHooks", o = x.timers, a = x._data(this); if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]); for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && x.dequeue(this, e) }) }, finish: function (e) { return e !== !1 && (e = e || "fx"), this.each(function () { var t, n = x._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = x.timers, a = r ? r.length : 0; for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)); for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this); delete n.finish }) } }); function ir(e, t) { var n, r = { height: e }, i = 0; for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e; return t && (r.opacity = r.width = e), r } x.each({ slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) { x.fn[e] = function (e, n, r) { return this.animate(t, e, n, r) } }), x.speed = function (e, t, n) { var r = e && "object" == typeof e ? x.extend({}, e) : { complete: n || !n && t || x.isFunction(e) && e, duration: e, easing: n && t || t && !x.isFunction(t) && t }; return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () { x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue) }, r }, x.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 } }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function () { var e, n = x.timers, r = 0; for (Xn = x.now() ; n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1); n.length || x.fx.stop(), Xn = t }, x.fx.timer = function (e) { e() && x.timers.push(e) && x.fx.start() }, x.fx.interval = 13, x.fx.start = function () { Un || (Un = setInterval(x.fx.tick, x.fx.interval)) }, x.fx.stop = function () { clearInterval(Un), Un = null }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) { return x.grep(x.timers, function (t) { return e === t.elem }).length }), x.fn.offset = function (e) { if (arguments.length) return e === t ? this : this.each(function (t) { x.offset.setOffset(this, e, t) }); var n, r, o = { top: 0, left: 0 }, a = this[0], s = a && a.ownerDocument; if (s) return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), { top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : o }, x.offset = { setOffset: function (e, t, n) { var r = x.css(e, "position"); "static" === r && (e.style.position = "relative"); var i = x(e), o = i.offset(), a = x.css(e, "top"), s = x.css(e, "left"), l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [a, s]) > -1, u = {}, c = {}, p, f; l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u) } }, x.fn.extend({ position: function () { if (this[0]) { var e, t, n = { top: 0, left: 0 }, r = this[0]; return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), n.left += x.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - x.css(r, "marginTop", !0), left: t.left - n.left - x.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent || s; while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent; return e || s }) } }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) { var r = /Y/.test(n); x.fn[e] = function (i) { return x.access(this, function (e, i, o) { var a = or(e); return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, t) }, e, i, arguments.length, null) } }); function or(e) { return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1 } x.each({ Height: "height", Width: "width" }, function (e, n) { x.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) { x.fn[i] = function (i, o) { var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border"); return x.access(this, function (n, r, i) { var o; return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s) }, n, a ? i : t, a, null) } }) }), x.fn.size = function () { return this.length }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (__webpack_provided_window_dot_jQuery = e.$ = x, "function" == "function" && __webpack_require__(23) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return x }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)))
	})(window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(2), __webpack_require__(22)(module)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.1
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-02-22T19:11Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim( elem.value );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true

					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the 1.x branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);

			jQuery.event.trigger( e, null, elem );

			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || ( support.createHTMLDocument ?
			document.implementation.createHTMLDocument( "" ) :
			document );

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*! wangeditor.js 2016-10-26 */
	!function(a){"function"==typeof window.define?window.define.amd?window.define("wangEditor",["jquery"],a):window.define.cmd?window.define(function(b,c,d){return a}):a(__webpack_provided_window_dot_jQuery):"object"==typeof module&&"object"==typeof module.exports?(window.wangEditorCssPath?__webpack_require__(20)(window.wangEditorCssPath):__webpack_require__(26),module.exports=a(window.wangEditorJQueryPath?__webpack_require__(20)(window.wangEditorJQueryPath):__webpack_require__(2))):a(__webpack_provided_window_dot_jQuery)}(function(a){if(!a||!a.fn||!a.fn.jquery)return void alert("在引用wangEditor.js之前，先引用jQuery，否则无法使用 wangEditor");var b=function(b){var c=window.wangEditor;c&&b(c,a)};return function(a,b){if(a.wangEditor)return void alert("一个页面不能重复引用 wangEditor.js 或 wangEditor.min.js ！！！");var c=function(a){"string"==typeof a&&(a="#"+a);var c=b(a);if(1===c.length){var d=c[0].nodeName;"TEXTAREA"!==d&&"DIV"!==d||(this.valueNodeName=d.toLowerCase(),this.$valueContainer=c,this.$prev=c.prev(),this.$parent=c.parent(),this.init())}};c.fn=c.prototype,c.$body=b("body"),c.$document=b(document),c.$window=b(a),c.userAgent=navigator.userAgent,c.getComputedStyle=a.getComputedStyle,c.w3cRange="function"==typeof document.createRange,c.hostname=location.hostname.toLowerCase(),c.websiteHost="wangeditor.github.io|www.wangeditor.com|wangeditor.coding.me",c.isOnWebsite=c.websiteHost.indexOf(c.hostname)>=0,c.docsite="http://www.kancloud.cn/wangfupeng/wangeditor2/113961",a.wangEditor=c,c.plugin=function(a){c._plugins||(c._plugins=[]),"function"==typeof a&&c._plugins.push(a)}}(window,a),b(function(a,b){a.fn.init=function(){this.initDefaultConfig(),this.addEditorContainer(),this.addTxt(),this.addMenuContainer(),this.menus={},this.commandHooks()}}),b(function(a,b){a.fn.ready=function(a){this.readyFns||(this.readyFns=[]),this.readyFns.push(a)},a.fn.readyHeadler=function(){for(var a=this.readyFns;a.length;)a.shift().call(this)},a.fn.updateValue=function(){var a=this,b=a.$valueContainer,c=a.txt.$txt;if(b!==c){var d=c.html();b.val(d)}},a.fn.getInitValue=function(){var a=this,b=a.$valueContainer,c="",d=a.valueNodeName;return"div"===d?c=b.html():"textarea"===d&&(c=b.val()),c},a.fn.updateMenuStyle=function(){var a=this.menus;b.each(a,function(a,b){b.updateSelected()})},a.fn.enableMenusExcept=function(a){this._disabled||(a=a||[],"string"==typeof a&&(a=[a]),b.each(this.menus,function(b,c){a.indexOf(b)>=0||c.disabled(!1)}))},a.fn.disableMenusExcept=function(a){this._disabled||(a=a||[],"string"==typeof a&&(a=[a]),b.each(this.menus,function(b,c){a.indexOf(b)>=0||c.disabled(!0)}))},a.fn.hideDropPanelAndModal=function(){var a=this.menus;b.each(a,function(a,b){var c=b.dropPanel||b.dropList||b.modal;c&&c.hide&&c.hide()})}}),b(function(a,b){function c(){}var d=!a.w3cRange;a.fn.currentRange=function(a){return a?void(this._rangeData=a):this._rangeData},a.fn.collapseRange=function(a,b){b=b||"end",b="start"===b,a=a||this.currentRange(),a&&(a.collapse(b),this.currentRange(a))},a.fn.getRangeText=d?c:function(a){if(a=a||this.currentRange())return a.toString()},a.fn.getRangeElem=d?c:function(a){a=a||this.currentRange();var b=a.commonAncestorContainer;return 1===b.nodeType?b:b.parentNode},a.fn.isRangeEmpty=d?c:function(a){return a=a||this.currentRange(),!(!a||!a.startContainer||a.startContainer!==a.endContainer||a.startOffset!==a.endOffset)},a.fn.saveSelection=d?c:function(a){var c,d,e=this,f=e.txt.$txt.get(0);a?c=a.commonAncestorContainer:(d=document.getSelection(),d.getRangeAt&&d.rangeCount&&(a=document.getSelection().getRangeAt(0),c=a.commonAncestorContainer)),c&&(b.contains(f,c)||f===c)&&e.currentRange(a)},a.fn.restoreSelection=d?c:function(b){var c;if(b=b||this.currentRange())try{c=document.getSelection(),c.removeAllRanges(),c.addRange(b)}catch(d){a.error("执行 editor.restoreSelection 时，IE可能会有异常，不影响使用")}},a.fn.restoreSelectionByElem=d?c:function(a,b){a&&(b=b||"end",this.setRangeByElem(a),"start"===b&&this.collapseRange(this.currentRange(),"start"),"end"===b&&this.collapseRange(this.currentRange(),"end"),this.restoreSelection())},a.fn.initSelection=d?c:function(){var a=this;if(!a.currentRange()){var b=a.txt.$txt,c=b.children().first();c.length&&a.restoreSelectionByElem(c.get(0))}},a.fn.setRangeByElem=d?c:function(a){var c=this,d=c.txt.$txt.get(0);if(a&&b.contains(d,a)){for(var e=a.firstChild;e&&3!==e.nodeType;)e=e.firstChild;for(var f=a.lastChild;f&&3!==f.nodeType;)f=f.lastChild;var g=document.createRange();e&&f?(g.setStart(e,0),g.setEnd(f,f.textContent.length)):(g.setStart(a,0),g.setEnd(a,0)),c.saveSelection(g)}}}),b(function(a,b){a.w3cRange||(a.fn.getRangeText=function(a){if(a=a||this.currentRange())return a.text},a.fn.getRangeElem=function(a){if(a=a||this.currentRange()){var b=a.parentElement();return 1===b.nodeType?b:b.parentNode}},a.fn.isRangeEmpty=function(a){return a=a||this.currentRange(),!a||!a.text},a.fn.saveSelection=function(a){var c,d=this,e=d.txt.$txt.get(0);a?c=a.parentElement():(a=document.selection.createRange(),c="undefined"==typeof a.parentElement?null:a.parentElement()),c&&(b.contains(e,c)||e===c)&&d.currentRange(a)},a.fn.restoreSelection=function(a){var b,c=this;if(a=a||c.currentRange()){b=document.selection.createRange();try{b.setEndPoint("EndToEnd",a)}catch(d){}if(0===a.text.length)try{b.collapse(!1)}catch(d){}else b.setEndPoint("StartToStart",a);b.select()}})}),b(function(a,b){a.fn.commandHooks=function(){var a=this,c={};c.insertHtml=function(c){var d,e=b(c),f=a.getRangeElem();d=a.getLegalTags(f),d&&b(d).after(e)},a.commandHooks=c}}),b(function(a,b){a.fn.command=function(a,b,c,d){function e(){b&&(g.queryCommandSupported(b)?document.execCommand(b,!1,c):(f=g.commandHooks,b in f&&f[b](c)))}var f,g=this;this.customCommand(a,e,d)},a.fn.commandForElem=function(a,b,c,d,e){var f,g;"string"==typeof a?f=a:(f=a.selector,g=a.check);var h=this.getRangeElem();h=this.getSelfOrParentByName(h,f,g),h&&this.setRangeByElem(h),this.command(b,c,d,e)},a.fn.customCommand=function(a,b,c){function d(){e.hideDropPanelAndModal()}var e=this,f=e.currentRange();return f?(e.undoRecord(),this.restoreSelection(f),b.call(e),this.saveSelection(),this.restoreSelection(),c&&"function"==typeof c&&c.call(e),e.txt.insertEmptyP(),e.txt.wrapImgAndText(),e.updateValue(),e.updateMenuStyle(),setTimeout(d,200),void(a&&a.preventDefault())):void(a&&a.preventDefault())},a.fn.queryCommandValue=function(a){var b="";try{b=document.queryCommandValue(a)}catch(c){}return b},a.fn.queryCommandState=function(a){var b=!1;try{b=document.queryCommandState(a)}catch(c){}return b},a.fn.queryCommandSupported=function(a){var b=!1;try{b=document.queryCommandSupported(a)}catch(c){}return b}}),b(function(a,b){function c(a){var c=this,d=b(a),e=!1;return d.each(function(){if(this===c)return e=!0,!1}),e}var d;a.fn.getLegalTags=function(b){var c=this.config.legalTags;return c?this.getSelfOrParentByName(b,c):void a.error("配置项中缺少 legalTags 的配置")},a.fn.getSelfOrParentByName=function(a,e,f){if(a&&e){d||(d=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector),d||(d=c);for(var g=this.txt.$txt.get(0);a&&g!==a&&b.contains(g,a);){if(d.call(a,e)){if(!f)return a;if(f(a))return a}a=a.parentNode}}}}),b(function(a,b){function c(a){return null==a._redoList&&(a._redoList=[]),a._redoList}function d(a){return null==a._undoList&&(a._undoList=[]),a._undoList}function e(a,b,c){var d=b.val,e=a.txt.$txt.html();if(null!=d){if(d===e)return"redo"===c?void a.redo():"undo"===c?void a.undo():void 0;a.txt.$txt.html(d),a.updateValue(),a.onchange&&"function"==typeof a.onchange&&a.onchange.call(a)}}var f=20;a.fn.undoRecord=function(){var a=this,b=a.txt.$txt,e=b.html(),g=d(a),h=c(a),i=g.length?g[0]:"";e!==i.val&&(h.length&&(h=[]),g.unshift({range:a.currentRange(),val:e}),g.length>f&&g.pop())},a.fn.undo=function(){var a=this,b=d(a),f=c(a);if(b.length){var g=b.shift();f.unshift(g),e(this,g,"undo")}},a.fn.redo=function(){var a=this,b=d(a),f=c(a);if(f.length){var g=f.shift();b.unshift(g),e(this,g,"redo")}}}),b(function(a,b){a.fn.create=function(){var c=this;a.$body&&0!==a.$body.length||(a.$body=b("body"),a.$document=b(document),a.$window=b(window)),c.addMenus(),c.renderMenus(),c.renderMenuContainer(),c.renderTxt(),c.renderEditorContainer(),c.eventMenus(),c.eventMenuContainer(),c.eventTxt(),c.readyHeadler(),c.initSelection(),c.$txt=c.txt.$txt;var d=a._plugins;d&&d.length&&b.each(d,function(a,b){b.call(c)})},a.fn.disable=function(){this.txt.$txt.removeAttr("contenteditable"),this.disableMenusExcept(),this._disabled=!0},a.fn.enable=function(){this._disabled=!1,this.txt.$txt.attr("contenteditable","true"),this.enableMenusExcept()},a.fn.destroy=function(){var a=this,b=a.$valueContainer,c=a.$editorContainer,d=a.valueNodeName;"div"===d?(b.removeAttr("contenteditable"),c.after(b),c.hide()):(b.show(),c.hide())},a.fn.undestroy=function(){var a=this,b=a.$valueContainer,c=a.$editorContainer,d=a.menuContainer.$menuContainer,e=a.valueNodeName;"div"===e?(b.attr("contenteditable","true"),d.after(b),c.show()):(b.hide(),c.show())},a.fn.clear=function(){var a=this,b=a.txt.$txt;b.html("<p><br></p>"),a.restoreSelectionByElem(b.find("p").get(0))}}),b(function(a,b){var c=function(a){this.editor=a,this.init()};c.fn=c.prototype,a.MenuContainer=c}),b(function(a,b){var c=a.MenuContainer;c.fn.init=function(){var a=this,c=b('<div class="wangEditor-menu-container clearfix"></div>');a.$menuContainer=c,a.changeShadow()},c.fn.changeShadow=function(){var a=this.$menuContainer,b=this.editor,c=b.txt.$txt;c.on("scroll",function(){c.scrollTop()>10?a.addClass("wangEditor-menu-shadow"):a.removeClass("wangEditor-menu-shadow")})}}),b(function(a,b){var c=a.MenuContainer;c.fn.render=function(){var a=this.$menuContainer,b=this.editor.$editorContainer;b.append(a)},c.fn.height=function(){var a=this.$menuContainer;return a.height()},c.fn.appendMenu=function(a,b){return this._addGroup(a),this._addOneMenu(b)},c.fn._addGroup=function(a){var c,d=this.$menuContainer;this.$currentGroup&&this.currentGroupIdx===a||(c=b('<div class="menu-group clearfix"></div>'),d.append(c),this.$currentGroup=c,this.currentGroupIdx=a)},c.fn._addOneMenu=function(a){var c=a.$domNormal,d=a.$domSelected,e=this.$currentGroup,f=b('<div class="menu-item clearfix"></div>');return d.hide(),f.append(c).append(d),e.append(f),f}}),b(function(a,b){var c=function(a){this.editor=a.editor,this.id=a.id,this.title=a.title,this.$domNormal=a.$domNormal,this.$domSelected=a.$domSelected||a.$domNormal,this.commandName=a.commandName,this.commandValue=a.commandValue,this.commandNameSelected=a.commandNameSelected||a.commandName,this.commandValueSelected=a.commandValueSelected||a.commandValue};c.fn=c.prototype,a.Menu=c}),b(function(a,b){var c=a.Menu;c.fn.initUI=function(){var c=this.editor,d=c.UI.menus,e=this.id,f=d[e];this.$domNormal&&this.$domSelected||(null==f&&(a.warn('editor.UI配置中，没有菜单 "'+e+'" 的UI配置，只能取默认值'),f=d.default),this.$domNormal=b(f.normal),/^\./.test(f.selected)?this.$domSelected=this.$domNormal.clone().addClass(f.selected.slice(1)):this.$domSelected=b(f.selected))}}),b(function(a,b){var c=a.Menu;c.fn.render=function(a){this.initUI();var b=this.editor,c=b.menuContainer,d=c.appendMenu(a,this),e=this.onRender;this._renderTip(d),e&&"function"==typeof e&&e.call(this)},c.fn._renderTip=function(c){function d(){j.show()}function e(){j.hide()}var f,g=this,h=g.editor,i=g.title,j=b('<div class="menu-tip"></div>');g.tipWidth||(f=b('<p style="opacity:0; filter:Alpha(opacity=0); position:absolute;top:-10000px;">'+i+"</p>"),a.$body.append(f),h.ready(function(){var a=f.outerWidth()+5,b=j.outerWidth(),c=parseFloat(j.css("margin-left"),10);f.remove(),f=null,j.css({width:a,"margin-left":c+(b-a)/2}),g.tipWidth=a})),j.append(i),c.append(j);var k;c.find("a").on("mouseenter",function(a){g.active()||g.disabled()||(k=setTimeout(d,200))}).on("mouseleave",function(a){k&&clearTimeout(k),e()}).on("click",e)},c.fn.bindEvent=function(){var b=this,c=b.$domNormal,d=b.$domSelected,e=b.clickEvent;e||(e=function(c){var d=b.dropPanel||b.dropList||b.modal;if(d&&d.show)return void(d.isShowing?d.hide():d.show());var e,f,g=b.editor,h=b.selected;h?(e=b.commandNameSelected,f=b.commandValueSelected):(e=b.commandName,f=b.commandValue),e?g.command(c,e,f):(a.warn('菜单 "'+b.id+'" 未定义click事件'),c.preventDefault())});var f=b.clickEventSelected||e;c.click(function(a){b.disabled()||(e.call(b,a),b.updateSelected()),a.preventDefault()}),d.click(function(a){b.disabled()||(f.call(b,a),b.updateSelected()),a.preventDefault()})},c.fn.updateSelected=function(){var a=this,b=(a.editor,a.updateSelectedEvent);b||(b=function(){var a=this,b=a.editor,c=a.commandName,d=a.commandValue;if(d){if(b.queryCommandValue(c).toLowerCase()===d.toLowerCase())return!0}else if(b.queryCommandState(c))return!0;return!1});var c=b.call(a);c=!!c,a.changeSelectedState(c)},c.fn.changeSelectedState=function(a){var b=this,c=b.selected;if(null!=a&&"boolean"==typeof a){if(c===a)return;b.selected=a,a?(b.$domNormal.hide(),b.$domSelected.show()):(b.$domNormal.show(),b.$domSelected.hide())}},c.fn.active=function(a){return null==a?this._activeState:void(this._activeState=a)},c.fn.activeStyle=function(a){var b=(this.selected,this.$domNormal),c=this.$domSelected;a?(b.addClass("active"),c.addClass("active")):(b.removeClass("active"),c.removeClass("active")),this.active(a)},c.fn.disabled=function(a){if(null==a)return!!this._disabled;if(this._disabled!==a){var b=this.$domNormal,c=this.$domSelected;a?(b.addClass("disable"),c.addClass("disable")):(b.removeClass("disable"),c.removeClass("disable")),this._disabled=a}}}),b(function(a,b){var c=function(a,b,c){this.editor=a,this.menu=b,this.data=c.data,this.tpl=c.tpl,this.selectorForELemCommand=c.selectorForELemCommand,this.beforeEvent=c.beforeEvent,this.afterEvent=c.afterEvent,this.init()};c.fn=c.prototype,a.DropList=c}),b(function(a,b){var c=a.DropList;c.fn.init=function(){var a=this;a.initDOM(),a.bindEvent(),a.initHideEvent()},c.fn.initDOM=function(){var a,c,d=this,e=d.data,f=d.tpl||"<span>{#title}</span>",g=b('<div class="wangEditor-drop-list clearfix"></div>');b.each(e,function(d,e){a=f.replace(/{#commandValue}/gi,d).replace(/{#title}/gi,e),c=b('<a href="#" commandValue="'+d+'"></a>'),c.append(a),g.append(c)}),d.$list=g},c.fn.bindEvent=function(){var a=this,c=a.editor,d=a.menu,e=d.commandName,f=a.selectorForELemCommand,g=a.$list,h=a.beforeEvent,i=a.afterEvent;g.on("click","a[commandValue]",function(a){h&&"function"==typeof h&&h.call(a);var g=b(a.currentTarget).attr("commandValue");d.selected&&c.isRangeEmpty()&&f?c.commandForElem(f,a,e,g):c.command(a,e,g),i&&"function"==typeof i&&i.call(a)})},c.fn.initHideEvent=function(){var c=this,d=c.$list.get(0);a.$body.on("click",function(a){if(c.isShowing){var e,f=a.target,g=c.menu;e=g.selected?g.$domSelected.get(0):g.$domNormal.get(0),e===f||b.contains(e,f)||d===f||b.contains(d,f)||c.hide()}}),a.$window.scroll(function(){c.hide()}),a.$window.on("resize",function(){c.hide()})}}),b(function(a,b){var c=a.DropList;c.fn._render=function(){var a=this,b=a.editor,c=a.$list;b.$editorContainer.append(c),a.rendered=!0},c.fn._position=function(){var a=this,b=a.$list,c=a.editor,d=a.menu,e=c.menuContainer.$menuContainer,f=d.selected?d.$domSelected:d.$domNormal,g=f.offsetParent().position(),h=g.top,i=g.left,j=f.offsetParent().height(),k=f.offsetParent().width(),l=b.outerWidth(),m=c.txt.$txt.outerWidth(),n=h+j,o=i+k/2,p=0-k/2,q=o+l-m;q>-10&&(p=p-q-10),b.css({top:n,left:o,"margin-left":p}),c._isMenufixed&&(n+=e.offset().top+e.outerHeight()-b.offset().top,b.css({top:n}))},c.fn.show=function(){var a=this,b=a.menu;if(a.rendered||a._render(),!a.isShowing){var c=a.$list;c.show(),a._position(),a.isShowing=!0,b.activeStyle(!0)}},c.fn.hide=function(){var a=this,b=a.menu;if(a.isShowing){var c=a.$list;c.hide(),a.isShowing=!1,b.activeStyle(!1)}}}),b(function(a,b){var c=function(a,b,c){this.editor=a,this.menu=b,this.$content=c.$content,this.width=c.width||200,this.height=c.height,this.onRender=c.onRender,this.init()};c.fn=c.prototype,a.DropPanel=c}),b(function(a,b){var c=a.DropPanel;c.fn.init=function(){var a=this;a.initDOM(),a.initHideEvent()},c.fn.initDOM=function(){var a=this,c=a.$content,d=a.width,e=a.height,f=b('<div class="wangEditor-drop-panel clearfix"></div>'),g=b('<div class="tip-triangle"></div>');f.css({width:d,height:e?e:"auto"}),f.append(g),f.append(c),a.$panel=f,a.$triangle=g},c.fn.initHideEvent=function(){var c=this,d=c.$panel.get(0);a.$body.on("click",function(a){if(c.isShowing){var e,f=a.target,g=c.menu;e=g.selected?g.$domSelected.get(0):g.$domNormal.get(0),e===f||b.contains(e,f)||d===f||b.contains(d,f)||c.hide()}}),a.$window.scroll(function(a){c.hide()}),a.$window.on("resize",function(){c.hide()})}}),b(function(a,b){var c=a.DropPanel;c.fn._render=function(){var a=this,b=a.onRender,c=a.editor,d=a.$panel;c.$editorContainer.append(d),b&&b.call(a),a.rendered=!0},c.fn._position=function(){var a=this,b=a.$panel,c=a.$triangle,d=a.editor,e=d.menuContainer.$menuContainer,f=a.menu,g=f.selected?f.$domSelected:f.$domNormal,h=g.offsetParent().position(),i=h.top,j=h.left,k=g.offsetParent().height(),l=g.offsetParent().width(),m=b.outerWidth(),n=d.txt.$txt.outerWidth(),o=i+k,p=j+l/2,q=0-m/2,r=q;0-q>p-10&&(q=0-(p-10));var s=p+m+q-n;s>-10&&(q=q-s-10),b.css({top:o,left:p,"margin-left":q}),d._isMenufixed&&(o+=e.offset().top+e.outerHeight()-b.offset().top,b.css({top:o})),c.css({"margin-left":r-q-5})},c.fn.focusFirstInput=function(){var a=this,c=a.$panel;c.find("input[type=text],textarea").each(function(){var a=b(this);if(null==a.attr("disabled"))return a.focus(),!1})},c.fn.show=function(){var b=this,c=b.menu;if(b.rendered||b._render(),!b.isShowing){var d=b.$panel;d.show(),b._position(),b.isShowing=!0,c.activeStyle(!0),a.w3cRange?b.focusFirstInput():a.placeholderForIE8(d)}},c.fn.hide=function(){var a=this,b=a.menu;if(a.isShowing){var c=a.$panel;c.hide(),a.isShowing=!1,b.activeStyle(!1)}}}),b(function(a,b){var c=function(a,b,c){this.editor=a,this.menu=b,this.$content=c.$content,this.init()};c.fn=c.prototype,a.Modal=c}),b(function(a,b){var c=a.Modal;c.fn.init=function(){var a=this;a.initDom(),a.initHideEvent()},c.fn.initDom=function(){var a=this,c=a.$content,d=b('<div class="wangEditor-modal"></div>'),e=b('<div class="wangEditor-modal-close"><i class="wangeditor-menu-img-cancel-circle"></i></div>');d.append(e),d.append(c),a.$modal=d,a.$close=e},c.fn.initHideEvent=function(){var c=this,d=c.$close,e=c.$modal.get(0);d.click(function(){c.hide()}),a.$body.on("click",function(a){if(c.isShowing){var d,f=a.target,g=c.menu;g&&(d=g.selected?g.$domSelected.get(0):g.$domNormal.get(0),d===f||b.contains(d,f))||e===f||b.contains(e,f)||c.hide()}})}}),b(function(a,b){var c=a.Modal;c.fn._render=function(){var b=this,c=b.editor,d=b.$modal;d.css("z-index",c.config.zindex+10+""),a.$body.append(d),b.rendered=!0},c.fn._position=function(){var b=this,c=b.$modal,d=c.offset().top,e=c.outerWidth(),f=c.outerHeight(),g=0-e/2,h=0-f/2,i=a.$window.scrollTop();f/2>d&&(h=0-d),c.css({"margin-left":g+"px","margin-top":h+i+"px"})},c.fn.show=function(){var a=this,b=a.menu;if(a.rendered||a._render(),!a.isShowing){a.isShowing=!0;var c=a.$modal;c.show(),a._position(),b&&b.activeStyle(!0)}},c.fn.hide=function(){var a=this,b=a.menu;if(a.isShowing){a.isShowing=!1;var c=a.$modal;c.hide(),b&&b.activeStyle(!1)}}}),b(function(a,b){var c=function(a){this.editor=a,this.init()};c.fn=c.prototype,a.Txt=c}),b(function(a,b){var c=a.Txt;c.fn.init=function(){var a,c=this,d=c.editor,e=d.$valueContainer,f=d.getInitValue();"DIV"===e.get(0).nodeName?(a=e,a.addClass("wangEditor-txt"),a.attr("contentEditable","true")):a=b('<div class="wangEditor-txt" contentEditable="true">'+f+"</div>"),d.ready(function(){c.insertEmptyP()}),c.$txt=a,c.contentEmptyHandle(),c.bindEnterForDiv(),c.bindEnterForText(),c.bindTabEvent(),c.bindPasteFilter(),c.bindFormatText(),c.bindHtml()},c.fn.contentEmptyHandle=function(){var a,c=this,d=c.editor,e=c.$txt;e.on("keydown",function(a){if(8===a.keyCode){var c=b.trim(e.html().toLowerCase());return"<p><br></p>"===c?void a.preventDefault():void 0}}),e.on("keyup",function(c){if(8===c.keyCode){var f=b.trim(e.html().toLowerCase());f&&"<br>"!==f||(a=b("<p><br/></p>"),e.html(""),e.append(a),d.restoreSelectionByElem(a.get(0)))}})},c.fn.bindEnterForDiv=function(){function c(){if(d){var a=b("<p>"+d.html()+"</p>");d.after(a),d.remove()}}var d,e=(a.config.legalTags,this),f=e.editor,g=e.$txt;g.on("keydown keyup",function(a){if(13===a.keyCode){var e,g,h=f.getRangeElem(),i=f.getLegalTags(h);if(!i){if(i=f.getSelfOrParentByName(h,"div"),!i)return;e=b(i),"keydown"===a.type&&(d=e,setTimeout(c,0)),"keyup"===a.type&&(g=b("<p>"+e.html()+"</p>"),e.after(g),e.remove(),f.restoreSelectionByElem(g.get(0),"start"))}}})},c.fn.bindEnterForText=function(){var a,b=this,c=b.$txt;c.on("keyup",function(c){13===c.keyCode&&(a||(a=function(){b.wrapImgAndText()}),setTimeout(a))})},c.fn.bindTabEvent=function(){var a=this,b=a.editor,c=a.$txt;c.on("keydown",function(a){9===a.keyCode&&b.queryCommandSupported("insertHtml")&&b.command(a,"insertHtml","&nbsp;&nbsp;&nbsp;&nbsp;")})},c.fn.bindPasteFilter=function(){function a(e){if(e&&e.nodeType&&e.nodeName){var f,h,i=e.nodeName.toLowerCase(),k=e.nodeType;if(3===k||1===k){if(f=b(e),"div"===i)return h=[],b.each(e.childNodes,function(a,b){h.push(b)}),void b.each(h,function(){a(this)});if(j.indexOf(i)>=0)g+=c(e);else if(3===k)g+="<p>"+e.textContent+"</p>";else if("br"===i)g+="<br/>";else{if(["meta","style","script","object","form","iframe","hr"].indexOf(i)>=0)return;f=b(d(e)),g+=b("<div>").append(f.clone()).html()}}}}function c(a){var c,e=a.nodeName.toLowerCase(),f="",g="";return["blockquote"].indexOf(e)>=0?(c=b(a),"<"+e+">"+c.text()+"</"+e+">"):["p","h1","h2","h3","h4","h5"].indexOf(e)>=0?(a=d(a),c=b(a),f=c.html(),f=f.replace(/<.*?>/gi,function(a){return"</a>"===a||0===a.indexOf("<a ")||0===a.indexOf("<img ")?a:""}),"<"+e+">"+f+"</"+e+">"):["ul","ol"].indexOf(e)>=0?(c=b(a),c.children().each(function(){var a=b(d(this)),c=a.html();c=c.replace(/<.*?>/gi,function(a){return"</a>"===a||0===a.indexOf("<a ")||0===a.indexOf("<img ")?a:""}),g+="<li>"+c+"</li>"}),"<"+e+">"+g+"</"+e+">"):(c=b(d(a)),b("<div>").append(c).html())}function d(a){var c=a.attributes||[],e=[],f=["href","target","src","alt","rowspan","colspan"];b.each(c,function(a,b){b&&2===b.nodeType&&e.push(b.nodeName)}),b.each(e,function(b,c){f.indexOf(c)<0&&a.removeAttribute(c)});var g=a.childNodes;return g.length&&b.each(g,function(a,b){d(b)}),a}var e=this,f=e.editor,g="",h=e.$txt,i=f.config.legalTags,j=i.split(",");h.on("paste",function(c){if(f.config.pasteFilter){var d=f.getRangeElem().nodeName;if("TD"!==d&&"TH"!==d){g="";var h,i,j=c.clipboardData||c.originalEvent.clipboardData,k=window.clipboardData;if(f.config.pasteText){if(j&&j.getData)h=j.getData("text/plain");else{if(!k||!k.getData)return;h=k.getData("text")}h&&(g="<p>"+h+"</p>")}else if(j&&j.getData)h=j.getData("text/html"),h?(i=b("<div>"+h+"</div>"),a(i.get(0))):(h=j.getData("text/plain"),h&&(h=h.replace(/[ ]/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"</p><p>"),g="<p>"+h+"</p>",g=g.replace(/<p>(https?:\/\/.*?)<\/p>/gi,function(a,b){return'<p><a href="'+b+'" target="_blank">'+b+"</p>"})));else{if(!k||!k.getData)return;if(g=k.getData("text"),!g)return;g="<p>"+g+"</p>",g=g.replace(new RegExp("\n","g"),"</p><p>")}g&&(f.command(c,"insertHtml",g),e.clearEmptyOrNestP())}}})},c.fn.bindFormatText=function(){var c=this,d=(c.editor,c.$txt),e=a.config.legalTags,f=e.split(","),g=(f.length,[]);b.each(f,function(a,b){var c=">\\s*<("+b+")>";g.push(new RegExp(c,"ig"))}),g.push(new RegExp(">\\s*<(li)>","ig")),g.push(new RegExp(">\\s*<(tr)>","ig")),g.push(new RegExp(">\\s*<(code)>","ig")),d.formatText=function(){var a=b("<div>"),c=d.html();return c=c.replace(/\s*</gi,"<"),b.each(g,function(a,b){b.test(c)&&(c=c.replace(b,function(a,b){return">\n<"+b+">"}))}),a.html(c),a.text()}},c.fn.bindHtml=function(){var a=this,c=a.editor,d=a.$txt,e=c.$valueContainer,f=c.valueNodeName;d.html=function(a){var c;return"div"===f&&(c=b.fn.html.call(d,a)),void 0===a?(c=b.fn.html.call(d),c=c.replace(/(href|src)\=\"(.*)\"/gim,function(a,b,c){return b+'="'+c.replace("&amp;","&")+'"'})):(c=b.fn.html.call(d,a),e.val(a)),void 0===a?c:void d.change()}}}),b(function(a,b){var c=a.Txt,d="propertychange change click keyup input paste";c.fn.render=function(){var a=this.$txt,b=this.editor.$editorContainer;b.append(a)},c.fn.initHeight=function(){var a=this.editor,b=this.$txt,c=a.$valueContainer.height(),d=a.menuContainer.height(),e=c-d;e=e<50?50:e,b.height(e),a.valueContainerHeight=c,this.initMaxHeight(e,d)},c.fn.initMaxHeight=function(c,d){var e=this.editor,f=e.menuContainer.$menuContainer,g=this.$txt,h=b("<div>");if(window.getComputedStyle&&"max-height"in window.getComputedStyle(g.get(0))){var i=parseInt(e.$valueContainer.css("max-height"));if(isNaN(i))return;if(e.menus.fullscreen)return void a.warn("max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用");e.useMaxHeight=!0,h.css({"max-height":i-d+"px","overflow-y":"auto"}),g.css({height:"auto","overflow-y":"visible","min-height":c+"px"}),h.on("scroll",function(){g.parent().scrollTop()>10?f.addClass("wangEditor-menu-shadow"):f.removeClass("wangEditor-menu-shadow")}),g.wrap(h)}},c.fn.saveSelectionEvent=function(){function a(){g.saveSelection()}function b(){Date.now()-h<100||(h=Date.now(),a())}function c(){e&&clearTimeout(e),e=setTimeout(a,300)}var e,f=this.$txt,g=this.editor,h=Date.now();f.on(d+" focus blur",function(a){b(),c()}),f.on("mousedown",function(){f.on("mouseleave.saveSelection",function(a){b(),c(),g.updateMenuStyle()})}).on("mouseup",function(){f.off("mouseleave.saveSelection")})},c.fn.updateValueEvent=function(){function a(){var a=e.html();c!==a&&(f.onchange&&"function"==typeof f.onchange&&f.onchange.call(f),f.updateValue(),c=a)}var b,c,e=this.$txt,f=this.editor;e.on(d,function(d){null==c&&(c=e.html()),b&&clearTimeout(b),b=setTimeout(a,100)})},c.fn.updateMenuStyleEvent=function(){var a=this.$txt,b=this.editor;a.on(d,function(a){b.updateMenuStyle()})},c.fn.insertEmptyP=function(){var a=this.$txt,c=a.children();return 0===c.length?void a.append(b("<p><br></p>")):void("<br>"!==b.trim(c.last().html()).toLowerCase()&&a.append(b("<p><br></p>")))},c.fn.wrapImgAndText=function(){var a,c,d=this.$txt,e=d.children("img"),f=d[0],g=f.childNodes,h=g.length;for(e.length&&e.each(function(){b(this).wrap("<p>")}),a=0;a<h;a++)c=g[a],3===c.nodeType&&c.textContent&&b.trim(c.textContent)&&b(c).wrap("<p>")},c.fn.clearEmptyOrNestP=function(){var a=this.$txt,c=a.find("p");c.each(function(){var a,c=b(this),d=c.children(),e=d.length,f=b.trim(c.html());return f?void(1===e&&(a=d.first(),a.get(0)&&"P"===a.get(0).nodeName&&c.html(a.html()))):void c.remove()})},c.fn.scrollTop=function(a){var b=this,c=b.editor,d=b.$txt;return c.useMaxHeight?d.parent().scrollTop(a):d.scrollTop(a)},c.fn.showHeightOnHover=function(){function a(a){i||(e.append(h),i=!0);var b=(g.position().top,g.outerHeight(),a.height()),c=a.position().top,d=parseInt(a.css("margin-top"),10),j=parseInt(a.css("padding-top"),10),k=parseInt(a.css("margin-bottom"),10),l=parseInt(a.css("padding-bottom"),10);c+f.height();h.css({height:b+j+d+l+k,top:c+f.height()})}function c(){i&&(h.remove(),i=!1)}var d=this.editor,e=d.$editorContainer,f=d.menuContainer,g=this.$txt,h=b('<i class="height-tip"><i>'),i=!1;g.on("mouseenter","ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre",function(c){a(b(c.currentTarget))}).on("mouseleave",function(){c()})}}),b(function(a,b){Array.prototype.indexOf||(Array.prototype.indexOf=function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1},Array.prototype.lastIndexOf=function(a){var b=this.length;for(b-=1;b>=0;b--)if(this[b]===a)return b;return-1}),Date.now||(Date.now=function(){return(new Date).valueOf()});var c=window.console,d=function(){};b.each(["info","log","warn","error"],function(b,e){null==c?a[e]=d:a[e]=function(b){a.config&&a.config.printLog&&c[e]("wangEditor提示: "+b)}}),a.random=function(){return Math.random().toString().slice(2)},a.placeholder="placeholder"in document.createElement("input"),a.placeholderForIE8=function(c){a.placeholder||c.find("input[placeholder]").each(function(){var a=b(this),c=a.attr("placeholder");""===a.val()&&(a.css("color","#666"),a.val(c),a.on("focus.placeholder click.placeholder",function(){a.val(""),a.css("color","#333"),a.off("focus.placeholder click.placeholder")}))})}}),b(function(a,b){a.langs={},a.langs["zh-cn"]={bold:"粗体",underline:"下划线",italic:"斜体",forecolor:"文字颜色",bgcolor:"背景色",strikethrough:"删除线",eraser:"清空格式",source:"源码",quote:"引用",fontfamily:"字体",fontsize:"字号",head:"标题",orderlist:"有序列表",unorderlist:"无序列表",alignleft:"左对齐",aligncenter:"居中",alignright:"右对齐",link:"链接",text:"文本",submit:"提交",cancel:"取消",unlink:"取消链接",table:"表格",emotion:"表情",img:"图片",video:"视频",width:"宽",height:"高",location:"位置",loading:"加载中",searchlocation:"搜索位置",dynamicMap:"动态地图",clearLocation:"清除位置",langDynamicOneLocation:"动态地图只能显示一个位置",insertcode:"插入代码",undo:"撤销",redo:"重复",fullscreen:"全屏",openLink:"打开链接"},a.langs.en={bold:"Bold",underline:"Underline",italic:"Italic",forecolor:"Color",bgcolor:"Backcolor",strikethrough:"Strikethrough",eraser:"Eraser",source:"Codeview",quote:"Quote",fontfamily:"Font family",fontsize:"Font size",head:"Head",orderlist:"Ordered list",unorderlist:"Unordered list",alignleft:"Align left",aligncenter:"Align center",alignright:"Align right",link:"Insert link",text:"Text",submit:"Submit",cancel:"Cancel",unlink:"Unlink",table:"Table",emotion:"Emotions",img:"Image",video:"Video",width:"width",height:"height",location:"Location",loading:"Loading",searchlocation:"search",dynamicMap:"Dynamic",clearLocation:"Clear",langDynamicOneLocation:"Only one location in dynamic map",insertcode:"Insert Code",undo:"Undo",redo:"Redo",fullscreen:"Full screnn",openLink:"open link"}}),b(function(a,b){a.config={},a.config.zindex=1e4,a.config.printLog=!0,a.config.menuFixed=0,a.config.jsFilter=!0,a.config.legalTags="p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre",a.config.lang=a.langs["zh-cn"],a.config.menus=["source","|","bold","underline","italic","strikethrough","eraser","forecolor","bgcolor","|","quote","fontfamily","fontsize","head","unorderlist","orderlist","alignleft","aligncenter","alignright","|","link","unlink","table","emotion","|","img","video","location","insertcode","|","undo","redo","fullscreen"],a.config.colors={"#880000":"暗红色","#800080":"紫色","#ff0000":"红色","#ff00ff":"鲜粉色","#000080":"深蓝色","#0000ff":"蓝色","#00ffff":"湖蓝色","#008080":"蓝绿色","#008000":"绿色","#808000":"橄榄色","#00ff00":"浅绿色","#ffcc00":"橙黄色","#808080":"灰色","#c0c0c0":"银色","#000000":"黑色","#ffffff":"白色"},a.config.familys=["宋体","黑体","楷体","微软雅黑","Arial","Verdana","Georgia","Times New Roman","Microsoft JhengHei","Trebuchet MS","Courier New","Impact","Comic Sans MS","Consolas"],a.config.fontsizes={1:"12px",2:"13px",3:"16px",4:"18px",5:"24px",6:"32px",7:"48px"},a.config.emotionsShow="icon",a.config.emotions={weibo:{title:"微博表情",data:[{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",value:"[草泥马]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif",value:"[神马]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif",value:"[浮云]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif",value:"[给力]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif",value:"[围观]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif",value:"[威武]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif",value:"[熊猫]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif",value:"[兔子]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif",value:"[奥特曼]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif",value:"[囧]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif",value:"[互粉]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif",value:"[礼物]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif",
	value:"[呵呵]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif",value:"[哈哈]"}]}},a.config.mapAk="TVhjYjq1ICT2qqL5LdS8mwas",a.config.uploadImgUrl="",a.config.uploadTimeout=2e4,a.config.uploadImgFns={},a.config.customUpload=!1,a.config.uploadParams={},a.config.uploadHeaders={},a.config.hideLinkImg=!1,a.config.pasteFilter=!0,a.config.pasteText=!1,a.config.codeDefaultLang="javascript"}),b(function(a,b){a.UI={},a.UI.menus={default:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',selected:".selected"},bold:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',selected:".selected"},underline:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',selected:".selected"},italic:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',selected:".selected"},forecolor:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-pencil"></i></a>',selected:".selected"},bgcolor:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-brush"></i></a>',selected:".selected"},strikethrough:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-strikethrough"></i></a>',selected:".selected"},eraser:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-eraser"></i></a>',selected:".selected"},quote:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',selected:".selected"},source:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>',selected:".selected"},fontfamily:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-font2"></i></a>',selected:".selected"},fontsize:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>',selected:".selected"},head:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',selected:".selected"},orderlist:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-numbered"></i></a>',selected:".selected"},unorderlist:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',selected:".selected"},alignleft:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-left"></i></a>',selected:".selected"},aligncenter:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-center"></i></a>',selected:".selected"},alignright:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-right"></i></a>',selected:".selected"},link:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-link"></i></a>',selected:".selected"},unlink:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-unlink"></i></a>',selected:".selected"},table:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-table"></i></a>',selected:".selected"},emotion:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',selected:".selected"},img:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>',selected:".selected"},video:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>',selected:".selected"},location:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-location"></i></a>',selected:".selected"},insertcode:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-terminal"></i></a>',selected:".selected"},undo:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-ccw"></i></a>',selected:".selected"},redo:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-cw"></i></a>',selected:".selected"},fullscreen:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>',selected:'<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-shrink2"></i></a>'}}}),b(function(a,b){a.fn.initDefaultConfig=function(){var c=this;c.config=b.extend({},a.config),c.UI=b.extend({},a.UI)}}),b(function(a,b){a.fn.addEditorContainer=function(){this.$editorContainer=b('<div class="wangEditor-container"></div>')}}),b(function(a,b){a.fn.addTxt=function(){var b=this,c=new a.Txt(b);b.txt=c}}),b(function(a,b){a.fn.addMenuContainer=function(){var b=this;b.menuContainer=new a.MenuContainer(b)}}),b(function(a,b){a.createMenuFns=[],a.createMenu=function(b){a.createMenuFns.push(b)},a.fn.addMenus=function(){function c(a){return e.indexOf(a)>=0}var d=this,e=d.config.menus;b.each(a.createMenuFns,function(a,b){b.call(d,c)})}}),b(function(a,b){a.createMenu(function(b){var c="bold";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.bold,commandName:"Bold"});f.clickEventSelected=function(a){var b=d.isRangeEmpty();b?d.commandForElem("b,strong,h1,h2,h3,h4,h5",a,"Bold"):d.command(a,"Bold")},d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(b){var c="underline";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.underline,commandName:"Underline"});f.clickEventSelected=function(a){var b=d.isRangeEmpty();b?d.commandForElem("u,a",a,"Underline"):d.command(a,"Underline")},d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(b){var c="italic";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.italic,commandName:"Italic"});f.clickEventSelected=function(a){var b=d.isRangeEmpty();b?d.commandForElem("i",a,"Italic"):d.command(a,"Italic")},d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(c){var d="forecolor";if(c(d)){var e=this,f=e.config.lang,g=e.config.colors,h=new a.Menu({editor:e,id:d,title:f.forecolor}),i=b("<div></div>");b.each(g,function(a,b){i.append(['<a href="#" class="color-item"','    title="'+b+'" commandValue="'+a+'" ','    style="color: '+a+'" ','><i class="wangeditor-menu-img-pencil"></i></a>'].join(""))}),i.on("click","a[commandValue]",function(a){var c=b(this),d=c.attr("commandValue");h.selected&&e.isRangeEmpty()?e.commandForElem("font[color]",a,"forecolor",d):e.command(a,"forecolor",d)}),h.dropPanel=new a.DropPanel(e,h,{$content:i,width:125}),h.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"font[color]"),!!a},e.menus[d]=h}})}),b(function(a,b){a.createMenu(function(c){function d(a){var b;return!!(a&&a.style&&null!=a.style.cssText&&(b=a.style.cssText,b&&b.indexOf("background-color:")>=0))}var e="bgcolor";if(c(e)){var f=this,g=f.config.lang,h=f.config.colors,i=new a.Menu({editor:f,id:e,title:g.bgcolor}),j=b("<div></div>");b.each(h,function(a,b){j.append(['<a href="#" class="color-item"','    title="'+b+'" commandValue="'+a+'" ','    style="color: '+a+'" ','><i class="wangeditor-menu-img-brush"></i></a>'].join(""))}),j.on("click","a[commandValue]",function(a){var c=b(this),e=c.attr("commandValue");i.selected&&f.isRangeEmpty()?f.commandForElem({selector:"span,font",check:d},a,"BackColor",e):f.command(a,"BackColor",e)}),i.dropPanel=new a.DropPanel(f,i,{$content:j,width:125}),i.updateSelectedEvent=function(){var a=f.getRangeElem();return a=f.getSelfOrParentByName(a,"span,font",d),!!a},f.menus[e]=i}})}),b(function(a,b){a.createMenu(function(b){var c="strikethrough";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.strikethrough,commandName:"StrikeThrough"});f.clickEventSelected=function(a){var b=d.isRangeEmpty();b?d.commandForElem("strike",a,"StrikeThrough"):d.command(a,"StrikeThrough")},d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(c){var d="eraser";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.eraser,commandName:"RemoveFormat"});g.clickEvent=function(a){function c(){var a,c,d,e,f,h,i,j=this;a=j.getRangeElem(),e=j.getSelfOrParentByName(a,"blockquote"),e&&(f=b(e),g=b("<p>"+f.text()+"</p>"),f.after(g).remove()),c=j.getSelfOrParentByName(a,"p,h1,h2,h3,h4,h5"),c&&(d=b(c),g=b("<p>"+d.text()+"</p>"),d.after(g).remove()),h=j.getSelfOrParentByName(a,"ul,ol"),h&&(i=b(h),g=b("<p>"+i.text()+"</p>"),i.after(g).remove())}function d(){var a=this;g&&a.restoreSelectionByElem(g.get(0))}var f=e.isRangeEmpty();if(!f)return void e.command(a,"RemoveFormat");var g;e.customCommand(a,c,d)},e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){function d(){var a=i.$codeTextarea,c=g.txt.$txt,d=b.trim(a.val());d||(d="<p><br></p>"),g.config.jsFilter&&(d=d.replace(/<script[\s\S]*?<\/script>/gi,""));try{c.html(d)}catch(e){}}var e="source";if(c(e)){var f,g=this,h=g.config.lang,i=new a.Menu({editor:g,id:e,title:h.source});i.isShowCode=!1,i.clickEvent=function(a){var c=this,e=c.editor,g=e.txt.$txt,h=g.outerHeight(),j=g.height();c.$codeTextarea||(c.$codeTextarea=b('<textarea class="code-textarea"></textarea>'));var k=c.$codeTextarea;k.css({height:j,"margin-top":h-j}),k.val(g.html()),k.on("change",function(a){d()}),g.after(k).hide(),k.show(),i.isShowCode=!0,this.updateSelected(),e.disableMenusExcept("source"),f=g.html()},i.clickEventSelected=function(a){var b=this,c=b.editor,e=c.txt.$txt,g=b.$codeTextarea;g&&(d(),g.after(e).hide(),e.show(),i.isShowCode=!1,this.updateSelected(),c.enableMenusExcept("source"),e.html()!==f&&c.onchange&&"function"==typeof c.onchange&&c.onchange.call(c))},i.updateSelectedEvent=function(){return this.isShowCode},g.menus[e]=i}})}),b(function(a,b){a.createMenu(function(c){var d="quote";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.quote,commandName:"formatBlock",commandValue:"blockquote"});g.clickEvent=function(a){function c(){h=b("<p>"+f.text()+"</p>"),f.after(h).remove(),h.wrap("<blockquote>")}function d(){var a=this;h&&a.restoreSelectionByElem(h.get(0))}var f,g=e.getRangeElem();if(!g)return void a.preventDefault();var h,i=e.getSelfOrParentByName(g,"blockquote");return i?void a.preventDefault():(g=e.getLegalTags(g),f=b(g),f.text()?g?void e.customCommand(a,c,d):void e.command(a,"formatBlock","blockquote"):void 0)},g.clickEventSelected=function(a){function c(){var a,c;if(a=b(g),c=a.children(),c.length)return c.each(function(c){var d=b(this);"P"===d.get(0).nodeName?a.after(d):a.after("<p>"+d.text()+"</p>"),h=d}),void a.remove()}function d(){var a=this;h&&a.restoreSelectionByElem(h.get(0))}var f,g,h;return f=e.getRangeElem(),(g=e.getSelfOrParentByName(f,"blockquote"))?void e.customCommand(a,c,d):void a.preventDefault()},g.updateSelectedEvent=function(){var a,b=this,c=b.editor;return a=c.getRangeElem(),a=c.getSelfOrParentByName(a,"blockquote"),!!a},e.menus[d]=g,e.ready(function(){var a=this,c=a.txt.$txt,d=!1;c.on("keydown",function(c){if(13!==c.keyCode)return void(d=!1);var e=a.getRangeElem();if(e=a.getSelfOrParentByName(e,"blockquote"),!e)return void(d=!1);if(!d)return void(d=!0);var f=a.getRangeElem(),g=b(f);g.length&&g.parent().after(g),a.restoreSelectionByElem(f,"start"),d=!1,c.preventDefault()})}),e.ready(function(){function a(){d&&d.remove()}function c(){if(d){var a=d.prev();a.length?e.restoreSelectionByElem(a.get(0)):e.initSelection()}}var d,e=this,f=e.txt.$txt;f.on("keydown",function(f){if(8===f.keyCode){var g=e.getRangeElem();if(g=e.getSelfOrParentByName(g,"blockquote")){d=b(g);var h=d.text();h||e.customCommand(f,a,c)}}})})}})}),b(function(a,b){a.createMenu(function(c){var d="fontfamily";if(c(d)){var e=this,f=e.config.lang,g=e.config.familys,h=new a.Menu({editor:e,id:d,title:f.fontfamily,commandName:"fontName"}),i={};b.each(g,function(a,b){i[b]=b});var j='<span style="font-family:{#commandValue};">{#title}</span>';h.dropList=new a.DropList(e,h,{data:i,tpl:j,selectorForELemCommand:"font[face]"}),h.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"font[face]"),!!a},e.menus[d]=h}})}),b(function(a,b){a.createMenu(function(b){var c="fontsize";if(b(c)){var d=this,e=d.config.lang,f=d.config.fontsizes,g=new a.Menu({editor:d,id:c,title:e.fontsize,commandName:"fontSize"}),h=f,i='<span style="font-size:{#title};">{#title}</span>';g.dropList=new a.DropList(d,g,{data:h,tpl:i,selectorForELemCommand:"font[size]"}),g.updateSelectedEvent=function(){var a=d.getRangeElem();return a=d.getSelfOrParentByName(a,"font[size]"),!!a},d.menus[c]=g}})}),b(function(a,b){a.createMenu(function(b){function c(a){g.queryCommandState("InsertOrderedList")?(f=!0,g.command(a,"InsertOrderedList")):f=!1}function d(a){f&&g.command(a,"InsertOrderedList")}var e="head";if(b(e)){var f,g=this,h=g.config.lang,i=new a.Menu({editor:g,id:e,title:h.head,commandName:"formatBlock"}),j={"<h1>":"标题1","<h2>":"标题2","<h3>":"标题3","<h4>":"标题4","<h5>":"标题5"},k="{#commandValue}{#title}";i.dropList=new a.DropList(g,i,{data:j,tpl:k,beforeEvent:c,afterEvent:d}),i.updateSelectedEvent=function(){var a=g.getRangeElem();return a=g.getSelfOrParentByName(a,"h1,h2,h3,h4,h5"),!!a},g.menus[e]=i}})}),b(function(a,b){a.createMenu(function(b){var c="unorderlist";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.unorderlist,commandName:"InsertUnorderedList"});d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(b){var c="orderlist";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.orderlist,commandName:"InsertOrderedList"});d.menus[c]=f}})}),b(function(a,b){a.createMenu(function(c){var d="alignleft";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.alignleft,commandName:"JustifyLeft"});g.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"p,h1,h2,h3,h4,h5,li",function(a){var c;return!!(a&&a.style&&null!=a.style.cssText&&(c=a.style.cssText,c&&/text-align:\s*left;/.test(c)))||"left"===b(a).attr("align")}),!!a},e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){var d="aligncenter";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.aligncenter,commandName:"JustifyCenter"});g.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"p,h1,h2,h3,h4,h5,li",function(a){var c;return!!(a&&a.style&&null!=a.style.cssText&&(c=a.style.cssText,c&&/text-align:\s*center;/.test(c)))||"center"===b(a).attr("align")}),!!a},e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){var d="alignright";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.alignright,commandName:"JustifyRight"});g.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"p,h1,h2,h3,h4,h5,li",function(a){var c;return!!(a&&a.style&&null!=a.style.cssText&&(c=a.style.cssText,c&&/text-align:\s*right;/.test(c)))||"right"===b(a).attr("align")}),!!a},e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){var d="link";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.link}),h=b("<div></div>"),i=b('<div style="margin:20px 10px;" class="clearfix"></div>'),j=i.clone(),k=i.clone().css("margin","0 10px"),l=b('<input type="text" class="block" placeholder="'+f.text+'"/>'),m=b('<input type="text" class="block" placeholder="'+f.link+'"/>'),n=b('<button class="right">'+f.submit+"</button>"),o=b('<button class="right gray">'+f.cancel+"</button>");i.append(l),j.append(m),k.append(n).append(o),h.append(i).append(j).append(k),g.dropPanel=new a.DropPanel(e,g,{$content:h,width:300}),g.clickEvent=function(a){var b=this,c=b.dropPanel;if(c.isShowing)return void c.hide();l.val(""),m.val("http://");var d="",f=e.getRangeElem();f=e.getSelfOrParentByName(f,"a"),f&&(d=f.href||"");var g="",h=e.isRangeEmpty();h?f&&(g=f.textContent||f.innerHTML):g=e.getRangeText()||"",d&&m.val(d),g&&l.val(g),h?l.removeAttr("disabled"):l.attr("disabled",!0),c.show()},g.updateSelectedEvent=function(){var a=e.getRangeElem();return a=e.getSelfOrParentByName(a,"a"),!!a},o.click(function(a){a.preventDefault(),g.dropPanel.hide()}),n.click(function(c){c.preventDefault();var d,f,h,i,j,k,n=e.getRangeElem(),o=e.getSelfOrParentByName(n,"a"),p=e.isRangeEmpty(),q=e.txt.$txt,r="link"+a.random(),s=b.trim(m.val()),t=b.trim(l.val());return s?(t||(t=s),void(p?o?(d=b(o),h=function(){d.attr("href",s),d.text(t)},i=function(){var a=this;a.restoreSelectionByElem(o)},e.customCommand(c,h,i)):(f='<a href="'+s+'" target="_blank">'+t+"</a>",a.userAgent.indexOf("Firefox")>0&&(f+="<span>&nbsp;</span>"),e.command(c,"insertHtml",f)):(j=q.find("a"),j.attr(r,"1"),e.command(c,"createLink",s),k=q.find("a").not("["+r+"]"),k.attr("target","_blank"),j.removeAttr(r)))):void g.dropPanel.focusFirstInput()}),e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){var d="unlink";if(c(d)){var e=this,f=e.config.lang,g=new a.Menu({editor:e,id:d,title:f.unlink,commandName:"unLink"});g.clickEvent=function(a){function c(){i.after(j).remove()}function d(){e.restoreSelectionByElem(j.get(0))}var f=e.isRangeEmpty();if(!f)return void e.command(a,"unLink");var g=e.getRangeElem(),h=e.getSelfOrParentByName(g,"a");if(!h)return void a.preventDefault();var i=b(h),j=b("<span>"+i.text()+"</span>");e.customCommand(a,c,d)},e.menus[d]=g}})}),b(function(a,b){a.createMenu(function(c){var d="table";if(c(d)){var e,f,g,h=this,i=h.config.lang,j=new a.Menu({editor:h,id:d,title:i.table}),k=b('<div style="font-size: 14px; color: #666; text-align:right;"></div>'),l=b('<table class="choose-table" style="margin-bottom:10px;margin-top:5px;">'),m=b("<span>0</span>"),n=b("<span> 行 </span>"),o=b("<span>0</span>"),p=b("<span> 列</span>");for(f=0;f<15;f++){for(e=b('<tr index="'+(f+1)+'">'),g=0;g<20;g++)e.append(b('<td index="'+(g+1)+'">'));l.append(e)}k.append(l),k.append(m).append(n).append(o).append(p),l.on("mouseenter","td",function(a){var c=b(a.currentTarget),d=c.attr("index"),e=c.parent(),f=e.attr("index");m.text(f),o.text(d),l.find("tr").each(function(){var a=b(this),c=a.attr("index");parseInt(c,10)<=parseInt(f,10)?a.find("td").each(function(){var a=b(this),c=a.attr("index");parseInt(c,10)<=parseInt(d,10)?a.addClass("active"):a.removeClass("active")}):a.find("td").removeClass("active")})}).on("mouseleave",function(a){l.find("td").removeClass("active"),m.text(0),o.text(0)}),l.on("click","td",function(a){var c,d,e=b(a.currentTarget),f=e.attr("index"),g=e.parent(),i=g.attr("index"),j=parseInt(i,10),k=parseInt(f,10),l="<table>";for(c=0;c<j;c++){for(l+="<tr>",d=0;d<k;d++)l+="<td><span>&nbsp;</span></td>";l+="</tr>"}l+="</table>",h.command(a,"insertHtml",l)}),j.dropPanel=new a.DropPanel(h,j,{$content:k,width:262}),h.menus[d]=j}})}),b(function(a,b){a.createMenu(function(c){function d(a,c){b.each(a,function(a,d){var e=d.icon||d.url,g=d.value||d.title,h="icon"===j?e:g,i=b('<a href="#" commandValue="'+h+'"></a>'),k=b("<img>");k.attr("_src",e),i.append(k),c.append(i),f.emotionUrls.push(e)})}var e="emotion";if(c(e)){var f=this,g=f.config,h=g.lang,i=g.emotions,j=g.emotionsShow;f.emotionUrls=[];var k=new a.Menu({editor:f,id:e,title:h.emotion}),l=b('<div class="panel-tab"></div>'),m=b('<div class="tab-container"></div>'),n=b('<div class="content-container emotion-content-container"></div>');b.each(i,function(c,e){var f=e.title,g=e.data;a.log("正在处理 "+f+" 表情的数据...");var h=b('<a href="#">'+f+" </a>");m.append(h);var i=b('<div class="content"></div>');if(n.append(i),h.click(function(a){m.children().removeClass("selected"),n.children().removeClass("selected"),i.addClass("selected"),h.addClass("selected"),a.preventDefault()}),"string"==typeof g)a.log("将通过 "+g+" 地址ajax下载表情包"),b.get(g,function(c){c=b.parseJSON(c),a.log("下载完毕，得到 "+c.length+" 个表情"),d(c,i)});else{if(!(Object.prototype.toString.call(g).toLowerCase().indexOf("array")>0))return void a.error("data 数据格式错误，请修改为正确格式，参考文档："+a.docsite);d(g,i)}}),l.append(m).append(n),m.children().first().addClass("selected"),n.children().first().addClass("selected"),n.on("click","a[commandValue]",function(a){var c=b(a.currentTarget),d=c.attr("commandValue");"icon"===j?f.command(a,"InsertImage",d):f.command(a,"insertHtml","<span>"+d+"</span>"),a.preventDefault()}),k.dropPanel=new a.DropPanel(f,k,{$content:l,width:350}),k.clickEvent=function(c){var d=this,e=d.dropPanel;return e.isShowing?void e.hide():(e.show(),void(d.imgLoaded||(n.find("img").each(function(){var c=b(this),d=c.attr("_src");c.on("error",function(){a.error("加载不出表情图片 "+d)}),c.attr("src",d),c.removeAttr("_src")}),d.imgLoaded=!0)))},f.menus[e]=k}})}),b(function(a,b){function c(a,c,d){function e(){h.val("")}var f=a.config.lang,g=b('<div style="margin:20px 10px 10px 10px;"></div>'),h=b('<input type="text" class="block" placeholder="http://"/>');g.append(h);var i=b('<button class="right">'+f.submit+"</button>"),j=b('<button class="right gray">'+f.cancel+"</button>");d.append(g).append(i).append(j),j.click(function(a){a.preventDefault(),c.dropPanel.hide()}),i.click(function(c){c.preventDefault();var d=b.trim(h.val());if(!d)return void h.focus();var f='<img style="max-width:100%;" src="'+d+'"/>';a.command(c,"insertHtml",f,e)})}a.createMenu(function(d){function e(){o.click(function(a){m.children().removeClass("selected"),n.children().removeClass("selected"),q.addClass("selected"),o.addClass("selected"),a.preventDefault()}),p.click(function(b){m.children().removeClass("selected"),n.children().removeClass("selected"),r.addClass("selected"),p.addClass("selected"),b.preventDefault(),a.placeholder&&r.find("input[type=text]").focus()}),o.click()}function f(){m.remove(),q.remove(),r.addClass("selected")}function g(){m.remove(),r.remove(),q.addClass("selected")}var h="img";if(d(h)){var i=this,j=i.config.lang,k=new a.Menu({editor:i,id:h,title:j.img}),l=b('<div class="panel-tab"></div>'),m=b('<div class="tab-container"></div>'),n=b('<div class="content-container"></div>');l.append(m).append(n);var o=b('<a href="#">上传图片</a>'),p=b('<a href="#">网络图片</a>');m.append(o).append(p);var q=b('<div class="content"></div>');n.append(q);var r=b('<div class="content"></div>');n.append(r),c(i,k,r),k.dropPanel=new a.DropPanel(i,k,{$content:l,width:400,onRender:function(){var a=i.config.customUploadInit;a&&a.call(i)}}),i.menus[h]=k,i.ready(function(){function a(){k.dropPanel.hide()}var b=this,c=b.config,d=c.uploadImgUrl,h=c.customUpload,i=c.hideLinkImg;d||h?(b.$uploadContent=q,e(),i&&g()):f(),q.click(function(){setTimeout(a)})})}})}),b(function(a,b){a.createMenu(function(c){var d="video";if(c(d)){var e=this,f=e.config.lang,g=/^<(iframe)|(embed)/i,h=new a.Menu({editor:e,id:d,title:f.video}),i=b("<div></div>"),j=b('<div style="margin:20px 10px;"></div>'),k=b('<input type="text" class="block" placeholder=\'格式如：<iframe src="..." frameborder=0 allowfullscreen></iframe>\'/>');j.append(k);var l=b('<div style="margin:20px 10px;"></div>'),m=b('<input type="text" value="640" style="width:50px;text-align:center;"/>'),n=b('<input type="text" value="498" style="width:50px;text-align:center;"/>');l.append("<span> "+f.width+" </span>").append(m).append("<span> px &nbsp;&nbsp;&nbsp;</span>").append("<span> "+f.height+" </span>").append(n).append("<span> px </span>");var o=b("<div></div>"),p=b('<a href="http://www.kancloud.cn/wangfupeng/wangeditor2/134973" target="_blank" style="display:inline-block;margin-top:10px;margin-left:10px;color:#999;">如何复制视频链接？</a>'),q=b('<button class="right">'+f.submit+"</button>"),r=b('<button class="right gray">'+f.cancel+"</button>");o.append(p).append(q).append(r),i.append(j).append(l).append(o),r.click(function(a){a.preventDefault(),k.val(""),h.dropPanel.hide()}),q.click(function(a){a.preventDefault();var c,d=b.trim(k.val()),f=parseInt(m.val()),i=parseInt(n.val()),j=b("<div>"),l="<p>{content}</p>";return d?g.test(d)?isNaN(f)||isNaN(i)?void alert("宽度或高度不是数字！"):(c=b(d),c.attr("width",f).attr("height",i),l=l.replace("{content}",j.append(c).html()),e.command(a,"insertHtml",l),void k.val("")):(alert("视频链接格式错误！"),void h.dropPanel.focusFirstInput()):void h.dropPanel.focusFirstInput()}),h.dropPanel=new a.DropPanel(e,h,{$content:i,width:400}),e.menus[d]=h}})}),b(function(a,b){var c=function(a){return"onkeyup"in a}(document.createElement("input"));a.baiduMapAk="TVhjYjq1ICT2qqL5LdS8mwas",a.numberOfLocation=0,a.createMenu(function(d){function e(){q.val("")}var f="location";if(d(f)){if(++a.numberOfLocation>1)return void a.error("目前不支持在一个页面多个编辑器上同时使用地图，可通过自定义菜单配置去掉地图菜单");var g=this,h=g.config,i=h.lang,j=h.mapAk;g.mapData={};var k=g.mapData;k.markers=[],k.mapContainerId="map"+a.random(),k.clearLocations=function(){var a=k.map;a&&(a.clearOverlays(),k.markers=[])},k.searchMap=function(){var a=k.map;if(a){var b,c,d=window.BMap,e=p.val(),f=q.val();""!==e&&(f&&""!==f||a.centerAndZoom(e,11),f&&""!==f&&(b=new d.Geocoder,b.getPoint(f,function(b){b?(a.centerAndZoom(b,13),c=new d.Marker(b),a.addOverlay(c),c.enableDragging(),k.markers.push(c)):a.centerAndZoom(e,11)},e)))}};var l=!1;window.baiduMapCallBack=function(){function b(b){var d=b.name;e.setCenter(d),p.val(d),a.placeholder&&q.focus();var f,g;c?(g=function(a){"keyup"===a.type&&13===a.keyCode&&a.preventDefault(),f&&clearTimeout(f),f=setTimeout(k.searchMap,500)},p.on("keyup change paste",g),q.on("keyup change paste",g)):(g=function(){if(!n.is(":visible"))return void clearTimeout(f);var a="",b="",c=p.val(),d=q.val();c===a&&d===b||(k.searchMap(),a=c,b=d),f&&clearTimeout(f),f=setTimeout(g,1e3)},f=setTimeout(g,1e3))}if(!l){l=!0;var d=window.BMap;k.map||(k.map=new d.Map(k.mapContainerId));var e=k.map;e.centerAndZoom(new d.Point(116.404,39.915),11),e.addControl(new d.MapTypeControl),e.setCurrentCity("北京"),e.enableScrollWheelZoom(!0);var f=new d.LocalCity;f.get(b),e.addEventListener("click",function(a){var b=new d.Marker(new d.Point(a.point.lng,a.point.lat));e.addOverlay(b),b.enableDragging(),k.markers.push(b)},!1)}},k.loadMapScript=function(){var b=document.createElement("script");b.type="text/javascript",b.src="https://api.map.baidu.com/api?v=2.0&ak="+j+"&s=1&callback=baiduMapCallBack";try{document.body.appendChild(b)}catch(c){a.error("加载地图过程中发生错误")}},k.initMap=function(){window.BMap?window.baiduMapCallBack():k.loadMapScript()};var m=new a.Menu({editor:g,id:f,title:i.location});g.menus[f]=m;var n=b("<div></div>"),o=b('<div style="margin:10px 0;"></div>'),p=b('<input type="text"/>');p.css({width:"80px","text-align":"center"});var q=b('<input type="text"/>');q.css({width:"300px","margin-left":"10px"}).attr("placeholder",i.searchlocation);var r=b('<button class="right link">'+i.clearLocation+"</button>");o.append(r).append(p).append(q),n.append(o),r.click(function(a){q.val(""),q.focus(),k.clearLocations(),a.preventDefault()});var s=b('<div id="'+k.mapContainerId+'"></div>');s.css({height:"260px",width:"100%",position:"relative","margin-top":"10px",border:"1px solid #f1f1f1"});var t=b("<span>"+i.loading+"</span>");t.css({position:"absolute",width:"100px","text-align":"center",top:"45%",left:"50%","margin-left":"-50px"}),s.append(t),n.append(s);var u=b('<div style="margin:10px 0;"></div>'),v=b('<button class="right">'+i.submit+"</button>"),w=b('<button class="right gray">'+i.cancel+"</button>"),x=b('<label style="display:inline-block;margin-top:10px;color:#666;"></label>'),y=b('<input type="checkbox">');x.append(y).append('<span style="display:inline-block;margin-left:5px;">  '+i.dynamicMap+"</span>"),u.append(x).append(v).append(w),n.append(u),w.click(function(a){a.preventDefault(),e(),m.dropPanel.hide()}),v.click(function(a){a.preventDefault();var c,d,f,h=k.map,j=y.is(":checked"),l=k.markers,m=h.getCenter(),n=m.lng,o=m.lat,p=h.getZoom(),q=h.getSize(),r=q.width,s=q.height;if(d=j?"http://ueditor.baidu.com/ueditor/dialogs/map/show.html#":"http://api.map.baidu.com/staticimage?",d=d+"center="+n+","+o+"&zoom="+p+"&width="+r+"&height="+s,l.length>0&&(d+="&markers=",b.each(l,function(a,b){c=b.getPosition(),a>0&&(d+="|"),d=d+c.lng+","+c.lat})),j){if(l.length>1)return void alert(i.langDynamicOneLocation);d+="&markerStyles=l,A",f='<iframe class="ueditor_baidumap" src="{src}" frameborder="0" width="'+r+'" height="'+s+'"></iframe>',f=f.replace("{src}",d),g.command(a,"insertHtml",f,e)}else g.command(a,"insertHtml",'<img style="max-width:100%;" src="'+d+'"/>',e)}),m.dropPanel=new a.DropPanel(g,m,{$content:n,width:500}),m.onRender=function(){j===a.baiduMapAk&&a.warn("建议在配置中自定义百度地图的mapAk，否则可能影响地图功能，文档："+a.docsite)},m.clickEvent=function(a){var b=this,c=b.dropPanel,d=!1;return c.isShowing?void c.hide():(k.map||(d=!0),c.show(),k.initMap(),void(d||q.focus()))}}})}),b(function(a,b){function c(){if(!(a.userAgent.indexOf("MSIE 8")>0||window.hljs)){var b=document.createElement("script");b.type="text/javascript",b.src="//cdn.bootcss.com/highlight.js/9.2.0/highlight.min.js",document.body.appendChild(b)}}a.createMenu(function(d){function e(a){var c=b("<div></div>");c.css({margin:"15px 5px 5px 5px",height:"160px","text-align":"center"}),n.css({width:"100%",height:"100%",padding:"10px"}),n.on("keydown",function(a){9===a.keyCode&&a.preventDefault()}),c.append(n),a.append(c);var d=b("<div></div>"),e=b('<button class="right">'+j.submit+"</button>"),f=b('<button class="right gray">'+j.cancel+"</button>");d.append(e).append(f).append(o),a.append(d),f.click(function(a){a.preventDefault(),l.dropPanel.hide()});var g='<pre style="max-width:100%;overflow-x:auto;"><code{#langClass}>{#content}</code></pre>';e.click(function(a){function c(){var a;i&&(a=q.attr("class"),a!==i+" hljs"&&q.attr("class",i+" hljs")),q.html(e)}function d(){h.restoreSelectionByElem(r),m()}a.preventDefault();var e=n.val();if(!e)return void n.focus();var f=h.getRangeElem();b.trim(b(f).text())&&0!==g.indexOf("<p><br></p>")&&(g="<p><br></p>"+g);var i=o?o.val():"",j="",m=function(){k.find("pre code").each(function(a,c){var d=b(c);d.attr("codemark")||window.hljs&&(window.hljs.highlightBlock(c),d.attr("codemark","1"))})};if(i&&(j=' class="'+i+' hljs"'),e=e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;"),!l.selected){var p=g.replace("{#langClass}",j).replace("{#content}",e);return void h.command(a,"insertHtml",p,m)}var q,r=h.getSelfOrParentByName(f,"pre");r&&(r=h.getSelfOrParentByName(f,"code")),r&&(q=b(r),h.customCommand(a,c,d))})}function f(){var a=h.getRangeElem(),b=h.getSelfOrParentByName(a,"code");b?h.disableMenusExcept("insertcode"):h.enableMenusExcept("insertcode")}var g="insertcode";if(d(g)){setTimeout(c,0);var h=this,i=h.config,j=i.lang,k=h.txt.$txt,l=new a.Menu({editor:h,id:g,title:j.insertcode});l.clickEvent=function(a){var c=this,d=c.dropPanel;if(d.isShowing)return void d.hide();n.val(""),d.show();var e=window.hljs;if(e&&e.listLanguages){if(0!==o.children().length)return;o.css({"margin-top":"9px","margin-left":"5px"}),b.each(e.listLanguages(),function(a,b){"xml"===b&&(b="html"),b===i.codeDefaultLang?o.append('<option value="'+b+'" selected="selected">'+b+"</option>"):o.append('<option value="'+b+'">'+b+"</option>")})}else o.hide()},l.clickEventSelected=function(a){var c=this,d=c.dropPanel;if(d.isShowing)return void d.hide();d.show();var e,f,g=h.getRangeElem(),i=h.getSelfOrParentByName(g,"pre");i&&(i=h.getSelfOrParentByName(g,"code")),i&&(e=b(i),n.val(e.text()),o&&(f=e.attr("class"),f&&o.val(f.split(" ")[0])))},l.updateSelectedEvent=function(){var a,b=this,c=b.editor;return a=c.getRangeElem(),a=c.getSelfOrParentByName(a,"pre"),!!a};var m=b("<div></div>"),n=b("<textarea></textarea>"),o=b("<select></select>");e(m),l.dropPanel=new a.DropPanel(h,l,{$content:m,width:500}),h.menus[g]=l,k.on("keydown",function(a){if(13===a.keyCode){var b=h.getRangeElem(),c=h.getSelfOrParentByName(b,"code");c&&h.command(a,"insertHtml","\n")}}),k.on("keydown click",function(a){setTimeout(f)})}})}),b(function(a,b){a.createMenu(function(b){var c="undo";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.undo});f.clickEvent=function(a){d.undo()},d.menus[c]=f,d.ready(function(){function a(){c.undoRecord()}var b,c=this,d=c.txt.$txt;d.on("keydown",function(d){var e=d.keyCode;return d.ctrlKey&&90===e?void c.undo():void(13===e?a():(b&&clearTimeout(b),b=setTimeout(a,1e3)))}),c.undoRecord()})}})}),b(function(a,b){a.createMenu(function(b){var c="redo";if(b(c)){var d=this,e=d.config.lang,f=new a.Menu({editor:d,id:c,title:e.redo});f.clickEvent=function(a){d.redo()},d.menus[c]=f}})}),b(function(a,b){var c;a.createMenu(function(b){var d="fullscreen";if(b(d)){var e,f,g=this,h=g.txt.$txt,i=g.config,j=i.zindex||1e4,k=i.lang,l=!1,m=new a.Menu({editor:g,id:d,title:k.fullscreen});m.clickEvent=function(b){var d=g.$editorContainer;d.addClass("wangEditor-fullscreen"),e=d.css("z-index"),d.css("z-index",j);var i,k=h.height(),m=h.outerHeight();g.useMaxHeight&&(f=h.css("max-height"),
	h.css("max-height","none"),i=h.parent(),i.after(h),i.remove(),h.css("overflow-y","auto"));var n=g.menuContainer;h.height(a.$window.height()-n.height()-(m-k)),g.menuContainer.$menuContainer.attr("style",""),l=!0,g.isFullScreen=!0,c=a.$window.scrollTop()},m.clickEventSelected=function(b){var d=g.$editorContainer;d.removeClass("wangEditor-fullscreen"),d.css("z-index",e),g.useMaxHeight?h.css("max-height",f):g.$valueContainer.css("height",g.valueContainerHeight),g.txt.initHeight(),l=!1,g.isFullScreen=!1,null!=c&&a.$window.scrollTop(c)},m.updateSelectedEvent=function(a){return l},g.menus[d]=m}})}),b(function(a,b){a.fn.renderMenus=function(){var a,c=this,d=c.menus,e=c.config.menus,f=(c.menuContainer,0);b.each(e,function(b,c){return"|"===c?void f++:(a=d[c],void(a&&a.render(f)))})}}),b(function(a,b){a.fn.renderMenuContainer=function(){var a=this,b=a.menuContainer;a.$editorContainer;b.render()}}),b(function(a,b){a.fn.renderTxt=function(){var a=this,b=a.txt;b.render(),a.ready(function(){b.initHeight()})}}),b(function(a,b){a.fn.renderEditorContainer=function(){var a,b,c=this,d=c.$valueContainer,e=c.$editorContainer,f=c.txt.$txt;d===f?(a=c.$prev,b=c.$parent,a&&a.length?a.after(e):b.prepend(e)):(d.after(e),d.hide())}}),b(function(a,b){a.fn.eventMenus=function(){var a=this.menus;b.each(a,function(a,b){b.bindEvent()})}}),b(function(a,b){a.fn.eventMenuContainer=function(){}}),b(function(a,b){a.fn.eventTxt=function(){var a=this.txt;a.saveSelectionEvent(),a.updateValueEvent(),a.updateMenuStyleEvent()}}),b(function(a,b){a.plugin(function(){var b=this,c=b.config.uploadImgFns;c.onload||(c.onload=function(b,c){a.log("上传结束，返回结果为 "+b);var d,e=this,f=e.uploadImgOriginalName||"";0===b.indexOf("error|")?(a.warn("上传失败："+b.split("|")[1]),alert(b.split("|")[1])):(a.log("上传成功，即将插入编辑区域，结果为："+b),d=document.createElement("img"),d.onload=function(){var c='<img src="'+b+'" alt="'+f+'" style="max-width:100%;"/>';e.command(null,"insertHtml",c),a.log("已插入图片，地址 "+b),d=null},d.onerror=function(){a.error("使用返回的结果获取图片，发生错误。请确认以下结果是否正确："+b),d=null},d.src=b)}),c.ontimeout||(c.ontimeout=function(b){a.error("上传图片超时"),alert("上传图片超时")}),c.onerror||(c.onerror=function(b){a.error("上传上图片发生错误"),alert("上传上图片发生错误")})})}),b(function(a,b){window.FileReader&&window.FormData&&a.plugin(function(){function c(a,b){var c,d=window.atob(a.split(",")[1]),e=new ArrayBuffer(d.length),f=new Uint8Array(e);for(c=0;c<d.length;c++)f[c]=d.charCodeAt(c);return new Blob([e],{type:b})}function d(b,c){var d=document.createElement("img");d.onload=function(){var e='<img src="'+b+'" style="max-width:100%;"/>';f.command(c,"insertHtml",e),a.log("已插入图片，地址 "+b),d=null},d.onerror=function(){a.error("使用返回的结果获取图片，发生错误。请确认以下结果是否正确："+b),d=null},d.src=b}function e(a){if(a.lengthComputable){var b=a.loaded/a.total;f.showUploadProgress(100*b)}}var f=this,g=f.config,h=g.uploadImgUrl,i=g.uploadTimeout,j=g.uploadImgFns,k=j.onload,l=j.ontimeout,m=j.onerror;h&&(f.xhrUploadImg=function(g){function j(){y&&clearTimeout(y),z&&z.abort&&z.abort(),n.preventDefault(),u&&u.call(f,z),f.hideUploadProgress()}var n=g.event,o=g.filename||"",p=g.base64,q=g.fileType||"image/png",r=g.name||"wangEditor_upload_file",s=g.loadfn||k,t=g.errorfn||m,u=g.timeoutfn||l,v=f.config.uploadParams||{},w=f.config.uploadHeaders||{},x="png";if(o.indexOf(".")>0?x=o.slice(o.lastIndexOf(".")-o.length+1):q.indexOf("/")>0&&q.split("/")[1]&&(x=q.split("/")[1]),a.isOnWebsite)return a.log("预览模拟上传"),void d(p,n);var y,z=new XMLHttpRequest,A=new FormData;z.onload=function(){y&&clearTimeout(y),f.uploadImgOriginalName=o,o.indexOf(".")>0&&(f.uploadImgOriginalName=o.split(".")[0]),s&&s.call(f,z.responseText,z),f.hideUploadProgress()},z.onerror=function(){y&&clearTimeout(y),n.preventDefault(),t&&t.call(f,z),f.hideUploadProgress()},z.upload.onprogress=e,A.append(r,c(p,q),a.random()+"."+x),b.each(v,function(a,b){A.append(a,b)}),z.open("POST",h,!0),b.each(w,function(a,b){z.setRequestHeader(a,b)}),z.withCredentials=!0,z.send(A),y=setTimeout(j,i),a.log("开始上传...并开始超时计算")})})}),b(function(a,b){a.plugin(function(){function a(){j||(j=!0,i.css({top:f+"px"}),g.append(i))}function c(){i.hide(),k=null}var d=this,e=d.menuContainer,f=e.height(),g=d.$editorContainer,h=g.width(),i=b('<div class="wangEditor-upload-progress"></div>'),j=!1;d.showUploadProgress=function(b){k&&clearTimeout(k),a(),i.show(),i.width(b*h/100)};var k;d.hideUploadProgress=function(a){k&&clearTimeout(k),a=a||750,k=setTimeout(c,a)}})}),b(function(a,b){a.plugin(function(){var c,d=this,e=d.config,f=e.uploadImgUrl,g=e.uploadTimeout;if(f){var h=d.$uploadContent;if(h){var i=b('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');h.append(i);var j=new a.UploadFile({editor:d,uploadUrl:f,timeout:g,fileAccept:"image/jpg,image/jpeg,image/png,image/gif,image/bmp"});i.click(function(a){c=a,j.selectFiles()})}}})}),b(function(a,b){if(window.FileReader&&window.FormData){var c=function(a){this.editor=a.editor,this.uploadUrl=a.uploadUrl,this.timeout=a.timeout,this.fileAccept=a.fileAccept,this.multiple=!0};c.fn=c.prototype,c.fn.clear=function(){this.$input.val(""),a.log("input value 已清空")},c.fn.render=function(){var c=this;if(!c._hasRender){a.log("渲染dom");var d=c.fileAccept,e=d?'accept="'+d+'"':"",f=c.multiple,g=f?'multiple="multiple"':"",h=b('<input type="file" '+e+" "+g+"/>"),i=b('<div style="visibility:hidden;"></div>');i.append(h),a.$body.append(i),h.on("change",function(a){c.selected(a,h.get(0))}),c.$input=h,c._hasRender=!0}},c.fn.selectFiles=function(){var b=this;a.log("使用 html5 方式上传"),b.render(),a.log("选择文件"),b.$input.click()},c.fn.selected=function(c,d){var e=this,f=d.files||[];0!==f.length&&(a.log("选中 "+f.length+" 个文件"),b.each(f,function(a,b){e.upload(b)}))},c.fn.upload=function(b){function c(){d.clear()}var d=this,e=d.editor,f=b.name||"",g=b.type||"",h=e.config.uploadImgFns,i=e.config.uploadImgFileName||"wangEditorH5File",j=h.onload,k=h.ontimeout,l=h.onerror,m=new FileReader;return j&&k&&l?(a.log("开始执行 "+f+" 文件的上传"),m.onload=function(b){a.log("已读取"+f+"文件");var d=b.target.result||this.result;e.xhrUploadImg({event:b,filename:f,base64:d,fileType:g,name:i,loadfn:function(a,b){c();var d=this;j.call(d,a,b)},errorfn:function(b){c(),a.isOnWebsite&&alert("wangEditor官网暂时没有服务端，因此报错。实际项目中不会发生");var d=this;l.call(d,b)},timeoutfn:function(b){c(),a.isOnWebsite&&alert("wangEditor官网暂时没有服务端，因此超时。实际项目中不会发生");var d=this;k(d,b)}})},void m.readAsDataURL(b)):void a.error("请为编辑器配置上传图片的 onload ontimeout onerror 回调事件")},a.UploadFile=c}}),b(function(a,b){if(!window.FileReader||!window.FormData){var c=function(a){this.editor=a.editor,this.uploadUrl=a.uploadUrl,this.timeout=a.timeout,this.fileAccept=a.fileAccept,this.multiple=!1};c.fn=c.prototype,c.fn.clear=function(){this.$input.val(""),a.log("input value 已清空")},c.fn.hideModal=function(){this.modal.hide()},c.fn.render=function(){var c=this,d=c.editor,e=d.config.uploadImgFileName||"wangEditorFormFile";if(!c._hasRender){var f=c.uploadUrl;a.log("渲染dom");var g="iframe"+a.random(),h=b('<iframe name="'+g+'" id="'+g+'" frameborder="0" width="0" height="0"></iframe>'),i=c.multiple,j=i?'multiple="multiple"':"",k=b("<p>选择图片并上传</p>"),l=b('<input type="file" '+j+' name="'+e+'"/>'),m=b('<input type="submit" value="上传"/>'),n=b('<form enctype="multipart/form-data" method="post" action="'+f+'" target="'+g+'"></form>'),o=b('<div style="margin:10px 20px;"></div>');n.append(k).append(l).append(m),b.each(d.config.uploadParams,function(a,c){n.append(b('<input type="hidden" name="'+a+'" value="'+c+'"/>'))}),o.append(n),o.append(h),c.$input=l,c.$iframe=h;var p=new a.Modal(d,(void 0),{$content:o});c.modal=p,c._hasRender=!0}},c.fn.bindLoadEvent=function(){function a(){var a=b.trim(g.document.body.innerHTML);if(a){var e=c.$input.val(),f=e;e.lastIndexOf("\\")>=0&&(f=e.slice(e.lastIndexOf("\\")+1),f.indexOf(".")>0&&(f=f.split(".")[0])),d.uploadImgOriginalName=f,h.call(d,a),c.clear(),c.hideModal()}}var c=this;if(!c._hasBindLoad){var d=c.editor,e=c.$iframe,f=e.get(0),g=f.contentWindow,h=d.config.uploadImgFns.onload;f.attachEvent?f.attachEvent("onload",a):f.onload=a,c._hasBindLoad=!0}},c.fn.show=function(){function a(){c.show(),b.bindLoadEvent()}var b=this,c=b.modal;setTimeout(a)},c.fn.selectFiles=function(){var b=this;a.log("使用 form 方式上传"),b.render(),b.clear(),b.show()},a.UploadFile=c}}),b(function(a,b){a.plugin(function(){function c(){var c=/^data:(image\/\w+);base64/,g=h.find("img");a.log("粘贴后，检查到编辑器有"+g.length+"个图片。开始遍历图片，试图找到刚刚粘贴过来的图片"),b.each(g,function(){var g,h,i=this,j=b(i),l=j.attr("src");e.each(function(){if(i===this)return g=!0,!1}),g||(a.log("找到一个粘贴过来的图片"),c.test(l)?(a.log("src 是 base64 格式，可以上传"),h=l.match(c)[1],f.xhrUploadImg({event:d,base64:l,fileType:h,name:k})):a.log("src 为 "+l+" ，不是 base64 格式，暂时不支持上传"),j.remove())}),a.log("遍历结束")}var d,e,f=this,g=f.txt,h=g.$txt,i=f.config,j=i.uploadImgUrl,k=i.uploadImgFileName||"wangEditorPasteFile";j&&h.on("paste",function(g){d=g;var i,j,l=d.clipboardData||d.originalEvent.clipboardData;i=null==l?window.clipboardData&&window.clipboardData.getData("text"):l.getData("text/plain")||l.getData("text/html"),i||(j=l&&l.items,j?(a.log("通过 data.items 得到了数据"),b.each(j,function(b,c){var e=c.type||"";if(!(e.indexOf("image")<0)){var g=c.getAsFile(),h=new FileReader;a.log("得到一个粘贴图片"),h.onload=function(b){a.log("读取到粘贴的图片");var c=b.target.result||this.result;f.xhrUploadImg({event:d,base64:c,fileType:e,name:k})},h.readAsDataURL(g)}})):(a.log("未从 data.items 得到数据，使用检测粘贴图片的方式"),e=h.find("img"),a.log("粘贴前，检查到编辑器有"+e.length+"个图片"),setTimeout(c,0)))})})}),b(function(a,b){a.plugin(function(){var c=this,d=c.txt,e=d.$txt,f=c.config,g=f.uploadImgUrl,h=f.uploadImgFileName||"wangEditorDragFile";g&&(a.$document.on("dragleave drop dragenter dragover",function(a){a.preventDefault()}),e.on("drop",function(d){d.preventDefault();var e=d.originalEvent,f=e.dataTransfer&&e.dataTransfer.files;f&&f.length&&b.each(f,function(b,e){var f=e.type,g=e.name;if(!(f.indexOf("image/")<0)){a.log("得到图片 "+g);var i=new FileReader;i.onload=function(b){a.log("读取到图片 "+g);var e=b.target.result||this.result;c.xhrUploadImg({event:d,base64:e,fileType:f,name:h})},i.readAsDataURL(e)}})}))})}),b(function(a,b){a.plugin(function(){function c(){m||(d(),n.append(o).append(p).append(q).append(r),h.$editorContainer.append(n),m=!0)}function d(){function a(a,c){k=j.html();var d=function(){c&&c(),k!==j.html()&&j.change()};b&&h.customCommand(a,b,d)}var b;p.click(function(c){b=function(){g.remove()},a(c,function(){setTimeout(f,100)})}),r.click(function(c){b=function(){g.css({width:"100%"})},a(c,function(){setTimeout(e)})}),q.click(function(c){b=function(){g.css({width:"auto"})},a(c,function(){setTimeout(e)})})}function e(){if(!h._disabled&&null!=g){g.addClass("clicked");var a=g.position(),b=a.top,c=a.left,d=g.outerHeight(),e=g.outerWidth(),f=b+d,i=c,j=0,k=l.position().top,m=l.outerHeight();f>k+m&&(f=k+m),n.show();var p=n.outerWidth();j=e/2-p/2,n.css({top:f+5,left:i,"margin-left":j}),j<0?(n.css("margin-left","0"),o.hide()):o.show()}}function f(){null!=g&&(g.removeClass("clicked"),g=null,n.hide())}var g,h=this,i=h.txt,j=i.$txt,k="",l=h.useMaxHeight?j.parent():j,m=!1,n=b('<div class="txt-toolbar"></div>'),o=b('<div class="tip-triangle"></div>'),p=b('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>'),q=b('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>'),r=b('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');l.on("click","table",function(a){var d=b(a.currentTarget);return c(),g&&g.get(0)===d.get(0)?void setTimeout(f,100):(g=d,e(),a.preventDefault(),void a.stopPropagation())}).on("click keydown scroll",function(a){setTimeout(f,100)}),a.$body.on("click keydown scroll",function(a){setTimeout(f,100)})})}),b(function(a,b){a.userAgent.indexOf("MSIE 8")>0||a.plugin(function(){function c(a,c){if(j){var d,e,f=function(){null!=c&&(q=c),o!==n.html()&&n.change()},g=!1,h=j.parent();if("a"===h.get(0).nodeName.toLowerCase()?(e=h,g=!0):e=b('<a target="_blank"></a>'),null==c)return e.attr("href")||"";if(""===c)g&&(d=function(){j.unwrap()});else{if(c===q)return;d=function(){e.attr("href",c),g||j.wrap(e)}}d&&(o=n.html(),k.customCommand(a,d,f))}}function d(){r||(e(),f(),v.append(w).append(x).append(y).append(z).append(A).append(B).append(C).append(D),E.append(F).append(H).append(G),t.append(u).append(v).append(E),k.$editorContainer.append(t).append(s),r=!0)}function e(){function a(a,b){var c;o=n.html(),c=function(){b&&b(),o!==n.html()&&n.change()},d&&k.customCommand(a,d,c)}var d;w.click(function(b){c(b,""),d=function(){j.remove()},a(b,function(){setTimeout(h,100)})}),y.click(function(b){d=function(){var a=j.get(0),b=a.width,c=a.height;b=1.1*b,c=1.1*c,j.css({width:b+"px",height:c+"px"})},a(b,function(){setTimeout(g)})}),x.click(function(b){d=function(){var a=j.get(0),b=a.width,c=a.height;b=.9*b,c=.9*c,j.css({width:b+"px",height:c+"px"})},a(b,function(){setTimeout(g)})}),z.click(function(b){d=function(){j.parents("p").css({"text-align":"left"}).attr("align","left")},a(b,function(){setTimeout(h,100)})}),B.click(function(b){d=function(){j.parents("p").css({"text-align":"right"}).attr("align","right")},a(b,function(){setTimeout(h,100)})}),A.click(function(b){d=function(){j.parents("p").css({"text-align":"center"}).attr("align","center")},a(b,function(){setTimeout(h,100)})}),C.click(function(a){a.preventDefault(),q=c(a),F.val(q),v.hide(),E.show()}),G.click(function(a){a.preventDefault();var d=b.trim(F.val());d&&c(a,d),setTimeout(h)}),H.click(function(a){a.preventDefault(),F.val(q),v.show(),E.hide()}),D.click(function(a){a.preventDefault(),c(a,""),setTimeout(h)})}function f(){function b(a){var b,h;b=a.pageX-c,h=a.pageY-d;var k=e+b,l=f+h;s.css({"margin-left":k,"margin-top":l});var m=g+b,n=i+h;j&&j.css({width:m,height:n})}var c,d,e,f,g,i;s.on("mousedown",function(k){j&&(c=k.pageX,d=k.pageY,e=parseFloat(s.css("margin-left"),10),f=parseFloat(s.css("margin-top"),10),g=j.width(),i=j.height(),t.hide(),a.$document.on("mousemove._dragResizeImg",b),a.$document.on("mouseup._dragResizeImg",function(b){a.$document.off("mousemove._dragResizeImg"),a.$document.off("mouseup._dragResizeImg"),h(),s.css({"margin-left":e,"margin-top":f}),I=!1}),I=!0)})}function g(){if(!k._disabled&&null!=j){j.addClass("clicked");var a=j.position(),b=a.top,c=a.left,d=j.outerHeight(),e=j.outerWidth();s.css({top:b+d,left:c+e});var f=b+d,g=c,h=0,i=p.position().top,l=p.outerHeight();f>i+l?f=i+l:s.show(),t.show();var m=t.outerWidth();h=e/2-m/2,t.css({top:f+5,left:g,"margin-left":h}),h<0?(t.css("margin-left","0"),u.hide()):u.show(),k.disableMenusExcept()}}function h(){null!=j&&(j.removeClass("clicked"),j=null,t.hide(),s.hide(),k.enableMenusExcept())}function i(a){var c=!1;return k.emotionUrls?(b.each(k.emotionUrls,function(b,d){var e=!1;if(a===d&&(c=!0,e=!0),e)return!1}),c):c}var j,k=this,l=k.config.lang,m=k.txt,n=m.$txt,o="",p=k.useMaxHeight?n.parent():n,q=(k.$editorContainer,""),r=!1,s=b('<div class="img-drag-point"></div>'),t=b('<div class="txt-toolbar"></div>'),u=b('<div class="tip-triangle"></div>'),v=b("<div></div>"),w=b('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>'),x=b('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>'),y=b('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>'),z=b('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>'),A=b('<a href="#"><i class="wangeditor-menu-img-align-center"></i></a>'),B=b('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>'),C=b('<a href="#"><i class="wangeditor-menu-img-link"></i></a>'),D=b('<a href="#"><i class="wangeditor-menu-img-unlink"></i></a>'),E=b('<div style="display:none;"></div>'),F=b('<input type="text" style="height:26px; margin-left:10px; width:200px;"/>'),G=b('<button class="right">'+l.submit+"</button>"),H=b('<button class="right gray">'+l.cancel+"</button>"),I=!1;p.on("mousedown","img",function(a){a.preventDefault()}).on("click","img",function(a){var c=b(a.currentTarget),e=c.attr("src");if(e&&!i(e)){if(d(),j&&j.get(0)===c.get(0))return void setTimeout(h,100);j=c,g(),v.show(),E.hide(),a.preventDefault(),a.stopPropagation()}}).on("click keydown scroll",function(a){I||setTimeout(h,100)})})}),b(function(a,b){a.plugin(function(){function a(){g||(n.append(o).append(p),k.$editorContainer.append(n),g=!0)}function c(){if(f){var a=f.position(),b=a.left,c=a.top,d=f.height(),e=c+d+5,g=k.menuContainer.height(),h=k.txt.$txt.outerHeight();e>g+h&&(e=g+h+5),n.css({top:e,left:b})}}function d(){if(!q&&f){a(),n.show();var b=f.attr("href");p.attr("href",b),c(),q=!0}}function e(){q&&f&&(n.hide(),q=!1)}var f,g,h,i,j,k=this,l=k.config.lang,m=k.txt.$txt,n=b('<div class="txt-toolbar"></div>'),o=b('<div class="tip-triangle"></div>'),p=b('<a href="#" target="_blank"><i class="wangeditor-menu-img-link"></i> '+l.openLink+"</a>"),q=!1;m.on("mouseenter","a",function(a){h&&clearTimeout(h),h=setTimeout(function(){var c=a.currentTarget,g=b(c);f=g;var h=g.children("img");h.length&&(h.click(function(a){e()}),h.hasClass("clicked"))||d()},500)}).on("mouseleave","a",function(a){i&&clearTimeout(i),i=setTimeout(e,500)}).on("click keydown scroll",function(a){setTimeout(e,100)}),n.on("mouseenter",function(a){i&&clearTimeout(i)}).on("mouseleave",function(a){j&&clearTimeout(j),j=setTimeout(e,500)})})}),b(function(a,b){a.plugin(function(){var b=this,c=b.config.menuFixed;if(c!==!1&&"number"==typeof c){var d=parseFloat(a.$body.css("margin-top"),10);isNaN(d)&&(d=0);var e=b.$editorContainer,f=e.offset().top,g=e.outerHeight(),h=b.menuContainer.$menuContainer,i=h.css("position"),j=h.css("top"),k=h.offset().top,l=h.outerHeight();b.txt.$txt;a.$window.scroll(function(){if(!b.isFullScreen){var m=a.$window.scrollTop(),n=h.width();0===k&&(k=h.offset().top,f=e.offset().top,g=e.outerHeight(),l=h.outerHeight()),m>=k&&m+c+l+30<f+g?(h.css({position:"fixed",top:c}),h.width(n),a.$body.css({"margin-top":d+l}),b._isMenufixed||(b._isMenufixed=!0)):(h.css({position:i,top:j}),h.css("width","100%"),a.$body.css({"margin-top":d}),b._isMenufixed&&(b._isMenufixed=!1))}})}})}),b(function(a,b){a.createMenu(function(c){var d="indent";if(c(d)){var e=this,f=new a.Menu({editor:e,id:d,title:"缩进",$domNormal:b('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-indent-left"></i></a>'),$domSelected:b('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-indent-left"></i></a>')});f.clickEvent=function(a){function c(){d.css("text-indent","2em")}var d,f=e.getRangeElem(),g=e.getSelfOrParentByName(f,"p");return g?(d=b(g),void e.customCommand(a,c)):a.preventDefault()},f.clickEventSelected=function(a){function c(){d.css("text-indent","0")}var d,f=e.getRangeElem(),g=e.getSelfOrParentByName(f,"p");return g?(d=b(g),void e.customCommand(a,c)):a.preventDefault()},f.updateSelectedEvent=function(){var a,c,d=e.getRangeElem(),f=e.getSelfOrParentByName(d,"p");return!!f&&(a=b(f),c=a.css("text-indent"),!(!c||"0px"===c))},e.menus[d]=f}})}),b(function(a,b){a.createMenu(function(c){var d="lineheight";if(c(d)){var e=this;e.commandHooks.lineHeight=function(a){var c=e.getRangeElem(),d=e.getSelfOrParentByName(c,"p,h1,h2,h3,h4,h5,pre");d&&b(d).css("line-height",a+"")};var f=new a.Menu({editor:e,id:d,title:"行高",commandName:"lineHeight",$domNormal:b('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),$domSelected:b('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')}),g={"1.0":"1.0倍",1.5:"1.5倍",1.8:"1.8倍","2.0":"2.0倍",2.5:"2.5倍","3.0":"3.0倍"},h='<span style="line-height:{#commandValue}">{#title}</span>';f.dropList=new a.DropList(e,f,{data:g,tpl:h}),e.menus[d]=f}})}),b(function(a,b){a.plugin(function(){var c=this,d=c.config.customUpload;if(d){if(c.config.uploadImgUrl)return alert("自定义上传无效，详看浏览器日志console.log"),void a.error("已经配置了 uploadImgUrl ，就不能再配置 customUpload ，两者冲突。将导致自定义上传无效。");var e=c.$uploadContent;e||a.error("自定义上传，无法获取 editor.$uploadContent");var f=b('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');e.append(f);var g="upload"+a.random(),h="upload"+a.random();f.attr("id",g),e.attr("id",h),c.customUploadBtnId=g,c.customUploadContainerId=h}})}),b(function(a,b){a.info("本页面富文本编辑器由 wangEditor 提供 http://wangeditor.github.io/ ")}),window.wangEditor});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//提取umeditor中的表情数据

	var group = {};
	$('td[class^="edui-emotion"]').each(function () {
	    var $this = $(this);
	    var groupName = $this.attr('class').replace('edui-emotion-', '');
	    var realurl = $this.data('realurl');
	    if (typeof group[groupName] == 'undefined') {
	        group[groupName] = [];
	    }
	    var name = $this.find('img').attr('title');
	    group[groupName].push({
	        value: name,
	        icon: realurl
	    });
	});
	console.log(group);

	//百度的表情包数据
	var BAIDU_EMOTION = {
	    "jd": [{
	        "value": "Kiss",
	        "icon": "http://img.baidu.com/hi/jx2/j_0001.gif"
	    }, {
	        "value": "Love",
	        "icon": "http://img.baidu.com/hi/jx2/j_0002.gif"
	    }, {
	        "value": "Yeah",
	        "icon": "http://img.baidu.com/hi/jx2/j_0003.gif"
	    }, {
	        "value": "啊！",
	        "icon": "http://img.baidu.com/hi/jx2/j_0004.gif"
	    }, {
	        "value": "背扭",
	        "icon": "http://img.baidu.com/hi/jx2/j_0005.gif"
	    }, {
	        "value": "顶",
	        "icon": "http://img.baidu.com/hi/jx2/j_0006.gif"
	    }, {
	        "value": "抖胸",
	        "icon": "http://img.baidu.com/hi/jx2/j_0007.gif"
	    }, {
	        "value": "88",
	        "icon": "http://img.baidu.com/hi/jx2/j_0008.gif"
	    }, {
	        "value": "汗",
	        "icon": "http://img.baidu.com/hi/jx2/j_0009.gif"
	    }, {
	        "value": "瞌睡",
	        "icon": "http://img.baidu.com/hi/jx2/j_0010.gif"
	    }, {
	        "value": "鲁拉",
	        "icon": "http://img.baidu.com/hi/jx2/j_0011.gif"
	    }, {
	        "value": "拍砖",
	        "icon": "http://img.baidu.com/hi/jx2/j_0012.gif"
	    }, {
	        "value": "揉脸",
	        "icon": "http://img.baidu.com/hi/jx2/j_0013.gif"
	    }, {
	        "value": "生日快乐",
	        "icon": "http://img.baidu.com/hi/jx2/j_0014.gif"
	    }, {
	        "value": "大笑",
	        "icon": "http://img.baidu.com/hi/jx2/j_0015.gif"
	    }, {
	        "value": "瀑布汗~",
	        "icon": "http://img.baidu.com/hi/jx2/j_0016.gif"
	    }, {
	        "value": "惊讶",
	        "icon": "http://img.baidu.com/hi/jx2/j_0017.gif"
	    }, {
	        "value": "臭美",
	        "icon": "http://img.baidu.com/hi/jx2/j_0018.gif"
	    }, {
	        "value": "傻笑",
	        "icon": "http://img.baidu.com/hi/jx2/j_0019.gif"
	    }, {
	        "value": "抛媚眼",
	        "icon": "http://img.baidu.com/hi/jx2/j_0020.gif"
	    }, {
	        "value": "发怒",
	        "icon": "http://img.baidu.com/hi/jx2/j_0021.gif"
	    }, {
	        "value": "打酱油",
	        "icon": "http://img.baidu.com/hi/jx2/j_0022.gif"
	    }, {
	        "value": "俯卧撑",
	        "icon": "http://img.baidu.com/hi/jx2/j_0023.gif"
	    }, {
	        "value": "气愤",
	        "icon": "http://img.baidu.com/hi/jx2/j_0024.gif"
	    }, {
	        "value": "?",
	        "icon": "http://img.baidu.com/hi/jx2/j_0025.gif"
	    }, {
	        "value": "吻",
	        "icon": "http://img.baidu.com/hi/jx2/j_0026.gif"
	    }, {
	        "value": "怒",
	        "icon": "http://img.baidu.com/hi/jx2/j_0027.gif"
	    }, {
	        "value": "胜利",
	        "icon": "http://img.baidu.com/hi/jx2/j_0028.gif"
	    }, {
	        "value": "HI",
	        "icon": "http://img.baidu.com/hi/jx2/j_0029.gif"
	    }, {
	        "value": "KISS",
	        "icon": "http://img.baidu.com/hi/jx2/j_0030.gif"
	    }, {
	        "value": "不说",
	        "icon": "http://img.baidu.com/hi/jx2/j_0031.gif"
	    }, {
	        "value": "不要",
	        "icon": "http://img.baidu.com/hi/jx2/j_0032.gif"
	    }, {
	        "value": "扯花",
	        "icon": "http://img.baidu.com/hi/jx2/j_0033.gif"
	    }, {
	        "value": "大心",
	        "icon": "http://img.baidu.com/hi/jx2/j_0034.gif"
	    }, {
	        "value": "顶",
	        "icon": "http://img.baidu.com/hi/jx2/j_0035.gif"
	    }, {
	        "value": "大惊",
	        "icon": "http://img.baidu.com/hi/jx2/j_0036.gif"
	    }, {
	        "value": "飞吻",
	        "icon": "http://img.baidu.com/hi/jx2/j_0037.gif"
	    }, {
	        "value": "鬼脸",
	        "icon": "http://img.baidu.com/hi/jx2/j_0038.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/jx2/j_0039.gif"
	    }, {
	        "value": "口水",
	        "icon": "http://img.baidu.com/hi/jx2/j_0040.gif"
	    }, {
	        "value": "狂哭",
	        "icon": "http://img.baidu.com/hi/jx2/j_0041.gif"
	    }, {
	        "value": "来",
	        "icon": "http://img.baidu.com/hi/jx2/j_0042.gif"
	    }, {
	        "value": "发财了",
	        "icon": "http://img.baidu.com/hi/jx2/j_0043.gif"
	    }, {
	        "value": "吃西瓜",
	        "icon": "http://img.baidu.com/hi/jx2/j_0044.gif"
	    }, {
	        "value": "套牢",
	        "icon": "http://img.baidu.com/hi/jx2/j_0045.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/jx2/j_0046.gif"
	    }, {
	        "value": "庆祝",
	        "icon": "http://img.baidu.com/hi/jx2/j_0047.gif"
	    }, {
	        "value": "我来了",
	        "icon": "http://img.baidu.com/hi/jx2/j_0048.gif"
	    }, {
	        "value": "敲打",
	        "icon": "http://img.baidu.com/hi/jx2/j_0049.gif"
	    }, {
	        "value": "晕了",
	        "icon": "http://img.baidu.com/hi/jx2/j_0050.gif"
	    }, {
	        "value": "胜利",
	        "icon": "http://img.baidu.com/hi/jx2/j_0051.gif"
	    }, {
	        "value": "臭美",
	        "icon": "http://img.baidu.com/hi/jx2/j_0052.gif"
	    }, {
	        "value": "被打了",
	        "icon": "http://img.baidu.com/hi/jx2/j_0053.gif"
	    }, {
	        "value": "贪吃",
	        "icon": "http://img.baidu.com/hi/jx2/j_0054.gif"
	    }, {
	        "value": "迎接",
	        "icon": "http://img.baidu.com/hi/jx2/j_0055.gif"
	    }, {
	        "value": "酷",
	        "icon": "http://img.baidu.com/hi/jx2/j_0056.gif"
	    }, {
	        "value": "微笑",
	        "icon": "http://img.baidu.com/hi/jx2/j_0057.gif"
	    }, {
	        "value": "亲吻",
	        "icon": "http://img.baidu.com/hi/jx2/j_0058.gif"
	    }, {
	        "value": "调皮",
	        "icon": "http://img.baidu.com/hi/jx2/j_0059.gif"
	    }, {
	        "value": "惊恐",
	        "icon": "http://img.baidu.com/hi/jx2/j_0060.gif"
	    }, {
	        "value": "耍酷",
	        "icon": "http://img.baidu.com/hi/jx2/j_0061.gif"
	    }, {
	        "value": "发火",
	        "icon": "http://img.baidu.com/hi/jx2/j_0062.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/jx2/j_0063.gif"
	    }, {
	        "value": "汗水",
	        "icon": "http://img.baidu.com/hi/jx2/j_0064.gif"
	    }, {
	        "value": "大哭",
	        "icon": "http://img.baidu.com/hi/jx2/j_0065.gif"
	    }, {
	        "value": "",
	        "icon": "http://img.baidu.com/hi/jx2/j_0066.gif"
	    }, {
	        "value": "加油",
	        "icon": "http://img.baidu.com/hi/jx2/j_0067.gif"
	    }, {
	        "value": "困",
	        "icon": "http://img.baidu.com/hi/jx2/j_0068.gif"
	    }, {
	        "value": "你NB",
	        "icon": "http://img.baidu.com/hi/jx2/j_0069.gif"
	    }, {
	        "value": "晕倒",
	        "icon": "http://img.baidu.com/hi/jx2/j_0070.gif"
	    }, {
	        "value": "开心",
	        "icon": "http://img.baidu.com/hi/jx2/j_0071.gif"
	    }, {
	        "value": "偷笑",
	        "icon": "http://img.baidu.com/hi/jx2/j_0072.gif"
	    }, {
	        "value": "大哭",
	        "icon": "http://img.baidu.com/hi/jx2/j_0073.gif"
	    }, {
	        "value": "滴汗",
	        "icon": "http://img.baidu.com/hi/jx2/j_0074.gif"
	    }, {
	        "value": "叹气",
	        "icon": "http://img.baidu.com/hi/jx2/j_0075.gif"
	    }, {
	        "value": "超赞",
	        "icon": "http://img.baidu.com/hi/jx2/j_0076.gif"
	    }, {
	        "value": "??",
	        "icon": "http://img.baidu.com/hi/jx2/j_0077.gif"
	    }, {
	        "value": "飞吻",
	        "icon": "http://img.baidu.com/hi/jx2/j_0078.gif"
	    }, {
	        "value": "天使",
	        "icon": "http://img.baidu.com/hi/jx2/j_0079.gif"
	    }, {
	        "value": "撒花",
	        "icon": "http://img.baidu.com/hi/jx2/j_0080.gif"
	    }, {
	        "value": "生气",
	        "icon": "http://img.baidu.com/hi/jx2/j_0081.gif"
	    }, {
	        "value": "被砸",
	        "icon": "http://img.baidu.com/hi/jx2/j_0082.gif"
	    }, {
	        "value": "吓傻",
	        "icon": "http://img.baidu.com/hi/jx2/j_0083.gif"
	    }, {
	        "value": "随意吐",
	        "icon": "http://img.baidu.com/hi/jx2/j_0084.gif"
	    }],
	    "tsj": [{
	        "value": "Kiss",
	        "icon": "http://img.baidu.com/hi/tsj/t_0001.gif"
	    }, {
	        "value": "Love",
	        "icon": "http://img.baidu.com/hi/tsj/t_0002.gif"
	    }, {
	        "value": "Yeah",
	        "icon": "http://img.baidu.com/hi/tsj/t_0003.gif"
	    }, {
	        "value": "啊！",
	        "icon": "http://img.baidu.com/hi/tsj/t_0004.gif"
	    }, {
	        "value": "背扭",
	        "icon": "http://img.baidu.com/hi/tsj/t_0005.gif"
	    }, {
	        "value": "顶",
	        "icon": "http://img.baidu.com/hi/tsj/t_0006.gif"
	    }, {
	        "value": "抖胸",
	        "icon": "http://img.baidu.com/hi/tsj/t_0007.gif"
	    }, {
	        "value": "88",
	        "icon": "http://img.baidu.com/hi/tsj/t_0008.gif"
	    }, {
	        "value": "汗",
	        "icon": "http://img.baidu.com/hi/tsj/t_0009.gif"
	    }, {
	        "value": "瞌睡",
	        "icon": "http://img.baidu.com/hi/tsj/t_0010.gif"
	    }, {
	        "value": "鲁拉",
	        "icon": "http://img.baidu.com/hi/tsj/t_0011.gif"
	    }, {
	        "value": "拍砖",
	        "icon": "http://img.baidu.com/hi/tsj/t_0012.gif"
	    }, {
	        "value": "揉脸",
	        "icon": "http://img.baidu.com/hi/tsj/t_0013.gif"
	    }, {
	        "value": "生日快乐",
	        "icon": "http://img.baidu.com/hi/tsj/t_0014.gif"
	    }, {
	        "value": "摊手",
	        "icon": "http://img.baidu.com/hi/tsj/t_0015.gif"
	    }, {
	        "value": "睡觉",
	        "icon": "http://img.baidu.com/hi/tsj/t_0016.gif"
	    }, {
	        "value": "瘫坐",
	        "icon": "http://img.baidu.com/hi/tsj/t_0017.gif"
	    }, {
	        "value": "无聊",
	        "icon": "http://img.baidu.com/hi/tsj/t_0018.gif"
	    }, {
	        "value": "星星闪",
	        "icon": "http://img.baidu.com/hi/tsj/t_0019.gif"
	    }, {
	        "value": "旋转",
	        "icon": "http://img.baidu.com/hi/tsj/t_0020.gif"
	    }, {
	        "value": "也不行",
	        "icon": "http://img.baidu.com/hi/tsj/t_0021.gif"
	    }, {
	        "value": "郁闷",
	        "icon": "http://img.baidu.com/hi/tsj/t_0022.gif"
	    }, {
	        "value": "正Music",
	        "icon": "http://img.baidu.com/hi/tsj/t_0023.gif"
	    }, {
	        "value": "抓墙",
	        "icon": "http://img.baidu.com/hi/tsj/t_0024.gif"
	    }, {
	        "value": "撞墙至死",
	        "icon": "http://img.baidu.com/hi/tsj/t_0025.gif"
	    }, {
	        "value": "歪头",
	        "icon": "http://img.baidu.com/hi/tsj/t_0026.gif"
	    }, {
	        "value": "戳眼",
	        "icon": "http://img.baidu.com/hi/tsj/t_0027.gif"
	    }, {
	        "value": "飘过",
	        "icon": "http://img.baidu.com/hi/tsj/t_0028.gif"
	    }, {
	        "value": "互相拍砖",
	        "icon": "http://img.baidu.com/hi/tsj/t_0029.gif"
	    }, {
	        "value": "砍死你",
	        "icon": "http://img.baidu.com/hi/tsj/t_0030.gif"
	    }, {
	        "value": "扔桌子",
	        "icon": "http://img.baidu.com/hi/tsj/t_0031.gif"
	    }, {
	        "value": "少林寺",
	        "icon": "http://img.baidu.com/hi/tsj/t_0032.gif"
	    }, {
	        "value": "什么？",
	        "icon": "http://img.baidu.com/hi/tsj/t_0033.gif"
	    }, {
	        "value": "转头",
	        "icon": "http://img.baidu.com/hi/tsj/t_0034.gif"
	    }, {
	        "value": "我爱牛奶",
	        "icon": "http://img.baidu.com/hi/tsj/t_0035.gif"
	    }, {
	        "value": "我踢",
	        "icon": "http://img.baidu.com/hi/tsj/t_0036.gif"
	    }, {
	        "value": "摇晃",
	        "icon": "http://img.baidu.com/hi/tsj/t_0037.gif"
	    }, {
	        "value": "晕厥",
	        "icon": "http://img.baidu.com/hi/tsj/t_0038.gif"
	    }, {
	        "value": "在笼子里",
	        "icon": "http://img.baidu.com/hi/tsj/t_0039.gif"
	    }, {
	        "value": "震荡",
	        "icon": "http://img.baidu.com/hi/tsj/t_0040.gif"
	    }],
	    "ldw": [{
	        "value": "大笑",
	        "icon": "http://img.baidu.com/hi/ldw/w_0001.gif"
	    }, {
	        "value": "瀑布汗~",
	        "icon": "http://img.baidu.com/hi/ldw/w_0002.gif"
	    }, {
	        "value": "惊讶",
	        "icon": "http://img.baidu.com/hi/ldw/w_0003.gif"
	    }, {
	        "value": "臭美",
	        "icon": "http://img.baidu.com/hi/ldw/w_0004.gif"
	    }, {
	        "value": "傻笑",
	        "icon": "http://img.baidu.com/hi/ldw/w_0005.gif"
	    }, {
	        "value": "抛媚眼",
	        "icon": "http://img.baidu.com/hi/ldw/w_0006.gif"
	    }, {
	        "value": "发怒",
	        "icon": "http://img.baidu.com/hi/ldw/w_0007.gif"
	    }, {
	        "value": "我错了",
	        "icon": "http://img.baidu.com/hi/ldw/w_0008.gif"
	    }, {
	        "value": "money",
	        "icon": "http://img.baidu.com/hi/ldw/w_0009.gif"
	    }, {
	        "value": "气愤",
	        "icon": "http://img.baidu.com/hi/ldw/w_0010.gif"
	    }, {
	        "value": "挑逗",
	        "icon": "http://img.baidu.com/hi/ldw/w_0011.gif"
	    }, {
	        "value": "吻",
	        "icon": "http://img.baidu.com/hi/ldw/w_0012.gif"
	    }, {
	        "value": "怒",
	        "icon": "http://img.baidu.com/hi/ldw/w_0013.gif"
	    }, {
	        "value": "胜利",
	        "icon": "http://img.baidu.com/hi/ldw/w_0014.gif"
	    }, {
	        "value": "委屈",
	        "icon": "http://img.baidu.com/hi/ldw/w_0015.gif"
	    }, {
	        "value": "受伤",
	        "icon": "http://img.baidu.com/hi/ldw/w_0016.gif"
	    }, {
	        "value": "说啥呢？",
	        "icon": "http://img.baidu.com/hi/ldw/w_0017.gif"
	    }, {
	        "value": "闭嘴",
	        "icon": "http://img.baidu.com/hi/ldw/w_0018.gif"
	    }, {
	        "value": "不",
	        "icon": "http://img.baidu.com/hi/ldw/w_0019.gif"
	    }, {
	        "value": "逗你玩儿",
	        "icon": "http://img.baidu.com/hi/ldw/w_0020.gif"
	    }, {
	        "value": "飞吻",
	        "icon": "http://img.baidu.com/hi/ldw/w_0021.gif"
	    }, {
	        "value": "眩晕",
	        "icon": "http://img.baidu.com/hi/ldw/w_0022.gif"
	    }, {
	        "value": "魔法",
	        "icon": "http://img.baidu.com/hi/ldw/w_0023.gif"
	    }, {
	        "value": "我来了",
	        "icon": "http://img.baidu.com/hi/ldw/w_0024.gif"
	    }, {
	        "value": "睡了",
	        "icon": "http://img.baidu.com/hi/ldw/w_0025.gif"
	    }, {
	        "value": "我打",
	        "icon": "http://img.baidu.com/hi/ldw/w_0026.gif"
	    }, {
	        "value": "闭嘴",
	        "icon": "http://img.baidu.com/hi/ldw/w_0027.gif"
	    }, {
	        "value": "打",
	        "icon": "http://img.baidu.com/hi/ldw/w_0028.gif"
	    }, {
	        "value": "打晕了",
	        "icon": "http://img.baidu.com/hi/ldw/w_0029.gif"
	    }, {
	        "value": "刷牙",
	        "icon": "http://img.baidu.com/hi/ldw/w_0030.gif"
	    }, {
	        "value": "爆揍",
	        "icon": "http://img.baidu.com/hi/ldw/w_0031.gif"
	    }, {
	        "value": "炸弹",
	        "icon": "http://img.baidu.com/hi/ldw/w_0032.gif"
	    }, {
	        "value": "倒立",
	        "icon": "http://img.baidu.com/hi/ldw/w_0033.gif"
	    }, {
	        "value": "刮胡子",
	        "icon": "http://img.baidu.com/hi/ldw/w_0034.gif"
	    }, {
	        "value": "邪恶的笑",
	        "icon": "http://img.baidu.com/hi/ldw/w_0035.gif"
	    }, {
	        "value": "不要不要",
	        "icon": "http://img.baidu.com/hi/ldw/w_0036.gif"
	    }, {
	        "value": "爱恋中",
	        "icon": "http://img.baidu.com/hi/ldw/w_0037.gif"
	    }, {
	        "value": "放大仔细看",
	        "icon": "http://img.baidu.com/hi/ldw/w_0038.gif"
	    }, {
	        "value": "偷窥",
	        "icon": "http://img.baidu.com/hi/ldw/w_0039.gif"
	    }, {
	        "value": "超高兴",
	        "icon": "http://img.baidu.com/hi/ldw/w_0040.gif"
	    }, {
	        "value": "晕",
	        "icon": "http://img.baidu.com/hi/ldw/w_0041.gif"
	    }, {
	        "value": "松口气",
	        "icon": "http://img.baidu.com/hi/ldw/w_0042.gif"
	    }, {
	        "value": "我跑",
	        "icon": "http://img.baidu.com/hi/ldw/w_0043.gif"
	    }, {
	        "value": "享受",
	        "icon": "http://img.baidu.com/hi/ldw/w_0044.gif"
	    }, {
	        "value": "修养",
	        "icon": "http://img.baidu.com/hi/ldw/w_0045.gif"
	    }, {
	        "value": "哭",
	        "icon": "http://img.baidu.com/hi/ldw/w_0046.gif"
	    }, {
	        "value": "汗",
	        "icon": "http://img.baidu.com/hi/ldw/w_0047.gif"
	    }, {
	        "value": "啊~",
	        "icon": "http://img.baidu.com/hi/ldw/w_0048.gif"
	    }, {
	        "value": "热烈欢迎",
	        "icon": "http://img.baidu.com/hi/ldw/w_0049.gif"
	    }, {
	        "value": "打酱油",
	        "icon": "http://img.baidu.com/hi/ldw/w_0050.gif"
	    }, {
	        "value": "俯卧撑",
	        "icon": "http://img.baidu.com/hi/ldw/w_0051.gif"
	    }, {
	        "value": "?",
	        "icon": "http://img.baidu.com/hi/ldw/w_0052.gif"
	    }],
	    "bb": [{
	        "value": "HI",
	        "icon": "http://img.baidu.com/hi/bobo/B_0001.gif"
	    }, {
	        "value": "KISS",
	        "icon": "http://img.baidu.com/hi/bobo/B_0002.gif"
	    }, {
	        "value": "不说",
	        "icon": "http://img.baidu.com/hi/bobo/B_0003.gif"
	    }, {
	        "value": "不要",
	        "icon": "http://img.baidu.com/hi/bobo/B_0004.gif"
	    }, {
	        "value": "扯花",
	        "icon": "http://img.baidu.com/hi/bobo/B_0005.gif"
	    }, {
	        "value": "大心",
	        "icon": "http://img.baidu.com/hi/bobo/B_0006.gif"
	    }, {
	        "value": "顶",
	        "icon": "http://img.baidu.com/hi/bobo/B_0007.gif"
	    }, {
	        "value": "大惊",
	        "icon": "http://img.baidu.com/hi/bobo/B_0008.gif"
	    }, {
	        "value": "飞吻",
	        "icon": "http://img.baidu.com/hi/bobo/B_0009.gif"
	    }, {
	        "value": "鬼脸",
	        "icon": "http://img.baidu.com/hi/bobo/B_0010.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/bobo/B_0011.gif"
	    }, {
	        "value": "口水",
	        "icon": "http://img.baidu.com/hi/bobo/B_0012.gif"
	    }, {
	        "value": "狂哭",
	        "icon": "http://img.baidu.com/hi/bobo/B_0013.gif"
	    }, {
	        "value": "来",
	        "icon": "http://img.baidu.com/hi/bobo/B_0014.gif"
	    }, {
	        "value": "泪眼",
	        "icon": "http://img.baidu.com/hi/bobo/B_0015.gif"
	    }, {
	        "value": "流泪",
	        "icon": "http://img.baidu.com/hi/bobo/B_0016.gif"
	    }, {
	        "value": "生气",
	        "icon": "http://img.baidu.com/hi/bobo/B_0017.gif"
	    }, {
	        "value": "吐舌",
	        "icon": "http://img.baidu.com/hi/bobo/B_0018.gif"
	    }, {
	        "value": "喜欢",
	        "icon": "http://img.baidu.com/hi/bobo/B_0019.gif"
	    }, {
	        "value": "旋转",
	        "icon": "http://img.baidu.com/hi/bobo/B_0020.gif"
	    }, {
	        "value": "再见",
	        "icon": "http://img.baidu.com/hi/bobo/B_0021.gif"
	    }, {
	        "value": "抓狂",
	        "icon": "http://img.baidu.com/hi/bobo/B_0022.gif"
	    }, {
	        "value": "汗",
	        "icon": "http://img.baidu.com/hi/bobo/B_0023.gif"
	    }, {
	        "value": "鄙视",
	        "icon": "http://img.baidu.com/hi/bobo/B_0024.gif"
	    }, {
	        "value": "拜",
	        "icon": "http://img.baidu.com/hi/bobo/B_0025.gif"
	    }, {
	        "value": "吐血",
	        "icon": "http://img.baidu.com/hi/bobo/B_0026.gif"
	    }, {
	        "value": "嘘",
	        "icon": "http://img.baidu.com/hi/bobo/B_0027.gif"
	    }, {
	        "value": "打人",
	        "icon": "http://img.baidu.com/hi/bobo/B_0028.gif"
	    }, {
	        "value": "蹦跳",
	        "icon": "http://img.baidu.com/hi/bobo/B_0029.gif"
	    }, {
	        "value": "变脸",
	        "icon": "http://img.baidu.com/hi/bobo/B_0030.gif"
	    }, {
	        "value": "扯肉",
	        "icon": "http://img.baidu.com/hi/bobo/B_0031.gif"
	    }, {
	        "value": "吃To",
	        "icon": "http://img.baidu.com/hi/bobo/B_0032.gif"
	    }, {
	        "value": "吃花",
	        "icon": "http://img.baidu.com/hi/bobo/B_0033.gif"
	    }, {
	        "value": "吹泡泡糖",
	        "icon": "http://img.baidu.com/hi/bobo/B_0034.gif"
	    }, {
	        "value": "大变身",
	        "icon": "http://img.baidu.com/hi/bobo/B_0035.gif"
	    }, {
	        "value": "飞天舞",
	        "icon": "http://img.baidu.com/hi/bobo/B_0036.gif"
	    }, {
	        "value": "回眸",
	        "icon": "http://img.baidu.com/hi/bobo/B_0037.gif"
	    }, {
	        "value": "可怜",
	        "icon": "http://img.baidu.com/hi/bobo/B_0038.gif"
	    }, {
	        "value": "猛抽",
	        "icon": "http://img.baidu.com/hi/bobo/B_0039.gif"
	    }, {
	        "value": "泡泡",
	        "icon": "http://img.baidu.com/hi/bobo/B_0040.gif"
	    }, {
	        "value": "苹果",
	        "icon": "http://img.baidu.com/hi/bobo/B_0041.gif"
	    }, {
	        "value": "亲",
	        "icon": "http://img.baidu.com/hi/bobo/B_0042.gif"
	    }, {
	        "value": "",
	        "icon": "http://img.baidu.com/hi/bobo/B_0043.gif"
	    }, {
	        "value": "骚舞",
	        "icon": "http://img.baidu.com/hi/bobo/B_0044.gif"
	    }, {
	        "value": "烧香",
	        "icon": "http://img.baidu.com/hi/bobo/B_0045.gif"
	    }, {
	        "value": "睡",
	        "icon": "http://img.baidu.com/hi/bobo/B_0046.gif"
	    }, {
	        "value": "套娃娃",
	        "icon": "http://img.baidu.com/hi/bobo/B_0047.gif"
	    }, {
	        "value": "捅捅",
	        "icon": "http://img.baidu.com/hi/bobo/B_0048.gif"
	    }, {
	        "value": "舞倒",
	        "icon": "http://img.baidu.com/hi/bobo/B_0049.gif"
	    }, {
	        "value": "西红柿",
	        "icon": "http://img.baidu.com/hi/bobo/B_0050.gif"
	    }, {
	        "value": "爱慕",
	        "icon": "http://img.baidu.com/hi/bobo/B_0051.gif"
	    }, {
	        "value": "摇",
	        "icon": "http://img.baidu.com/hi/bobo/B_0052.gif"
	    }, {
	        "value": "摇摆",
	        "icon": "http://img.baidu.com/hi/bobo/B_0053.gif"
	    }, {
	        "value": "杂耍",
	        "icon": "http://img.baidu.com/hi/bobo/B_0054.gif"
	    }, {
	        "value": "招财",
	        "icon": "http://img.baidu.com/hi/bobo/B_0055.gif"
	    }, {
	        "value": "被殴",
	        "icon": "http://img.baidu.com/hi/bobo/B_0056.gif"
	    }, {
	        "value": "被球闷",
	        "icon": "http://img.baidu.com/hi/bobo/B_0057.gif"
	    }, {
	        "value": "大惊",
	        "icon": "http://img.baidu.com/hi/bobo/B_0058.gif"
	    }, {
	        "value": "理想",
	        "icon": "http://img.baidu.com/hi/bobo/B_0059.gif"
	    }, {
	        "value": "欧打",
	        "icon": "http://img.baidu.com/hi/bobo/B_0060.gif"
	    }, {
	        "value": "呕吐",
	        "icon": "http://img.baidu.com/hi/bobo/B_0061.gif"
	    }, {
	        "value": "碎",
	        "icon": "http://img.baidu.com/hi/bobo/B_0062.gif"
	    }, {
	        "value": "吐痰",
	        "icon": "http://img.baidu.com/hi/bobo/B_0063.gif"
	    }],
	    "cat": [{
	        "value": "发财了",
	        "icon": "http://img.baidu.com/hi/babycat/C_0001.gif"
	    }, {
	        "value": "吃西瓜",
	        "icon": "http://img.baidu.com/hi/babycat/C_0002.gif"
	    }, {
	        "value": "套牢",
	        "icon": "http://img.baidu.com/hi/babycat/C_0003.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/babycat/C_0004.gif"
	    }, {
	        "value": "庆祝",
	        "icon": "http://img.baidu.com/hi/babycat/C_0005.gif"
	    }, {
	        "value": "我来了",
	        "icon": "http://img.baidu.com/hi/babycat/C_0006.gif"
	    }, {
	        "value": "敲打",
	        "icon": "http://img.baidu.com/hi/babycat/C_0007.gif"
	    }, {
	        "value": "晕了",
	        "icon": "http://img.baidu.com/hi/babycat/C_0008.gif"
	    }, {
	        "value": "胜利",
	        "icon": "http://img.baidu.com/hi/babycat/C_0009.gif"
	    }, {
	        "value": "臭美",
	        "icon": "http://img.baidu.com/hi/babycat/C_0010.gif"
	    }, {
	        "value": "被打了",
	        "icon": "http://img.baidu.com/hi/babycat/C_0011.gif"
	    }, {
	        "value": "贪吃",
	        "icon": "http://img.baidu.com/hi/babycat/C_0012.gif"
	    }, {
	        "value": "迎接",
	        "icon": "http://img.baidu.com/hi/babycat/C_0013.gif"
	    }, {
	        "value": "酷",
	        "icon": "http://img.baidu.com/hi/babycat/C_0014.gif"
	    }, {
	        "value": "顶",
	        "icon": "http://img.baidu.com/hi/babycat/C_0015.gif"
	    }, {
	        "value": "幸运",
	        "icon": "http://img.baidu.com/hi/babycat/C_0016.gif"
	    }, {
	        "value": "爱心",
	        "icon": "http://img.baidu.com/hi/babycat/C_0017.gif"
	    }, {
	        "value": "躲",
	        "icon": "http://img.baidu.com/hi/babycat/C_0018.gif"
	    }, {
	        "value": "送花",
	        "icon": "http://img.baidu.com/hi/babycat/C_0019.gif"
	    }, {
	        "value": "选择",
	        "icon": "http://img.baidu.com/hi/babycat/C_0020.gif"
	    }],
	    "pp": [{
	        "value": "微笑",
	        "icon": "http://img.baidu.com/hi/face/i_f01.gif"
	    }, {
	        "value": "亲吻",
	        "icon": "http://img.baidu.com/hi/face/i_f02.gif"
	    }, {
	        "value": "调皮",
	        "icon": "http://img.baidu.com/hi/face/i_f03.gif"
	    }, {
	        "value": "惊讶",
	        "icon": "http://img.baidu.com/hi/face/i_f04.gif"
	    }, {
	        "value": "耍酷",
	        "icon": "http://img.baidu.com/hi/face/i_f05.gif"
	    }, {
	        "value": "发火",
	        "icon": "http://img.baidu.com/hi/face/i_f06.gif"
	    }, {
	        "value": "害羞",
	        "icon": "http://img.baidu.com/hi/face/i_f07.gif"
	    }, {
	        "value": "汗水",
	        "icon": "http://img.baidu.com/hi/face/i_f08.gif"
	    }, {
	        "value": "大哭",
	        "icon": "http://img.baidu.com/hi/face/i_f09.gif"
	    }, {
	        "value": "得意",
	        "icon": "http://img.baidu.com/hi/face/i_f10.gif"
	    }, {
	        "value": "鄙视",
	        "icon": "http://img.baidu.com/hi/face/i_f11.gif"
	    }, {
	        "value": "困",
	        "icon": "http://img.baidu.com/hi/face/i_f12.gif"
	    }, {
	        "value": "夸奖",
	        "icon": "http://img.baidu.com/hi/face/i_f13.gif"
	    }, {
	        "value": "晕倒",
	        "icon": "http://img.baidu.com/hi/face/i_f14.gif"
	    }, {
	        "value": "疑问",
	        "icon": "http://img.baidu.com/hi/face/i_f15.gif"
	    }, {
	        "value": "媒婆",
	        "icon": "http://img.baidu.com/hi/face/i_f16.gif"
	    }, {
	        "value": "狂吐",
	        "icon": "http://img.baidu.com/hi/face/i_f17.gif"
	    }, {
	        "value": "青蛙",
	        "icon": "http://img.baidu.com/hi/face/i_f18.gif"
	    }, {
	        "value": "发愁",
	        "icon": "http://img.baidu.com/hi/face/i_f19.gif"
	    }, {
	        "value": "亲吻",
	        "icon": "http://img.baidu.com/hi/face/i_f20.gif"
	    }, {
	        "value": "",
	        "icon": "http://img.baidu.com/hi/face/i_f21.gif"
	    }, {
	        "value": "爱心",
	        "icon": "http://img.baidu.com/hi/face/i_f22.gif"
	    }, {
	        "value": "心碎",
	        "icon": "http://img.baidu.com/hi/face/i_f23.gif"
	    }, {
	        "value": "玫瑰",
	        "icon": "http://img.baidu.com/hi/face/i_f24.gif"
	    }, {
	        "value": "礼物",
	        "icon": "http://img.baidu.com/hi/face/i_f25.gif"
	    }, {
	        "value": "哭",
	        "icon": "http://img.baidu.com/hi/face/i_f26.gif"
	    }, {
	        "value": "奸笑",
	        "icon": "http://img.baidu.com/hi/face/i_f27.gif"
	    }, {
	        "value": "可爱",
	        "icon": "http://img.baidu.com/hi/face/i_f28.gif"
	    }, {
	        "value": "得意",
	        "icon": "http://img.baidu.com/hi/face/i_f29.gif"
	    }, {
	        "value": "呲牙",
	        "icon": "http://img.baidu.com/hi/face/i_f30.gif"
	    }, {
	        "value": "暴汗",
	        "icon": "http://img.baidu.com/hi/face/i_f31.gif"
	    }, {
	        "value": "楚楚可怜",
	        "icon": "http://img.baidu.com/hi/face/i_f32.gif"
	    }, {
	        "value": "困",
	        "icon": "http://img.baidu.com/hi/face/i_f33.gif"
	    }, {
	        "value": "哭",
	        "icon": "http://img.baidu.com/hi/face/i_f34.gif"
	    }, {
	        "value": "生气",
	        "icon": "http://img.baidu.com/hi/face/i_f35.gif"
	    }, {
	        "value": "惊讶",
	        "icon": "http://img.baidu.com/hi/face/i_f36.gif"
	    }, {
	        "value": "口水",
	        "icon": "http://img.baidu.com/hi/face/i_f37.gif"
	    }, {
	        "value": "彩虹",
	        "icon": "http://img.baidu.com/hi/face/i_f38.gif"
	    }, {
	        "value": "夜空",
	        "icon": "http://img.baidu.com/hi/face/i_f39.gif"
	    }, {
	        "value": "太阳",
	        "icon": "http://img.baidu.com/hi/face/i_f40.gif"
	    }, {
	        "value": "钱钱",
	        "icon": "http://img.baidu.com/hi/face/i_f41.gif"
	    }, {
	        "value": "灯泡",
	        "icon": "http://img.baidu.com/hi/face/i_f42.gif"
	    }, {
	        "value": "咖啡",
	        "icon": "http://img.baidu.com/hi/face/i_f43.gif"
	    }, {
	        "value": "蛋糕",
	        "icon": "http://img.baidu.com/hi/face/i_f44.gif"
	    }, {
	        "value": "音乐",
	        "icon": "http://img.baidu.com/hi/face/i_f45.gif"
	    }, {
	        "value": "爱",
	        "icon": "http://img.baidu.com/hi/face/i_f46.gif"
	    }, {
	        "value": "胜利",
	        "icon": "http://img.baidu.com/hi/face/i_f47.gif"
	    }, {
	        "value": "赞",
	        "icon": "http://img.baidu.com/hi/face/i_f48.gif"
	    }, {
	        "value": "鄙视",
	        "icon": "http://img.baidu.com/hi/face/i_f49.gif"
	    }, {
	        "value": "OK",
	        "icon": "http://img.baidu.com/hi/face/i_f50.gif"
	    }],
	    "youa": [{
	        "value": "男兜",
	        "icon": "http://img.baidu.com/hi/youa/y_0001.gif"
	    }, {
	        "value": "女兜",
	        "icon": "http://img.baidu.com/hi/youa/y_0002.gif"
	    }, {
	        "value": "开心",
	        "icon": "http://img.baidu.com/hi/youa/y_0003.gif"
	    }, {
	        "value": "乖乖",
	        "icon": "http://img.baidu.com/hi/youa/y_0004.gif"
	    }, {
	        "value": "偷笑",
	        "icon": "http://img.baidu.com/hi/youa/y_0005.gif"
	    }, {
	        "value": "大笑",
	        "icon": "http://img.baidu.com/hi/youa/y_0006.gif"
	    }, {
	        "value": "抽泣",
	        "icon": "http://img.baidu.com/hi/youa/y_0007.gif"
	    }, {
	        "value": "大哭",
	        "icon": "http://img.baidu.com/hi/youa/y_0008.gif"
	    }, {
	        "value": "无奈",
	        "icon": "http://img.baidu.com/hi/youa/y_0009.gif"
	    }, {
	        "value": "滴汗",
	        "icon": "http://img.baidu.com/hi/youa/y_0010.gif"
	    }, {
	        "value": "叹气",
	        "icon": "http://img.baidu.com/hi/youa/y_0011.gif"
	    }, {
	        "value": "狂晕",
	        "icon": "http://img.baidu.com/hi/youa/y_0012.gif"
	    }, {
	        "value": "委屈",
	        "icon": "http://img.baidu.com/hi/youa/y_0013.gif"
	    }, {
	        "value": "超赞",
	        "icon": "http://img.baidu.com/hi/youa/y_0014.gif"
	    }, {
	        "value": "??",
	        "icon": "http://img.baidu.com/hi/youa/y_0015.gif"
	    }, {
	        "value": "疑问",
	        "icon": "http://img.baidu.com/hi/youa/y_0016.gif"
	    }, {
	        "value": "飞吻",
	        "icon": "http://img.baidu.com/hi/youa/y_0017.gif"
	    }, {
	        "value": "天使",
	        "icon": "http://img.baidu.com/hi/youa/y_0018.gif"
	    }, {
	        "value": "撒花",
	        "icon": "http://img.baidu.com/hi/youa/y_0019.gif"
	    }, {
	        "value": "生气",
	        "icon": "http://img.baidu.com/hi/youa/y_0020.gif"
	    }, {
	        "value": "被砸",
	        "icon": "http://img.baidu.com/hi/youa/y_0021.gif"
	    }, {
	        "value": "口水",
	        "icon": "http://img.baidu.com/hi/youa/y_0022.gif"
	    }, {
	        "value": "泪奔",
	        "icon": "http://img.baidu.com/hi/youa/y_0023.gif"
	    }, {
	        "value": "吓傻",
	        "icon": "http://img.baidu.com/hi/youa/y_0024.gif"
	    }, {
	        "value": "吐舌头",
	        "icon": "http://img.baidu.com/hi/youa/y_0025.gif"
	    }, {
	        "value": "点头",
	        "icon": "http://img.baidu.com/hi/youa/y_0026.gif"
	    }, {
	        "value": "随意吐",
	        "icon": "http://img.baidu.com/hi/youa/y_0027.gif"
	    }, {
	        "value": "旋转",
	        "icon": "http://img.baidu.com/hi/youa/y_0028.gif"
	    }, {
	        "value": "困困",
	        "icon": "http://img.baidu.com/hi/youa/y_0029.gif"
	    }, {
	        "value": "鄙视",
	        "icon": "http://img.baidu.com/hi/youa/y_0030.gif"
	    }, {
	        "value": "狂顶",
	        "icon": "http://img.baidu.com/hi/youa/y_0031.gif"
	    }, {
	        "value": "篮球",
	        "icon": "http://img.baidu.com/hi/youa/y_0032.gif"
	    }, {
	        "value": "再见",
	        "icon": "http://img.baidu.com/hi/youa/y_0033.gif"
	    }, {
	        "value": "欢迎光临",
	        "icon": "http://img.baidu.com/hi/youa/y_0034.gif"
	    }, {
	        "value": "恭喜发财",
	        "icon": "http://img.baidu.com/hi/youa/y_0035.gif"
	    }, {
	        "value": "稍等",
	        "icon": "http://img.baidu.com/hi/youa/y_0036.gif"
	    }, {
	        "value": "我在线",
	        "icon": "http://img.baidu.com/hi/youa/y_0037.gif"
	    }, {
	        "value": "恕不议价",
	        "icon": "http://img.baidu.com/hi/youa/y_0038.gif"
	    }, {
	        "value": "库房有货",
	        "icon": "http://img.baidu.com/hi/youa/y_0039.gif"
	    }, {
	        "value": "货在路上",
	        "icon": "http://img.baidu.com/hi/youa/y_0040.gif"
	    }]
	};
	//优酷的表情
	var YOUKU_EMOTION = {
	    default: [{
	        "value": "赞",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Yo17_b004bfd.gif"
	    }, {
	        "value": "稀饭",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo7_7763f6e.gif"
	    }, {
	        "value": "愤怒",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo4_502d0ea.gif"
	    }, {
	        "value": "吐",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo14_96290a9.gif"
	    }, {
	        "value": "无语",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo5_3759641.gif"
	    }, {
	        "value": "难过",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Yo2_e99eaf1.gif"
	    }, {
	        "value": "汗",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo11_26573f1.gif"
	    }, {
	        "value": "搞笑",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo12_befe041.gif"
	    }, {
	        "value": "牛",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Zoo7_b50c0f1.gif"
	    }, {
	        "value": "强",
	        "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Zoo8_92b3fdf.gif"
	    }]
	};
	var Emotions = {
	    /**
	     * 表情数据
	     */
	    emotions: {},

	    /**
	     * 追加表情数据
	     * @param vendor
	     * @param data
	     */
	    append: function (vendor, data) {
	        this.emotions[vendor] = data;
	    },

	    /**
	     * 获取emotion数据
	     * @param name
	     * @returns {}
	     */
	    getEmotion: function (name) {
	        var splits = name.split('.');
	        if (splits.length == 2) {
	            return this.emotions[splits[0]][splits[1]];
	        } else if (splits.length == 1) {
	            return this.emotions[splits[0]];
	        }
	    }
	};
	//写入表情数据
	Emotions.append('baidu', BAIDU_EMOTION);
	Emotions.append('youku', YOUKU_EMOTION);

	module.exports = Emotions;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);