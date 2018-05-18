webpackJsonp([3],{

/***/ "./assets/js/book.js":
/*!***************************!*\
  !*** ./assets/js/book.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(/*! ../modules/common.js */ "./assets/modules/common.js");

var _highlight = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/lib/index.js");

var _highlight2 = _interopRequireDefault(_highlight);

var _socialShareButton = __webpack_require__(/*! social-share-button.js */ "./node_modules/social-share-button.js/dist/social-share.min.js");

var _socialShareButton2 = _interopRequireDefault(_socialShareButton);

var _nprogress = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");

var _nprogress2 = _interopRequireDefault(_nprogress);

__webpack_require__(/*! jquery-pjax */ "./node_modules/jquery-pjax/jquery.pjax.js");

var _ajaxtab = __webpack_require__(/*! ../modules/ajaxtab */ "./assets/modules/ajaxtab.js");

var _ajaxtab2 = _interopRequireDefault(_ajaxtab);

var _util = __webpack_require__(/*! ../modules/util */ "./assets/modules/util.js");

var _util2 = _interopRequireDefault(_util);

var _actions = __webpack_require__(/*! ../modules/actions */ "./assets/modules/actions.js");

var _buttonLock = __webpack_require__(/*! ../modules/button-lock.js */ "./assets/modules/button-lock.js");

var _buttonLock2 = _interopRequireDefault(_buttonLock);

var _inlineAttachment = __webpack_require__(/*! ../modules/inline-attachment */ "./assets/modules/inline-attachment.js");

var _inlineAttachment2 = _interopRequireDefault(_inlineAttachment);

var _simplemde = __webpack_require__(/*! simplemde */ "./node_modules/simplemde/src/js/simplemde.js");

var _simplemde2 = _interopRequireDefault(_simplemde);

var _qrcodePayment = __webpack_require__(/*! ../modules/qrcode-payment */ "./assets/modules/qrcode-payment.js");

var _qrcodePayment2 = _interopRequireDefault(_qrcodePayment);

var _blueimpMd = __webpack_require__(/*! blueimp-md5 */ "./node_modules/blueimp-md5/js/md5.js");

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//电子书详情页面
var $bookDetails = $('#book-details');
$bookDetails.length > 0 && function ($) {
    new _ajaxtab2.default($('[data-pjax-container]'), {
        container: '#book-details',
        loader: '#loader',
        before: function before(container) {
            _util2.default.htmlPlaceholder(container);
        },
        success: function success(container) {
            new _actions.FollowUserIntialization(container);
            initBookSummary();
        }
    });
    function initBookSummary() {
        var $addChapter = $bookDetails.find('[data-role="add-chapter"]');
        var btnLock = (0, _buttonLock2.default)($addChapter);
        $addChapter.on('click', function () {
            if (btnLock.isDisabled()) {
                return false;
            }
            btnLock.lock();
            _util2.default.dialog.inputs(Translator.trans('book.chapter_name'), [{ name: 'title', required: true }], {
                messages: {
                    title: {
                        "required": Translator.trans('book.required_chapter_name')
                    }
                }
            }, {
                'okValue': Translator.trans('ui.create'),
                'cancelValue': Translator.trans('ui.cancel'),
                width: 350
            }).then(function (data) {
                console.log(data);
                _util2.default.request('book.add_summary', { slug: window.book.slug }, data).done(function () {
                    location.reload();
                }).fail(function () {
                    _util2.default.dialog.message(Translator.trans('book.create_chapter_error')).flash();
                });
                btnLock.release();
            }, function () {
                btnLock.release();
            });
        });
        //处理action
        var $bookChapters = $bookDetails.find('[data-role="chapter"]');
        $bookChapters.each(function () {
            var $this = $(this);
            var $edit = $this.find('[data-role="edit"]');
            var $addSub = $this.find('[data-role="add-sub"]');
            var $delete = $this.find('[data-role="delete"]');
            var $move = $this.find('[data-role="move"]');

            $edit.on('click', function () {
                _util2.default.dialog.inputs(Translator.trans('book.chapter_name'), [{
                    name: 'title',
                    default: $this.data('title'),
                    required: true
                }], {
                    messages: {
                        title: {
                            "required": Translator.trans('book.required_chapter_name')
                        }
                    }
                }, {
                    'okValue': Translator.trans('ui.create'),
                    'cancelValue': Translator.trans('ui.cancel'),
                    width: 350
                }).then(function (data) {
                    _util2.default.request('book.edit_summary', { slug: window.book.slug, id: $this.data('id') }, data).done(function () {
                        location.reload();
                    }).fail(function () {
                        _util2.default.dialog.message(Translator.trans('book.edit_chapter_error')).flash();
                    });
                }, function () {});
            });
            var deleteLock = (0, _buttonLock2.default)($delete);
            $delete.on('click', function () {
                "use strict";

                if (deleteLock.isDisabled()) {
                    return false;
                }
                deleteLock.lock();
                _util2.default.dialog.confirm(Translator.trans('book.confirm_remove_chapter')).then(function () {
                    var $chapter = $delete.closest('[data-role="sub-chapter"]');
                    if ($chapter.length === 0) {
                        $chapter = $delete.closest('[data-role="chapter"]');
                    }
                    var chapterId = $chapter.data('id');
                    _util2.default.request('post.delete', chapterId).done(function () {
                        _util2.default.dialog.message(Translator.trans('book.remove_success')).flash(function () {
                            location.reload();
                        });
                    }).fail(function () {
                        _util2.default.dialog.message(Translator.trans('book.remove_error')).flash();
                    }).always(function () {
                        deleteLock.release();
                    });
                }, function () {
                    deleteLock.release();
                });
            });
            var moveLock = (0, _buttonLock2.default)($move);
            $move.on('click', function () {
                var $this = $(this);
                "use strict";
                if (moveLock.isDisabled()) {
                    return false;
                }
                moveLock.lock();
                var $chapter = $this.closest('[data-role="sub-chapter"]');
                if ($chapter.length === 0) {
                    $chapter = $this.closest('[data-role="chapter"]');
                }
                var chapterId = $chapter.data('id');
                _util2.default.request('book.move_chapter', { slug: window.book.slug, id: chapterId }, {
                    'direction': $(this).data('direction') || 'up',
                    'step': 1
                }).done(function () {
                    location.reload();
                }).fail(function () {
                    _util2.default.dialog.message(Translator.trans('book.move_error')).flash();
                }).always(function () {
                    moveLock.release();
                });
            });
        });
    }
    initBookSummary();
}($);

//添加章节
var chapterBody = document.getElementById('chapter_originalBody');
var $chapterBody = $(chapterBody);
$chapterBody.length > 0 && function ($) {
    var $postTitle = $('#chapter_title');
    var $addChapterForm = $('#add-chapter-form');
    var $addChapterBtn = $('[data-action="add-chapter"]');

    var simplemde = new _simplemde2.default({
        element: chapterBody,
        autofocus: true,
        spellChecker: false,
        status: false,
        indentWithTabs: false,
        tabSize: 4,
        autosave: {
            enabled: true,
            uniqueId: 'chapter_' + (0, _blueimpMd2.default)(location.pathname),
            delay: 1000
        },
        toolbar: ["bold", "italic", "heading", "|", "quote", "code", "table", "horizontal-rule", "unordered-list", "ordered-list", "|", "link", "image", "|", "side-by-side", "fullscreen", "preview", "|", {
            name: 'guide',
            action: 'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
            className: 'fa fa-info-circle',
            title: Translator.trans('editor.markdown_synax')
        }]
    });
    new _inlineAttachment2.default(simplemde.codemirror); //处理附件上传的功能
    $addChapterBtn.on('click', function () {
        if ($postTitle.val().length === 0) {
            _util2.default.dialog.message(Translator.trans('book.validation.name')).flash();
            return false;
        }
        var buttonLock = (0, _buttonLock2.default)($addChapterBtn).lock();
        _util2.default.dialog.confirm(Translator.trans('book.confirm_publish')).then(function () {
            $addChapterForm.submit();
            return true;
        }, function () {
            buttonLock.release();
            return false;
        });
        return false;
    });

    //添加文章验证
    $addChapterForm.validate({
        rules: {
            'chapter[title]': {
                required: true,
                rangelength: [2, 50]
            }
        },
        messages: {
            'chapter[title]': {
                required: Translator.trans('book.chapter.validation.title.required'),
                rangelength: Translator.trans('book.chapter.validation.title.length_between')
            }
        }
    });
}($);

//电子书阅读页面
var $bookView = $('[data-role="book-view"]');
$bookView.length > 0 && function ($) {
    var $bookSummary = $bookView.find('[data-role="summary"]');
    var $summaryToggleBtn = $bookView.find('[data-role="toggle-summary"]');
    $summaryToggleBtn.on('click', function () {
        $bookView.toggleClass('with-summary');
    });
    //分享
    new _socialShareButton2.default($bookView.find('[data-role="social-share"]'), {
        'theme': 'dark-square',
        'facebook': false,
        'twitter': false
    });
    //代码高亮
    $('pre code').each(function (i, block) {
        _highlight2.default.highlightBlock(block);
    });

    (function ($) {
        var $document = $(document);
        var $characters = $bookSummary.find('li.chapter');
        $.pjax.defaults.timeout = 50000;
        $(document).pjax('ul.summary li a', '#pjax-container');
        $document.on('pjax:start', function () {
            _nprogress2.default.start();
        });
        $document.on('pjax:end', function (event) {
            if (event.relatedTarget) {
                var $relatedTarget = $(event.relatedTarget);
                $characters.removeClass('active');
                $bookSummary.find('li.sub-chapter-item').removeClass('active');
                var $subCharacters = $relatedTarget.closest('.sub-chapter');
                if ($subCharacters.length > 0) {
                    $relatedTarget.closest('.sub-chapter-item').addClass('active');
                } else {
                    $relatedTarget.closest('.chapter').addClass('active');
                }
            }
            //代码高亮
            $('pre code').each(function (i, block) {
                _highlight2.default.highlightBlock(block);
            });
            _nprogress2.default.done();
        });
    })($);

    //购买
    var $buy = $('[data-role="buy"]');
    $buy.length > 0 && function () {
        var buttonLock = (0, _buttonLock2.default)($buy);
        var slug = $buy.data('slug');
        $buy.on('click', function () {
            var wait = _util2.default.dialog.wait.ballPulse();
            _util2.default.request('category.follow', { 'slug': slug }).done(function (response) {
                if (response.require_payment) {
                    new _qrcodePayment2.default(response.qrcode);
                    return;
                } else {
                    location.reload();
                }
            }).fail(function (response) {
                _util2.default.dialog.message(response.responseJSON.error).flash();
            }).always(function () {
                wait.close();
                buttonLock.release();
            });
        });
    }($);
}($);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./assets/modules/ajaxtab.js":
/*!***********************************!*\
  !*** ./assets/modules/ajaxtab.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

__webpack_require__(/*! jquery-pjax */ "./node_modules/jquery-pjax/jquery.pjax.js");

var _util = __webpack_require__(/*! ../modules/util.js */ "./assets/modules/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AjaxTab = function AjaxTab($element, options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, AjaxTab);

    $.pjax.defaults.timeout = 50000;

    this.element = $element;
    this.container = $(options.container);
    this.element.pjax('li a', options.container);
    this.options = options;
    this.element.on('pjax:click', function (event) {
        var $target = $(event.target);
        var $selfTab = $target.parent();
        $selfTab.siblings().removeClass('active').end().addClass('active');
    });

    this.loader = $(this.options.loader);

    //绑定事件
    $(document).on('pjax:beforeSend', function (event, xhr, options) {
        if (typeof _this.options.before === 'function') {
            _this.options.before.call(_this, _this.container, xhr);
        }
        _this.loader.show();
    });

    $(document).on('pjax:success', function (event, data, status, xhr, options) {
        if (typeof _this.options.success === 'function') {
            _this.options.success.call(_this, _this.container, xhr, data, status, options);
        }
    });

    $(document).on('pjax:complete', function (event, xhr, textStatus, options) {
        if (typeof _this.options.complete === 'function') {
            _this.options.complete.call(_this, event, xhr, textStatus, options);
        }
        _this.loader.hide();
    });

    // Util.htmlPlaceholder(this.container);
};

exports.default = AjaxTab;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./assets/modules/inline-attachment.js":
/*!*********************************************!*\
  !*** ./assets/modules/inline-attachment.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

__webpack_require__(/*! inline-attachment/src/inline-attachment.js */ "./node_modules/inline-attachment/src/inline-attachment.js");

__webpack_require__(/*! inline-attachment/src/jquery.inline-attachment.js */ "./node_modules/inline-attachment/src/jquery.inline-attachment.js");

__webpack_require__(/*! inline-attachment/src/codemirror-4.inline-attachment.js */ "./node_modules/inline-attachment/src/codemirror-4.inline-attachment.js");

var _jquery = __webpack_require__(/*! jquery */ "jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _util = __webpack_require__(/*! ./util.js */ "./assets/modules/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var InlineAttachment = function InlineAttachment(element, options) {
    (0, _classCallCheck3.default)(this, InlineAttachment);

    options = _jquery2.default.extend({
        uploadUrl: _util2.default.route.getRoutePath('upload'),
        jsonFieldName: 'path'
    }, options);
    if (element instanceof _jquery2.default) {
        element.inlineattachment(options);
    } else {
        inlineAttachment.editors.codemirror4.attach(element, options);
    }
};

exports.default = InlineAttachment;

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/blueimp-md5/js/md5.js":
/*!********************************************!*\
  !*** ./node_modules/blueimp-md5/js/md5.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[((len + 64) >>> 9 << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return md5
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
})(this)


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/codemirror-spell-checker/src/js/spell-checker.js":
/*!***********************************************************************!*\
  !*** ./node_modules/codemirror-spell-checker/src/js/spell-checker.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)



// Requires
var Typo = __webpack_require__(/*! typo-js */ "./node_modules/typo-js/typo.js");


// Create function
function CodeMirrorSpellChecker(options) {
	// Initialize
	options = options || {};


	// Verify
	if(typeof options.codeMirrorInstance !== "function" || typeof options.codeMirrorInstance.defineMode !== "function") {
		console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`");
		return;
	}


	// Because some browsers don't support this functionality yet
	if(!String.prototype.includes) {
		String.prototype.includes = function() {
			"use strict";
			return String.prototype.indexOf.apply(this, arguments) !== -1;
		};
	}


	// Define the new mode
	options.codeMirrorInstance.defineMode("spell-checker", function(config) {
		// Load AFF/DIC data
		if(!CodeMirrorSpellChecker.aff_loading) {
			CodeMirrorSpellChecker.aff_loading = true;
			var xhr_aff = new XMLHttpRequest();
			xhr_aff.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", true);
			xhr_aff.onload = function() {
				if(xhr_aff.readyState === 4 && xhr_aff.status === 200) {
					CodeMirrorSpellChecker.aff_data = xhr_aff.responseText;
					CodeMirrorSpellChecker.num_loaded++;

					if(CodeMirrorSpellChecker.num_loaded == 2) {
						CodeMirrorSpellChecker.typo = new Typo("en_US", CodeMirrorSpellChecker.aff_data, CodeMirrorSpellChecker.dic_data, {
							platform: "any"
						});
					}
				}
			};
			xhr_aff.send(null);
		}

		if(!CodeMirrorSpellChecker.dic_loading) {
			CodeMirrorSpellChecker.dic_loading = true;
			var xhr_dic = new XMLHttpRequest();
			xhr_dic.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", true);
			xhr_dic.onload = function() {
				if(xhr_dic.readyState === 4 && xhr_dic.status === 200) {
					CodeMirrorSpellChecker.dic_data = xhr_dic.responseText;
					CodeMirrorSpellChecker.num_loaded++;

					if(CodeMirrorSpellChecker.num_loaded == 2) {
						CodeMirrorSpellChecker.typo = new Typo("en_US", CodeMirrorSpellChecker.aff_data, CodeMirrorSpellChecker.dic_data, {
							platform: "any"
						});
					}
				}
			};
			xhr_dic.send(null);
		}


		// Define what separates a word
		var rx_word = "!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ";


		// Create the overlay and such
		var overlay = {
			token: function(stream) {
				var ch = stream.peek();
				var word = "";

				if(rx_word.includes(ch)) {
					stream.next();
					return null;
				}

				while((ch = stream.peek()) != null && !rx_word.includes(ch)) {
					word += ch;
					stream.next();
				}

				if(CodeMirrorSpellChecker.typo && !CodeMirrorSpellChecker.typo.check(word))
					return "spell-error"; // CSS class: cm-spell-error

				return null;
			}
		};

		var mode = options.codeMirrorInstance.getMode(
			config, config.backdrop || "text/plain"
		);

		return options.codeMirrorInstance.overlayMode(mode, overlay, true);
	});
}


// Initialize data globally to reduce memory consumption
CodeMirrorSpellChecker.num_loaded = 0;
CodeMirrorSpellChecker.aff_loading = false;
CodeMirrorSpellChecker.dic_loading = false;
CodeMirrorSpellChecker.aff_data = "";
CodeMirrorSpellChecker.dic_data = "";
CodeMirrorSpellChecker.typo;


// Export
module.exports = CodeMirrorSpellChecker;

/***/ }),

/***/ "./node_modules/codemirror/addon/display/fullscreen.js":
/*!*************************************************************!*\
  !*** ./node_modules/codemirror/addon/display/fullscreen.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("fullScreen", false, function(cm, val, old) {
    if (old == CodeMirror.Init) old = false;
    if (!old == !val) return;
    if (val) setFullscreen(cm);
    else setNormal(cm);
  });

  function setFullscreen(cm) {
    var wrap = cm.getWrapperElement();
    cm.state.fullScreenRestore = {scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset,
                                  width: wrap.style.width, height: wrap.style.height};
    wrap.style.width = "";
    wrap.style.height = "auto";
    wrap.className += " CodeMirror-fullscreen";
    document.documentElement.style.overflow = "hidden";
    cm.refresh();
  }

  function setNormal(cm) {
    var wrap = cm.getWrapperElement();
    wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, "");
    document.documentElement.style.overflow = "";
    var info = cm.state.fullScreenRestore;
    wrap.style.width = info.width; wrap.style.height = info.height;
    window.scrollTo(info.scrollLeft, info.scrollTop);
    cm.refresh();
  }
});


/***/ }),

/***/ "./node_modules/codemirror/addon/display/placeholder.js":
/*!**************************************************************!*\
  !*** ./node_modules/codemirror/addon/display/placeholder.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineOption("placeholder", "", function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.on("blur", onBlur);
      cm.on("change", onChange);
      cm.on("swapDoc", onChange);
      onChange(cm);
    } else if (!val && prev) {
      cm.off("blur", onBlur);
      cm.off("change", onChange);
      cm.off("swapDoc", onChange);
      clearPlaceholder(cm);
      var wrapper = cm.getWrapperElement();
      wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
    }

    if (val && !cm.hasFocus()) onBlur(cm);
  });

  function clearPlaceholder(cm) {
    if (cm.state.placeholder) {
      cm.state.placeholder.parentNode.removeChild(cm.state.placeholder);
      cm.state.placeholder = null;
    }
  }
  function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.style.direction = cm.getOption("direction");
    elt.className = "CodeMirror-placeholder";
    var placeHolder = cm.getOption("placeholder")
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder)
    elt.appendChild(placeHolder)
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }

  function onBlur(cm) {
    if (isEmpty(cm)) setPlaceholder(cm);
  }
  function onChange(cm) {
    var wrapper = cm.getWrapperElement(), empty = isEmpty(cm);
    wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" : "");

    if (empty) setPlaceholder(cm);
    else clearPlaceholder(cm);
  }

  function isEmpty(cm) {
    return (cm.lineCount() === 1) && (cm.getLine(0) === "");
  }
});


/***/ }),

/***/ "./node_modules/codemirror/addon/edit/continuelist.js":
/*!************************************************************!*\
  !*** ./node_modules/codemirror/addon/edit/continuelist.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
      emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
      unorderedListRE = /[*+-]\s/;

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    var ranges = cm.listSelections(), replacements = [];
    for (var i = 0; i < ranges.length; i++) {
      var pos = ranges[i].head;
      var eolState = cm.getStateAfter(pos.line);
      var inList = eolState.list !== false;
      var inQuote = eolState.quote !== 0;

      var line = cm.getLine(pos.line), match = listRE.exec(line);
      var cursorBeforeBullet = /^\s*$/.test(line.slice(0, pos.ch));
      if (!ranges[i].empty() || (!inList && !inQuote) || !match || cursorBeforeBullet) {
        cm.execCommand("newlineAndIndent");
        return;
      }
      if (emptyListRE.test(line)) {
        if (!/>\s*$/.test(line)) cm.replaceRange("", {
          line: pos.line, ch: 0
        }, {
          line: pos.line, ch: pos.ch + 1
        });
        replacements[i] = "\n";
      } else {
        var indent = match[1], after = match[5];
        var numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
        var bullet = numbered ? (parseInt(match[3], 10) + 1) + match[4] : match[2].replace("x", " ");
        replacements[i] = "\n" + indent + bullet + after;

        if (numbered) incrementRemainingMarkdownListNumbers(cm, pos);
      }
    }

    cm.replaceSelections(replacements);
  };

  // Auto-updating Markdown list numbers when a new item is added to the
  // middle of a list
  function incrementRemainingMarkdownListNumbers(cm, pos) {
    var startLine = pos.line, lookAhead = 0, skipCount = 0;
    var startItem = listRE.exec(cm.getLine(startLine)), startIndent = startItem[1];

    do {
      lookAhead += 1;
      var nextLineNumber = startLine + lookAhead;
      var nextLine = cm.getLine(nextLineNumber), nextItem = listRE.exec(nextLine);

      if (nextItem) {
        var nextIndent = nextItem[1];
        var newNumber = (parseInt(startItem[3], 10) + lookAhead - skipCount);
        var nextNumber = (parseInt(nextItem[3], 10)), itemNumber = nextNumber;

        if (startIndent === nextIndent && !isNaN(nextNumber)) {
          if (newNumber === nextNumber) itemNumber = nextNumber + 1;
          if (newNumber > nextNumber) itemNumber = newNumber + 1;
          cm.replaceRange(
            nextLine.replace(listRE, nextIndent + itemNumber + nextItem[4] + nextItem[5]),
          {
            line: nextLineNumber, ch: 0
          }, {
            line: nextLineNumber, ch: nextLine.length
          });
        } else {
          if (startIndent.length > nextIndent.length) return;
          // This doesn't run if the next line immediatley indents, as it is
          // not clear of the users intention (new indented item or same level)
          if ((startIndent.length < nextIndent.length) && (lookAhead === 1)) return;
          skipCount += 1;
        }
      }
    } while (nextItem);
  }
});


/***/ }),

/***/ "./node_modules/codemirror/addon/mode/overlay.js":
/*!*******************************************************!*\
  !*** ./node_modules/codemirror/addon/mode/overlay.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Utility function that allows modes to be combined. The mode given
// as the base argument takes care of most of the normal mode
// functionality, but a second (typically simple) mode is used, which
// can override the style of text. Both modes get to parse all of the
// text, but when both assign a non-null style to a piece of code, the
// overlay wins, unless the combine argument was true and not overridden,
// or state.overlay.combineTokens was true, in which case the styles are
// combined.

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.overlayMode = function(base, overlay, combine) {
  return {
    startState: function() {
      return {
        base: CodeMirror.startState(base),
        overlay: CodeMirror.startState(overlay),
        basePos: 0, baseCur: null,
        overlayPos: 0, overlayCur: null,
        streamSeen: null
      };
    },
    copyState: function(state) {
      return {
        base: CodeMirror.copyState(base, state.base),
        overlay: CodeMirror.copyState(overlay, state.overlay),
        basePos: state.basePos, baseCur: null,
        overlayPos: state.overlayPos, overlayCur: null
      };
    },

    token: function(stream, state) {
      if (stream != state.streamSeen ||
          Math.min(state.basePos, state.overlayPos) < stream.start) {
        state.streamSeen = stream;
        state.basePos = state.overlayPos = stream.start;
      }

      if (stream.start == state.basePos) {
        state.baseCur = base.token(stream, state.base);
        state.basePos = stream.pos;
      }
      if (stream.start == state.overlayPos) {
        stream.pos = stream.start;
        state.overlayCur = overlay.token(stream, state.overlay);
        state.overlayPos = stream.pos;
      }
      stream.pos = Math.min(state.basePos, state.overlayPos);

      // state.overlay.combineTokens always takes precedence over combine,
      // unless set to null
      if (state.overlayCur == null) return state.baseCur;
      else if (state.baseCur != null &&
               state.overlay.combineTokens ||
               combine && state.overlay.combineTokens == null)
        return state.baseCur + " " + state.overlayCur;
      else return state.overlayCur;
    },

    indent: base.indent && function(state, textAfter) {
      return base.indent(state.base, textAfter);
    },
    electricChars: base.electricChars,

    innerMode: function(state) { return {state: state.base, mode: base}; },

    blankLine: function(state) {
      var baseToken, overlayToken;
      if (base.blankLine) baseToken = base.blankLine(state.base);
      if (overlay.blankLine) overlayToken = overlay.blankLine(state.overlay);

      return overlayToken == null ?
        baseToken :
        (combine && baseToken != null ? baseToken + " " + overlayToken : overlayToken);
    }
  };
};

});


/***/ }),

/***/ "./node_modules/codemirror/addon/selection/mark-selection.js":
/*!*******************************************************************!*\
  !*** ./node_modules/codemirror/addon/selection/mark-selection.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Because sometimes you need to mark the selected *text*.
//
// Adds an option 'styleSelectedText' which, when enabled, gives
// selected text the CSS class given as option value, or
// "CodeMirror-selectedtext" when the value is not a string.

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("styleSelectedText", false, function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.state.markedSelection = [];
      cm.state.markedSelectionStyle = typeof val == "string" ? val : "CodeMirror-selectedtext";
      reset(cm);
      cm.on("cursorActivity", onCursorActivity);
      cm.on("change", onChange);
    } else if (!val && prev) {
      cm.off("cursorActivity", onCursorActivity);
      cm.off("change", onChange);
      clear(cm);
      cm.state.markedSelection = cm.state.markedSelectionStyle = null;
    }
  });

  function onCursorActivity(cm) {
    if (cm.state.markedSelection)
      cm.operation(function() { update(cm); });
  }

  function onChange(cm) {
    if (cm.state.markedSelection && cm.state.markedSelection.length)
      cm.operation(function() { clear(cm); });
  }

  var CHUNK_SIZE = 8;
  var Pos = CodeMirror.Pos;
  var cmp = CodeMirror.cmpPos;

  function coverRange(cm, from, to, addAt) {
    if (cmp(from, to) == 0) return;
    var array = cm.state.markedSelection;
    var cls = cm.state.markedSelectionStyle;
    for (var line = from.line;;) {
      var start = line == from.line ? from : Pos(line, 0);
      var endLine = line + CHUNK_SIZE, atEnd = endLine >= to.line;
      var end = atEnd ? to : Pos(endLine, 0);
      var mark = cm.markText(start, end, {className: cls});
      if (addAt == null) array.push(mark);
      else array.splice(addAt++, 0, mark);
      if (atEnd) break;
      line = endLine;
    }
  }

  function clear(cm) {
    var array = cm.state.markedSelection;
    for (var i = 0; i < array.length; ++i) array[i].clear();
    array.length = 0;
  }

  function reset(cm) {
    clear(cm);
    var ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++)
      coverRange(cm, ranges[i].from(), ranges[i].to());
  }

  function update(cm) {
    if (!cm.somethingSelected()) return clear(cm);
    if (cm.listSelections().length > 1) return reset(cm);

    var from = cm.getCursor("start"), to = cm.getCursor("end");

    var array = cm.state.markedSelection;
    if (!array.length) return coverRange(cm, from, to);

    var coverStart = array[0].find(), coverEnd = array[array.length - 1].find();
    if (!coverStart || !coverEnd || to.line - from.line <= CHUNK_SIZE ||
        cmp(from, coverEnd.to) >= 0 || cmp(to, coverStart.from) <= 0)
      return reset(cm);

    while (cmp(from, coverStart.from) > 0) {
      array.shift().clear();
      coverStart = array[0].find();
    }
    if (cmp(from, coverStart.from) < 0) {
      if (coverStart.to.line - from.line < CHUNK_SIZE) {
        array.shift().clear();
        coverRange(cm, from, coverStart.to, 0);
      } else {
        coverRange(cm, from, coverStart.from, 0);
      }
    }

    while (cmp(to, coverEnd.to) < 0) {
      array.pop().clear();
      coverEnd = array[array.length - 1].find();
    }
    if (cmp(to, coverEnd.to) > 0) {
      if (to.line - coverEnd.from.line < CHUNK_SIZE) {
        array.pop().clear();
        coverRange(cm, coverEnd.from, to);
      } else {
        coverRange(cm, coverEnd.to, to);
      }
    }
  }
});


/***/ }),

/***/ "./node_modules/codemirror/mode/gfm/gfm.js":
/*!*************************************************!*\
  !*** ./node_modules/codemirror/mode/gfm/gfm.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! ../markdown/markdown */ "./node_modules/codemirror/mode/markdown/markdown.js"), __webpack_require__(/*! ../../addon/mode/overlay */ "./node_modules/codemirror/addon/mode/overlay.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var urlRE = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i

CodeMirror.defineMode("gfm", function(config, modeConfig) {
  var codeDepth = 0;
  function blankLine(state) {
    state.code = false;
    return null;
  }
  var gfmOverlay = {
    startState: function() {
      return {
        code: false,
        codeBlock: false,
        ateSpace: false
      };
    },
    copyState: function(s) {
      return {
        code: s.code,
        codeBlock: s.codeBlock,
        ateSpace: s.ateSpace
      };
    },
    token: function(stream, state) {
      state.combineTokens = null;

      // Hack to prevent formatting override inside code blocks (block and inline)
      if (state.codeBlock) {
        if (stream.match(/^```+/)) {
          state.codeBlock = false;
          return null;
        }
        stream.skipToEnd();
        return null;
      }
      if (stream.sol()) {
        state.code = false;
      }
      if (stream.sol() && stream.match(/^```+/)) {
        stream.skipToEnd();
        state.codeBlock = true;
        return null;
      }
      // If this block is changed, it may need to be updated in Markdown mode
      if (stream.peek() === '`') {
        stream.next();
        var before = stream.pos;
        stream.eatWhile('`');
        var difference = 1 + stream.pos - before;
        if (!state.code) {
          codeDepth = difference;
          state.code = true;
        } else {
          if (difference === codeDepth) { // Must be exact
            state.code = false;
          }
        }
        return null;
      } else if (state.code) {
        stream.next();
        return null;
      }
      // Check if space. If so, links can be formatted later on
      if (stream.eatSpace()) {
        state.ateSpace = true;
        return null;
      }
      if (stream.sol() || state.ateSpace) {
        state.ateSpace = false;
        if (modeConfig.gitHubSpice !== false) {
          if(stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/)) {
            // User/Project@SHA
            // User@SHA
            // SHA
            state.combineTokens = true;
            return "link";
          } else if (stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) {
            // User/Project#Num
            // User#Num
            // #Num
            state.combineTokens = true;
            return "link";
          }
        }
      }
      if (stream.match(urlRE) &&
          stream.string.slice(stream.start - 2, stream.start) != "](" &&
          (stream.start == 0 || /\W/.test(stream.string.charAt(stream.start - 1)))) {
        // URLs
        // Taken from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
        // And then (issue #1160) simplified to make it not crash the Chrome Regexp engine
        // And then limited url schemes to the CommonMark list, so foo:bar isn't matched as a URL
        state.combineTokens = true;
        return "link";
      }
      stream.next();
      return null;
    },
    blankLine: blankLine
  };

  var markdownConfig = {
    taskLists: true,
    strikethrough: true,
    emoji: true
  };
  for (var attr in modeConfig) {
    markdownConfig[attr] = modeConfig[attr];
  }
  markdownConfig.name = "markdown";
  return CodeMirror.overlayMode(CodeMirror.getMode(config, markdownConfig), gfmOverlay);

}, "markdown");

  CodeMirror.defineMIME("text/x-gfm", "gfm");
});


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inline-attachment/src/codemirror-4.inline-attachment.js":
/*!******************************************************************************!*\
  !*** ./node_modules/inline-attachment/src/codemirror-4.inline-attachment.js ***!
  \******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*jslint newcap: true */
/*global inlineAttachment: false */
/**
 * CodeMirror version for inlineAttachment
 *
 * Call inlineAttachment.attach(editor) to attach to a codemirror instance
 */
(function() {
  'use strict';

  var codeMirrorEditor = function(instance) {

    if (!instance.getWrapperElement) {
      throw "Invalid CodeMirror object given";
    }

    this.codeMirror = instance;
  };

  codeMirrorEditor.prototype.getValue = function() {
    return this.codeMirror.getValue();
  };

  codeMirrorEditor.prototype.insertValue = function(val) {
    this.codeMirror.replaceSelection(val);
  };

  codeMirrorEditor.prototype.setValue = function(val) {
    var cursor = this.codeMirror.getCursor();
    this.codeMirror.setValue(val);
    this.codeMirror.setCursor(cursor);
  };

  /**
   * Attach InlineAttachment to CodeMirror
   *
   * @param {CodeMirror} codeMirror
   */
  codeMirrorEditor.attach = function(codeMirror, options) {

    options = options || {};

    var editor = new codeMirrorEditor(codeMirror),
      inlineattach = new inlineAttachment(options, editor),
      el = codeMirror.getWrapperElement();

    el.addEventListener('paste', function(e) {
      inlineattach.onPaste(e);
    }, false);

    codeMirror.setOption('onDragEvent', function(data, e) {
      if (e.type === "drop") {
        e.stopPropagation();
        e.preventDefault();
        return inlineattach.onDrop(e);
      }
    });
  };

  var codeMirrorEditor4 = function(instance) {
    codeMirrorEditor.call(this, instance);
  };

  codeMirrorEditor4.attach = function(codeMirror, options) {

    options = options || {};

    var editor = new codeMirrorEditor(codeMirror),
      inlineattach = new inlineAttachment(options, editor),
      el = codeMirror.getWrapperElement();

    el.addEventListener('paste', function(e) {
      inlineattach.onPaste(e);
    }, false);

    codeMirror.on('drop', function(data, e) {
      if (inlineattach.onDrop(e)) {
        e.stopPropagation();
        e.preventDefault();
        return true;
      } else {
        return false;
      }
    });
  };

  inlineAttachment.editors.codemirror4 = codeMirrorEditor4;

})();

/***/ }),

/***/ "./node_modules/inline-attachment/src/inline-attachment.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inline-attachment/src/inline-attachment.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*jslint newcap: true */
/*global XMLHttpRequest: false, FormData: false */
/*
 * Inline Text Attachment
 *
 * Author: Roy van Kaathoven
 * Contact: ik@royvankaathoven.nl
 */
(function(document, window) {
  'use strict';

  var inlineAttachment = function(options, instance) {
    this.settings = inlineAttachment.util.merge(options, inlineAttachment.defaults);
    this.editor = instance;
    this.filenameTag = '{filename}';
    this.lastValue = null;
  };

  /**
   * Will holds the available editors
   *
   * @type {Object}
   */
  inlineAttachment.editors = {};

  /**
   * Utility functions
   */
  inlineAttachment.util = {

    /**
     * Simple function to merge the given objects
     *
     * @param {Object[]} object Multiple object parameters
     * @returns {Object}
     */
    merge: function() {
      var result = {};
      for (var i = arguments.length - 1; i >= 0; i--) {
        var obj = arguments[i];
        for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
            result[k] = obj[k];
          }
        }
      }
      return result;
    },

    /**
     * Append a line of text at the bottom, ensuring there aren't unnecessary newlines
     *
     * @param {String} appended Current content
     * @param {String} previous Value which should be appended after the current content
     */
    appendInItsOwnLine: function(previous, appended) {
      return (previous + "\n\n[[D]]" + appended)
        .replace(/(\n{2,})\[\[D\]\]/, "\n\n")
        .replace(/^(\n*)/, "");
    },

    /**
     * Inserts the given value at the current cursor position of the textarea element
     *
     * @param  {HtmlElement} el
     * @param  {String} value Text which will be inserted at the cursor position
     */
    insertTextAtCursor: function(el, text) {
      var scrollPos = el.scrollTop,
        strPos = 0,
        browser = false,
        range;

      if ((el.selectionStart || el.selectionStart === '0')) {
        browser = "ff";
      } else if (document.selection) {
        browser = "ie";
      }

      if (browser === "ie") {
        el.focus();
        range = document.selection.createRange();
        range.moveStart('character', -el.value.length);
        strPos = range.text.length;
      } else if (browser === "ff") {
        strPos = el.selectionStart;
      }

      var front = (el.value).substring(0, strPos);
      var back = (el.value).substring(strPos, el.value.length);
      el.value = front + text + back;
      strPos = strPos + text.length;
      if (browser === "ie") {
        el.focus();
        range = document.selection.createRange();
        range.moveStart('character', -el.value.length);
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
      } else if (browser === "ff") {
        el.selectionStart = strPos;
        el.selectionEnd = strPos;
        el.focus();
      }
      el.scrollTop = scrollPos;
    }
  };

  /**
   * Default configuration options
   *
   * @type {Object}
   */
  inlineAttachment.defaults = {
    /**
     * URL where the file will be send
     */
    uploadUrl: 'upload_attachment.php',

    /**
     * Which method will be used to send the file to the upload URL
     */
    uploadMethod: 'POST',

    /**
     * Name in which the file will be placed
     */
    uploadFieldName: 'file',

    /**
     * Extension which will be used when a file extension could not
     * be detected
     */
    defaultExtension: 'png',

    /**
     * JSON field which refers to the uploaded file URL
     */
    jsonFieldName: 'filename',

    /**
     * Allowed MIME types
     */
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif'
    ],

    /**
     * Text which will be inserted when dropping or pasting a file.
     * Acts as a placeholder which will be replaced when the file is done with uploading
     */
    progressText: '![Uploading file...]()',

    /**
     * When a file has successfully been uploaded the progressText
     * will be replaced by the urlText, the {filename} tag will be replaced
     * by the filename that has been returned by the server
     */
    urlText: "![file]({filename})",

    /**
     * Text which will be used when uploading has failed
     */
    errorText: "Error uploading file",

    /**
     * Extra parameters which will be send when uploading a file
     */
    extraParams: {},

    /**
     * Extra headers which will be send when uploading a file
     */
    extraHeaders: {},

    /**
     * Before the file is send
     */
    beforeFileUpload: function() {
      return true;
    },

    /**
     * Triggers when a file is dropped or pasted
     */
    onFileReceived: function() {},

    /**
     * Custom upload handler
     *
     * @return {Boolean} when false is returned it will prevent default upload behavior
     */
    onFileUploadResponse: function() {
      return true;
    },

    /**
     * Custom error handler. Runs after removing the placeholder text and before the alert().
     * Return false from this function to prevent the alert dialog.
     *
     * @return {Boolean} when false is returned it will prevent default error behavior
     */
    onFileUploadError: function() {
      return true;
    },

    /**
     * When a file has succesfully been uploaded
     */
    onFileUploaded: function() {}
  };

  /**
   * Uploads the blob
   *
   * @param  {Blob} file blob data received from event.dataTransfer object
   * @return {XMLHttpRequest} request object which sends the file
   */
  inlineAttachment.prototype.uploadFile = function(file) {
    var me = this,
      formData = new FormData(),
      xhr = new XMLHttpRequest(),
      settings = this.settings,
      extension = settings.defaultExtension || settings.defualtExtension;

    if (typeof settings.setupFormData === 'function') {
      settings.setupFormData(formData, file);
    }

    // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
    // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
    if (file.name) {
      var fileNameMatches = file.name.match(/\.(.+)$/);
      if (fileNameMatches) {
        extension = fileNameMatches[1];
      }
    }

    var remoteFilename = "image-" + Date.now() + "." + extension;
    if (typeof settings.remoteFilename === 'function') {
      remoteFilename = settings.remoteFilename(file);
    }

    formData.append(settings.uploadFieldName, file, remoteFilename);

    // Append the extra parameters to the formdata
    if (typeof settings.extraParams === "object") {
      for (var key in settings.extraParams) {
        if (settings.extraParams.hasOwnProperty(key)) {
          formData.append(key, settings.extraParams[key]);
        }
      }
    }

    xhr.open('POST', settings.uploadUrl);

    // Add any available extra headers
    if (typeof settings.extraHeaders === "object") {
        for (var header in settings.extraHeaders) {
            if (settings.extraHeaders.hasOwnProperty(header)) {
                xhr.setRequestHeader(header, settings.extraHeaders[header]);
            }
        }
    }

    xhr.onload = function() {
      // If HTTP status is OK or Created
      if (xhr.status === 200 || xhr.status === 201) {
        me.onFileUploadResponse(xhr);
      } else {
        me.onFileUploadError(xhr);
      }
    };
    if (settings.beforeFileUpload(xhr) !== false) {
      xhr.send(formData);
    }
    return xhr;
  };

  /**
   * Returns if the given file is allowed to handle
   *
   * @param {File} clipboard data file
   */
  inlineAttachment.prototype.isFileAllowed = function(file) {
    if (file.kind === 'string') { return false; }
    if (this.settings.allowedTypes.indexOf('*') === 0){
      return true;
    } else {
      return this.settings.allowedTypes.indexOf(file.type) >= 0;
    }
  };

  /**
   * Handles upload response
   *
   * @param  {XMLHttpRequest} xhr
   * @return {Void}
   */
  inlineAttachment.prototype.onFileUploadResponse = function(xhr) {
    if (this.settings.onFileUploadResponse.call(this, xhr) !== false) {
      var result = JSON.parse(xhr.responseText),
        filename = result[this.settings.jsonFieldName];

      if (result && filename) {
        var newValue;
        if (typeof this.settings.urlText === 'function') {
          newValue = this.settings.urlText.call(this, filename, result);
        } else {
          newValue = this.settings.urlText.replace(this.filenameTag, filename);
        }
        var text = this.editor.getValue().replace(this.lastValue, newValue);
        this.editor.setValue(text);
        this.settings.onFileUploaded.call(this, filename);
      }
    }
  };


  /**
   * Called when a file has failed to upload
   *
   * @param  {XMLHttpRequest} xhr
   * @return {Void}
   */
  inlineAttachment.prototype.onFileUploadError = function(xhr) {
    if (this.settings.onFileUploadError.call(this, xhr) !== false) {
      var text = this.editor.getValue().replace(this.lastValue, "");
      this.editor.setValue(text);
    }
  };

  /**
   * Called when a file has been inserted, either by drop or paste
   *
   * @param  {File} file
   * @return {Void}
   */
  inlineAttachment.prototype.onFileInserted = function(file) {
    if (this.settings.onFileReceived.call(this, file) !== false) {
      this.lastValue = this.settings.progressText;
      this.editor.insertValue(this.lastValue);
    }
  };


  /**
   * Called when a paste event occured
   * @param  {Event} e
   * @return {Boolean} if the event was handled
   */
  inlineAttachment.prototype.onPaste = function(e) {
    var result = false,
      clipboardData = e.clipboardData,
      items;

    if (typeof clipboardData === "object") {
      items = clipboardData.items || clipboardData.files || [];

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (this.isFileAllowed(item)) {
          result = true;
          this.onFileInserted(item.getAsFile());
          this.uploadFile(item.getAsFile());
        }
      }
    }

    if (result) { e.preventDefault(); }

    return result;
  };

  /**
   * Called when a drop event occures
   * @param  {Event} e
   * @return {Boolean} if the event was handled
   */
  inlineAttachment.prototype.onDrop = function(e) {
    var result = false;
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      var file = e.dataTransfer.files[i];
      if (this.isFileAllowed(file)) {
        result = true;
        this.onFileInserted(file);
        this.uploadFile(file);
      }
    }

    return result;
  };

  window.inlineAttachment = inlineAttachment;

})(document, window);


/***/ }),

/***/ "./node_modules/inline-attachment/src/jquery.inline-attachment.js":
/*!************************************************************************!*\
  !*** ./node_modules/inline-attachment/src/jquery.inline-attachment.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*jslint newcap: true */
/*global inlineAttachment: false, jQuery: false */
/**
 * jQuery plugin for inline attach
 *
 * @param {document} document
 * @param {window} window
 * @param {jQuery} $
 */
(function(document, window, $) {
  'use strict';

  inlineAttachment.editors.jquery = {};

  /**
   * Creates a new editor using jQuery
   */
  var editor = function(instance) {

    var $this = $(instance);

    return {
      getValue: function() {
        return $this.val();
      },
      insertValue: function(val) {
        inlineAttachment.util.insertTextAtCursor($this[0], val);
      },
      setValue: function(val) {
        $this.val(val);
      }
    };
  };

  $.fn.inlineattachment = function(options) {

    var set = $(this);

    set.each(function() {

      var $this = $(this),
        ed = new editor($this),
        inlineattach = new inlineAttachment(options, ed);

      $this.bind({
        'paste': function(e) {
          inlineattach.onPaste(e.originalEvent);
        },
        'drop': function(e) {
          e.stopPropagation();
          e.preventDefault();
          inlineattach.onDrop(e.originalEvent);
        },
        'dragenter dragover': function(e) {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    });

    return this;
  };

  inlineAttachment.editors.jquery.Editor = editor;

})(document, window, jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/marked/lib/marked.js":
/*!*******************************************!*\
  !*** ./node_modules/marked/lib/marked.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/
};

block._label = /(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b';

block.html = edit(block.html)
  .replace('comment', /<!--[\s\S]*?-->/)
  .replace('closed', /<(tag)[\s\S]+?<\/\1>/)
  .replace('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/)
  .replace(/tag/g, block._tag)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', '<' + block._tag)
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      space,
      i,
      tag,
      l,
      isordered;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      this.tokens.push({
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : ''
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase();
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;

inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex()

inline._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = edit(inline.link)
  .replace('inside', inline._inside)
  .replace('href', inline._href)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('inside', inline._inside)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
    .replace('email', inline._email)
    .getRegex(),
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
    .getRegex()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      cap[0] = this.rules._backpedal.exec(cap[0])[0];
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href),
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
}

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
}

TextRenderer.prototype.br = function() {
  return '';
}

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer(),
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (true) {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  root.marked = marked;
}
})(this || (typeof window !== 'undefined' ? window : global));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/nprogress/nprogress.js":
/*!*********************************************!*\
  !*** ./node_modules/nprogress/nprogress.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



/***/ }),

/***/ "./node_modules/simplemde/src/js/codemirror/tablist.js":
/*!*************************************************************!*\
  !*** ./node_modules/simplemde/src/js/codemirror/tablist.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

var CodeMirror = __webpack_require__(/*! codemirror */ "./node_modules/codemirror/lib/codemirror.js");

CodeMirror.commands.tabAndIndentMarkdownList = function (cm) {
	var ranges = cm.listSelections();
	var pos = ranges[0].head;
	var eolState = cm.getStateAfter(pos.line);
	var inList = eolState.list !== false;

	if (inList) {
		cm.execCommand("indentMore");
		return;
	}

	if (cm.options.indentWithTabs) {
		cm.execCommand("insertTab");
	}
	else {
		var spaces = Array(cm.options.tabSize + 1).join(" ");
		cm.replaceSelection(spaces);
	}
};

CodeMirror.commands.shiftTabAndUnindentMarkdownList = function (cm) {
	var ranges = cm.listSelections();
	var pos = ranges[0].head;
	var eolState = cm.getStateAfter(pos.line);
	var inList = eolState.list !== false;

	if (inList) {
		cm.execCommand("indentLess");
		return;
	}

	if (cm.options.indentWithTabs) {
		cm.execCommand("insertTab");
	}
	else {
		var spaces = Array(cm.options.tabSize + 1).join(" ");
		cm.replaceSelection(spaces);
	}
};


/***/ }),

/***/ "./node_modules/simplemde/src/js/simplemde.js":
/*!****************************************************!*\
  !*** ./node_modules/simplemde/src/js/simplemde.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global require,module*/

var CodeMirror = __webpack_require__(/*! codemirror */ "./node_modules/codemirror/lib/codemirror.js");
__webpack_require__(/*! codemirror/addon/edit/continuelist.js */ "./node_modules/codemirror/addon/edit/continuelist.js");
__webpack_require__(/*! ./codemirror/tablist */ "./node_modules/simplemde/src/js/codemirror/tablist.js");
__webpack_require__(/*! codemirror/addon/display/fullscreen.js */ "./node_modules/codemirror/addon/display/fullscreen.js");
__webpack_require__(/*! codemirror/mode/markdown/markdown.js */ "./node_modules/codemirror/mode/markdown/markdown.js");
__webpack_require__(/*! codemirror/addon/mode/overlay.js */ "./node_modules/codemirror/addon/mode/overlay.js");
__webpack_require__(/*! codemirror/addon/display/placeholder.js */ "./node_modules/codemirror/addon/display/placeholder.js");
__webpack_require__(/*! codemirror/addon/selection/mark-selection.js */ "./node_modules/codemirror/addon/selection/mark-selection.js");
__webpack_require__(/*! codemirror/mode/gfm/gfm.js */ "./node_modules/codemirror/mode/gfm/gfm.js");
__webpack_require__(/*! codemirror/mode/xml/xml.js */ "./node_modules/codemirror/mode/xml/xml.js");
var CodeMirrorSpellChecker = __webpack_require__(/*! codemirror-spell-checker */ "./node_modules/codemirror-spell-checker/src/js/spell-checker.js");
var marked = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");


// Some variables
var isMac = /Mac/.test(navigator.platform);

// Mapping of actions that can be bound to keyboard shortcuts or toolbar buttons
var bindings = {
	"toggleBold": toggleBold,
	"toggleItalic": toggleItalic,
	"drawLink": drawLink,
	"toggleHeadingSmaller": toggleHeadingSmaller,
	"toggleHeadingBigger": toggleHeadingBigger,
	"drawImage": drawImage,
	"toggleBlockquote": toggleBlockquote,
	"toggleOrderedList": toggleOrderedList,
	"toggleUnorderedList": toggleUnorderedList,
	"toggleCodeBlock": toggleCodeBlock,
	"togglePreview": togglePreview,
	"toggleStrikethrough": toggleStrikethrough,
	"toggleHeading1": toggleHeading1,
	"toggleHeading2": toggleHeading2,
	"toggleHeading3": toggleHeading3,
	"cleanBlock": cleanBlock,
	"drawTable": drawTable,
	"drawHorizontalRule": drawHorizontalRule,
	"undo": undo,
	"redo": redo,
	"toggleSideBySide": toggleSideBySide,
	"toggleFullScreen": toggleFullScreen
};

var shortcuts = {
	"toggleBold": "Cmd-B",
	"toggleItalic": "Cmd-I",
	"drawLink": "Cmd-K",
	"toggleHeadingSmaller": "Cmd-H",
	"toggleHeadingBigger": "Shift-Cmd-H",
	"cleanBlock": "Cmd-E",
	"drawImage": "Cmd-Alt-I",
	"toggleBlockquote": "Cmd-'",
	"toggleOrderedList": "Cmd-Alt-L",
	"toggleUnorderedList": "Cmd-L",
	"toggleCodeBlock": "Cmd-Alt-C",
	"togglePreview": "Cmd-P",
	"toggleSideBySide": "F9",
	"toggleFullScreen": "F11"
};

var getBindingName = function(f) {
	for(var key in bindings) {
		if(bindings[key] === f) {
			return key;
		}
	}
	return null;
};

var isMobile = function() {
	var check = false;
	(function(a) {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};


/**
 * Fix shortcut. Mac use Command, others use Ctrl.
 */
function fixShortcut(name) {
	if(isMac) {
		name = name.replace("Ctrl", "Cmd");
	} else {
		name = name.replace("Cmd", "Ctrl");
	}
	return name;
}


/**
 * Create icon element for toolbar.
 */
function createIcon(options, enableTooltips, shortcuts) {
	options = options || {};
	var el = document.createElement("a");
	enableTooltips = (enableTooltips == undefined) ? true : enableTooltips;

	if(options.title && enableTooltips) {
		el.title = createTootlip(options.title, options.action, shortcuts);

		if(isMac) {
			el.title = el.title.replace("Ctrl", "⌘");
			el.title = el.title.replace("Alt", "⌥");
		}
	}

	el.tabIndex = -1;
	el.className = options.className;
	return el;
}

function createSep() {
	var el = document.createElement("i");
	el.className = "separator";
	el.innerHTML = "|";
	return el;
}

function createTootlip(title, action, shortcuts) {
	var actionName;
	var tooltip = title;

	if(action) {
		actionName = getBindingName(action);
		if(shortcuts[actionName]) {
			tooltip += " (" + fixShortcut(shortcuts[actionName]) + ")";
		}
	}

	return tooltip;
}

/**
 * The state of CodeMirror at the given position.
 */
function getState(cm, pos) {
	pos = pos || cm.getCursor("start");
	var stat = cm.getTokenAt(pos);
	if(!stat.type) return {};

	var types = stat.type.split(" ");

	var ret = {},
		data, text;
	for(var i = 0; i < types.length; i++) {
		data = types[i];
		if(data === "strong") {
			ret.bold = true;
		} else if(data === "variable-2") {
			text = cm.getLine(pos.line);
			if(/^\s*\d+\.\s/.test(text)) {
				ret["ordered-list"] = true;
			} else {
				ret["unordered-list"] = true;
			}
		} else if(data === "atom") {
			ret.quote = true;
		} else if(data === "em") {
			ret.italic = true;
		} else if(data === "quote") {
			ret.quote = true;
		} else if(data === "strikethrough") {
			ret.strikethrough = true;
		} else if(data === "comment") {
			ret.code = true;
		} else if(data === "link") {
			ret.link = true;
		} else if(data === "tag") {
			ret.image = true;
		} else if(data.match(/^header(\-[1-6])?$/)) {
			ret[data.replace("header", "heading")] = true;
		}
	}
	return ret;
}


// Saved overflow setting
var saved_overflow = "";

/**
 * Toggle full screen of the editor.
 */
function toggleFullScreen(editor) {
	// Set fullscreen
	var cm = editor.codemirror;
	cm.setOption("fullScreen", !cm.getOption("fullScreen"));


	// Prevent scrolling on body during fullscreen active
	if(cm.getOption("fullScreen")) {
		saved_overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = saved_overflow;
	}


	// Update toolbar class
	var wrap = cm.getWrapperElement();

	if(!/fullscreen/.test(wrap.previousSibling.className)) {
		wrap.previousSibling.className += " fullscreen";
	} else {
		wrap.previousSibling.className = wrap.previousSibling.className.replace(/\s*fullscreen\b/, "");
	}


	// Update toolbar button
	var toolbarButton = editor.toolbarElements.fullscreen;

	if(!/active/.test(toolbarButton.className)) {
		toolbarButton.className += " active";
	} else {
		toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
	}


	// Hide side by side if needed
	var sidebyside = cm.getWrapperElement().nextSibling;
	if(/editor-preview-active-side/.test(sidebyside.className))
		toggleSideBySide(editor);
}


/**
 * Action for toggling bold.
 */
function toggleBold(editor) {
	_toggleBlock(editor, "bold", editor.options.blockStyles.bold);
}


/**
 * Action for toggling italic.
 */
function toggleItalic(editor) {
	_toggleBlock(editor, "italic", editor.options.blockStyles.italic);
}


/**
 * Action for toggling strikethrough.
 */
function toggleStrikethrough(editor) {
	_toggleBlock(editor, "strikethrough", "~~");
}

/**
 * Action for toggling code block.
 */
function toggleCodeBlock(editor) {
	var fenceCharsToInsert = editor.options.blockStyles.code;

	function fencing_line(line) {
		/* return true, if this is a ``` or ~~~ line */
		if(typeof line !== "object") {
			throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + typeof line + ": " + line;
		}
		return line.styles && line.styles[2] && line.styles[2].indexOf("formatting-code-block") !== -1;
	}

	function token_state(token) {
		// base goes an extra level deep when mode backdrops are used, e.g. spellchecker on
		return token.state.base.base || token.state.base;
	}

	function code_type(cm, line_num, line, firstTok, lastTok) {
		/*
		 * Return "single", "indented", "fenced" or false
		 *
		 * cm and line_num are required.  Others are optional for efficiency
		 *   To check in the middle of a line, pass in firstTok yourself.
		 */
		line = line || cm.getLineHandle(line_num);
		firstTok = firstTok || cm.getTokenAt({
			line: line_num,
			ch: 1
		});
		lastTok = lastTok || (!!line.text && cm.getTokenAt({
			line: line_num,
			ch: line.text.length - 1
		}));
		var types = firstTok.type ? firstTok.type.split(" ") : [];
		if(lastTok && token_state(lastTok).indentedCode) {
			// have to check last char, since first chars of first line aren"t marked as indented
			return "indented";
		} else if(types.indexOf("comment") === -1) {
			// has to be after "indented" check, since first chars of first indented line aren"t marked as such
			return false;
		} else if(token_state(firstTok).fencedChars || token_state(lastTok).fencedChars || fencing_line(line)) {
			return "fenced";
		} else {
			return "single";
		}
	}

	function insertFencingAtSelection(cm, cur_start, cur_end, fenceCharsToInsert) {
		var start_line_sel = cur_start.line + 1,
			end_line_sel = cur_end.line + 1,
			sel_multi = cur_start.line !== cur_end.line,
			repl_start = fenceCharsToInsert + "\n",
			repl_end = "\n" + fenceCharsToInsert;
		if(sel_multi) {
			end_line_sel++;
		}
		// handle last char including \n or not
		if(sel_multi && cur_end.ch === 0) {
			repl_end = fenceCharsToInsert + "\n";
			end_line_sel--;
		}
		_replaceSelection(cm, false, [repl_start, repl_end]);
		cm.setSelection({
			line: start_line_sel,
			ch: 0
		}, {
			line: end_line_sel,
			ch: 0
		});
	}

	var cm = editor.codemirror,
		cur_start = cm.getCursor("start"),
		cur_end = cm.getCursor("end"),
		tok = cm.getTokenAt({
			line: cur_start.line,
			ch: cur_start.ch || 1
		}), // avoid ch 0 which is a cursor pos but not token
		line = cm.getLineHandle(cur_start.line),
		is_code = code_type(cm, cur_start.line, line, tok);
	var block_start, block_end, lineCount;

	if(is_code === "single") {
		// similar to some SimpleMDE _toggleBlock logic
		var start = line.text.slice(0, cur_start.ch).replace("`", ""),
			end = line.text.slice(cur_start.ch).replace("`", "");
		cm.replaceRange(start + end, {
			line: cur_start.line,
			ch: 0
		}, {
			line: cur_start.line,
			ch: 99999999999999
		});
		cur_start.ch--;
		if(cur_start !== cur_end) {
			cur_end.ch--;
		}
		cm.setSelection(cur_start, cur_end);
		cm.focus();
	} else if(is_code === "fenced") {
		if(cur_start.line !== cur_end.line || cur_start.ch !== cur_end.ch) {
			// use selection

			// find the fenced line so we know what type it is (tilde, backticks, number of them)
			for(block_start = cur_start.line; block_start >= 0; block_start--) {
				line = cm.getLineHandle(block_start);
				if(fencing_line(line)) {
					break;
				}
			}
			var fencedTok = cm.getTokenAt({
				line: block_start,
				ch: 1
			});
			var fence_chars = token_state(fencedTok).fencedChars;
			var start_text, start_line;
			var end_text, end_line;
			// check for selection going up against fenced lines, in which case we don't want to add more fencing
			if(fencing_line(cm.getLineHandle(cur_start.line))) {
				start_text = "";
				start_line = cur_start.line;
			} else if(fencing_line(cm.getLineHandle(cur_start.line - 1))) {
				start_text = "";
				start_line = cur_start.line - 1;
			} else {
				start_text = fence_chars + "\n";
				start_line = cur_start.line;
			}
			if(fencing_line(cm.getLineHandle(cur_end.line))) {
				end_text = "";
				end_line = cur_end.line;
				if(cur_end.ch === 0) {
					end_line += 1;
				}
			} else if(cur_end.ch !== 0 && fencing_line(cm.getLineHandle(cur_end.line + 1))) {
				end_text = "";
				end_line = cur_end.line + 1;
			} else {
				end_text = fence_chars + "\n";
				end_line = cur_end.line + 1;
			}
			if(cur_end.ch === 0) {
				// full last line selected, putting cursor at beginning of next
				end_line -= 1;
			}
			cm.operation(function() {
				// end line first, so that line numbers don't change
				cm.replaceRange(end_text, {
					line: end_line,
					ch: 0
				}, {
					line: end_line + (end_text ? 0 : 1),
					ch: 0
				});
				cm.replaceRange(start_text, {
					line: start_line,
					ch: 0
				}, {
					line: start_line + (start_text ? 0 : 1),
					ch: 0
				});
			});
			cm.setSelection({
				line: start_line + (start_text ? 1 : 0),
				ch: 0
			}, {
				line: end_line + (start_text ? 1 : -1),
				ch: 0
			});
			cm.focus();
		} else {
			// no selection, search for ends of this fenced block
			var search_from = cur_start.line;
			if(fencing_line(cm.getLineHandle(cur_start.line))) { // gets a little tricky if cursor is right on a fenced line
				if(code_type(cm, cur_start.line + 1) === "fenced") {
					block_start = cur_start.line;
					search_from = cur_start.line + 1; // for searching for "end"
				} else {
					block_end = cur_start.line;
					search_from = cur_start.line - 1; // for searching for "start"
				}
			}
			if(block_start === undefined) {
				for(block_start = search_from; block_start >= 0; block_start--) {
					line = cm.getLineHandle(block_start);
					if(fencing_line(line)) {
						break;
					}
				}
			}
			if(block_end === undefined) {
				lineCount = cm.lineCount();
				for(block_end = search_from; block_end < lineCount; block_end++) {
					line = cm.getLineHandle(block_end);
					if(fencing_line(line)) {
						break;
					}
				}
			}
			cm.operation(function() {
				cm.replaceRange("", {
					line: block_start,
					ch: 0
				}, {
					line: block_start + 1,
					ch: 0
				});
				cm.replaceRange("", {
					line: block_end - 1,
					ch: 0
				}, {
					line: block_end,
					ch: 0
				});
			});
			cm.focus();
		}
	} else if(is_code === "indented") {
		if(cur_start.line !== cur_end.line || cur_start.ch !== cur_end.ch) {
			// use selection
			block_start = cur_start.line;
			block_end = cur_end.line;
			if(cur_end.ch === 0) {
				block_end--;
			}
		} else {
			// no selection, search for ends of this indented block
			for(block_start = cur_start.line; block_start >= 0; block_start--) {
				line = cm.getLineHandle(block_start);
				if(line.text.match(/^\s*$/)) {
					// empty or all whitespace - keep going
					continue;
				} else {
					if(code_type(cm, block_start, line) !== "indented") {
						block_start += 1;
						break;
					}
				}
			}
			lineCount = cm.lineCount();
			for(block_end = cur_start.line; block_end < lineCount; block_end++) {
				line = cm.getLineHandle(block_end);
				if(line.text.match(/^\s*$/)) {
					// empty or all whitespace - keep going
					continue;
				} else {
					if(code_type(cm, block_end, line) !== "indented") {
						block_end -= 1;
						break;
					}
				}
			}
		}
		// if we are going to un-indent based on a selected set of lines, and the next line is indented too, we need to
		// insert a blank line so that the next line(s) continue to be indented code
		var next_line = cm.getLineHandle(block_end + 1),
			next_line_last_tok = next_line && cm.getTokenAt({
				line: block_end + 1,
				ch: next_line.text.length - 1
			}),
			next_line_indented = next_line_last_tok && token_state(next_line_last_tok).indentedCode;
		if(next_line_indented) {
			cm.replaceRange("\n", {
				line: block_end + 1,
				ch: 0
			});
		}

		for(var i = block_start; i <= block_end; i++) {
			cm.indentLine(i, "subtract"); // TODO: this doesn't get tracked in the history, so can't be undone :(
		}
		cm.focus();
	} else {
		// insert code formatting
		var no_sel_and_starting_of_line = (cur_start.line === cur_end.line && cur_start.ch === cur_end.ch && cur_start.ch === 0);
		var sel_multi = cur_start.line !== cur_end.line;
		if(no_sel_and_starting_of_line || sel_multi) {
			insertFencingAtSelection(cm, cur_start, cur_end, fenceCharsToInsert);
		} else {
			_replaceSelection(cm, false, ["`", "`"]);
		}
	}
}

/**
 * Action for toggling blockquote.
 */
function toggleBlockquote(editor) {
	var cm = editor.codemirror;
	_toggleLine(cm, "quote");
}

/**
 * Action for toggling heading size: normal -> h1 -> h2 -> h3 -> h4 -> h5 -> h6 -> normal
 */
function toggleHeadingSmaller(editor) {
	var cm = editor.codemirror;
	_toggleHeading(cm, "smaller");
}

/**
 * Action for toggling heading size: normal -> h6 -> h5 -> h4 -> h3 -> h2 -> h1 -> normal
 */
function toggleHeadingBigger(editor) {
	var cm = editor.codemirror;
	_toggleHeading(cm, "bigger");
}

/**
 * Action for toggling heading size 1
 */
function toggleHeading1(editor) {
	var cm = editor.codemirror;
	_toggleHeading(cm, undefined, 1);
}

/**
 * Action for toggling heading size 2
 */
function toggleHeading2(editor) {
	var cm = editor.codemirror;
	_toggleHeading(cm, undefined, 2);
}

/**
 * Action for toggling heading size 3
 */
function toggleHeading3(editor) {
	var cm = editor.codemirror;
	_toggleHeading(cm, undefined, 3);
}


/**
 * Action for toggling ul.
 */
function toggleUnorderedList(editor) {
	var cm = editor.codemirror;
	_toggleLine(cm, "unordered-list");
}


/**
 * Action for toggling ol.
 */
function toggleOrderedList(editor) {
	var cm = editor.codemirror;
	_toggleLine(cm, "ordered-list");
}

/**
 * Action for clean block (remove headline, list, blockquote code, markers)
 */
function cleanBlock(editor) {
	var cm = editor.codemirror;
	_cleanBlock(cm);
}

/**
 * Action for drawing a link.
 */
function drawLink(editor) {
	var cm = editor.codemirror;
	var stat = getState(cm);
	var options = editor.options;
	var url = "http://";
	if(options.promptURLs) {
		url = prompt(options.promptTexts.link);
		if(!url) {
			return false;
		}
	}
	_replaceSelection(cm, stat.link, options.insertTexts.link, url);
}

/**
 * Action for drawing an img.
 */
function drawImage(editor) {
	var cm = editor.codemirror;
	var stat = getState(cm);
	var options = editor.options;
	var url = "http://";
	if(options.promptURLs) {
		url = prompt(options.promptTexts.image);
		if(!url) {
			return false;
		}
	}
	_replaceSelection(cm, stat.image, options.insertTexts.image, url);
}

/**
 * Action for drawing a table.
 */
function drawTable(editor) {
	var cm = editor.codemirror;
	var stat = getState(cm);
	var options = editor.options;
	_replaceSelection(cm, stat.table, options.insertTexts.table);
}

/**
 * Action for drawing a horizontal rule.
 */
function drawHorizontalRule(editor) {
	var cm = editor.codemirror;
	var stat = getState(cm);
	var options = editor.options;
	_replaceSelection(cm, stat.image, options.insertTexts.horizontalRule);
}


/**
 * Undo action.
 */
function undo(editor) {
	var cm = editor.codemirror;
	cm.undo();
	cm.focus();
}


/**
 * Redo action.
 */
function redo(editor) {
	var cm = editor.codemirror;
	cm.redo();
	cm.focus();
}


/**
 * Toggle side by side preview
 */
function toggleSideBySide(editor) {
	var cm = editor.codemirror;
	var wrapper = cm.getWrapperElement();
	var preview = wrapper.nextSibling;
	var toolbarButton = editor.toolbarElements["side-by-side"];
	var useSideBySideListener = false;
	if(/editor-preview-active-side/.test(preview.className)) {
		preview.className = preview.className.replace(
			/\s*editor-preview-active-side\s*/g, ""
		);
		toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
		wrapper.className = wrapper.className.replace(/\s*CodeMirror-sided\s*/g, " ");
	} else {
		// When the preview button is clicked for the first time,
		// give some time for the transition from editor.css to fire and the view to slide from right to left,
		// instead of just appearing.
		setTimeout(function() {
			if(!cm.getOption("fullScreen"))
				toggleFullScreen(editor);
			preview.className += " editor-preview-active-side";
		}, 1);
		toolbarButton.className += " active";
		wrapper.className += " CodeMirror-sided";
		useSideBySideListener = true;
	}

	// Hide normal preview if active
	var previewNormal = wrapper.lastChild;
	if(/editor-preview-active/.test(previewNormal.className)) {
		previewNormal.className = previewNormal.className.replace(
			/\s*editor-preview-active\s*/g, ""
		);
		var toolbar = editor.toolbarElements.preview;
		var toolbar_div = wrapper.previousSibling;
		toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
		toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
	}

	var sideBySideRenderingFunction = function() {
		preview.innerHTML = editor.options.previewRender(editor.value(), preview);
	};

	if(!cm.sideBySideRenderingFunction) {
		cm.sideBySideRenderingFunction = sideBySideRenderingFunction;
	}

	if(useSideBySideListener) {
		preview.innerHTML = editor.options.previewRender(editor.value(), preview);
		cm.on("update", cm.sideBySideRenderingFunction);
	} else {
		cm.off("update", cm.sideBySideRenderingFunction);
	}

	// Refresh to fix selection being off (#309)
	cm.refresh();
}


/**
 * Preview action.
 */
function togglePreview(editor) {
	var cm = editor.codemirror;
	var wrapper = cm.getWrapperElement();
	var toolbar_div = wrapper.previousSibling;
	var toolbar = editor.options.toolbar ? editor.toolbarElements.preview : false;
	var preview = wrapper.lastChild;
	if(!preview || !/editor-preview/.test(preview.className)) {
		preview = document.createElement("div");
		preview.className = "editor-preview";
		wrapper.appendChild(preview);
	}
	if(/editor-preview-active/.test(preview.className)) {
		preview.className = preview.className.replace(
			/\s*editor-preview-active\s*/g, ""
		);
		if(toolbar) {
			toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
			toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
		}
	} else {
		// When the preview button is clicked for the first time,
		// give some time for the transition from editor.css to fire and the view to slide from right to left,
		// instead of just appearing.
		setTimeout(function() {
			preview.className += " editor-preview-active";
		}, 1);
		if(toolbar) {
			toolbar.className += " active";
			toolbar_div.className += " disabled-for-preview";
		}
	}
	preview.innerHTML = editor.options.previewRender(editor.value(), preview);

	// Turn off side by side if needed
	var sidebyside = cm.getWrapperElement().nextSibling;
	if(/editor-preview-active-side/.test(sidebyside.className))
		toggleSideBySide(editor);
}

function _replaceSelection(cm, active, startEnd, url) {
	if(/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
		return;

	var text;
	var start = startEnd[0];
	var end = startEnd[1];
	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");
	if(url) {
		end = end.replace("#url#", url);
	}
	if(active) {
		text = cm.getLine(startPoint.line);
		start = text.slice(0, startPoint.ch);
		end = text.slice(startPoint.ch);
		cm.replaceRange(start + end, {
			line: startPoint.line,
			ch: 0
		});
	} else {
		text = cm.getSelection();
		cm.replaceSelection(start + text + end);

		startPoint.ch += start.length;
		if(startPoint !== endPoint) {
			endPoint.ch += start.length;
		}
	}
	cm.setSelection(startPoint, endPoint);
	cm.focus();
}


function _toggleHeading(cm, direction, size) {
	if(/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
		return;

	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");
	for(var i = startPoint.line; i <= endPoint.line; i++) {
		(function(i) {
			var text = cm.getLine(i);
			var currHeadingLevel = text.search(/[^#]/);

			if(direction !== undefined) {
				if(currHeadingLevel <= 0) {
					if(direction == "bigger") {
						text = "###### " + text;
					} else {
						text = "# " + text;
					}
				} else if(currHeadingLevel == 6 && direction == "smaller") {
					text = text.substr(7);
				} else if(currHeadingLevel == 1 && direction == "bigger") {
					text = text.substr(2);
				} else {
					if(direction == "bigger") {
						text = text.substr(1);
					} else {
						text = "#" + text;
					}
				}
			} else {
				if(size == 1) {
					if(currHeadingLevel <= 0) {
						text = "# " + text;
					} else if(currHeadingLevel == size) {
						text = text.substr(currHeadingLevel + 1);
					} else {
						text = "# " + text.substr(currHeadingLevel + 1);
					}
				} else if(size == 2) {
					if(currHeadingLevel <= 0) {
						text = "## " + text;
					} else if(currHeadingLevel == size) {
						text = text.substr(currHeadingLevel + 1);
					} else {
						text = "## " + text.substr(currHeadingLevel + 1);
					}
				} else {
					if(currHeadingLevel <= 0) {
						text = "### " + text;
					} else if(currHeadingLevel == size) {
						text = text.substr(currHeadingLevel + 1);
					} else {
						text = "### " + text.substr(currHeadingLevel + 1);
					}
				}
			}

			cm.replaceRange(text, {
				line: i,
				ch: 0
			}, {
				line: i,
				ch: 99999999999999
			});
		})(i);
	}
	cm.focus();
}


function _toggleLine(cm, name) {
	if(/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
		return;

	var stat = getState(cm);
	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");
	var repl = {
		"quote": /^(\s*)\>\s+/,
		"unordered-list": /^(\s*)(\*|\-|\+)\s+/,
		"ordered-list": /^(\s*)\d+\.\s+/
	};
	var map = {
		"quote": "> ",
		"unordered-list": "* ",
		"ordered-list": "1. "
	};
	for(var i = startPoint.line; i <= endPoint.line; i++) {
		(function(i) {
			var text = cm.getLine(i);
			if(stat[name]) {
				text = text.replace(repl[name], "$1");
			} else {
				text = map[name] + text;
			}
			cm.replaceRange(text, {
				line: i,
				ch: 0
			}, {
				line: i,
				ch: 99999999999999
			});
		})(i);
	}
	cm.focus();
}

function _toggleBlock(editor, type, start_chars, end_chars) {
	if(/editor-preview-active/.test(editor.codemirror.getWrapperElement().lastChild.className))
		return;

	end_chars = (typeof end_chars === "undefined") ? start_chars : end_chars;
	var cm = editor.codemirror;
	var stat = getState(cm);

	var text;
	var start = start_chars;
	var end = end_chars;

	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");

	if(stat[type]) {
		text = cm.getLine(startPoint.line);
		start = text.slice(0, startPoint.ch);
		end = text.slice(startPoint.ch);
		if(type == "bold") {
			start = start.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "");
			end = end.replace(/(\*\*|__)/, "");
		} else if(type == "italic") {
			start = start.replace(/(\*|_)(?![\s\S]*(\*|_))/, "");
			end = end.replace(/(\*|_)/, "");
		} else if(type == "strikethrough") {
			start = start.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "");
			end = end.replace(/(\*\*|~~)/, "");
		}
		cm.replaceRange(start + end, {
			line: startPoint.line,
			ch: 0
		}, {
			line: startPoint.line,
			ch: 99999999999999
		});

		if(type == "bold" || type == "strikethrough") {
			startPoint.ch -= 2;
			if(startPoint !== endPoint) {
				endPoint.ch -= 2;
			}
		} else if(type == "italic") {
			startPoint.ch -= 1;
			if(startPoint !== endPoint) {
				endPoint.ch -= 1;
			}
		}
	} else {
		text = cm.getSelection();
		if(type == "bold") {
			text = text.split("**").join("");
			text = text.split("__").join("");
		} else if(type == "italic") {
			text = text.split("*").join("");
			text = text.split("_").join("");
		} else if(type == "strikethrough") {
			text = text.split("~~").join("");
		}
		cm.replaceSelection(start + text + end);

		startPoint.ch += start_chars.length;
		endPoint.ch = startPoint.ch + text.length;
	}

	cm.setSelection(startPoint, endPoint);
	cm.focus();
}

function _cleanBlock(cm) {
	if(/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
		return;

	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");
	var text;

	for(var line = startPoint.line; line <= endPoint.line; line++) {
		text = cm.getLine(line);
		text = text.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/, "");

		cm.replaceRange(text, {
			line: line,
			ch: 0
		}, {
			line: line,
			ch: 99999999999999
		});
	}
}

// Merge the properties of one object into another.
function _mergeProperties(target, source) {
	for(var property in source) {
		if(source.hasOwnProperty(property)) {
			if(source[property] instanceof Array) {
				target[property] = source[property].concat(target[property] instanceof Array ? target[property] : []);
			} else if(
				source[property] !== null &&
				typeof source[property] === "object" &&
				source[property].constructor === Object
			) {
				target[property] = _mergeProperties(target[property] || {}, source[property]);
			} else {
				target[property] = source[property];
			}
		}
	}

	return target;
}

// Merge an arbitrary number of objects into one.
function extend(target) {
	for(var i = 1; i < arguments.length; i++) {
		target = _mergeProperties(target, arguments[i]);
	}

	return target;
}

/* The right word count in respect for CJK. */
function wordCount(data) {
	var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
	var m = data.match(pattern);
	var count = 0;
	if(m === null) return count;
	for(var i = 0; i < m.length; i++) {
		if(m[i].charCodeAt(0) >= 0x4E00) {
			count += m[i].length;
		} else {
			count += 1;
		}
	}
	return count;
}

var toolbarBuiltInButtons = {
	"bold": {
		name: "bold",
		action: toggleBold,
		className: "fa fa-bold",
		title: "Bold",
		default: true
	},
	"italic": {
		name: "italic",
		action: toggleItalic,
		className: "fa fa-italic",
		title: "Italic",
		default: true
	},
	"strikethrough": {
		name: "strikethrough",
		action: toggleStrikethrough,
		className: "fa fa-strikethrough",
		title: "Strikethrough"
	},
	"heading": {
		name: "heading",
		action: toggleHeadingSmaller,
		className: "fa fa-header",
		title: "Heading",
		default: true
	},
	"heading-smaller": {
		name: "heading-smaller",
		action: toggleHeadingSmaller,
		className: "fa fa-header fa-header-x fa-header-smaller",
		title: "Smaller Heading"
	},
	"heading-bigger": {
		name: "heading-bigger",
		action: toggleHeadingBigger,
		className: "fa fa-header fa-header-x fa-header-bigger",
		title: "Bigger Heading"
	},
	"heading-1": {
		name: "heading-1",
		action: toggleHeading1,
		className: "fa fa-header fa-header-x fa-header-1",
		title: "Big Heading"
	},
	"heading-2": {
		name: "heading-2",
		action: toggleHeading2,
		className: "fa fa-header fa-header-x fa-header-2",
		title: "Medium Heading"
	},
	"heading-3": {
		name: "heading-3",
		action: toggleHeading3,
		className: "fa fa-header fa-header-x fa-header-3",
		title: "Small Heading"
	},
	"separator-1": {
		name: "separator-1"
	},
	"code": {
		name: "code",
		action: toggleCodeBlock,
		className: "fa fa-code",
		title: "Code"
	},
	"quote": {
		name: "quote",
		action: toggleBlockquote,
		className: "fa fa-quote-left",
		title: "Quote",
		default: true
	},
	"unordered-list": {
		name: "unordered-list",
		action: toggleUnorderedList,
		className: "fa fa-list-ul",
		title: "Generic List",
		default: true
	},
	"ordered-list": {
		name: "ordered-list",
		action: toggleOrderedList,
		className: "fa fa-list-ol",
		title: "Numbered List",
		default: true
	},
	"clean-block": {
		name: "clean-block",
		action: cleanBlock,
		className: "fa fa-eraser fa-clean-block",
		title: "Clean block"
	},
	"separator-2": {
		name: "separator-2"
	},
	"link": {
		name: "link",
		action: drawLink,
		className: "fa fa-link",
		title: "Create Link",
		default: true
	},
	"image": {
		name: "image",
		action: drawImage,
		className: "fa fa-picture-o",
		title: "Insert Image",
		default: true
	},
	"table": {
		name: "table",
		action: drawTable,
		className: "fa fa-table",
		title: "Insert Table"
	},
	"horizontal-rule": {
		name: "horizontal-rule",
		action: drawHorizontalRule,
		className: "fa fa-minus",
		title: "Insert Horizontal Line"
	},
	"separator-3": {
		name: "separator-3"
	},
	"preview": {
		name: "preview",
		action: togglePreview,
		className: "fa fa-eye no-disable",
		title: "Toggle Preview",
		default: true
	},
	"side-by-side": {
		name: "side-by-side",
		action: toggleSideBySide,
		className: "fa fa-columns no-disable no-mobile",
		title: "Toggle Side by Side",
		default: true
	},
	"fullscreen": {
		name: "fullscreen",
		action: toggleFullScreen,
		className: "fa fa-arrows-alt no-disable no-mobile",
		title: "Toggle Fullscreen",
		default: true
	},
	"separator-4": {
		name: "separator-4"
	},
	"guide": {
		name: "guide",
		action: "https://simplemde.com/markdown-guide",
		className: "fa fa-question-circle",
		title: "Markdown Guide",
		default: true
	},
	"separator-5": {
		name: "separator-5"
	},
	"undo": {
		name: "undo",
		action: undo,
		className: "fa fa-undo no-disable",
		title: "Undo"
	},
	"redo": {
		name: "redo",
		action: redo,
		className: "fa fa-repeat no-disable",
		title: "Redo"
	}
};

var insertTexts = {
	link: ["[", "](#url#)"],
	image: ["![](", "#url#)"],
	table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
	horizontalRule: ["", "\n\n-----\n\n"]
};

var promptTexts = {
	link: "URL for the link:",
	image: "URL of the image:"
};

var blockStyles = {
	"bold": "**",
	"code": "```",
	"italic": "*"
};

/**
 * Interface of SimpleMDE.
 */
function SimpleMDE(options) {
	// Handle options parameter
	options = options || {};


	// Used later to refer to it"s parent
	options.parent = this;


	// Check if Font Awesome needs to be auto downloaded
	var autoDownloadFA = true;

	if(options.autoDownloadFontAwesome === false) {
		autoDownloadFA = false;
	}

	if(options.autoDownloadFontAwesome !== true) {
		var styleSheets = document.styleSheets;
		for(var i = 0; i < styleSheets.length; i++) {
			if(!styleSheets[i].href)
				continue;

			if(styleSheets[i].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1) {
				autoDownloadFA = false;
			}
		}
	}

	if(autoDownloadFA) {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css";
		document.getElementsByTagName("head")[0].appendChild(link);
	}


	// Find the textarea to use
	if(options.element) {
		this.element = options.element;
	} else if(options.element === null) {
		// This means that the element option was specified, but no element was found
		console.log("SimpleMDE: Error. No element was found.");
		return;
	}


	// Handle toolbar
	if(options.toolbar === undefined) {
		// Initialize
		options.toolbar = [];


		// Loop over the built in buttons, to get the preferred order
		for(var key in toolbarBuiltInButtons) {
			if(toolbarBuiltInButtons.hasOwnProperty(key)) {
				if(key.indexOf("separator-") != -1) {
					options.toolbar.push("|");
				}

				if(toolbarBuiltInButtons[key].default === true || (options.showIcons && options.showIcons.constructor === Array && options.showIcons.indexOf(key) != -1)) {
					options.toolbar.push(key);
				}
			}
		}
	}


	// Handle status bar
	if(!options.hasOwnProperty("status")) {
		options.status = ["autosave", "lines", "words", "cursor"];
	}


	// Add default preview rendering function
	if(!options.previewRender) {
		options.previewRender = function(plainText) {
			// Note: "this" refers to the options object
			return this.parent.markdown(plainText);
		};
	}


	// Set default options for parsing config
	options.parsingConfig = extend({
		highlightFormatting: true // needed for toggleCodeBlock to detect types of code
	}, options.parsingConfig || {});


	// Merging the insertTexts, with the given options
	options.insertTexts = extend({}, insertTexts, options.insertTexts || {});


	// Merging the promptTexts, with the given options
	options.promptTexts = promptTexts;


	// Merging the blockStyles, with the given options
	options.blockStyles = extend({}, blockStyles, options.blockStyles || {});


	// Merging the shortcuts, with the given options
	options.shortcuts = extend({}, shortcuts, options.shortcuts || {});


	// Change unique_id to uniqueId for backwards compatibility
	if(options.autosave != undefined && options.autosave.unique_id != undefined && options.autosave.unique_id != "")
		options.autosave.uniqueId = options.autosave.unique_id;


	// Update this options
	this.options = options;


	// Auto render
	this.render();


	// The codemirror component is only available after rendering
	// so, the setter for the initialValue can only run after
	// the element has been rendered
	if(options.initialValue && (!this.options.autosave || this.options.autosave.foundSavedValue !== true)) {
		this.value(options.initialValue);
	}
}

/**
 * Default markdown render.
 */
SimpleMDE.prototype.markdown = function(text) {
	if(marked) {
		// Initialize
		var markedOptions = {};


		// Update options
		if(this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === false) {
			markedOptions.breaks = false;
		} else {
			markedOptions.breaks = true;
		}

		if(this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === true && window.hljs) {
			markedOptions.highlight = function(code) {
				return window.hljs.highlightAuto(code).value;
			};
		}


		// Set options
		marked.setOptions(markedOptions);


		// Return
		return marked(text);
	}
};

/**
 * Render editor to the given element.
 */
SimpleMDE.prototype.render = function(el) {
	if(!el) {
		el = this.element || document.getElementsByTagName("textarea")[0];
	}

	if(this._rendered && this._rendered === el) {
		// Already rendered.
		return;
	}

	this.element = el;
	var options = this.options;

	var self = this;
	var keyMaps = {};

	for(var key in options.shortcuts) {
		// null stands for "do not bind this command"
		if(options.shortcuts[key] !== null && bindings[key] !== null) {
			(function(key) {
				keyMaps[fixShortcut(options.shortcuts[key])] = function() {
					bindings[key](self);
				};
			})(key);
		}
	}

	keyMaps["Enter"] = "newlineAndIndentContinueMarkdownList";
	keyMaps["Tab"] = "tabAndIndentMarkdownList";
	keyMaps["Shift-Tab"] = "shiftTabAndUnindentMarkdownList";
	keyMaps["Esc"] = function(cm) {
		if(cm.getOption("fullScreen")) toggleFullScreen(self);
	};

	document.addEventListener("keydown", function(e) {
		e = e || window.event;

		if(e.keyCode == 27) {
			if(self.codemirror.getOption("fullScreen")) toggleFullScreen(self);
		}
	}, false);

	var mode, backdrop;
	if(options.spellChecker !== false) {
		mode = "spell-checker";
		backdrop = options.parsingConfig;
		backdrop.name = "gfm";
		backdrop.gitHubSpice = false;

		CodeMirrorSpellChecker({
			codeMirrorInstance: CodeMirror
		});
	} else {
		mode = options.parsingConfig;
		mode.name = "gfm";
		mode.gitHubSpice = false;
	}

	this.codemirror = CodeMirror.fromTextArea(el, {
		mode: mode,
		backdrop: backdrop,
		theme: "paper",
		tabSize: (options.tabSize != undefined) ? options.tabSize : 2,
		indentUnit: (options.tabSize != undefined) ? options.tabSize : 2,
		indentWithTabs: (options.indentWithTabs === false) ? false : true,
		lineNumbers: false,
		autofocus: (options.autofocus === true) ? true : false,
		extraKeys: keyMaps,
		lineWrapping: (options.lineWrapping === false) ? false : true,
		allowDropFileTypes: ["text/plain"],
		placeholder: options.placeholder || el.getAttribute("placeholder") || "",
		styleSelectedText: (options.styleSelectedText != undefined) ? options.styleSelectedText : true
	});

	if(options.forceSync === true) {
		var cm = this.codemirror;
		cm.on("change", function() {
			cm.save();
		});
	}

	this.gui = {};

	if(options.toolbar !== false) {
		this.gui.toolbar = this.createToolbar();
	}
	if(options.status !== false) {
		this.gui.statusbar = this.createStatusbar();
	}
	if(options.autosave != undefined && options.autosave.enabled === true) {
		this.autosave();
	}

	this.gui.sideBySide = this.createSideBySide();

	this._rendered = this.element;


	// Fixes CodeMirror bug (#344)
	var temp_cm = this.codemirror;
	setTimeout(function() {
		temp_cm.refresh();
	}.bind(temp_cm), 0);
};

// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem throw QuotaExceededError. We're going to detect this and set a variable accordingly.
function isLocalStorageAvailable() {
	if(typeof localStorage === "object") {
		try {
			localStorage.setItem("smde_localStorage", 1);
			localStorage.removeItem("smde_localStorage");
		} catch(e) {
			return false;
		}
	} else {
		return false;
	}

	return true;
}

SimpleMDE.prototype.autosave = function() {
	if(isLocalStorageAvailable()) {
		var simplemde = this;

		if(this.options.autosave.uniqueId == undefined || this.options.autosave.uniqueId == "") {
			console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");
			return;
		}

		if(simplemde.element.form != null && simplemde.element.form != undefined) {
			simplemde.element.form.addEventListener("submit", function() {
				localStorage.removeItem("smde_" + simplemde.options.autosave.uniqueId);
			});
		}

		if(this.options.autosave.loaded !== true) {
			if(typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) == "string" && localStorage.getItem("smde_" + this.options.autosave.uniqueId) != "") {
				this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId));
				this.options.autosave.foundSavedValue = true;
			}

			this.options.autosave.loaded = true;
		}

		localStorage.setItem("smde_" + this.options.autosave.uniqueId, simplemde.value());

		var el = document.getElementById("autosaved");
		if(el != null && el != undefined && el != "") {
			var d = new Date();
			var hh = d.getHours();
			var m = d.getMinutes();
			var dd = "am";
			var h = hh;
			if(h >= 12) {
				h = hh - 12;
				dd = "pm";
			}
			if(h == 0) {
				h = 12;
			}
			m = m < 10 ? "0" + m : m;

			el.innerHTML = "Autosaved: " + h + ":" + m + " " + dd;
		}

		this.autosaveTimeoutId = setTimeout(function() {
			simplemde.autosave();
		}, this.options.autosave.delay || 10000);
	} else {
		console.log("SimpleMDE: localStorage not available, cannot autosave");
	}
};

SimpleMDE.prototype.clearAutosavedValue = function() {
	if(isLocalStorageAvailable()) {
		if(this.options.autosave == undefined || this.options.autosave.uniqueId == undefined || this.options.autosave.uniqueId == "") {
			console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");
			return;
		}

		localStorage.removeItem("smde_" + this.options.autosave.uniqueId);
	} else {
		console.log("SimpleMDE: localStorage not available, cannot autosave");
	}
};

SimpleMDE.prototype.createSideBySide = function() {
	var cm = this.codemirror;
	var wrapper = cm.getWrapperElement();
	var preview = wrapper.nextSibling;

	if(!preview || !/editor-preview-side/.test(preview.className)) {
		preview = document.createElement("div");
		preview.className = "editor-preview-side";
		wrapper.parentNode.insertBefore(preview, wrapper.nextSibling);
	}

	// Syncs scroll  editor -> preview
	var cScroll = false;
	var pScroll = false;
	cm.on("scroll", function(v) {
		if(cScroll) {
			cScroll = false;
			return;
		}
		pScroll = true;
		var height = v.getScrollInfo().height - v.getScrollInfo().clientHeight;
		var ratio = parseFloat(v.getScrollInfo().top) / height;
		var move = (preview.scrollHeight - preview.clientHeight) * ratio;
		preview.scrollTop = move;
	});

	// Syncs scroll  preview -> editor
	preview.onscroll = function() {
		if(pScroll) {
			pScroll = false;
			return;
		}
		cScroll = true;
		var height = preview.scrollHeight - preview.clientHeight;
		var ratio = parseFloat(preview.scrollTop) / height;
		var move = (cm.getScrollInfo().height - cm.getScrollInfo().clientHeight) * ratio;
		cm.scrollTo(0, move);
	};
	return preview;
};

SimpleMDE.prototype.createToolbar = function(items) {
	items = items || this.options.toolbar;

	if(!items || items.length === 0) {
		return;
	}
	var i;
	for(i = 0; i < items.length; i++) {
		if(toolbarBuiltInButtons[items[i]] != undefined) {
			items[i] = toolbarBuiltInButtons[items[i]];
		}
	}

	var bar = document.createElement("div");
	bar.className = "editor-toolbar";

	var self = this;

	var toolbarData = {};
	self.toolbar = items;

	for(i = 0; i < items.length; i++) {
		if(items[i].name == "guide" && self.options.toolbarGuideIcon === false)
			continue;

		if(self.options.hideIcons && self.options.hideIcons.indexOf(items[i].name) != -1)
			continue;

		// Fullscreen does not work well on mobile devices (even tablets)
		// In the future, hopefully this can be resolved
		if((items[i].name == "fullscreen" || items[i].name == "side-by-side") && isMobile())
			continue;


		// Don't include trailing separators
		if(items[i] === "|") {
			var nonSeparatorIconsFollow = false;

			for(var x = (i + 1); x < items.length; x++) {
				if(items[x] !== "|" && (!self.options.hideIcons || self.options.hideIcons.indexOf(items[x].name) == -1)) {
					nonSeparatorIconsFollow = true;
				}
			}

			if(!nonSeparatorIconsFollow)
				continue;
		}


		// Create the icon and append to the toolbar
		(function(item) {
			var el;
			if(item === "|") {
				el = createSep();
			} else {
				el = createIcon(item, self.options.toolbarTips, self.options.shortcuts);
			}

			// bind events, special for info
			if(item.action) {
				if(typeof item.action === "function") {
					el.onclick = function(e) {
						e.preventDefault();
						item.action(self);
					};
				} else if(typeof item.action === "string") {
					el.href = item.action;
					el.target = "_blank";
				}
			}

			toolbarData[item.name || item] = el;
			bar.appendChild(el);
		})(items[i]);
	}

	self.toolbarElements = toolbarData;

	var cm = this.codemirror;
	cm.on("cursorActivity", function() {
		var stat = getState(cm);

		for(var key in toolbarData) {
			(function(key) {
				var el = toolbarData[key];
				if(stat[key]) {
					el.className += " active";
				} else if(key != "fullscreen" && key != "side-by-side") {
					el.className = el.className.replace(/\s*active\s*/g, "");
				}
			})(key);
		}
	});

	var cmWrapper = cm.getWrapperElement();
	cmWrapper.parentNode.insertBefore(bar, cmWrapper);
	return bar;
};

SimpleMDE.prototype.createStatusbar = function(status) {
	// Initialize
	status = status || this.options.status;
	var options = this.options;
	var cm = this.codemirror;


	// Make sure the status variable is valid
	if(!status || status.length === 0)
		return;


	// Set up the built-in items
	var items = [];
	var i, onUpdate, defaultValue;

	for(i = 0; i < status.length; i++) {
		// Reset some values
		onUpdate = undefined;
		defaultValue = undefined;


		// Handle if custom or not
		if(typeof status[i] === "object") {
			items.push({
				className: status[i].className,
				defaultValue: status[i].defaultValue,
				onUpdate: status[i].onUpdate
			});
		} else {
			var name = status[i];

			if(name === "words") {
				defaultValue = function(el) {
					el.innerHTML = wordCount(cm.getValue());
				};
				onUpdate = function(el) {
					el.innerHTML = wordCount(cm.getValue());
				};
			} else if(name === "lines") {
				defaultValue = function(el) {
					el.innerHTML = cm.lineCount();
				};
				onUpdate = function(el) {
					el.innerHTML = cm.lineCount();
				};
			} else if(name === "cursor") {
				defaultValue = function(el) {
					el.innerHTML = "0:0";
				};
				onUpdate = function(el) {
					var pos = cm.getCursor();
					el.innerHTML = pos.line + ":" + pos.ch;
				};
			} else if(name === "autosave") {
				defaultValue = function(el) {
					if(options.autosave != undefined && options.autosave.enabled === true) {
						el.setAttribute("id", "autosaved");
					}
				};
			}

			items.push({
				className: name,
				defaultValue: defaultValue,
				onUpdate: onUpdate
			});
		}
	}


	// Create element for the status bar
	var bar = document.createElement("div");
	bar.className = "editor-statusbar";


	// Create a new span for each item
	for(i = 0; i < items.length; i++) {
		// Store in temporary variable
		var item = items[i];


		// Create span element
		var el = document.createElement("span");
		el.className = item.className;


		// Ensure the defaultValue is a function
		if(typeof item.defaultValue === "function") {
			item.defaultValue(el);
		}


		// Ensure the onUpdate is a function
		if(typeof item.onUpdate === "function") {
			// Create a closure around the span of the current action, then execute the onUpdate handler
			this.codemirror.on("update", (function(el, item) {
				return function() {
					item.onUpdate(el);
				};
			}(el, item)));
		}


		// Append the item to the status bar
		bar.appendChild(el);
	}


	// Insert the status bar into the DOM
	var cmWrapper = this.codemirror.getWrapperElement();
	cmWrapper.parentNode.insertBefore(bar, cmWrapper.nextSibling);
	return bar;
};

/**
 * Get or set the text content.
 */
SimpleMDE.prototype.value = function(val) {
	if(val === undefined) {
		return this.codemirror.getValue();
	} else {
		this.codemirror.getDoc().setValue(val);
		return this;
	}
};


/**
 * Bind static methods for exports.
 */
SimpleMDE.toggleBold = toggleBold;
SimpleMDE.toggleItalic = toggleItalic;
SimpleMDE.toggleStrikethrough = toggleStrikethrough;
SimpleMDE.toggleBlockquote = toggleBlockquote;
SimpleMDE.toggleHeadingSmaller = toggleHeadingSmaller;
SimpleMDE.toggleHeadingBigger = toggleHeadingBigger;
SimpleMDE.toggleHeading1 = toggleHeading1;
SimpleMDE.toggleHeading2 = toggleHeading2;
SimpleMDE.toggleHeading3 = toggleHeading3;
SimpleMDE.toggleCodeBlock = toggleCodeBlock;
SimpleMDE.toggleUnorderedList = toggleUnorderedList;
SimpleMDE.toggleOrderedList = toggleOrderedList;
SimpleMDE.cleanBlock = cleanBlock;
SimpleMDE.drawLink = drawLink;
SimpleMDE.drawImage = drawImage;
SimpleMDE.drawTable = drawTable;
SimpleMDE.drawHorizontalRule = drawHorizontalRule;
SimpleMDE.undo = undo;
SimpleMDE.redo = redo;
SimpleMDE.togglePreview = togglePreview;
SimpleMDE.toggleSideBySide = toggleSideBySide;
SimpleMDE.toggleFullScreen = toggleFullScreen;

/**
 * Bind instance methods for exports.
 */
SimpleMDE.prototype.toggleBold = function() {
	toggleBold(this);
};
SimpleMDE.prototype.toggleItalic = function() {
	toggleItalic(this);
};
SimpleMDE.prototype.toggleStrikethrough = function() {
	toggleStrikethrough(this);
};
SimpleMDE.prototype.toggleBlockquote = function() {
	toggleBlockquote(this);
};
SimpleMDE.prototype.toggleHeadingSmaller = function() {
	toggleHeadingSmaller(this);
};
SimpleMDE.prototype.toggleHeadingBigger = function() {
	toggleHeadingBigger(this);
};
SimpleMDE.prototype.toggleHeading1 = function() {
	toggleHeading1(this);
};
SimpleMDE.prototype.toggleHeading2 = function() {
	toggleHeading2(this);
};
SimpleMDE.prototype.toggleHeading3 = function() {
	toggleHeading3(this);
};
SimpleMDE.prototype.toggleCodeBlock = function() {
	toggleCodeBlock(this);
};
SimpleMDE.prototype.toggleUnorderedList = function() {
	toggleUnorderedList(this);
};
SimpleMDE.prototype.toggleOrderedList = function() {
	toggleOrderedList(this);
};
SimpleMDE.prototype.cleanBlock = function() {
	cleanBlock(this);
};
SimpleMDE.prototype.drawLink = function() {
	drawLink(this);
};
SimpleMDE.prototype.drawImage = function() {
	drawImage(this);
};
SimpleMDE.prototype.drawTable = function() {
	drawTable(this);
};
SimpleMDE.prototype.drawHorizontalRule = function() {
	drawHorizontalRule(this);
};
SimpleMDE.prototype.undo = function() {
	undo(this);
};
SimpleMDE.prototype.redo = function() {
	redo(this);
};
SimpleMDE.prototype.togglePreview = function() {
	togglePreview(this);
};
SimpleMDE.prototype.toggleSideBySide = function() {
	toggleSideBySide(this);
};
SimpleMDE.prototype.toggleFullScreen = function() {
	toggleFullScreen(this);
};

SimpleMDE.prototype.isPreviewActive = function() {
	var cm = this.codemirror;
	var wrapper = cm.getWrapperElement();
	var preview = wrapper.lastChild;

	return /editor-preview-active/.test(preview.className);
};

SimpleMDE.prototype.isSideBySideActive = function() {
	var cm = this.codemirror;
	var wrapper = cm.getWrapperElement();
	var preview = wrapper.nextSibling;

	return /editor-preview-active-side/.test(preview.className);
};

SimpleMDE.prototype.isFullscreenActive = function() {
	var cm = this.codemirror;

	return cm.getOption("fullScreen");
};

SimpleMDE.prototype.getState = function() {
	var cm = this.codemirror;

	return getState(cm);
};

SimpleMDE.prototype.toTextArea = function() {
	var cm = this.codemirror;
	var wrapper = cm.getWrapperElement();

	if(wrapper.parentNode) {
		if(this.gui.toolbar) {
			wrapper.parentNode.removeChild(this.gui.toolbar);
		}
		if(this.gui.statusbar) {
			wrapper.parentNode.removeChild(this.gui.statusbar);
		}
		if(this.gui.sideBySide) {
			wrapper.parentNode.removeChild(this.gui.sideBySide);
		}
	}

	cm.toTextArea();

	if(this.autosaveTimeoutId) {
		clearTimeout(this.autosaveTimeoutId);
		this.autosaveTimeoutId = undefined;
		this.clearAutosavedValue();
	}
};

module.exports = SimpleMDE;

/***/ }),

/***/ "./node_modules/social-share-button.js/dist/social-share.min.js":
/*!**********************************************************************!*\
  !*** ./node_modules/social-share-button.js/dist/social-share.min.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! jQuery */ "jquery")):"function"==typeof define&&define.amd?define(["jQuery"],e):"object"==typeof exports?exports.SocialShare=e(require("jQuery")):t.SocialShare=e(t.jQuery)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=48)}([function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";e.__esModule=!0;var r=n(49),o=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(15),o=n(35),u=n(20),i=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=u(e,!0),r(n),o)try{return i(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){t.exports=!n(17)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports={default:n(55),__esModule:!0}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){"use strict";e.__esModule=!0;var r=n(40),o=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==(void 0===e?"undefined":(0,o.default)(e))&&"function"!=typeof e?t:e}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(83),u=r(o),i=n(87),f=r(i),c=n(40),a=r(c);e.default=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":(0,a.default)(e)));t.prototype=(0,f.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(u.default?(0,u.default)(t,e):t.__proto__=e)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),u=r(o),i=n(1),f=r(i),c=n(37),a=r(c),s=n(90),l=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(s),p=function(){function t(e){(0,u.default)(this,t),this.options=a.default.extend({width:575,height:400,iconClass:"social-share-icon social-share-icon-"+this.getName()},e),this.element=this._createDomNode()}return(0,f.default)(t,[{key:"getName",value:function(){return"provider"}},{key:"getElement",value:function(){return this.element}},{key:"_createDomNode",value:function(){var t='<a href="javascript:void(0)" class="'+this.options.iconClass+'"></a>',e=(0,a.default)(t);return this._bindEvents(e),e}},{key:"_createUrl",value:function(){var t=this;return this._getUrlTemplate().replace(/\{(\w+)\}/g,function(e){var n=e.slice(1,-1);return void 0!==t.options[n]?t.options[n]:""})}},{key:"_getUrlTemplate",value:function(){return""}},{key:"_bindEvents",value:function(t){var e=this;t.on("click",function(){l.openWin(e._createUrl(),e.options.width,e.options.height).focus()})}}]),t}();e.default=p},function(t,e,n){var r=n(2),o=n(3),u=n(34),i=n(12),f=function(t,e,n){var c,a,s,l=t&f.F,p=t&f.G,d=t&f.S,v=t&f.P,y=t&f.B,h=t&f.W,_=p?o:o[e]||(o[e]={}),m=_.prototype,b=p?r:d?r[e]:(r[e]||{}).prototype;p&&(n=e);for(c in n)(a=!l&&b&&void 0!==b[c])&&c in _||(s=a?b[c]:n[c],_[c]=p&&"function"!=typeof b[c]?n[c]:y&&a?u(s,r):h&&b[c]==s?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(s):v&&"function"==typeof s?u(Function.call,s):s,v&&((_.virtual||(_.virtual={}))[c]=s,t&f.R&&m&&!m[c]&&i(m,c,s)))};f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},function(t,e,n){var r=n(4),o=n(18);t.exports=n(5)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(64),o=n(21);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(23)("wks"),o=n(19),u=n(2).Symbol,i="function"==typeof u;(t.exports=function(t){return r[t]||(r[t]=i&&u[t]||(i?u:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(16);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(16);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(23)("keys"),o=n(19);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(2),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=!0},function(t,e){t.exports={}},function(t,e,n){var r=n(15),o=n(63),u=n(29),i=n(22)("IE_PROTO"),f=function(){},c=function(){var t,e=n(36)("iframe"),r=u.length;for(e.style.display="none",n(68).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c.prototype[u[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(f.prototype=r(t),n=new f,f.prototype=null,n[i]=t):n=c(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(43),o=n(29);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(4).f,o=n(7),u=n(14)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,u)&&r(t,u,{configurable:!0,value:e})}},function(t,e,n){e.f=n(14)},function(t,e,n){var r=n(2),o=n(3),u=n(25),i=n(31),f=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=u?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||f(e,t,{value:i.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(52);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){t.exports=!n(5)&&!n(17)(function(){return 7!=Object.defineProperty(n(36)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(16),o=n(2).document,u=r(o)&&r(o.createElement);t.exports=function(t){return u?o.createElement(t):{}}},function(e,n){e.exports=t},function(t,e,n){var r=n(21);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(7),o=n(38),u=n(22)("IE_PROTO"),i=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,u)?t[u]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?i:null}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(58),u=r(o),i=n(73),f=r(i),c="function"==typeof f.default&&"symbol"==typeof u.default?function(t){return typeof t}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":typeof t};e.default="function"==typeof f.default&&"symbol"===c(u.default)?function(t){return void 0===t?"undefined":c(t)}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":void 0===t?"undefined":c(t)}},function(t,e,n){"use strict";var r=n(25),o=n(11),u=n(42),i=n(12),f=n(7),c=n(26),a=n(62),s=n(30),l=n(39),p=n(14)("iterator"),d=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,n,y,h,_,m){a(n,e,y);var b,g,O,x=function(t){if(!d&&t in M)return M[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==h,j=!1,M=t.prototype,P=M[p]||M["@@iterator"]||h&&M[h],k=P||x(h),E=h?S?x("entries"):k:void 0,T="Array"==e?M.entries||P:P;if(T&&(O=l(T.call(new t)))!==Object.prototype&&O.next&&(s(O,w,!0),r||f(O,p)||i(O,p,v)),S&&P&&"values"!==P.name&&(j=!0,k=function(){return P.call(this)}),r&&!m||!d&&!j&&M[p]||i(M,p,k),c[e]=k,c[w]=v,h)if(b={values:S?k:x("values"),keys:_?k:x("keys"),entries:E},m)for(g in b)g in M||u(M,g,b[g]);else o(o.P+o.F*(d||j),e,b);return b}},function(t,e,n){t.exports=n(12)},function(t,e,n){var r=n(7),o=n(13),u=n(65)(!1),i=n(22)("IE_PROTO");t.exports=function(t,e){var n,f=o(t),c=0,a=[];for(n in f)n!=i&&r(f,n)&&a.push(n);for(;e.length>c;)r(f,n=e[c++])&&(~u(a,n)||a.push(n));return a}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(43),o=n(29).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(33),o=n(18),u=n(13),i=n(20),f=n(7),c=n(35),a=Object.getOwnPropertyDescriptor;e.f=n(5)?a:function(t,e){if(t=u(t),e=i(e,!0),c)try{return a(t,e)}catch(t){}if(f(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(0),u=r(o),i=n(1),f=r(i);n(53);var c=n(37),a=r(c),s=n(54),l=r(s),p=n(91),d=r(p),v=n(92),y=r(v),h=n(93),_=r(h),m=n(94),b=r(m),g=n(95),O=r(g),x=n(96),w=r(x),S=function(){function t(e,n){(0,u.default)(this,t),this.container=(0,a.default)(e),this.providerClassMap={baidu:l.default,weibo:d.default,qq:y.default,qzone:_.default,douban:b.default,facebook:O.default,twitter:w.default},this.options=this._resolveOptions(n),this._resolveContainerClass(),this.providers=this._createProviders();for(var r in this.providers)this.container.append(this.providers[r].getElement())}return(0,f.default)(t,[{key:"getProvider",value:function(t){return void 0===this.providers[t]?null:this.providers[t]}},{key:"_createProviders",value:function(){var t={};for(var e in this.options)if(void 0!==this.providerClassMap[e]&&!1!==this.options[e]){var n=this._mergeProviderOptions(this.options[e]);t[e]=new this.providerClassMap[e](n)}return t}},{key:"_resolveOptions",value:function(t){return t=a.default.extend({theme:"default",weibo:!0,qq:!0,qzone:!0,baidu:!0,douban:!0,facebook:!0,twitter:!0},t),void 0===t.title&&(t.title=document.title),void 0===t.url&&(t.url=location.href),void 0===t.summary&&(t.summary=t.title),t}},{key:"_resolveContainerClass",value:function(){var t="social-share-button";this.options.theme&&(t+=" social-share-button-"+this.options.theme),this.container.addClass(t)}},{key:"_mergeProviderOptions",value:function(t){return!0===t&&(t={}),t.title||(t.title=this.options.title),t.url||(t.url=this.options.url),!t.image&&this.options.image&&(t.image=this.options.image),t.summary||(t.summary=this.options.summary),t.image&&(t.image=encodeURIComponent(t.image)),t.url=encodeURIComponent(t.url),t}}]),t}();t.exports=S},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){n(51);var r=n(3).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(11);r(r.S+r.F*!n(5),"Object",{defineProperty:n(4).f})},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(t){return(0,f.default)(this,e),t.desc||(t.desc=t.summary),t.comment||(t.comment=t.summary),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).call(this,t))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"tieba"}},{key:"_getUrlTemplate",value:function(){return"http://tieba.baidu.com/f/commit/share/openShareApi?url={url}&title={title}&desc={desc}&comment={comment}"}}]),e}(y.default);e.default=h},function(t,e,n){n(56),t.exports=n(3).Object.getPrototypeOf},function(t,e,n){var r=n(38),o=n(39);n(57)("getPrototypeOf",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(11),o=n(3),u=n(17);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],i={};i[t]=e(n),r(r.S+r.F*u(function(){n(1)}),"Object",i)}},function(t,e,n){t.exports={default:n(59),__esModule:!0}},function(t,e,n){n(60),n(69),t.exports=n(31).f("iterator")},function(t,e,n){"use strict";var r=n(61)(!0);n(41)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(24),o=n(21);t.exports=function(t){return function(e,n){var u,i,f=String(o(e)),c=r(n),a=f.length;return c<0||c>=a?t?"":void 0:(u=f.charCodeAt(c),u<55296||u>56319||c+1===a||(i=f.charCodeAt(c+1))<56320||i>57343?t?f.charAt(c):u:t?f.slice(c,c+2):i-56320+(u-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(27),o=n(18),u=n(30),i={};n(12)(i,n(14)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(i,{next:o(1,n)}),u(t,e+" Iterator")}},function(t,e,n){var r=n(4),o=n(15),u=n(28);t.exports=n(5)?Object.defineProperties:function(t,e){o(t);for(var n,i=u(e),f=i.length,c=0;f>c;)r.f(t,n=i[c++],e[n]);return t}},function(t,e,n){var r=n(44);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(13),o=n(66),u=n(67);t.exports=function(t){return function(e,n,i){var f,c=r(e),a=o(c.length),s=u(i,a);if(t&&n!=n){for(;a>s;)if((f=c[s++])!=f)return!0}else for(;a>s;s++)if((t||s in c)&&c[s]===n)return t||s||0;return!t&&-1}}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(24),o=Math.max,u=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):u(t,e)}},function(t,e,n){var r=n(2).document;t.exports=r&&r.documentElement},function(t,e,n){n(70);for(var r=n(2),o=n(12),u=n(26),i=n(14)("toStringTag"),f="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<f.length;c++){var a=f[c],s=r[a],l=s&&s.prototype;l&&!l[i]&&o(l,i,a),u[a]=u.Array}},function(t,e,n){"use strict";var r=n(71),o=n(72),u=n(26),i=n(13);t.exports=n(41)(Array,"Array",function(t,e){this._t=i(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),u.Arguments=u.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(74),__esModule:!0}},function(t,e,n){n(75),n(80),n(81),n(82),t.exports=n(3).Symbol},function(t,e,n){"use strict";var r=n(2),o=n(7),u=n(5),i=n(11),f=n(42),c=n(76).KEY,a=n(17),s=n(23),l=n(30),p=n(19),d=n(14),v=n(31),y=n(32),h=n(77),_=n(78),m=n(15),b=n(13),g=n(20),O=n(18),x=n(27),w=n(79),S=n(47),j=n(4),M=n(28),P=S.f,k=j.f,E=w.f,T=r.Symbol,L=r.JSON,C=L&&L.stringify,N=d("_hidden"),q=d("toPrimitive"),A={}.propertyIsEnumerable,F=s("symbol-registry"),I=s("symbols"),U=s("op-symbols"),R=Object.prototype,D="function"==typeof T,z=r.QObject,G=!z||!z.prototype||!z.prototype.findChild,W=u&&a(function(){return 7!=x(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=P(R,e);r&&delete R[e],k(t,e,n),r&&t!==R&&k(R,e,r)}:k,V=function(t){var e=I[t]=x(T.prototype);return e._k=t,e},H=D&&"symbol"==typeof T.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof T},Q=function(t,e,n){return t===R&&Q(U,e,n),m(t),e=g(e,!0),m(n),o(I,e)?(n.enumerable?(o(t,N)&&t[N][e]&&(t[N][e]=!1),n=x(n,{enumerable:O(0,!1)})):(o(t,N)||k(t,N,O(1,{})),t[N][e]=!0),W(t,e,n)):k(t,e,n)},J=function(t,e){m(t);for(var n,r=h(e=b(e)),o=0,u=r.length;u>o;)Q(t,n=r[o++],e[n]);return t},K=function(t,e){return void 0===e?x(t):J(x(t),e)},B=function(t){var e=A.call(this,t=g(t,!0));return!(this===R&&o(I,t)&&!o(U,t))&&(!(e||!o(this,t)||!o(I,t)||o(this,N)&&this[N][t])||e)},Y=function(t,e){if(t=b(t),e=g(e,!0),t!==R||!o(I,e)||o(U,e)){var n=P(t,e);return!n||!o(I,e)||o(t,N)&&t[N][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=E(b(t)),r=[],u=0;n.length>u;)o(I,e=n[u++])||e==N||e==c||r.push(e);return r},Z=function(t){for(var e,n=t===R,r=E(n?U:b(t)),u=[],i=0;r.length>i;)!o(I,e=r[i++])||n&&!o(R,e)||u.push(I[e]);return u};D||(T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(U,n),o(this,N)&&o(this[N],t)&&(this[N][t]=!1),W(this,t,O(1,n))};return u&&G&&W(R,t,{configurable:!0,set:e}),V(t)},f(T.prototype,"toString",function(){return this._k}),S.f=Y,j.f=Q,n(46).f=w.f=X,n(33).f=B,n(45).f=Z,u&&!n(25)&&f(R,"propertyIsEnumerable",B,!0),v.f=function(t){return V(d(t))}),i(i.G+i.W+i.F*!D,{Symbol:T});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;$.length>tt;)d($[tt++]);for(var et=M(d.store),nt=0;et.length>nt;)y(et[nt++]);i(i.S+i.F*!D,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=T(t)},keyFor:function(t){if(!H(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){G=!0},useSimple:function(){G=!1}}),i(i.S+i.F*!D,"Object",{create:K,defineProperty:Q,defineProperties:J,getOwnPropertyDescriptor:Y,getOwnPropertyNames:X,getOwnPropertySymbols:Z}),L&&i(i.S+i.F*(!D||a(function(){var t=T();return"[null]"!=C([t])||"{}"!=C({a:t})||"{}"!=C(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!H(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&_(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!H(e))return e}),r[1]=e,C.apply(L,r)}}}),T.prototype[q]||n(12)(T.prototype,q,T.prototype.valueOf),l(T,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(19)("meta"),o=n(16),u=n(7),i=n(4).f,f=0,c=Object.isExtensible||function(){return!0},a=!n(17)(function(){return c(Object.preventExtensions({}))}),s=function(t){i(t,r,{value:{i:"O"+ ++f,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!u(t,r)){if(!c(t))return"F";if(!e)return"E";s(t)}return t[r].i},p=function(t,e){if(!u(t,r)){if(!c(t))return!0;if(!e)return!1;s(t)}return t[r].w},d=function(t){return a&&v.NEED&&c(t)&&!u(t,r)&&s(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(28),o=n(45),u=n(33);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var i,f=n(t),c=u.f,a=0;f.length>a;)c.call(t,i=f[a++])&&e.push(i);return e}},function(t,e,n){var r=n(44);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(13),o=n(46).f,u={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],f=function(t){try{return o(t)}catch(t){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==u.call(t)?f(t):o(r(t))}},function(t,e){},function(t,e,n){n(32)("asyncIterator")},function(t,e,n){n(32)("observable")},function(t,e,n){t.exports={default:n(84),__esModule:!0}},function(t,e,n){n(85),t.exports=n(3).Object.setPrototypeOf},function(t,e,n){var r=n(11);r(r.S,"Object",{setPrototypeOf:n(86).set})},function(t,e,n){var r=n(16),o=n(15),u=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n(34)(Function.call,n(47).f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return u(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:u}},function(t,e,n){t.exports={default:n(88),__esModule:!0}},function(t,e,n){n(89);var r=n(3).Object;t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){var r=n(11);r(r.S,"Object",{create:n(27)})},function(t,e,n){"use strict";function r(t,e,n){var r=void 0,o=void 0,u=void 0,i=void 0;return e&&n?(o=document.documentElement.clientWidth/2-e/2,u=(document.documentElement.clientHeight-n)/2,i="status=1,resizable=yes,width="+e+",height="+n+",top="+u+",left="+o,r=window.open(t,"",i)):r=window.open(t),r}Object.defineProperty(e,"__esModule",{value:!0}),e.openWin=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(){return(0,f.default)(this,e),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).apply(this,arguments))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"weibo"}},{key:"_getUrlTemplate",value:function(){return"http://service.weibo.com/share/share.php?url={url}&appkey={appKey}&title={title}&pic={image}&searchPic=true"}}]),e}(y.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(t){return(0,f.default)(this,e),t.desc||(t.desc=t.summary),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).call(this,t))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"qq"}},{key:"_getUrlTemplate",value:function(){return"http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&source={source}&desc={desc}&pics={image}"}}]),e}(y.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(t){return(0,f.default)(this,e),t.desc||(t.desc=t.summary),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).call(this,t))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"qzone"}},{key:"_getUrlTemplate",value:function(){return"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&desc={desc}&summary={summary}&site={site}"}}]),e}(y.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(){return(0,f.default)(this,e),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).apply(this,arguments))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"douban"}},{key:"_getUrlTemplate",value:function(){return"https://www.douban.com/share/service?name={title}&href={url}&image={image}&url={url}&title={title}"}}]),e}(y.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(){return(0,f.default)(this,e),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).apply(this,arguments))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"facebook"}},{key:"_getUrlTemplate",value:function(){return"https://www.facebook.com/sharer.php?s=100&p[url]={url}&p[images][0]={image}&p[title]={title}&p[summary]={summary}"}}]),e}(y.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o),i=n(0),f=r(i),c=n(1),a=r(c),s=n(8),l=r(s),p=n(9),d=r(p),v=n(10),y=r(v),h=function(t){function e(){return(0,f.default)(this,e),(0,l.default)(this,(e.__proto__||(0,u.default)(e)).apply(this,arguments))}return(0,d.default)(e,t),(0,a.default)(e,[{key:"getName",value:function(){return"twitter"}},{key:"_getUrlTemplate",value:function(){return"https://twitter.com/intent/tweet?url={url}&text={title}&via={via}&hashtags={hashtags}"}}]),e}(y.default);e.default=h}])});
//# sourceMappingURL=social-share.min.js.map

/***/ }),

/***/ "./node_modules/typo-js/typo.js":
/*!**************************************!*\
  !*** ./node_modules/typo-js/typo.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname, Buffer) {/* globals chrome: false */
/* globals __dirname: false */
/* globals require: false */
/* globals Buffer: false */
/* globals module: false */

/**
 * Typo is a JavaScript implementation of a spellchecker using hunspell-style 
 * dictionaries.
 */

var Typo;

(function () {
"use strict";

/**
 * Typo constructor.
 *
 * @param {String} [dictionary] The locale code of the dictionary being used. e.g.,
 *                              "en_US". This is only used to auto-load dictionaries.
 * @param {String} [affData]    The data from the dictionary's .aff file. If omitted
 *                              and Typo.js is being used in a Chrome extension, the .aff
 *                              file will be loaded automatically from
 *                              lib/typo/dictionaries/[dictionary]/[dictionary].aff
 *                              In other environments, it will be loaded from
 *                              [settings.dictionaryPath]/dictionaries/[dictionary]/[dictionary].aff
 * @param {String} [wordsData]  The data from the dictionary's .dic file. If omitted
 *                              and Typo.js is being used in a Chrome extension, the .dic
 *                              file will be loaded automatically from
 *                              lib/typo/dictionaries/[dictionary]/[dictionary].dic
 *                              In other environments, it will be loaded from
 *                              [settings.dictionaryPath]/dictionaries/[dictionary]/[dictionary].dic
 * @param {Object} [settings]   Constructor settings. Available properties are:
 *                              {String} [dictionaryPath]: path to load dictionary from in non-chrome
 *                              environment.
 *                              {Object} [flags]: flag information.
 *                              {Boolean} [asyncLoad]: If true, affData and wordsData will be loaded
 *                              asynchronously.
 *                              {Function} [loadedCallback]: Called when both affData and wordsData
 *                              have been loaded. Only used if asyncLoad is set to true. The parameter
 *                              is the instantiated Typo object.
 *
 * @returns {Typo} A Typo object.
 */

Typo = function (dictionary, affData, wordsData, settings) {
	settings = settings || {};

	this.dictionary = null;
	
	this.rules = {};
	this.dictionaryTable = {};
	
	this.compoundRules = [];
	this.compoundRuleCodes = {};
	
	this.replacementTable = [];
	
	this.flags = settings.flags || {}; 
	
	this.memoized = {};

	this.loaded = false;
	
	var self = this;
	
	var path;
	
	// Loop-control variables.
	var i, j, _len, _jlen;
	
	if (dictionary) {
		self.dictionary = dictionary;
		
		// If the data is preloaded, just setup the Typo object.
		if (affData && wordsData) {
			setup();
		}
		// Loading data for Chrome extentions.
		else if (typeof window !== 'undefined' && 'chrome' in window && 'extension' in window.chrome && 'getURL' in window.chrome.extension) {
			if (settings.dictionaryPath) {
				path = settings.dictionaryPath;
			}
			else {
				path = "typo/dictionaries";
			}
			
			if (!affData) readDataFile(chrome.extension.getURL(path + "/" + dictionary + "/" + dictionary + ".aff"), setAffData);
			if (!wordsData) readDataFile(chrome.extension.getURL(path + "/" + dictionary + "/" + dictionary + ".dic"), setWordsData);
		}
		else {
			if (settings.dictionaryPath) {
				path = settings.dictionaryPath;
			}
			else if (true) {
				path = __dirname + '/dictionaries';
			}
			else {
				path = './dictionaries';
			}
			
			if (!affData) readDataFile(path + "/" + dictionary + "/" + dictionary + ".aff", setAffData);
			if (!wordsData) readDataFile(path + "/" + dictionary + "/" + dictionary + ".dic", setWordsData);
		}
	}
	
	function readDataFile(url, setFunc) {
		var response = self._readFile(url, null, settings.asyncLoad);
		
		if (settings.asyncLoad) {
			response.then(function(data) {
				setFunc(data);
			});
		}
		else {
			setFunc(response);
		}
	}

	function setAffData(data) {
		affData = data;

		if (wordsData) {
			setup();
		}
	}

	function setWordsData(data) {
		wordsData = data;

		if (affData) {
			setup();
		}
	}

	function setup() {
		self.rules = self._parseAFF(affData);
		
		// Save the rule codes that are used in compound rules.
		self.compoundRuleCodes = {};
		
		for (i = 0, _len = self.compoundRules.length; i < _len; i++) {
			var rule = self.compoundRules[i];
			
			for (j = 0, _jlen = rule.length; j < _jlen; j++) {
				self.compoundRuleCodes[rule[j]] = [];
			}
		}
		
		// If we add this ONLYINCOMPOUND flag to self.compoundRuleCodes, then _parseDIC
		// will do the work of saving the list of words that are compound-only.
		if ("ONLYINCOMPOUND" in self.flags) {
			self.compoundRuleCodes[self.flags.ONLYINCOMPOUND] = [];
		}
		
		self.dictionaryTable = self._parseDIC(wordsData);
		
		// Get rid of any codes from the compound rule codes that are never used 
		// (or that were special regex characters).  Not especially necessary... 
		for (i in self.compoundRuleCodes) {
			if (self.compoundRuleCodes[i].length === 0) {
				delete self.compoundRuleCodes[i];
			}
		}
		
		// Build the full regular expressions for each compound rule.
		// I have a feeling (but no confirmation yet) that this method of 
		// testing for compound words is probably slow.
		for (i = 0, _len = self.compoundRules.length; i < _len; i++) {
			var ruleText = self.compoundRules[i];
			
			var expressionText = "";
			
			for (j = 0, _jlen = ruleText.length; j < _jlen; j++) {
				var character = ruleText[j];
				
				if (character in self.compoundRuleCodes) {
					expressionText += "(" + self.compoundRuleCodes[character].join("|") + ")";
				}
				else {
					expressionText += character;
				}
			}
			
			self.compoundRules[i] = new RegExp(expressionText, "i");
		}
		
		self.loaded = true;
		
		if (settings.asyncLoad && settings.loadedCallback) {
			settings.loadedCallback(self);
		}
	}
	
	return this;
};

Typo.prototype = {
	/**
	 * Loads a Typo instance from a hash of all of the Typo properties.
	 *
	 * @param object obj A hash of Typo properties, probably gotten from a JSON.parse(JSON.stringify(typo_instance)).
	 */
	
	load : function (obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				this[i] = obj[i];
			}
		}
		
		return this;
	},
	
	/**
	 * Read the contents of a file.
	 * 
	 * @param {String} path The path (relative) to the file.
	 * @param {String} [charset="ISO8859-1"] The expected charset of the file
	 * @param {Boolean} async If true, the file will be read asynchronously. For node.js this does nothing, all
	 *        files are read synchronously.
	 * @returns {String} The file data if async is false, otherwise a promise object. If running node.js, the data is
	 *          always returned.
	 */
	
	_readFile : function (path, charset, async) {
		charset = charset || "utf8";
		
		if (typeof XMLHttpRequest !== 'undefined') {
			var promise;
			var req = new XMLHttpRequest();
			req.open("GET", path, async);
			
			if (async) {
				promise = new Promise(function(resolve, reject) {
					req.onload = function() {
						if (req.status === 200) {
							resolve(req.responseText);
						}
						else {
							reject(req.statusText);
						}
					};
					
					req.onerror = function() {
						reject(req.statusText);
					}
				});
			}
		
			if (req.overrideMimeType)
				req.overrideMimeType("text/plain; charset=" + charset);
		
			req.send(null);
			
			return async ? promise : req.responseText;
		}
		else if (true) {
			// Node.js
			var fs = __webpack_require__(/*! fs */ 0);
			
			try {
				if (fs.existsSync(path)) {
					var stats = fs.statSync(path);
					
					var fileDescriptor = fs.openSync(path, 'r');
					
					var buffer = new Buffer(stats.size);
					
					fs.readSync(fileDescriptor, buffer, 0, buffer.length, null);
					
					return buffer.toString(charset, 0, buffer.length);
				}
				else {
					console.log("Path " + path + " does not exist.");
				}
			} catch (e) {
				console.log(e);
				return '';
			}
		}
	},
	
	/**
	 * Parse the rules out from a .aff file.
	 *
	 * @param {String} data The contents of the affix file.
	 * @returns object The rules from the file.
	 */
	
	_parseAFF : function (data) {
		var rules = {};
		
		var line, subline, numEntries, lineParts;
		var i, j, _len, _jlen;
		
		// Remove comment lines
		data = this._removeAffixComments(data);
		
		var lines = data.split("\n");
		
		for (i = 0, _len = lines.length; i < _len; i++) {
			line = lines[i];
			
			var definitionParts = line.split(/\s+/);
			
			var ruleType = definitionParts[0];
			
			if (ruleType == "PFX" || ruleType == "SFX") {
				var ruleCode = definitionParts[1];
				var combineable = definitionParts[2];
				numEntries = parseInt(definitionParts[3], 10);
				
				var entries = [];
				
				for (j = i + 1, _jlen = i + 1 + numEntries; j < _jlen; j++) {
					subline = lines[j];
					
					lineParts = subline.split(/\s+/);
					var charactersToRemove = lineParts[2];
					
					var additionParts = lineParts[3].split("/");
					
					var charactersToAdd = additionParts[0];
					if (charactersToAdd === "0") charactersToAdd = "";
					
					var continuationClasses = this.parseRuleCodes(additionParts[1]);
					
					var regexToMatch = lineParts[4];
					
					var entry = {};
					entry.add = charactersToAdd;
					
					if (continuationClasses.length > 0) entry.continuationClasses = continuationClasses;
					
					if (regexToMatch !== ".") {
						if (ruleType === "SFX") {
							entry.match = new RegExp(regexToMatch + "$");
						}
						else {
							entry.match = new RegExp("^" + regexToMatch);
						}
					}
					
					if (charactersToRemove != "0") {
						if (ruleType === "SFX") {
							entry.remove = new RegExp(charactersToRemove  + "$");
						}
						else {
							entry.remove = charactersToRemove;
						}
					}
					
					entries.push(entry);
				}
				
				rules[ruleCode] = { "type" : ruleType, "combineable" : (combineable == "Y"), "entries" : entries };
				
				i += numEntries;
			}
			else if (ruleType === "COMPOUNDRULE") {
				numEntries = parseInt(definitionParts[1], 10);
				
				for (j = i + 1, _jlen = i + 1 + numEntries; j < _jlen; j++) {
					line = lines[j];
					
					lineParts = line.split(/\s+/);
					this.compoundRules.push(lineParts[1]);
				}
				
				i += numEntries;
			}
			else if (ruleType === "REP") {
				lineParts = line.split(/\s+/);
				
				if (lineParts.length === 3) {
					this.replacementTable.push([ lineParts[1], lineParts[2] ]);
				}
			}
			else {
				// ONLYINCOMPOUND
				// COMPOUNDMIN
				// FLAG
				// KEEPCASE
				// NEEDAFFIX
				
				this.flags[ruleType] = definitionParts[1];
			}
		}
		
		return rules;
	},
	
	/**
	 * Removes comment lines and then cleans up blank lines and trailing whitespace.
	 *
	 * @param {String} data The data from an affix file.
	 * @return {String} The cleaned-up data.
	 */
	
	_removeAffixComments : function (data) {
		// Remove comments
		// This used to remove any string starting with '#' up to the end of the line,
		// but some COMPOUNDRULE definitions include '#' as part of the rule.
		// I haven't seen any affix files that use comments on the same line as real data,
		// so I don't think this will break anything.
		data = data.replace(/^\s*#.*$/mg, "");
		
		// Trim each line
		data = data.replace(/^\s\s*/m, '').replace(/\s\s*$/m, '');
		
		// Remove blank lines.
		data = data.replace(/\n{2,}/g, "\n");
		
		// Trim the entire string
		data = data.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		return data;
	},
	
	/**
	 * Parses the words out from the .dic file.
	 *
	 * @param {String} data The data from the dictionary file.
	 * @returns object The lookup table containing all of the words and
	 *                 word forms from the dictionary.
	 */
	
	_parseDIC : function (data) {
		data = this._removeDicComments(data);
		
		var lines = data.split("\n");
		var dictionaryTable = {};
		
		function addWord(word, rules) {
			// Some dictionaries will list the same word multiple times with different rule sets.
			if (!dictionaryTable.hasOwnProperty(word)) {
				dictionaryTable[word] = null;
			}
			
			if (rules.length > 0) {
				if (dictionaryTable[word] === null) {
					dictionaryTable[word] = [];
				}

				dictionaryTable[word].push(rules);
			}
		}
		
		// The first line is the number of words in the dictionary.
		for (var i = 1, _len = lines.length; i < _len; i++) {
			var line = lines[i];
			
			var parts = line.split("/", 2);
			
			var word = parts[0];

			// Now for each affix rule, generate that form of the word.
			if (parts.length > 1) {
				var ruleCodesArray = this.parseRuleCodes(parts[1]);
				
				// Save the ruleCodes for compound word situations.
				if (!("NEEDAFFIX" in this.flags) || ruleCodesArray.indexOf(this.flags.NEEDAFFIX) == -1) {
					addWord(word, ruleCodesArray);
				}
				
				for (var j = 0, _jlen = ruleCodesArray.length; j < _jlen; j++) {
					var code = ruleCodesArray[j];
					
					var rule = this.rules[code];
					
					if (rule) {
						var newWords = this._applyRule(word, rule);
						
						for (var ii = 0, _iilen = newWords.length; ii < _iilen; ii++) {
							var newWord = newWords[ii];
							
							addWord(newWord, []);
							
							if (rule.combineable) {
								for (var k = j + 1; k < _jlen; k++) {
									var combineCode = ruleCodesArray[k];
									
									var combineRule = this.rules[combineCode];
									
									if (combineRule) {
										if (combineRule.combineable && (rule.type != combineRule.type)) {
											var otherNewWords = this._applyRule(newWord, combineRule);
											
											for (var iii = 0, _iiilen = otherNewWords.length; iii < _iiilen; iii++) {
												var otherNewWord = otherNewWords[iii];
												addWord(otherNewWord, []);
											}
										}
									}
								}
							}
						}
					}
					
					if (code in this.compoundRuleCodes) {
						this.compoundRuleCodes[code].push(word);
					}
				}
			}
			else {
				addWord(word.trim(), []);
			}
		}
		
		return dictionaryTable;
	},
	
	
	/**
	 * Removes comment lines and then cleans up blank lines and trailing whitespace.
	 *
	 * @param {String} data The data from a .dic file.
	 * @return {String} The cleaned-up data.
	 */
	
	_removeDicComments : function (data) {
		// I can't find any official documentation on it, but at least the de_DE
		// dictionary uses tab-indented lines as comments.
		
		// Remove comments
		data = data.replace(/^\t.*$/mg, "");
		
		return data;
	},
	
	parseRuleCodes : function (textCodes) {
		if (!textCodes) {
			return [];
		}
		else if (!("FLAG" in this.flags)) {
			return textCodes.split("");
		}
		else if (this.flags.FLAG === "long") {
			var flags = [];
			
			for (var i = 0, _len = textCodes.length; i < _len; i += 2) {
				flags.push(textCodes.substr(i, 2));
			}
			
			return flags;
		}
		else if (this.flags.FLAG === "num") {
			return textCodes.split(",");
		}
	},
	
	/**
	 * Applies an affix rule to a word.
	 *
	 * @param {String} word The base word.
	 * @param {Object} rule The affix rule.
	 * @returns {String[]} The new words generated by the rule.
	 */
	
	_applyRule : function (word, rule) {
		var entries = rule.entries;
		var newWords = [];
		
		for (var i = 0, _len = entries.length; i < _len; i++) {
			var entry = entries[i];
			
			if (!entry.match || word.match(entry.match)) {
				var newWord = word;
				
				if (entry.remove) {
					newWord = newWord.replace(entry.remove, "");
				}
				
				if (rule.type === "SFX") {
					newWord = newWord + entry.add;
				}
				else {
					newWord = entry.add + newWord;
				}
				
				newWords.push(newWord);
				
				if ("continuationClasses" in entry) {
					for (var j = 0, _jlen = entry.continuationClasses.length; j < _jlen; j++) {
						var continuationRule = this.rules[entry.continuationClasses[j]];
						
						if (continuationRule) {
							newWords = newWords.concat(this._applyRule(newWord, continuationRule));
						}
						/*
						else {
							// This shouldn't happen, but it does, at least in the de_DE dictionary.
							// I think the author mistakenly supplied lower-case rule codes instead 
							// of upper-case.
						}
						*/
					}
				}
			}
		}
		
		return newWords;
	},
	
	/**
	 * Checks whether a word or a capitalization variant exists in the current dictionary.
	 * The word is trimmed and several variations of capitalizations are checked.
	 * If you want to check a word without any changes made to it, call checkExact()
	 *
	 * @see http://blog.stevenlevithan.com/archives/faster-trim-javascript re:trimming function
	 *
	 * @param {String} aWord The word to check.
	 * @returns {Boolean}
	 */
	
	check : function (aWord) {
		if (!this.loaded) {
			throw "Dictionary not loaded.";
		}
		
		// Remove leading and trailing whitespace
		var trimmedWord = aWord.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		if (this.checkExact(trimmedWord)) {
			return true;
		}
		
		// The exact word is not in the dictionary.
		if (trimmedWord.toUpperCase() === trimmedWord) {
			// The word was supplied in all uppercase.
			// Check for a capitalized form of the word.
			var capitalizedWord = trimmedWord[0] + trimmedWord.substring(1).toLowerCase();
			
			if (this.hasFlag(capitalizedWord, "KEEPCASE")) {
				// Capitalization variants are not allowed for this word.
				return false;
			}
			
			if (this.checkExact(capitalizedWord)) {
				return true;
			}
		}
		
		var lowercaseWord = trimmedWord.toLowerCase();
		
		if (lowercaseWord !== trimmedWord) {
			if (this.hasFlag(lowercaseWord, "KEEPCASE")) {
				// Capitalization variants are not allowed for this word.
				return false;
			}
			
			// Check for a lowercase form
			if (this.checkExact(lowercaseWord)) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * Checks whether a word exists in the current dictionary.
	 *
	 * @param {String} word The word to check.
	 * @returns {Boolean}
	 */
	
	checkExact : function (word) {
		if (!this.loaded) {
			throw "Dictionary not loaded.";
		}

		var ruleCodes = this.dictionaryTable[word];
		
		var i, _len;
		
		if (typeof ruleCodes === 'undefined') {
			// Check if this might be a compound word.
			if ("COMPOUNDMIN" in this.flags && word.length >= this.flags.COMPOUNDMIN) {
				for (i = 0, _len = this.compoundRules.length; i < _len; i++) {
					if (word.match(this.compoundRules[i])) {
						return true;
					}
				}
			}
		}
		else if (ruleCodes === null) {
			// a null (but not undefined) value for an entry in the dictionary table
			// means that the word is in the dictionary but has no flags.
			return true;
		}
		else if (typeof ruleCodes === 'object') { // this.dictionary['hasOwnProperty'] will be a function.
			for (i = 0, _len = ruleCodes.length; i < _len; i++) {
				if (!this.hasFlag(word, "ONLYINCOMPOUND", ruleCodes[i])) {
					return true;
				}
			}
		}

		return false;
	},
	
	/**
	 * Looks up whether a given word is flagged with a given flag.
	 *
	 * @param {String} word The word in question.
	 * @param {String} flag The flag in question.
	 * @return {Boolean}
	 */
	 
	hasFlag : function (word, flag, wordFlags) {
		if (!this.loaded) {
			throw "Dictionary not loaded.";
		}

		if (flag in this.flags) {
			if (typeof wordFlags === 'undefined') {
				wordFlags = Array.prototype.concat.apply([], this.dictionaryTable[word]);
			}
			
			if (wordFlags && wordFlags.indexOf(this.flags[flag]) !== -1) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * Returns a list of suggestions for a misspelled word.
	 *
	 * @see http://www.norvig.com/spell-correct.html for the basis of this suggestor.
	 * This suggestor is primitive, but it works.
	 *
	 * @param {String} word The misspelling.
	 * @param {Number} [limit=5] The maximum number of suggestions to return.
	 * @returns {String[]} The array of suggestions.
	 */
	
	alphabet : "",
	
	suggest : function (word, limit) {
		if (!this.loaded) {
			throw "Dictionary not loaded.";
		}

		limit = limit || 5;

		if (this.memoized.hasOwnProperty(word)) {
			var memoizedLimit = this.memoized[word]['limit'];

			// Only return the cached list if it's big enough or if there weren't enough suggestions
			// to fill a smaller limit.
			if (limit <= memoizedLimit || this.memoized[word]['suggestions'].length < memoizedLimit) {
				return this.memoized[word]['suggestions'].slice(0, limit);
			}
		}
		
		if (this.check(word)) return [];
		
		// Check the replacement table.
		for (var i = 0, _len = this.replacementTable.length; i < _len; i++) {
			var replacementEntry = this.replacementTable[i];
			
			if (word.indexOf(replacementEntry[0]) !== -1) {
				var correctedWord = word.replace(replacementEntry[0], replacementEntry[1]);
				
				if (this.check(correctedWord)) {
					return [ correctedWord ];
				}
			}
		}
		
		var self = this;
		self.alphabet = "abcdefghijklmnopqrstuvwxyz";
		
		/*
		if (!self.alphabet) {
			// Use the alphabet as implicitly defined by the words in the dictionary.
			var alphaHash = {};
			
			for (var i in self.dictionaryTable) {
				for (var j = 0, _len = i.length; j < _len; j++) {
					alphaHash[i[j]] = true;
				}
			}
			
			for (var i in alphaHash) {
				self.alphabet += i;
			}
			
			var alphaArray = self.alphabet.split("");
			alphaArray.sort();
			self.alphabet = alphaArray.join("");
		}
		*/
		
		function edits1(words) {
			var rv = [];
			
			var ii, i, j, _iilen, _len, _jlen;
			
			for (ii = 0, _iilen = words.length; ii < _iilen; ii++) {
				var word = words[ii];
				
				for (i = 0, _len = word.length + 1; i < _len; i++) {
					var s = [ word.substring(0, i), word.substring(i) ];
				
					if (s[1]) {
						rv.push(s[0] + s[1].substring(1));
					}
					
					// Eliminate transpositions of identical letters
					if (s[1].length > 1 && s[1][1] !== s[1][0]) {
						rv.push(s[0] + s[1][1] + s[1][0] + s[1].substring(2));
					}

					if (s[1]) {
						for (j = 0, _jlen = self.alphabet.length; j < _jlen; j++) {
							// Eliminate replacement of a letter by itself
							if (self.alphabet[j] != s[1].substring(0,1)){
								rv.push(s[0] + self.alphabet[j] + s[1].substring(1));
							}
						}
					}

					if (s[1]) {
						for (j = 0, _jlen = self.alphabet.length; j < _jlen; j++) {
							rv.push(s[0] + self.alphabet[j] + s[1]);
						}
					}
				}
			}
			
			return rv;
		}
		
		function known(words) {
			var rv = [];
			
			for (var i = 0, _len = words.length; i < _len; i++) {
				if (self.check(words[i])) {
					rv.push(words[i]);
				}
			}
			
			return rv;
		}
		
		function correct(word) {
			// Get the edit-distance-1 and edit-distance-2 forms of this word.
			var ed1 = edits1([word]);
			var ed2 = edits1(ed1);
			
			var corrections = known(ed1.concat(ed2));
			
			var i, _len;
			
			// Sort the edits based on how many different ways they were created.
			var weighted_corrections = {};
			
			for (i = 0, _len = corrections.length; i < _len; i++) {
				if (!(corrections[i] in weighted_corrections)) {
					weighted_corrections[corrections[i]] = 1;
				}
				else {
					weighted_corrections[corrections[i]] += 1;
				}
			}
			
			var sorted_corrections = [];
			
			for (i in weighted_corrections) {
				if (weighted_corrections.hasOwnProperty(i)) {
					sorted_corrections.push([ i, weighted_corrections[i] ]);
				}
			}
			
			function sorter(a, b) {
				if (a[1] < b[1]) {
					return -1;
				}
				
				return 1;
			}
			
			sorted_corrections.sort(sorter).reverse();
			
			var rv = [];

			var capitalization_scheme = "lowercase";
			
			if (word.toUpperCase() === word) {
				capitalization_scheme = "uppercase";
			}
			else if (word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase() === word) {
				capitalization_scheme = "capitalized";
			}
			
			for (i = 0, _len = Math.min(limit, sorted_corrections.length); i < _len; i++) {
				if ("uppercase" === capitalization_scheme) {
					sorted_corrections[i][0] = sorted_corrections[i][0].toUpperCase();
				}
				else if ("capitalized" === capitalization_scheme) {
					sorted_corrections[i][0] = sorted_corrections[i][0].substr(0, 1).toUpperCase() + sorted_corrections[i][0].substr(1);
				}
				
				if (!self.hasFlag(sorted_corrections[i][0], "NOSUGGEST")) {
					rv.push(sorted_corrections[i][0]);
				}
			}
			
			return rv;
		}
		
		this.memoized[word] = {
			'suggestions': correct(word),
			'limit': limit
		};

		return this.memoized[word]['suggestions'];
	}
};
})();

// Support for use as a node.js module.
if (true) {
	module.exports = Typo;
}
/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ 0:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},["./assets/js/book.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYm9vay5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbW9kdWxlcy9hamF4dGFiLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yLXNwZWxsLWNoZWNrZXIvc3JjL2pzL3NwZWxsLWNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vZGlzcGxheS9mdWxsc2NyZWVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yL2FkZG9uL2Rpc3BsYXkvcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vZWRpdC9jb250aW51ZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vbW9kZS9vdmVybGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yL2FkZG9uL3NlbGVjdGlvbi9tYXJrLXNlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9tb2RlL2dmbS9nZm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50L3NyYy9jb2RlbWlycm9yLTQuaW5saW5lLWF0dGFjaG1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50L3NyYy9pbmxpbmUtYXR0YWNobWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5saW5lLWF0dGFjaG1lbnQvc3JjL2pxdWVyeS5pbmxpbmUtYXR0YWNobWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25wcm9ncmVzcy9ucHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZW1kZS9zcmMvanMvY29kZW1pcnJvci90YWJsaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1wbGVtZGUvc3JjL2pzL3NpbXBsZW1kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29jaWFsLXNoYXJlLWJ1dHRvbi5qcy9kaXN0L3NvY2lhbC1zaGFyZS5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R5cG8tanMvdHlwby5qcyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIl0sIm5hbWVzIjpbIiRib29rRGV0YWlscyIsIiQiLCJsZW5ndGgiLCJjb250YWluZXIiLCJsb2FkZXIiLCJiZWZvcmUiLCJodG1sUGxhY2Vob2xkZXIiLCJzdWNjZXNzIiwiaW5pdEJvb2tTdW1tYXJ5IiwiJGFkZENoYXB0ZXIiLCJmaW5kIiwiYnRuTG9jayIsIm9uIiwiaXNEaXNhYmxlZCIsImxvY2siLCJkaWFsb2ciLCJpbnB1dHMiLCJUcmFuc2xhdG9yIiwidHJhbnMiLCJuYW1lIiwicmVxdWlyZWQiLCJtZXNzYWdlcyIsInRpdGxlIiwid2lkdGgiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXF1ZXN0Iiwic2x1ZyIsIndpbmRvdyIsImJvb2siLCJkb25lIiwibG9jYXRpb24iLCJyZWxvYWQiLCJmYWlsIiwibWVzc2FnZSIsImZsYXNoIiwicmVsZWFzZSIsIiRib29rQ2hhcHRlcnMiLCJlYWNoIiwiJHRoaXMiLCIkZWRpdCIsIiRhZGRTdWIiLCIkZGVsZXRlIiwiJG1vdmUiLCJkZWZhdWx0IiwiaWQiLCJkZWxldGVMb2NrIiwiY29uZmlybSIsIiRjaGFwdGVyIiwiY2xvc2VzdCIsImNoYXB0ZXJJZCIsImFsd2F5cyIsIm1vdmVMb2NrIiwiY2hhcHRlckJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiJGNoYXB0ZXJCb2R5IiwiJHBvc3RUaXRsZSIsIiRhZGRDaGFwdGVyRm9ybSIsIiRhZGRDaGFwdGVyQnRuIiwic2ltcGxlbWRlIiwiZWxlbWVudCIsImF1dG9mb2N1cyIsInNwZWxsQ2hlY2tlciIsInN0YXR1cyIsImluZGVudFdpdGhUYWJzIiwidGFiU2l6ZSIsImF1dG9zYXZlIiwiZW5hYmxlZCIsInVuaXF1ZUlkIiwicGF0aG5hbWUiLCJkZWxheSIsInRvb2xiYXIiLCJhY3Rpb24iLCJjbGFzc05hbWUiLCJjb2RlbWlycm9yIiwidmFsIiwiYnV0dG9uTG9jayIsInN1Ym1pdCIsInZhbGlkYXRlIiwicnVsZXMiLCJyYW5nZWxlbmd0aCIsIiRib29rVmlldyIsIiRib29rU3VtbWFyeSIsIiRzdW1tYXJ5VG9nZ2xlQnRuIiwidG9nZ2xlQ2xhc3MiLCJpIiwiYmxvY2siLCJoaWdobGlnaHRCbG9jayIsIiRkb2N1bWVudCIsIiRjaGFyYWN0ZXJzIiwicGpheCIsImRlZmF1bHRzIiwidGltZW91dCIsInN0YXJ0IiwiZXZlbnQiLCJyZWxhdGVkVGFyZ2V0IiwiJHJlbGF0ZWRUYXJnZXQiLCJyZW1vdmVDbGFzcyIsIiRzdWJDaGFyYWN0ZXJzIiwiYWRkQ2xhc3MiLCIkYnV5Iiwid2FpdCIsImJhbGxQdWxzZSIsInJlc3BvbnNlIiwicmVxdWlyZV9wYXltZW50IiwicXJjb2RlIiwicmVzcG9uc2VKU09OIiwiZXJyb3IiLCJjbG9zZSIsIkFqYXhUYWIiLCIkZWxlbWVudCIsIm9wdGlvbnMiLCIkdGFyZ2V0IiwidGFyZ2V0IiwiJHNlbGZUYWIiLCJwYXJlbnQiLCJzaWJsaW5ncyIsImVuZCIsInhociIsImNhbGwiLCJzaG93IiwidGV4dFN0YXR1cyIsImNvbXBsZXRlIiwiaGlkZSIsIklubGluZUF0dGFjaG1lbnQiLCJleHRlbmQiLCJ1cGxvYWRVcmwiLCJyb3V0ZSIsImdldFJvdXRlUGF0aCIsImpzb25GaWVsZE5hbWUiLCJpbmxpbmVhdHRhY2htZW50IiwiaW5saW5lQXR0YWNobWVudCIsImVkaXRvcnMiLCJjb2RlbWlycm9yNCIsImF0dGFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU1BLGVBQWVDLEVBQUUsZUFBRixDQUFyQjtBQUNBRCxhQUFhRSxNQUFiLEdBQXNCLENBQXRCLElBQTRCLFVBQVNELENBQVQsRUFBVztBQUNuQywwQkFBWUEsRUFBRSx1QkFBRixDQUFaLEVBQXdDO0FBQ3BDRSxtQkFBVyxlQUR5QjtBQUVwQ0MsZ0JBQVEsU0FGNEI7QUFHcENDLGdCQUFRLGdCQUFDRixTQUFELEVBQWU7QUFDbkIsMkJBQUtHLGVBQUwsQ0FBcUJILFNBQXJCO0FBQ0gsU0FMbUM7QUFNcENJLGlCQUFTLGlCQUFDSixTQUFELEVBQWU7QUFDcEIsaURBQTRCQSxTQUE1QjtBQUNBSztBQUNIO0FBVG1DLEtBQXhDO0FBV0EsYUFBU0EsZUFBVCxHQUEwQjtBQUN0QixZQUFNQyxjQUFjVCxhQUFhVSxJQUFiLENBQWtCLDJCQUFsQixDQUFwQjtBQUNBLFlBQU1DLFVBQVUsMEJBQVdGLFdBQVgsQ0FBaEI7QUFDQUEsb0JBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQVU7QUFDOUIsZ0JBQUlELFFBQVFFLFVBQVIsRUFBSixFQUEwQjtBQUN0Qix1QkFBTyxLQUFQO0FBQ0g7QUFDREYsb0JBQVFHLElB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUFBO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3ZSRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1dkRBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGtDQUFrQyxhQUFhLEVBQUU7OztBQUdqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSx3Qzs7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4Q0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlERDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4RkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FB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QXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9DQUFvQyxVQUFVO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxJQUFJO0FBQzNFO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCLGdDQUFnQyxHQUFHO0FBQ25DLHdDQUF3QyxHQUFHO0FBQzNDLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEVBQUU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFF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a0JBQWtCLDRCQUE0Qjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFVLG1CQUFtQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QscUJBQXFCLGVBQWUsRUFBRTtBQUN0QyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDMzJDRDtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsQ0FBQztBQUNEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw2QkFBNkI7O0FBRTdCO0FBQ0EseUI7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTCxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMLGdCQUFnQjtBQUNoQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDMWREO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYTtBQUNiO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixvQkFBb0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9CQUFvQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlELElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLHdCQUF3QjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNkJBQTZCOzs7QUFHL0I7QUFDQSxnQ0FBZ0Msd0NBQXdDOzs7QUFHeEU7QUFDQTs7O0FBR0E7QUFDQSxnQ0FBZ0Msd0NBQXdDOzs7QUFHeEU7QUFDQSw4QkFBOEIsb0NBQW9DOzs7QUFHbEU7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFVBQVU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWlFLFVBQVU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7O0FDbDZCQSxlIiwiZmlsZSI6ImpzL2Jvb2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL21vZHVsZXMvY29tbW9uLmpzJztcclxuaW1wb3J0IGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcclxuaW1wb3J0IFNvY2lhbFNoYXJlIGZyb20gJ3NvY2lhbC1zaGFyZS1idXR0b24uanMnO1xyXG5pbXBvcnQgTlByb2dyZXNzIGZyb20gJ25wcm9ncmVzcyc7XHJcbmltcG9ydCAnanF1ZXJ5LXBqYXgnO1xyXG5pbXBvcnQgQWpheFRhYiBmcm9tIFwiLi4vbW9kdWxlcy9hamF4dGFiXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9tb2R1bGVzL3V0aWxcIjtcclxuaW1wb3J0IHtGb2xsb3dVc2VySW50aWFsaXphdGlvbn0gZnJvbSBcIi4uL21vZHVsZXMvYWN0aW9uc1wiO1xyXG5pbXBvcnQgbG9ja0J1dHRvbiBmcm9tICcuLi9tb2R1bGVzL2J1dHRvbi1sb2NrLmpzJztcclxuaW1wb3J0IElubGluZUF0dGFjaG1lbnQgZnJvbSBcIi4uL21vZHVsZXMvaW5saW5lLWF0dGFjaG1lbnRcIjtcclxuaW1wb3J0IFNpbXBsZU1ERSBmcm9tIFwic2ltcGxlbWRlXCI7XHJcbmltcG9ydCBRUkNvZGVQYXltZW50IGZyb20gXCIuLi9tb2R1bGVzL3FyY29kZS1wYXltZW50XCI7XHJcbmltcG9ydCBtZDUgZnJvbSAnYmx1ZWltcC1tZDUnO1xyXG5cclxuLy/nlLXlrZDkuabor6bmg4XpobXpnaJcclxuY29uc3QgJGJvb2tEZXRhaWxzID0gJCgnI2Jvb2stZGV0YWlscycpO1xyXG4kYm9va0RldGFpbHMubGVuZ3RoID4gMCAmJiAoZnVuY3Rpb24oJCl7XHJcbiAgICBuZXcgQWpheFRhYigkKCdbZGF0YS1wamF4LWNvbnRhaW5lcl0nKSwge1xyXG4gICAgICAgIGNvbnRhaW5lcjogJyNib29rLWRldGFpbHMnLFxyXG4gICAgICAgIGxvYWRlcjogJyNsb2FkZXInLFxyXG4gICAgICAgIGJlZm9yZTogKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgICAgICBVdGlsLmh0bWxQbGFjZWhvbGRlcihjb250YWluZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRm9sbG93VXNlckludGlhbGl6YXRpb24oY29udGFpbmVyKTtcclxuICAgICAgICAgICAgaW5pdEJvb2tTdW1tYXJ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBpbml0Qm9va1N1bW1hcnkoKXtcclxuICAgICAgICBjb25zdCAkYWRkQ2hhcHRlciA9ICRib29rRGV0YWlscy5maW5kKCdbZGF0YS1yb2xlPVwiYWRkLWNoYXB0ZXJcIl0nKTtcclxuICAgICAgICBjb25zdCBidG5Mb2NrID0gbG9ja0J1dHRvbigkYWRkQ2hhcHRlcik7XHJcbiAgICAgICAgJGFkZENoYXB0ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKGJ0bkxvY2suaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnRuTG9jay5sb2NrKCk7XHJcbiAgICAgICAgICAgIFV0aWwuZGlhbG9nLmlucHV0cyhUcmFuc2xhdG9yLnRyYW5zKCdib29rLmNoYXB0ZXJfbmFtZScpLCBbe25hbWU6ICd0aXRsZScsIHJlcXVpcmVkOiB0cnVlfV0sIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBUcmFuc2xhdG9yLnRyYW5zKCdib29rLnJlcXVpcmVkX2NoYXB0ZXJfbmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnb2tWYWx1ZSc6IFRyYW5zbGF0b3IudHJhbnMoJ3VpLmNyZWF0ZScpLFxyXG4gICAgICAgICAgICAgICAgJ2NhbmNlbFZhbHVlJzogVHJhbnNsYXRvci50cmFucygndWkuY2FuY2VsJyksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzUwXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIFV0aWwucmVxdWVzdCgnYm9vay5hZGRfc3VtbWFyeScsIHtzbHVnOiB3aW5kb3cuYm9vay5zbHVnfSwgZGF0YSkuZG9uZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZGlhbG9nLm1lc3NhZ2UoVHJhbnNsYXRvci50cmFucygnYm9vay5jcmVhdGVfY2hhcHRlcl9lcnJvcicpKS5mbGFzaCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBidG5Mb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgfSwgKCk9PntcclxuICAgICAgICAgICAgICAgIGJ0bkxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WkhOeQhmFjdGlvblxyXG4gICAgICAgIGNvbnN0ICRib29rQ2hhcHRlcnMgPSAkYm9va0RldGFpbHMuZmluZCgnW2RhdGEtcm9sZT1cImNoYXB0ZXJcIl0nKTtcclxuICAgICAgICAkYm9va0NoYXB0ZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBjb25zdCAkZWRpdCA9ICR0aGlzLmZpbmQoJ1tkYXRhLXJvbGU9XCJlZGl0XCJdJyk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRhZGRTdWIgPSAkdGhpcy5maW5kKCdbZGF0YS1yb2xlPVwiYWRkLXN1YlwiXScpO1xyXG4gICAgICAgICAgICBjb25zdCAkZGVsZXRlID0gJHRoaXMuZmluZCgnW2RhdGEtcm9sZT1cImRlbGV0ZVwiXScpO1xyXG4gICAgICAgICAgICBjb25zdCAkbW92ZSA9ICR0aGlzLmZpbmQoJ1tkYXRhLXJvbGU9XCJtb3ZlXCJdJyk7XHJcblxyXG4gICAgICAgICAgICAkZWRpdC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgVXRpbC5kaWFsb2cuaW5wdXRzKFRyYW5zbGF0b3IudHJhbnMoJ2Jvb2suY2hhcHRlcl9uYW1lJyksIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAkdGhpcy5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFRyYW5zbGF0b3IudHJhbnMoJ2Jvb2sucmVxdWlyZWRfY2hhcHRlcl9uYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAnb2tWYWx1ZSc6IFRyYW5zbGF0b3IudHJhbnMoJ3VpLmNyZWF0ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICdjYW5jZWxWYWx1ZSc6IFRyYW5zbGF0b3IudHJhbnMoJ3VpLmNhbmNlbCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNTBcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5yZXF1ZXN0KCdib29rLmVkaXRfc3VtbWFyeScsIHtzbHVnOiB3aW5kb3cuYm9vay5zbHVnLCBpZDogJHRoaXMuZGF0YSgnaWQnKX0sIGRhdGEpLmRvbmUoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRpYWxvZy5tZXNzYWdlKFRyYW5zbGF0b3IudHJhbnMoJ2Jvb2suZWRpdF9jaGFwdGVyX2Vycm9yJykpLmZsYXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVMb2NrID0gbG9ja0J1dHRvbigkZGVsZXRlKTtcclxuICAgICAgICAgICAgJGRlbGV0ZS5vbignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsZXRlTG9jay5pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGVMb2NrLmxvY2soKTtcclxuICAgICAgICAgICAgICAgIFV0aWwuZGlhbG9nLmNvbmZpcm0oVHJhbnNsYXRvci50cmFucygnYm9vay5jb25maXJtX3JlbW92ZV9jaGFwdGVyJykpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNoYXB0ZXIgPSAgJGRlbGV0ZS5jbG9zZXN0KCdbZGF0YS1yb2xlPVwic3ViLWNoYXB0ZXJcIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGNoYXB0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFwdGVyID0gJGRlbGV0ZS5jbG9zZXN0KCdbZGF0YS1yb2xlPVwiY2hhcHRlclwiXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFwdGVySWQgPSAgJGNoYXB0ZXIuZGF0YSgnaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLnJlcXVlc3QoJ3Bvc3QuZGVsZXRlJywgY2hhcHRlcklkKS5kb25lKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZGlhbG9nLm1lc3NhZ2UoVHJhbnNsYXRvci50cmFucygnYm9vay5yZW1vdmVfc3VjY2VzcycpKS5mbGFzaCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5kaWFsb2cubWVzc2FnZShUcmFuc2xhdG9yLnRyYW5zKCdib29rLnJlbW92ZV9lcnJvcicpKS5mbGFzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdmVMb2NrID0gbG9ja0J1dHRvbigkbW92ZSk7XHJcbiAgICAgICAgICAgICRtb3ZlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChtb3ZlTG9jay5pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb3ZlTG9jay5sb2NrKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGNoYXB0ZXIgPSAkdGhpcy5jbG9zZXN0KCdbZGF0YS1yb2xlPVwic3ViLWNoYXB0ZXJcIl0nKTtcclxuICAgICAgICAgICAgICAgIGlmICgkY2hhcHRlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkY2hhcHRlciA9ICR0aGlzLmNsb3Nlc3QoJ1tkYXRhLXJvbGU9XCJjaGFwdGVyXCJdJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFwdGVySWQgPSAgJGNoYXB0ZXIuZGF0YSgnaWQnKTtcclxuICAgICAgICAgICAgICAgIFV0aWwucmVxdWVzdCgnYm9vay5tb3ZlX2NoYXB0ZXInLCB7c2x1Zzogd2luZG93LmJvb2suc2x1ZywgaWQ6IGNoYXB0ZXJJZH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAnZGlyZWN0aW9uJzogJCh0aGlzKS5kYXRhKCdkaXJlY3Rpb24nKSB8fCAndXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdGVwJzogMVxyXG4gICAgICAgICAgICAgICAgfSkuZG9uZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZGlhbG9nLm1lc3NhZ2UoVHJhbnNsYXRvci50cmFucygnYm9vay5tb3ZlX2Vycm9yJykpLmZsYXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbml0Qm9va1N1bW1hcnkoKTtcclxufSkoJCk7XHJcblxyXG5cclxuLy/mt7vliqDnq6DoioJcclxuY29uc3QgY2hhcHRlckJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlcl9vcmlnaW5hbEJvZHknKTtcclxuY29uc3QgJGNoYXB0ZXJCb2R5ID0gJChjaGFwdGVyQm9keSk7XHJcbiRjaGFwdGVyQm9keS5sZW5ndGggPiAwICYmIChmdW5jdGlvbigkKXtcclxuICAgIGNvbnN0ICRwb3N0VGl0bGUgPSAkKCcjY2hhcHRlcl90aXRsZScpO1xyXG4gICAgY29uc3QgJGFkZENoYXB0ZXJGb3JtID0gJCgnI2FkZC1jaGFwdGVyLWZvcm0nKTtcclxuICAgIGNvbnN0ICRhZGRDaGFwdGVyQnRuID0gJCgnW2RhdGEtYWN0aW9uPVwiYWRkLWNoYXB0ZXJcIl0nKTtcclxuXHJcbiAgICBjb25zdCBzaW1wbGVtZGUgPSBuZXcgU2ltcGxlTURFKHtcclxuICAgICAgICBlbGVtZW50OiBjaGFwdGVyQm9keSxcclxuICAgICAgICBhdXRvZm9jdXM6IHRydWUsXHJcbiAgICAgICAgc3BlbGxDaGVja2VyOiBmYWxzZSxcclxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIGluZGVudFdpdGhUYWJzOiBmYWxzZSxcclxuICAgICAgICB0YWJTaXplOiA0LFxyXG4gICAgICAgIGF1dG9zYXZlOiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHVuaXF1ZUlkOiAnY2hhcHRlcl8nICsgbWQ1KGxvY2F0aW9uLnBhdGhuYW1lKSxcclxuICAgICAgICAgICAgZGVsYXk6IDEwMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b29sYmFyOiBbXHJcbiAgICAgICAgICAgIFwiYm9sZFwiLCBcIml0YWxpY1wiLCBcImhlYWRpbmdcIiwgXCJ8XCIsIFwicXVvdGVcIiwgXCJjb2RlXCIsIFwidGFibGVcIixcclxuICAgICAgICAgICAgXCJob3Jpem9udGFsLXJ1bGVcIiwgXCJ1bm9yZGVyZWQtbGlzdFwiLCBcIm9yZGVyZWQtbGlzdFwiLCBcInxcIixcclxuICAgICAgICAgICAgXCJsaW5rXCIsIFwiaW1hZ2VcIiwgXCJ8XCIsICBcInNpZGUtYnktc2lkZVwiLCBcImZ1bGxzY3JlZW5cIiwgXCJwcmV2aWV3XCIsIFwifFwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ3VpZGUnLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnaHR0cHM6Ly9naXRodWIuY29tL3Jpa3UvTWFya2Rvd24tU3ludGF4LUNOL2Jsb2IvbWFzdGVyL3N5bnRheC5tZCcsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmYSBmYS1pbmZvLWNpcmNsZScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogVHJhbnNsYXRvci50cmFucygnZWRpdG9yLm1hcmtkb3duX3N5bmF4JyksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgfSk7XHJcbiAgICBuZXcgSW5saW5lQXR0YWNobWVudChzaW1wbGVtZGUuY29kZW1pcnJvcik7IC8v5aSE55CG6ZmE5Lu25LiK5Lyg55qE5Yqf6IO9XHJcbiAgICAkYWRkQ2hhcHRlckJ0bi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCRwb3N0VGl0bGUudmFsKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIFV0aWwuZGlhbG9nLm1lc3NhZ2UoVHJhbnNsYXRvci50cmFucygnYm9vay52YWxpZGF0aW9uLm5hbWUnKSkuZmxhc2goKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBidXR0b25Mb2NrID0gbG9ja0J1dHRvbigkYWRkQ2hhcHRlckJ0bikubG9jaygpO1xyXG4gICAgICAgIFV0aWwuZGlhbG9nLmNvbmZpcm0oVHJhbnNsYXRvci50cmFucygnYm9vay5jb25maXJtX3B1Ymxpc2gnKSkudGhlbigoKT0+IHtcclxuICAgICAgICAgICAgJGFkZENoYXB0ZXJGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbkxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/mt7vliqDmlofnq6Dpqozor4FcclxuICAgICRhZGRDaGFwdGVyRm9ybS52YWxpZGF0ZSh7XHJcbiAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgJ2NoYXB0ZXJbdGl0bGVdJzoge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogWzIsNTBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICdjaGFwdGVyW3RpdGxlXSc6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBUcmFuc2xhdG9yLnRyYW5zKCdib29rLmNoYXB0ZXIudmFsaWRhdGlvbi50aXRsZS5yZXF1aXJlZCcpLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VsZW5ndGg6IFRyYW5zbGF0b3IudHJhbnMoJ2Jvb2suY2hhcHRlci52YWxpZGF0aW9uLnRpdGxlLmxlbmd0aF9iZXR3ZWVuJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoJCk7XHJcblxyXG5cclxuXHJcbi8v55S15a2Q5Lmm6ZiF6K+76aG16Z2iXHJcbmNvbnN0ICRib29rVmlldyA9ICQoJ1tkYXRhLXJvbGU9XCJib29rLXZpZXdcIl0nKTtcclxuJGJvb2tWaWV3Lmxlbmd0aCA+IDAgJiYgKGZ1bmN0aW9uKCQpe1xyXG4gICAgY29uc3QgJGJvb2tTdW1tYXJ5ID0gJGJvb2tWaWV3LmZpbmQoJ1tkYXRhLXJvbGU9XCJzdW1tYXJ5XCJdJyk7XHJcbiAgICBjb25zdCAkc3VtbWFyeVRvZ2dsZUJ0biA9ICRib29rVmlldy5maW5kKCdbZGF0YS1yb2xlPVwidG9nZ2xlLXN1bW1hcnlcIl0nKTtcclxuICAgICRzdW1tYXJ5VG9nZ2xlQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGJvb2tWaWV3LnRvZ2dsZUNsYXNzKCd3aXRoLXN1bW1hcnknKTtcclxuICAgIH0pO1xyXG4gICAgLy/liIbkuqtcclxuICAgIG5ldyBTb2NpYWxTaGFyZSgkYm9va1ZpZXcuZmluZCgnW2RhdGEtcm9sZT1cInNvY2lhbC1zaGFyZVwiXScpLCB7XHJcbiAgICAgICAgJ3RoZW1lJzogJ2Rhcmstc3F1YXJlJyxcclxuICAgICAgICAnZmFjZWJvb2snOiBmYWxzZSxcclxuICAgICAgICAndHdpdHRlcic6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIC8v5Luj56CB6auY5LquXHJcbiAgICAkKCdwcmUgY29kZScpLmVhY2goZnVuY3Rpb24gKGksIGJsb2NrKSB7XHJcbiAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAoZnVuY3Rpb24oJCl7XHJcbiAgICAgICAgY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbiAgICAgICAgY29uc3QgJGNoYXJhY3RlcnMgPSAkYm9va1N1bW1hcnkuZmluZCgnbGkuY2hhcHRlcicpO1xyXG4gICAgICAgICQucGpheC5kZWZhdWx0cy50aW1lb3V0ID0gNTAwMDA7XHJcbiAgICAgICAgJChkb2N1bWVudCkucGpheCgndWwuc3VtbWFyeSBsaSBhJywgJyNwamF4LWNvbnRhaW5lcicpXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdwamF4OnN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIE5Qcm9ncmVzcy5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRkb2N1bWVudC5vbigncGpheDplbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHJlbGF0ZWRUYXJnZXQgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgJGNoYXJhY3RlcnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJvb2tTdW1tYXJ5LmZpbmQoJ2xpLnN1Yi1jaGFwdGVyLWl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkc3ViQ2hhcmFjdGVycyA9ICRyZWxhdGVkVGFyZ2V0LmNsb3Nlc3QoJy5zdWItY2hhcHRlcicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzdWJDaGFyYWN0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkcmVsYXRlZFRhcmdldC5jbG9zZXN0KCcuc3ViLWNoYXB0ZXItaXRlbScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlbGF0ZWRUYXJnZXQuY2xvc2VzdCgnLmNoYXB0ZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/ku6PnoIHpq5jkuq5cclxuICAgICAgICAgICAgJCgncHJlIGNvZGUnKS5lYWNoKGZ1bmN0aW9uIChpLCBibG9jaykge1xyXG4gICAgICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBOUHJvZ3Jlc3MuZG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoJCk7XHJcblxyXG4gICAgLy/otK3kubBcclxuICAgIGNvbnN0ICRidXkgPSAkKCdbZGF0YS1yb2xlPVwiYnV5XCJdJyk7XHJcbiAgICAkYnV5Lmxlbmd0aCA+IDAgJiYgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uTG9jayA9IGxvY2tCdXR0b24oJGJ1eSk7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9ICRidXkuZGF0YSgnc2x1ZycpO1xyXG4gICAgICAgICRidXkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3Qgd2FpdCA9IFV0aWwuZGlhbG9nLndhaXQuYmFsbFB1bHNlKCk7XHJcbiAgICAgICAgICAgIFV0aWwucmVxdWVzdCgnY2F0ZWdvcnkuZm9sbG93JywgeydzbHVnJzogc2x1Z30pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlcXVpcmVfcGF5bWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBRUkNvZGVQYXltZW50KHJlc3BvbnNlLnFyY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBVdGlsLmRpYWxvZy5tZXNzYWdlKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcikuZmxhc2goKTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKCQpO1xyXG59KSgkKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvYm9vay5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAnanF1ZXJ5LXBqYXgnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9tb2R1bGVzL3V0aWwuanMnO1xyXG5cclxuY2xhc3MgQWpheFRhYlxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucyl7XHJcbiAgICAgICAgJC5wamF4LmRlZmF1bHRzLnRpbWVvdXQgPSA1MDAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKG9wdGlvbnMuY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucGpheCgnbGkgYScsIG9wdGlvbnMuY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5vbigncGpheDpjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRzZWxmVGFiID0gJHRhcmdldC5wYXJlbnQoKTtcclxuICAgICAgICAgICAgJHNlbGZUYWIuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGVyID0gJCh0aGlzLm9wdGlvbnMubG9hZGVyKTtcclxuXHJcbiAgICAgICAgLy/nu5Hlrprkuovku7ZcclxuICAgICAgICAkKGRvY3VtZW50KS5vbigncGpheDpiZWZvcmVTZW5kJywgKGV2ZW50LCB4aHIsIG9wdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuYmVmb3JlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcywgdGhpcy5jb250YWluZXIsIHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbigncGpheDpzdWNjZXNzJywgKGV2ZW50LCBkYXRhLCBzdGF0dXMsIHhociwgb3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3VjY2Vzcy5jYWxsKHRoaXMsIHRoaXMuY29udGFpbmVyLCB4aHIsIGRhdGEsIHN0YXR1cywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdwamF4OmNvbXBsZXRlJywgKGV2ZW50LCB4aHIsIHRleHRTdGF0dXMsIG9wdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuY29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb21wbGV0ZS5jYWxsKHRoaXMsIGV2ZW50LCB4aHIsIHRleHRTdGF0dXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXRpbC5odG1sUGxhY2Vob2xkZXIodGhpcy5jb250YWluZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBamF4VGFiO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9tb2R1bGVzL2FqYXh0YWIuanMiLCJgdXNlIHN0cmljdGA7XHJcblxyXG5pbXBvcnQgJ2lubGluZS1hdHRhY2htZW50L3NyYy9pbmxpbmUtYXR0YWNobWVudC5qcydcclxuaW1wb3J0ICdpbmxpbmUtYXR0YWNobWVudC9zcmMvanF1ZXJ5LmlubGluZS1hdHRhY2htZW50LmpzJ1xyXG5pbXBvcnQgJ2lubGluZS1hdHRhY2htZW50L3NyYy9jb2RlbWlycm9yLTQuaW5saW5lLWF0dGFjaG1lbnQuanMnXHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBVdGlsIGZyb20gICcuL3V0aWwuanMnO1xyXG5cclxuY2xhc3MgSW5saW5lQXR0YWNobWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKXtcclxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICB1cGxvYWRVcmw6IFV0aWwucm91dGUuZ2V0Um91dGVQYXRoKCd1cGxvYWQnKSxcclxuICAgICAgICAgICAganNvbkZpZWxkTmFtZTogJ3BhdGgnLFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgJCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubGluZWF0dGFjaG1lbnQob3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5saW5lQXR0YWNobWVudC5lZGl0b3JzLmNvZGVtaXJyb3I0LmF0dGFjaChlbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElubGluZUF0dGFjaG1lbnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL21vZHVsZXMvaW5saW5lLWF0dGFjaG1lbnQuanMiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgKyAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgKyAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuOyhmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCdcblxuICAvKlxuICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAqL1xuICBmdW5jdGlvbiBzYWZlQWRkICh4LCB5KSB7XG4gICAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKVxuICAgIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KVxuICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweGZmZmYpXG4gIH1cblxuICAvKlxuICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgKi9cbiAgZnVuY3Rpb24gYml0Um90YXRlTGVmdCAobnVtLCBjbnQpIHtcbiAgICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSlcbiAgfVxuXG4gIC8qXG4gICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgKi9cbiAgZnVuY3Rpb24gbWQ1Y21uIChxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYilcbiAgfVxuICBmdW5jdGlvbiBtZDVmZiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oKGIgJiBjKSB8ICh+YiAmIGQpLCBhLCBiLCB4LCBzLCB0KVxuICB9XG4gIGZ1bmN0aW9uIG1kNWdnIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIG1kNWNtbigoYiAmIGQpIHwgKGMgJiB+ZCksIGEsIGIsIHgsIHMsIHQpXG4gIH1cbiAgZnVuY3Rpb24gbWQ1aGggKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdClcbiAgfVxuICBmdW5jdGlvbiBtZDVpaSAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KVxuICB9XG5cbiAgLypcbiAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICAqL1xuICBmdW5jdGlvbiBiaW5sTUQ1ICh4LCBsZW4pIHtcbiAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKVxuICAgIHhbKChsZW4gKyA2NCkgPj4+IDkgPDwgNCkgKyAxNF0gPSBsZW5cblxuICAgIHZhciBpXG4gICAgdmFyIG9sZGFcbiAgICB2YXIgb2xkYlxuICAgIHZhciBvbGRjXG4gICAgdmFyIG9sZGRcbiAgICB2YXIgYSA9IDE3MzI1ODQxOTNcbiAgICB2YXIgYiA9IC0yNzE3MzM4NzlcbiAgICB2YXIgYyA9IC0xNzMyNTg0MTk0XG4gICAgdmFyIGQgPSAyNzE3MzM4NzhcblxuICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgb2xkYSA9IGFcbiAgICAgIG9sZGIgPSBiXG4gICAgICBvbGRjID0gY1xuICAgICAgb2xkZCA9IGRcblxuICAgICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KVxuICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KVxuICAgICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KVxuICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpXG4gICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNylcbiAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpXG4gICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKVxuICAgICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSlcbiAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MClcbiAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KVxuXG4gICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKVxuICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMylcbiAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMilcbiAgICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSlcbiAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKVxuICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KVxuICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MClcbiAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKVxuICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NClcbiAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpXG5cbiAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OClcbiAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKVxuICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpXG4gICAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MClcbiAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpXG4gICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKVxuICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KVxuICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKVxuICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSlcbiAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KVxuICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpXG4gICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKVxuICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSlcblxuICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpXG4gICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KVxuICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KVxuICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSlcbiAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKVxuICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpXG4gICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpXG4gICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApXG4gICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSlcbiAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MClcbiAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSlcbiAgICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSlcbiAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpXG5cbiAgICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpXG4gICAgICBiID0gc2FmZUFkZChiLCBvbGRiKVxuICAgICAgYyA9IHNhZmVBZGQoYywgb2xkYylcbiAgICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpXG4gICAgfVxuICAgIHJldHVybiBbYSwgYiwgYywgZF1cbiAgfVxuXG4gIC8qXG4gICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gICovXG4gIGZ1bmN0aW9uIGJpbmwycnN0ciAoaW5wdXQpIHtcbiAgICB2YXIgaVxuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIHZhciBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcbiAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChpbnB1dFtpID4+IDVdID4+PiAoaSAlIDMyKSkgJiAweGZmKVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICAvKlxuICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAgKi9cbiAgZnVuY3Rpb24gcnN0cjJiaW5sIChpbnB1dCkge1xuICAgIHZhciBpXG4gICAgdmFyIG91dHB1dCA9IFtdXG4gICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZFxuICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIG91dHB1dFtpXSA9IDBcbiAgICB9XG4gICAgdmFyIGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhmZikgPDwgKGkgJSAzMilcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgLypcbiAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgKi9cbiAgZnVuY3Rpb24gcnN0ck1ENSAocykge1xuICAgIHJldHVybiBiaW5sMnJzdHIoYmlubE1ENShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpXG4gIH1cblxuICAvKlxuICAqIENhbGN1bGF0ZSB0aGUgSE1BQy1NRDUsIG9mIGEga2V5IGFuZCBzb21lIGRhdGEgKHJhdyBzdHJpbmdzKVxuICAqL1xuICBmdW5jdGlvbiByc3RySE1BQ01ENSAoa2V5LCBkYXRhKSB7XG4gICAgdmFyIGlcbiAgICB2YXIgYmtleSA9IHJzdHIyYmlubChrZXkpXG4gICAgdmFyIGlwYWQgPSBbXVxuICAgIHZhciBvcGFkID0gW11cbiAgICB2YXIgaGFzaFxuICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWRcbiAgICBpZiAoYmtleS5sZW5ndGggPiAxNikge1xuICAgICAgYmtleSA9IGJpbmxNRDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzZcbiAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1YzVjNWM1Y1xuICAgIH1cbiAgICBoYXNoID0gYmlubE1ENShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpXG4gICAgcmV0dXJuIGJpbmwycnN0cihiaW5sTUQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKVxuICB9XG5cbiAgLypcbiAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgKi9cbiAgZnVuY3Rpb24gcnN0cjJoZXggKGlucHV0KSB7XG4gICAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIHZhciB4XG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpXG4gICAgICBvdXRwdXQgKz0gaGV4VGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpXG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIC8qXG4gICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICovXG4gIGZ1bmN0aW9uIHN0cjJyc3RyVVRGOCAoaW5wdXQpIHtcbiAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSlcbiAgfVxuXG4gIC8qXG4gICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICovXG4gIGZ1bmN0aW9uIHJhd01ENSAocykge1xuICAgIHJldHVybiByc3RyTUQ1KHN0cjJyc3RyVVRGOChzKSlcbiAgfVxuICBmdW5jdGlvbiBoZXhNRDUgKHMpIHtcbiAgICByZXR1cm4gcnN0cjJoZXgocmF3TUQ1KHMpKVxuICB9XG4gIGZ1bmN0aW9uIHJhd0hNQUNNRDUgKGssIGQpIHtcbiAgICByZXR1cm4gcnN0ckhNQUNNRDUoc3RyMnJzdHJVVEY4KGspLCBzdHIycnN0clVURjgoZCkpXG4gIH1cbiAgZnVuY3Rpb24gaGV4SE1BQ01ENSAoaywgZCkge1xuICAgIHJldHVybiByc3RyMmhleChyYXdITUFDTUQ1KGssIGQpKVxuICB9XG5cbiAgZnVuY3Rpb24gbWQ1IChzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGlmICghcmF3KSB7XG4gICAgICAgIHJldHVybiBoZXhNRDUoc3RyaW5nKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJhd01ENShzdHJpbmcpXG4gICAgfVxuICAgIGlmICghcmF3KSB7XG4gICAgICByZXR1cm4gaGV4SE1BQ01ENShrZXksIHN0cmluZylcbiAgICB9XG4gICAgcmV0dXJuIHJhd0hNQUNNRDUoa2V5LCBzdHJpbmcpXG4gIH1cblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtZDVcbiAgICB9KVxuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBtZDVcbiAgfSBlbHNlIHtcbiAgICAkLm1kNSA9IG1kNVxuICB9XG59KSh0aGlzKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9ibHVlaW1wLW1kNS9qcy9tZDUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLy8gVXNlIHN0cmljdCBtb2RlIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9TdHJpY3RfbW9kZSlcblwidXNlIHN0cmljdFwiO1xuXG5cbi8vIFJlcXVpcmVzXG52YXIgVHlwbyA9IHJlcXVpcmUoXCJ0eXBvLWpzXCIpO1xuXG5cbi8vIENyZWF0ZSBmdW5jdGlvblxuZnVuY3Rpb24gQ29kZU1pcnJvclNwZWxsQ2hlY2tlcihvcHRpb25zKSB7XG5cdC8vIEluaXRpYWxpemVcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblxuXHQvLyBWZXJpZnlcblx0aWYodHlwZW9mIG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlICE9PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlLmRlZmluZU1vZGUgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdGNvbnNvbGUubG9nKFwiQ29kZU1pcnJvciBTcGVsbCBDaGVja2VyOiBZb3UgbXVzdCBwcm92aWRlIGFuIGluc3RhbmNlIG9mIENvZGVNaXJyb3IgdmlhIHRoZSBvcHRpb24gYGNvZGVNaXJyb3JJbnN0YW5jZWBcIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblxuXHQvLyBCZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uYWxpdHkgeWV0XG5cdGlmKCFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKSB7XG5cdFx0U3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgIT09IC0xO1xuXHRcdH07XG5cdH1cblxuXG5cdC8vIERlZmluZSB0aGUgbmV3IG1vZGVcblx0b3B0aW9ucy5jb2RlTWlycm9ySW5zdGFuY2UuZGVmaW5lTW9kZShcInNwZWxsLWNoZWNrZXJcIiwgZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0Ly8gTG9hZCBBRkYvRElDIGRhdGFcblx0XHRpZighQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZykge1xuXHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZyA9IHRydWU7XG5cdFx0XHR2YXIgeGhyX2FmZiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyX2FmZi5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2NvZGVtaXJyb3Iuc3BlbGwtY2hlY2tlci9sYXRlc3QvZW5fVVMuYWZmXCIsIHRydWUpO1xuXHRcdFx0eGhyX2FmZi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoeGhyX2FmZi5yZWFkeVN0YXRlID09PSA0ICYmIHhocl9hZmYuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0XHRDb2RlTWlycm9yU3BlbGxDaGVja2VyLmFmZl9kYXRhID0geGhyX2FmZi5yZXNwb25zZVRleHQ7XG5cdFx0XHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci5udW1fbG9hZGVkKys7XG5cblx0XHRcdFx0XHRpZihDb2RlTWlycm9yU3BlbGxDaGVja2VyLm51bV9sb2FkZWQgPT0gMikge1xuXHRcdFx0XHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci50eXBvID0gbmV3IFR5cG8oXCJlbl9VU1wiLCBDb2RlTWlycm9yU3BlbGxDaGVja2VyLmFmZl9kYXRhLCBDb2RlTWlycm9yU3BlbGxDaGVja2VyLmRpY19kYXRhLCB7XG5cdFx0XHRcdFx0XHRcdHBsYXRmb3JtOiBcImFueVwiXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR4aHJfYWZmLnNlbmQobnVsbCk7XG5cdFx0fVxuXG5cdFx0aWYoIUNvZGVNaXJyb3JTcGVsbENoZWNrZXIuZGljX2xvYWRpbmcpIHtcblx0XHRcdENvZGVNaXJyb3JTcGVsbENoZWNrZXIuZGljX2xvYWRpbmcgPSB0cnVlO1xuXHRcdFx0dmFyIHhocl9kaWMgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhocl9kaWMub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9jb2RlbWlycm9yLnNwZWxsLWNoZWNrZXIvbGF0ZXN0L2VuX1VTLmRpY1wiLCB0cnVlKTtcblx0XHRcdHhocl9kaWMub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmKHhocl9kaWMucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHJfZGljLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfZGF0YSA9IHhocl9kaWMucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHRcdENvZGVNaXJyb3JTcGVsbENoZWNrZXIubnVtX2xvYWRlZCsrO1xuXG5cdFx0XHRcdFx0aWYoQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5udW1fbG9hZGVkID09IDIpIHtcblx0XHRcdFx0XHRcdENvZGVNaXJyb3JTcGVsbENoZWNrZXIudHlwbyA9IG5ldyBUeXBvKFwiZW5fVVNcIiwgQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfZGF0YSwgQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfZGF0YSwge1xuXHRcdFx0XHRcdFx0XHRwbGF0Zm9ybTogXCJhbnlcIlxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0eGhyX2RpYy5zZW5kKG51bGwpO1xuXHRcdH1cblxuXG5cdFx0Ly8gRGVmaW5lIHdoYXQgc2VwYXJhdGVzIGEgd29yZFxuXHRcdHZhciByeF93b3JkID0gXCIhXFxcIiMkJSYoKSorLC0uLzo7PD0+P0BbXFxcXF1eX2B7fH1+IFwiO1xuXG5cblx0XHQvLyBDcmVhdGUgdGhlIG92ZXJsYXkgYW5kIHN1Y2hcblx0XHR2YXIgb3ZlcmxheSA9IHtcblx0XHRcdHRva2VuOiBmdW5jdGlvbihzdHJlYW0pIHtcblx0XHRcdFx0dmFyIGNoID0gc3RyZWFtLnBlZWsoKTtcblx0XHRcdFx0dmFyIHdvcmQgPSBcIlwiO1xuXG5cdFx0XHRcdGlmKHJ4X3dvcmQuaW5jbHVkZXMoY2gpKSB7XG5cdFx0XHRcdFx0c3RyZWFtLm5leHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHdoaWxlKChjaCA9IHN0cmVhbS5wZWVrKCkpICE9IG51bGwgJiYgIXJ4X3dvcmQuaW5jbHVkZXMoY2gpKSB7XG5cdFx0XHRcdFx0d29yZCArPSBjaDtcblx0XHRcdFx0XHRzdHJlYW0ubmV4dCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoQ29kZU1pcnJvclNwZWxsQ2hlY2tlci50eXBvICYmICFDb2RlTWlycm9yU3BlbGxDaGVja2VyLnR5cG8uY2hlY2sod29yZCkpXG5cdFx0XHRcdFx0cmV0dXJuIFwic3BlbGwtZXJyb3JcIjsgLy8gQ1NTIGNsYXNzOiBjbS1zcGVsbC1lcnJvclxuXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbW9kZSA9IG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlLmdldE1vZGUoXG5cdFx0XHRjb25maWcsIGNvbmZpZy5iYWNrZHJvcCB8fCBcInRleHQvcGxhaW5cIlxuXHRcdCk7XG5cblx0XHRyZXR1cm4gb3B0aW9ucy5jb2RlTWlycm9ySW5zdGFuY2Uub3ZlcmxheU1vZGUobW9kZSwgb3ZlcmxheSwgdHJ1ZSk7XG5cdH0pO1xufVxuXG5cbi8vIEluaXRpYWxpemUgZGF0YSBnbG9iYWxseSB0byByZWR1Y2UgbWVtb3J5IGNvbnN1bXB0aW9uXG5Db2RlTWlycm9yU3BlbGxDaGVja2VyLm51bV9sb2FkZWQgPSAwO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZyA9IGZhbHNlO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfbG9hZGluZyA9IGZhbHNlO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfZGF0YSA9IFwiXCI7XG5Db2RlTWlycm9yU3BlbGxDaGVja2VyLmRpY19kYXRhID0gXCJcIjtcbkNvZGVNaXJyb3JTcGVsbENoZWNrZXIudHlwbztcblxuXG4vLyBFeHBvcnRcbm1vZHVsZS5leHBvcnRzID0gQ29kZU1pcnJvclNwZWxsQ2hlY2tlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yLXNwZWxsLWNoZWNrZXIvc3JjL2pzL3NwZWxsLWNoZWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3Itc3BlbGwtY2hlY2tlci9zcmMvanMvc3BlbGwtY2hlY2tlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cDovL2NvZGVtaXJyb3IubmV0L0xJQ0VOU0VcblxuKGZ1bmN0aW9uKG1vZCkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIpIC8vIENvbW1vbkpTXG4gICAgbW9kKHJlcXVpcmUoXCIuLi8uLi9saWIvY29kZW1pcnJvclwiKSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIC8vIEFNRFxuICAgIGRlZmluZShbXCIuLi8uLi9saWIvY29kZW1pcnJvclwiXSwgbW9kKTtcbiAgZWxzZSAvLyBQbGFpbiBicm93c2VyIGVudlxuICAgIG1vZChDb2RlTWlycm9yKTtcbn0pKGZ1bmN0aW9uKENvZGVNaXJyb3IpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24oXCJmdWxsU2NyZWVuXCIsIGZhbHNlLCBmdW5jdGlvbihjbSwgdmFsLCBvbGQpIHtcbiAgICBpZiAob2xkID09IENvZGVNaXJyb3IuSW5pdCkgb2xkID0gZmFsc2U7XG4gICAgaWYgKCFvbGQgPT0gIXZhbCkgcmV0dXJuO1xuICAgIGlmICh2YWwpIHNldEZ1bGxzY3JlZW4oY20pO1xuICAgIGVsc2Ugc2V0Tm9ybWFsKGNtKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0RnVsbHNjcmVlbihjbSkge1xuICAgIHZhciB3cmFwID0gY20uZ2V0V3JhcHBlckVsZW1lbnQoKTtcbiAgICBjbS5zdGF0ZS5mdWxsU2NyZWVuUmVzdG9yZSA9IHtzY3JvbGxUb3A6IHdpbmRvdy5wYWdlWU9mZnNldCwgc2Nyb2xsTGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3cmFwLnN0eWxlLndpZHRoLCBoZWlnaHQ6IHdyYXAuc3R5bGUuaGVpZ2h0fTtcbiAgICB3cmFwLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICB3cmFwLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgIHdyYXAuY2xhc3NOYW1lICs9IFwiIENvZGVNaXJyb3ItZnVsbHNjcmVlblwiO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgY20ucmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Tm9ybWFsKGNtKSB7XG4gICAgdmFyIHdyYXAgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuICAgIHdyYXAuY2xhc3NOYW1lID0gd3JhcC5jbGFzc05hbWUucmVwbGFjZSgvXFxzKkNvZGVNaXJyb3ItZnVsbHNjcmVlblxcYi8sIFwiXCIpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XG4gICAgdmFyIGluZm8gPSBjbS5zdGF0ZS5mdWxsU2NyZWVuUmVzdG9yZTtcbiAgICB3cmFwLnN0eWxlLndpZHRoID0gaW5mby53aWR0aDsgd3JhcC5zdHlsZS5oZWlnaHQgPSBpbmZvLmhlaWdodDtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oaW5mby5zY3JvbGxMZWZ0LCBpbmZvLnNjcm9sbFRvcCk7XG4gICAgY20ucmVmcmVzaCgpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vZGlzcGxheS9mdWxsc2NyZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yL2FkZG9uL2Rpc3BsYXkvZnVsbHNjcmVlbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cDovL2NvZGVtaXJyb3IubmV0L0xJQ0VOU0VcblxuKGZ1bmN0aW9uKG1vZCkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIpIC8vIENvbW1vbkpTXG4gICAgbW9kKHJlcXVpcmUoXCIuLi8uLi9saWIvY29kZW1pcnJvclwiKSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIC8vIEFNRFxuICAgIGRlZmluZShbXCIuLi8uLi9saWIvY29kZW1pcnJvclwiXSwgbW9kKTtcbiAgZWxzZSAvLyBQbGFpbiBicm93c2VyIGVudlxuICAgIG1vZChDb2RlTWlycm9yKTtcbn0pKGZ1bmN0aW9uKENvZGVNaXJyb3IpIHtcbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24oXCJwbGFjZWhvbGRlclwiLCBcIlwiLCBmdW5jdGlvbihjbSwgdmFsLCBvbGQpIHtcbiAgICB2YXIgcHJldiA9IG9sZCAmJiBvbGQgIT0gQ29kZU1pcnJvci5Jbml0O1xuICAgIGlmICh2YWwgJiYgIXByZXYpIHtcbiAgICAgIGNtLm9uKFwiYmx1clwiLCBvbkJsdXIpO1xuICAgICAgY20ub24oXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgY20ub24oXCJzd2FwRG9jXCIsIG9uQ2hhbmdlKTtcbiAgICAgIG9uQ2hhbmdlKGNtKTtcbiAgICB9IGVsc2UgaWYgKCF2YWwgJiYgcHJldikge1xuICAgICAgY20ub2ZmKFwiYmx1clwiLCBvbkJsdXIpO1xuICAgICAgY20ub2ZmKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbiAgICAgIGNtLm9mZihcInN3YXBEb2NcIiwgb25DaGFuZ2UpO1xuICAgICAgY2xlYXJQbGFjZWhvbGRlcihjbSk7XG4gICAgICB2YXIgd3JhcHBlciA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG4gICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IHdyYXBwZXIuY2xhc3NOYW1lLnJlcGxhY2UoXCIgQ29kZU1pcnJvci1lbXB0eVwiLCBcIlwiKTtcbiAgICB9XG5cbiAgICBpZiAodmFsICYmICFjbS5oYXNGb2N1cygpKSBvbkJsdXIoY20pO1xuICB9KTtcblxuICBmdW5jdGlvbiBjbGVhclBsYWNlaG9sZGVyKGNtKSB7XG4gICAgaWYgKGNtLnN0YXRlLnBsYWNlaG9sZGVyKSB7XG4gICAgICBjbS5zdGF0ZS5wbGFjZWhvbGRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNtLnN0YXRlLnBsYWNlaG9sZGVyKTtcbiAgICAgIGNtLnN0YXRlLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gc2V0UGxhY2Vob2xkZXIoY20pIHtcbiAgICBjbGVhclBsYWNlaG9sZGVyKGNtKTtcbiAgICB2YXIgZWx0ID0gY20uc3RhdGUucGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgIGVsdC5zdHlsZS5jc3NUZXh0ID0gXCJoZWlnaHQ6IDA7IG92ZXJmbG93OiB2aXNpYmxlXCI7XG4gICAgZWx0LnN0eWxlLmRpcmVjdGlvbiA9IGNtLmdldE9wdGlvbihcImRpcmVjdGlvblwiKTtcbiAgICBlbHQuY2xhc3NOYW1lID0gXCJDb2RlTWlycm9yLXBsYWNlaG9sZGVyXCI7XG4gICAgdmFyIHBsYWNlSG9sZGVyID0gY20uZ2V0T3B0aW9uKFwicGxhY2Vob2xkZXJcIilcbiAgICBpZiAodHlwZW9mIHBsYWNlSG9sZGVyID09IFwic3RyaW5nXCIpIHBsYWNlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGxhY2VIb2xkZXIpXG4gICAgZWx0LmFwcGVuZENoaWxkKHBsYWNlSG9sZGVyKVxuICAgIGNtLmRpc3BsYXkubGluZVNwYWNlLmluc2VydEJlZm9yZShlbHQsIGNtLmRpc3BsYXkubGluZVNwYWNlLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25CbHVyKGNtKSB7XG4gICAgaWYgKGlzRW1wdHkoY20pKSBzZXRQbGFjZWhvbGRlcihjbSk7XG4gIH1cbiAgZnVuY3Rpb24gb25DaGFuZ2UoY20pIHtcbiAgICB2YXIgd3JhcHBlciA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCksIGVtcHR5ID0gaXNFbXB0eShjbSk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSB3cmFwcGVyLmNsYXNzTmFtZS5yZXBsYWNlKFwiIENvZGVNaXJyb3ItZW1wdHlcIiwgXCJcIikgKyAoZW1wdHkgPyBcIiBDb2RlTWlycm9yLWVtcHR5XCIgOiBcIlwiKTtcblxuICAgIGlmIChlbXB0eSkgc2V0UGxhY2Vob2xkZXIoY20pO1xuICAgIGVsc2UgY2xlYXJQbGFjZWhvbGRlcihjbSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KGNtKSB7XG4gICAgcmV0dXJuIChjbS5saW5lQ291bnQoKSA9PT0gMSkgJiYgKGNtLmdldExpbmUoMCkgPT09IFwiXCIpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vZGlzcGxheS9wbGFjZWhvbGRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9hZGRvbi9kaXNwbGF5L3BsYWNlaG9sZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwOi8vY29kZW1pcnJvci5uZXQvTElDRU5TRVxuXG4oZnVuY3Rpb24obW9kKSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUgPT0gXCJvYmplY3RcIikgLy8gQ29tbW9uSlNcbiAgICBtb2QocmVxdWlyZShcIi4uLy4uL2xpYi9jb2RlbWlycm9yXCIpKTtcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkgLy8gQU1EXG4gICAgZGVmaW5lKFtcIi4uLy4uL2xpYi9jb2RlbWlycm9yXCJdLCBtb2QpO1xuICBlbHNlIC8vIFBsYWluIGJyb3dzZXIgZW52XG4gICAgbW9kKENvZGVNaXJyb3IpO1xufSkoZnVuY3Rpb24oQ29kZU1pcnJvcikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbGlzdFJFID0gL14oXFxzKikoPls+IF0qfFsqKy1dIFxcW1t4IF1cXF1cXHN8WyorLV1cXHN8KFxcZCspKFsuKV0pKShcXHMqKS8sXG4gICAgICBlbXB0eUxpc3RSRSA9IC9eKFxccyopKD5bPiBdKnxbKistXSBcXFtbeCBdXFxdfFsqKy1dfChcXGQrKVsuKV0pKFxccyopJC8sXG4gICAgICB1bm9yZGVyZWRMaXN0UkUgPSAvWyorLV1cXHMvO1xuXG4gIENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudENvbnRpbnVlTWFya2Rvd25MaXN0ID0gZnVuY3Rpb24oY20pIHtcbiAgICBpZiAoY20uZ2V0T3B0aW9uKFwiZGlzYWJsZUlucHV0XCIpKSByZXR1cm4gQ29kZU1pcnJvci5QYXNzO1xuICAgIHZhciByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpLCByZXBsYWNlbWVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBvcyA9IHJhbmdlc1tpXS5oZWFkO1xuICAgICAgdmFyIGVvbFN0YXRlID0gY20uZ2V0U3RhdGVBZnRlcihwb3MubGluZSk7XG4gICAgICB2YXIgaW5MaXN0ID0gZW9sU3RhdGUubGlzdCAhPT0gZmFsc2U7XG4gICAgICB2YXIgaW5RdW90ZSA9IGVvbFN0YXRlLnF1b3RlICE9PSAwO1xuXG4gICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUocG9zLmxpbmUpLCBtYXRjaCA9IGxpc3RSRS5leGVjKGxpbmUpO1xuICAgICAgdmFyIGN1cnNvckJlZm9yZUJ1bGxldCA9IC9eXFxzKiQvLnRlc3QobGluZS5zbGljZSgwLCBwb3MuY2gpKTtcbiAgICAgIGlmICghcmFuZ2VzW2ldLmVtcHR5KCkgfHwgKCFpbkxpc3QgJiYgIWluUXVvdGUpIHx8ICFtYXRjaCB8fCBjdXJzb3JCZWZvcmVCdWxsZXQpIHtcbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJuZXdsaW5lQW5kSW5kZW50XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZW1wdHlMaXN0UkUudGVzdChsaW5lKSkge1xuICAgICAgICBpZiAoIS8+XFxzKiQvLnRlc3QobGluZSkpIGNtLnJlcGxhY2VSYW5nZShcIlwiLCB7XG4gICAgICAgICAgbGluZTogcG9zLmxpbmUsIGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBsaW5lOiBwb3MubGluZSwgY2g6IHBvcy5jaCArIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcGxhY2VtZW50c1tpXSA9IFwiXFxuXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW5kZW50ID0gbWF0Y2hbMV0sIGFmdGVyID0gbWF0Y2hbNV07XG4gICAgICAgIHZhciBudW1iZXJlZCA9ICEodW5vcmRlcmVkTGlzdFJFLnRlc3QobWF0Y2hbMl0pIHx8IG1hdGNoWzJdLmluZGV4T2YoXCI+XCIpID49IDApO1xuICAgICAgICB2YXIgYnVsbGV0ID0gbnVtYmVyZWQgPyAocGFyc2VJbnQobWF0Y2hbM10sIDEwKSArIDEpICsgbWF0Y2hbNF0gOiBtYXRjaFsyXS5yZXBsYWNlKFwieFwiLCBcIiBcIik7XG4gICAgICAgIHJlcGxhY2VtZW50c1tpXSA9IFwiXFxuXCIgKyBpbmRlbnQgKyBidWxsZXQgKyBhZnRlcjtcblxuICAgICAgICBpZiAobnVtYmVyZWQpIGluY3JlbWVudFJlbWFpbmluZ01hcmtkb3duTGlzdE51bWJlcnMoY20sIHBvcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnRzKTtcbiAgfTtcblxuICAvLyBBdXRvLXVwZGF0aW5nIE1hcmtkb3duIGxpc3QgbnVtYmVycyB3aGVuIGEgbmV3IGl0ZW0gaXMgYWRkZWQgdG8gdGhlXG4gIC8vIG1pZGRsZSBvZiBhIGxpc3RcbiAgZnVuY3Rpb24gaW5jcmVtZW50UmVtYWluaW5nTWFya2Rvd25MaXN0TnVtYmVycyhjbSwgcG9zKSB7XG4gICAgdmFyIHN0YXJ0TGluZSA9IHBvcy5saW5lLCBsb29rQWhlYWQgPSAwLCBza2lwQ291bnQgPSAwO1xuICAgIHZhciBzdGFydEl0ZW0gPSBsaXN0UkUuZXhlYyhjbS5nZXRMaW5lKHN0YXJ0TGluZSkpLCBzdGFydEluZGVudCA9IHN0YXJ0SXRlbVsxXTtcblxuICAgIGRvIHtcbiAgICAgIGxvb2tBaGVhZCArPSAxO1xuICAgICAgdmFyIG5leHRMaW5lTnVtYmVyID0gc3RhcnRMaW5lICsgbG9va0FoZWFkO1xuICAgICAgdmFyIG5leHRMaW5lID0gY20uZ2V0TGluZShuZXh0TGluZU51bWJlciksIG5leHRJdGVtID0gbGlzdFJFLmV4ZWMobmV4dExpbmUpO1xuXG4gICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0SXRlbVsxXTtcbiAgICAgICAgdmFyIG5ld051bWJlciA9IChwYXJzZUludChzdGFydEl0ZW1bM10sIDEwKSArIGxvb2tBaGVhZCAtIHNraXBDb3VudCk7XG4gICAgICAgIHZhciBuZXh0TnVtYmVyID0gKHBhcnNlSW50KG5leHRJdGVtWzNdLCAxMCkpLCBpdGVtTnVtYmVyID0gbmV4dE51bWJlcjtcblxuICAgICAgICBpZiAoc3RhcnRJbmRlbnQgPT09IG5leHRJbmRlbnQgJiYgIWlzTmFOKG5leHROdW1iZXIpKSB7XG4gICAgICAgICAgaWYgKG5ld051bWJlciA9PT0gbmV4dE51bWJlcikgaXRlbU51bWJlciA9IG5leHROdW1iZXIgKyAxO1xuICAgICAgICAgIGlmIChuZXdOdW1iZXIgPiBuZXh0TnVtYmVyKSBpdGVtTnVtYmVyID0gbmV3TnVtYmVyICsgMTtcbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoXG4gICAgICAgICAgICBuZXh0TGluZS5yZXBsYWNlKGxpc3RSRSwgbmV4dEluZGVudCArIGl0ZW1OdW1iZXIgKyBuZXh0SXRlbVs0XSArIG5leHRJdGVtWzVdKSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaW5lOiBuZXh0TGluZU51bWJlciwgY2g6IDBcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBsaW5lOiBuZXh0TGluZU51bWJlciwgY2g6IG5leHRMaW5lLmxlbmd0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzdGFydEluZGVudC5sZW5ndGggPiBuZXh0SW5kZW50Lmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCBydW4gaWYgdGhlIG5leHQgbGluZSBpbW1lZGlhdGxleSBpbmRlbnRzLCBhcyBpdCBpc1xuICAgICAgICAgIC8vIG5vdCBjbGVhciBvZiB0aGUgdXNlcnMgaW50ZW50aW9uIChuZXcgaW5kZW50ZWQgaXRlbSBvciBzYW1lIGxldmVsKVxuICAgICAgICAgIGlmICgoc3RhcnRJbmRlbnQubGVuZ3RoIDwgbmV4dEluZGVudC5sZW5ndGgpICYmIChsb29rQWhlYWQgPT09IDEpKSByZXR1cm47XG4gICAgICAgICAgc2tpcENvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IHdoaWxlIChuZXh0SXRlbSk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9hZGRvbi9lZGl0L2NvbnRpbnVlbGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9hZGRvbi9lZGl0L2NvbnRpbnVlbGlzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cDovL2NvZGVtaXJyb3IubmV0L0xJQ0VOU0VcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiB0aGF0IGFsbG93cyBtb2RlcyB0byBiZSBjb21iaW5lZC4gVGhlIG1vZGUgZ2l2ZW5cbi8vIGFzIHRoZSBiYXNlIGFyZ3VtZW50IHRha2VzIGNhcmUgb2YgbW9zdCBvZiB0aGUgbm9ybWFsIG1vZGVcbi8vIGZ1bmN0aW9uYWxpdHksIGJ1dCBhIHNlY29uZCAodHlwaWNhbGx5IHNpbXBsZSkgbW9kZSBpcyB1c2VkLCB3aGljaFxuLy8gY2FuIG92ZXJyaWRlIHRoZSBzdHlsZSBvZiB0ZXh0LiBCb3RoIG1vZGVzIGdldCB0byBwYXJzZSBhbGwgb2YgdGhlXG4vLyB0ZXh0LCBidXQgd2hlbiBib3RoIGFzc2lnbiBhIG5vbi1udWxsIHN0eWxlIHRvIGEgcGllY2Ugb2YgY29kZSwgdGhlXG4vLyBvdmVybGF5IHdpbnMsIHVubGVzcyB0aGUgY29tYmluZSBhcmd1bWVudCB3YXMgdHJ1ZSBhbmQgbm90IG92ZXJyaWRkZW4sXG4vLyBvciBzdGF0ZS5vdmVybGF5LmNvbWJpbmVUb2tlbnMgd2FzIHRydWUsIGluIHdoaWNoIGNhc2UgdGhlIHN0eWxlcyBhcmVcbi8vIGNvbWJpbmVkLlxuXG4oZnVuY3Rpb24obW9kKSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUgPT0gXCJvYmplY3RcIikgLy8gQ29tbW9uSlNcbiAgICBtb2QocmVxdWlyZShcIi4uLy4uL2xpYi9jb2RlbWlycm9yXCIpKTtcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkgLy8gQU1EXG4gICAgZGVmaW5lKFtcIi4uLy4uL2xpYi9jb2RlbWlycm9yXCJdLCBtb2QpO1xuICBlbHNlIC8vIFBsYWluIGJyb3dzZXIgZW52XG4gICAgbW9kKENvZGVNaXJyb3IpO1xufSkoZnVuY3Rpb24oQ29kZU1pcnJvcikge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbkNvZGVNaXJyb3Iub3ZlcmxheU1vZGUgPSBmdW5jdGlvbihiYXNlLCBvdmVybGF5LCBjb21iaW5lKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBDb2RlTWlycm9yLnN0YXJ0U3RhdGUoYmFzZSksXG4gICAgICAgIG92ZXJsYXk6IENvZGVNaXJyb3Iuc3RhcnRTdGF0ZShvdmVybGF5KSxcbiAgICAgICAgYmFzZVBvczogMCwgYmFzZUN1cjogbnVsbCxcbiAgICAgICAgb3ZlcmxheVBvczogMCwgb3ZlcmxheUN1cjogbnVsbCxcbiAgICAgICAgc3RyZWFtU2VlbjogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvcHlTdGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IENvZGVNaXJyb3IuY29weVN0YXRlKGJhc2UsIHN0YXRlLmJhc2UpLFxuICAgICAgICBvdmVybGF5OiBDb2RlTWlycm9yLmNvcHlTdGF0ZShvdmVybGF5LCBzdGF0ZS5vdmVybGF5KSxcbiAgICAgICAgYmFzZVBvczogc3RhdGUuYmFzZVBvcywgYmFzZUN1cjogbnVsbCxcbiAgICAgICAgb3ZlcmxheVBvczogc3RhdGUub3ZlcmxheVBvcywgb3ZlcmxheUN1cjogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICAgIGlmIChzdHJlYW0gIT0gc3RhdGUuc3RyZWFtU2VlbiB8fFxuICAgICAgICAgIE1hdGgubWluKHN0YXRlLmJhc2VQb3MsIHN0YXRlLm92ZXJsYXlQb3MpIDwgc3RyZWFtLnN0YXJ0KSB7XG4gICAgICAgIHN0YXRlLnN0cmVhbVNlZW4gPSBzdHJlYW07XG4gICAgICAgIHN0YXRlLmJhc2VQb3MgPSBzdGF0ZS5vdmVybGF5UG9zID0gc3RyZWFtLnN0YXJ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RyZWFtLnN0YXJ0ID09IHN0YXRlLmJhc2VQb3MpIHtcbiAgICAgICAgc3RhdGUuYmFzZUN1ciA9IGJhc2UudG9rZW4oc3RyZWFtLCBzdGF0ZS5iYXNlKTtcbiAgICAgICAgc3RhdGUuYmFzZVBvcyA9IHN0cmVhbS5wb3M7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtLnN0YXJ0ID09IHN0YXRlLm92ZXJsYXlQb3MpIHtcbiAgICAgICAgc3RyZWFtLnBvcyA9IHN0cmVhbS5zdGFydDtcbiAgICAgICAgc3RhdGUub3ZlcmxheUN1ciA9IG92ZXJsYXkudG9rZW4oc3RyZWFtLCBzdGF0ZS5vdmVybGF5KTtcbiAgICAgICAgc3RhdGUub3ZlcmxheVBvcyA9IHN0cmVhbS5wb3M7XG4gICAgICB9XG4gICAgICBzdHJlYW0ucG9zID0gTWF0aC5taW4oc3RhdGUuYmFzZVBvcywgc3RhdGUub3ZlcmxheVBvcyk7XG5cbiAgICAgIC8vIHN0YXRlLm92ZXJsYXkuY29tYmluZVRva2VucyBhbHdheXMgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGNvbWJpbmUsXG4gICAgICAvLyB1bmxlc3Mgc2V0IHRvIG51bGxcbiAgICAgIGlmIChzdGF0ZS5vdmVybGF5Q3VyID09IG51bGwpIHJldHVybiBzdGF0ZS5iYXNlQ3VyO1xuICAgICAgZWxzZSBpZiAoc3RhdGUuYmFzZUN1ciAhPSBudWxsICYmXG4gICAgICAgICAgICAgICBzdGF0ZS5vdmVybGF5LmNvbWJpbmVUb2tlbnMgfHxcbiAgICAgICAgICAgICAgIGNvbWJpbmUgJiYgc3RhdGUub3ZlcmxheS5jb21iaW5lVG9rZW5zID09IG51bGwpXG4gICAgICAgIHJldHVybiBzdGF0ZS5iYXNlQ3VyICsgXCIgXCIgKyBzdGF0ZS5vdmVybGF5Q3VyO1xuICAgICAgZWxzZSByZXR1cm4gc3RhdGUub3ZlcmxheUN1cjtcbiAgICB9LFxuXG4gICAgaW5kZW50OiBiYXNlLmluZGVudCAmJiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyKSB7XG4gICAgICByZXR1cm4gYmFzZS5pbmRlbnQoc3RhdGUuYmFzZSwgdGV4dEFmdGVyKTtcbiAgICB9LFxuICAgIGVsZWN0cmljQ2hhcnM6IGJhc2UuZWxlY3RyaWNDaGFycyxcblxuICAgIGlubmVyTW9kZTogZnVuY3Rpb24oc3RhdGUpIHsgcmV0dXJuIHtzdGF0ZTogc3RhdGUuYmFzZSwgbW9kZTogYmFzZX07IH0sXG5cbiAgICBibGFua0xpbmU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB2YXIgYmFzZVRva2VuLCBvdmVybGF5VG9rZW47XG4gICAgICBpZiAoYmFzZS5ibGFua0xpbmUpIGJhc2VUb2tlbiA9IGJhc2UuYmxhbmtMaW5lKHN0YXRlLmJhc2UpO1xuICAgICAgaWYgKG92ZXJsYXkuYmxhbmtMaW5lKSBvdmVybGF5VG9rZW4gPSBvdmVybGF5LmJsYW5rTGluZShzdGF0ZS5vdmVybGF5KTtcblxuICAgICAgcmV0dXJuIG92ZXJsYXlUb2tlbiA9PSBudWxsID9cbiAgICAgICAgYmFzZVRva2VuIDpcbiAgICAgICAgKGNvbWJpbmUgJiYgYmFzZVRva2VuICE9IG51bGwgPyBiYXNlVG9rZW4gKyBcIiBcIiArIG92ZXJsYXlUb2tlbiA6IG92ZXJsYXlUb2tlbik7XG4gICAgfVxuICB9O1xufTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yL2FkZG9uL21vZGUvb3ZlcmxheS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9hZGRvbi9tb2RlL292ZXJsYXkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIvLyBDb2RlTWlycm9yLCBjb3B5cmlnaHQgKGMpIGJ5IE1hcmlqbiBIYXZlcmJla2UgYW5kIG90aGVyc1xuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgYW4gTUlUIGxpY2Vuc2U6IGh0dHA6Ly9jb2RlbWlycm9yLm5ldC9MSUNFTlNFXG5cbi8vIEJlY2F1c2Ugc29tZXRpbWVzIHlvdSBuZWVkIHRvIG1hcmsgdGhlIHNlbGVjdGVkICp0ZXh0Ki5cbi8vXG4vLyBBZGRzIGFuIG9wdGlvbiAnc3R5bGVTZWxlY3RlZFRleHQnIHdoaWNoLCB3aGVuIGVuYWJsZWQsIGdpdmVzXG4vLyBzZWxlY3RlZCB0ZXh0IHRoZSBDU1MgY2xhc3MgZ2l2ZW4gYXMgb3B0aW9uIHZhbHVlLCBvclxuLy8gXCJDb2RlTWlycm9yLXNlbGVjdGVkdGV4dFwiIHdoZW4gdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZy5cblxuKGZ1bmN0aW9uKG1vZCkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIpIC8vIENvbW1vbkpTXG4gICAgbW9kKHJlcXVpcmUoXCIuLi8uLi9saWIvY29kZW1pcnJvclwiKSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIC8vIEFNRFxuICAgIGRlZmluZShbXCIuLi8uLi9saWIvY29kZW1pcnJvclwiXSwgbW9kKTtcbiAgZWxzZSAvLyBQbGFpbiBicm93c2VyIGVudlxuICAgIG1vZChDb2RlTWlycm9yKTtcbn0pKGZ1bmN0aW9uKENvZGVNaXJyb3IpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24oXCJzdHlsZVNlbGVjdGVkVGV4dFwiLCBmYWxzZSwgZnVuY3Rpb24oY20sIHZhbCwgb2xkKSB7XG4gICAgdmFyIHByZXYgPSBvbGQgJiYgb2xkICE9IENvZGVNaXJyb3IuSW5pdDtcbiAgICBpZiAodmFsICYmICFwcmV2KSB7XG4gICAgICBjbS5zdGF0ZS5tYXJrZWRTZWxlY3Rpb24gPSBbXTtcbiAgICAgIGNtLnN0YXRlLm1hcmtlZFNlbGVjdGlvblN0eWxlID0gdHlwZW9mIHZhbCA9PSBcInN0cmluZ1wiID8gdmFsIDogXCJDb2RlTWlycm9yLXNlbGVjdGVkdGV4dFwiO1xuICAgICAgcmVzZXQoY20pO1xuICAgICAgY20ub24oXCJjdXJzb3JBY3Rpdml0eVwiLCBvbkN1cnNvckFjdGl2aXR5KTtcbiAgICAgIGNtLm9uKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKCF2YWwgJiYgcHJldikge1xuICAgICAgY20ub2ZmKFwiY3Vyc29yQWN0aXZpdHlcIiwgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgICBjbS5vZmYoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgY2xlYXIoY20pO1xuICAgICAgY20uc3RhdGUubWFya2VkU2VsZWN0aW9uID0gY20uc3RhdGUubWFya2VkU2VsZWN0aW9uU3R5bGUgPSBudWxsO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gb25DdXJzb3JBY3Rpdml0eShjbSkge1xuICAgIGlmIChjbS5zdGF0ZS5tYXJrZWRTZWxlY3Rpb24pXG4gICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7IHVwZGF0ZShjbSk7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DaGFuZ2UoY20pIHtcbiAgICBpZiAoY20uc3RhdGUubWFya2VkU2VsZWN0aW9uICYmIGNtLnN0YXRlLm1hcmtlZFNlbGVjdGlvbi5sZW5ndGgpXG4gICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7IGNsZWFyKGNtKTsgfSk7XG4gIH1cblxuICB2YXIgQ0hVTktfU0laRSA9IDg7XG4gIHZhciBQb3MgPSBDb2RlTWlycm9yLlBvcztcbiAgdmFyIGNtcCA9IENvZGVNaXJyb3IuY21wUG9zO1xuXG4gIGZ1bmN0aW9uIGNvdmVyUmFuZ2UoY20sIGZyb20sIHRvLCBhZGRBdCkge1xuICAgIGlmIChjbXAoZnJvbSwgdG8pID09IDApIHJldHVybjtcbiAgICB2YXIgYXJyYXkgPSBjbS5zdGF0ZS5tYXJrZWRTZWxlY3Rpb247XG4gICAgdmFyIGNscyA9IGNtLnN0YXRlLm1hcmtlZFNlbGVjdGlvblN0eWxlO1xuICAgIGZvciAodmFyIGxpbmUgPSBmcm9tLmxpbmU7Oykge1xuICAgICAgdmFyIHN0YXJ0ID0gbGluZSA9PSBmcm9tLmxpbmUgPyBmcm9tIDogUG9zKGxpbmUsIDApO1xuICAgICAgdmFyIGVuZExpbmUgPSBsaW5lICsgQ0hVTktfU0laRSwgYXRFbmQgPSBlbmRMaW5lID49IHRvLmxpbmU7XG4gICAgICB2YXIgZW5kID0gYXRFbmQgPyB0byA6IFBvcyhlbmRMaW5lLCAwKTtcbiAgICAgIHZhciBtYXJrID0gY20ubWFya1RleHQoc3RhcnQsIGVuZCwge2NsYXNzTmFtZTogY2xzfSk7XG4gICAgICBpZiAoYWRkQXQgPT0gbnVsbCkgYXJyYXkucHVzaChtYXJrKTtcbiAgICAgIGVsc2UgYXJyYXkuc3BsaWNlKGFkZEF0KyssIDAsIG1hcmspO1xuICAgICAgaWYgKGF0RW5kKSBicmVhaztcbiAgICAgIGxpbmUgPSBlbmRMaW5lO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKGNtKSB7XG4gICAgdmFyIGFycmF5ID0gY20uc3RhdGUubWFya2VkU2VsZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIGFycmF5W2ldLmNsZWFyKCk7XG4gICAgYXJyYXkubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KGNtKSB7XG4gICAgY2xlYXIoY20pO1xuICAgIHZhciByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKVxuICAgICAgY292ZXJSYW5nZShjbSwgcmFuZ2VzW2ldLmZyb20oKSwgcmFuZ2VzW2ldLnRvKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGNtKSB7XG4gICAgaWYgKCFjbS5zb21ldGhpbmdTZWxlY3RlZCgpKSByZXR1cm4gY2xlYXIoY20pO1xuICAgIGlmIChjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aCA+IDEpIHJldHVybiByZXNldChjbSk7XG5cbiAgICB2YXIgZnJvbSA9IGNtLmdldEN1cnNvcihcInN0YXJ0XCIpLCB0byA9IGNtLmdldEN1cnNvcihcImVuZFwiKTtcblxuICAgIHZhciBhcnJheSA9IGNtLnN0YXRlLm1hcmtlZFNlbGVjdGlvbjtcbiAgICBpZiAoIWFycmF5Lmxlbmd0aCkgcmV0dXJuIGNvdmVyUmFuZ2UoY20sIGZyb20sIHRvKTtcblxuICAgIHZhciBjb3ZlclN0YXJ0ID0gYXJyYXlbMF0uZmluZCgpLCBjb3ZlckVuZCA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdLmZpbmQoKTtcbiAgICBpZiAoIWNvdmVyU3RhcnQgfHwgIWNvdmVyRW5kIHx8IHRvLmxpbmUgLSBmcm9tLmxpbmUgPD0gQ0hVTktfU0laRSB8fFxuICAgICAgICBjbXAoZnJvbSwgY292ZXJFbmQudG8pID49IDAgfHwgY21wKHRvLCBjb3ZlclN0YXJ0LmZyb20pIDw9IDApXG4gICAgICByZXR1cm4gcmVzZXQoY20pO1xuXG4gICAgd2hpbGUgKGNtcChmcm9tLCBjb3ZlclN0YXJ0LmZyb20pID4gMCkge1xuICAgICAgYXJyYXkuc2hpZnQoKS5jbGVhcigpO1xuICAgICAgY292ZXJTdGFydCA9IGFycmF5WzBdLmZpbmQoKTtcbiAgICB9XG4gICAgaWYgKGNtcChmcm9tLCBjb3ZlclN0YXJ0LmZyb20pIDwgMCkge1xuICAgICAgaWYgKGNvdmVyU3RhcnQudG8ubGluZSAtIGZyb20ubGluZSA8IENIVU5LX1NJWkUpIHtcbiAgICAgICAgYXJyYXkuc2hpZnQoKS5jbGVhcigpO1xuICAgICAgICBjb3ZlclJhbmdlKGNtLCBmcm9tLCBjb3ZlclN0YXJ0LnRvLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdmVyUmFuZ2UoY20sIGZyb20sIGNvdmVyU3RhcnQuZnJvbSwgMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGNtcCh0bywgY292ZXJFbmQudG8pIDwgMCkge1xuICAgICAgYXJyYXkucG9wKCkuY2xlYXIoKTtcbiAgICAgIGNvdmVyRW5kID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV0uZmluZCgpO1xuICAgIH1cbiAgICBpZiAoY21wKHRvLCBjb3ZlckVuZC50bykgPiAwKSB7XG4gICAgICBpZiAodG8ubGluZSAtIGNvdmVyRW5kLmZyb20ubGluZSA8IENIVU5LX1NJWkUpIHtcbiAgICAgICAgYXJyYXkucG9wKCkuY2xlYXIoKTtcbiAgICAgICAgY292ZXJSYW5nZShjbSwgY292ZXJFbmQuZnJvbSwgdG8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY292ZXJSYW5nZShjbSwgY292ZXJFbmQudG8sIHRvKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29kZW1pcnJvci9hZGRvbi9zZWxlY3Rpb24vbWFyay1zZWxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vc2VsZWN0aW9uL21hcmstc2VsZWN0aW9uLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwOi8vY29kZW1pcnJvci5uZXQvTElDRU5TRVxuXG4oZnVuY3Rpb24obW9kKSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUgPT0gXCJvYmplY3RcIikgLy8gQ29tbW9uSlNcbiAgICBtb2QocmVxdWlyZShcIi4uLy4uL2xpYi9jb2RlbWlycm9yXCIpLCByZXF1aXJlKFwiLi4vbWFya2Rvd24vbWFya2Rvd25cIiksIHJlcXVpcmUoXCIuLi8uLi9hZGRvbi9tb2RlL292ZXJsYXlcIikpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSAvLyBBTURcbiAgICBkZWZpbmUoW1wiLi4vLi4vbGliL2NvZGVtaXJyb3JcIiwgXCIuLi9tYXJrZG93bi9tYXJrZG93blwiLCBcIi4uLy4uL2FkZG9uL21vZGUvb3ZlcmxheVwiXSwgbW9kKTtcbiAgZWxzZSAvLyBQbGFpbiBicm93c2VyIGVudlxuICAgIG1vZChDb2RlTWlycm9yKTtcbn0pKGZ1bmN0aW9uKENvZGVNaXJyb3IpIHtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgdXJsUkUgPSAvXigoPzooPzphYWFzP3xhYm91dHxhY2FwfGFkaXVteHRyYXxhZltwc118YWltfGFwdHxhdHRhY2htZW50fGF3fGJlc2hhcmV8Yml0Y29pbnxib2xvfGNhbGx0b3xjYXB8Y2hyb21lKD86LWV4dGVuc2lvbik/fGNpZHxjb2FwfGNvbS1ldmVudGJyaXRlLWF0dGVuZGVlfGNvbnRlbnR8Y3JpZHxjdnN8ZGF0YXxkYXZ8ZGljdHxkbG5hLSg/OnBsYXljb250YWluZXJ8cGxheXNpbmdsZSl8ZG5zfGRvaXxkdG58ZHZifGVkMmt8ZmFjZXRpbWV8ZmVlZHxmaWxlfGZpbmdlcnxmaXNofGZ0cHxnZW98Z2d8Z2l0fGdpem1vcHJvamVjdHxnb3xnb3BoZXJ8Z3RhbGt8aDMyM3xoY3B8aHR0cHM/fGlheHxpY2FwfGljb258aW18aW1hcHxpbmZvfGlwbnxpcHB8aXJjWzZzXT98aXJpcyg/OlxcLmJlZXB8XFwubHd6fFxcLnhwY3xcXC54cGNzKT98aXRtc3xqYXJ8amF2YXNjcmlwdHxqbXN8a2V5cGFyY3xsYXN0Zm18bGRhcHM/fG1hZ25ldHxtYWlsdG98bWFwc3xtYXJrZXR8bWVzc2FnZXxtaWR8bW1zfG1zLWhlbHB8bXNuaW18bXNycHM/fG10cXB8bXVtYmxlfG11cGRhdGV8bXZufG5ld3N8bmZzfG5paD98bm50cHxub3Rlc3xvaWR8b3BhcXVlbG9ja3Rva2VufHBhbG18cGFwYXJhenppfHBsYXRmb3JtfHBvcHxwcmVzfHByb3h5fHBzeWN8cXVlcnl8cmVzKD86b3VyY2UpP3xybWl8cnN5bmN8cnRtcHxydHNwfHNlY29uZGxpZmV8c2VydmljZXxzZXNzaW9ufHNmdHB8c2dufHNodHRwfHNpZXZlfHNpcHM/fHNreXBlfHNtW2JzXXxzbm1wfHNvYXBcXC5iZWVwcz98c29sZGF0fHNwb3RpZnl8c3NofHN0ZWFtfHN2bnx0YWd8dGVhbXNwZWFrfHRlbCg/Om5ldCk/fHRmdHB8dGhpbmdzfHRoaXNtZXNzYWdlfHRpcHx0bjMyNzB8dHZ8dWRwfHVucmVhbHx1cm58dXQyMDA0fHZlbW1pfHZlbnRyaWxvfHZpZXctc291cmNlfHdlYmNhbHx3c3M/fHd0YWl8d3ljaXd5Z3x4Y29uKD86LXVzZXJpZCk/fHhmaXJlfHhtbHJwY1xcLmJlZXBzP3x4bXBwfHhyaXx5bXNncnx6MzlcXC41MFtyc10/KTooPzpcXC97MSwzfXxbYS16MC05JV0pfHd3d1xcZHswLDN9Wy5dfFthLXowLTkuXFwtXStbLl1bYS16XXsyLDR9XFwvKSg/OlteXFxzKCk8Pl18XFwoW15cXHMoKTw+XSpcXCkpKyg/OlxcKFteXFxzKCk8Pl0qXFwpfFteXFxzYCohKClcXFtcXF17fTs6J1wiLiw8Pj/Cq8K74oCc4oCd4oCY4oCZXSkpL2lcblxuQ29kZU1pcnJvci5kZWZpbmVNb2RlKFwiZ2ZtXCIsIGZ1bmN0aW9uKGNvbmZpZywgbW9kZUNvbmZpZykge1xuICB2YXIgY29kZURlcHRoID0gMDtcbiAgZnVuY3Rpb24gYmxhbmtMaW5lKHN0YXRlKSB7XG4gICAgc3RhdGUuY29kZSA9IGZhbHNlO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBnZm1PdmVybGF5ID0ge1xuICAgIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogZmFsc2UsXG4gICAgICAgIGNvZGVCbG9jazogZmFsc2UsXG4gICAgICAgIGF0ZVNwYWNlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvcHlTdGF0ZTogZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogcy5jb2RlLFxuICAgICAgICBjb2RlQmxvY2s6IHMuY29kZUJsb2NrLFxuICAgICAgICBhdGVTcGFjZTogcy5hdGVTcGFjZVxuICAgICAgfTtcbiAgICB9LFxuICAgIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgICBzdGF0ZS5jb21iaW5lVG9rZW5zID0gbnVsbDtcblxuICAgICAgLy8gSGFjayB0byBwcmV2ZW50IGZvcm1hdHRpbmcgb3ZlcnJpZGUgaW5zaWRlIGNvZGUgYmxvY2tzIChibG9jayBhbmQgaW5saW5lKVxuICAgICAgaWYgKHN0YXRlLmNvZGVCbG9jaykge1xuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKC9eYGBgKy8pKSB7XG4gICAgICAgICAgc3RhdGUuY29kZUJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgICAgc3RhdGUuY29kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbS5zb2woKSAmJiBzdHJlYW0ubWF0Y2goL15gYGArLykpIHtcbiAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICBzdGF0ZS5jb2RlQmxvY2sgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIElmIHRoaXMgYmxvY2sgaXMgY2hhbmdlZCwgaXQgbWF5IG5lZWQgdG8gYmUgdXBkYXRlZCBpbiBNYXJrZG93biBtb2RlXG4gICAgICBpZiAoc3RyZWFtLnBlZWsoKSA9PT0gJ2AnKSB7XG4gICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgIHZhciBiZWZvcmUgPSBzdHJlYW0ucG9zO1xuICAgICAgICBzdHJlYW0uZWF0V2hpbGUoJ2AnKTtcbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSAxICsgc3RyZWFtLnBvcyAtIGJlZm9yZTtcbiAgICAgICAgaWYgKCFzdGF0ZS5jb2RlKSB7XG4gICAgICAgICAgY29kZURlcHRoID0gZGlmZmVyZW5jZTtcbiAgICAgICAgICBzdGF0ZS5jb2RlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gY29kZURlcHRoKSB7IC8vIE11c3QgYmUgZXhhY3RcbiAgICAgICAgICAgIHN0YXRlLmNvZGUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmNvZGUpIHtcbiAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiBzcGFjZS4gSWYgc28sIGxpbmtzIGNhbiBiZSBmb3JtYXR0ZWQgbGF0ZXIgb25cbiAgICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgICAgICBzdGF0ZS5hdGVTcGFjZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbS5zb2woKSB8fCBzdGF0ZS5hdGVTcGFjZSkge1xuICAgICAgICBzdGF0ZS5hdGVTcGFjZSA9IGZhbHNlO1xuICAgICAgICBpZiAobW9kZUNvbmZpZy5naXRIdWJTcGljZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpZihzdHJlYW0ubWF0Y2goL14oPzpbYS16QS1aMC05XFwtX10rXFwvKT8oPzpbYS16QS1aMC05XFwtX10rQCk/KD89LnswLDZ9XFxkKSg/OlthLWYwLTldezcsNDB9XFxiKS8pKSB7XG4gICAgICAgICAgICAvLyBVc2VyL1Byb2plY3RAU0hBXG4gICAgICAgICAgICAvLyBVc2VyQFNIQVxuICAgICAgICAgICAgLy8gU0hBXG4gICAgICAgICAgICBzdGF0ZS5jb21iaW5lVG9rZW5zID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBcImxpbmtcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXig/OlthLXpBLVowLTlcXC1fXStcXC8pPyg/OlthLXpBLVowLTlcXC1fXSspPyNbMC05XStcXGIvKSkge1xuICAgICAgICAgICAgLy8gVXNlci9Qcm9qZWN0I051bVxuICAgICAgICAgICAgLy8gVXNlciNOdW1cbiAgICAgICAgICAgIC8vICNOdW1cbiAgICAgICAgICAgIHN0YXRlLmNvbWJpbmVUb2tlbnMgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIFwibGlua1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbS5tYXRjaCh1cmxSRSkgJiZcbiAgICAgICAgICBzdHJlYW0uc3RyaW5nLnNsaWNlKHN0cmVhbS5zdGFydCAtIDIsIHN0cmVhbS5zdGFydCkgIT0gXCJdKFwiICYmXG4gICAgICAgICAgKHN0cmVhbS5zdGFydCA9PSAwIHx8IC9cXFcvLnRlc3Qoc3RyZWFtLnN0cmluZy5jaGFyQXQoc3RyZWFtLnN0YXJ0IC0gMSkpKSkge1xuICAgICAgICAvLyBVUkxzXG4gICAgICAgIC8vIFRha2VuIGZyb20gaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC8yMDEwLzA3L2ltcHJvdmVkX3JlZ2V4X2Zvcl9tYXRjaGluZ191cmxzXG4gICAgICAgIC8vIEFuZCB0aGVuIChpc3N1ZSAjMTE2MCkgc2ltcGxpZmllZCB0byBtYWtlIGl0IG5vdCBjcmFzaCB0aGUgQ2hyb21lIFJlZ2V4cCBlbmdpbmVcbiAgICAgICAgLy8gQW5kIHRoZW4gbGltaXRlZCB1cmwgc2NoZW1lcyB0byB0aGUgQ29tbW9uTWFyayBsaXN0LCBzbyBmb286YmFyIGlzbid0IG1hdGNoZWQgYXMgYSBVUkxcbiAgICAgICAgc3RhdGUuY29tYmluZVRva2VucyA9IHRydWU7XG4gICAgICAgIHJldHVybiBcImxpbmtcIjtcbiAgICAgIH1cbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGJsYW5rTGluZTogYmxhbmtMaW5lXG4gIH07XG5cbiAgdmFyIG1hcmtkb3duQ29uZmlnID0ge1xuICAgIHRhc2tMaXN0czogdHJ1ZSxcbiAgICBzdHJpa2V0aHJvdWdoOiB0cnVlLFxuICAgIGVtb2ppOiB0cnVlXG4gIH07XG4gIGZvciAodmFyIGF0dHIgaW4gbW9kZUNvbmZpZykge1xuICAgIG1hcmtkb3duQ29uZmlnW2F0dHJdID0gbW9kZUNvbmZpZ1thdHRyXTtcbiAgfVxuICBtYXJrZG93bkNvbmZpZy5uYW1lID0gXCJtYXJrZG93blwiO1xuICByZXR1cm4gQ29kZU1pcnJvci5vdmVybGF5TW9kZShDb2RlTWlycm9yLmdldE1vZGUoY29uZmlnLCBtYXJrZG93bkNvbmZpZyksIGdmbU92ZXJsYXkpO1xuXG59LCBcIm1hcmtkb3duXCIpO1xuXG4gIENvZGVNaXJyb3IuZGVmaW5lTUlNRShcInRleHQveC1nZm1cIiwgXCJnZm1cIik7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvbW9kZS9nZm0vZ2ZtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jb2RlbWlycm9yL21vZGUvZ2ZtL2dmbS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIvKmpzbGludCBuZXdjYXA6IHRydWUgKi9cbi8qZ2xvYmFsIGlubGluZUF0dGFjaG1lbnQ6IGZhbHNlICovXG4vKipcbiAqIENvZGVNaXJyb3IgdmVyc2lvbiBmb3IgaW5saW5lQXR0YWNobWVudFxuICpcbiAqIENhbGwgaW5saW5lQXR0YWNobWVudC5hdHRhY2goZWRpdG9yKSB0byBhdHRhY2ggdG8gYSBjb2RlbWlycm9yIGluc3RhbmNlXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBjb2RlTWlycm9yRWRpdG9yID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcblxuICAgIGlmICghaW5zdGFuY2UuZ2V0V3JhcHBlckVsZW1lbnQpIHtcbiAgICAgIHRocm93IFwiSW52YWxpZCBDb2RlTWlycm9yIG9iamVjdCBnaXZlblwiO1xuICAgIH1cblxuICAgIHRoaXMuY29kZU1pcnJvciA9IGluc3RhbmNlO1xuICB9O1xuXG4gIGNvZGVNaXJyb3JFZGl0b3IucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29kZU1pcnJvci5nZXRWYWx1ZSgpO1xuICB9O1xuXG4gIGNvZGVNaXJyb3JFZGl0b3IucHJvdG90eXBlLmluc2VydFZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgdGhpcy5jb2RlTWlycm9yLnJlcGxhY2VTZWxlY3Rpb24odmFsKTtcbiAgfTtcblxuICBjb2RlTWlycm9yRWRpdG9yLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHZhciBjdXJzb3IgPSB0aGlzLmNvZGVNaXJyb3IuZ2V0Q3Vyc29yKCk7XG4gICAgdGhpcy5jb2RlTWlycm9yLnNldFZhbHVlKHZhbCk7XG4gICAgdGhpcy5jb2RlTWlycm9yLnNldEN1cnNvcihjdXJzb3IpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBdHRhY2ggSW5saW5lQXR0YWNobWVudCB0byBDb2RlTWlycm9yXG4gICAqXG4gICAqIEBwYXJhbSB7Q29kZU1pcnJvcn0gY29kZU1pcnJvclxuICAgKi9cbiAgY29kZU1pcnJvckVkaXRvci5hdHRhY2ggPSBmdW5jdGlvbihjb2RlTWlycm9yLCBvcHRpb25zKSB7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBlZGl0b3IgPSBuZXcgY29kZU1pcnJvckVkaXRvcihjb2RlTWlycm9yKSxcbiAgICAgIGlubGluZWF0dGFjaCA9IG5ldyBpbmxpbmVBdHRhY2htZW50KG9wdGlvbnMsIGVkaXRvciksXG4gICAgICBlbCA9IGNvZGVNaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgZnVuY3Rpb24oZSkge1xuICAgICAgaW5saW5lYXR0YWNoLm9uUGFzdGUoZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oJ29uRHJhZ0V2ZW50JywgZnVuY3Rpb24oZGF0YSwgZSkge1xuICAgICAgaWYgKGUudHlwZSA9PT0gXCJkcm9wXCIpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaW5saW5lYXR0YWNoLm9uRHJvcChlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY29kZU1pcnJvckVkaXRvcjQgPSBmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgIGNvZGVNaXJyb3JFZGl0b3IuY2FsbCh0aGlzLCBpbnN0YW5jZSk7XG4gIH07XG5cbiAgY29kZU1pcnJvckVkaXRvcjQuYXR0YWNoID0gZnVuY3Rpb24oY29kZU1pcnJvciwgb3B0aW9ucykge1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgZWRpdG9yID0gbmV3IGNvZGVNaXJyb3JFZGl0b3IoY29kZU1pcnJvciksXG4gICAgICBpbmxpbmVhdHRhY2ggPSBuZXcgaW5saW5lQXR0YWNobWVudChvcHRpb25zLCBlZGl0b3IpLFxuICAgICAgZWwgPSBjb2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCk7XG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlubGluZWF0dGFjaC5vblBhc3RlKGUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvZGVNaXJyb3Iub24oJ2Ryb3AnLCBmdW5jdGlvbihkYXRhLCBlKSB7XG4gICAgICBpZiAoaW5saW5lYXR0YWNoLm9uRHJvcChlKSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlubGluZUF0dGFjaG1lbnQuZWRpdG9ycy5jb2RlbWlycm9yNCA9IGNvZGVNaXJyb3JFZGl0b3I0O1xuXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50L3NyYy9jb2RlbWlycm9yLTQuaW5saW5lLWF0dGFjaG1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50L3NyYy9jb2RlbWlycm9yLTQuaW5saW5lLWF0dGFjaG1lbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8qanNsaW50IG5ld2NhcDogdHJ1ZSAqL1xuLypnbG9iYWwgWE1MSHR0cFJlcXVlc3Q6IGZhbHNlLCBGb3JtRGF0YTogZmFsc2UgKi9cbi8qXG4gKiBJbmxpbmUgVGV4dCBBdHRhY2htZW50XG4gKlxuICogQXV0aG9yOiBSb3kgdmFuIEthYXRob3ZlblxuICogQ29udGFjdDogaWtAcm95dmFua2FhdGhvdmVuLm5sXG4gKi9cbihmdW5jdGlvbihkb2N1bWVudCwgd2luZG93KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgaW5saW5lQXR0YWNobWVudCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGluc3RhbmNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IGlubGluZUF0dGFjaG1lbnQudXRpbC5tZXJnZShvcHRpb25zLCBpbmxpbmVBdHRhY2htZW50LmRlZmF1bHRzKTtcbiAgICB0aGlzLmVkaXRvciA9IGluc3RhbmNlO1xuICAgIHRoaXMuZmlsZW5hbWVUYWcgPSAne2ZpbGVuYW1lfSc7XG4gICAgdGhpcy5sYXN0VmFsdWUgPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBXaWxsIGhvbGRzIHRoZSBhdmFpbGFibGUgZWRpdG9yc1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgaW5saW5lQXR0YWNobWVudC5lZGl0b3JzID0ge307XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgZnVuY3Rpb25zXG4gICAqL1xuICBpbmxpbmVBdHRhY2htZW50LnV0aWwgPSB7XG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgZnVuY3Rpb24gdG8gbWVyZ2UgdGhlIGdpdmVuIG9iamVjdHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9iamVjdCBNdWx0aXBsZSBvYmplY3QgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IG9ialtrXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBhIGxpbmUgb2YgdGV4dCBhdCB0aGUgYm90dG9tLCBlbnN1cmluZyB0aGVyZSBhcmVuJ3QgdW5uZWNlc3NhcnkgbmV3bGluZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhcHBlbmRlZCBDdXJyZW50IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJldmlvdXMgVmFsdWUgd2hpY2ggc2hvdWxkIGJlIGFwcGVuZGVkIGFmdGVyIHRoZSBjdXJyZW50IGNvbnRlbnRcbiAgICAgKi9cbiAgICBhcHBlbmRJbkl0c093bkxpbmU6IGZ1bmN0aW9uKHByZXZpb3VzLCBhcHBlbmRlZCkge1xuICAgICAgcmV0dXJuIChwcmV2aW91cyArIFwiXFxuXFxuW1tEXV1cIiArIGFwcGVuZGVkKVxuICAgICAgICAucmVwbGFjZSgvKFxcbnsyLH0pXFxbXFxbRFxcXVxcXS8sIFwiXFxuXFxuXCIpXG4gICAgICAgIC5yZXBsYWNlKC9eKFxcbiopLywgXCJcIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIGdpdmVuIHZhbHVlIGF0IHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBvZiB0aGUgdGV4dGFyZWEgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtICB7SHRtbEVsZW1lbnR9IGVsXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSBUZXh0IHdoaWNoIHdpbGwgYmUgaW5zZXJ0ZWQgYXQgdGhlIGN1cnNvciBwb3NpdGlvblxuICAgICAqL1xuICAgIGluc2VydFRleHRBdEN1cnNvcjogZnVuY3Rpb24oZWwsIHRleHQpIHtcbiAgICAgIHZhciBzY3JvbGxQb3MgPSBlbC5zY3JvbGxUb3AsXG4gICAgICAgIHN0clBvcyA9IDAsXG4gICAgICAgIGJyb3dzZXIgPSBmYWxzZSxcbiAgICAgICAgcmFuZ2U7XG5cbiAgICAgIGlmICgoZWwuc2VsZWN0aW9uU3RhcnQgfHwgZWwuc2VsZWN0aW9uU3RhcnQgPT09ICcwJykpIHtcbiAgICAgICAgYnJvd3NlciA9IFwiZmZcIjtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAgIGJyb3dzZXIgPSBcImllXCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChicm93c2VyID09PSBcImllXCIpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtZWwudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgc3RyUG9zID0gcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09IFwiZmZcIikge1xuICAgICAgICBzdHJQb3MgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIH1cblxuICAgICAgdmFyIGZyb250ID0gKGVsLnZhbHVlKS5zdWJzdHJpbmcoMCwgc3RyUG9zKTtcbiAgICAgIHZhciBiYWNrID0gKGVsLnZhbHVlKS5zdWJzdHJpbmcoc3RyUG9zLCBlbC52YWx1ZS5sZW5ndGgpO1xuICAgICAgZWwudmFsdWUgPSBmcm9udCArIHRleHQgKyBiYWNrO1xuICAgICAgc3RyUG9zID0gc3RyUG9zICsgdGV4dC5sZW5ndGg7XG4gICAgICBpZiAoYnJvd3NlciA9PT0gXCJpZVwiKSB7XG4gICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWVsLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgc3RyUG9zKTtcbiAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgMCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImZmXCIpIHtcbiAgICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBzdHJQb3M7XG4gICAgICAgIGVsLnNlbGVjdGlvbkVuZCA9IHN0clBvcztcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGVsLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBpbmxpbmVBdHRhY2htZW50LmRlZmF1bHRzID0ge1xuICAgIC8qKlxuICAgICAqIFVSTCB3aGVyZSB0aGUgZmlsZSB3aWxsIGJlIHNlbmRcbiAgICAgKi9cbiAgICB1cGxvYWRVcmw6ICd1cGxvYWRfYXR0YWNobWVudC5waHAnLFxuXG4gICAgLyoqXG4gICAgICogV2hpY2ggbWV0aG9kIHdpbGwgYmUgdXNlZCB0byBzZW5kIHRoZSBmaWxlIHRvIHRoZSB1cGxvYWQgVVJMXG4gICAgICovXG4gICAgdXBsb2FkTWV0aG9kOiAnUE9TVCcsXG5cbiAgICAvKipcbiAgICAgKiBOYW1lIGluIHdoaWNoIHRoZSBmaWxlIHdpbGwgYmUgcGxhY2VkXG4gICAgICovXG4gICAgdXBsb2FkRmllbGROYW1lOiAnZmlsZScsXG5cbiAgICAvKipcbiAgICAgKiBFeHRlbnNpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHdoZW4gYSBmaWxlIGV4dGVuc2lvbiBjb3VsZCBub3RcbiAgICAgKiBiZSBkZXRlY3RlZFxuICAgICAqL1xuICAgIGRlZmF1bHRFeHRlbnNpb246ICdwbmcnLFxuXG4gICAgLyoqXG4gICAgICogSlNPTiBmaWVsZCB3aGljaCByZWZlcnMgdG8gdGhlIHVwbG9hZGVkIGZpbGUgVVJMXG4gICAgICovXG4gICAganNvbkZpZWxkTmFtZTogJ2ZpbGVuYW1lJyxcblxuICAgIC8qKlxuICAgICAqIEFsbG93ZWQgTUlNRSB0eXBlc1xuICAgICAqL1xuICAgIGFsbG93ZWRUeXBlczogW1xuICAgICAgJ2ltYWdlL2pwZWcnLFxuICAgICAgJ2ltYWdlL3BuZycsXG4gICAgICAnaW1hZ2UvanBnJyxcbiAgICAgICdpbWFnZS9naWYnXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFRleHQgd2hpY2ggd2lsbCBiZSBpbnNlcnRlZCB3aGVuIGRyb3BwaW5nIG9yIHBhc3RpbmcgYSBmaWxlLlxuICAgICAqIEFjdHMgYXMgYSBwbGFjZWhvbGRlciB3aGljaCB3aWxsIGJlIHJlcGxhY2VkIHdoZW4gdGhlIGZpbGUgaXMgZG9uZSB3aXRoIHVwbG9hZGluZ1xuICAgICAqL1xuICAgIHByb2dyZXNzVGV4dDogJyFbVXBsb2FkaW5nIGZpbGUuLi5dKCknLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiBhIGZpbGUgaGFzIHN1Y2Nlc3NmdWxseSBiZWVuIHVwbG9hZGVkIHRoZSBwcm9ncmVzc1RleHRcbiAgICAgKiB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSB1cmxUZXh0LCB0aGUge2ZpbGVuYW1lfSB0YWcgd2lsbCBiZSByZXBsYWNlZFxuICAgICAqIGJ5IHRoZSBmaWxlbmFtZSB0aGF0IGhhcyBiZWVuIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICB1cmxUZXh0OiBcIiFbZmlsZV0oe2ZpbGVuYW1lfSlcIixcblxuICAgIC8qKlxuICAgICAqIFRleHQgd2hpY2ggd2lsbCBiZSB1c2VkIHdoZW4gdXBsb2FkaW5nIGhhcyBmYWlsZWRcbiAgICAgKi9cbiAgICBlcnJvclRleHQ6IFwiRXJyb3IgdXBsb2FkaW5nIGZpbGVcIixcblxuICAgIC8qKlxuICAgICAqIEV4dHJhIHBhcmFtZXRlcnMgd2hpY2ggd2lsbCBiZSBzZW5kIHdoZW4gdXBsb2FkaW5nIGEgZmlsZVxuICAgICAqL1xuICAgIGV4dHJhUGFyYW1zOiB7fSxcblxuICAgIC8qKlxuICAgICAqIEV4dHJhIGhlYWRlcnMgd2hpY2ggd2lsbCBiZSBzZW5kIHdoZW4gdXBsb2FkaW5nIGEgZmlsZVxuICAgICAqL1xuICAgIGV4dHJhSGVhZGVyczoge30sXG5cbiAgICAvKipcbiAgICAgKiBCZWZvcmUgdGhlIGZpbGUgaXMgc2VuZFxuICAgICAqL1xuICAgIGJlZm9yZUZpbGVVcGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHdoZW4gYSBmaWxlIGlzIGRyb3BwZWQgb3IgcGFzdGVkXG4gICAgICovXG4gICAgb25GaWxlUmVjZWl2ZWQ6IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gdXBsb2FkIGhhbmRsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZW4gZmFsc2UgaXMgcmV0dXJuZWQgaXQgd2lsbCBwcmV2ZW50IGRlZmF1bHQgdXBsb2FkIGJlaGF2aW9yXG4gICAgICovXG4gICAgb25GaWxlVXBsb2FkUmVzcG9uc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBlcnJvciBoYW5kbGVyLiBSdW5zIGFmdGVyIHJlbW92aW5nIHRoZSBwbGFjZWhvbGRlciB0ZXh0IGFuZCBiZWZvcmUgdGhlIGFsZXJ0KCkuXG4gICAgICogUmV0dXJuIGZhbHNlIGZyb20gdGhpcyBmdW5jdGlvbiB0byBwcmV2ZW50IHRoZSBhbGVydCBkaWFsb2cuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGVuIGZhbHNlIGlzIHJldHVybmVkIGl0IHdpbGwgcHJldmVudCBkZWZhdWx0IGVycm9yIGJlaGF2aW9yXG4gICAgICovXG4gICAgb25GaWxlVXBsb2FkRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFdoZW4gYSBmaWxlIGhhcyBzdWNjZXNmdWxseSBiZWVuIHVwbG9hZGVkXG4gICAgICovXG4gICAgb25GaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uKCkge31cbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkcyB0aGUgYmxvYlxuICAgKlxuICAgKiBAcGFyYW0gIHtCbG9ifSBmaWxlIGJsb2IgZGF0YSByZWNlaXZlZCBmcm9tIGV2ZW50LmRhdGFUcmFuc2ZlciBvYmplY3RcbiAgICogQHJldHVybiB7WE1MSHR0cFJlcXVlc3R9IHJlcXVlc3Qgb2JqZWN0IHdoaWNoIHNlbmRzIHRoZSBmaWxlXG4gICAqL1xuICBpbmxpbmVBdHRhY2htZW50LnByb3RvdHlwZS51cGxvYWRGaWxlID0gZnVuY3Rpb24oZmlsZSkge1xuICAgIHZhciBtZSA9IHRoaXMsXG4gICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpLFxuICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXG4gICAgICBleHRlbnNpb24gPSBzZXR0aW5ncy5kZWZhdWx0RXh0ZW5zaW9uIHx8IHNldHRpbmdzLmRlZnVhbHRFeHRlbnNpb247XG5cbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnNldHVwRm9ybURhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNldHRpbmdzLnNldHVwRm9ybURhdGEoZm9ybURhdGEsIGZpbGUpO1xuICAgIH1cblxuICAgIC8vIEF0dGFjaCB0aGUgZmlsZS4gSWYgY29taW5nIGZyb20gY2xpcGJvYXJkLCBhZGQgYSBkZWZhdWx0IGZpbGVuYW1lIChvbmx5IHdvcmtzIGluIENocm9tZSBmb3Igbm93KVxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjY2NDk2Ny9ob3ctdG8tZ2l2ZS1hLWJsb2ItdXBsb2FkZWQtYXMtZm9ybWRhdGEtYS1maWxlLW5hbWVcbiAgICBpZiAoZmlsZS5uYW1lKSB7XG4gICAgICB2YXIgZmlsZU5hbWVNYXRjaGVzID0gZmlsZS5uYW1lLm1hdGNoKC9cXC4oLispJC8pO1xuICAgICAgaWYgKGZpbGVOYW1lTWF0Y2hlcykge1xuICAgICAgICBleHRlbnNpb24gPSBmaWxlTmFtZU1hdGNoZXNbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlbW90ZUZpbGVuYW1lID0gXCJpbWFnZS1cIiArIERhdGUubm93KCkgKyBcIi5cIiArIGV4dGVuc2lvbjtcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnJlbW90ZUZpbGVuYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZW1vdGVGaWxlbmFtZSA9IHNldHRpbmdzLnJlbW90ZUZpbGVuYW1lKGZpbGUpO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChzZXR0aW5ncy51cGxvYWRGaWVsZE5hbWUsIGZpbGUsIHJlbW90ZUZpbGVuYW1lKTtcblxuICAgIC8vIEFwcGVuZCB0aGUgZXh0cmEgcGFyYW1ldGVycyB0byB0aGUgZm9ybWRhdGFcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLmV4dHJhUGFyYW1zID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2V0dGluZ3MuZXh0cmFQYXJhbXMpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmV4dHJhUGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBzZXR0aW5ncy5leHRyYVBhcmFtc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vcGVuKCdQT1NUJywgc2V0dGluZ3MudXBsb2FkVXJsKTtcblxuICAgIC8vIEFkZCBhbnkgYXZhaWxhYmxlIGV4dHJhIGhlYWRlcnNcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLmV4dHJhSGVhZGVycyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBmb3IgKHZhciBoZWFkZXIgaW4gc2V0dGluZ3MuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGhlYWRlcikpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHNldHRpbmdzLmV4dHJhSGVhZGVyc1toZWFkZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIEhUVFAgc3RhdHVzIGlzIE9LIG9yIENyZWF0ZWRcbiAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDAgfHwgeGhyLnN0YXR1cyA9PT0gMjAxKSB7XG4gICAgICAgIG1lLm9uRmlsZVVwbG9hZFJlc3BvbnNlKHhocik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZS5vbkZpbGVVcGxvYWRFcnJvcih4aHIpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHNldHRpbmdzLmJlZm9yZUZpbGVVcGxvYWQoeGhyKSAhPT0gZmFsc2UpIHtcbiAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHhocjtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgZ2l2ZW4gZmlsZSBpcyBhbGxvd2VkIHRvIGhhbmRsZVxuICAgKlxuICAgKiBAcGFyYW0ge0ZpbGV9IGNsaXBib2FyZCBkYXRhIGZpbGVcbiAgICovXG4gIGlubGluZUF0dGFjaG1lbnQucHJvdG90eXBlLmlzRmlsZUFsbG93ZWQgPSBmdW5jdGlvbihmaWxlKSB7XG4gICAgaWYgKGZpbGUua2luZCA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dlZFR5cGVzLmluZGV4T2YoJyonKSA9PT0gMCl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuYWxsb3dlZFR5cGVzLmluZGV4T2YoZmlsZS50eXBlKSA+PSAwO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyB1cGxvYWQgcmVzcG9uc2VcbiAgICpcbiAgICogQHBhcmFtICB7WE1MSHR0cFJlcXVlc3R9IHhoclxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cbiAgaW5saW5lQXR0YWNobWVudC5wcm90b3R5cGUub25GaWxlVXBsb2FkUmVzcG9uc2UgPSBmdW5jdGlvbih4aHIpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5vbkZpbGVVcGxvYWRSZXNwb25zZS5jYWxsKHRoaXMsIHhocikgIT09IGZhbHNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSxcbiAgICAgICAgZmlsZW5hbWUgPSByZXN1bHRbdGhpcy5zZXR0aW5ncy5qc29uRmllbGROYW1lXTtcblxuICAgICAgaWYgKHJlc3VsdCAmJiBmaWxlbmFtZSkge1xuICAgICAgICB2YXIgbmV3VmFsdWU7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy51cmxUZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnNldHRpbmdzLnVybFRleHQuY2FsbCh0aGlzLCBmaWxlbmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuc2V0dGluZ3MudXJsVGV4dC5yZXBsYWNlKHRoaXMuZmlsZW5hbWVUYWcsIGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dCA9IHRoaXMuZWRpdG9yLmdldFZhbHVlKCkucmVwbGFjZSh0aGlzLmxhc3RWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRWYWx1ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5vbkZpbGVVcGxvYWRlZC5jYWxsKHRoaXMsIGZpbGVuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBmaWxlIGhhcyBmYWlsZWQgdG8gdXBsb2FkXG4gICAqXG4gICAqIEBwYXJhbSAge1hNTEh0dHBSZXF1ZXN0fSB4aHJcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIGlubGluZUF0dGFjaG1lbnQucHJvdG90eXBlLm9uRmlsZVVwbG9hZEVycm9yID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Mub25GaWxlVXBsb2FkRXJyb3IuY2FsbCh0aGlzLCB4aHIpICE9PSBmYWxzZSkge1xuICAgICAgdmFyIHRleHQgPSB0aGlzLmVkaXRvci5nZXRWYWx1ZSgpLnJlcGxhY2UodGhpcy5sYXN0VmFsdWUsIFwiXCIpO1xuICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGV4dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGZpbGUgaGFzIGJlZW4gaW5zZXJ0ZWQsIGVpdGhlciBieSBkcm9wIG9yIHBhc3RlXG4gICAqXG4gICAqIEBwYXJhbSAge0ZpbGV9IGZpbGVcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIGlubGluZUF0dGFjaG1lbnQucHJvdG90eXBlLm9uRmlsZUluc2VydGVkID0gZnVuY3Rpb24oZmlsZSkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLm9uRmlsZVJlY2VpdmVkLmNhbGwodGhpcywgZmlsZSkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxhc3RWYWx1ZSA9IHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NUZXh0O1xuICAgICAgdGhpcy5lZGl0b3IuaW5zZXJ0VmFsdWUodGhpcy5sYXN0VmFsdWUpO1xuICAgIH1cbiAgfTtcblxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIHBhc3RlIGV2ZW50IG9jY3VyZWRcbiAgICogQHBhcmFtICB7RXZlbnR9IGVcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gaWYgdGhlIGV2ZW50IHdhcyBoYW5kbGVkXG4gICAqL1xuICBpbmxpbmVBdHRhY2htZW50LnByb3RvdHlwZS5vblBhc3RlID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciByZXN1bHQgPSBmYWxzZSxcbiAgICAgIGNsaXBib2FyZERhdGEgPSBlLmNsaXBib2FyZERhdGEsXG4gICAgICBpdGVtcztcblxuICAgIGlmICh0eXBlb2YgY2xpcGJvYXJkRGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaXRlbXMgPSBjbGlwYm9hcmREYXRhLml0ZW1zIHx8IGNsaXBib2FyZERhdGEuZmlsZXMgfHwgW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgaWYgKHRoaXMuaXNGaWxlQWxsb3dlZChpdGVtKSkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5vbkZpbGVJbnNlcnRlZChpdGVtLmdldEFzRmlsZSgpKTtcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaXRlbS5nZXRBc0ZpbGUoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0KSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcm9wIGV2ZW50IG9jY3VyZXNcbiAgICogQHBhcmFtICB7RXZlbnR9IGVcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gaWYgdGhlIGV2ZW50IHdhcyBoYW5kbGVkXG4gICAqL1xuICBpbmxpbmVBdHRhY2htZW50LnByb3RvdHlwZS5vbkRyb3AgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbaV07XG4gICAgICBpZiAodGhpcy5pc0ZpbGVBbGxvd2VkKGZpbGUpKSB7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMub25GaWxlSW5zZXJ0ZWQoZmlsZSk7XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZShmaWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHdpbmRvdy5pbmxpbmVBdHRhY2htZW50ID0gaW5saW5lQXR0YWNobWVudDtcblxufSkoZG9jdW1lbnQsIHdpbmRvdyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pbmxpbmUtYXR0YWNobWVudC9zcmMvaW5saW5lLWF0dGFjaG1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2lubGluZS1hdHRhY2htZW50L3NyYy9pbmxpbmUtYXR0YWNobWVudC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLypqc2xpbnQgbmV3Y2FwOiB0cnVlICovXG4vKmdsb2JhbCBpbmxpbmVBdHRhY2htZW50OiBmYWxzZSwgalF1ZXJ5OiBmYWxzZSAqL1xuLyoqXG4gKiBqUXVlcnkgcGx1Z2luIGZvciBpbmxpbmUgYXR0YWNoXG4gKlxuICogQHBhcmFtIHtkb2N1bWVudH0gZG9jdW1lbnRcbiAqIEBwYXJhbSB7d2luZG93fSB3aW5kb3dcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkXG4gKi9cbihmdW5jdGlvbihkb2N1bWVudCwgd2luZG93LCAkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpbmxpbmVBdHRhY2htZW50LmVkaXRvcnMuanF1ZXJ5ID0ge307XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZWRpdG9yIHVzaW5nIGpRdWVyeVxuICAgKi9cbiAgdmFyIGVkaXRvciA9IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG5cbiAgICB2YXIgJHRoaXMgPSAkKGluc3RhbmNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkdGhpcy52YWwoKTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRWYWx1ZTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlubGluZUF0dGFjaG1lbnQudXRpbC5pbnNlcnRUZXh0QXRDdXJzb3IoJHRoaXNbMF0sIHZhbCk7XG4gICAgICB9LFxuICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAkdGhpcy52YWwodmFsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gICQuZm4uaW5saW5lYXR0YWNobWVudCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgIHZhciBzZXQgPSAkKHRoaXMpO1xuXG4gICAgc2V0LmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGVkID0gbmV3IGVkaXRvcigkdGhpcyksXG4gICAgICAgIGlubGluZWF0dGFjaCA9IG5ldyBpbmxpbmVBdHRhY2htZW50KG9wdGlvbnMsIGVkKTtcblxuICAgICAgJHRoaXMuYmluZCh7XG4gICAgICAgICdwYXN0ZSc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpbmxpbmVhdHRhY2gub25QYXN0ZShlLm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICB9LFxuICAgICAgICAnZHJvcCc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpbmxpbmVhdHRhY2gub25Ecm9wKGUub3JpZ2luYWxFdmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgICdkcmFnZW50ZXIgZHJhZ292ZXInOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgaW5saW5lQXR0YWNobWVudC5lZGl0b3JzLmpxdWVyeS5FZGl0b3IgPSBlZGl0b3I7XG5cbn0pKGRvY3VtZW50LCB3aW5kb3csIGpRdWVyeSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW5saW5lLWF0dGFjaG1lbnQvc3JjL2pxdWVyeS5pbmxpbmUtYXR0YWNobWVudC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaW5saW5lLWF0dGFjaG1lbnQvc3JjL2pxdWVyeS5pbmxpbmUtYXR0YWNobWVudC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLyoqXG4gKiBtYXJrZWQgLSBhIG1hcmtkb3duIHBhcnNlclxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTQsIENocmlzdG9waGVyIEplZmZyZXkuIChNSVQgTGljZW5zZWQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWFya2VkanMvbWFya2VkXG4gKi9cblxuOyhmdW5jdGlvbihyb290KSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQmxvY2stTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBibG9jayA9IHtcbiAgbmV3bGluZTogL15cXG4rLyxcbiAgY29kZTogL14oIHs0fVteXFxuXStcXG4qKSsvLFxuICBmZW5jZXM6IG5vb3AsXG4gIGhyOiAvXiB7MCwzfSgoPzotICopezMsfXwoPzpfICopezMsfXwoPzpcXCogKil7Myx9KSg/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXiAqKCN7MSw2fSkgKihbXlxcbl0rPykgKiMqICooPzpcXG4rfCQpLyxcbiAgbnB0YWJsZTogbm9vcCxcbiAgYmxvY2txdW90ZTogL14oIHswLDN9PiA/KHBhcmFncmFwaHxbXlxcbl0qKSg/OlxcbnwkKSkrLyxcbiAgbGlzdDogL14oICopKGJ1bGwpIFtcXHNcXFNdKz8oPzpocnxkZWZ8XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudCAqKD86XFxufFxccyokKXxjbG9zZWQgKig/OlxcbnsyLH18XFxzKiQpfGNsb3NpbmcgKig/OlxcbnsyLH18XFxzKiQpKS8sXG4gIGRlZjogL14gezAsM31cXFsobGFiZWwpXFxdOiAqXFxuPyAqPD8oW15cXHM+XSspPj8oPzooPzogK1xcbj8gKnwgKlxcbiAqKSh0aXRsZSkpPyAqKD86XFxuK3wkKS8sXG4gIHRhYmxlOiBub29wLFxuICBsaGVhZGluZzogL14oW15cXG5dKylcXG4gKig9fC0pezIsfSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14oW15cXG5dKyg/Olxcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfCB7MCwzfT58dGFnKVteXFxuXSspKykvLFxuICB0ZXh0OiAvXlteXFxuXSsvXG59O1xuXG5ibG9jay5fbGFiZWwgPSAvKD86XFxcXFtcXFtcXF1dfFteXFxbXFxdXSkrLztcbmJsb2NrLl90aXRsZSA9IC8oPzpcIig/OlxcXFxcInxbXlwiXXxcIlteXCJcXG5dKlwiKSpcInwnXFxuPyg/OlteJ1xcbl0rXFxuPykqJ3xcXChbXigpXSpcXCkpLztcbmJsb2NrLmRlZiA9IGVkaXQoYmxvY2suZGVmKVxuICAucmVwbGFjZSgnbGFiZWwnLCBibG9jay5fbGFiZWwpXG4gIC5yZXBsYWNlKCd0aXRsZScsIGJsb2NrLl90aXRsZSlcbiAgLmdldFJlZ2V4KCk7XG5cbmJsb2NrLmJ1bGxldCA9IC8oPzpbKistXXxcXGQrXFwuKS87XG5ibG9jay5pdGVtID0gL14oICopKGJ1bGwpIFteXFxuXSooPzpcXG4oPyFcXDFidWxsIClbXlxcbl0qKSovO1xuYmxvY2suaXRlbSA9IGVkaXQoYmxvY2suaXRlbSwgJ2dtJylcbiAgLnJlcGxhY2UoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAuZ2V0UmVnZXgoKTtcblxuYmxvY2subGlzdCA9IGVkaXQoYmxvY2subGlzdClcbiAgLnJlcGxhY2UoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAucmVwbGFjZSgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86KD86LSAqKXszLH18KD86XyAqKXszLH18KD86XFxcXCogKil7Myx9KSg/OlxcXFxuK3wkKSknKVxuICAucmVwbGFjZSgnZGVmJywgJ1xcXFxuKyg/PScgKyBibG9jay5kZWYuc291cmNlICsgJyknKVxuICAuZ2V0UmVnZXgoKTtcblxuYmxvY2suX3RhZyA9ICcoPyEoPzonXG4gICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlJ1xuICArICd8dmFyfHNhbXB8a2JkfHN1YnxzdXB8aXxifHV8bWFya3xydWJ5fHJ0fHJwfGJkaXxiZG8nXG4gICsgJ3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZylcXFxcYilcXFxcdysoPyE6fFteXFxcXHdcXFxcc0BdKkApXFxcXGInO1xuXG5ibG9jay5odG1sID0gZWRpdChibG9jay5odG1sKVxuICAucmVwbGFjZSgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gIC5yZXBsYWNlKCdjbG9zZWQnLCAvPCh0YWcpW1xcc1xcU10rPzxcXC9cXDE+LylcbiAgLnJlcGxhY2UoJ2Nsb3NpbmcnLCAvPHRhZyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xcXHNbXidcIlxcLz5cXHNdKikqP1xcLz8+LylcbiAgLnJlcGxhY2UoL3RhZy9nLCBibG9jay5fdGFnKVxuICAuZ2V0UmVnZXgoKTtcblxuYmxvY2sucGFyYWdyYXBoID0gZWRpdChibG9jay5wYXJhZ3JhcGgpXG4gIC5yZXBsYWNlKCdocicsIGJsb2NrLmhyKVxuICAucmVwbGFjZSgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gIC5yZXBsYWNlKCdsaGVhZGluZycsIGJsb2NrLmxoZWFkaW5nKVxuICAucmVwbGFjZSgndGFnJywgJzwnICsgYmxvY2suX3RhZylcbiAgLmdldFJlZ2V4KCk7XG5cbmJsb2NrLmJsb2NrcXVvdGUgPSBlZGl0KGJsb2NrLmJsb2NrcXVvdGUpXG4gIC5yZXBsYWNlKCdwYXJhZ3JhcGgnLCBibG9jay5wYXJhZ3JhcGgpXG4gIC5nZXRSZWdleCgpO1xuXG4vKipcbiAqIE5vcm1hbCBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2subm9ybWFsID0gbWVyZ2Uoe30sIGJsb2NrKTtcblxuLyoqXG4gKiBHRk0gQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLmdmbSA9IG1lcmdlKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgZmVuY2VzOiAvXiAqKGB7Myx9fH57Myx9KVsgXFwuXSooXFxTKyk/ICpcXG4oW1xcc1xcU10qPylcXG4/ICpcXDEgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IC9eLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICsoW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gZWRpdChibG9jay5wYXJhZ3JhcGgpXG4gIC5yZXBsYWNlKCcoPyEnLCAnKD8hJ1xuICAgICsgYmxvY2suZ2ZtLmZlbmNlcy5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDInKSArICd8J1xuICAgICsgYmxvY2subGlzdC5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDMnKSArICd8JylcbiAgLmdldFJlZ2V4KCk7XG5cbi8qKlxuICogR0ZNICsgVGFibGVzIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay50YWJsZXMgPSBtZXJnZSh7fSwgYmxvY2suZ2ZtLCB7XG4gIG5wdGFibGU6IC9eICooXFxTLipcXHwuKilcXG4gKihbLTpdKyAqXFx8Wy18IDpdKilcXG4oKD86LipcXHwuKig/OlxcbnwkKSkqKVxcbiovLFxuICB0YWJsZTogL14gKlxcfCguKylcXG4gKlxcfCggKlstOl0rWy18IDpdKilcXG4oKD86ICpcXHwuKig/OlxcbnwkKSkqKVxcbiovXG59KTtcblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG5cbmZ1bmN0aW9uIExleGVyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbnMubGlua3MgPSB7fTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMucnVsZXMgPSBibG9jay5ub3JtYWw7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhYmxlcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLnRhYmxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLmdmbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgQmxvY2sgUnVsZXNcbiAqL1xuXG5MZXhlci5ydWxlcyA9IGJsb2NrO1xuXG4vKipcbiAqIFN0YXRpYyBMZXggTWV0aG9kXG4gKi9cblxuTGV4ZXIubGV4ID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zKSB7XG4gIHZhciBsZXhlciA9IG5ldyBMZXhlcihvcHRpb25zKTtcbiAgcmV0dXJuIGxleGVyLmxleChzcmMpO1xufTtcblxuLyoqXG4gKiBQcmVwcm9jZXNzaW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLmxleCA9IGZ1bmN0aW9uKHNyYykge1xuICBzcmMgPSBzcmNcbiAgICAucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFx0L2csICcgICAgJylcbiAgICAucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xcdTI0MjQvZywgJ1xcbicpO1xuXG4gIHJldHVybiB0aGlzLnRva2VuKHNyYywgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIExleGluZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS50b2tlbiA9IGZ1bmN0aW9uKHNyYywgdG9wKSB7XG4gIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJyk7XG4gIHZhciBuZXh0LFxuICAgICAgbG9vc2UsXG4gICAgICBjYXAsXG4gICAgICBidWxsLFxuICAgICAgYixcbiAgICAgIGl0ZW0sXG4gICAgICBzcGFjZSxcbiAgICAgIGksXG4gICAgICB0YWcsXG4gICAgICBsLFxuICAgICAgaXNvcmRlcmVkO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXSB8fCAnJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaHInXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJsb2NrcXVvdGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ibG9ja3F1b3RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eICo+ID8vZ20sICcnKTtcblxuICAgICAgLy8gUGFzcyBgdG9wYCB0byBrZWVwIHRoZSBjdXJyZW50XG4gICAgICAvLyBcInRvcGxldmVsXCIgc3RhdGUuIFRoaXMgaXMgZXhhY3RseVxuICAgICAgLy8gaG93IG1hcmtkb3duLnBsIHdvcmtzLlxuICAgICAgdGhpcy50b2tlbihjYXAsIHRvcCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlzdFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpc3QuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgYnVsbCA9IGNhcFsyXTtcbiAgICAgIGlzb3JkZXJlZCA9IGJ1bGwubGVuZ3RoID4gMTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X3N0YXJ0JyxcbiAgICAgICAgb3JkZXJlZDogaXNvcmRlcmVkLFxuICAgICAgICBzdGFydDogaXNvcmRlcmVkID8gK2J1bGwgOiAnJ1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbGlzdF9pdGVtX2VuZCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHRtbFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmh0bWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gJ3BhcmFncmFwaCdcbiAgICAgICAgICA6ICdodG1sJyxcbiAgICAgICAgcHJlOiAhdGhpcy5vcHRpb25zLnNhbml0aXplclxuICAgICAgICAgICYmIChjYXBbMV0gPT09ICdwcmUnIHx8IGNhcFsxXSA9PT0gJ3NjcmlwdCcgfHwgY2FwWzFdID09PSAnc3R5bGUnKSxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzNdKSBjYXBbM10gPSBjYXBbM10uc3Vic3RyaW5nKDEsIGNhcFszXS5sZW5ndGggLSAxKTtcbiAgICAgIHRhZyA9IGNhcFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCF0aGlzLnRva2Vucy5saW5rc1t0YWddKSB7XG4gICAgICAgIHRoaXMudG9rZW5zLmxpbmtzW3RhZ10gPSB7XG4gICAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzJdID09PSAnPScgPyAxIDogMixcbiAgICAgICAgdGV4dDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvLFxuICBhdXRvbGluazogL148KHNjaGVtZTpbXlxcc1xceDAwLVxceDFmPD5dKnxlbWFpbCk+LyxcbiAgdXJsOiBub29wLFxuICB0YWc6IC9ePCEtLVtcXHNcXFNdKj8tLT58XjxcXC8/W2EtekEtWjAtOVxcLV0rKD86XCJbXlwiXSpcInwnW14nXSonfFxcc1tePCdcIj5cXC9cXHNdKikqP1xcLz8+LyxcbiAgbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFwoaHJlZlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICBub2xpbms6IC9eIT9cXFsoKD86XFxbW15cXFtcXF1dKlxcXXxcXFxcW1xcW1xcXV18W15cXFtcXF1dKSopXFxdLyxcbiAgc3Ryb25nOiAvXl9fKFtcXHNcXFNdKz8pX18oPyFfKXxeXFwqXFwqKFtcXHNcXFNdKz8pXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXl8oW15cXHNfXSg/OlteX118X18pKz9bXlxcc19dKV9cXGJ8XlxcKigoPzpcXCpcXCp8W14qXSkrPylcXCooPyFcXCopLyxcbiAgY29kZTogL14oYCspXFxzKihbXFxzXFxTXSo/W15gXT8pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtgKl18XFxiX3wgezIsfVxcbnwkKS9cbn07XG5cbmlubGluZS5fc2NoZW1lID0gL1thLXpBLVpdW2EtekEtWjAtOSsuLV17MSwzMX0vO1xuaW5saW5lLl9lbWFpbCA9IC9bYS16QS1aMC05LiEjJCUmJyorLz0/Xl9ge3x9fi1dKyhAKVthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykrKD8hWy1fXSkvO1xuXG5pbmxpbmUuYXV0b2xpbmsgPSBlZGl0KGlubGluZS5hdXRvbGluaylcbiAgLnJlcGxhY2UoJ3NjaGVtZScsIGlubGluZS5fc2NoZW1lKVxuICAucmVwbGFjZSgnZW1haWwnLCBpbmxpbmUuX2VtYWlsKVxuICAuZ2V0UmVnZXgoKVxuXG5pbmxpbmUuX2luc2lkZSA9IC8oPzpcXFtbXlxcW1xcXV0qXFxdfFxcXFxbXFxbXFxdXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gZWRpdChpbmxpbmUubGluaylcbiAgLnJlcGxhY2UoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAucmVwbGFjZSgnaHJlZicsIGlubGluZS5faHJlZilcbiAgLmdldFJlZ2V4KCk7XG5cbmlubGluZS5yZWZsaW5rID0gZWRpdChpbmxpbmUucmVmbGluaylcbiAgLnJlcGxhY2UoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAuZ2V0UmVnZXgoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiBlZGl0KGlubGluZS5lc2NhcGUpLnJlcGxhY2UoJ10pJywgJ358XSknKS5nZXRSZWdleCgpLFxuICB1cmw6IGVkaXQoL14oKD86ZnRwfGh0dHBzPyk6XFwvXFwvfHd3d1xcLikoPzpbYS16QS1aMC05XFwtXStcXC4/KStbXlxcczxdKnxeZW1haWwvKVxuICAgIC5yZXBsYWNlKCdlbWFpbCcsIGlubGluZS5fZW1haWwpXG4gICAgLmdldFJlZ2V4KCksXG4gIF9iYWNrcGVkYWw6IC8oPzpbXj8hLiw6OypffigpJl0rfFxcKFteKV0qXFwpfCYoPyFbYS16QS1aMC05XSs7JCl8Wz8hLiw6OypffildKyg/ISQpKSsvLFxuICBkZWw6IC9efn4oPz1cXFMpKFtcXHNcXFNdKj9cXFMpfn4vLFxuICB0ZXh0OiBlZGl0KGlubGluZS50ZXh0KVxuICAgIC5yZXBsYWNlKCddfCcsICd+XXwnKVxuICAgIC5yZXBsYWNlKCd8JywgJ3xodHRwcz86Ly98ZnRwOi8vfHd3d1xcXFwufFthLXpBLVowLTkuISMkJSZcXCcqKy89P15fYHtcXFxcfH1+LV0rQHwnKVxuICAgIC5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBtZXJnZSh7fSwgaW5saW5lLmdmbSwge1xuICBicjogZWRpdChpbmxpbmUuYnIpLnJlcGxhY2UoJ3syLH0nLCAnKicpLmdldFJlZ2V4KCksXG4gIHRleHQ6IGVkaXQoaW5saW5lLmdmbS50ZXh0KS5yZXBsYWNlKCd7Mix9JywgJyonKS5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcigpO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgaWYgKCF0aGlzLmxpbmtzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUb2tlbnMgYXJyYXkgcmVxdWlyZXMgYSBgbGlua3NgIHByb3BlcnR5LicpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5icmVha3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuZ2ZtO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICB0aGlzLnJ1bGVzID0gaW5saW5lLnBlZGFudGljO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIElubGluZSBSdWxlc1xuICovXG5cbklubGluZUxleGVyLnJ1bGVzID0gaW5saW5lO1xuXG4vKipcbiAqIFN0YXRpYyBMZXhpbmcvQ29tcGlsaW5nIE1ldGhvZFxuICovXG5cbklubGluZUxleGVyLm91dHB1dCA9IGZ1bmN0aW9uKHNyYywgbGlua3MsIG9wdGlvbnMpIHtcbiAgdmFyIGlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucyk7XG4gIHJldHVybiBpbmxpbmUub3V0cHV0KHNyYyk7XG59O1xuXG4vKipcbiAqIExleGluZy9Db21waWxpbmdcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHZhciBvdXQgPSAnJyxcbiAgICAgIGxpbmssXG4gICAgICB0ZXh0LFxuICAgICAgaHJlZixcbiAgICAgIGNhcDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gZXNjYXBlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZXNjYXBlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBjYXBbMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmF1dG9saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMl0gPT09ICdAJykge1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKHRoaXMubWFuZ2xlKGNhcFsxXSkpO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgY2FwWzBdID0gdGhpcy5ydWxlcy5fYmFja3BlZGFsLmV4ZWMoY2FwWzBdKVswXTtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMF0pO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzBdKTtcbiAgICAgICAgaWYgKGNhcFsxXSA9PT0gJ3d3dy4nKSB7XG4gICAgICAgICAgaHJlZiA9ICdodHRwOi8vJyArIHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50YWcuZXhlYyhzcmMpKSB7XG4gICAgICBpZiAoIXRoaXMuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgID8gdGhpcy5vcHRpb25zLnNhbml0aXplclxuICAgICAgICAgID8gdGhpcy5vcHRpb25zLnNhbml0aXplcihjYXBbMF0pXG4gICAgICAgICAgOiBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIHtcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyByZWZsaW5rLCBub2xpbmtcbiAgICBpZiAoKGNhcCA9IHRoaXMucnVsZXMucmVmbGluay5leGVjKHNyYykpXG4gICAgICAgIHx8IChjYXAgPSB0aGlzLnJ1bGVzLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gdGhpcy5saW5rc1tsaW5rLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKCFsaW5rIHx8ICFsaW5rLmhyZWYpIHtcbiAgICAgICAgb3V0ICs9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHNyYyA9IGNhcFswXS5zdWJzdHJpbmcoMSkgKyBzcmM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIGxpbmspO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHN0cm9uZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnN0cm9uZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5zdHJvbmcodGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZW1cbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lbS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5lbSh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5jb2Rlc3Bhbihlc2NhcGUoY2FwWzJdLnRyaW0oKSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnRleHQoZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29tcGlsZSBMaW5rXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dExpbmsgPSBmdW5jdGlvbihjYXAsIGxpbmspIHtcbiAgdmFyIGhyZWYgPSBlc2NhcGUobGluay5ocmVmKSxcbiAgICAgIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0tL2csICdcXHUyMDE0JylcbiAgICAvLyBlbi1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTMnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMubWFuZ2xlKSByZXR1cm4gdGV4dDtcbiAgdmFyIG91dCA9ICcnLFxuICAgICAgbCA9IHRleHQubGVuZ3RoLFxuICAgICAgaSA9IDAsXG4gICAgICBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCwgc3RhcnQpIHtcbiAgdmFyIHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCcsXG4gICAgICBzdGFydGF0dCA9IChvcmRlcmVkICYmIHN0YXJ0ICE9PSAxKSA/ICgnIHN0YXJ0PVwiJyArIHN0YXJ0ICsgJ1wiJykgOiAnJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyBzdGFydGF0dCArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8cD4nICsgdGV4dCArICc8L3A+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZSA9IGZ1bmN0aW9uKGhlYWRlciwgYm9keSkge1xuICByZXR1cm4gJzx0YWJsZT5cXG4nXG4gICAgKyAnPHRoZWFkPlxcbidcbiAgICArIGhlYWRlclxuICAgICsgJzwvdGhlYWQ+XFxuJ1xuICAgICsgJzx0Ym9keT5cXG4nXG4gICAgKyBib2R5XG4gICAgKyAnPC90Ym9keT5cXG4nXG4gICAgKyAnPC90YWJsZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlcm93ID0gZnVuY3Rpb24oY29udGVudCkge1xuICByZXR1cm4gJzx0cj5cXG4nICsgY29udGVudCArICc8L3RyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVjZWxsID0gZnVuY3Rpb24oY29udGVudCwgZmxhZ3MpIHtcbiAgdmFyIHR5cGUgPSBmbGFncy5oZWFkZXIgPyAndGgnIDogJ3RkJztcbiAgdmFyIHRhZyA9IGZsYWdzLmFsaWduXG4gICAgPyAnPCcgKyB0eXBlICsgJyBzdHlsZT1cInRleHQtYWxpZ246JyArIGZsYWdzLmFsaWduICsgJ1wiPidcbiAgICA6ICc8JyArIHR5cGUgKyAnPic7XG4gIHJldHVybiB0YWcgKyBjb250ZW50ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG4vLyBzcGFuIGxldmVsIHJlbmRlcmVyXG5SZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxzdHJvbmc+JyArIHRleHQgKyAnPC9zdHJvbmc+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5lbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGVzcGFuID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxjb2RlPicgKyB0ZXh0ICsgJzwvY29kZT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGJyLz4nIDogJzxicj4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmRlbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZGVsPicgKyB0ZXh0ICsgJzwvZGVsPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUoaHJlZikpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdzpdL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZignZGF0YTonKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICB9XG4gIGlmICh0aGlzLm9wdGlvbnMuYmFzZVVybCAmJiAhb3JpZ2luSW5kZXBlbmRlbnRVcmwudGVzdChocmVmKSkge1xuICAgIGhyZWYgPSByZXNvbHZlVXJsKHRoaXMub3B0aW9ucy5iYXNlVXJsLCBocmVmKTtcbiAgfVxuICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuYmFzZVVybCAmJiAhb3JpZ2luSW5kZXBlbmRlbnRVcmwudGVzdChocmVmKSkge1xuICAgIGhyZWYgPSByZXNvbHZlVXJsKHRoaXMub3B0aW9ucy5iYXNlVXJsLCBocmVmKTtcbiAgfVxuICB2YXIgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIFRleHRSZW5kZXJlclxuICogcmV0dXJucyBvbmx5IHRoZSB0ZXh0dWFsIHBhcnQgb2YgdGhlIHRva2VuXG4gKi9cblxuZnVuY3Rpb24gVGV4dFJlbmRlcmVyKCkge31cblxuLy8gbm8gbmVlZCBmb3IgYmxvY2sgbGV2ZWwgcmVuZGVyZXJzXG5cblRleHRSZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID1cblRleHRSZW5kZXJlci5wcm90b3R5cGUuZW0gPVxuVGV4dFJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9XG5UZXh0UmVuZGVyZXIucHJvdG90eXBlLmRlbCA9XG5UZXh0UmVuZGVyZXIucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICByZXR1cm4gdGV4dDtcbn1cblxuVGV4dFJlbmRlcmVyLnByb3RvdHlwZS5saW5rID1cblRleHRSZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICByZXR1cm4gJycgKyB0ZXh0O1xufVxuXG5UZXh0UmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQYXJzaW5nICYgQ29tcGlsaW5nXG4gKi9cblxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbiA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyKCk7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbn1cblxuLyoqXG4gKiBTdGF0aWMgUGFyc2UgTWV0aG9kXG4gKi9cblxuUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zKSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMpO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKHNyYyk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExvb3BcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIHRoaXMuaW5saW5lID0gbmV3IElubGluZUxleGVyKHNyYy5saW5rcywgdGhpcy5vcHRpb25zKTtcbiAgLy8gdXNlIGFuIElubGluZUxleGVyIHdpdGggYSBUZXh0UmVuZGVyZXIgdG8gZXh0cmFjdCBwdXJlIHRleHRcbiAgdGhpcy5pbmxpbmVUZXh0ID0gbmV3IElubGluZUxleGVyKFxuICAgIHNyYy5saW5rcyxcbiAgICBtZXJnZSh7fSwgdGhpcy5vcHRpb25zLCB7cmVuZGVyZXI6IG5ldyBUZXh0UmVuZGVyZXIoKX0pXG4gICk7XG4gIHRoaXMudG9rZW5zID0gc3JjLnJldmVyc2UoKTtcblxuICB2YXIgb3V0ID0gJyc7XG4gIHdoaWxlICh0aGlzLm5leHQoKSkge1xuICAgIG91dCArPSB0aGlzLnRvaygpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbiA9IHRoaXMudG9rZW5zLnBvcCgpO1xufTtcblxuLyoqXG4gKiBQcmV2aWV3IE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aCAtIDFdIHx8IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlIFRleHQgVG9rZW5zXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHkgPSB0aGlzLnRva2VuLnRleHQ7XG5cbiAgd2hpbGUgKHRoaXMucGVlaygpLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGJvZHkgKz0gJ1xcbicgKyB0aGlzLm5leHQoKS50ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuaW5saW5lLm91dHB1dChib2R5KTtcbn07XG5cbi8qKlxuICogUGFyc2UgQ3VycmVudCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUudG9rID0gZnVuY3Rpb24oKSB7XG4gIHN3aXRjaCAodGhpcy50b2tlbi50eXBlKSB7XG4gICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNhc2UgJ2hyJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICB9XG4gICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpLFxuICAgICAgICB0aGlzLnRva2VuLmRlcHRoLFxuICAgICAgICB1bmVzY2FwZSh0aGlzLmlubGluZVRleHQub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpKTtcbiAgICB9XG4gICAgY2FzZSAnY29kZSc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNvZGUodGhpcy50b2tlbi50ZXh0LFxuICAgICAgICB0aGlzLnRva2VuLmxhbmcsXG4gICAgICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgfVxuICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgdmFyIGhlYWRlciA9ICcnLFxuICAgICAgICAgIGJvZHkgPSAnJyxcbiAgICAgICAgICBpLFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjZWxsLFxuICAgICAgICAgIGo7XG5cbiAgICAgIC8vIGhlYWRlclxuICAgICAgY2VsbCA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG5cbiAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dChyb3dbal0pLFxuICAgICAgICAgICAgeyBoZWFkZXI6IGZhbHNlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltqXSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnRhYmxlKGhlYWRlciwgYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgICBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnYmxvY2txdW90ZV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9zdGFydCc6IHtcbiAgICAgIGJvZHkgPSAnJztcbiAgICAgIHZhciBvcmRlcmVkID0gdGhpcy50b2tlbi5vcmRlcmVkLFxuICAgICAgICAgIHN0YXJ0ID0gdGhpcy50b2tlbi5zdGFydDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQsIHN0YXJ0KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9pdGVtX3N0YXJ0Jzoge1xuICAgICAgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2h0bWwnOiB7XG4gICAgICB2YXIgaHRtbCA9ICF0aGlzLnRva2VuLnByZSAmJiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgID8gdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dClcbiAgICAgICAgOiB0aGlzLnRva2VuLnRleHQ7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5odG1sKGh0bWwpO1xuICAgIH1cbiAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VUZXh0KCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGh0bWwsIGVuY29kZSkge1xuICByZXR1cm4gaHRtbFxuICAgIC5yZXBsYWNlKCFlbmNvZGUgPyAvJig/ISM/XFx3KzspL2cgOiAvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZShodG1sKSB7XG4gIC8vIGV4cGxpY2l0bHkgbWF0Y2ggZGVjaW1hbCwgaGV4LCBhbmQgbmFtZWQgSFRNTCBlbnRpdGllc1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKCMoPzpcXGQrKXwoPzojeFswLTlBLUZhLWZdKyl8KD86XFx3KykpOz8vaWcsIGZ1bmN0aW9uKF8sIG4pIHtcbiAgICBuID0gbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuID09PSAnY29sb24nKSByZXR1cm4gJzonO1xuICAgIGlmIChuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gbi5jaGFyQXQoMSkgPT09ICd4J1xuICAgICAgICA/IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobi5zdWJzdHJpbmcoMiksIDE2KSlcbiAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKCtuLnN1YnN0cmluZygxKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXQocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICByZXR1cm4ge1xuICAgIHJlcGxhY2U6IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgICAgdmFsID0gdmFsLnNvdXJjZSB8fCB2YWw7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBnZXRSZWdleDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZSwgaHJlZikge1xuICBpZiAoIWJhc2VVcmxzWycgJyArIGJhc2VdKSB7XG4gICAgLy8gd2UgY2FuIGlnbm9yZSBldmVyeXRoaW5nIGluIGJhc2UgYWZ0ZXIgdGhlIGxhc3Qgc2xhc2ggb2YgaXRzIHBhdGggY29tcG9uZW50LFxuICAgIC8vIGJ1dCB3ZSBtaWdodCBuZWVkIHRvIGFkZCBfdGhhdF9cbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTNcbiAgICBpZiAoL15bXjpdKzpcXC8qW14vXSokLy50ZXN0KGJhc2UpKSB7XG4gICAgICBiYXNlVXJsc1snICcgKyBiYXNlXSA9IGJhc2UgKyAnLyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2VVcmxzWycgJyArIGJhc2VdID0gYmFzZS5yZXBsYWNlKC9bXi9dKiQvLCAnJyk7XG4gICAgfVxuICB9XG4gIGJhc2UgPSBiYXNlVXJsc1snICcgKyBiYXNlXTtcblxuICBpZiAoaHJlZi5zbGljZSgwLCAyKSA9PT0gJy8vJykge1xuICAgIHJldHVybiBiYXNlLnJlcGxhY2UoLzpbXFxzXFxTXSovLCAnOicpICsgaHJlZjtcbiAgfSBlbHNlIGlmIChocmVmLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvKDpcXC8qW14vXSopW1xcc1xcU10qLywgJyQxJykgKyBocmVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlICsgaHJlZjtcbiAgfVxufVxudmFyIGJhc2VVcmxzID0ge307XG52YXIgb3JpZ2luSW5kZXBlbmRlbnRVcmwgPSAvXiR8XlthLXpdW2EtejAtOSsuLV0qOnxeWz8jXS9pO1xuXG5mdW5jdGlvbiBub29wKCkge31cbm5vb3AuZXhlYyA9IG5vb3A7XG5cbmZ1bmN0aW9uIG1lcmdlKG9iaikge1xuICB2YXIgaSA9IDEsXG4gICAgICB0YXJnZXQsXG4gICAgICBrZXk7XG5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IHRhcmdldFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTWFya2VkXG4gKi9cblxuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICAvLyB0aHJvdyBlcnJvciBpbiBjYXNlIG9mIG5vbiBzdHJpbmcgaW5wdXRcbiAgaWYgKHR5cGVvZiBzcmMgPT09ICd1bmRlZmluZWQnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyB1bmRlZmluZWQgb3IgbnVsbCcpO1xuICB9XG4gIGlmICh0eXBlb2Ygc3JjICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyBvZiB0eXBlICdcbiAgICAgICsgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNyYykgKyAnLCBzdHJpbmcgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChjYWxsYmFjayB8fCB0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHQ7XG4gICAgICBvcHQgPSBudWxsO1xuICAgIH1cblxuICAgIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCB8fCB7fSk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0gb3B0LmhpZ2hsaWdodCxcbiAgICAgICAgdG9rZW5zLFxuICAgICAgICBwZW5kaW5nLFxuICAgICAgICBpID0gMDtcblxuICAgIHRyeSB7XG4gICAgICB0b2tlbnMgPSBMZXhlci5sZXgoc3JjLCBvcHQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cblxuICAgIHBlbmRpbmcgPSB0b2tlbnMubGVuZ3RoO1xuXG4gICAgdmFyIGRvbmUgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdXQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG91dCA9IFBhcnNlci5wYXJzZSh0b2tlbnMsIG9wdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVyciA9IGU7XG4gICAgICB9XG5cbiAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cbiAgICAgIHJldHVybiBlcnJcbiAgICAgICAgPyBjYWxsYmFjayhlcnIpXG4gICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3V0KTtcbiAgICB9O1xuXG4gICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdC5oaWdobGlnaHQ7XG5cbiAgICBpZiAoIXBlbmRpbmcpIHJldHVybiBkb25lKCk7XG5cbiAgICBmb3IgKDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnY29kZScpIHtcbiAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaGxpZ2h0KHRva2VuLnRleHQsIHRva2VuLmxhbmcsIGZ1bmN0aW9uKGVyciwgY29kZSkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgaWYgKGNvZGUgPT0gbnVsbCB8fCBjb2RlID09PSB0b2tlbi50ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9rZW4udGV4dCA9IGNvZGU7XG4gICAgICAgICAgdG9rZW4uZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSh0b2tlbnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHQpIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZShMZXhlci5sZXgoc3JjLCBvcHQpLCBvcHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZS5tZXNzYWdlICs9ICdcXG5QbGVhc2UgcmVwb3J0IHRoaXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL21hcmtlZGpzL21hcmtlZC4nO1xuICAgIGlmICgob3B0IHx8IG1hcmtlZC5kZWZhdWx0cykuc2lsZW50KSB7XG4gICAgICByZXR1cm4gJzxwPkFuIGVycm9yIG9jY3VycmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogdHJ1ZSxcbiAgYnJlYWtzOiBmYWxzZSxcbiAgcGVkYW50aWM6IGZhbHNlLFxuICBzYW5pdGl6ZTogZmFsc2UsXG4gIHNhbml0aXplcjogbnVsbCxcbiAgbWFuZ2xlOiB0cnVlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIoKSxcbiAgeGh0bWw6IGZhbHNlLFxuICBiYXNlVXJsOiBudWxsXG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5cbm1hcmtlZC5QYXJzZXIgPSBQYXJzZXI7XG5tYXJrZWQucGFyc2VyID0gUGFyc2VyLnBhcnNlO1xuXG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcbm1hcmtlZC5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHJvb3QubWFya2VkID0gbWFya2VkO1xufVxufSkodGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tYXJrZWQvbGliL21hcmtlZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLyogTlByb2dyZXNzLCAoYykgMjAxMywgMjAxNCBSaWNvIFN0YS4gQ3J1eiAtIGh0dHA6Ly9yaWNvc3RhY3J1ei5jb20vbnByb2dyZXNzXG4gKiBAbGljZW5zZSBNSVQgKi9cblxuOyhmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290Lk5Qcm9ncmVzcyA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbiAgdmFyIE5Qcm9ncmVzcyA9IHt9O1xuXG4gIE5Qcm9ncmVzcy52ZXJzaW9uID0gJzAuMi4wJztcblxuICB2YXIgU2V0dGluZ3MgPSBOUHJvZ3Jlc3Muc2V0dGluZ3MgPSB7XG4gICAgbWluaW11bTogMC4wOCxcbiAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICBwb3NpdGlvblVzaW5nOiAnJyxcbiAgICBzcGVlZDogMjAwLFxuICAgIHRyaWNrbGU6IHRydWUsXG4gICAgdHJpY2tsZVJhdGU6IDAuMDIsXG4gICAgdHJpY2tsZVNwZWVkOiA4MDAsXG4gICAgc2hvd1NwaW5uZXI6IHRydWUsXG4gICAgYmFyU2VsZWN0b3I6ICdbcm9sZT1cImJhclwiXScsXG4gICAgc3Bpbm5lclNlbGVjdG9yOiAnW3JvbGU9XCJzcGlubmVyXCJdJyxcbiAgICBwYXJlbnQ6ICdib2R5JyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJiYXJcIiByb2xlPVwiYmFyXCI+PGRpdiBjbGFzcz1cInBlZ1wiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJzcGlubmVyXCIgcm9sZT1cInNwaW5uZXJcIj48ZGl2IGNsYXNzPVwic3Bpbm5lci1pY29uXCI+PC9kaXY+PC9kaXY+J1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGNvbmZpZ3VyYXRpb24uXG4gICAqXG4gICAqICAgICBOUHJvZ3Jlc3MuY29uZmlndXJlKHtcbiAgICogICAgICAgbWluaW11bTogMC4xXG4gICAqICAgICB9KTtcbiAgICovXG4gIE5Qcm9ncmVzcy5jb25maWd1cmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gb3B0aW9ucykge1xuICAgICAgdmFsdWUgPSBvcHRpb25zW2tleV07XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIFNldHRpbmdzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogTGFzdCBudW1iZXIuXG4gICAqL1xuXG4gIE5Qcm9ncmVzcy5zdGF0dXMgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwcm9ncmVzcyBiYXIgc3RhdHVzLCB3aGVyZSBgbmAgaXMgYSBudW1iZXIgZnJvbSBgMC4wYCB0byBgMS4wYC5cbiAgICpcbiAgICogICAgIE5Qcm9ncmVzcy5zZXQoMC40KTtcbiAgICogICAgIE5Qcm9ncmVzcy5zZXQoMS4wKTtcbiAgICovXG5cbiAgTlByb2dyZXNzLnNldCA9IGZ1bmN0aW9uKG4pIHtcbiAgICB2YXIgc3RhcnRlZCA9IE5Qcm9ncmVzcy5pc1N0YXJ0ZWQoKTtcblxuICAgIG4gPSBjbGFtcChuLCBTZXR0aW5ncy5taW5pbXVtLCAxKTtcbiAgICBOUHJvZ3Jlc3Muc3RhdHVzID0gKG4gPT09IDEgPyBudWxsIDogbik7XG5cbiAgICB2YXIgcHJvZ3Jlc3MgPSBOUHJvZ3Jlc3MucmVuZGVyKCFzdGFydGVkKSxcbiAgICAgICAgYmFyICAgICAgPSBwcm9ncmVzcy5xdWVyeVNlbGVjdG9yKFNldHRpbmdzLmJhclNlbGVjdG9yKSxcbiAgICAgICAgc3BlZWQgICAgPSBTZXR0aW5ncy5zcGVlZCxcbiAgICAgICAgZWFzZSAgICAgPSBTZXR0aW5ncy5lYXNpbmc7XG5cbiAgICBwcm9ncmVzcy5vZmZzZXRXaWR0aDsgLyogUmVwYWludCAqL1xuXG4gICAgcXVldWUoZnVuY3Rpb24obmV4dCkge1xuICAgICAgLy8gU2V0IHBvc2l0aW9uVXNpbmcgaWYgaXQgaGFzbid0IGFscmVhZHkgYmVlbiBzZXRcbiAgICAgIGlmIChTZXR0aW5ncy5wb3NpdGlvblVzaW5nID09PSAnJykgU2V0dGluZ3MucG9zaXRpb25Vc2luZyA9IE5Qcm9ncmVzcy5nZXRQb3NpdGlvbmluZ0NTUygpO1xuXG4gICAgICAvLyBBZGQgdHJhbnNpdGlvblxuICAgICAgY3NzKGJhciwgYmFyUG9zaXRpb25DU1Mobiwgc3BlZWQsIGVhc2UpKTtcblxuICAgICAgaWYgKG4gPT09IDEpIHtcbiAgICAgICAgLy8gRmFkZSBvdXRcbiAgICAgICAgY3NzKHByb2dyZXNzLCB7IFxuICAgICAgICAgIHRyYW5zaXRpb246ICdub25lJywgXG4gICAgICAgICAgb3BhY2l0eTogMSBcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2dyZXNzLm9mZnNldFdpZHRoOyAvKiBSZXBhaW50ICovXG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjc3MocHJvZ3Jlc3MsIHsgXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsICcgKyBzcGVlZCArICdtcyBsaW5lYXInLCBcbiAgICAgICAgICAgIG9wYWNpdHk6IDAgXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIE5Qcm9ncmVzcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICB9LCBzcGVlZCk7XG4gICAgICAgIH0sIHNwZWVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQobmV4dCwgc3BlZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTlByb2dyZXNzLmlzU3RhcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0eXBlb2YgTlByb2dyZXNzLnN0YXR1cyA9PT0gJ251bWJlcic7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqIFRoaXMgaXMgdGhlIHNhbWUgYXMgc2V0dGluZyB0aGUgc3RhdHVzIHRvIDAlLCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGdvIGJhY2t3YXJkcy5cbiAgICpcbiAgICogICAgIE5Qcm9ncmVzcy5zdGFydCgpO1xuICAgKlxuICAgKi9cbiAgTlByb2dyZXNzLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFOUHJvZ3Jlc3Muc3RhdHVzKSBOUHJvZ3Jlc3Muc2V0KDApO1xuXG4gICAgdmFyIHdvcmsgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghTlByb2dyZXNzLnN0YXR1cykgcmV0dXJuO1xuICAgICAgICBOUHJvZ3Jlc3MudHJpY2tsZSgpO1xuICAgICAgICB3b3JrKCk7XG4gICAgICB9LCBTZXR0aW5ncy50cmlja2xlU3BlZWQpO1xuICAgIH07XG5cbiAgICBpZiAoU2V0dGluZ3MudHJpY2tsZSkgd29yaygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqIFRoaXMgaXMgdGhlICpzb3J0IG9mKiB0aGUgc2FtZSBhcyBzZXR0aW5nIHRoZSBzdGF0dXMgdG8gMTAwJSwgd2l0aCB0aGVcbiAgICogZGlmZmVyZW5jZSBiZWluZyBgZG9uZSgpYCBtYWtlcyBzb21lIHBsYWNlYm8gZWZmZWN0IG9mIHNvbWUgcmVhbGlzdGljIG1vdGlvbi5cbiAgICpcbiAgICogICAgIE5Qcm9ncmVzcy5kb25lKCk7XG4gICAqXG4gICAqIElmIGB0cnVlYCBpcyBwYXNzZWQsIGl0IHdpbGwgc2hvdyB0aGUgcHJvZ3Jlc3MgYmFyIGV2ZW4gaWYgaXRzIGhpZGRlbi5cbiAgICpcbiAgICogICAgIE5Qcm9ncmVzcy5kb25lKHRydWUpO1xuICAgKi9cblxuICBOUHJvZ3Jlc3MuZG9uZSA9IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSAmJiAhTlByb2dyZXNzLnN0YXR1cykgcmV0dXJuIHRoaXM7XG5cbiAgICByZXR1cm4gTlByb2dyZXNzLmluYygwLjMgKyAwLjUgKiBNYXRoLnJhbmRvbSgpKS5zZXQoMSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluY3JlbWVudHMgYnkgYSByYW5kb20gYW1vdW50LlxuICAgKi9cblxuICBOUHJvZ3Jlc3MuaW5jID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgdmFyIG4gPSBOUHJvZ3Jlc3Muc3RhdHVzO1xuXG4gICAgaWYgKCFuKSB7XG4gICAgICByZXR1cm4gTlByb2dyZXNzLnN0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgYW1vdW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBhbW91bnQgPSAoMSAtIG4pICogY2xhbXAoTWF0aC5yYW5kb20oKSAqIG4sIDAuMSwgMC45NSk7XG4gICAgICB9XG5cbiAgICAgIG4gPSBjbGFtcChuICsgYW1vdW50LCAwLCAwLjk5NCk7XG4gICAgICByZXR1cm4gTlByb2dyZXNzLnNldChuKTtcbiAgICB9XG4gIH07XG5cbiAgTlByb2dyZXNzLnRyaWNrbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTlByb2dyZXNzLmluYyhNYXRoLnJhbmRvbSgpICogU2V0dGluZ3MudHJpY2tsZVJhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgYWxsIHN1cHBsaWVkIGpRdWVyeSBwcm9taXNlcyBhbmRcbiAgICogaW5jcmVhc2VzIHRoZSBwcm9ncmVzcyBhcyB0aGUgcHJvbWlzZXMgcmVzb2x2ZS5cbiAgICpcbiAgICogQHBhcmFtICRwcm9taXNlIGpRVWVyeSBQcm9taXNlXG4gICAqL1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluaXRpYWwgPSAwLCBjdXJyZW50ID0gMDtcblxuICAgIE5Qcm9ncmVzcy5wcm9taXNlID0gZnVuY3Rpb24oJHByb21pc2UpIHtcbiAgICAgIGlmICghJHByb21pc2UgfHwgJHByb21pc2Uuc3RhdGUoKSA9PT0gXCJyZXNvbHZlZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudCA9PT0gMCkge1xuICAgICAgICBOUHJvZ3Jlc3Muc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgaW5pdGlhbCsrO1xuICAgICAgY3VycmVudCsrO1xuXG4gICAgICAkcHJvbWlzZS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnJlbnQtLTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IDApIHtcbiAgICAgICAgICAgIGluaXRpYWwgPSAwO1xuICAgICAgICAgICAgTlByb2dyZXNzLmRvbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE5Qcm9ncmVzcy5zZXQoKGluaXRpYWwgLSBjdXJyZW50KSAvIGluaXRpYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICB9KSgpO1xuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIHJlbmRlcnMgdGhlIHByb2dyZXNzIGJhciBtYXJrdXAgYmFzZWQgb24gdGhlIGB0ZW1wbGF0ZWBcbiAgICogc2V0dGluZy5cbiAgICovXG5cbiAgTlByb2dyZXNzLnJlbmRlciA9IGZ1bmN0aW9uKGZyb21TdGFydCkge1xuICAgIGlmIChOUHJvZ3Jlc3MuaXNSZW5kZXJlZCgpKSByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25wcm9ncmVzcycpO1xuXG4gICAgYWRkQ2xhc3MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbnByb2dyZXNzLWJ1c3knKTtcbiAgICBcbiAgICB2YXIgcHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9ncmVzcy5pZCA9ICducHJvZ3Jlc3MnO1xuICAgIHByb2dyZXNzLmlubmVySFRNTCA9IFNldHRpbmdzLnRlbXBsYXRlO1xuXG4gICAgdmFyIGJhciAgICAgID0gcHJvZ3Jlc3MucXVlcnlTZWxlY3RvcihTZXR0aW5ncy5iYXJTZWxlY3RvciksXG4gICAgICAgIHBlcmMgICAgID0gZnJvbVN0YXJ0ID8gJy0xMDAnIDogdG9CYXJQZXJjKE5Qcm9ncmVzcy5zdGF0dXMgfHwgMCksXG4gICAgICAgIHBhcmVudCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTZXR0aW5ncy5wYXJlbnQpLFxuICAgICAgICBzcGlubmVyO1xuICAgIFxuICAgIGNzcyhiYXIsIHtcbiAgICAgIHRyYW5zaXRpb246ICdhbGwgMCBsaW5lYXInLFxuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoJyArIHBlcmMgKyAnJSwwLDApJ1xuICAgIH0pO1xuXG4gICAgaWYgKCFTZXR0aW5ncy5zaG93U3Bpbm5lcikge1xuICAgICAgc3Bpbm5lciA9IHByb2dyZXNzLnF1ZXJ5U2VsZWN0b3IoU2V0dGluZ3Muc3Bpbm5lclNlbGVjdG9yKTtcbiAgICAgIHNwaW5uZXIgJiYgcmVtb3ZlRWxlbWVudChzcGlubmVyKTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50ICE9IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIGFkZENsYXNzKHBhcmVudCwgJ25wcm9ncmVzcy1jdXN0b20tcGFyZW50Jyk7XG4gICAgfVxuXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHByb2dyZXNzKTtcbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQuIE9wcG9zaXRlIG9mIHJlbmRlcigpLlxuICAgKi9cblxuICBOUHJvZ3Jlc3MucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbnByb2dyZXNzLWJ1c3knKTtcbiAgICByZW1vdmVDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNldHRpbmdzLnBhcmVudCksICducHJvZ3Jlc3MtY3VzdG9tLXBhcmVudCcpO1xuICAgIHZhciBwcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCducHJvZ3Jlc3MnKTtcbiAgICBwcm9ncmVzcyAmJiByZW1vdmVFbGVtZW50KHByb2dyZXNzKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBwcm9ncmVzcyBiYXIgaXMgcmVuZGVyZWQuXG4gICAqL1xuXG4gIE5Qcm9ncmVzcy5pc1JlbmRlcmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25wcm9ncmVzcycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hpY2ggcG9zaXRpb25pbmcgQ1NTIHJ1bGUgdG8gdXNlLlxuICAgKi9cblxuICBOUHJvZ3Jlc3MuZ2V0UG9zaXRpb25pbmdDU1MgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBTbmlmZiBvbiBkb2N1bWVudC5ib2R5LnN0eWxlXG4gICAgdmFyIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG5cbiAgICAvLyBTbmlmZiBwcmVmaXhlc1xuICAgIHZhciB2ZW5kb3JQcmVmaXggPSAoJ1dlYmtpdFRyYW5zZm9ybScgaW4gYm9keVN0eWxlKSA/ICdXZWJraXQnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKCdNb3pUcmFuc2Zvcm0nIGluIGJvZHlTdHlsZSkgPyAnTW96JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICgnbXNUcmFuc2Zvcm0nIGluIGJvZHlTdHlsZSkgPyAnbXMnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKCdPVHJhbnNmb3JtJyBpbiBib2R5U3R5bGUpID8gJ08nIDogJyc7XG5cbiAgICBpZiAodmVuZG9yUHJlZml4ICsgJ1BlcnNwZWN0aXZlJyBpbiBib2R5U3R5bGUpIHtcbiAgICAgIC8vIE1vZGVybiBicm93c2VycyB3aXRoIDNEIHN1cHBvcnQsIGUuZy4gV2Via2l0LCBJRTEwXG4gICAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkJztcbiAgICB9IGVsc2UgaWYgKHZlbmRvclByZWZpeCArICdUcmFuc2Zvcm0nIGluIGJvZHlTdHlsZSkge1xuICAgICAgLy8gQnJvd3NlcnMgd2l0aG91dCAzRCBzdXBwb3J0LCBlLmcuIElFOVxuICAgICAgcmV0dXJuICd0cmFuc2xhdGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCcm93c2VycyB3aXRob3V0IHRyYW5zbGF0ZSgpIHN1cHBvcnQsIGUuZy4gSUU3LThcbiAgICAgIHJldHVybiAnbWFyZ2luJztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlcnNcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xhbXAobiwgbWluLCBtYXgpIHtcbiAgICBpZiAobiA8IG1pbikgcmV0dXJuIG1pbjtcbiAgICBpZiAobiA+IG1heCkgcmV0dXJuIG1heDtcbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIGNvbnZlcnRzIGEgcGVyY2VudGFnZSAoYDAuLjFgKSB0byBhIGJhciB0cmFuc2xhdGVYXG4gICAqIHBlcmNlbnRhZ2UgKGAtMTAwJS4uMCVgKS5cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9CYXJQZXJjKG4pIHtcbiAgICByZXR1cm4gKC0xICsgbikgKiAxMDA7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIHJldHVybnMgdGhlIGNvcnJlY3QgQ1NTIGZvciBjaGFuZ2luZyB0aGUgYmFyJ3NcbiAgICogcG9zaXRpb24gZ2l2ZW4gYW4gbiBwZXJjZW50YWdlLCBhbmQgc3BlZWQgYW5kIGVhc2UgZnJvbSBTZXR0aW5nc1xuICAgKi9cblxuICBmdW5jdGlvbiBiYXJQb3NpdGlvbkNTUyhuLCBzcGVlZCwgZWFzZSkge1xuICAgIHZhciBiYXJDU1M7XG5cbiAgICBpZiAoU2V0dGluZ3MucG9zaXRpb25Vc2luZyA9PT0gJ3RyYW5zbGF0ZTNkJykge1xuICAgICAgYmFyQ1NTID0geyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgnK3RvQmFyUGVyYyhuKSsnJSwwLDApJyB9O1xuICAgIH0gZWxzZSBpZiAoU2V0dGluZ3MucG9zaXRpb25Vc2luZyA9PT0gJ3RyYW5zbGF0ZScpIHtcbiAgICAgIGJhckNTUyA9IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcrdG9CYXJQZXJjKG4pKyclLDApJyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXJDU1MgPSB7ICdtYXJnaW4tbGVmdCc6IHRvQmFyUGVyYyhuKSsnJScgfTtcbiAgICB9XG5cbiAgICBiYXJDU1MudHJhbnNpdGlvbiA9ICdhbGwgJytzcGVlZCsnbXMgJytlYXNlO1xuXG4gICAgcmV0dXJuIGJhckNTUztcbiAgfVxuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIFF1ZXVlcyBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxuICAgKi9cblxuICB2YXIgcXVldWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBlbmRpbmcgPSBbXTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgdmFyIGZuID0gcGVuZGluZy5zaGlmdCgpO1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGZuKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgcGVuZGluZy5wdXNoKGZuKTtcbiAgICAgIGlmIChwZW5kaW5nLmxlbmd0aCA9PSAxKSBuZXh0KCk7XG4gICAgfTtcbiAgfSkoKTtcblxuICAvKipcbiAgICogKEludGVybmFsKSBBcHBsaWVzIGNzcyBwcm9wZXJ0aWVzIHRvIGFuIGVsZW1lbnQsIHNpbWlsYXIgdG8gdGhlIGpRdWVyeSBcbiAgICogY3NzIG1ldGhvZC5cbiAgICpcbiAgICogV2hpbGUgdGhpcyBoZWxwZXIgZG9lcyBhc3Npc3Qgd2l0aCB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHkgbmFtZXMsIGl0IFxuICAgKiBkb2VzIG5vdCBwZXJmb3JtIGFueSBtYW5pcHVsYXRpb24gb2YgdmFsdWVzIHByaW9yIHRvIHNldHRpbmcgc3R5bGVzLlxuICAgKi9cblxuICB2YXIgY3NzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjc3NQcmVmaXhlcyA9IFsgJ1dlYmtpdCcsICdPJywgJ01veicsICdtcycgXSxcbiAgICAgICAgY3NzUHJvcHMgICAgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXi1tcy0vLCAnbXMtJykucmVwbGFjZSgvLShbXFxkYS16XSkvZ2ksIGZ1bmN0aW9uKG1hdGNoLCBsZXR0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmVuZG9yUHJvcChuYW1lKSB7XG4gICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuICAgICAgaWYgKG5hbWUgaW4gc3R5bGUpIHJldHVybiBuYW1lO1xuXG4gICAgICB2YXIgaSA9IGNzc1ByZWZpeGVzLmxlbmd0aCxcbiAgICAgICAgICBjYXBOYW1lID0gbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSksXG4gICAgICAgICAgdmVuZG9yTmFtZTtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmVuZG9yTmFtZSA9IGNzc1ByZWZpeGVzW2ldICsgY2FwTmFtZTtcbiAgICAgICAgaWYgKHZlbmRvck5hbWUgaW4gc3R5bGUpIHJldHVybiB2ZW5kb3JOYW1lO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdHlsZVByb3AobmFtZSkge1xuICAgICAgbmFtZSA9IGNhbWVsQ2FzZShuYW1lKTtcbiAgICAgIHJldHVybiBjc3NQcm9wc1tuYW1lXSB8fCAoY3NzUHJvcHNbbmFtZV0gPSBnZXRWZW5kb3JQcm9wKG5hbWUpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseUNzcyhlbGVtZW50LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgcHJvcCA9IGdldFN0eWxlUHJvcChwcm9wKTtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgcHJvcGVydGllcykge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgcHJvcCwgXG4gICAgICAgICAgdmFsdWU7XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIGZvciAocHJvcCBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcCkpIGFwcGx5Q3NzKGVsZW1lbnQsIHByb3AsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwbHlDc3MoZWxlbWVudCwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIERldGVybWluZXMgaWYgYW4gZWxlbWVudCBvciBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBjbGFzcyBuYW1lcyBjb250YWlucyBhIGNsYXNzIG5hbWUuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIG5hbWUpIHtcbiAgICB2YXIgbGlzdCA9IHR5cGVvZiBlbGVtZW50ID09ICdzdHJpbmcnID8gZWxlbWVudCA6IGNsYXNzTGlzdChlbGVtZW50KTtcbiAgICByZXR1cm4gbGlzdC5pbmRleE9mKCcgJyArIG5hbWUgKyAnICcpID49IDA7XG4gIH1cblxuICAvKipcbiAgICogKEludGVybmFsKSBBZGRzIGEgY2xhc3MgdG8gYW4gZWxlbWVudC5cbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgbmFtZSkge1xuICAgIHZhciBvbGRMaXN0ID0gY2xhc3NMaXN0KGVsZW1lbnQpLFxuICAgICAgICBuZXdMaXN0ID0gb2xkTGlzdCArIG5hbWU7XG5cbiAgICBpZiAoaGFzQ2xhc3Mob2xkTGlzdCwgbmFtZSkpIHJldHVybjsgXG5cbiAgICAvLyBUcmltIHRoZSBvcGVuaW5nIHNwYWNlLlxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3TGlzdC5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICAvKipcbiAgICogKEludGVybmFsKSBSZW1vdmVzIGEgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBuYW1lKSB7XG4gICAgdmFyIG9sZExpc3QgPSBjbGFzc0xpc3QoZWxlbWVudCksXG4gICAgICAgIG5ld0xpc3Q7XG5cbiAgICBpZiAoIWhhc0NsYXNzKGVsZW1lbnQsIG5hbWUpKSByZXR1cm47XG5cbiAgICAvLyBSZXBsYWNlIHRoZSBjbGFzcyBuYW1lLlxuICAgIG5ld0xpc3QgPSBvbGRMaXN0LnJlcGxhY2UoJyAnICsgbmFtZSArICcgJywgJyAnKTtcblxuICAgIC8vIFRyaW0gdGhlIG9wZW5pbmcgYW5kIGNsb3Npbmcgc3BhY2VzLlxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3TGlzdC5zdWJzdHJpbmcoMSwgbmV3TGlzdC5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAoSW50ZXJuYWwpIEdldHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0aGUgY2xhc3MgbmFtZXMgb24gdGhlIGVsZW1lbnQuIFxuICAgKiBUaGUgbGlzdCBpcyB3cmFwcGVkIHdpdGggYSBzaW5nbGUgc3BhY2Ugb24gZWFjaCBlbmQgdG8gZmFjaWxpdGF0ZSBmaW5kaW5nIFxuICAgKiBtYXRjaGVzIHdpdGhpbiB0aGUgbGlzdC5cbiAgICovXG5cbiAgZnVuY3Rpb24gY2xhc3NMaXN0KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gKCcgJyArIChlbGVtZW50LmNsYXNzTmFtZSB8fCAnJykgKyAnICcpLnJlcGxhY2UoL1xccysvZ2ksICcgJyk7XG4gIH1cblxuICAvKipcbiAgICogKEludGVybmFsKSBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gTlByb2dyZXNzO1xufSk7XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25wcm9ncmVzcy9ucHJvZ3Jlc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL25wcm9ncmVzcy9ucHJvZ3Jlc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwOi8vY29kZW1pcnJvci5uZXQvTElDRU5TRVxuXG52YXIgQ29kZU1pcnJvciA9IHJlcXVpcmUoXCJjb2RlbWlycm9yXCIpO1xuXG5Db2RlTWlycm9yLmNvbW1hbmRzLnRhYkFuZEluZGVudE1hcmtkb3duTGlzdCA9IGZ1bmN0aW9uIChjbSkge1xuXHR2YXIgcmFuZ2VzID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcblx0dmFyIHBvcyA9IHJhbmdlc1swXS5oZWFkO1xuXHR2YXIgZW9sU3RhdGUgPSBjbS5nZXRTdGF0ZUFmdGVyKHBvcy5saW5lKTtcblx0dmFyIGluTGlzdCA9IGVvbFN0YXRlLmxpc3QgIT09IGZhbHNlO1xuXG5cdGlmIChpbkxpc3QpIHtcblx0XHRjbS5leGVjQ29tbWFuZChcImluZGVudE1vcmVcIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNtLm9wdGlvbnMuaW5kZW50V2l0aFRhYnMpIHtcblx0XHRjbS5leGVjQ29tbWFuZChcImluc2VydFRhYlwiKTtcblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgc3BhY2VzID0gQXJyYXkoY20ub3B0aW9ucy50YWJTaXplICsgMSkuam9pbihcIiBcIik7XG5cdFx0Y20ucmVwbGFjZVNlbGVjdGlvbihzcGFjZXMpO1xuXHR9XG59O1xuXG5Db2RlTWlycm9yLmNvbW1hbmRzLnNoaWZ0VGFiQW5kVW5pbmRlbnRNYXJrZG93bkxpc3QgPSBmdW5jdGlvbiAoY20pIHtcblx0dmFyIHJhbmdlcyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG5cdHZhciBwb3MgPSByYW5nZXNbMF0uaGVhZDtcblx0dmFyIGVvbFN0YXRlID0gY20uZ2V0U3RhdGVBZnRlcihwb3MubGluZSk7XG5cdHZhciBpbkxpc3QgPSBlb2xTdGF0ZS5saXN0ICE9PSBmYWxzZTtcblxuXHRpZiAoaW5MaXN0KSB7XG5cdFx0Y20uZXhlY0NvbW1hbmQoXCJpbmRlbnRMZXNzXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjbS5vcHRpb25zLmluZGVudFdpdGhUYWJzKSB7XG5cdFx0Y20uZXhlY0NvbW1hbmQoXCJpbnNlcnRUYWJcIik7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIHNwYWNlcyA9IEFycmF5KGNtLm9wdGlvbnMudGFiU2l6ZSArIDEpLmpvaW4oXCIgXCIpO1xuXHRcdGNtLnJlcGxhY2VTZWxlY3Rpb24oc3BhY2VzKTtcblx0fVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpbXBsZW1kZS9zcmMvanMvY29kZW1pcnJvci90YWJsaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zaW1wbGVtZGUvc3JjL2pzL2NvZGVtaXJyb3IvdGFibGlzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIi8qZ2xvYmFsIHJlcXVpcmUsbW9kdWxlKi9cblwidXNlIHN0cmljdFwiO1xudmFyIENvZGVNaXJyb3IgPSByZXF1aXJlKFwiY29kZW1pcnJvclwiKTtcbnJlcXVpcmUoXCJjb2RlbWlycm9yL2FkZG9uL2VkaXQvY29udGludWVsaXN0LmpzXCIpO1xucmVxdWlyZShcIi4vY29kZW1pcnJvci90YWJsaXN0XCIpO1xucmVxdWlyZShcImNvZGVtaXJyb3IvYWRkb24vZGlzcGxheS9mdWxsc2NyZWVuLmpzXCIpO1xucmVxdWlyZShcImNvZGVtaXJyb3IvbW9kZS9tYXJrZG93bi9tYXJrZG93bi5qc1wiKTtcbnJlcXVpcmUoXCJjb2RlbWlycm9yL2FkZG9uL21vZGUvb3ZlcmxheS5qc1wiKTtcbnJlcXVpcmUoXCJjb2RlbWlycm9yL2FkZG9uL2Rpc3BsYXkvcGxhY2Vob2xkZXIuanNcIik7XG5yZXF1aXJlKFwiY29kZW1pcnJvci9hZGRvbi9zZWxlY3Rpb24vbWFyay1zZWxlY3Rpb24uanNcIik7XG5yZXF1aXJlKFwiY29kZW1pcnJvci9tb2RlL2dmbS9nZm0uanNcIik7XG5yZXF1aXJlKFwiY29kZW1pcnJvci9tb2RlL3htbC94bWwuanNcIik7XG52YXIgQ29kZU1pcnJvclNwZWxsQ2hlY2tlciA9IHJlcXVpcmUoXCJjb2RlbWlycm9yLXNwZWxsLWNoZWNrZXJcIik7XG52YXIgbWFya2VkID0gcmVxdWlyZShcIm1hcmtlZFwiKTtcblxuXG4vLyBTb21lIHZhcmlhYmxlc1xudmFyIGlzTWFjID0gL01hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pO1xuXG4vLyBNYXBwaW5nIG9mIGFjdGlvbnMgdGhhdCBjYW4gYmUgYm91bmQgdG8ga2V5Ym9hcmQgc2hvcnRjdXRzIG9yIHRvb2xiYXIgYnV0dG9uc1xudmFyIGJpbmRpbmdzID0ge1xuXHRcInRvZ2dsZUJvbGRcIjogdG9nZ2xlQm9sZCxcblx0XCJ0b2dnbGVJdGFsaWNcIjogdG9nZ2xlSXRhbGljLFxuXHRcImRyYXdMaW5rXCI6IGRyYXdMaW5rLFxuXHRcInRvZ2dsZUhlYWRpbmdTbWFsbGVyXCI6IHRvZ2dsZUhlYWRpbmdTbWFsbGVyLFxuXHRcInRvZ2dsZUhlYWRpbmdCaWdnZXJcIjogdG9nZ2xlSGVhZGluZ0JpZ2dlcixcblx0XCJkcmF3SW1hZ2VcIjogZHJhd0ltYWdlLFxuXHRcInRvZ2dsZUJsb2NrcXVvdGVcIjogdG9nZ2xlQmxvY2txdW90ZSxcblx0XCJ0b2dnbGVPcmRlcmVkTGlzdFwiOiB0b2dnbGVPcmRlcmVkTGlzdCxcblx0XCJ0b2dnbGVVbm9yZGVyZWRMaXN0XCI6IHRvZ2dsZVVub3JkZXJlZExpc3QsXG5cdFwidG9nZ2xlQ29kZUJsb2NrXCI6IHRvZ2dsZUNvZGVCbG9jayxcblx0XCJ0b2dnbGVQcmV2aWV3XCI6IHRvZ2dsZVByZXZpZXcsXG5cdFwidG9nZ2xlU3RyaWtldGhyb3VnaFwiOiB0b2dnbGVTdHJpa2V0aHJvdWdoLFxuXHRcInRvZ2dsZUhlYWRpbmcxXCI6IHRvZ2dsZUhlYWRpbmcxLFxuXHRcInRvZ2dsZUhlYWRpbmcyXCI6IHRvZ2dsZUhlYWRpbmcyLFxuXHRcInRvZ2dsZUhlYWRpbmczXCI6IHRvZ2dsZUhlYWRpbmczLFxuXHRcImNsZWFuQmxvY2tcIjogY2xlYW5CbG9jayxcblx0XCJkcmF3VGFibGVcIjogZHJhd1RhYmxlLFxuXHRcImRyYXdIb3Jpem9udGFsUnVsZVwiOiBkcmF3SG9yaXpvbnRhbFJ1bGUsXG5cdFwidW5kb1wiOiB1bmRvLFxuXHRcInJlZG9cIjogcmVkbyxcblx0XCJ0b2dnbGVTaWRlQnlTaWRlXCI6IHRvZ2dsZVNpZGVCeVNpZGUsXG5cdFwidG9nZ2xlRnVsbFNjcmVlblwiOiB0b2dnbGVGdWxsU2NyZWVuXG59O1xuXG52YXIgc2hvcnRjdXRzID0ge1xuXHRcInRvZ2dsZUJvbGRcIjogXCJDbWQtQlwiLFxuXHRcInRvZ2dsZUl0YWxpY1wiOiBcIkNtZC1JXCIsXG5cdFwiZHJhd0xpbmtcIjogXCJDbWQtS1wiLFxuXHRcInRvZ2dsZUhlYWRpbmdTbWFsbGVyXCI6IFwiQ21kLUhcIixcblx0XCJ0b2dnbGVIZWFkaW5nQmlnZ2VyXCI6IFwiU2hpZnQtQ21kLUhcIixcblx0XCJjbGVhbkJsb2NrXCI6IFwiQ21kLUVcIixcblx0XCJkcmF3SW1hZ2VcIjogXCJDbWQtQWx0LUlcIixcblx0XCJ0b2dnbGVCbG9ja3F1b3RlXCI6IFwiQ21kLSdcIixcblx0XCJ0b2dnbGVPcmRlcmVkTGlzdFwiOiBcIkNtZC1BbHQtTFwiLFxuXHRcInRvZ2dsZVVub3JkZXJlZExpc3RcIjogXCJDbWQtTFwiLFxuXHRcInRvZ2dsZUNvZGVCbG9ja1wiOiBcIkNtZC1BbHQtQ1wiLFxuXHRcInRvZ2dsZVByZXZpZXdcIjogXCJDbWQtUFwiLFxuXHRcInRvZ2dsZVNpZGVCeVNpZGVcIjogXCJGOVwiLFxuXHRcInRvZ2dsZUZ1bGxTY3JlZW5cIjogXCJGMTFcIlxufTtcblxudmFyIGdldEJpbmRpbmdOYW1lID0gZnVuY3Rpb24oZikge1xuXHRmb3IodmFyIGtleSBpbiBiaW5kaW5ncykge1xuXHRcdGlmKGJpbmRpbmdzW2tleV0gPT09IGYpIHtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxudmFyIGlzTW9iaWxlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjaGVjayA9IGZhbHNlO1xuXHQoZnVuY3Rpb24oYSkge1xuXHRcdGlmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKSBjaGVjayA9IHRydWU7XG5cdH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuXHRyZXR1cm4gY2hlY2s7XG59O1xuXG5cbi8qKlxuICogRml4IHNob3J0Y3V0LiBNYWMgdXNlIENvbW1hbmQsIG90aGVycyB1c2UgQ3RybC5cbiAqL1xuZnVuY3Rpb24gZml4U2hvcnRjdXQobmFtZSkge1xuXHRpZihpc01hYykge1xuXHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoXCJDdHJsXCIsIFwiQ21kXCIpO1xuXHR9IGVsc2Uge1xuXHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoXCJDbWRcIiwgXCJDdHJsXCIpO1xuXHR9XG5cdHJldHVybiBuYW1lO1xufVxuXG5cbi8qKlxuICogQ3JlYXRlIGljb24gZWxlbWVudCBmb3IgdG9vbGJhci5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSWNvbihvcHRpb25zLCBlbmFibGVUb29sdGlwcywgc2hvcnRjdXRzKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblx0ZW5hYmxlVG9vbHRpcHMgPSAoZW5hYmxlVG9vbHRpcHMgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiBlbmFibGVUb29sdGlwcztcblxuXHRpZihvcHRpb25zLnRpdGxlICYmIGVuYWJsZVRvb2x0aXBzKSB7XG5cdFx0ZWwudGl0bGUgPSBjcmVhdGVUb290bGlwKG9wdGlvbnMudGl0bGUsIG9wdGlvbnMuYWN0aW9uLCBzaG9ydGN1dHMpO1xuXG5cdFx0aWYoaXNNYWMpIHtcblx0XHRcdGVsLnRpdGxlID0gZWwudGl0bGUucmVwbGFjZShcIkN0cmxcIiwgXCLijJhcIik7XG5cdFx0XHRlbC50aXRsZSA9IGVsLnRpdGxlLnJlcGxhY2UoXCJBbHRcIiwgXCLijKVcIik7XG5cdFx0fVxuXHR9XG5cblx0ZWwudGFiSW5kZXggPSAtMTtcblx0ZWwuY2xhc3NOYW1lID0gb3B0aW9ucy5jbGFzc05hbWU7XG5cdHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VwKCkge1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblx0ZWwuY2xhc3NOYW1lID0gXCJzZXBhcmF0b3JcIjtcblx0ZWwuaW5uZXJIVE1MID0gXCJ8XCI7XG5cdHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9vdGxpcCh0aXRsZSwgYWN0aW9uLCBzaG9ydGN1dHMpIHtcblx0dmFyIGFjdGlvbk5hbWU7XG5cdHZhciB0b29sdGlwID0gdGl0bGU7XG5cblx0aWYoYWN0aW9uKSB7XG5cdFx0YWN0aW9uTmFtZSA9IGdldEJpbmRpbmdOYW1lKGFjdGlvbik7XG5cdFx0aWYoc2hvcnRjdXRzW2FjdGlvbk5hbWVdKSB7XG5cdFx0XHR0b29sdGlwICs9IFwiIChcIiArIGZpeFNob3J0Y3V0KHNob3J0Y3V0c1thY3Rpb25OYW1lXSkgKyBcIilcIjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG9vbHRpcDtcbn1cblxuLyoqXG4gKiBUaGUgc3RhdGUgb2YgQ29kZU1pcnJvciBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldFN0YXRlKGNtLCBwb3MpIHtcblx0cG9zID0gcG9zIHx8IGNtLmdldEN1cnNvcihcInN0YXJ0XCIpO1xuXHR2YXIgc3RhdCA9IGNtLmdldFRva2VuQXQocG9zKTtcblx0aWYoIXN0YXQudHlwZSkgcmV0dXJuIHt9O1xuXG5cdHZhciB0eXBlcyA9IHN0YXQudHlwZS5zcGxpdChcIiBcIik7XG5cblx0dmFyIHJldCA9IHt9LFxuXHRcdGRhdGEsIHRleHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdGRhdGEgPSB0eXBlc1tpXTtcblx0XHRpZihkYXRhID09PSBcInN0cm9uZ1wiKSB7XG5cdFx0XHRyZXQuYm9sZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwidmFyaWFibGUtMlwiKSB7XG5cdFx0XHR0ZXh0ID0gY20uZ2V0TGluZShwb3MubGluZSk7XG5cdFx0XHRpZigvXlxccypcXGQrXFwuXFxzLy50ZXN0KHRleHQpKSB7XG5cdFx0XHRcdHJldFtcIm9yZGVyZWQtbGlzdFwiXSA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXRbXCJ1bm9yZGVyZWQtbGlzdFwiXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwiYXRvbVwiKSB7XG5cdFx0XHRyZXQucXVvdGUgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZihkYXRhID09PSBcImVtXCIpIHtcblx0XHRcdHJldC5pdGFsaWMgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZihkYXRhID09PSBcInF1b3RlXCIpIHtcblx0XHRcdHJldC5xdW90ZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwic3RyaWtldGhyb3VnaFwiKSB7XG5cdFx0XHRyZXQuc3RyaWtldGhyb3VnaCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwiY29tbWVudFwiKSB7XG5cdFx0XHRyZXQuY29kZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwibGlua1wiKSB7XG5cdFx0XHRyZXQubGluayA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEgPT09IFwidGFnXCIpIHtcblx0XHRcdHJldC5pbWFnZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmKGRhdGEubWF0Y2goL15oZWFkZXIoXFwtWzEtNl0pPyQvKSkge1xuXHRcdFx0cmV0W2RhdGEucmVwbGFjZShcImhlYWRlclwiLCBcImhlYWRpbmdcIildID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJldDtcbn1cblxuXG4vLyBTYXZlZCBvdmVyZmxvdyBzZXR0aW5nXG52YXIgc2F2ZWRfb3ZlcmZsb3cgPSBcIlwiO1xuXG4vKipcbiAqIFRvZ2dsZSBmdWxsIHNjcmVlbiBvZiB0aGUgZWRpdG9yLlxuICovXG5mdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKGVkaXRvcikge1xuXHQvLyBTZXQgZnVsbHNjcmVlblxuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0Y20uc2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiLCAhY20uZ2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiKSk7XG5cblxuXHQvLyBQcmV2ZW50IHNjcm9sbGluZyBvbiBib2R5IGR1cmluZyBmdWxsc2NyZWVuIGFjdGl2ZVxuXHRpZihjbS5nZXRPcHRpb24oXCJmdWxsU2NyZWVuXCIpKSB7XG5cdFx0c2F2ZWRfb3ZlcmZsb3cgPSBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93O1xuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHR9IGVsc2Uge1xuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBzYXZlZF9vdmVyZmxvdztcblx0fVxuXG5cblx0Ly8gVXBkYXRlIHRvb2xiYXIgY2xhc3Ncblx0dmFyIHdyYXAgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuXG5cdGlmKCEvZnVsbHNjcmVlbi8udGVzdCh3cmFwLnByZXZpb3VzU2libGluZy5jbGFzc05hbWUpKSB7XG5cdFx0d3JhcC5wcmV2aW91c1NpYmxpbmcuY2xhc3NOYW1lICs9IFwiIGZ1bGxzY3JlZW5cIjtcblx0fSBlbHNlIHtcblx0XHR3cmFwLnByZXZpb3VzU2libGluZy5jbGFzc05hbWUgPSB3cmFwLnByZXZpb3VzU2libGluZy5jbGFzc05hbWUucmVwbGFjZSgvXFxzKmZ1bGxzY3JlZW5cXGIvLCBcIlwiKTtcblx0fVxuXG5cblx0Ly8gVXBkYXRlIHRvb2xiYXIgYnV0dG9uXG5cdHZhciB0b29sYmFyQnV0dG9uID0gZWRpdG9yLnRvb2xiYXJFbGVtZW50cy5mdWxsc2NyZWVuO1xuXG5cdGlmKCEvYWN0aXZlLy50ZXN0KHRvb2xiYXJCdXR0b24uY2xhc3NOYW1lKSkge1xuXHRcdHRvb2xiYXJCdXR0b24uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuXHR9IGVsc2Uge1xuXHRcdHRvb2xiYXJCdXR0b24uY2xhc3NOYW1lID0gdG9vbGJhckJ1dHRvbi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKmFjdGl2ZVxccyovZywgXCJcIik7XG5cdH1cblxuXG5cdC8vIEhpZGUgc2lkZSBieSBzaWRlIGlmIG5lZWRlZFxuXHR2YXIgc2lkZWJ5c2lkZSA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCkubmV4dFNpYmxpbmc7XG5cdGlmKC9lZGl0b3ItcHJldmlldy1hY3RpdmUtc2lkZS8udGVzdChzaWRlYnlzaWRlLmNsYXNzTmFtZSkpXG5cdFx0dG9nZ2xlU2lkZUJ5U2lkZShlZGl0b3IpO1xufVxuXG5cbi8qKlxuICogQWN0aW9uIGZvciB0b2dnbGluZyBib2xkLlxuICovXG5mdW5jdGlvbiB0b2dnbGVCb2xkKGVkaXRvcikge1xuXHRfdG9nZ2xlQmxvY2soZWRpdG9yLCBcImJvbGRcIiwgZWRpdG9yLm9wdGlvbnMuYmxvY2tTdHlsZXMuYm9sZCk7XG59XG5cblxuLyoqXG4gKiBBY3Rpb24gZm9yIHRvZ2dsaW5nIGl0YWxpYy5cbiAqL1xuZnVuY3Rpb24gdG9nZ2xlSXRhbGljKGVkaXRvcikge1xuXHRfdG9nZ2xlQmxvY2soZWRpdG9yLCBcIml0YWxpY1wiLCBlZGl0b3Iub3B0aW9ucy5ibG9ja1N0eWxlcy5pdGFsaWMpO1xufVxuXG5cbi8qKlxuICogQWN0aW9uIGZvciB0b2dnbGluZyBzdHJpa2V0aHJvdWdoLlxuICovXG5mdW5jdGlvbiB0b2dnbGVTdHJpa2V0aHJvdWdoKGVkaXRvcikge1xuXHRfdG9nZ2xlQmxvY2soZWRpdG9yLCBcInN0cmlrZXRocm91Z2hcIiwgXCJ+flwiKTtcbn1cblxuLyoqXG4gKiBBY3Rpb24gZm9yIHRvZ2dsaW5nIGNvZGUgYmxvY2suXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUNvZGVCbG9jayhlZGl0b3IpIHtcblx0dmFyIGZlbmNlQ2hhcnNUb0luc2VydCA9IGVkaXRvci5vcHRpb25zLmJsb2NrU3R5bGVzLmNvZGU7XG5cblx0ZnVuY3Rpb24gZmVuY2luZ19saW5lKGxpbmUpIHtcblx0XHQvKiByZXR1cm4gdHJ1ZSwgaWYgdGhpcyBpcyBhIGBgYCBvciB+fn4gbGluZSAqL1xuXHRcdGlmKHR5cGVvZiBsaW5lICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHR0aHJvdyBcImZlbmNpbmdfbGluZSgpIHRha2VzIGEgJ2xpbmUnIG9iamVjdCAobm90IGEgbGluZSBudW1iZXIsIG9yIGxpbmUgdGV4dCkuICBHb3Q6IFwiICsgdHlwZW9mIGxpbmUgKyBcIjogXCIgKyBsaW5lO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZS5zdHlsZXMgJiYgbGluZS5zdHlsZXNbMl0gJiYgbGluZS5zdHlsZXNbMl0uaW5kZXhPZihcImZvcm1hdHRpbmctY29kZS1ibG9ja1wiKSAhPT0gLTE7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2tlbl9zdGF0ZSh0b2tlbikge1xuXHRcdC8vIGJhc2UgZ29lcyBhbiBleHRyYSBsZXZlbCBkZWVwIHdoZW4gbW9kZSBiYWNrZHJvcHMgYXJlIHVzZWQsIGUuZy4gc3BlbGxjaGVja2VyIG9uXG5cdFx0cmV0dXJuIHRva2VuLnN0YXRlLmJhc2UuYmFzZSB8fCB0b2tlbi5zdGF0ZS5iYXNlO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29kZV90eXBlKGNtLCBsaW5lX251bSwgbGluZSwgZmlyc3RUb2ssIGxhc3RUb2spIHtcblx0XHQvKlxuXHRcdCAqIFJldHVybiBcInNpbmdsZVwiLCBcImluZGVudGVkXCIsIFwiZmVuY2VkXCIgb3IgZmFsc2Vcblx0XHQgKlxuXHRcdCAqIGNtIGFuZCBsaW5lX251bSBhcmUgcmVxdWlyZWQuICBPdGhlcnMgYXJlIG9wdGlvbmFsIGZvciBlZmZpY2llbmN5XG5cdFx0ICogICBUbyBjaGVjayBpbiB0aGUgbWlkZGxlIG9mIGEgbGluZSwgcGFzcyBpbiBmaXJzdFRvayB5b3Vyc2VsZi5cblx0XHQgKi9cblx0XHRsaW5lID0gbGluZSB8fCBjbS5nZXRMaW5lSGFuZGxlKGxpbmVfbnVtKTtcblx0XHRmaXJzdFRvayA9IGZpcnN0VG9rIHx8IGNtLmdldFRva2VuQXQoe1xuXHRcdFx0bGluZTogbGluZV9udW0sXG5cdFx0XHRjaDogMVxuXHRcdH0pO1xuXHRcdGxhc3RUb2sgPSBsYXN0VG9rIHx8ICghIWxpbmUudGV4dCAmJiBjbS5nZXRUb2tlbkF0KHtcblx0XHRcdGxpbmU6IGxpbmVfbnVtLFxuXHRcdFx0Y2g6IGxpbmUudGV4dC5sZW5ndGggLSAxXG5cdFx0fSkpO1xuXHRcdHZhciB0eXBlcyA9IGZpcnN0VG9rLnR5cGUgPyBmaXJzdFRvay50eXBlLnNwbGl0KFwiIFwiKSA6IFtdO1xuXHRcdGlmKGxhc3RUb2sgJiYgdG9rZW5fc3RhdGUobGFzdFRvaykuaW5kZW50ZWRDb2RlKSB7XG5cdFx0XHQvLyBoYXZlIHRvIGNoZWNrIGxhc3QgY2hhciwgc2luY2UgZmlyc3QgY2hhcnMgb2YgZmlyc3QgbGluZSBhcmVuXCJ0IG1hcmtlZCBhcyBpbmRlbnRlZFxuXHRcdFx0cmV0dXJuIFwiaW5kZW50ZWRcIjtcblx0XHR9IGVsc2UgaWYodHlwZXMuaW5kZXhPZihcImNvbW1lbnRcIikgPT09IC0xKSB7XG5cdFx0XHQvLyBoYXMgdG8gYmUgYWZ0ZXIgXCJpbmRlbnRlZFwiIGNoZWNrLCBzaW5jZSBmaXJzdCBjaGFycyBvZiBmaXJzdCBpbmRlbnRlZCBsaW5lIGFyZW5cInQgbWFya2VkIGFzIHN1Y2hcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2UgaWYodG9rZW5fc3RhdGUoZmlyc3RUb2spLmZlbmNlZENoYXJzIHx8IHRva2VuX3N0YXRlKGxhc3RUb2spLmZlbmNlZENoYXJzIHx8IGZlbmNpbmdfbGluZShsaW5lKSkge1xuXHRcdFx0cmV0dXJuIFwiZmVuY2VkXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcInNpbmdsZVwiO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGluc2VydEZlbmNpbmdBdFNlbGVjdGlvbihjbSwgY3VyX3N0YXJ0LCBjdXJfZW5kLCBmZW5jZUNoYXJzVG9JbnNlcnQpIHtcblx0XHR2YXIgc3RhcnRfbGluZV9zZWwgPSBjdXJfc3RhcnQubGluZSArIDEsXG5cdFx0XHRlbmRfbGluZV9zZWwgPSBjdXJfZW5kLmxpbmUgKyAxLFxuXHRcdFx0c2VsX211bHRpID0gY3VyX3N0YXJ0LmxpbmUgIT09IGN1cl9lbmQubGluZSxcblx0XHRcdHJlcGxfc3RhcnQgPSBmZW5jZUNoYXJzVG9JbnNlcnQgKyBcIlxcblwiLFxuXHRcdFx0cmVwbF9lbmQgPSBcIlxcblwiICsgZmVuY2VDaGFyc1RvSW5zZXJ0O1xuXHRcdGlmKHNlbF9tdWx0aSkge1xuXHRcdFx0ZW5kX2xpbmVfc2VsKys7XG5cdFx0fVxuXHRcdC8vIGhhbmRsZSBsYXN0IGNoYXIgaW5jbHVkaW5nIFxcbiBvciBub3Rcblx0XHRpZihzZWxfbXVsdGkgJiYgY3VyX2VuZC5jaCA9PT0gMCkge1xuXHRcdFx0cmVwbF9lbmQgPSBmZW5jZUNoYXJzVG9JbnNlcnQgKyBcIlxcblwiO1xuXHRcdFx0ZW5kX2xpbmVfc2VsLS07XG5cdFx0fVxuXHRcdF9yZXBsYWNlU2VsZWN0aW9uKGNtLCBmYWxzZSwgW3JlcGxfc3RhcnQsIHJlcGxfZW5kXSk7XG5cdFx0Y20uc2V0U2VsZWN0aW9uKHtcblx0XHRcdGxpbmU6IHN0YXJ0X2xpbmVfc2VsLFxuXHRcdFx0Y2g6IDBcblx0XHR9LCB7XG5cdFx0XHRsaW5lOiBlbmRfbGluZV9zZWwsXG5cdFx0XHRjaDogMFxuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3IsXG5cdFx0Y3VyX3N0YXJ0ID0gY20uZ2V0Q3Vyc29yKFwic3RhcnRcIiksXG5cdFx0Y3VyX2VuZCA9IGNtLmdldEN1cnNvcihcImVuZFwiKSxcblx0XHR0b2sgPSBjbS5nZXRUb2tlbkF0KHtcblx0XHRcdGxpbmU6IGN1cl9zdGFydC5saW5lLFxuXHRcdFx0Y2g6IGN1cl9zdGFydC5jaCB8fCAxXG5cdFx0fSksIC8vIGF2b2lkIGNoIDAgd2hpY2ggaXMgYSBjdXJzb3IgcG9zIGJ1dCBub3QgdG9rZW5cblx0XHRsaW5lID0gY20uZ2V0TGluZUhhbmRsZShjdXJfc3RhcnQubGluZSksXG5cdFx0aXNfY29kZSA9IGNvZGVfdHlwZShjbSwgY3VyX3N0YXJ0LmxpbmUsIGxpbmUsIHRvayk7XG5cdHZhciBibG9ja19zdGFydCwgYmxvY2tfZW5kLCBsaW5lQ291bnQ7XG5cblx0aWYoaXNfY29kZSA9PT0gXCJzaW5nbGVcIikge1xuXHRcdC8vIHNpbWlsYXIgdG8gc29tZSBTaW1wbGVNREUgX3RvZ2dsZUJsb2NrIGxvZ2ljXG5cdFx0dmFyIHN0YXJ0ID0gbGluZS50ZXh0LnNsaWNlKDAsIGN1cl9zdGFydC5jaCkucmVwbGFjZShcImBcIiwgXCJcIiksXG5cdFx0XHRlbmQgPSBsaW5lLnRleHQuc2xpY2UoY3VyX3N0YXJ0LmNoKS5yZXBsYWNlKFwiYFwiLCBcIlwiKTtcblx0XHRjbS5yZXBsYWNlUmFuZ2Uoc3RhcnQgKyBlbmQsIHtcblx0XHRcdGxpbmU6IGN1cl9zdGFydC5saW5lLFxuXHRcdFx0Y2g6IDBcblx0XHR9LCB7XG5cdFx0XHRsaW5lOiBjdXJfc3RhcnQubGluZSxcblx0XHRcdGNoOiA5OTk5OTk5OTk5OTk5OVxuXHRcdH0pO1xuXHRcdGN1cl9zdGFydC5jaC0tO1xuXHRcdGlmKGN1cl9zdGFydCAhPT0gY3VyX2VuZCkge1xuXHRcdFx0Y3VyX2VuZC5jaC0tO1xuXHRcdH1cblx0XHRjbS5zZXRTZWxlY3Rpb24oY3VyX3N0YXJ0LCBjdXJfZW5kKTtcblx0XHRjbS5mb2N1cygpO1xuXHR9IGVsc2UgaWYoaXNfY29kZSA9PT0gXCJmZW5jZWRcIikge1xuXHRcdGlmKGN1cl9zdGFydC5saW5lICE9PSBjdXJfZW5kLmxpbmUgfHwgY3VyX3N0YXJ0LmNoICE9PSBjdXJfZW5kLmNoKSB7XG5cdFx0XHQvLyB1c2Ugc2VsZWN0aW9uXG5cblx0XHRcdC8vIGZpbmQgdGhlIGZlbmNlZCBsaW5lIHNvIHdlIGtub3cgd2hhdCB0eXBlIGl0IGlzICh0aWxkZSwgYmFja3RpY2tzLCBudW1iZXIgb2YgdGhlbSlcblx0XHRcdGZvcihibG9ja19zdGFydCA9IGN1cl9zdGFydC5saW5lOyBibG9ja19zdGFydCA+PSAwOyBibG9ja19zdGFydC0tKSB7XG5cdFx0XHRcdGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX3N0YXJ0KTtcblx0XHRcdFx0aWYoZmVuY2luZ19saW5lKGxpbmUpKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHZhciBmZW5jZWRUb2sgPSBjbS5nZXRUb2tlbkF0KHtcblx0XHRcdFx0bGluZTogYmxvY2tfc3RhcnQsXG5cdFx0XHRcdGNoOiAxXG5cdFx0XHR9KTtcblx0XHRcdHZhciBmZW5jZV9jaGFycyA9IHRva2VuX3N0YXRlKGZlbmNlZFRvaykuZmVuY2VkQ2hhcnM7XG5cdFx0XHR2YXIgc3RhcnRfdGV4dCwgc3RhcnRfbGluZTtcblx0XHRcdHZhciBlbmRfdGV4dCwgZW5kX2xpbmU7XG5cdFx0XHQvLyBjaGVjayBmb3Igc2VsZWN0aW9uIGdvaW5nIHVwIGFnYWluc3QgZmVuY2VkIGxpbmVzLCBpbiB3aGljaCBjYXNlIHdlIGRvbid0IHdhbnQgdG8gYWRkIG1vcmUgZmVuY2luZ1xuXHRcdFx0aWYoZmVuY2luZ19saW5lKGNtLmdldExpbmVIYW5kbGUoY3VyX3N0YXJ0LmxpbmUpKSkge1xuXHRcdFx0XHRzdGFydF90ZXh0ID0gXCJcIjtcblx0XHRcdFx0c3RhcnRfbGluZSA9IGN1cl9zdGFydC5saW5lO1xuXHRcdFx0fSBlbHNlIGlmKGZlbmNpbmdfbGluZShjbS5nZXRMaW5lSGFuZGxlKGN1cl9zdGFydC5saW5lIC0gMSkpKSB7XG5cdFx0XHRcdHN0YXJ0X3RleHQgPSBcIlwiO1xuXHRcdFx0XHRzdGFydF9saW5lID0gY3VyX3N0YXJ0LmxpbmUgLSAxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3RhcnRfdGV4dCA9IGZlbmNlX2NoYXJzICsgXCJcXG5cIjtcblx0XHRcdFx0c3RhcnRfbGluZSA9IGN1cl9zdGFydC5saW5lO1xuXHRcdFx0fVxuXHRcdFx0aWYoZmVuY2luZ19saW5lKGNtLmdldExpbmVIYW5kbGUoY3VyX2VuZC5saW5lKSkpIHtcblx0XHRcdFx0ZW5kX3RleHQgPSBcIlwiO1xuXHRcdFx0XHRlbmRfbGluZSA9IGN1cl9lbmQubGluZTtcblx0XHRcdFx0aWYoY3VyX2VuZC5jaCA9PT0gMCkge1xuXHRcdFx0XHRcdGVuZF9saW5lICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihjdXJfZW5kLmNoICE9PSAwICYmIGZlbmNpbmdfbGluZShjbS5nZXRMaW5lSGFuZGxlKGN1cl9lbmQubGluZSArIDEpKSkge1xuXHRcdFx0XHRlbmRfdGV4dCA9IFwiXCI7XG5cdFx0XHRcdGVuZF9saW5lID0gY3VyX2VuZC5saW5lICsgMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVuZF90ZXh0ID0gZmVuY2VfY2hhcnMgKyBcIlxcblwiO1xuXHRcdFx0XHRlbmRfbGluZSA9IGN1cl9lbmQubGluZSArIDE7XG5cdFx0XHR9XG5cdFx0XHRpZihjdXJfZW5kLmNoID09PSAwKSB7XG5cdFx0XHRcdC8vIGZ1bGwgbGFzdCBsaW5lIHNlbGVjdGVkLCBwdXR0aW5nIGN1cnNvciBhdCBiZWdpbm5pbmcgb2YgbmV4dFxuXHRcdFx0XHRlbmRfbGluZSAtPSAxO1xuXHRcdFx0fVxuXHRcdFx0Y20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBlbmQgbGluZSBmaXJzdCwgc28gdGhhdCBsaW5lIG51bWJlcnMgZG9uJ3QgY2hhbmdlXG5cdFx0XHRcdGNtLnJlcGxhY2VSYW5nZShlbmRfdGV4dCwge1xuXHRcdFx0XHRcdGxpbmU6IGVuZF9saW5lLFxuXHRcdFx0XHRcdGNoOiAwXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsaW5lOiBlbmRfbGluZSArIChlbmRfdGV4dCA/IDAgOiAxKSxcblx0XHRcdFx0XHRjaDogMFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0Y20ucmVwbGFjZVJhbmdlKHN0YXJ0X3RleHQsIHtcblx0XHRcdFx0XHRsaW5lOiBzdGFydF9saW5lLFxuXHRcdFx0XHRcdGNoOiAwXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsaW5lOiBzdGFydF9saW5lICsgKHN0YXJ0X3RleHQgPyAwIDogMSksXG5cdFx0XHRcdFx0Y2g6IDBcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdGNtLnNldFNlbGVjdGlvbih7XG5cdFx0XHRcdGxpbmU6IHN0YXJ0X2xpbmUgKyAoc3RhcnRfdGV4dCA/IDEgOiAwKSxcblx0XHRcdFx0Y2g6IDBcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogZW5kX2xpbmUgKyAoc3RhcnRfdGV4dCA/IDEgOiAtMSksXG5cdFx0XHRcdGNoOiAwXG5cdFx0XHR9KTtcblx0XHRcdGNtLmZvY3VzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIG5vIHNlbGVjdGlvbiwgc2VhcmNoIGZvciBlbmRzIG9mIHRoaXMgZmVuY2VkIGJsb2NrXG5cdFx0XHR2YXIgc2VhcmNoX2Zyb20gPSBjdXJfc3RhcnQubGluZTtcblx0XHRcdGlmKGZlbmNpbmdfbGluZShjbS5nZXRMaW5lSGFuZGxlKGN1cl9zdGFydC5saW5lKSkpIHsgLy8gZ2V0cyBhIGxpdHRsZSB0cmlja3kgaWYgY3Vyc29yIGlzIHJpZ2h0IG9uIGEgZmVuY2VkIGxpbmVcblx0XHRcdFx0aWYoY29kZV90eXBlKGNtLCBjdXJfc3RhcnQubGluZSArIDEpID09PSBcImZlbmNlZFwiKSB7XG5cdFx0XHRcdFx0YmxvY2tfc3RhcnQgPSBjdXJfc3RhcnQubGluZTtcblx0XHRcdFx0XHRzZWFyY2hfZnJvbSA9IGN1cl9zdGFydC5saW5lICsgMTsgLy8gZm9yIHNlYXJjaGluZyBmb3IgXCJlbmRcIlxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJsb2NrX2VuZCA9IGN1cl9zdGFydC5saW5lO1xuXHRcdFx0XHRcdHNlYXJjaF9mcm9tID0gY3VyX3N0YXJ0LmxpbmUgLSAxOyAvLyBmb3Igc2VhcmNoaW5nIGZvciBcInN0YXJ0XCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoYmxvY2tfc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRmb3IoYmxvY2tfc3RhcnQgPSBzZWFyY2hfZnJvbTsgYmxvY2tfc3RhcnQgPj0gMDsgYmxvY2tfc3RhcnQtLSkge1xuXHRcdFx0XHRcdGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX3N0YXJ0KTtcblx0XHRcdFx0XHRpZihmZW5jaW5nX2xpbmUobGluZSkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoYmxvY2tfZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bGluZUNvdW50ID0gY20ubGluZUNvdW50KCk7XG5cdFx0XHRcdGZvcihibG9ja19lbmQgPSBzZWFyY2hfZnJvbTsgYmxvY2tfZW5kIDwgbGluZUNvdW50OyBibG9ja19lbmQrKykge1xuXHRcdFx0XHRcdGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX2VuZCk7XG5cdFx0XHRcdFx0aWYoZmVuY2luZ19saW5lKGxpbmUpKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcblx0XHRcdFx0Y20ucmVwbGFjZVJhbmdlKFwiXCIsIHtcblx0XHRcdFx0XHRsaW5lOiBibG9ja19zdGFydCxcblx0XHRcdFx0XHRjaDogMFxuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0bGluZTogYmxvY2tfc3RhcnQgKyAxLFxuXHRcdFx0XHRcdGNoOiAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjbS5yZXBsYWNlUmFuZ2UoXCJcIiwge1xuXHRcdFx0XHRcdGxpbmU6IGJsb2NrX2VuZCAtIDEsXG5cdFx0XHRcdFx0Y2g6IDBcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGxpbmU6IGJsb2NrX2VuZCxcblx0XHRcdFx0XHRjaDogMFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0Y20uZm9jdXMoKTtcblx0XHR9XG5cdH0gZWxzZSBpZihpc19jb2RlID09PSBcImluZGVudGVkXCIpIHtcblx0XHRpZihjdXJfc3RhcnQubGluZSAhPT0gY3VyX2VuZC5saW5lIHx8IGN1cl9zdGFydC5jaCAhPT0gY3VyX2VuZC5jaCkge1xuXHRcdFx0Ly8gdXNlIHNlbGVjdGlvblxuXHRcdFx0YmxvY2tfc3RhcnQgPSBjdXJfc3RhcnQubGluZTtcblx0XHRcdGJsb2NrX2VuZCA9IGN1cl9lbmQubGluZTtcblx0XHRcdGlmKGN1cl9lbmQuY2ggPT09IDApIHtcblx0XHRcdFx0YmxvY2tfZW5kLS07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIG5vIHNlbGVjdGlvbiwgc2VhcmNoIGZvciBlbmRzIG9mIHRoaXMgaW5kZW50ZWQgYmxvY2tcblx0XHRcdGZvcihibG9ja19zdGFydCA9IGN1cl9zdGFydC5saW5lOyBibG9ja19zdGFydCA+PSAwOyBibG9ja19zdGFydC0tKSB7XG5cdFx0XHRcdGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX3N0YXJ0KTtcblx0XHRcdFx0aWYobGluZS50ZXh0Lm1hdGNoKC9eXFxzKiQvKSkge1xuXHRcdFx0XHRcdC8vIGVtcHR5IG9yIGFsbCB3aGl0ZXNwYWNlIC0ga2VlcCBnb2luZ1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmKGNvZGVfdHlwZShjbSwgYmxvY2tfc3RhcnQsIGxpbmUpICE9PSBcImluZGVudGVkXCIpIHtcblx0XHRcdFx0XHRcdGJsb2NrX3N0YXJ0ICs9IDE7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGxpbmVDb3VudCA9IGNtLmxpbmVDb3VudCgpO1xuXHRcdFx0Zm9yKGJsb2NrX2VuZCA9IGN1cl9zdGFydC5saW5lOyBibG9ja19lbmQgPCBsaW5lQ291bnQ7IGJsb2NrX2VuZCsrKSB7XG5cdFx0XHRcdGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX2VuZCk7XG5cdFx0XHRcdGlmKGxpbmUudGV4dC5tYXRjaCgvXlxccyokLykpIHtcblx0XHRcdFx0XHQvLyBlbXB0eSBvciBhbGwgd2hpdGVzcGFjZSAtIGtlZXAgZ29pbmdcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihjb2RlX3R5cGUoY20sIGJsb2NrX2VuZCwgbGluZSkgIT09IFwiaW5kZW50ZWRcIikge1xuXHRcdFx0XHRcdFx0YmxvY2tfZW5kIC09IDE7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gaWYgd2UgYXJlIGdvaW5nIHRvIHVuLWluZGVudCBiYXNlZCBvbiBhIHNlbGVjdGVkIHNldCBvZiBsaW5lcywgYW5kIHRoZSBuZXh0IGxpbmUgaXMgaW5kZW50ZWQgdG9vLCB3ZSBuZWVkIHRvXG5cdFx0Ly8gaW5zZXJ0IGEgYmxhbmsgbGluZSBzbyB0aGF0IHRoZSBuZXh0IGxpbmUocykgY29udGludWUgdG8gYmUgaW5kZW50ZWQgY29kZVxuXHRcdHZhciBuZXh0X2xpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGJsb2NrX2VuZCArIDEpLFxuXHRcdFx0bmV4dF9saW5lX2xhc3RfdG9rID0gbmV4dF9saW5lICYmIGNtLmdldFRva2VuQXQoe1xuXHRcdFx0XHRsaW5lOiBibG9ja19lbmQgKyAxLFxuXHRcdFx0XHRjaDogbmV4dF9saW5lLnRleHQubGVuZ3RoIC0gMVxuXHRcdFx0fSksXG5cdFx0XHRuZXh0X2xpbmVfaW5kZW50ZWQgPSBuZXh0X2xpbmVfbGFzdF90b2sgJiYgdG9rZW5fc3RhdGUobmV4dF9saW5lX2xhc3RfdG9rKS5pbmRlbnRlZENvZGU7XG5cdFx0aWYobmV4dF9saW5lX2luZGVudGVkKSB7XG5cdFx0XHRjbS5yZXBsYWNlUmFuZ2UoXCJcXG5cIiwge1xuXHRcdFx0XHRsaW5lOiBibG9ja19lbmQgKyAxLFxuXHRcdFx0XHRjaDogMFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gYmxvY2tfc3RhcnQ7IGkgPD0gYmxvY2tfZW5kOyBpKyspIHtcblx0XHRcdGNtLmluZGVudExpbmUoaSwgXCJzdWJ0cmFjdFwiKTsgLy8gVE9ETzogdGhpcyBkb2Vzbid0IGdldCB0cmFja2VkIGluIHRoZSBoaXN0b3J5LCBzbyBjYW4ndCBiZSB1bmRvbmUgOihcblx0XHR9XG5cdFx0Y20uZm9jdXMoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBpbnNlcnQgY29kZSBmb3JtYXR0aW5nXG5cdFx0dmFyIG5vX3NlbF9hbmRfc3RhcnRpbmdfb2ZfbGluZSA9IChjdXJfc3RhcnQubGluZSA9PT0gY3VyX2VuZC5saW5lICYmIGN1cl9zdGFydC5jaCA9PT0gY3VyX2VuZC5jaCAmJiBjdXJfc3RhcnQuY2ggPT09IDApO1xuXHRcdHZhciBzZWxfbXVsdGkgPSBjdXJfc3RhcnQubGluZSAhPT0gY3VyX2VuZC5saW5lO1xuXHRcdGlmKG5vX3NlbF9hbmRfc3RhcnRpbmdfb2ZfbGluZSB8fCBzZWxfbXVsdGkpIHtcblx0XHRcdGluc2VydEZlbmNpbmdBdFNlbGVjdGlvbihjbSwgY3VyX3N0YXJ0LCBjdXJfZW5kLCBmZW5jZUNoYXJzVG9JbnNlcnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfcmVwbGFjZVNlbGVjdGlvbihjbSwgZmFsc2UsIFtcImBcIiwgXCJgXCJdKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBY3Rpb24gZm9yIHRvZ2dsaW5nIGJsb2NrcXVvdGUuXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUJsb2NrcXVvdGUoZWRpdG9yKSB7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHRfdG9nZ2xlTGluZShjbSwgXCJxdW90ZVwiKTtcbn1cblxuLyoqXG4gKiBBY3Rpb24gZm9yIHRvZ2dsaW5nIGhlYWRpbmcgc2l6ZTogbm9ybWFsIC0+IGgxIC0+IGgyIC0+IGgzIC0+IGg0IC0+IGg1IC0+IGg2IC0+IG5vcm1hbFxuICovXG5mdW5jdGlvbiB0b2dnbGVIZWFkaW5nU21hbGxlcihlZGl0b3IpIHtcblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3I7XG5cdF90b2dnbGVIZWFkaW5nKGNtLCBcInNtYWxsZXJcIik7XG59XG5cbi8qKlxuICogQWN0aW9uIGZvciB0b2dnbGluZyBoZWFkaW5nIHNpemU6IG5vcm1hbCAtPiBoNiAtPiBoNSAtPiBoNCAtPiBoMyAtPiBoMiAtPiBoMSAtPiBub3JtYWxcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlSGVhZGluZ0JpZ2dlcihlZGl0b3IpIHtcblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3I7XG5cdF90b2dnbGVIZWFkaW5nKGNtLCBcImJpZ2dlclwiKTtcbn1cblxuLyoqXG4gKiBBY3Rpb24gZm9yIHRvZ2dsaW5nIGhlYWRpbmcgc2l6ZSAxXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUhlYWRpbmcxKGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0X3RvZ2dsZUhlYWRpbmcoY20sIHVuZGVmaW5lZCwgMSk7XG59XG5cbi8qKlxuICogQWN0aW9uIGZvciB0b2dnbGluZyBoZWFkaW5nIHNpemUgMlxuICovXG5mdW5jdGlvbiB0b2dnbGVIZWFkaW5nMihlZGl0b3IpIHtcblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3I7XG5cdF90b2dnbGVIZWFkaW5nKGNtLCB1bmRlZmluZWQsIDIpO1xufVxuXG4vKipcbiAqIEFjdGlvbiBmb3IgdG9nZ2xpbmcgaGVhZGluZyBzaXplIDNcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlSGVhZGluZzMoZWRpdG9yKSB7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHRfdG9nZ2xlSGVhZGluZyhjbSwgdW5kZWZpbmVkLCAzKTtcbn1cblxuXG4vKipcbiAqIEFjdGlvbiBmb3IgdG9nZ2xpbmcgdWwuXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZVVub3JkZXJlZExpc3QoZWRpdG9yKSB7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHRfdG9nZ2xlTGluZShjbSwgXCJ1bm9yZGVyZWQtbGlzdFwiKTtcbn1cblxuXG4vKipcbiAqIEFjdGlvbiBmb3IgdG9nZ2xpbmcgb2wuXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZU9yZGVyZWRMaXN0KGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0X3RvZ2dsZUxpbmUoY20sIFwib3JkZXJlZC1saXN0XCIpO1xufVxuXG4vKipcbiAqIEFjdGlvbiBmb3IgY2xlYW4gYmxvY2sgKHJlbW92ZSBoZWFkbGluZSwgbGlzdCwgYmxvY2txdW90ZSBjb2RlLCBtYXJrZXJzKVxuICovXG5mdW5jdGlvbiBjbGVhbkJsb2NrKGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0X2NsZWFuQmxvY2soY20pO1xufVxuXG4vKipcbiAqIEFjdGlvbiBmb3IgZHJhd2luZyBhIGxpbmsuXG4gKi9cbmZ1bmN0aW9uIGRyYXdMaW5rKGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0dmFyIHN0YXQgPSBnZXRTdGF0ZShjbSk7XG5cdHZhciBvcHRpb25zID0gZWRpdG9yLm9wdGlvbnM7XG5cdHZhciB1cmwgPSBcImh0dHA6Ly9cIjtcblx0aWYob3B0aW9ucy5wcm9tcHRVUkxzKSB7XG5cdFx0dXJsID0gcHJvbXB0KG9wdGlvbnMucHJvbXB0VGV4dHMubGluayk7XG5cdFx0aWYoIXVybCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRfcmVwbGFjZVNlbGVjdGlvbihjbSwgc3RhdC5saW5rLCBvcHRpb25zLmluc2VydFRleHRzLmxpbmssIHVybCk7XG59XG5cbi8qKlxuICogQWN0aW9uIGZvciBkcmF3aW5nIGFuIGltZy5cbiAqL1xuZnVuY3Rpb24gZHJhd0ltYWdlKGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0dmFyIHN0YXQgPSBnZXRTdGF0ZShjbSk7XG5cdHZhciBvcHRpb25zID0gZWRpdG9yLm9wdGlvbnM7XG5cdHZhciB1cmwgPSBcImh0dHA6Ly9cIjtcblx0aWYob3B0aW9ucy5wcm9tcHRVUkxzKSB7XG5cdFx0dXJsID0gcHJvbXB0KG9wdGlvbnMucHJvbXB0VGV4dHMuaW1hZ2UpO1xuXHRcdGlmKCF1cmwpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0X3JlcGxhY2VTZWxlY3Rpb24oY20sIHN0YXQuaW1hZ2UsIG9wdGlvbnMuaW5zZXJ0VGV4dHMuaW1hZ2UsIHVybCk7XG59XG5cbi8qKlxuICogQWN0aW9uIGZvciBkcmF3aW5nIGEgdGFibGUuXG4gKi9cbmZ1bmN0aW9uIGRyYXdUYWJsZShlZGl0b3IpIHtcblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3I7XG5cdHZhciBzdGF0ID0gZ2V0U3RhdGUoY20pO1xuXHR2YXIgb3B0aW9ucyA9IGVkaXRvci5vcHRpb25zO1xuXHRfcmVwbGFjZVNlbGVjdGlvbihjbSwgc3RhdC50YWJsZSwgb3B0aW9ucy5pbnNlcnRUZXh0cy50YWJsZSk7XG59XG5cbi8qKlxuICogQWN0aW9uIGZvciBkcmF3aW5nIGEgaG9yaXpvbnRhbCBydWxlLlxuICovXG5mdW5jdGlvbiBkcmF3SG9yaXpvbnRhbFJ1bGUoZWRpdG9yKSB7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHR2YXIgc3RhdCA9IGdldFN0YXRlKGNtKTtcblx0dmFyIG9wdGlvbnMgPSBlZGl0b3Iub3B0aW9ucztcblx0X3JlcGxhY2VTZWxlY3Rpb24oY20sIHN0YXQuaW1hZ2UsIG9wdGlvbnMuaW5zZXJ0VGV4dHMuaG9yaXpvbnRhbFJ1bGUpO1xufVxuXG5cbi8qKlxuICogVW5kbyBhY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHVuZG8oZWRpdG9yKSB7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHRjbS51bmRvKCk7XG5cdGNtLmZvY3VzKCk7XG59XG5cblxuLyoqXG4gKiBSZWRvIGFjdGlvbi5cbiAqL1xuZnVuY3Rpb24gcmVkbyhlZGl0b3IpIHtcblx0dmFyIGNtID0gZWRpdG9yLmNvZGVtaXJyb3I7XG5cdGNtLnJlZG8oKTtcblx0Y20uZm9jdXMoKTtcbn1cblxuXG4vKipcbiAqIFRvZ2dsZSBzaWRlIGJ5IHNpZGUgcHJldmlld1xuICovXG5mdW5jdGlvbiB0b2dnbGVTaWRlQnlTaWRlKGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0dmFyIHdyYXBwZXIgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuXHR2YXIgcHJldmlldyA9IHdyYXBwZXIubmV4dFNpYmxpbmc7XG5cdHZhciB0b29sYmFyQnV0dG9uID0gZWRpdG9yLnRvb2xiYXJFbGVtZW50c1tcInNpZGUtYnktc2lkZVwiXTtcblx0dmFyIHVzZVNpZGVCeVNpZGVMaXN0ZW5lciA9IGZhbHNlO1xuXHRpZigvZWRpdG9yLXByZXZpZXctYWN0aXZlLXNpZGUvLnRlc3QocHJldmlldy5jbGFzc05hbWUpKSB7XG5cdFx0cHJldmlldy5jbGFzc05hbWUgPSBwcmV2aWV3LmNsYXNzTmFtZS5yZXBsYWNlKFxuXHRcdFx0L1xccyplZGl0b3ItcHJldmlldy1hY3RpdmUtc2lkZVxccyovZywgXCJcIlxuXHRcdCk7XG5cdFx0dG9vbGJhckJ1dHRvbi5jbGFzc05hbWUgPSB0b29sYmFyQnV0dG9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqYWN0aXZlXFxzKi9nLCBcIlwiKTtcblx0XHR3cmFwcGVyLmNsYXNzTmFtZSA9IHdyYXBwZXIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccypDb2RlTWlycm9yLXNpZGVkXFxzKi9nLCBcIiBcIik7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gV2hlbiB0aGUgcHJldmlldyBidXR0b24gaXMgY2xpY2tlZCBmb3IgdGhlIGZpcnN0IHRpbWUsXG5cdFx0Ly8gZ2l2ZSBzb21lIHRpbWUgZm9yIHRoZSB0cmFuc2l0aW9uIGZyb20gZWRpdG9yLmNzcyB0byBmaXJlIGFuZCB0aGUgdmlldyB0byBzbGlkZSBmcm9tIHJpZ2h0IHRvIGxlZnQsXG5cdFx0Ly8gaW5zdGVhZCBvZiBqdXN0IGFwcGVhcmluZy5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoIWNtLmdldE9wdGlvbihcImZ1bGxTY3JlZW5cIikpXG5cdFx0XHRcdHRvZ2dsZUZ1bGxTY3JlZW4oZWRpdG9yKTtcblx0XHRcdHByZXZpZXcuY2xhc3NOYW1lICs9IFwiIGVkaXRvci1wcmV2aWV3LWFjdGl2ZS1zaWRlXCI7XG5cdFx0fSwgMSk7XG5cdFx0dG9vbGJhckJ1dHRvbi5jbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG5cdFx0d3JhcHBlci5jbGFzc05hbWUgKz0gXCIgQ29kZU1pcnJvci1zaWRlZFwiO1xuXHRcdHVzZVNpZGVCeVNpZGVMaXN0ZW5lciA9IHRydWU7XG5cdH1cblxuXHQvLyBIaWRlIG5vcm1hbCBwcmV2aWV3IGlmIGFjdGl2ZVxuXHR2YXIgcHJldmlld05vcm1hbCA9IHdyYXBwZXIubGFzdENoaWxkO1xuXHRpZigvZWRpdG9yLXByZXZpZXctYWN0aXZlLy50ZXN0KHByZXZpZXdOb3JtYWwuY2xhc3NOYW1lKSkge1xuXHRcdHByZXZpZXdOb3JtYWwuY2xhc3NOYW1lID0gcHJldmlld05vcm1hbC5jbGFzc05hbWUucmVwbGFjZShcblx0XHRcdC9cXHMqZWRpdG9yLXByZXZpZXctYWN0aXZlXFxzKi9nLCBcIlwiXG5cdFx0KTtcblx0XHR2YXIgdG9vbGJhciA9IGVkaXRvci50b29sYmFyRWxlbWVudHMucHJldmlldztcblx0XHR2YXIgdG9vbGJhcl9kaXYgPSB3cmFwcGVyLnByZXZpb3VzU2libGluZztcblx0XHR0b29sYmFyLmNsYXNzTmFtZSA9IHRvb2xiYXIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccyphY3RpdmVcXHMqL2csIFwiXCIpO1xuXHRcdHRvb2xiYXJfZGl2LmNsYXNzTmFtZSA9IHRvb2xiYXJfZGl2LmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqZGlzYWJsZWQtZm9yLXByZXZpZXcqL2csIFwiXCIpO1xuXHR9XG5cblx0dmFyIHNpZGVCeVNpZGVSZW5kZXJpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdHByZXZpZXcuaW5uZXJIVE1MID0gZWRpdG9yLm9wdGlvbnMucHJldmlld1JlbmRlcihlZGl0b3IudmFsdWUoKSwgcHJldmlldyk7XG5cdH07XG5cblx0aWYoIWNtLnNpZGVCeVNpZGVSZW5kZXJpbmdGdW5jdGlvbikge1xuXHRcdGNtLnNpZGVCeVNpZGVSZW5kZXJpbmdGdW5jdGlvbiA9IHNpZGVCeVNpZGVSZW5kZXJpbmdGdW5jdGlvbjtcblx0fVxuXG5cdGlmKHVzZVNpZGVCeVNpZGVMaXN0ZW5lcikge1xuXHRcdHByZXZpZXcuaW5uZXJIVE1MID0gZWRpdG9yLm9wdGlvbnMucHJldmlld1JlbmRlcihlZGl0b3IudmFsdWUoKSwgcHJldmlldyk7XG5cdFx0Y20ub24oXCJ1cGRhdGVcIiwgY20uc2lkZUJ5U2lkZVJlbmRlcmluZ0Z1bmN0aW9uKTtcblx0fSBlbHNlIHtcblx0XHRjbS5vZmYoXCJ1cGRhdGVcIiwgY20uc2lkZUJ5U2lkZVJlbmRlcmluZ0Z1bmN0aW9uKTtcblx0fVxuXG5cdC8vIFJlZnJlc2ggdG8gZml4IHNlbGVjdGlvbiBiZWluZyBvZmYgKCMzMDkpXG5cdGNtLnJlZnJlc2goKTtcbn1cblxuXG4vKipcbiAqIFByZXZpZXcgYWN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2dnbGVQcmV2aWV3KGVkaXRvcikge1xuXHR2YXIgY20gPSBlZGl0b3IuY29kZW1pcnJvcjtcblx0dmFyIHdyYXBwZXIgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuXHR2YXIgdG9vbGJhcl9kaXYgPSB3cmFwcGVyLnByZXZpb3VzU2libGluZztcblx0dmFyIHRvb2xiYXIgPSBlZGl0b3Iub3B0aW9ucy50b29sYmFyID8gZWRpdG9yLnRvb2xiYXJFbGVtZW50cy5wcmV2aWV3IDogZmFsc2U7XG5cdHZhciBwcmV2aWV3ID0gd3JhcHBlci5sYXN0Q2hpbGQ7XG5cdGlmKCFwcmV2aWV3IHx8ICEvZWRpdG9yLXByZXZpZXcvLnRlc3QocHJldmlldy5jbGFzc05hbWUpKSB7XG5cdFx0cHJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJldmlldy5jbGFzc05hbWUgPSBcImVkaXRvci1wcmV2aWV3XCI7XG5cdFx0d3JhcHBlci5hcHBlbmRDaGlsZChwcmV2aWV3KTtcblx0fVxuXHRpZigvZWRpdG9yLXByZXZpZXctYWN0aXZlLy50ZXN0KHByZXZpZXcuY2xhc3NOYW1lKSkge1xuXHRcdHByZXZpZXcuY2xhc3NOYW1lID0gcHJldmlldy5jbGFzc05hbWUucmVwbGFjZShcblx0XHRcdC9cXHMqZWRpdG9yLXByZXZpZXctYWN0aXZlXFxzKi9nLCBcIlwiXG5cdFx0KTtcblx0XHRpZih0b29sYmFyKSB7XG5cdFx0XHR0b29sYmFyLmNsYXNzTmFtZSA9IHRvb2xiYXIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccyphY3RpdmVcXHMqL2csIFwiXCIpO1xuXHRcdFx0dG9vbGJhcl9kaXYuY2xhc3NOYW1lID0gdG9vbGJhcl9kaXYuY2xhc3NOYW1lLnJlcGxhY2UoL1xccypkaXNhYmxlZC1mb3ItcHJldmlldyovZywgXCJcIik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIFdoZW4gdGhlIHByZXZpZXcgYnV0dG9uIGlzIGNsaWNrZWQgZm9yIHRoZSBmaXJzdCB0aW1lLFxuXHRcdC8vIGdpdmUgc29tZSB0aW1lIGZvciB0aGUgdHJhbnNpdGlvbiBmcm9tIGVkaXRvci5jc3MgdG8gZmlyZSBhbmQgdGhlIHZpZXcgdG8gc2xpZGUgZnJvbSByaWdodCB0byBsZWZ0LFxuXHRcdC8vIGluc3RlYWQgb2YganVzdCBhcHBlYXJpbmcuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHByZXZpZXcuY2xhc3NOYW1lICs9IFwiIGVkaXRvci1wcmV2aWV3LWFjdGl2ZVwiO1xuXHRcdH0sIDEpO1xuXHRcdGlmKHRvb2xiYXIpIHtcblx0XHRcdHRvb2xiYXIuY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuXHRcdFx0dG9vbGJhcl9kaXYuY2xhc3NOYW1lICs9IFwiIGRpc2FibGVkLWZvci1wcmV2aWV3XCI7XG5cdFx0fVxuXHR9XG5cdHByZXZpZXcuaW5uZXJIVE1MID0gZWRpdG9yLm9wdGlvbnMucHJldmlld1JlbmRlcihlZGl0b3IudmFsdWUoKSwgcHJldmlldyk7XG5cblx0Ly8gVHVybiBvZmYgc2lkZSBieSBzaWRlIGlmIG5lZWRlZFxuXHR2YXIgc2lkZWJ5c2lkZSA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCkubmV4dFNpYmxpbmc7XG5cdGlmKC9lZGl0b3ItcHJldmlldy1hY3RpdmUtc2lkZS8udGVzdChzaWRlYnlzaWRlLmNsYXNzTmFtZSkpXG5cdFx0dG9nZ2xlU2lkZUJ5U2lkZShlZGl0b3IpO1xufVxuXG5mdW5jdGlvbiBfcmVwbGFjZVNlbGVjdGlvbihjbSwgYWN0aXZlLCBzdGFydEVuZCwgdXJsKSB7XG5cdGlmKC9lZGl0b3ItcHJldmlldy1hY3RpdmUvLnRlc3QoY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5sYXN0Q2hpbGQuY2xhc3NOYW1lKSlcblx0XHRyZXR1cm47XG5cblx0dmFyIHRleHQ7XG5cdHZhciBzdGFydCA9IHN0YXJ0RW5kWzBdO1xuXHR2YXIgZW5kID0gc3RhcnRFbmRbMV07XG5cdHZhciBzdGFydFBvaW50ID0gY20uZ2V0Q3Vyc29yKFwic3RhcnRcIik7XG5cdHZhciBlbmRQb2ludCA9IGNtLmdldEN1cnNvcihcImVuZFwiKTtcblx0aWYodXJsKSB7XG5cdFx0ZW5kID0gZW5kLnJlcGxhY2UoXCIjdXJsI1wiLCB1cmwpO1xuXHR9XG5cdGlmKGFjdGl2ZSkge1xuXHRcdHRleHQgPSBjbS5nZXRMaW5lKHN0YXJ0UG9pbnQubGluZSk7XG5cdFx0c3RhcnQgPSB0ZXh0LnNsaWNlKDAsIHN0YXJ0UG9pbnQuY2gpO1xuXHRcdGVuZCA9IHRleHQuc2xpY2Uoc3RhcnRQb2ludC5jaCk7XG5cdFx0Y20ucmVwbGFjZVJhbmdlKHN0YXJ0ICsgZW5kLCB7XG5cdFx0XHRsaW5lOiBzdGFydFBvaW50LmxpbmUsXG5cdFx0XHRjaDogMFxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcblx0XHRjbS5yZXBsYWNlU2VsZWN0aW9uKHN0YXJ0ICsgdGV4dCArIGVuZCk7XG5cblx0XHRzdGFydFBvaW50LmNoICs9IHN0YXJ0Lmxlbmd0aDtcblx0XHRpZihzdGFydFBvaW50ICE9PSBlbmRQb2ludCkge1xuXHRcdFx0ZW5kUG9pbnQuY2ggKz0gc3RhcnQubGVuZ3RoO1xuXHRcdH1cblx0fVxuXHRjbS5zZXRTZWxlY3Rpb24oc3RhcnRQb2ludCwgZW5kUG9pbnQpO1xuXHRjbS5mb2N1cygpO1xufVxuXG5cbmZ1bmN0aW9uIF90b2dnbGVIZWFkaW5nKGNtLCBkaXJlY3Rpb24sIHNpemUpIHtcblx0aWYoL2VkaXRvci1wcmV2aWV3LWFjdGl2ZS8udGVzdChjbS5nZXRXcmFwcGVyRWxlbWVudCgpLmxhc3RDaGlsZC5jbGFzc05hbWUpKVxuXHRcdHJldHVybjtcblxuXHR2YXIgc3RhcnRQb2ludCA9IGNtLmdldEN1cnNvcihcInN0YXJ0XCIpO1xuXHR2YXIgZW5kUG9pbnQgPSBjbS5nZXRDdXJzb3IoXCJlbmRcIik7XG5cdGZvcih2YXIgaSA9IHN0YXJ0UG9pbnQubGluZTsgaSA8PSBlbmRQb2ludC5saW5lOyBpKyspIHtcblx0XHQoZnVuY3Rpb24oaSkge1xuXHRcdFx0dmFyIHRleHQgPSBjbS5nZXRMaW5lKGkpO1xuXHRcdFx0dmFyIGN1cnJIZWFkaW5nTGV2ZWwgPSB0ZXh0LnNlYXJjaCgvW14jXS8pO1xuXG5cdFx0XHRpZihkaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZihjdXJySGVhZGluZ0xldmVsIDw9IDApIHtcblx0XHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gXCJiaWdnZXJcIikge1xuXHRcdFx0XHRcdFx0dGV4dCA9IFwiIyMjIyMjIFwiICsgdGV4dDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGV4dCA9IFwiIyBcIiArIHRleHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYoY3VyckhlYWRpbmdMZXZlbCA9PSA2ICYmIGRpcmVjdGlvbiA9PSBcInNtYWxsZXJcIikge1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnN1YnN0cig3KTtcblx0XHRcdFx0fSBlbHNlIGlmKGN1cnJIZWFkaW5nTGV2ZWwgPT0gMSAmJiBkaXJlY3Rpb24gPT0gXCJiaWdnZXJcIikge1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnN1YnN0cigyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gXCJiaWdnZXJcIikge1xuXHRcdFx0XHRcdFx0dGV4dCA9IHRleHQuc3Vic3RyKDEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gXCIjXCIgKyB0ZXh0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYoc2l6ZSA9PSAxKSB7XG5cdFx0XHRcdFx0aWYoY3VyckhlYWRpbmdMZXZlbCA8PSAwKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gXCIjIFwiICsgdGV4dDtcblx0XHRcdFx0XHR9IGVsc2UgaWYoY3VyckhlYWRpbmdMZXZlbCA9PSBzaXplKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5zdWJzdHIoY3VyckhlYWRpbmdMZXZlbCArIDEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gXCIjIFwiICsgdGV4dC5zdWJzdHIoY3VyckhlYWRpbmdMZXZlbCArIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmKHNpemUgPT0gMikge1xuXHRcdFx0XHRcdGlmKGN1cnJIZWFkaW5nTGV2ZWwgPD0gMCkge1xuXHRcdFx0XHRcdFx0dGV4dCA9IFwiIyMgXCIgKyB0ZXh0O1xuXHRcdFx0XHRcdH0gZWxzZSBpZihjdXJySGVhZGluZ0xldmVsID09IHNpemUpIHtcblx0XHRcdFx0XHRcdHRleHQgPSB0ZXh0LnN1YnN0cihjdXJySGVhZGluZ0xldmVsICsgMSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRleHQgPSBcIiMjIFwiICsgdGV4dC5zdWJzdHIoY3VyckhlYWRpbmdMZXZlbCArIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihjdXJySGVhZGluZ0xldmVsIDw9IDApIHtcblx0XHRcdFx0XHRcdHRleHQgPSBcIiMjIyBcIiArIHRleHQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmKGN1cnJIZWFkaW5nTGV2ZWwgPT0gc2l6ZSkge1xuXHRcdFx0XHRcdFx0dGV4dCA9IHRleHQuc3Vic3RyKGN1cnJIZWFkaW5nTGV2ZWwgKyAxKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGV4dCA9IFwiIyMjIFwiICsgdGV4dC5zdWJzdHIoY3VyckhlYWRpbmdMZXZlbCArIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjbS5yZXBsYWNlUmFuZ2UodGV4dCwge1xuXHRcdFx0XHRsaW5lOiBpLFxuXHRcdFx0XHRjaDogMFxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiBpLFxuXHRcdFx0XHRjaDogOTk5OTk5OTk5OTk5OTlcblx0XHRcdH0pO1xuXHRcdH0pKGkpO1xuXHR9XG5cdGNtLmZvY3VzKCk7XG59XG5cblxuZnVuY3Rpb24gX3RvZ2dsZUxpbmUoY20sIG5hbWUpIHtcblx0aWYoL2VkaXRvci1wcmV2aWV3LWFjdGl2ZS8udGVzdChjbS5nZXRXcmFwcGVyRWxlbWVudCgpLmxhc3RDaGlsZC5jbGFzc05hbWUpKVxuXHRcdHJldHVybjtcblxuXHR2YXIgc3RhdCA9IGdldFN0YXRlKGNtKTtcblx0dmFyIHN0YXJ0UG9pbnQgPSBjbS5nZXRDdXJzb3IoXCJzdGFydFwiKTtcblx0dmFyIGVuZFBvaW50ID0gY20uZ2V0Q3Vyc29yKFwiZW5kXCIpO1xuXHR2YXIgcmVwbCA9IHtcblx0XHRcInF1b3RlXCI6IC9eKFxccyopXFw+XFxzKy8sXG5cdFx0XCJ1bm9yZGVyZWQtbGlzdFwiOiAvXihcXHMqKShcXCp8XFwtfFxcKylcXHMrLyxcblx0XHRcIm9yZGVyZWQtbGlzdFwiOiAvXihcXHMqKVxcZCtcXC5cXHMrL1xuXHR9O1xuXHR2YXIgbWFwID0ge1xuXHRcdFwicXVvdGVcIjogXCI+IFwiLFxuXHRcdFwidW5vcmRlcmVkLWxpc3RcIjogXCIqIFwiLFxuXHRcdFwib3JkZXJlZC1saXN0XCI6IFwiMS4gXCJcblx0fTtcblx0Zm9yKHZhciBpID0gc3RhcnRQb2ludC5saW5lOyBpIDw9IGVuZFBvaW50LmxpbmU7IGkrKykge1xuXHRcdChmdW5jdGlvbihpKSB7XG5cdFx0XHR2YXIgdGV4dCA9IGNtLmdldExpbmUoaSk7XG5cdFx0XHRpZihzdGF0W25hbWVdKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UocmVwbFtuYW1lXSwgXCIkMVwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRleHQgPSBtYXBbbmFtZV0gKyB0ZXh0O1xuXHRcdFx0fVxuXHRcdFx0Y20ucmVwbGFjZVJhbmdlKHRleHQsIHtcblx0XHRcdFx0bGluZTogaSxcblx0XHRcdFx0Y2g6IDBcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogaSxcblx0XHRcdFx0Y2g6IDk5OTk5OTk5OTk5OTk5XG5cdFx0XHR9KTtcblx0XHR9KShpKTtcblx0fVxuXHRjbS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBfdG9nZ2xlQmxvY2soZWRpdG9yLCB0eXBlLCBzdGFydF9jaGFycywgZW5kX2NoYXJzKSB7XG5cdGlmKC9lZGl0b3ItcHJldmlldy1hY3RpdmUvLnRlc3QoZWRpdG9yLmNvZGVtaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKS5sYXN0Q2hpbGQuY2xhc3NOYW1lKSlcblx0XHRyZXR1cm47XG5cblx0ZW5kX2NoYXJzID0gKHR5cGVvZiBlbmRfY2hhcnMgPT09IFwidW5kZWZpbmVkXCIpID8gc3RhcnRfY2hhcnMgOiBlbmRfY2hhcnM7XG5cdHZhciBjbSA9IGVkaXRvci5jb2RlbWlycm9yO1xuXHR2YXIgc3RhdCA9IGdldFN0YXRlKGNtKTtcblxuXHR2YXIgdGV4dDtcblx0dmFyIHN0YXJ0ID0gc3RhcnRfY2hhcnM7XG5cdHZhciBlbmQgPSBlbmRfY2hhcnM7XG5cblx0dmFyIHN0YXJ0UG9pbnQgPSBjbS5nZXRDdXJzb3IoXCJzdGFydFwiKTtcblx0dmFyIGVuZFBvaW50ID0gY20uZ2V0Q3Vyc29yKFwiZW5kXCIpO1xuXG5cdGlmKHN0YXRbdHlwZV0pIHtcblx0XHR0ZXh0ID0gY20uZ2V0TGluZShzdGFydFBvaW50LmxpbmUpO1xuXHRcdHN0YXJ0ID0gdGV4dC5zbGljZSgwLCBzdGFydFBvaW50LmNoKTtcblx0XHRlbmQgPSB0ZXh0LnNsaWNlKHN0YXJ0UG9pbnQuY2gpO1xuXHRcdGlmKHR5cGUgPT0gXCJib2xkXCIpIHtcblx0XHRcdHN0YXJ0ID0gc3RhcnQucmVwbGFjZSgvKFxcKlxcKnxfXykoPyFbXFxzXFxTXSooXFwqXFwqfF9fKSkvLCBcIlwiKTtcblx0XHRcdGVuZCA9IGVuZC5yZXBsYWNlKC8oXFwqXFwqfF9fKS8sIFwiXCIpO1xuXHRcdH0gZWxzZSBpZih0eXBlID09IFwiaXRhbGljXCIpIHtcblx0XHRcdHN0YXJ0ID0gc3RhcnQucmVwbGFjZSgvKFxcKnxfKSg/IVtcXHNcXFNdKihcXCp8XykpLywgXCJcIik7XG5cdFx0XHRlbmQgPSBlbmQucmVwbGFjZSgvKFxcKnxfKS8sIFwiXCIpO1xuXHRcdH0gZWxzZSBpZih0eXBlID09IFwic3RyaWtldGhyb3VnaFwiKSB7XG5cdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyhcXCpcXCp8fn4pKD8hW1xcc1xcU10qKFxcKlxcKnx+fikpLywgXCJcIik7XG5cdFx0XHRlbmQgPSBlbmQucmVwbGFjZSgvKFxcKlxcKnx+fikvLCBcIlwiKTtcblx0XHR9XG5cdFx0Y20ucmVwbGFjZVJhbmdlKHN0YXJ0ICsgZW5kLCB7XG5cdFx0XHRsaW5lOiBzdGFydFBvaW50LmxpbmUsXG5cdFx0XHRjaDogMFxuXHRcdH0sIHtcblx0XHRcdGxpbmU6IHN0YXJ0UG9pbnQubGluZSxcblx0XHRcdGNoOiA5OTk5OTk5OTk5OTk5OVxuXHRcdH0pO1xuXG5cdFx0aWYodHlwZSA9PSBcImJvbGRcIiB8fCB0eXBlID09IFwic3RyaWtldGhyb3VnaFwiKSB7XG5cdFx0XHRzdGFydFBvaW50LmNoIC09IDI7XG5cdFx0XHRpZihzdGFydFBvaW50ICE9PSBlbmRQb2ludCkge1xuXHRcdFx0XHRlbmRQb2ludC5jaCAtPSAyO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZih0eXBlID09IFwiaXRhbGljXCIpIHtcblx0XHRcdHN0YXJ0UG9pbnQuY2ggLT0gMTtcblx0XHRcdGlmKHN0YXJ0UG9pbnQgIT09IGVuZFBvaW50KSB7XG5cdFx0XHRcdGVuZFBvaW50LmNoIC09IDE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZih0eXBlID09IFwiYm9sZFwiKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChcIioqXCIpLmpvaW4oXCJcIik7XG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChcIl9fXCIpLmpvaW4oXCJcIik7XG5cdFx0fSBlbHNlIGlmKHR5cGUgPT0gXCJpdGFsaWNcIikge1xuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQoXCIqXCIpLmpvaW4oXCJcIik7XG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChcIl9cIikuam9pbihcIlwiKTtcblx0XHR9IGVsc2UgaWYodHlwZSA9PSBcInN0cmlrZXRocm91Z2hcIikge1xuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQoXCJ+flwiKS5qb2luKFwiXCIpO1xuXHRcdH1cblx0XHRjbS5yZXBsYWNlU2VsZWN0aW9uKHN0YXJ0ICsgdGV4dCArIGVuZCk7XG5cblx0XHRzdGFydFBvaW50LmNoICs9IHN0YXJ0X2NoYXJzLmxlbmd0aDtcblx0XHRlbmRQb2ludC5jaCA9IHN0YXJ0UG9pbnQuY2ggKyB0ZXh0Lmxlbmd0aDtcblx0fVxuXG5cdGNtLnNldFNlbGVjdGlvbihzdGFydFBvaW50LCBlbmRQb2ludCk7XG5cdGNtLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIF9jbGVhbkJsb2NrKGNtKSB7XG5cdGlmKC9lZGl0b3ItcHJldmlldy1hY3RpdmUvLnRlc3QoY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5sYXN0Q2hpbGQuY2xhc3NOYW1lKSlcblx0XHRyZXR1cm47XG5cblx0dmFyIHN0YXJ0UG9pbnQgPSBjbS5nZXRDdXJzb3IoXCJzdGFydFwiKTtcblx0dmFyIGVuZFBvaW50ID0gY20uZ2V0Q3Vyc29yKFwiZW5kXCIpO1xuXHR2YXIgdGV4dDtcblxuXHRmb3IodmFyIGxpbmUgPSBzdGFydFBvaW50LmxpbmU7IGxpbmUgPD0gZW5kUG9pbnQubGluZTsgbGluZSsrKSB7XG5cdFx0dGV4dCA9IGNtLmdldExpbmUobGluZSk7XG5cdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvXlsgXSooWyMgXSt8XFwqfFxcLXxbPiBdK3xbMC05XSsoLnxcXCkpKVsgXSovLCBcIlwiKTtcblxuXHRcdGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0Y2g6IDBcblx0XHR9LCB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0Y2g6IDk5OTk5OTk5OTk5OTk5XG5cdFx0fSk7XG5cdH1cbn1cblxuLy8gTWVyZ2UgdGhlIHByb3BlcnRpZXMgb2Ygb25lIG9iamVjdCBpbnRvIGFub3RoZXIuXG5mdW5jdGlvbiBfbWVyZ2VQcm9wZXJ0aWVzKHRhcmdldCwgc291cmNlKSB7XG5cdGZvcih2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG5cdFx0aWYoc291cmNlLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuXHRcdFx0aWYoc291cmNlW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRcdHRhcmdldFtwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldLmNvbmNhdCh0YXJnZXRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkgPyB0YXJnZXRbcHJvcGVydHldIDogW10pO1xuXHRcdFx0fSBlbHNlIGlmKFxuXHRcdFx0XHRzb3VyY2VbcHJvcGVydHldICE9PSBudWxsICYmXG5cdFx0XHRcdHR5cGVvZiBzb3VyY2VbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXG5cdFx0XHRcdHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgPT09IE9iamVjdFxuXHRcdFx0KSB7XG5cdFx0XHRcdHRhcmdldFtwcm9wZXJ0eV0gPSBfbWVyZ2VQcm9wZXJ0aWVzKHRhcmdldFtwcm9wZXJ0eV0gfHwge30sIHNvdXJjZVtwcm9wZXJ0eV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLy8gTWVyZ2UgYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBvYmplY3RzIGludG8gb25lLlxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuXHRmb3IodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGFyZ2V0ID0gX21lcmdlUHJvcGVydGllcyh0YXJnZXQsIGFyZ3VtZW50c1tpXSk7XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKiBUaGUgcmlnaHQgd29yZCBjb3VudCBpbiByZXNwZWN0IGZvciBDSksuICovXG5mdW5jdGlvbiB3b3JkQ291bnQoZGF0YSkge1xuXHR2YXIgcGF0dGVybiA9IC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNjOVxcdTA0MTAtXFx1MDRGOV0rfFtcXHU0RTAwLVxcdTlGRkZcXHUzNDAwLVxcdTRkYmZcXHVmOTAwLVxcdWZhZmZcXHUzMDQwLVxcdTMwOWZcXHVhYzAwLVxcdWQ3YWZdKy9nO1xuXHR2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG5cdHZhciBjb3VudCA9IDA7XG5cdGlmKG0gPT09IG51bGwpIHJldHVybiBjb3VudDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcblx0XHRpZihtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0RTAwKSB7XG5cdFx0XHRjb3VudCArPSBtW2ldLmxlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNvdW50O1xufVxuXG52YXIgdG9vbGJhckJ1aWx0SW5CdXR0b25zID0ge1xuXHRcImJvbGRcIjoge1xuXHRcdG5hbWU6IFwiYm9sZFwiLFxuXHRcdGFjdGlvbjogdG9nZ2xlQm9sZCxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtYm9sZFwiLFxuXHRcdHRpdGxlOiBcIkJvbGRcIixcblx0XHRkZWZhdWx0OiB0cnVlXG5cdH0sXG5cdFwiaXRhbGljXCI6IHtcblx0XHRuYW1lOiBcIml0YWxpY1wiLFxuXHRcdGFjdGlvbjogdG9nZ2xlSXRhbGljLFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1pdGFsaWNcIixcblx0XHR0aXRsZTogXCJJdGFsaWNcIixcblx0XHRkZWZhdWx0OiB0cnVlXG5cdH0sXG5cdFwic3RyaWtldGhyb3VnaFwiOiB7XG5cdFx0bmFtZTogXCJzdHJpa2V0aHJvdWdoXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVTdHJpa2V0aHJvdWdoLFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1zdHJpa2V0aHJvdWdoXCIsXG5cdFx0dGl0bGU6IFwiU3RyaWtldGhyb3VnaFwiXG5cdH0sXG5cdFwiaGVhZGluZ1wiOiB7XG5cdFx0bmFtZTogXCJoZWFkaW5nXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVIZWFkaW5nU21hbGxlcixcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtaGVhZGVyXCIsXG5cdFx0dGl0bGU6IFwiSGVhZGluZ1wiLFxuXHRcdGRlZmF1bHQ6IHRydWVcblx0fSxcblx0XCJoZWFkaW5nLXNtYWxsZXJcIjoge1xuXHRcdG5hbWU6IFwiaGVhZGluZy1zbWFsbGVyXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVIZWFkaW5nU21hbGxlcixcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtaGVhZGVyIGZhLWhlYWRlci14IGZhLWhlYWRlci1zbWFsbGVyXCIsXG5cdFx0dGl0bGU6IFwiU21hbGxlciBIZWFkaW5nXCJcblx0fSxcblx0XCJoZWFkaW5nLWJpZ2dlclwiOiB7XG5cdFx0bmFtZTogXCJoZWFkaW5nLWJpZ2dlclwiLFxuXHRcdGFjdGlvbjogdG9nZ2xlSGVhZGluZ0JpZ2dlcixcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtaGVhZGVyIGZhLWhlYWRlci14IGZhLWhlYWRlci1iaWdnZXJcIixcblx0XHR0aXRsZTogXCJCaWdnZXIgSGVhZGluZ1wiXG5cdH0sXG5cdFwiaGVhZGluZy0xXCI6IHtcblx0XHRuYW1lOiBcImhlYWRpbmctMVwiLFxuXHRcdGFjdGlvbjogdG9nZ2xlSGVhZGluZzEsXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLWhlYWRlciBmYS1oZWFkZXIteCBmYS1oZWFkZXItMVwiLFxuXHRcdHRpdGxlOiBcIkJpZyBIZWFkaW5nXCJcblx0fSxcblx0XCJoZWFkaW5nLTJcIjoge1xuXHRcdG5hbWU6IFwiaGVhZGluZy0yXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVIZWFkaW5nMixcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtaGVhZGVyIGZhLWhlYWRlci14IGZhLWhlYWRlci0yXCIsXG5cdFx0dGl0bGU6IFwiTWVkaXVtIEhlYWRpbmdcIlxuXHR9LFxuXHRcImhlYWRpbmctM1wiOiB7XG5cdFx0bmFtZTogXCJoZWFkaW5nLTNcIixcblx0XHRhY3Rpb246IHRvZ2dsZUhlYWRpbmczLFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1oZWFkZXIgZmEtaGVhZGVyLXggZmEtaGVhZGVyLTNcIixcblx0XHR0aXRsZTogXCJTbWFsbCBIZWFkaW5nXCJcblx0fSxcblx0XCJzZXBhcmF0b3ItMVwiOiB7XG5cdFx0bmFtZTogXCJzZXBhcmF0b3ItMVwiXG5cdH0sXG5cdFwiY29kZVwiOiB7XG5cdFx0bmFtZTogXCJjb2RlXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVDb2RlQmxvY2ssXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLWNvZGVcIixcblx0XHR0aXRsZTogXCJDb2RlXCJcblx0fSxcblx0XCJxdW90ZVwiOiB7XG5cdFx0bmFtZTogXCJxdW90ZVwiLFxuXHRcdGFjdGlvbjogdG9nZ2xlQmxvY2txdW90ZSxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtcXVvdGUtbGVmdFwiLFxuXHRcdHRpdGxlOiBcIlF1b3RlXCIsXG5cdFx0ZGVmYXVsdDogdHJ1ZVxuXHR9LFxuXHRcInVub3JkZXJlZC1saXN0XCI6IHtcblx0XHRuYW1lOiBcInVub3JkZXJlZC1saXN0XCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVVbm9yZGVyZWRMaXN0LFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1saXN0LXVsXCIsXG5cdFx0dGl0bGU6IFwiR2VuZXJpYyBMaXN0XCIsXG5cdFx0ZGVmYXVsdDogdHJ1ZVxuXHR9LFxuXHRcIm9yZGVyZWQtbGlzdFwiOiB7XG5cdFx0bmFtZTogXCJvcmRlcmVkLWxpc3RcIixcblx0XHRhY3Rpb246IHRvZ2dsZU9yZGVyZWRMaXN0LFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1saXN0LW9sXCIsXG5cdFx0dGl0bGU6IFwiTnVtYmVyZWQgTGlzdFwiLFxuXHRcdGRlZmF1bHQ6IHRydWVcblx0fSxcblx0XCJjbGVhbi1ibG9ja1wiOiB7XG5cdFx0bmFtZTogXCJjbGVhbi1ibG9ja1wiLFxuXHRcdGFjdGlvbjogY2xlYW5CbG9jayxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtZXJhc2VyIGZhLWNsZWFuLWJsb2NrXCIsXG5cdFx0dGl0bGU6IFwiQ2xlYW4gYmxvY2tcIlxuXHR9LFxuXHRcInNlcGFyYXRvci0yXCI6IHtcblx0XHRuYW1lOiBcInNlcGFyYXRvci0yXCJcblx0fSxcblx0XCJsaW5rXCI6IHtcblx0XHRuYW1lOiBcImxpbmtcIixcblx0XHRhY3Rpb246IGRyYXdMaW5rLFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1saW5rXCIsXG5cdFx0dGl0bGU6IFwiQ3JlYXRlIExpbmtcIixcblx0XHRkZWZhdWx0OiB0cnVlXG5cdH0sXG5cdFwiaW1hZ2VcIjoge1xuXHRcdG5hbWU6IFwiaW1hZ2VcIixcblx0XHRhY3Rpb246IGRyYXdJbWFnZSxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtcGljdHVyZS1vXCIsXG5cdFx0dGl0bGU6IFwiSW5zZXJ0IEltYWdlXCIsXG5cdFx0ZGVmYXVsdDogdHJ1ZVxuXHR9LFxuXHRcInRhYmxlXCI6IHtcblx0XHRuYW1lOiBcInRhYmxlXCIsXG5cdFx0YWN0aW9uOiBkcmF3VGFibGUsXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLXRhYmxlXCIsXG5cdFx0dGl0bGU6IFwiSW5zZXJ0IFRhYmxlXCJcblx0fSxcblx0XCJob3Jpem9udGFsLXJ1bGVcIjoge1xuXHRcdG5hbWU6IFwiaG9yaXpvbnRhbC1ydWxlXCIsXG5cdFx0YWN0aW9uOiBkcmF3SG9yaXpvbnRhbFJ1bGUsXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLW1pbnVzXCIsXG5cdFx0dGl0bGU6IFwiSW5zZXJ0IEhvcml6b250YWwgTGluZVwiXG5cdH0sXG5cdFwic2VwYXJhdG9yLTNcIjoge1xuXHRcdG5hbWU6IFwic2VwYXJhdG9yLTNcIlxuXHR9LFxuXHRcInByZXZpZXdcIjoge1xuXHRcdG5hbWU6IFwicHJldmlld1wiLFxuXHRcdGFjdGlvbjogdG9nZ2xlUHJldmlldyxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtZXllIG5vLWRpc2FibGVcIixcblx0XHR0aXRsZTogXCJUb2dnbGUgUHJldmlld1wiLFxuXHRcdGRlZmF1bHQ6IHRydWVcblx0fSxcblx0XCJzaWRlLWJ5LXNpZGVcIjoge1xuXHRcdG5hbWU6IFwic2lkZS1ieS1zaWRlXCIsXG5cdFx0YWN0aW9uOiB0b2dnbGVTaWRlQnlTaWRlLFxuXHRcdGNsYXNzTmFtZTogXCJmYSBmYS1jb2x1bW5zIG5vLWRpc2FibGUgbm8tbW9iaWxlXCIsXG5cdFx0dGl0bGU6IFwiVG9nZ2xlIFNpZGUgYnkgU2lkZVwiLFxuXHRcdGRlZmF1bHQ6IHRydWVcblx0fSxcblx0XCJmdWxsc2NyZWVuXCI6IHtcblx0XHRuYW1lOiBcImZ1bGxzY3JlZW5cIixcblx0XHRhY3Rpb246IHRvZ2dsZUZ1bGxTY3JlZW4sXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLWFycm93cy1hbHQgbm8tZGlzYWJsZSBuby1tb2JpbGVcIixcblx0XHR0aXRsZTogXCJUb2dnbGUgRnVsbHNjcmVlblwiLFxuXHRcdGRlZmF1bHQ6IHRydWVcblx0fSxcblx0XCJzZXBhcmF0b3ItNFwiOiB7XG5cdFx0bmFtZTogXCJzZXBhcmF0b3ItNFwiXG5cdH0sXG5cdFwiZ3VpZGVcIjoge1xuXHRcdG5hbWU6IFwiZ3VpZGVcIixcblx0XHRhY3Rpb246IFwiaHR0cHM6Ly9zaW1wbGVtZGUuY29tL21hcmtkb3duLWd1aWRlXCIsXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLXF1ZXN0aW9uLWNpcmNsZVwiLFxuXHRcdHRpdGxlOiBcIk1hcmtkb3duIEd1aWRlXCIsXG5cdFx0ZGVmYXVsdDogdHJ1ZVxuXHR9LFxuXHRcInNlcGFyYXRvci01XCI6IHtcblx0XHRuYW1lOiBcInNlcGFyYXRvci01XCJcblx0fSxcblx0XCJ1bmRvXCI6IHtcblx0XHRuYW1lOiBcInVuZG9cIixcblx0XHRhY3Rpb246IHVuZG8sXG5cdFx0Y2xhc3NOYW1lOiBcImZhIGZhLXVuZG8gbm8tZGlzYWJsZVwiLFxuXHRcdHRpdGxlOiBcIlVuZG9cIlxuXHR9LFxuXHRcInJlZG9cIjoge1xuXHRcdG5hbWU6IFwicmVkb1wiLFxuXHRcdGFjdGlvbjogcmVkbyxcblx0XHRjbGFzc05hbWU6IFwiZmEgZmEtcmVwZWF0IG5vLWRpc2FibGVcIixcblx0XHR0aXRsZTogXCJSZWRvXCJcblx0fVxufTtcblxudmFyIGluc2VydFRleHRzID0ge1xuXHRsaW5rOiBbXCJbXCIsIFwiXSgjdXJsIylcIl0sXG5cdGltYWdlOiBbXCIhW10oXCIsIFwiI3VybCMpXCJdLFxuXHR0YWJsZTogW1wiXCIsIFwiXFxuXFxufCBDb2x1bW4gMSB8IENvbHVtbiAyIHwgQ29sdW1uIDMgfFxcbnwgLS0tLS0tLS0gfCAtLS0tLS0tLSB8IC0tLS0tLS0tIHxcXG58IFRleHQgICAgIHwgVGV4dCAgICAgfCBUZXh0ICAgICB8XFxuXFxuXCJdLFxuXHRob3Jpem9udGFsUnVsZTogW1wiXCIsIFwiXFxuXFxuLS0tLS1cXG5cXG5cIl1cbn07XG5cbnZhciBwcm9tcHRUZXh0cyA9IHtcblx0bGluazogXCJVUkwgZm9yIHRoZSBsaW5rOlwiLFxuXHRpbWFnZTogXCJVUkwgb2YgdGhlIGltYWdlOlwiXG59O1xuXG52YXIgYmxvY2tTdHlsZXMgPSB7XG5cdFwiYm9sZFwiOiBcIioqXCIsXG5cdFwiY29kZVwiOiBcImBgYFwiLFxuXHRcIml0YWxpY1wiOiBcIipcIlxufTtcblxuLyoqXG4gKiBJbnRlcmZhY2Ugb2YgU2ltcGxlTURFLlxuICovXG5mdW5jdGlvbiBTaW1wbGVNREUob3B0aW9ucykge1xuXHQvLyBIYW5kbGUgb3B0aW9ucyBwYXJhbWV0ZXJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblxuXHQvLyBVc2VkIGxhdGVyIHRvIHJlZmVyIHRvIGl0XCJzIHBhcmVudFxuXHRvcHRpb25zLnBhcmVudCA9IHRoaXM7XG5cblxuXHQvLyBDaGVjayBpZiBGb250IEF3ZXNvbWUgbmVlZHMgdG8gYmUgYXV0byBkb3dubG9hZGVkXG5cdHZhciBhdXRvRG93bmxvYWRGQSA9IHRydWU7XG5cblx0aWYob3B0aW9ucy5hdXRvRG93bmxvYWRGb250QXdlc29tZSA9PT0gZmFsc2UpIHtcblx0XHRhdXRvRG93bmxvYWRGQSA9IGZhbHNlO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdXRvRG93bmxvYWRGb250QXdlc29tZSAhPT0gdHJ1ZSkge1xuXHRcdHZhciBzdHlsZVNoZWV0cyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZVNoZWV0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYoIXN0eWxlU2hlZXRzW2ldLmhyZWYpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHRpZihzdHlsZVNoZWV0c1tpXS5ocmVmLmluZGV4T2YoXCIvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS9cIikgPiAtMSkge1xuXHRcdFx0XHRhdXRvRG93bmxvYWRGQSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmKGF1dG9Eb3dubG9hZEZBKSB7XG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0XHRsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdGxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvbGF0ZXN0L2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcblx0fVxuXG5cblx0Ly8gRmluZCB0aGUgdGV4dGFyZWEgdG8gdXNlXG5cdGlmKG9wdGlvbnMuZWxlbWVudCkge1xuXHRcdHRoaXMuZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcblx0fSBlbHNlIGlmKG9wdGlvbnMuZWxlbWVudCA9PT0gbnVsbCkge1xuXHRcdC8vIFRoaXMgbWVhbnMgdGhhdCB0aGUgZWxlbWVudCBvcHRpb24gd2FzIHNwZWNpZmllZCwgYnV0IG5vIGVsZW1lbnQgd2FzIGZvdW5kXG5cdFx0Y29uc29sZS5sb2coXCJTaW1wbGVNREU6IEVycm9yLiBObyBlbGVtZW50IHdhcyBmb3VuZC5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblxuXHQvLyBIYW5kbGUgdG9vbGJhclxuXHRpZihvcHRpb25zLnRvb2xiYXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIEluaXRpYWxpemVcblx0XHRvcHRpb25zLnRvb2xiYXIgPSBbXTtcblxuXG5cdFx0Ly8gTG9vcCBvdmVyIHRoZSBidWlsdCBpbiBidXR0b25zLCB0byBnZXQgdGhlIHByZWZlcnJlZCBvcmRlclxuXHRcdGZvcih2YXIga2V5IGluIHRvb2xiYXJCdWlsdEluQnV0dG9ucykge1xuXHRcdFx0aWYodG9vbGJhckJ1aWx0SW5CdXR0b25zLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0aWYoa2V5LmluZGV4T2YoXCJzZXBhcmF0b3ItXCIpICE9IC0xKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy50b29sYmFyLnB1c2goXCJ8XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodG9vbGJhckJ1aWx0SW5CdXR0b25zW2tleV0uZGVmYXVsdCA9PT0gdHJ1ZSB8fCAob3B0aW9ucy5zaG93SWNvbnMgJiYgb3B0aW9ucy5zaG93SWNvbnMuY29uc3RydWN0b3IgPT09IEFycmF5ICYmIG9wdGlvbnMuc2hvd0ljb25zLmluZGV4T2Yoa2V5KSAhPSAtMSkpIHtcblx0XHRcdFx0XHRvcHRpb25zLnRvb2xiYXIucHVzaChrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHQvLyBIYW5kbGUgc3RhdHVzIGJhclxuXHRpZighb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInN0YXR1c1wiKSkge1xuXHRcdG9wdGlvbnMuc3RhdHVzID0gW1wiYXV0b3NhdmVcIiwgXCJsaW5lc1wiLCBcIndvcmRzXCIsIFwiY3Vyc29yXCJdO1xuXHR9XG5cblxuXHQvLyBBZGQgZGVmYXVsdCBwcmV2aWV3IHJlbmRlcmluZyBmdW5jdGlvblxuXHRpZighb3B0aW9ucy5wcmV2aWV3UmVuZGVyKSB7XG5cdFx0b3B0aW9ucy5wcmV2aWV3UmVuZGVyID0gZnVuY3Rpb24ocGxhaW5UZXh0KSB7XG5cdFx0XHQvLyBOb3RlOiBcInRoaXNcIiByZWZlcnMgdG8gdGhlIG9wdGlvbnMgb2JqZWN0XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQubWFya2Rvd24ocGxhaW5UZXh0KTtcblx0XHR9O1xuXHR9XG5cblxuXHQvLyBTZXQgZGVmYXVsdCBvcHRpb25zIGZvciBwYXJzaW5nIGNvbmZpZ1xuXHRvcHRpb25zLnBhcnNpbmdDb25maWcgPSBleHRlbmQoe1xuXHRcdGhpZ2hsaWdodEZvcm1hdHRpbmc6IHRydWUgLy8gbmVlZGVkIGZvciB0b2dnbGVDb2RlQmxvY2sgdG8gZGV0ZWN0IHR5cGVzIG9mIGNvZGVcblx0fSwgb3B0aW9ucy5wYXJzaW5nQ29uZmlnIHx8IHt9KTtcblxuXG5cdC8vIE1lcmdpbmcgdGhlIGluc2VydFRleHRzLCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zXG5cdG9wdGlvbnMuaW5zZXJ0VGV4dHMgPSBleHRlbmQoe30sIGluc2VydFRleHRzLCBvcHRpb25zLmluc2VydFRleHRzIHx8IHt9KTtcblxuXG5cdC8vIE1lcmdpbmcgdGhlIHByb21wdFRleHRzLCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zXG5cdG9wdGlvbnMucHJvbXB0VGV4dHMgPSBwcm9tcHRUZXh0cztcblxuXG5cdC8vIE1lcmdpbmcgdGhlIGJsb2NrU3R5bGVzLCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zXG5cdG9wdGlvbnMuYmxvY2tTdHlsZXMgPSBleHRlbmQoe30sIGJsb2NrU3R5bGVzLCBvcHRpb25zLmJsb2NrU3R5bGVzIHx8IHt9KTtcblxuXG5cdC8vIE1lcmdpbmcgdGhlIHNob3J0Y3V0cywgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uc1xuXHRvcHRpb25zLnNob3J0Y3V0cyA9IGV4dGVuZCh7fSwgc2hvcnRjdXRzLCBvcHRpb25zLnNob3J0Y3V0cyB8fCB7fSk7XG5cblxuXHQvLyBDaGFuZ2UgdW5pcXVlX2lkIHRvIHVuaXF1ZUlkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXHRpZihvcHRpb25zLmF1dG9zYXZlICE9IHVuZGVmaW5lZCAmJiBvcHRpb25zLmF1dG9zYXZlLnVuaXF1ZV9pZCAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVfaWQgIT0gXCJcIilcblx0XHRvcHRpb25zLmF1dG9zYXZlLnVuaXF1ZUlkID0gb3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVfaWQ7XG5cblxuXHQvLyBVcGRhdGUgdGhpcyBvcHRpb25zXG5cdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblxuXHQvLyBBdXRvIHJlbmRlclxuXHR0aGlzLnJlbmRlcigpO1xuXG5cblx0Ly8gVGhlIGNvZGVtaXJyb3IgY29tcG9uZW50IGlzIG9ubHkgYXZhaWxhYmxlIGFmdGVyIHJlbmRlcmluZ1xuXHQvLyBzbywgdGhlIHNldHRlciBmb3IgdGhlIGluaXRpYWxWYWx1ZSBjYW4gb25seSBydW4gYWZ0ZXJcblx0Ly8gdGhlIGVsZW1lbnQgaGFzIGJlZW4gcmVuZGVyZWRcblx0aWYob3B0aW9ucy5pbml0aWFsVmFsdWUgJiYgKCF0aGlzLm9wdGlvbnMuYXV0b3NhdmUgfHwgdGhpcy5vcHRpb25zLmF1dG9zYXZlLmZvdW5kU2F2ZWRWYWx1ZSAhPT0gdHJ1ZSkpIHtcblx0XHR0aGlzLnZhbHVlKG9wdGlvbnMuaW5pdGlhbFZhbHVlKTtcblx0fVxufVxuXG4vKipcbiAqIERlZmF1bHQgbWFya2Rvd24gcmVuZGVyLlxuICovXG5TaW1wbGVNREUucHJvdG90eXBlLm1hcmtkb3duID0gZnVuY3Rpb24odGV4dCkge1xuXHRpZihtYXJrZWQpIHtcblx0XHQvLyBJbml0aWFsaXplXG5cdFx0dmFyIG1hcmtlZE9wdGlvbnMgPSB7fTtcblxuXG5cdFx0Ly8gVXBkYXRlIG9wdGlvbnNcblx0XHRpZih0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnJlbmRlcmluZ0NvbmZpZyAmJiB0aGlzLm9wdGlvbnMucmVuZGVyaW5nQ29uZmlnLnNpbmdsZUxpbmVCcmVha3MgPT09IGZhbHNlKSB7XG5cdFx0XHRtYXJrZWRPcHRpb25zLmJyZWFrcyA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXJrZWRPcHRpb25zLmJyZWFrcyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5yZW5kZXJpbmdDb25maWcgJiYgdGhpcy5vcHRpb25zLnJlbmRlcmluZ0NvbmZpZy5jb2RlU3ludGF4SGlnaGxpZ2h0aW5nID09PSB0cnVlICYmIHdpbmRvdy5obGpzKSB7XG5cdFx0XHRtYXJrZWRPcHRpb25zLmhpZ2hsaWdodCA9IGZ1bmN0aW9uKGNvZGUpIHtcblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5obGpzLmhpZ2hsaWdodEF1dG8oY29kZSkudmFsdWU7XG5cdFx0XHR9O1xuXHRcdH1cblxuXG5cdFx0Ly8gU2V0IG9wdGlvbnNcblx0XHRtYXJrZWQuc2V0T3B0aW9ucyhtYXJrZWRPcHRpb25zKTtcblxuXG5cdFx0Ly8gUmV0dXJuXG5cdFx0cmV0dXJuIG1hcmtlZCh0ZXh0KTtcblx0fVxufTtcblxuLyoqXG4gKiBSZW5kZXIgZWRpdG9yIHRvIHRoZSBnaXZlbiBlbGVtZW50LlxuICovXG5TaW1wbGVNREUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGVsKSB7XG5cdGlmKCFlbCkge1xuXHRcdGVsID0gdGhpcy5lbGVtZW50IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGV4dGFyZWFcIilbMF07XG5cdH1cblxuXHRpZih0aGlzLl9yZW5kZXJlZCAmJiB0aGlzLl9yZW5kZXJlZCA9PT0gZWwpIHtcblx0XHQvLyBBbHJlYWR5IHJlbmRlcmVkLlxuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuZWxlbWVudCA9IGVsO1xuXHR2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHZhciBrZXlNYXBzID0ge307XG5cblx0Zm9yKHZhciBrZXkgaW4gb3B0aW9ucy5zaG9ydGN1dHMpIHtcblx0XHQvLyBudWxsIHN0YW5kcyBmb3IgXCJkbyBub3QgYmluZCB0aGlzIGNvbW1hbmRcIlxuXHRcdGlmKG9wdGlvbnMuc2hvcnRjdXRzW2tleV0gIT09IG51bGwgJiYgYmluZGluZ3Nba2V5XSAhPT0gbnVsbCkge1xuXHRcdFx0KGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRrZXlNYXBzW2ZpeFNob3J0Y3V0KG9wdGlvbnMuc2hvcnRjdXRzW2tleV0pXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGJpbmRpbmdzW2tleV0oc2VsZik7XG5cdFx0XHRcdH07XG5cdFx0XHR9KShrZXkpO1xuXHRcdH1cblx0fVxuXG5cdGtleU1hcHNbXCJFbnRlclwiXSA9IFwibmV3bGluZUFuZEluZGVudENvbnRpbnVlTWFya2Rvd25MaXN0XCI7XG5cdGtleU1hcHNbXCJUYWJcIl0gPSBcInRhYkFuZEluZGVudE1hcmtkb3duTGlzdFwiO1xuXHRrZXlNYXBzW1wiU2hpZnQtVGFiXCJdID0gXCJzaGlmdFRhYkFuZFVuaW5kZW50TWFya2Rvd25MaXN0XCI7XG5cdGtleU1hcHNbXCJFc2NcIl0gPSBmdW5jdGlvbihjbSkge1xuXHRcdGlmKGNtLmdldE9wdGlvbihcImZ1bGxTY3JlZW5cIikpIHRvZ2dsZUZ1bGxTY3JlZW4oc2VsZik7XG5cdH07XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24oZSkge1xuXHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdGlmKGUua2V5Q29kZSA9PSAyNykge1xuXHRcdFx0aWYoc2VsZi5jb2RlbWlycm9yLmdldE9wdGlvbihcImZ1bGxTY3JlZW5cIikpIHRvZ2dsZUZ1bGxTY3JlZW4oc2VsZik7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG5cblx0dmFyIG1vZGUsIGJhY2tkcm9wO1xuXHRpZihvcHRpb25zLnNwZWxsQ2hlY2tlciAhPT0gZmFsc2UpIHtcblx0XHRtb2RlID0gXCJzcGVsbC1jaGVja2VyXCI7XG5cdFx0YmFja2Ryb3AgPSBvcHRpb25zLnBhcnNpbmdDb25maWc7XG5cdFx0YmFja2Ryb3AubmFtZSA9IFwiZ2ZtXCI7XG5cdFx0YmFja2Ryb3AuZ2l0SHViU3BpY2UgPSBmYWxzZTtcblxuXHRcdENvZGVNaXJyb3JTcGVsbENoZWNrZXIoe1xuXHRcdFx0Y29kZU1pcnJvckluc3RhbmNlOiBDb2RlTWlycm9yXG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0bW9kZSA9IG9wdGlvbnMucGFyc2luZ0NvbmZpZztcblx0XHRtb2RlLm5hbWUgPSBcImdmbVwiO1xuXHRcdG1vZGUuZ2l0SHViU3BpY2UgPSBmYWxzZTtcblx0fVxuXG5cdHRoaXMuY29kZW1pcnJvciA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGVsLCB7XG5cdFx0bW9kZTogbW9kZSxcblx0XHRiYWNrZHJvcDogYmFja2Ryb3AsXG5cdFx0dGhlbWU6IFwicGFwZXJcIixcblx0XHR0YWJTaXplOiAob3B0aW9ucy50YWJTaXplICE9IHVuZGVmaW5lZCkgPyBvcHRpb25zLnRhYlNpemUgOiAyLFxuXHRcdGluZGVudFVuaXQ6IChvcHRpb25zLnRhYlNpemUgIT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMudGFiU2l6ZSA6IDIsXG5cdFx0aW5kZW50V2l0aFRhYnM6IChvcHRpb25zLmluZGVudFdpdGhUYWJzID09PSBmYWxzZSkgPyBmYWxzZSA6IHRydWUsXG5cdFx0bGluZU51bWJlcnM6IGZhbHNlLFxuXHRcdGF1dG9mb2N1czogKG9wdGlvbnMuYXV0b2ZvY3VzID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcblx0XHRleHRyYUtleXM6IGtleU1hcHMsXG5cdFx0bGluZVdyYXBwaW5nOiAob3B0aW9ucy5saW5lV3JhcHBpbmcgPT09IGZhbHNlKSA/IGZhbHNlIDogdHJ1ZSxcblx0XHRhbGxvd0Ryb3BGaWxlVHlwZXM6IFtcInRleHQvcGxhaW5cIl0sXG5cdFx0cGxhY2Vob2xkZXI6IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgZWwuZ2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIikgfHwgXCJcIixcblx0XHRzdHlsZVNlbGVjdGVkVGV4dDogKG9wdGlvbnMuc3R5bGVTZWxlY3RlZFRleHQgIT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3R5bGVTZWxlY3RlZFRleHQgOiB0cnVlXG5cdH0pO1xuXG5cdGlmKG9wdGlvbnMuZm9yY2VTeW5jID09PSB0cnVlKSB7XG5cdFx0dmFyIGNtID0gdGhpcy5jb2RlbWlycm9yO1xuXHRcdGNtLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y20uc2F2ZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0dGhpcy5ndWkgPSB7fTtcblxuXHRpZihvcHRpb25zLnRvb2xiYXIgIT09IGZhbHNlKSB7XG5cdFx0dGhpcy5ndWkudG9vbGJhciA9IHRoaXMuY3JlYXRlVG9vbGJhcigpO1xuXHR9XG5cdGlmKG9wdGlvbnMuc3RhdHVzICE9PSBmYWxzZSkge1xuXHRcdHRoaXMuZ3VpLnN0YXR1c2JhciA9IHRoaXMuY3JlYXRlU3RhdHVzYmFyKCk7XG5cdH1cblx0aWYob3B0aW9ucy5hdXRvc2F2ZSAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdXRvc2F2ZS5lbmFibGVkID09PSB0cnVlKSB7XG5cdFx0dGhpcy5hdXRvc2F2ZSgpO1xuXHR9XG5cblx0dGhpcy5ndWkuc2lkZUJ5U2lkZSA9IHRoaXMuY3JlYXRlU2lkZUJ5U2lkZSgpO1xuXG5cdHRoaXMuX3JlbmRlcmVkID0gdGhpcy5lbGVtZW50O1xuXG5cblx0Ly8gRml4ZXMgQ29kZU1pcnJvciBidWcgKCMzNDQpXG5cdHZhciB0ZW1wX2NtID0gdGhpcy5jb2RlbWlycm9yO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdHRlbXBfY20ucmVmcmVzaCgpO1xuXHR9LmJpbmQodGVtcF9jbSksIDApO1xufTtcblxuLy8gU2FmYXJpLCBpbiBQcml2YXRlIEJyb3dzaW5nIE1vZGUsIGxvb2tzIGxpa2UgaXQgc3VwcG9ydHMgbG9jYWxTdG9yYWdlIGJ1dCBhbGwgY2FsbHMgdG8gc2V0SXRlbSB0aHJvdyBRdW90YUV4Y2VlZGVkRXJyb3IuIFdlJ3JlIGdvaW5nIHRvIGRldGVjdCB0aGlzIGFuZCBzZXQgYSB2YXJpYWJsZSBhY2NvcmRpbmdseS5cbmZ1bmN0aW9uIGlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlKCkge1xuXHRpZih0eXBlb2YgbG9jYWxTdG9yYWdlID09PSBcIm9iamVjdFwiKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic21kZV9sb2NhbFN0b3JhZ2VcIiwgMSk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInNtZGVfbG9jYWxTdG9yYWdlXCIpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuU2ltcGxlTURFLnByb3RvdHlwZS5hdXRvc2F2ZSA9IGZ1bmN0aW9uKCkge1xuXHRpZihpc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSgpKSB7XG5cdFx0dmFyIHNpbXBsZW1kZSA9IHRoaXM7XG5cblx0XHRpZih0aGlzLm9wdGlvbnMuYXV0b3NhdmUudW5pcXVlSWQgPT0gdW5kZWZpbmVkIHx8IHRoaXMub3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVJZCA9PSBcIlwiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlNpbXBsZU1ERTogWW91IG11c3Qgc2V0IGEgdW5pcXVlSWQgdG8gdXNlIHRoZSBhdXRvc2F2ZSBmZWF0dXJlXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKHNpbXBsZW1kZS5lbGVtZW50LmZvcm0gIT0gbnVsbCAmJiBzaW1wbGVtZGUuZWxlbWVudC5mb3JtICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0c2ltcGxlbWRlLmVsZW1lbnQuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInNtZGVfXCIgKyBzaW1wbGVtZGUub3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVJZCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm9wdGlvbnMuYXV0b3NhdmUubG9hZGVkICE9PSB0cnVlKSB7XG5cdFx0XHRpZih0eXBlb2YgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzbWRlX1wiICsgdGhpcy5vcHRpb25zLmF1dG9zYXZlLnVuaXF1ZUlkKSA9PSBcInN0cmluZ1wiICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic21kZV9cIiArIHRoaXMub3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVJZCkgIT0gXCJcIikge1xuXHRcdFx0XHR0aGlzLmNvZGVtaXJyb3Iuc2V0VmFsdWUobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzbWRlX1wiICsgdGhpcy5vcHRpb25zLmF1dG9zYXZlLnVuaXF1ZUlkKSk7XG5cdFx0XHRcdHRoaXMub3B0aW9ucy5hdXRvc2F2ZS5mb3VuZFNhdmVkVmFsdWUgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm9wdGlvbnMuYXV0b3NhdmUubG9hZGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNtZGVfXCIgKyB0aGlzLm9wdGlvbnMuYXV0b3NhdmUudW5pcXVlSWQsIHNpbXBsZW1kZS52YWx1ZSgpKTtcblxuXHRcdHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b3NhdmVkXCIpO1xuXHRcdGlmKGVsICE9IG51bGwgJiYgZWwgIT0gdW5kZWZpbmVkICYmIGVsICE9IFwiXCIpIHtcblx0XHRcdHZhciBkID0gbmV3IERhdGUoKTtcblx0XHRcdHZhciBoaCA9IGQuZ2V0SG91cnMoKTtcblx0XHRcdHZhciBtID0gZC5nZXRNaW51dGVzKCk7XG5cdFx0XHR2YXIgZGQgPSBcImFtXCI7XG5cdFx0XHR2YXIgaCA9IGhoO1xuXHRcdFx0aWYoaCA+PSAxMikge1xuXHRcdFx0XHRoID0gaGggLSAxMjtcblx0XHRcdFx0ZGQgPSBcInBtXCI7XG5cdFx0XHR9XG5cdFx0XHRpZihoID09IDApIHtcblx0XHRcdFx0aCA9IDEyO1xuXHRcdFx0fVxuXHRcdFx0bSA9IG0gPCAxMCA/IFwiMFwiICsgbSA6IG07XG5cblx0XHRcdGVsLmlubmVySFRNTCA9IFwiQXV0b3NhdmVkOiBcIiArIGggKyBcIjpcIiArIG0gKyBcIiBcIiArIGRkO1xuXHRcdH1cblxuXHRcdHRoaXMuYXV0b3NhdmVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2ltcGxlbWRlLmF1dG9zYXZlKCk7XG5cdFx0fSwgdGhpcy5vcHRpb25zLmF1dG9zYXZlLmRlbGF5IHx8IDEwMDAwKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZyhcIlNpbXBsZU1ERTogbG9jYWxTdG9yYWdlIG5vdCBhdmFpbGFibGUsIGNhbm5vdCBhdXRvc2F2ZVwiKTtcblx0fVxufTtcblxuU2ltcGxlTURFLnByb3RvdHlwZS5jbGVhckF1dG9zYXZlZFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdGlmKGlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlKCkpIHtcblx0XHRpZih0aGlzLm9wdGlvbnMuYXV0b3NhdmUgPT0gdW5kZWZpbmVkIHx8IHRoaXMub3B0aW9ucy5hdXRvc2F2ZS51bmlxdWVJZCA9PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb25zLmF1dG9zYXZlLnVuaXF1ZUlkID09IFwiXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiU2ltcGxlTURFOiBZb3UgbXVzdCBzZXQgYSB1bmlxdWVJZCB0byBjbGVhciB0aGUgYXV0b3NhdmUgdmFsdWVcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzbWRlX1wiICsgdGhpcy5vcHRpb25zLmF1dG9zYXZlLnVuaXF1ZUlkKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZyhcIlNpbXBsZU1ERTogbG9jYWxTdG9yYWdlIG5vdCBhdmFpbGFibGUsIGNhbm5vdCBhdXRvc2F2ZVwiKTtcblx0fVxufTtcblxuU2ltcGxlTURFLnByb3RvdHlwZS5jcmVhdGVTaWRlQnlTaWRlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjbSA9IHRoaXMuY29kZW1pcnJvcjtcblx0dmFyIHdyYXBwZXIgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuXHR2YXIgcHJldmlldyA9IHdyYXBwZXIubmV4dFNpYmxpbmc7XG5cblx0aWYoIXByZXZpZXcgfHwgIS9lZGl0b3ItcHJldmlldy1zaWRlLy50ZXN0KHByZXZpZXcuY2xhc3NOYW1lKSkge1xuXHRcdHByZXZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByZXZpZXcuY2xhc3NOYW1lID0gXCJlZGl0b3ItcHJldmlldy1zaWRlXCI7XG5cdFx0d3JhcHBlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcmV2aWV3LCB3cmFwcGVyLm5leHRTaWJsaW5nKTtcblx0fVxuXG5cdC8vIFN5bmNzIHNjcm9sbCAgZWRpdG9yIC0+IHByZXZpZXdcblx0dmFyIGNTY3JvbGwgPSBmYWxzZTtcblx0dmFyIHBTY3JvbGwgPSBmYWxzZTtcblx0Y20ub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24odikge1xuXHRcdGlmKGNTY3JvbGwpIHtcblx0XHRcdGNTY3JvbGwgPSBmYWxzZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cFNjcm9sbCA9IHRydWU7XG5cdFx0dmFyIGhlaWdodCA9IHYuZ2V0U2Nyb2xsSW5mbygpLmhlaWdodCAtIHYuZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodDtcblx0XHR2YXIgcmF0aW8gPSBwYXJzZUZsb2F0KHYuZ2V0U2Nyb2xsSW5mbygpLnRvcCkgLyBoZWlnaHQ7XG5cdFx0dmFyIG1vdmUgPSAocHJldmlldy5zY3JvbGxIZWlnaHQgLSBwcmV2aWV3LmNsaWVudEhlaWdodCkgKiByYXRpbztcblx0XHRwcmV2aWV3LnNjcm9sbFRvcCA9IG1vdmU7XG5cdH0pO1xuXG5cdC8vIFN5bmNzIHNjcm9sbCAgcHJldmlldyAtPiBlZGl0b3Jcblx0cHJldmlldy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKHBTY3JvbGwpIHtcblx0XHRcdHBTY3JvbGwgPSBmYWxzZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y1Njcm9sbCA9IHRydWU7XG5cdFx0dmFyIGhlaWdodCA9IHByZXZpZXcuc2Nyb2xsSGVpZ2h0IC0gcHJldmlldy5jbGllbnRIZWlnaHQ7XG5cdFx0dmFyIHJhdGlvID0gcGFyc2VGbG9hdChwcmV2aWV3LnNjcm9sbFRvcCkgLyBoZWlnaHQ7XG5cdFx0dmFyIG1vdmUgPSAoY20uZ2V0U2Nyb2xsSW5mbygpLmhlaWdodCAtIGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQpICogcmF0aW87XG5cdFx0Y20uc2Nyb2xsVG8oMCwgbW92ZSk7XG5cdH07XG5cdHJldHVybiBwcmV2aWV3O1xufTtcblxuU2ltcGxlTURFLnByb3RvdHlwZS5jcmVhdGVUb29sYmFyID0gZnVuY3Rpb24oaXRlbXMpIHtcblx0aXRlbXMgPSBpdGVtcyB8fCB0aGlzLm9wdGlvbnMudG9vbGJhcjtcblxuXHRpZighaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBpO1xuXHRmb3IoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmKHRvb2xiYXJCdWlsdEluQnV0dG9uc1tpdGVtc1tpXV0gIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpdGVtc1tpXSA9IHRvb2xiYXJCdWlsdEluQnV0dG9uc1tpdGVtc1tpXV07XG5cdFx0fVxuXHR9XG5cblx0dmFyIGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGJhci5jbGFzc05hbWUgPSBcImVkaXRvci10b29sYmFyXCI7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciB0b29sYmFyRGF0YSA9IHt9O1xuXHRzZWxmLnRvb2xiYXIgPSBpdGVtcztcblxuXHRmb3IoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmKGl0ZW1zW2ldLm5hbWUgPT0gXCJndWlkZVwiICYmIHNlbGYub3B0aW9ucy50b29sYmFyR3VpZGVJY29uID09PSBmYWxzZSlcblx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0aWYoc2VsZi5vcHRpb25zLmhpZGVJY29ucyAmJiBzZWxmLm9wdGlvbnMuaGlkZUljb25zLmluZGV4T2YoaXRlbXNbaV0ubmFtZSkgIT0gLTEpXG5cdFx0XHRjb250aW51ZTtcblxuXHRcdC8vIEZ1bGxzY3JlZW4gZG9lcyBub3Qgd29yayB3ZWxsIG9uIG1vYmlsZSBkZXZpY2VzIChldmVuIHRhYmxldHMpXG5cdFx0Ly8gSW4gdGhlIGZ1dHVyZSwgaG9wZWZ1bGx5IHRoaXMgY2FuIGJlIHJlc29sdmVkXG5cdFx0aWYoKGl0ZW1zW2ldLm5hbWUgPT0gXCJmdWxsc2NyZWVuXCIgfHwgaXRlbXNbaV0ubmFtZSA9PSBcInNpZGUtYnktc2lkZVwiKSAmJiBpc01vYmlsZSgpKVxuXHRcdFx0Y29udGludWU7XG5cblxuXHRcdC8vIERvbid0IGluY2x1ZGUgdHJhaWxpbmcgc2VwYXJhdG9yc1xuXHRcdGlmKGl0ZW1zW2ldID09PSBcInxcIikge1xuXHRcdFx0dmFyIG5vblNlcGFyYXRvckljb25zRm9sbG93ID0gZmFsc2U7XG5cblx0XHRcdGZvcih2YXIgeCA9IChpICsgMSk7IHggPCBpdGVtcy5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRpZihpdGVtc1t4XSAhPT0gXCJ8XCIgJiYgKCFzZWxmLm9wdGlvbnMuaGlkZUljb25zIHx8IHNlbGYub3B0aW9ucy5oaWRlSWNvbnMuaW5kZXhPZihpdGVtc1t4XS5uYW1lKSA9PSAtMSkpIHtcblx0XHRcdFx0XHRub25TZXBhcmF0b3JJY29uc0ZvbGxvdyA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIW5vblNlcGFyYXRvckljb25zRm9sbG93KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblxuXHRcdC8vIENyZWF0ZSB0aGUgaWNvbiBhbmQgYXBwZW5kIHRvIHRoZSB0b29sYmFyXG5cdFx0KGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdHZhciBlbDtcblx0XHRcdGlmKGl0ZW0gPT09IFwifFwiKSB7XG5cdFx0XHRcdGVsID0gY3JlYXRlU2VwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbCA9IGNyZWF0ZUljb24oaXRlbSwgc2VsZi5vcHRpb25zLnRvb2xiYXJUaXBzLCBzZWxmLm9wdGlvbnMuc2hvcnRjdXRzKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmluZCBldmVudHMsIHNwZWNpYWwgZm9yIGluZm9cblx0XHRcdGlmKGl0ZW0uYWN0aW9uKSB7XG5cdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmFjdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0ZWwub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdGl0ZW0uYWN0aW9uKHNlbGYpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gZWxzZSBpZih0eXBlb2YgaXRlbS5hY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRlbC5ocmVmID0gaXRlbS5hY3Rpb247XG5cdFx0XHRcdFx0ZWwudGFyZ2V0ID0gXCJfYmxhbmtcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0b29sYmFyRGF0YVtpdGVtLm5hbWUgfHwgaXRlbV0gPSBlbDtcblx0XHRcdGJhci5hcHBlbmRDaGlsZChlbCk7XG5cdFx0fSkoaXRlbXNbaV0pO1xuXHR9XG5cblx0c2VsZi50b29sYmFyRWxlbWVudHMgPSB0b29sYmFyRGF0YTtcblxuXHR2YXIgY20gPSB0aGlzLmNvZGVtaXJyb3I7XG5cdGNtLm9uKFwiY3Vyc29yQWN0aXZpdHlcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHN0YXQgPSBnZXRTdGF0ZShjbSk7XG5cblx0XHRmb3IodmFyIGtleSBpbiB0b29sYmFyRGF0YSkge1xuXHRcdFx0KGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHR2YXIgZWwgPSB0b29sYmFyRGF0YVtrZXldO1xuXHRcdFx0XHRpZihzdGF0W2tleV0pIHtcblx0XHRcdFx0XHRlbC5jbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZihrZXkgIT0gXCJmdWxsc2NyZWVuXCIgJiYga2V5ICE9IFwic2lkZS1ieS1zaWRlXCIpIHtcblx0XHRcdFx0XHRlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgvXFxzKmFjdGl2ZVxccyovZywgXCJcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pKGtleSk7XG5cdFx0fVxuXHR9KTtcblxuXHR2YXIgY21XcmFwcGVyID0gY20uZ2V0V3JhcHBlckVsZW1lbnQoKTtcblx0Y21XcmFwcGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJhciwgY21XcmFwcGVyKTtcblx0cmV0dXJuIGJhcjtcbn07XG5cblNpbXBsZU1ERS5wcm90b3R5cGUuY3JlYXRlU3RhdHVzYmFyID0gZnVuY3Rpb24oc3RhdHVzKSB7XG5cdC8vIEluaXRpYWxpemVcblx0c3RhdHVzID0gc3RhdHVzIHx8IHRoaXMub3B0aW9ucy5zdGF0dXM7XG5cdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHR2YXIgY20gPSB0aGlzLmNvZGVtaXJyb3I7XG5cblxuXHQvLyBNYWtlIHN1cmUgdGhlIHN0YXR1cyB2YXJpYWJsZSBpcyB2YWxpZFxuXHRpZighc3RhdHVzIHx8IHN0YXR1cy5sZW5ndGggPT09IDApXG5cdFx0cmV0dXJuO1xuXG5cblx0Ly8gU2V0IHVwIHRoZSBidWlsdC1pbiBpdGVtc1xuXHR2YXIgaXRlbXMgPSBbXTtcblx0dmFyIGksIG9uVXBkYXRlLCBkZWZhdWx0VmFsdWU7XG5cblx0Zm9yKGkgPSAwOyBpIDwgc3RhdHVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVzZXQgc29tZSB2YWx1ZXNcblx0XHRvblVwZGF0ZSA9IHVuZGVmaW5lZDtcblx0XHRkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQ7XG5cblxuXHRcdC8vIEhhbmRsZSBpZiBjdXN0b20gb3Igbm90XG5cdFx0aWYodHlwZW9mIHN0YXR1c1tpXSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0aXRlbXMucHVzaCh7XG5cdFx0XHRcdGNsYXNzTmFtZTogc3RhdHVzW2ldLmNsYXNzTmFtZSxcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBzdGF0dXNbaV0uZGVmYXVsdFZhbHVlLFxuXHRcdFx0XHRvblVwZGF0ZTogc3RhdHVzW2ldLm9uVXBkYXRlXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG5hbWUgPSBzdGF0dXNbaV07XG5cblx0XHRcdGlmKG5hbWUgPT09IFwid29yZHNcIikge1xuXHRcdFx0XHRkZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRcdGVsLmlubmVySFRNTCA9IHdvcmRDb3VudChjbS5nZXRWYWx1ZSgpKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0b25VcGRhdGUgPSBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRcdGVsLmlubmVySFRNTCA9IHdvcmRDb3VudChjbS5nZXRWYWx1ZSgpKTtcblx0XHRcdFx0fTtcblx0XHRcdH0gZWxzZSBpZihuYW1lID09PSBcImxpbmVzXCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0XHRlbC5pbm5lckhUTUwgPSBjbS5saW5lQ291bnQoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0b25VcGRhdGUgPSBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRcdGVsLmlubmVySFRNTCA9IGNtLmxpbmVDb3VudCgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmKG5hbWUgPT09IFwiY3Vyc29yXCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0XHRlbC5pbm5lckhUTUwgPSBcIjA6MFwiO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRvblVwZGF0ZSA9IGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdFx0dmFyIHBvcyA9IGNtLmdldEN1cnNvcigpO1xuXHRcdFx0XHRcdGVsLmlubmVySFRNTCA9IHBvcy5saW5lICsgXCI6XCIgKyBwb3MuY2g7XG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2UgaWYobmFtZSA9PT0gXCJhdXRvc2F2ZVwiKSB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdFx0aWYob3B0aW9ucy5hdXRvc2F2ZSAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdXRvc2F2ZS5lbmFibGVkID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImF1dG9zYXZlZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGl0ZW1zLnB1c2goe1xuXHRcdFx0XHRjbGFzc05hbWU6IG5hbWUsXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuXHRcdFx0XHRvblVwZGF0ZTogb25VcGRhdGVcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cblx0Ly8gQ3JlYXRlIGVsZW1lbnQgZm9yIHRoZSBzdGF0dXMgYmFyXG5cdHZhciBiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRiYXIuY2xhc3NOYW1lID0gXCJlZGl0b3Itc3RhdHVzYmFyXCI7XG5cblxuXHQvLyBDcmVhdGUgYSBuZXcgc3BhbiBmb3IgZWFjaCBpdGVtXG5cdGZvcihpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gU3RvcmUgaW4gdGVtcG9yYXJ5IHZhcmlhYmxlXG5cdFx0dmFyIGl0ZW0gPSBpdGVtc1tpXTtcblxuXG5cdFx0Ly8gQ3JlYXRlIHNwYW4gZWxlbWVudFxuXHRcdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdGVsLmNsYXNzTmFtZSA9IGl0ZW0uY2xhc3NOYW1lO1xuXG5cblx0XHQvLyBFbnN1cmUgdGhlIGRlZmF1bHRWYWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aWYodHlwZW9mIGl0ZW0uZGVmYXVsdFZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGl0ZW0uZGVmYXVsdFZhbHVlKGVsKTtcblx0XHR9XG5cblxuXHRcdC8vIEVuc3VyZSB0aGUgb25VcGRhdGUgaXMgYSBmdW5jdGlvblxuXHRcdGlmKHR5cGVvZiBpdGVtLm9uVXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdC8vIENyZWF0ZSBhIGNsb3N1cmUgYXJvdW5kIHRoZSBzcGFuIG9mIHRoZSBjdXJyZW50IGFjdGlvbiwgdGhlbiBleGVjdXRlIHRoZSBvblVwZGF0ZSBoYW5kbGVyXG5cdFx0XHR0aGlzLmNvZGVtaXJyb3Iub24oXCJ1cGRhdGVcIiwgKGZ1bmN0aW9uKGVsLCBpdGVtKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpdGVtLm9uVXBkYXRlKGVsKTtcblx0XHRcdFx0fTtcblx0XHRcdH0oZWwsIGl0ZW0pKSk7XG5cdFx0fVxuXG5cblx0XHQvLyBBcHBlbmQgdGhlIGl0ZW0gdG8gdGhlIHN0YXR1cyBiYXJcblx0XHRiYXIuYXBwZW5kQ2hpbGQoZWwpO1xuXHR9XG5cblxuXHQvLyBJbnNlcnQgdGhlIHN0YXR1cyBiYXIgaW50byB0aGUgRE9NXG5cdHZhciBjbVdyYXBwZXIgPSB0aGlzLmNvZGVtaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKTtcblx0Y21XcmFwcGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJhciwgY21XcmFwcGVyLm5leHRTaWJsaW5nKTtcblx0cmV0dXJuIGJhcjtcbn07XG5cbi8qKlxuICogR2V0IG9yIHNldCB0aGUgdGV4dCBjb250ZW50LlxuICovXG5TaW1wbGVNREUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG5cdGlmKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29kZW1pcnJvci5nZXRWYWx1ZSgpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuY29kZW1pcnJvci5nZXREb2MoKS5zZXRWYWx1ZSh2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuXG5cbi8qKlxuICogQmluZCBzdGF0aWMgbWV0aG9kcyBmb3IgZXhwb3J0cy5cbiAqL1xuU2ltcGxlTURFLnRvZ2dsZUJvbGQgPSB0b2dnbGVCb2xkO1xuU2ltcGxlTURFLnRvZ2dsZUl0YWxpYyA9IHRvZ2dsZUl0YWxpYztcblNpbXBsZU1ERS50b2dnbGVTdHJpa2V0aHJvdWdoID0gdG9nZ2xlU3RyaWtldGhyb3VnaDtcblNpbXBsZU1ERS50b2dnbGVCbG9ja3F1b3RlID0gdG9nZ2xlQmxvY2txdW90ZTtcblNpbXBsZU1ERS50b2dnbGVIZWFkaW5nU21hbGxlciA9IHRvZ2dsZUhlYWRpbmdTbWFsbGVyO1xuU2ltcGxlTURFLnRvZ2dsZUhlYWRpbmdCaWdnZXIgPSB0b2dnbGVIZWFkaW5nQmlnZ2VyO1xuU2ltcGxlTURFLnRvZ2dsZUhlYWRpbmcxID0gdG9nZ2xlSGVhZGluZzE7XG5TaW1wbGVNREUudG9nZ2xlSGVhZGluZzIgPSB0b2dnbGVIZWFkaW5nMjtcblNpbXBsZU1ERS50b2dnbGVIZWFkaW5nMyA9IHRvZ2dsZUhlYWRpbmczO1xuU2ltcGxlTURFLnRvZ2dsZUNvZGVCbG9jayA9IHRvZ2dsZUNvZGVCbG9jaztcblNpbXBsZU1ERS50b2dnbGVVbm9yZGVyZWRMaXN0ID0gdG9nZ2xlVW5vcmRlcmVkTGlzdDtcblNpbXBsZU1ERS50b2dnbGVPcmRlcmVkTGlzdCA9IHRvZ2dsZU9yZGVyZWRMaXN0O1xuU2ltcGxlTURFLmNsZWFuQmxvY2sgPSBjbGVhbkJsb2NrO1xuU2ltcGxlTURFLmRyYXdMaW5rID0gZHJhd0xpbms7XG5TaW1wbGVNREUuZHJhd0ltYWdlID0gZHJhd0ltYWdlO1xuU2ltcGxlTURFLmRyYXdUYWJsZSA9IGRyYXdUYWJsZTtcblNpbXBsZU1ERS5kcmF3SG9yaXpvbnRhbFJ1bGUgPSBkcmF3SG9yaXpvbnRhbFJ1bGU7XG5TaW1wbGVNREUudW5kbyA9IHVuZG87XG5TaW1wbGVNREUucmVkbyA9IHJlZG87XG5TaW1wbGVNREUudG9nZ2xlUHJldmlldyA9IHRvZ2dsZVByZXZpZXc7XG5TaW1wbGVNREUudG9nZ2xlU2lkZUJ5U2lkZSA9IHRvZ2dsZVNpZGVCeVNpZGU7XG5TaW1wbGVNREUudG9nZ2xlRnVsbFNjcmVlbiA9IHRvZ2dsZUZ1bGxTY3JlZW47XG5cbi8qKlxuICogQmluZCBpbnN0YW5jZSBtZXRob2RzIGZvciBleHBvcnRzLlxuICovXG5TaW1wbGVNREUucHJvdG90eXBlLnRvZ2dsZUJvbGQgPSBmdW5jdGlvbigpIHtcblx0dG9nZ2xlQm9sZCh0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLnRvZ2dsZUl0YWxpYyA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVJdGFsaWModGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVTdHJpa2V0aHJvdWdoID0gZnVuY3Rpb24oKSB7XG5cdHRvZ2dsZVN0cmlrZXRocm91Z2godGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVCbG9ja3F1b3RlID0gZnVuY3Rpb24oKSB7XG5cdHRvZ2dsZUJsb2NrcXVvdGUodGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVIZWFkaW5nU21hbGxlciA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVIZWFkaW5nU21hbGxlcih0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLnRvZ2dsZUhlYWRpbmdCaWdnZXIgPSBmdW5jdGlvbigpIHtcblx0dG9nZ2xlSGVhZGluZ0JpZ2dlcih0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLnRvZ2dsZUhlYWRpbmcxID0gZnVuY3Rpb24oKSB7XG5cdHRvZ2dsZUhlYWRpbmcxKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUudG9nZ2xlSGVhZGluZzIgPSBmdW5jdGlvbigpIHtcblx0dG9nZ2xlSGVhZGluZzIodGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVIZWFkaW5nMyA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVIZWFkaW5nMyh0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLnRvZ2dsZUNvZGVCbG9jayA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVDb2RlQmxvY2sodGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVVbm9yZGVyZWRMaXN0ID0gZnVuY3Rpb24oKSB7XG5cdHRvZ2dsZVVub3JkZXJlZExpc3QodGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS50b2dnbGVPcmRlcmVkTGlzdCA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVPcmRlcmVkTGlzdCh0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLmNsZWFuQmxvY2sgPSBmdW5jdGlvbigpIHtcblx0Y2xlYW5CbG9jayh0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLmRyYXdMaW5rID0gZnVuY3Rpb24oKSB7XG5cdGRyYXdMaW5rKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUuZHJhd0ltYWdlID0gZnVuY3Rpb24oKSB7XG5cdGRyYXdJbWFnZSh0aGlzKTtcbn07XG5TaW1wbGVNREUucHJvdG90eXBlLmRyYXdUYWJsZSA9IGZ1bmN0aW9uKCkge1xuXHRkcmF3VGFibGUodGhpcyk7XG59O1xuU2ltcGxlTURFLnByb3RvdHlwZS5kcmF3SG9yaXpvbnRhbFJ1bGUgPSBmdW5jdGlvbigpIHtcblx0ZHJhd0hvcml6b250YWxSdWxlKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uKCkge1xuXHR1bmRvKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uKCkge1xuXHRyZWRvKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUudG9nZ2xlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVQcmV2aWV3KHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUudG9nZ2xlU2lkZUJ5U2lkZSA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVTaWRlQnlTaWRlKHRoaXMpO1xufTtcblNpbXBsZU1ERS5wcm90b3R5cGUudG9nZ2xlRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCkge1xuXHR0b2dnbGVGdWxsU2NyZWVuKHRoaXMpO1xufTtcblxuU2ltcGxlTURFLnByb3RvdHlwZS5pc1ByZXZpZXdBY3RpdmUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNtID0gdGhpcy5jb2RlbWlycm9yO1xuXHR2YXIgd3JhcHBlciA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG5cdHZhciBwcmV2aWV3ID0gd3JhcHBlci5sYXN0Q2hpbGQ7XG5cblx0cmV0dXJuIC9lZGl0b3ItcHJldmlldy1hY3RpdmUvLnRlc3QocHJldmlldy5jbGFzc05hbWUpO1xufTtcblxuU2ltcGxlTURFLnByb3RvdHlwZS5pc1NpZGVCeVNpZGVBY3RpdmUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNtID0gdGhpcy5jb2RlbWlycm9yO1xuXHR2YXIgd3JhcHBlciA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG5cdHZhciBwcmV2aWV3ID0gd3JhcHBlci5uZXh0U2libGluZztcblxuXHRyZXR1cm4gL2VkaXRvci1wcmV2aWV3LWFjdGl2ZS1zaWRlLy50ZXN0KHByZXZpZXcuY2xhc3NOYW1lKTtcbn07XG5cblNpbXBsZU1ERS5wcm90b3R5cGUuaXNGdWxsc2NyZWVuQWN0aXZlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjbSA9IHRoaXMuY29kZW1pcnJvcjtcblxuXHRyZXR1cm4gY20uZ2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiKTtcbn07XG5cblNpbXBsZU1ERS5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNtID0gdGhpcy5jb2RlbWlycm9yO1xuXG5cdHJldHVybiBnZXRTdGF0ZShjbSk7XG59O1xuXG5TaW1wbGVNREUucHJvdG90eXBlLnRvVGV4dEFyZWEgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNtID0gdGhpcy5jb2RlbWlycm9yO1xuXHR2YXIgd3JhcHBlciA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG5cblx0aWYod3JhcHBlci5wYXJlbnROb2RlKSB7XG5cdFx0aWYodGhpcy5ndWkudG9vbGJhcikge1xuXHRcdFx0d3JhcHBlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ3VpLnRvb2xiYXIpO1xuXHRcdH1cblx0XHRpZih0aGlzLmd1aS5zdGF0dXNiYXIpIHtcblx0XHRcdHdyYXBwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmd1aS5zdGF0dXNiYXIpO1xuXHRcdH1cblx0XHRpZih0aGlzLmd1aS5zaWRlQnlTaWRlKSB7XG5cdFx0XHR3cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ndWkuc2lkZUJ5U2lkZSk7XG5cdFx0fVxuXHR9XG5cblx0Y20udG9UZXh0QXJlYSgpO1xuXG5cdGlmKHRoaXMuYXV0b3NhdmVUaW1lb3V0SWQpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5hdXRvc2F2ZVRpbWVvdXRJZCk7XG5cdFx0dGhpcy5hdXRvc2F2ZVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNsZWFyQXV0b3NhdmVkVmFsdWUoKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVNREU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2ltcGxlbWRlL3NyYy9qcy9zaW1wbGVtZGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3NpbXBsZW1kZS9zcmMvanMvc2ltcGxlbWRlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwialF1ZXJ5XCIpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpRdWVyeVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlNvY2lhbFNoYXJlPWUocmVxdWlyZShcImpRdWVyeVwiKSk6dC5Tb2NpYWxTaGFyZT1lKHQualF1ZXJ5KX0odGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsZSksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gZS5tPXQsZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixyKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sZS5uPWZ1bmN0aW9uKHQpe3ZhciBuPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBlLmQobixcImFcIixuKSxufSxlLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LGUucD1cIlwiLGUoZS5zPTQ4KX0oW2Z1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtlLl9fZXNNb2R1bGU9ITAsZS5kZWZhdWx0PWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtlLl9fZXNNb2R1bGU9ITA7dmFyIHI9big0OSksbz1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19KHIpO2UuZGVmYXVsdD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZVtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksKDAsby5kZWZhdWx0KSh0LHIua2V5LHIpfX1yZXR1cm4gZnVuY3Rpb24oZSxuLHIpe3JldHVybiBuJiZ0KGUucHJvdG90eXBlLG4pLHImJnQoZSxyKSxlfX0oKX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lk1hdGg9PU1hdGg/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLk1hdGg9PU1hdGg/c2VsZjpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJudW1iZXJcIj09dHlwZW9mIF9fZyYmKF9fZz1uKX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIyLjUuMVwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNSksbz1uKDM1KSx1PW4oMjApLGk9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDUpP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbih0LGUsbil7aWYocih0KSxlPXUoZSwhMCkscihuKSxvKXRyeXtyZXR1cm4gaSh0LGUsbil9Y2F0Y2godCl7fWlmKFwiZ2V0XCJpbiBufHxcInNldFwiaW4gbil0aHJvdyBUeXBlRXJyb3IoXCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCFcIik7cmV0dXJuXCJ2YWx1ZVwiaW4gbiYmKHRbZV09bi52YWx1ZSksdH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMTcpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNTUpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9Lmhhc093blByb3BlcnR5O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuLmNhbGwodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtlLl9fZXNNb2R1bGU9ITA7dmFyIHI9big0MCksbz1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19KHIpO2UuZGVmYXVsdD1mdW5jdGlvbih0LGUpe2lmKCF0KXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4hZXx8XCJvYmplY3RcIiE9PSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6KDAsby5kZWZhdWx0KShlKSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGU/dDplfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWUuX19lc01vZHVsZT0hMDt2YXIgbz1uKDgzKSx1PXIobyksaT1uKDg3KSxmPXIoaSksYz1uKDQwKSxhPXIoYyk7ZS5kZWZhdWx0PWZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrKHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjooMCxhLmRlZmF1bHQpKGUpKSk7dC5wcm90b3R5cGU9KDAsZi5kZWZhdWx0KShlJiZlLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnQsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmKHUuZGVmYXVsdD8oMCx1LmRlZmF1bHQpKHQsZSk6dC5fX3Byb3RvX189ZSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigwKSx1PXIobyksaT1uKDEpLGY9cihpKSxjPW4oMzcpLGE9cihjKSxzPW4oOTApLGw9ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciBlPXt9O2lmKG51bGwhPXQpZm9yKHZhciBuIGluIHQpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbikmJihlW25dPXRbbl0pO3JldHVybiBlLmRlZmF1bHQ9dCxlfShzKSxwPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlKXsoMCx1LmRlZmF1bHQpKHRoaXMsdCksdGhpcy5vcHRpb25zPWEuZGVmYXVsdC5leHRlbmQoe3dpZHRoOjU3NSxoZWlnaHQ6NDAwLGljb25DbGFzczpcInNvY2lhbC1zaGFyZS1pY29uIHNvY2lhbC1zaGFyZS1pY29uLVwiK3RoaXMuZ2V0TmFtZSgpfSxlKSx0aGlzLmVsZW1lbnQ9dGhpcy5fY3JlYXRlRG9tTm9kZSgpfXJldHVybigwLGYuZGVmYXVsdCkodCxbe2tleTpcImdldE5hbWVcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwicHJvdmlkZXJcIn19LHtrZXk6XCJnZXRFbGVtZW50XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50fX0se2tleTpcIl9jcmVhdGVEb21Ob2RlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD0nPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiJyt0aGlzLm9wdGlvbnMuaWNvbkNsYXNzKydcIj48L2E+JyxlPSgwLGEuZGVmYXVsdCkodCk7cmV0dXJuIHRoaXMuX2JpbmRFdmVudHMoZSksZX19LHtrZXk6XCJfY3JlYXRlVXJsXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3JldHVybiB0aGlzLl9nZXRVcmxUZW1wbGF0ZSgpLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLGZ1bmN0aW9uKGUpe3ZhciBuPWUuc2xpY2UoMSwtMSk7cmV0dXJuIHZvaWQgMCE9PXQub3B0aW9uc1tuXT90Lm9wdGlvbnNbbl06XCJcIn0pfX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJcIn19LHtrZXk6XCJfYmluZEV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7dC5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtsLm9wZW5XaW4oZS5fY3JlYXRlVXJsKCksZS5vcHRpb25zLndpZHRoLGUub3B0aW9ucy5oZWlnaHQpLmZvY3VzKCl9KX19XSksdH0oKTtlLmRlZmF1bHQ9cH0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMiksbz1uKDMpLHU9bigzNCksaT1uKDEyKSxmPWZ1bmN0aW9uKHQsZSxuKXt2YXIgYyxhLHMsbD10JmYuRixwPXQmZi5HLGQ9dCZmLlMsdj10JmYuUCx5PXQmZi5CLGg9dCZmLlcsXz1wP286b1tlXXx8KG9bZV09e30pLG09Xy5wcm90b3R5cGUsYj1wP3I6ZD9yW2VdOihyW2VdfHx7fSkucHJvdG90eXBlO3AmJihuPWUpO2ZvcihjIGluIG4pKGE9IWwmJmImJnZvaWQgMCE9PWJbY10pJiZjIGluIF98fChzPWE/YltjXTpuW2NdLF9bY109cCYmXCJmdW5jdGlvblwiIT10eXBlb2YgYltjXT9uW2NdOnkmJmE/dShzLHIpOmgmJmJbY109PXM/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGUucHJvdG90eXBlPXQucHJvdG90eXBlLGV9KHMpOnYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHM/dShGdW5jdGlvbi5jYWxsLHMpOnMsdiYmKChfLnZpcnR1YWx8fChfLnZpcnR1YWw9e30pKVtjXT1zLHQmZi5SJiZtJiYhbVtjXSYmaShtLGMscykpKX07Zi5GPTEsZi5HPTIsZi5TPTQsZi5QPTgsZi5CPTE2LGYuVz0zMixmLlU9NjQsZi5SPTEyOCx0LmV4cG9ydHM9Zn0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksbz1uKDE4KTt0LmV4cG9ydHM9big1KT9mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZih0LGUsbygxLG4pKX06ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDY0KSxvPW4oMjEpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihvKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIzKShcIndrc1wiKSxvPW4oMTkpLHU9bigyKS5TeW1ib2wsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1Oyh0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPWkmJnVbdF18fChpP3U6bykoXCJTeW1ib2wuXCIrdCkpfSkuc3RvcmU9cn0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTYpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZighcih0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYW4gb2JqZWN0IVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixvO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09dCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIrdCk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMykoXCJrZXlzXCIpLG89bigxOSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1vKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIpLG89cltcIl9fY29yZS1qc19zaGFyZWRfX1wiXXx8KHJbXCJfX2NvcmUtanNfc2hhcmVkX19cIl09e30pO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gb1t0XXx8KG9bdF09e30pfX0sZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLmNlaWwscj1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP3I6bikodCl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz0hMH0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e319LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE1KSxvPW4oNjMpLHU9bigyOSksaT1uKDIyKShcIklFX1BST1RPXCIpLGY9ZnVuY3Rpb24oKXt9LGM9ZnVuY3Rpb24oKXt2YXIgdCxlPW4oMzYpKFwiaWZyYW1lXCIpLHI9dS5sZW5ndGg7Zm9yKGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixuKDY4KS5hcHBlbmRDaGlsZChlKSxlLnNyYz1cImphdmFzY3JpcHQ6XCIsdD1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQsdC5vcGVuKCksdC53cml0ZShcIjxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8XFwvc2NyaXB0PlwiKSx0LmNsb3NlKCksYz10LkY7ci0tOylkZWxldGUgYy5wcm90b3R5cGVbdVtyXV07cmV0dXJuIGMoKX07dC5leHBvcnRzPU9iamVjdC5jcmVhdGV8fGZ1bmN0aW9uKHQsZSl7dmFyIG47cmV0dXJuIG51bGwhPT10PyhmLnByb3RvdHlwZT1yKHQpLG49bmV3IGYsZi5wcm90b3R5cGU9bnVsbCxuW2ldPXQpOm49YygpLHZvaWQgMD09PWU/bjpvKG4sZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0Myksbz1uKDI5KTt0LmV4cG9ydHM9T2JqZWN0LmtleXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsbyl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1cImNvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZlwiLnNwbGl0KFwiLFwiKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCkuZixvPW4oNyksdT1uKDE0KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIW8odD1uP3Q6dC5wcm90b3R5cGUsdSkmJnIodCx1LHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlLG4pe2UuZj1uKDE0KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMiksbz1uKDMpLHU9bigyNSksaT1uKDMxKSxmPW4oNCkuZjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9by5TeW1ib2x8fChvLlN5bWJvbD11P3t9OnIuU3ltYm9sfHx7fSk7XCJfXCI9PXQuY2hhckF0KDApfHx0IGluIGV8fGYoZSx0LHt2YWx1ZTppLmYodCl9KX19LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1Mik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtpZihyKHQpLHZvaWQgMD09PWUpcmV0dXJuIHQ7c3dpdGNoKG4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbChlLG4pfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKG4scil7cmV0dXJuIHQuY2FsbChlLG4scil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLG8pe3JldHVybiB0LmNhbGwoZSxuLHIsbyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KGUsYXJndW1lbnRzKX19fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPSFuKDUpJiYhbigxNykoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMzYpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KSxvPW4oMikuZG9jdW1lbnQsdT1yKG8pJiZyKG8uY3JlYXRlRWxlbWVudCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiB1P28uY3JlYXRlRWxlbWVudCh0KTp7fX19LGZ1bmN0aW9uKGUsbil7ZS5leHBvcnRzPXR9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIxKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdChyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDcpLG89bigzOCksdT1uKDIyKShcIklFX1BST1RPXCIpLGk9T2JqZWN0LnByb3RvdHlwZTt0LmV4cG9ydHM9T2JqZWN0LmdldFByb3RvdHlwZU9mfHxmdW5jdGlvbih0KXtyZXR1cm4gdD1vKHQpLHIodCx1KT90W3VdOlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29uc3RydWN0b3ImJnQgaW5zdGFuY2VvZiB0LmNvbnN0cnVjdG9yP3QuY29uc3RydWN0b3IucHJvdG90eXBlOnQgaW5zdGFuY2VvZiBPYmplY3Q/aTpudWxsfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWUuX19lc01vZHVsZT0hMDt2YXIgbz1uKDU4KSx1PXIobyksaT1uKDczKSxmPXIoaSksYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBmLmRlZmF1bHQmJlwic3ltYm9sXCI9PXR5cGVvZiB1LmRlZmF1bHQ/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZi5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09Zi5kZWZhdWx0JiZ0IT09Zi5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fTtlLmRlZmF1bHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgZi5kZWZhdWx0JiZcInN5bWJvbFwiPT09Yyh1LmRlZmF1bHQpP2Z1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10P1widW5kZWZpbmVkXCI6Yyh0KX06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGYuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PWYuZGVmYXVsdCYmdCE9PWYuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjp2b2lkIDA9PT10P1widW5kZWZpbmVkXCI6Yyh0KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDI1KSxvPW4oMTEpLHU9big0MiksaT1uKDEyKSxmPW4oNyksYz1uKDI2KSxhPW4oNjIpLHM9bigzMCksbD1uKDM5KSxwPW4oMTQpKFwiaXRlcmF0b3JcIiksZD0hKFtdLmtleXMmJlwibmV4dFwiaW5bXS5rZXlzKCkpLHY9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHksaCxfLG0pe2EobixlLHkpO3ZhciBiLGcsTyx4PWZ1bmN0aW9uKHQpe2lmKCFkJiZ0IGluIE0pcmV0dXJuIE1bdF07c3dpdGNoKHQpe2Nhc2VcImtleXNcIjpjYXNlXCJ2YWx1ZXNcIjpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fSx3PWUrXCIgSXRlcmF0b3JcIixTPVwidmFsdWVzXCI9PWgsaj0hMSxNPXQucHJvdG90eXBlLFA9TVtwXXx8TVtcIkBAaXRlcmF0b3JcIl18fGgmJk1baF0saz1QfHx4KGgpLEU9aD9TP3goXCJlbnRyaWVzXCIpOms6dm9pZCAwLFQ9XCJBcnJheVwiPT1lP00uZW50cmllc3x8UDpQO2lmKFQmJihPPWwoVC5jYWxsKG5ldyB0KSkpIT09T2JqZWN0LnByb3RvdHlwZSYmTy5uZXh0JiYocyhPLHcsITApLHJ8fGYoTyxwKXx8aShPLHAsdikpLFMmJlAmJlwidmFsdWVzXCIhPT1QLm5hbWUmJihqPSEwLGs9ZnVuY3Rpb24oKXtyZXR1cm4gUC5jYWxsKHRoaXMpfSksciYmIW18fCFkJiYhaiYmTVtwXXx8aShNLHAsayksY1tlXT1rLGNbd109dixoKWlmKGI9e3ZhbHVlczpTP2s6eChcInZhbHVlc1wiKSxrZXlzOl8/azp4KFwia2V5c1wiKSxlbnRyaWVzOkV9LG0pZm9yKGcgaW4gYilnIGluIE18fHUoTSxnLGJbZ10pO2Vsc2UgbyhvLlArby5GKihkfHxqKSxlLGIpO3JldHVybiBifX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDEyKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNyksbz1uKDEzKSx1PW4oNjUpKCExKSxpPW4oMjIpKFwiSUVfUFJPVE9cIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG4sZj1vKHQpLGM9MCxhPVtdO2ZvcihuIGluIGYpbiE9aSYmcihmLG4pJiZhLnB1c2gobik7Zm9yKDtlLmxlbmd0aD5jOylyKGYsbj1lW2MrK10pJiYofnUoYSxuKXx8YS5wdXNoKG4pKTtyZXR1cm4gYX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUpe2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0Myksbz1uKDI5KS5jb25jYXQoXCJsZW5ndGhcIixcInByb3RvdHlwZVwiKTtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsbyl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMyksbz1uKDE4KSx1PW4oMTMpLGk9bigyMCksZj1uKDcpLGM9bigzNSksYT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2UuZj1uKDUpP2E6ZnVuY3Rpb24odCxlKXtpZih0PXUodCksZT1pKGUsITApLGMpdHJ5e3JldHVybiBhKHQsZSl9Y2F0Y2godCl7fWlmKGYodCxlKSlyZXR1cm4gbyghci5mLmNhbGwodCxlKSx0W2VdKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDApLHU9cihvKSxpPW4oMSksZj1yKGkpO24oNTMpO3ZhciBjPW4oMzcpLGE9cihjKSxzPW4oNTQpLGw9cihzKSxwPW4oOTEpLGQ9cihwKSx2PW4oOTIpLHk9cih2KSxoPW4oOTMpLF89cihoKSxtPW4oOTQpLGI9cihtKSxnPW4oOTUpLE89cihnKSx4PW4oOTYpLHc9cih4KSxTPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlLG4peygwLHUuZGVmYXVsdCkodGhpcyx0KSx0aGlzLmNvbnRhaW5lcj0oMCxhLmRlZmF1bHQpKGUpLHRoaXMucHJvdmlkZXJDbGFzc01hcD17YmFpZHU6bC5kZWZhdWx0LHdlaWJvOmQuZGVmYXVsdCxxcTp5LmRlZmF1bHQscXpvbmU6Xy5kZWZhdWx0LGRvdWJhbjpiLmRlZmF1bHQsZmFjZWJvb2s6Ty5kZWZhdWx0LHR3aXR0ZXI6dy5kZWZhdWx0fSx0aGlzLm9wdGlvbnM9dGhpcy5fcmVzb2x2ZU9wdGlvbnMobiksdGhpcy5fcmVzb2x2ZUNvbnRhaW5lckNsYXNzKCksdGhpcy5wcm92aWRlcnM9dGhpcy5fY3JlYXRlUHJvdmlkZXJzKCk7Zm9yKHZhciByIGluIHRoaXMucHJvdmlkZXJzKXRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnByb3ZpZGVyc1tyXS5nZXRFbGVtZW50KCkpfXJldHVybigwLGYuZGVmYXVsdCkodCxbe2tleTpcImdldFByb3ZpZGVyXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXRoaXMucHJvdmlkZXJzW3RdP251bGw6dGhpcy5wcm92aWRlcnNbdF19fSx7a2V5OlwiX2NyZWF0ZVByb3ZpZGVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9e307Zm9yKHZhciBlIGluIHRoaXMub3B0aW9ucylpZih2b2lkIDAhPT10aGlzLnByb3ZpZGVyQ2xhc3NNYXBbZV0mJiExIT09dGhpcy5vcHRpb25zW2VdKXt2YXIgbj10aGlzLl9tZXJnZVByb3ZpZGVyT3B0aW9ucyh0aGlzLm9wdGlvbnNbZV0pO3RbZV09bmV3IHRoaXMucHJvdmlkZXJDbGFzc01hcFtlXShuKX1yZXR1cm4gdH19LHtrZXk6XCJfcmVzb2x2ZU9wdGlvbnNcIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gdD1hLmRlZmF1bHQuZXh0ZW5kKHt0aGVtZTpcImRlZmF1bHRcIix3ZWlibzohMCxxcTohMCxxem9uZTohMCxiYWlkdTohMCxkb3ViYW46ITAsZmFjZWJvb2s6ITAsdHdpdHRlcjohMH0sdCksdm9pZCAwPT09dC50aXRsZSYmKHQudGl0bGU9ZG9jdW1lbnQudGl0bGUpLHZvaWQgMD09PXQudXJsJiYodC51cmw9bG9jYXRpb24uaHJlZiksdm9pZCAwPT09dC5zdW1tYXJ5JiYodC5zdW1tYXJ5PXQudGl0bGUpLHR9fSx7a2V5OlwiX3Jlc29sdmVDb250YWluZXJDbGFzc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9XCJzb2NpYWwtc2hhcmUtYnV0dG9uXCI7dGhpcy5vcHRpb25zLnRoZW1lJiYodCs9XCIgc29jaWFsLXNoYXJlLWJ1dHRvbi1cIit0aGlzLm9wdGlvbnMudGhlbWUpLHRoaXMuY29udGFpbmVyLmFkZENsYXNzKHQpfX0se2tleTpcIl9tZXJnZVByb3ZpZGVyT3B0aW9uc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiEwPT09dCYmKHQ9e30pLHQudGl0bGV8fCh0LnRpdGxlPXRoaXMub3B0aW9ucy50aXRsZSksdC51cmx8fCh0LnVybD10aGlzLm9wdGlvbnMudXJsKSwhdC5pbWFnZSYmdGhpcy5vcHRpb25zLmltYWdlJiYodC5pbWFnZT10aGlzLm9wdGlvbnMuaW1hZ2UpLHQuc3VtbWFyeXx8KHQuc3VtbWFyeT10aGlzLm9wdGlvbnMuc3VtbWFyeSksdC5pbWFnZSYmKHQuaW1hZ2U9ZW5jb2RlVVJJQ29tcG9uZW50KHQuaW1hZ2UpKSx0LnVybD1lbmNvZGVVUklDb21wb25lbnQodC51cmwpLHR9fV0pLHR9KCk7dC5leHBvcnRzPVN9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big1MCksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDUxKTt2YXIgcj1uKDMpLk9iamVjdDt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmRlZmluZVByb3BlcnR5KHQsZSxuKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKTtyKHIuUytyLkYqIW4oNSksXCJPYmplY3RcIix7ZGVmaW5lUHJvcGVydHk6big0KS5mfSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDYpLHU9cihvKSxpPW4oMCksZj1yKGkpLGM9bigxKSxhPXIoYykscz1uKDgpLGw9cihzKSxwPW4oOSksZD1yKHApLHY9bigxMCkseT1yKHYpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXtyZXR1cm4oMCxmLmRlZmF1bHQpKHRoaXMsZSksdC5kZXNjfHwodC5kZXNjPXQuc3VtbWFyeSksdC5jb21tZW50fHwodC5jb21tZW50PXQuc3VtbWFyeSksKDAsbC5kZWZhdWx0KSh0aGlzLChlLl9fcHJvdG9fX3x8KDAsdS5kZWZhdWx0KShlKSkuY2FsbCh0aGlzLHQpKX1yZXR1cm4oMCxkLmRlZmF1bHQpKGUsdCksKDAsYS5kZWZhdWx0KShlLFt7a2V5OlwiZ2V0TmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJ0aWViYVwifX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJodHRwOi8vdGllYmEuYmFpZHUuY29tL2YvY29tbWl0L3NoYXJlL29wZW5TaGFyZUFwaT91cmw9e3VybH0mdGl0bGU9e3RpdGxlfSZkZXNjPXtkZXNjfSZjb21tZW50PXtjb21tZW50fVwifX1dKSxlfSh5LmRlZmF1bHQpO2UuZGVmYXVsdD1ofSxmdW5jdGlvbih0LGUsbil7big1NiksdC5leHBvcnRzPW4oMykuT2JqZWN0LmdldFByb3RvdHlwZU9mfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzOCksbz1uKDM5KTtuKDU3KShcImdldFByb3RvdHlwZU9mXCIsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG8ocih0KSl9fSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKSxvPW4oMyksdT1uKDE3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj0oby5PYmplY3R8fHt9KVt0XXx8T2JqZWN0W3RdLGk9e307aVt0XT1lKG4pLHIoci5TK3IuRip1KGZ1bmN0aW9uKCl7bigxKX0pLFwiT2JqZWN0XCIsaSl9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNTkpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big2MCksbig2OSksdC5leHBvcnRzPW4oMzEpLmYoXCJpdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNjEpKCEwKTtuKDQxKShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPW4oMjEpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXt2YXIgdSxpLGY9U3RyaW5nKG8oZSkpLGM9cihuKSxhPWYubGVuZ3RoO3JldHVybiBjPDB8fGM+PWE/dD9cIlwiOnZvaWQgMDoodT1mLmNoYXJDb2RlQXQoYyksdTw1NTI5Nnx8dT41NjMxOXx8YysxPT09YXx8KGk9Zi5jaGFyQ29kZUF0KGMrMSkpPDU2MzIwfHxpPjU3MzQzP3Q/Zi5jaGFyQXQoYyk6dTp0P2Yuc2xpY2UoYyxjKzIpOmktNTYzMjArKHUtNTUyOTY8PDEwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjcpLG89bigxOCksdT1uKDMwKSxpPXt9O24oMTIpKGksbigxNCkoXCJpdGVyYXRvclwiKSxmdW5jdGlvbigpe3JldHVybiB0aGlzfSksdC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0LnByb3RvdHlwZT1yKGkse25leHQ6bygxLG4pfSksdSh0LGUrXCIgSXRlcmF0b3JcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxvPW4oMTUpLHU9bigyOCk7dC5leHBvcnRzPW4oNSk/T2JqZWN0LmRlZmluZVByb3BlcnRpZXM6ZnVuY3Rpb24odCxlKXtvKHQpO2Zvcih2YXIgbixpPXUoZSksZj1pLmxlbmd0aCxjPTA7Zj5jOylyLmYodCxuPWlbYysrXSxlW25dKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ0KTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEzKSxvPW4oNjYpLHU9big2Nyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4saSl7dmFyIGYsYz1yKGUpLGE9byhjLmxlbmd0aCkscz11KGksYSk7aWYodCYmbiE9bil7Zm9yKDthPnM7KWlmKChmPWNbcysrXSkhPWYpcmV0dXJuITB9ZWxzZSBmb3IoO2E+cztzKyspaWYoKHR8fHMgaW4gYykmJmNbc109PT1uKXJldHVybiB0fHxzfHwwO3JldHVybiF0JiYtMX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCksbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9vKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPU1hdGgubWF4LHU9TWF0aC5taW47dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9cih0KSx0PDA/byh0K2UsMCk6dSh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMikuZG9jdW1lbnQ7dC5leHBvcnRzPXImJnIuZG9jdW1lbnRFbGVtZW50fSxmdW5jdGlvbih0LGUsbil7big3MCk7Zm9yKHZhciByPW4oMiksbz1uKDEyKSx1PW4oMjYpLGk9bigxNCkoXCJ0b1N0cmluZ1RhZ1wiKSxmPVwiQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCxET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LE1lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsVGV4dFRyYWNrTGlzdCxUb3VjaExpc3RcIi5zcGxpdChcIixcIiksYz0wO2M8Zi5sZW5ndGg7YysrKXt2YXIgYT1mW2NdLHM9clthXSxsPXMmJnMucHJvdG90eXBlO2wmJiFsW2ldJiZvKGwsaSxhKSx1W2FdPXUuQXJyYXl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3MSksbz1uKDcyKSx1PW4oMjYpLGk9bigxMyk7dC5leHBvcnRzPW4oNDEpKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9aSh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsbygxKSk6XCJrZXlzXCI9PWU/bygwLG4pOlwidmFsdWVzXCI9PWU/bygwLHRbbl0pOm8oMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLHUuQXJndW1lbnRzPXUuQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big3NCksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDc1KSxuKDgwKSxuKDgxKSxuKDgyKSx0LmV4cG9ydHM9bigzKS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDIpLG89big3KSx1PW4oNSksaT1uKDExKSxmPW4oNDIpLGM9big3NikuS0VZLGE9bigxNykscz1uKDIzKSxsPW4oMzApLHA9bigxOSksZD1uKDE0KSx2PW4oMzEpLHk9bigzMiksaD1uKDc3KSxfPW4oNzgpLG09bigxNSksYj1uKDEzKSxnPW4oMjApLE89bigxOCkseD1uKDI3KSx3PW4oNzkpLFM9big0Nyksaj1uKDQpLE09bigyOCksUD1TLmYsaz1qLmYsRT13LmYsVD1yLlN5bWJvbCxMPXIuSlNPTixDPUwmJkwuc3RyaW5naWZ5LE49ZChcIl9oaWRkZW5cIikscT1kKFwidG9QcmltaXRpdmVcIiksQT17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxGPXMoXCJzeW1ib2wtcmVnaXN0cnlcIiksST1zKFwic3ltYm9sc1wiKSxVPXMoXCJvcC1zeW1ib2xzXCIpLFI9T2JqZWN0LnByb3RvdHlwZSxEPVwiZnVuY3Rpb25cIj09dHlwZW9mIFQsej1yLlFPYmplY3QsRz0henx8IXoucHJvdG90eXBlfHwhei5wcm90b3R5cGUuZmluZENoaWxkLFc9dSYmYShmdW5jdGlvbigpe3JldHVybiA3IT14KGsoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBrKHRoaXMsXCJhXCIse3ZhbHVlOjd9KS5hfX0pKS5hfSk/ZnVuY3Rpb24odCxlLG4pe3ZhciByPVAoUixlKTtyJiZkZWxldGUgUltlXSxrKHQsZSxuKSxyJiZ0IT09UiYmayhSLGUscil9OmssVj1mdW5jdGlvbih0KXt2YXIgZT1JW3RdPXgoVC5wcm90b3R5cGUpO3JldHVybiBlLl9rPXQsZX0sSD1EJiZcInN5bWJvbFwiPT10eXBlb2YgVC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBUfSxRPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PVImJlEoVSxlLG4pLG0odCksZT1nKGUsITApLG0obiksbyhJLGUpPyhuLmVudW1lcmFibGU/KG8odCxOKSYmdFtOXVtlXSYmKHRbTl1bZV09ITEpLG49eChuLHtlbnVtZXJhYmxlOk8oMCwhMSl9KSk6KG8odCxOKXx8ayh0LE4sTygxLHt9KSksdFtOXVtlXT0hMCksVyh0LGUsbikpOmsodCxlLG4pfSxKPWZ1bmN0aW9uKHQsZSl7bSh0KTtmb3IodmFyIG4scj1oKGU9YihlKSksbz0wLHU9ci5sZW5ndGg7dT5vOylRKHQsbj1yW28rK10sZVtuXSk7cmV0dXJuIHR9LEs9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT94KHQpOkooeCh0KSxlKX0sQj1mdW5jdGlvbih0KXt2YXIgZT1BLmNhbGwodGhpcyx0PWcodCwhMCkpO3JldHVybiEodGhpcz09PVImJm8oSSx0KSYmIW8oVSx0KSkmJighKGV8fCFvKHRoaXMsdCl8fCFvKEksdCl8fG8odGhpcyxOKSYmdGhpc1tOXVt0XSl8fGUpfSxZPWZ1bmN0aW9uKHQsZSl7aWYodD1iKHQpLGU9ZyhlLCEwKSx0IT09Unx8IW8oSSxlKXx8byhVLGUpKXt2YXIgbj1QKHQsZSk7cmV0dXJuIW58fCFvKEksZSl8fG8odCxOKSYmdFtOXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LFg9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49RShiKHQpKSxyPVtdLHU9MDtuLmxlbmd0aD51OylvKEksZT1uW3UrK10pfHxlPT1OfHxlPT1jfHxyLnB1c2goZSk7cmV0dXJuIHJ9LFo9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49dD09PVIscj1FKG4/VTpiKHQpKSx1PVtdLGk9MDtyLmxlbmd0aD5pOykhbyhJLGU9cltpKytdKXx8biYmIW8oUixlKXx8dS5wdXNoKElbZV0pO3JldHVybiB1fTtEfHwoVD1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBUKXRocm93IFR5cGVFcnJvcihcIlN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciFcIik7dmFyIHQ9cChhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCksZT1mdW5jdGlvbihuKXt0aGlzPT09UiYmZS5jYWxsKFUsbiksbyh0aGlzLE4pJiZvKHRoaXNbTl0sdCkmJih0aGlzW05dW3RdPSExKSxXKHRoaXMsdCxPKDEsbikpfTtyZXR1cm4gdSYmRyYmVyhSLHQse2NvbmZpZ3VyYWJsZTohMCxzZXQ6ZX0pLFYodCl9LGYoVC5wcm90b3R5cGUsXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxTLmY9WSxqLmY9USxuKDQ2KS5mPXcuZj1YLG4oMzMpLmY9QixuKDQ1KS5mPVosdSYmIW4oMjUpJiZmKFIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLEIsITApLHYuZj1mdW5jdGlvbih0KXtyZXR1cm4gVihkKHQpKX0pLGkoaS5HK2kuVytpLkYqIUQse1N5bWJvbDpUfSk7Zm9yKHZhciAkPVwiaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXNcIi5zcGxpdChcIixcIiksdHQ9MDskLmxlbmd0aD50dDspZCgkW3R0KytdKTtmb3IodmFyIGV0PU0oZC5zdG9yZSksbnQ9MDtldC5sZW5ndGg+bnQ7KXkoZXRbbnQrK10pO2koaS5TK2kuRiohRCxcIlN5bWJvbFwiLHtmb3I6ZnVuY3Rpb24odCl7cmV0dXJuIG8oRix0Kz1cIlwiKT9GW3RdOkZbdF09VCh0KX0sa2V5Rm9yOmZ1bmN0aW9uKHQpe2lmKCFIKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIHN5bWJvbCFcIik7Zm9yKHZhciBlIGluIEYpaWYoRltlXT09PXQpcmV0dXJuIGV9LHVzZVNldHRlcjpmdW5jdGlvbigpe0c9ITB9LHVzZVNpbXBsZTpmdW5jdGlvbigpe0c9ITF9fSksaShpLlMraS5GKiFELFwiT2JqZWN0XCIse2NyZWF0ZTpLLGRlZmluZVByb3BlcnR5OlEsZGVmaW5lUHJvcGVydGllczpKLGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpZLGdldE93blByb3BlcnR5TmFtZXM6WCxnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6Wn0pLEwmJmkoaS5TK2kuRiooIUR8fGEoZnVuY3Rpb24oKXt2YXIgdD1UKCk7cmV0dXJuXCJbbnVsbF1cIiE9QyhbdF0pfHxcInt9XCIhPUMoe2E6dH0pfHxcInt9XCIhPUMoT2JqZWN0KHQpKX0pKSxcIkpTT05cIix7c3RyaW5naWZ5OmZ1bmN0aW9uKHQpe2lmKHZvaWQgMCE9PXQmJiFIKHQpKXtmb3IodmFyIGUsbixyPVt0XSxvPTE7YXJndW1lbnRzLmxlbmd0aD5vOylyLnB1c2goYXJndW1lbnRzW28rK10pO3JldHVybiBlPXJbMV0sXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksIW4mJl8oZSl8fChlPWZ1bmN0aW9uKHQsZSl7aWYobiYmKGU9bi5jYWxsKHRoaXMsdCxlKSksIUgoZSkpcmV0dXJuIGV9KSxyWzFdPWUsQy5hcHBseShMLHIpfX19KSxULnByb3RvdHlwZVtxXXx8bigxMikoVC5wcm90b3R5cGUscSxULnByb3RvdHlwZS52YWx1ZU9mKSxsKFQsXCJTeW1ib2xcIiksbChNYXRoLFwiTWF0aFwiLCEwKSxsKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE5KShcIm1ldGFcIiksbz1uKDE2KSx1PW4oNyksaT1uKDQpLmYsZj0wLGM9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYT0hbigxNykoZnVuY3Rpb24oKXtyZXR1cm4gYyhPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKX0pLHM9ZnVuY3Rpb24odCl7aSh0LHIse3ZhbHVlOntpOlwiT1wiKyArK2Ysdzp7fX19KX0sbD1mdW5jdGlvbih0LGUpe2lmKCFvKHQpKXJldHVyblwic3ltYm9sXCI9PXR5cGVvZiB0P3Q6KFwic3RyaW5nXCI9PXR5cGVvZiB0P1wiU1wiOlwiUFwiKSt0O2lmKCF1KHQscikpe2lmKCFjKHQpKXJldHVyblwiRlwiO2lmKCFlKXJldHVyblwiRVwiO3ModCl9cmV0dXJuIHRbcl0uaX0scD1mdW5jdGlvbih0LGUpe2lmKCF1KHQscikpe2lmKCFjKHQpKXJldHVybiEwO2lmKCFlKXJldHVybiExO3ModCl9cmV0dXJuIHRbcl0ud30sZD1mdW5jdGlvbih0KXtyZXR1cm4gYSYmdi5ORUVEJiZjKHQpJiYhdSh0LHIpJiZzKHQpLHR9LHY9dC5leHBvcnRzPXtLRVk6cixORUVEOiExLGZhc3RLZXk6bCxnZXRXZWFrOnAsb25GcmVlemU6ZH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI4KSxvPW4oNDUpLHU9bigzMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXIodCksbj1vLmY7aWYobilmb3IodmFyIGksZj1uKHQpLGM9dS5mLGE9MDtmLmxlbmd0aD5hOyljLmNhbGwodCxpPWZbYSsrXSkmJmUucHVzaChpKTtyZXR1cm4gZX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ0KTt0LmV4cG9ydHM9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24odCl7cmV0dXJuXCJBcnJheVwiPT1yKHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTMpLG89big0NikuZix1PXt9LnRvU3RyaW5nLGk9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93JiZPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcz9PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpOltdLGY9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiBvKHQpfWNhdGNoKHQpe3JldHVybiBpLnNsaWNlKCl9fTt0LmV4cG9ydHMuZj1mdW5jdGlvbih0KXtyZXR1cm4gaSYmXCJbb2JqZWN0IFdpbmRvd11cIj09dS5jYWxsKHQpP2YodCk6byhyKHQpKX19LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7bigzMikoXCJhc3luY0l0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7bigzMikoXCJvYnNlcnZhYmxlXCIpfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oODQpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big4NSksdC5leHBvcnRzPW4oMykuT2JqZWN0LnNldFByb3RvdHlwZU9mfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSk7cihyLlMsXCJPYmplY3RcIix7c2V0UHJvdG90eXBlT2Y6big4Nikuc2V0fSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KSxvPW4oMTUpLHU9ZnVuY3Rpb24odCxlKXtpZihvKHQpLCFyKGUpJiZudWxsIT09ZSl0aHJvdyBUeXBlRXJyb3IoZStcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIil9O3QuZXhwb3J0cz17c2V0Ok9iamVjdC5zZXRQcm90b3R5cGVPZnx8KFwiX19wcm90b19fXCJpbnt9P2Z1bmN0aW9uKHQsZSxyKXt0cnl7cj1uKDM0KShGdW5jdGlvbi5jYWxsLG4oNDcpLmYoT2JqZWN0LnByb3RvdHlwZSxcIl9fcHJvdG9fX1wiKS5zZXQsMikscih0LFtdKSxlPSEodCBpbnN0YW5jZW9mIEFycmF5KX1jYXRjaCh0KXtlPSEwfXJldHVybiBmdW5jdGlvbih0LG4pe3JldHVybiB1KHQsbiksZT90Ll9fcHJvdG9fXz1uOnIodCxuKSx0fX0oe30sITEpOnZvaWQgMCksY2hlY2s6dX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big4OCksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDg5KTt2YXIgcj1uKDMpLk9iamVjdDt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gci5jcmVhdGUodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKTtyKHIuUyxcIk9iamVjdFwiLHtjcmVhdGU6bigyNyl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCxlLG4pe3ZhciByPXZvaWQgMCxvPXZvaWQgMCx1PXZvaWQgMCxpPXZvaWQgMDtyZXR1cm4gZSYmbj8obz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgvMi1lLzIsdT0oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC1uKS8yLGk9XCJzdGF0dXM9MSxyZXNpemFibGU9eWVzLHdpZHRoPVwiK2UrXCIsaGVpZ2h0PVwiK24rXCIsdG9wPVwiK3UrXCIsbGVmdD1cIitvLHI9d2luZG93Lm9wZW4odCxcIlwiLGkpKTpyPXdpbmRvdy5vcGVuKHQpLHJ9T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5vcGVuV2luPXJ9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDYpLHU9cihvKSxpPW4oMCksZj1yKGkpLGM9bigxKSxhPXIoYykscz1uKDgpLGw9cihzKSxwPW4oOSksZD1yKHApLHY9bigxMCkseT1yKHYpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSgpe3JldHVybigwLGYuZGVmYXVsdCkodGhpcyxlKSwoMCxsLmRlZmF1bHQpKHRoaXMsKGUuX19wcm90b19ffHwoMCx1LmRlZmF1bHQpKGUpKS5hcHBseSh0aGlzLGFyZ3VtZW50cykpfXJldHVybigwLGQuZGVmYXVsdCkoZSx0KSwoMCxhLmRlZmF1bHQpKGUsW3trZXk6XCJnZXROYW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cIndlaWJvXCJ9fSx7a2V5OlwiX2dldFVybFRlbXBsYXRlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cImh0dHA6Ly9zZXJ2aWNlLndlaWJvLmNvbS9zaGFyZS9zaGFyZS5waHA/dXJsPXt1cmx9JmFwcGtleT17YXBwS2V5fSZ0aXRsZT17dGl0bGV9JnBpYz17aW1hZ2V9JnNlYXJjaFBpYz10cnVlXCJ9fV0pLGV9KHkuZGVmYXVsdCk7ZS5kZWZhdWx0PWh9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDYpLHU9cihvKSxpPW4oMCksZj1yKGkpLGM9bigxKSxhPXIoYykscz1uKDgpLGw9cihzKSxwPW4oOSksZD1yKHApLHY9bigxMCkseT1yKHYpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXtyZXR1cm4oMCxmLmRlZmF1bHQpKHRoaXMsZSksdC5kZXNjfHwodC5kZXNjPXQuc3VtbWFyeSksKDAsbC5kZWZhdWx0KSh0aGlzLChlLl9fcHJvdG9fX3x8KDAsdS5kZWZhdWx0KShlKSkuY2FsbCh0aGlzLHQpKX1yZXR1cm4oMCxkLmRlZmF1bHQpKGUsdCksKDAsYS5kZWZhdWx0KShlLFt7a2V5OlwiZ2V0TmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJxcVwifX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJodHRwOi8vY29ubmVjdC5xcS5jb20vd2lkZ2V0L3NoYXJlcXEvaW5kZXguaHRtbD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfSZzb3VyY2U9e3NvdXJjZX0mZGVzYz17ZGVzY30mcGljcz17aW1hZ2V9XCJ9fV0pLGV9KHkuZGVmYXVsdCk7ZS5kZWZhdWx0PWh9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDYpLHU9cihvKSxpPW4oMCksZj1yKGkpLGM9bigxKSxhPXIoYykscz1uKDgpLGw9cihzKSxwPW4oOSksZD1yKHApLHY9bigxMCkseT1yKHYpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXtyZXR1cm4oMCxmLmRlZmF1bHQpKHRoaXMsZSksdC5kZXNjfHwodC5kZXNjPXQuc3VtbWFyeSksKDAsbC5kZWZhdWx0KSh0aGlzLChlLl9fcHJvdG9fX3x8KDAsdS5kZWZhdWx0KShlKSkuY2FsbCh0aGlzLHQpKX1yZXR1cm4oMCxkLmRlZmF1bHQpKGUsdCksKDAsYS5kZWZhdWx0KShlLFt7a2V5OlwiZ2V0TmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJxem9uZVwifX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJodHRwOi8vc25zLnF6b25lLnFxLmNvbS9jZ2ktYmluL3F6c2hhcmUvY2dpX3F6c2hhcmVfb25la2V5P3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JmRlc2M9e2Rlc2N9JnN1bW1hcnk9e3N1bW1hcnl9JnNpdGU9e3NpdGV9XCJ9fV0pLGV9KHkuZGVmYXVsdCk7ZS5kZWZhdWx0PWh9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDYpLHU9cihvKSxpPW4oMCksZj1yKGkpLGM9bigxKSxhPXIoYykscz1uKDgpLGw9cihzKSxwPW4oOSksZD1yKHApLHY9bigxMCkseT1yKHYpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSgpe3JldHVybigwLGYuZGVmYXVsdCkodGhpcyxlKSwoMCxsLmRlZmF1bHQpKHRoaXMsKGUuX19wcm90b19ffHwoMCx1LmRlZmF1bHQpKGUpKS5hcHBseSh0aGlzLGFyZ3VtZW50cykpfXJldHVybigwLGQuZGVmYXVsdCkoZSx0KSwoMCxhLmRlZmF1bHQpKGUsW3trZXk6XCJnZXROYW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cImRvdWJhblwifX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJodHRwczovL3d3dy5kb3ViYW4uY29tL3NoYXJlL3NlcnZpY2U/bmFtZT17dGl0bGV9JmhyZWY9e3VybH0maW1hZ2U9e2ltYWdlfSZ1cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwifX1dKSxlfSh5LmRlZmF1bHQpO2UuZGVmYXVsdD1ofSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89big2KSx1PXIobyksaT1uKDApLGY9cihpKSxjPW4oMSksYT1yKGMpLHM9big4KSxsPXIocykscD1uKDkpLGQ9cihwKSx2PW4oMTApLHk9cih2KSxoPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4oMCxmLmRlZmF1bHQpKHRoaXMsZSksKDAsbC5kZWZhdWx0KSh0aGlzLChlLl9fcHJvdG9fX3x8KDAsdS5kZWZhdWx0KShlKSkuYXBwbHkodGhpcyxhcmd1bWVudHMpKX1yZXR1cm4oMCxkLmRlZmF1bHQpKGUsdCksKDAsYS5kZWZhdWx0KShlLFt7a2V5OlwiZ2V0TmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJmYWNlYm9va1wifX0se2tleTpcIl9nZXRVcmxUZW1wbGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCZwW3VybF09e3VybH0mcFtpbWFnZXNdWzBdPXtpbWFnZX0mcFt0aXRsZV09e3RpdGxlfSZwW3N1bW1hcnldPXtzdW1tYXJ5fVwifX1dKSxlfSh5LmRlZmF1bHQpO2UuZGVmYXVsdD1ofSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89big2KSx1PXIobyksaT1uKDApLGY9cihpKSxjPW4oMSksYT1yKGMpLHM9big4KSxsPXIocykscD1uKDkpLGQ9cihwKSx2PW4oMTApLHk9cih2KSxoPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4oMCxmLmRlZmF1bHQpKHRoaXMsZSksKDAsbC5kZWZhdWx0KSh0aGlzLChlLl9fcHJvdG9fX3x8KDAsdS5kZWZhdWx0KShlKSkuYXBwbHkodGhpcyxhcmd1bWVudHMpKX1yZXR1cm4oMCxkLmRlZmF1bHQpKGUsdCksKDAsYS5kZWZhdWx0KShlLFt7a2V5OlwiZ2V0TmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJ0d2l0dGVyXCJ9fSx7a2V5OlwiX2dldFVybFRlbXBsYXRlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD17dXJsfSZ0ZXh0PXt0aXRsZX0mdmlhPXt2aWF9Jmhhc2h0YWdzPXtoYXNodGFnc31cIn19XSksZX0oeS5kZWZhdWx0KTtlLmRlZmF1bHQ9aH1dKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29jaWFsLXNoYXJlLm1pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zb2NpYWwtc2hhcmUtYnV0dG9uLmpzL2Rpc3Qvc29jaWFsLXNoYXJlLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc29jaWFsLXNoYXJlLWJ1dHRvbi5qcy9kaXN0L3NvY2lhbC1zaGFyZS5taW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDMiLCIvKiBnbG9iYWxzIGNocm9tZTogZmFsc2UgKi9cbi8qIGdsb2JhbHMgX19kaXJuYW1lOiBmYWxzZSAqL1xuLyogZ2xvYmFscyByZXF1aXJlOiBmYWxzZSAqL1xuLyogZ2xvYmFscyBCdWZmZXI6IGZhbHNlICovXG4vKiBnbG9iYWxzIG1vZHVsZTogZmFsc2UgKi9cblxuLyoqXG4gKiBUeXBvIGlzIGEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiBhIHNwZWxsY2hlY2tlciB1c2luZyBodW5zcGVsbC1zdHlsZSBcbiAqIGRpY3Rpb25hcmllcy5cbiAqL1xuXG52YXIgVHlwbztcblxuKGZ1bmN0aW9uICgpIHtcblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFR5cG8gY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtkaWN0aW9uYXJ5XSBUaGUgbG9jYWxlIGNvZGUgb2YgdGhlIGRpY3Rpb25hcnkgYmVpbmcgdXNlZC4gZS5nLixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbl9VU1wiLiBUaGlzIGlzIG9ubHkgdXNlZCB0byBhdXRvLWxvYWQgZGljdGlvbmFyaWVzLlxuICogQHBhcmFtIHtTdHJpbmd9IFthZmZEYXRhXSAgICBUaGUgZGF0YSBmcm9tIHRoZSBkaWN0aW9uYXJ5J3MgLmFmZiBmaWxlLiBJZiBvbWl0dGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBUeXBvLmpzIGlzIGJlaW5nIHVzZWQgaW4gYSBDaHJvbWUgZXh0ZW5zaW9uLCB0aGUgLmFmZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlIHdpbGwgYmUgbG9hZGVkIGF1dG9tYXRpY2FsbHkgZnJvbVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWIvdHlwby9kaWN0aW9uYXJpZXMvW2RpY3Rpb25hcnldL1tkaWN0aW9uYXJ5XS5hZmZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW4gb3RoZXIgZW52aXJvbm1lbnRzLCBpdCB3aWxsIGJlIGxvYWRlZCBmcm9tXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzZXR0aW5ncy5kaWN0aW9uYXJ5UGF0aF0vZGljdGlvbmFyaWVzL1tkaWN0aW9uYXJ5XS9bZGljdGlvbmFyeV0uYWZmXG4gKiBAcGFyYW0ge1N0cmluZ30gW3dvcmRzRGF0YV0gIFRoZSBkYXRhIGZyb20gdGhlIGRpY3Rpb25hcnkncyAuZGljIGZpbGUuIElmIG9taXR0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIFR5cG8uanMgaXMgYmVpbmcgdXNlZCBpbiBhIENocm9tZSBleHRlbnNpb24sIHRoZSAuZGljXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUgd2lsbCBiZSBsb2FkZWQgYXV0b21hdGljYWxseSBmcm9tXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYi90eXBvL2RpY3Rpb25hcmllcy9bZGljdGlvbmFyeV0vW2RpY3Rpb25hcnldLmRpY1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbiBvdGhlciBlbnZpcm9ubWVudHMsIGl0IHdpbGwgYmUgbG9hZGVkIGZyb21cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NldHRpbmdzLmRpY3Rpb25hcnlQYXRoXS9kaWN0aW9uYXJpZXMvW2RpY3Rpb25hcnldL1tkaWN0aW9uYXJ5XS5kaWNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdICAgQ29uc3RydWN0b3Igc2V0dGluZ3MuIEF2YWlsYWJsZSBwcm9wZXJ0aWVzIGFyZTpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1N0cmluZ30gW2RpY3Rpb25hcnlQYXRoXTogcGF0aCB0byBsb2FkIGRpY3Rpb25hcnkgZnJvbSBpbiBub24tY2hyb21lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7T2JqZWN0fSBbZmxhZ3NdOiBmbGFnIGluZm9ybWF0aW9uLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Qm9vbGVhbn0gW2FzeW5jTG9hZF06IElmIHRydWUsIGFmZkRhdGEgYW5kIHdvcmRzRGF0YSB3aWxsIGJlIGxvYWRlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luY2hyb25vdXNseS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge0Z1bmN0aW9ufSBbbG9hZGVkQ2FsbGJhY2tdOiBDYWxsZWQgd2hlbiBib3RoIGFmZkRhdGEgYW5kIHdvcmRzRGF0YVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlIGJlZW4gbG9hZGVkLiBPbmx5IHVzZWQgaWYgYXN5bmNMb2FkIGlzIHNldCB0byB0cnVlLiBUaGUgcGFyYW1ldGVyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHRoZSBpbnN0YW50aWF0ZWQgVHlwbyBvYmplY3QuXG4gKlxuICogQHJldHVybnMge1R5cG99IEEgVHlwbyBvYmplY3QuXG4gKi9cblxuVHlwbyA9IGZ1bmN0aW9uIChkaWN0aW9uYXJ5LCBhZmZEYXRhLCB3b3Jkc0RhdGEsIHNldHRpbmdzKSB7XG5cdHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG5cblx0dGhpcy5kaWN0aW9uYXJ5ID0gbnVsbDtcblx0XG5cdHRoaXMucnVsZXMgPSB7fTtcblx0dGhpcy5kaWN0aW9uYXJ5VGFibGUgPSB7fTtcblx0XG5cdHRoaXMuY29tcG91bmRSdWxlcyA9IFtdO1xuXHR0aGlzLmNvbXBvdW5kUnVsZUNvZGVzID0ge307XG5cdFxuXHR0aGlzLnJlcGxhY2VtZW50VGFibGUgPSBbXTtcblx0XG5cdHRoaXMuZmxhZ3MgPSBzZXR0aW5ncy5mbGFncyB8fCB7fTsgXG5cdFxuXHR0aGlzLm1lbW9pemVkID0ge307XG5cblx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XG5cdHZhciBzZWxmID0gdGhpcztcblx0XG5cdHZhciBwYXRoO1xuXHRcblx0Ly8gTG9vcC1jb250cm9sIHZhcmlhYmxlcy5cblx0dmFyIGksIGosIF9sZW4sIF9qbGVuO1xuXHRcblx0aWYgKGRpY3Rpb25hcnkpIHtcblx0XHRzZWxmLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5O1xuXHRcdFxuXHRcdC8vIElmIHRoZSBkYXRhIGlzIHByZWxvYWRlZCwganVzdCBzZXR1cCB0aGUgVHlwbyBvYmplY3QuXG5cdFx0aWYgKGFmZkRhdGEgJiYgd29yZHNEYXRhKSB7XG5cdFx0XHRzZXR1cCgpO1xuXHRcdH1cblx0XHQvLyBMb2FkaW5nIGRhdGEgZm9yIENocm9tZSBleHRlbnRpb25zLlxuXHRcdGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICdjaHJvbWUnIGluIHdpbmRvdyAmJiAnZXh0ZW5zaW9uJyBpbiB3aW5kb3cuY2hyb21lICYmICdnZXRVUkwnIGluIHdpbmRvdy5jaHJvbWUuZXh0ZW5zaW9uKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3MuZGljdGlvbmFyeVBhdGgpIHtcblx0XHRcdFx0cGF0aCA9IHNldHRpbmdzLmRpY3Rpb25hcnlQYXRoO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHBhdGggPSBcInR5cG8vZGljdGlvbmFyaWVzXCI7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmICghYWZmRGF0YSkgcmVhZERhdGFGaWxlKGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKHBhdGggKyBcIi9cIiArIGRpY3Rpb25hcnkgKyBcIi9cIiArIGRpY3Rpb25hcnkgKyBcIi5hZmZcIiksIHNldEFmZkRhdGEpO1xuXHRcdFx0aWYgKCF3b3Jkc0RhdGEpIHJlYWREYXRhRmlsZShjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTChwYXRoICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIuZGljXCIpLCBzZXRXb3Jkc0RhdGEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmIChzZXR0aW5ncy5kaWN0aW9uYXJ5UGF0aCkge1xuXHRcdFx0XHRwYXRoID0gc2V0dGluZ3MuZGljdGlvbmFyeVBhdGg7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgX19kaXJuYW1lICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRwYXRoID0gX19kaXJuYW1lICsgJy9kaWN0aW9uYXJpZXMnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHBhdGggPSAnLi9kaWN0aW9uYXJpZXMnO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoIWFmZkRhdGEpIHJlYWREYXRhRmlsZShwYXRoICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIuYWZmXCIsIHNldEFmZkRhdGEpO1xuXHRcdFx0aWYgKCF3b3Jkc0RhdGEpIHJlYWREYXRhRmlsZShwYXRoICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIvXCIgKyBkaWN0aW9uYXJ5ICsgXCIuZGljXCIsIHNldFdvcmRzRGF0YSk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWFkRGF0YUZpbGUodXJsLCBzZXRGdW5jKSB7XG5cdFx0dmFyIHJlc3BvbnNlID0gc2VsZi5fcmVhZEZpbGUodXJsLCBudWxsLCBzZXR0aW5ncy5hc3luY0xvYWQpO1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5hc3luY0xvYWQpIHtcblx0XHRcdHJlc3BvbnNlLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRzZXRGdW5jKGRhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0c2V0RnVuYyhyZXNwb25zZSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0QWZmRGF0YShkYXRhKSB7XG5cdFx0YWZmRGF0YSA9IGRhdGE7XG5cblx0XHRpZiAod29yZHNEYXRhKSB7XG5cdFx0XHRzZXR1cCgpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldFdvcmRzRGF0YShkYXRhKSB7XG5cdFx0d29yZHNEYXRhID0gZGF0YTtcblxuXHRcdGlmIChhZmZEYXRhKSB7XG5cdFx0XHRzZXR1cCgpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldHVwKCkge1xuXHRcdHNlbGYucnVsZXMgPSBzZWxmLl9wYXJzZUFGRihhZmZEYXRhKTtcblx0XHRcblx0XHQvLyBTYXZlIHRoZSBydWxlIGNvZGVzIHRoYXQgYXJlIHVzZWQgaW4gY29tcG91bmQgcnVsZXMuXG5cdFx0c2VsZi5jb21wb3VuZFJ1bGVDb2RlcyA9IHt9O1xuXHRcdFxuXHRcdGZvciAoaSA9IDAsIF9sZW4gPSBzZWxmLmNvbXBvdW5kUnVsZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHR2YXIgcnVsZSA9IHNlbGYuY29tcG91bmRSdWxlc1tpXTtcblx0XHRcdFxuXHRcdFx0Zm9yIChqID0gMCwgX2psZW4gPSBydWxlLmxlbmd0aDsgaiA8IF9qbGVuOyBqKyspIHtcblx0XHRcdFx0c2VsZi5jb21wb3VuZFJ1bGVDb2Rlc1tydWxlW2pdXSA9IFtdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHQvLyBJZiB3ZSBhZGQgdGhpcyBPTkxZSU5DT01QT1VORCBmbGFnIHRvIHNlbGYuY29tcG91bmRSdWxlQ29kZXMsIHRoZW4gX3BhcnNlRElDXG5cdFx0Ly8gd2lsbCBkbyB0aGUgd29yayBvZiBzYXZpbmcgdGhlIGxpc3Qgb2Ygd29yZHMgdGhhdCBhcmUgY29tcG91bmQtb25seS5cblx0XHRpZiAoXCJPTkxZSU5DT01QT1VORFwiIGluIHNlbGYuZmxhZ3MpIHtcblx0XHRcdHNlbGYuY29tcG91bmRSdWxlQ29kZXNbc2VsZi5mbGFncy5PTkxZSU5DT01QT1VORF0gPSBbXTtcblx0XHR9XG5cdFx0XG5cdFx0c2VsZi5kaWN0aW9uYXJ5VGFibGUgPSBzZWxmLl9wYXJzZURJQyh3b3Jkc0RhdGEpO1xuXHRcdFxuXHRcdC8vIEdldCByaWQgb2YgYW55IGNvZGVzIGZyb20gdGhlIGNvbXBvdW5kIHJ1bGUgY29kZXMgdGhhdCBhcmUgbmV2ZXIgdXNlZCBcblx0XHQvLyAob3IgdGhhdCB3ZXJlIHNwZWNpYWwgcmVnZXggY2hhcmFjdGVycykuICBOb3QgZXNwZWNpYWxseSBuZWNlc3NhcnkuLi4gXG5cdFx0Zm9yIChpIGluIHNlbGYuY29tcG91bmRSdWxlQ29kZXMpIHtcblx0XHRcdGlmIChzZWxmLmNvbXBvdW5kUnVsZUNvZGVzW2ldLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRkZWxldGUgc2VsZi5jb21wb3VuZFJ1bGVDb2Rlc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0Ly8gQnVpbGQgdGhlIGZ1bGwgcmVndWxhciBleHByZXNzaW9ucyBmb3IgZWFjaCBjb21wb3VuZCBydWxlLlxuXHRcdC8vIEkgaGF2ZSBhIGZlZWxpbmcgKGJ1dCBubyBjb25maXJtYXRpb24geWV0KSB0aGF0IHRoaXMgbWV0aG9kIG9mIFxuXHRcdC8vIHRlc3RpbmcgZm9yIGNvbXBvdW5kIHdvcmRzIGlzIHByb2JhYmx5IHNsb3cuXG5cdFx0Zm9yIChpID0gMCwgX2xlbiA9IHNlbGYuY29tcG91bmRSdWxlcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcblx0XHRcdHZhciBydWxlVGV4dCA9IHNlbGYuY29tcG91bmRSdWxlc1tpXTtcblx0XHRcdFxuXHRcdFx0dmFyIGV4cHJlc3Npb25UZXh0ID0gXCJcIjtcblx0XHRcdFxuXHRcdFx0Zm9yIChqID0gMCwgX2psZW4gPSBydWxlVGV4dC5sZW5ndGg7IGogPCBfamxlbjsgaisrKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgPSBydWxlVGV4dFtqXTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChjaGFyYWN0ZXIgaW4gc2VsZi5jb21wb3VuZFJ1bGVDb2Rlcykge1xuXHRcdFx0XHRcdGV4cHJlc3Npb25UZXh0ICs9IFwiKFwiICsgc2VsZi5jb21wb3VuZFJ1bGVDb2Rlc1tjaGFyYWN0ZXJdLmpvaW4oXCJ8XCIpICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvblRleHQgKz0gY2hhcmFjdGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHNlbGYuY29tcG91bmRSdWxlc1tpXSA9IG5ldyBSZWdFeHAoZXhwcmVzc2lvblRleHQsIFwiaVwiKTtcblx0XHR9XG5cdFx0XG5cdFx0c2VsZi5sb2FkZWQgPSB0cnVlO1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5hc3luY0xvYWQgJiYgc2V0dGluZ3MubG9hZGVkQ2FsbGJhY2spIHtcblx0XHRcdHNldHRpbmdzLmxvYWRlZENhbGxiYWNrKHNlbGYpO1xuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5UeXBvLnByb3RvdHlwZSA9IHtcblx0LyoqXG5cdCAqIExvYWRzIGEgVHlwbyBpbnN0YW5jZSBmcm9tIGEgaGFzaCBvZiBhbGwgb2YgdGhlIFR5cG8gcHJvcGVydGllcy5cblx0ICpcblx0ICogQHBhcmFtIG9iamVjdCBvYmogQSBoYXNoIG9mIFR5cG8gcHJvcGVydGllcywgcHJvYmFibHkgZ290dGVuIGZyb20gYSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHR5cG9faW5zdGFuY2UpKS5cblx0ICovXG5cdFxuXHRsb2FkIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdGZvciAodmFyIGkgaW4gb2JqKSB7XG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdHRoaXNbaV0gPSBvYmpbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHRcblx0LyoqXG5cdCAqIFJlYWQgdGhlIGNvbnRlbnRzIG9mIGEgZmlsZS5cblx0ICogXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFRoZSBwYXRoIChyZWxhdGl2ZSkgdG8gdGhlIGZpbGUuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbY2hhcnNldD1cIklTTzg4NTktMVwiXSBUaGUgZXhwZWN0ZWQgY2hhcnNldCBvZiB0aGUgZmlsZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFzeW5jIElmIHRydWUsIHRoZSBmaWxlIHdpbGwgYmUgcmVhZCBhc3luY2hyb25vdXNseS4gRm9yIG5vZGUuanMgdGhpcyBkb2VzIG5vdGhpbmcsIGFsbFxuXHQgKiAgICAgICAgZmlsZXMgYXJlIHJlYWQgc3luY2hyb25vdXNseS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIGZpbGUgZGF0YSBpZiBhc3luYyBpcyBmYWxzZSwgb3RoZXJ3aXNlIGEgcHJvbWlzZSBvYmplY3QuIElmIHJ1bm5pbmcgbm9kZS5qcywgdGhlIGRhdGEgaXNcblx0ICogICAgICAgICAgYWx3YXlzIHJldHVybmVkLlxuXHQgKi9cblx0XG5cdF9yZWFkRmlsZSA6IGZ1bmN0aW9uIChwYXRoLCBjaGFyc2V0LCBhc3luYykge1xuXHRcdGNoYXJzZXQgPSBjaGFyc2V0IHx8IFwidXRmOFwiO1xuXHRcdFxuXHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR2YXIgcHJvbWlzZTtcblx0XHRcdHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHJlcS5vcGVuKFwiR0VUXCIsIHBhdGgsIGFzeW5jKTtcblx0XHRcdFxuXHRcdFx0aWYgKGFzeW5jKSB7XG5cdFx0XHRcdHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0XHRyZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUocmVxLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KHJlcS5zdGF0dXNUZXh0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJlcS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocmVxLnN0YXR1c1RleHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRpZiAocmVxLm92ZXJyaWRlTWltZVR5cGUpXG5cdFx0XHRcdHJlcS5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpbjsgY2hhcnNldD1cIiArIGNoYXJzZXQpO1xuXHRcdFxuXHRcdFx0cmVxLnNlbmQobnVsbCk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBhc3luYyA/IHByb21pc2UgOiByZXEucmVzcG9uc2VUZXh0O1xuXHRcdH1cblx0XHRlbHNlIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8vIE5vZGUuanNcblx0XHRcdHZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcblx0XHRcdFx0XHR2YXIgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgZmlsZURlc2NyaXB0b3IgPSBmcy5vcGVuU3luYyhwYXRoLCAncicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBidWZmZXIgPSBuZXcgQnVmZmVyKHN0YXRzLnNpemUpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZzLnJlYWRTeW5jKGZpbGVEZXNjcmlwdG9yLCBidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgsIG51bGwpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiBidWZmZXIudG9TdHJpbmcoY2hhcnNldCwgMCwgYnVmZmVyLmxlbmd0aCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJQYXRoIFwiICsgcGF0aCArIFwiIGRvZXMgbm90IGV4aXN0LlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdC8qKlxuXHQgKiBQYXJzZSB0aGUgcnVsZXMgb3V0IGZyb20gYSAuYWZmIGZpbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFRoZSBjb250ZW50cyBvZiB0aGUgYWZmaXggZmlsZS5cblx0ICogQHJldHVybnMgb2JqZWN0IFRoZSBydWxlcyBmcm9tIHRoZSBmaWxlLlxuXHQgKi9cblx0XG5cdF9wYXJzZUFGRiA6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0dmFyIHJ1bGVzID0ge307XG5cdFx0XG5cdFx0dmFyIGxpbmUsIHN1YmxpbmUsIG51bUVudHJpZXMsIGxpbmVQYXJ0cztcblx0XHR2YXIgaSwgaiwgX2xlbiwgX2psZW47XG5cdFx0XG5cdFx0Ly8gUmVtb3ZlIGNvbW1lbnQgbGluZXNcblx0XHRkYXRhID0gdGhpcy5fcmVtb3ZlQWZmaXhDb21tZW50cyhkYXRhKTtcblx0XHRcblx0XHR2YXIgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xuXHRcdFxuXHRcdGZvciAoaSA9IDAsIF9sZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcblx0XHRcdGxpbmUgPSBsaW5lc1tpXTtcblx0XHRcdFxuXHRcdFx0dmFyIGRlZmluaXRpb25QYXJ0cyA9IGxpbmUuc3BsaXQoL1xccysvKTtcblx0XHRcdFxuXHRcdFx0dmFyIHJ1bGVUeXBlID0gZGVmaW5pdGlvblBhcnRzWzBdO1xuXHRcdFx0XG5cdFx0XHRpZiAocnVsZVR5cGUgPT0gXCJQRlhcIiB8fCBydWxlVHlwZSA9PSBcIlNGWFwiKSB7XG5cdFx0XHRcdHZhciBydWxlQ29kZSA9IGRlZmluaXRpb25QYXJ0c1sxXTtcblx0XHRcdFx0dmFyIGNvbWJpbmVhYmxlID0gZGVmaW5pdGlvblBhcnRzWzJdO1xuXHRcdFx0XHRudW1FbnRyaWVzID0gcGFyc2VJbnQoZGVmaW5pdGlvblBhcnRzWzNdLCAxMCk7XG5cdFx0XHRcdFxuXHRcdFx0XHR2YXIgZW50cmllcyA9IFtdO1xuXHRcdFx0XHRcblx0XHRcdFx0Zm9yIChqID0gaSArIDEsIF9qbGVuID0gaSArIDEgKyBudW1FbnRyaWVzOyBqIDwgX2psZW47IGorKykge1xuXHRcdFx0XHRcdHN1YmxpbmUgPSBsaW5lc1tqXTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsaW5lUGFydHMgPSBzdWJsaW5lLnNwbGl0KC9cXHMrLyk7XG5cdFx0XHRcdFx0dmFyIGNoYXJhY3RlcnNUb1JlbW92ZSA9IGxpbmVQYXJ0c1syXTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgYWRkaXRpb25QYXJ0cyA9IGxpbmVQYXJ0c1szXS5zcGxpdChcIi9cIik7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIGNoYXJhY3RlcnNUb0FkZCA9IGFkZGl0aW9uUGFydHNbMF07XG5cdFx0XHRcdFx0aWYgKGNoYXJhY3RlcnNUb0FkZCA9PT0gXCIwXCIpIGNoYXJhY3RlcnNUb0FkZCA9IFwiXCI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIGNvbnRpbnVhdGlvbkNsYXNzZXMgPSB0aGlzLnBhcnNlUnVsZUNvZGVzKGFkZGl0aW9uUGFydHNbMV0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciByZWdleFRvTWF0Y2ggPSBsaW5lUGFydHNbNF07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIGVudHJ5ID0ge307XG5cdFx0XHRcdFx0ZW50cnkuYWRkID0gY2hhcmFjdGVyc1RvQWRkO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChjb250aW51YXRpb25DbGFzc2VzLmxlbmd0aCA+IDApIGVudHJ5LmNvbnRpbnVhdGlvbkNsYXNzZXMgPSBjb250aW51YXRpb25DbGFzc2VzO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChyZWdleFRvTWF0Y2ggIT09IFwiLlwiKSB7XG5cdFx0XHRcdFx0XHRpZiAocnVsZVR5cGUgPT09IFwiU0ZYXCIpIHtcblx0XHRcdFx0XHRcdFx0ZW50cnkubWF0Y2ggPSBuZXcgUmVnRXhwKHJlZ2V4VG9NYXRjaCArIFwiJFwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbnRyeS5tYXRjaCA9IG5ldyBSZWdFeHAoXCJeXCIgKyByZWdleFRvTWF0Y2gpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoY2hhcmFjdGVyc1RvUmVtb3ZlICE9IFwiMFwiKSB7XG5cdFx0XHRcdFx0XHRpZiAocnVsZVR5cGUgPT09IFwiU0ZYXCIpIHtcblx0XHRcdFx0XHRcdFx0ZW50cnkucmVtb3ZlID0gbmV3IFJlZ0V4cChjaGFyYWN0ZXJzVG9SZW1vdmUgICsgXCIkXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGVudHJ5LnJlbW92ZSA9IGNoYXJhY3RlcnNUb1JlbW92ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZW50cmllcy5wdXNoKGVudHJ5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cnVsZXNbcnVsZUNvZGVdID0geyBcInR5cGVcIiA6IHJ1bGVUeXBlLCBcImNvbWJpbmVhYmxlXCIgOiAoY29tYmluZWFibGUgPT0gXCJZXCIpLCBcImVudHJpZXNcIiA6IGVudHJpZXMgfTtcblx0XHRcdFx0XG5cdFx0XHRcdGkgKz0gbnVtRW50cmllcztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHJ1bGVUeXBlID09PSBcIkNPTVBPVU5EUlVMRVwiKSB7XG5cdFx0XHRcdG51bUVudHJpZXMgPSBwYXJzZUludChkZWZpbml0aW9uUGFydHNbMV0sIDEwKTtcblx0XHRcdFx0XG5cdFx0XHRcdGZvciAoaiA9IGkgKyAxLCBfamxlbiA9IGkgKyAxICsgbnVtRW50cmllczsgaiA8IF9qbGVuOyBqKyspIHtcblx0XHRcdFx0XHRsaW5lID0gbGluZXNbal07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGluZVBhcnRzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0XHRcdHRoaXMuY29tcG91bmRSdWxlcy5wdXNoKGxpbmVQYXJ0c1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGkgKz0gbnVtRW50cmllcztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHJ1bGVUeXBlID09PSBcIlJFUFwiKSB7XG5cdFx0XHRcdGxpbmVQYXJ0cyA9IGxpbmUuc3BsaXQoL1xccysvKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChsaW5lUGFydHMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXBsYWNlbWVudFRhYmxlLnB1c2goWyBsaW5lUGFydHNbMV0sIGxpbmVQYXJ0c1syXSBdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIE9OTFlJTkNPTVBPVU5EXG5cdFx0XHRcdC8vIENPTVBPVU5ETUlOXG5cdFx0XHRcdC8vIEZMQUdcblx0XHRcdFx0Ly8gS0VFUENBU0Vcblx0XHRcdFx0Ly8gTkVFREFGRklYXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmZsYWdzW3J1bGVUeXBlXSA9IGRlZmluaXRpb25QYXJ0c1sxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXHRcblx0LyoqXG5cdCAqIFJlbW92ZXMgY29tbWVudCBsaW5lcyBhbmQgdGhlbiBjbGVhbnMgdXAgYmxhbmsgbGluZXMgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFRoZSBkYXRhIGZyb20gYW4gYWZmaXggZmlsZS5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgY2xlYW5lZC11cCBkYXRhLlxuXHQgKi9cblx0XG5cdF9yZW1vdmVBZmZpeENvbW1lbnRzIDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQvLyBSZW1vdmUgY29tbWVudHNcblx0XHQvLyBUaGlzIHVzZWQgdG8gcmVtb3ZlIGFueSBzdHJpbmcgc3RhcnRpbmcgd2l0aCAnIycgdXAgdG8gdGhlIGVuZCBvZiB0aGUgbGluZSxcblx0XHQvLyBidXQgc29tZSBDT01QT1VORFJVTEUgZGVmaW5pdGlvbnMgaW5jbHVkZSAnIycgYXMgcGFydCBvZiB0aGUgcnVsZS5cblx0XHQvLyBJIGhhdmVuJ3Qgc2VlbiBhbnkgYWZmaXggZmlsZXMgdGhhdCB1c2UgY29tbWVudHMgb24gdGhlIHNhbWUgbGluZSBhcyByZWFsIGRhdGEsXG5cdFx0Ly8gc28gSSBkb24ndCB0aGluayB0aGlzIHdpbGwgYnJlYWsgYW55dGhpbmcuXG5cdFx0ZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccyojLiokL21nLCBcIlwiKTtcblx0XHRcblx0XHQvLyBUcmltIGVhY2ggbGluZVxuXHRcdGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHNcXHMqL20sICcnKS5yZXBsYWNlKC9cXHNcXHMqJC9tLCAnJyk7XG5cdFx0XG5cdFx0Ly8gUmVtb3ZlIGJsYW5rIGxpbmVzLlxuXHRcdGRhdGEgPSBkYXRhLnJlcGxhY2UoL1xcbnsyLH0vZywgXCJcXG5cIik7XG5cdFx0XG5cdFx0Ly8gVHJpbSB0aGUgZW50aXJlIHN0cmluZ1xuXHRcdGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHNcXHMqLywgJycpLnJlcGxhY2UoL1xcc1xccyokLywgJycpO1xuXHRcdFxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXHRcblx0LyoqXG5cdCAqIFBhcnNlcyB0aGUgd29yZHMgb3V0IGZyb20gdGhlIC5kaWMgZmlsZS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgVGhlIGRhdGEgZnJvbSB0aGUgZGljdGlvbmFyeSBmaWxlLlxuXHQgKiBAcmV0dXJucyBvYmplY3QgVGhlIGxvb2t1cCB0YWJsZSBjb250YWluaW5nIGFsbCBvZiB0aGUgd29yZHMgYW5kXG5cdCAqICAgICAgICAgICAgICAgICB3b3JkIGZvcm1zIGZyb20gdGhlIGRpY3Rpb25hcnkuXG5cdCAqL1xuXHRcblx0X3BhcnNlRElDIDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRkYXRhID0gdGhpcy5fcmVtb3ZlRGljQ29tbWVudHMoZGF0YSk7XG5cdFx0XG5cdFx0dmFyIGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcblx0XHR2YXIgZGljdGlvbmFyeVRhYmxlID0ge307XG5cdFx0XG5cdFx0ZnVuY3Rpb24gYWRkV29yZCh3b3JkLCBydWxlcykge1xuXHRcdFx0Ly8gU29tZSBkaWN0aW9uYXJpZXMgd2lsbCBsaXN0IHRoZSBzYW1lIHdvcmQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgcnVsZSBzZXRzLlxuXHRcdFx0aWYgKCFkaWN0aW9uYXJ5VGFibGUuaGFzT3duUHJvcGVydHkod29yZCkpIHtcblx0XHRcdFx0ZGljdGlvbmFyeVRhYmxlW3dvcmRdID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHJ1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYgKGRpY3Rpb25hcnlUYWJsZVt3b3JkXSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGRpY3Rpb25hcnlUYWJsZVt3b3JkXSA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGljdGlvbmFyeVRhYmxlW3dvcmRdLnB1c2gocnVsZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHQvLyBUaGUgZmlyc3QgbGluZSBpcyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIHRoZSBkaWN0aW9uYXJ5LlxuXHRcdGZvciAodmFyIGkgPSAxLCBfbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHR2YXIgbGluZSA9IGxpbmVzW2ldO1xuXHRcdFx0XG5cdFx0XHR2YXIgcGFydHMgPSBsaW5lLnNwbGl0KFwiL1wiLCAyKTtcblx0XHRcdFxuXHRcdFx0dmFyIHdvcmQgPSBwYXJ0c1swXTtcblxuXHRcdFx0Ly8gTm93IGZvciBlYWNoIGFmZml4IHJ1bGUsIGdlbmVyYXRlIHRoYXQgZm9ybSBvZiB0aGUgd29yZC5cblx0XHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdHZhciBydWxlQ29kZXNBcnJheSA9IHRoaXMucGFyc2VSdWxlQ29kZXMocGFydHNbMV0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gU2F2ZSB0aGUgcnVsZUNvZGVzIGZvciBjb21wb3VuZCB3b3JkIHNpdHVhdGlvbnMuXG5cdFx0XHRcdGlmICghKFwiTkVFREFGRklYXCIgaW4gdGhpcy5mbGFncykgfHwgcnVsZUNvZGVzQXJyYXkuaW5kZXhPZih0aGlzLmZsYWdzLk5FRURBRkZJWCkgPT0gLTEpIHtcblx0XHRcdFx0XHRhZGRXb3JkKHdvcmQsIHJ1bGVDb2Rlc0FycmF5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDAsIF9qbGVuID0gcnVsZUNvZGVzQXJyYXkubGVuZ3RoOyBqIDwgX2psZW47IGorKykge1xuXHRcdFx0XHRcdHZhciBjb2RlID0gcnVsZUNvZGVzQXJyYXlbal07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIHJ1bGUgPSB0aGlzLnJ1bGVzW2NvZGVdO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChydWxlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3V29yZHMgPSB0aGlzLl9hcHBseVJ1bGUod29yZCwgcnVsZSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGZvciAodmFyIGlpID0gMCwgX2lpbGVuID0gbmV3V29yZHMubGVuZ3RoOyBpaSA8IF9paWxlbjsgaWkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgbmV3V29yZCA9IG5ld1dvcmRzW2lpXTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGFkZFdvcmQobmV3V29yZCwgW10pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKHJ1bGUuY29tYmluZWFibGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gaiArIDE7IGsgPCBfamxlbjsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgY29tYmluZUNvZGUgPSBydWxlQ29kZXNBcnJheVtrXTtcblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNvbWJpbmVSdWxlID0gdGhpcy5ydWxlc1tjb21iaW5lQ29kZV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb21iaW5lUnVsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29tYmluZVJ1bGUuY29tYmluZWFibGUgJiYgKHJ1bGUudHlwZSAhPSBjb21iaW5lUnVsZS50eXBlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBvdGhlck5ld1dvcmRzID0gdGhpcy5fYXBwbHlSdWxlKG5ld1dvcmQsIGNvbWJpbmVSdWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpaWkgPSAwLCBfaWlpbGVuID0gb3RoZXJOZXdXb3Jkcy5sZW5ndGg7IGlpaSA8IF9paWlsZW47IGlpaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgb3RoZXJOZXdXb3JkID0gb3RoZXJOZXdXb3Jkc1tpaWldO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWRkV29yZChvdGhlck5ld1dvcmQsIFtdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKGNvZGUgaW4gdGhpcy5jb21wb3VuZFJ1bGVDb2Rlcykge1xuXHRcdFx0XHRcdFx0dGhpcy5jb21wb3VuZFJ1bGVDb2Rlc1tjb2RlXS5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGFkZFdvcmQod29yZC50cmltKCksIFtdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGRpY3Rpb25hcnlUYWJsZTtcblx0fSxcblx0XG5cdFxuXHQvKipcblx0ICogUmVtb3ZlcyBjb21tZW50IGxpbmVzIGFuZCB0aGVuIGNsZWFucyB1cCBibGFuayBsaW5lcyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgVGhlIGRhdGEgZnJvbSBhIC5kaWMgZmlsZS5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgY2xlYW5lZC11cCBkYXRhLlxuXHQgKi9cblx0XG5cdF9yZW1vdmVEaWNDb21tZW50cyA6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0Ly8gSSBjYW4ndCBmaW5kIGFueSBvZmZpY2lhbCBkb2N1bWVudGF0aW9uIG9uIGl0LCBidXQgYXQgbGVhc3QgdGhlIGRlX0RFXG5cdFx0Ly8gZGljdGlvbmFyeSB1c2VzIHRhYi1pbmRlbnRlZCBsaW5lcyBhcyBjb21tZW50cy5cblx0XHRcblx0XHQvLyBSZW1vdmUgY29tbWVudHNcblx0XHRkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFx0LiokL21nLCBcIlwiKTtcblx0XHRcblx0XHRyZXR1cm4gZGF0YTtcblx0fSxcblx0XG5cdHBhcnNlUnVsZUNvZGVzIDogZnVuY3Rpb24gKHRleHRDb2Rlcykge1xuXHRcdGlmICghdGV4dENvZGVzKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCEoXCJGTEFHXCIgaW4gdGhpcy5mbGFncykpIHtcblx0XHRcdHJldHVybiB0ZXh0Q29kZXMuc3BsaXQoXCJcIik7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMuZmxhZ3MuRkxBRyA9PT0gXCJsb25nXCIpIHtcblx0XHRcdHZhciBmbGFncyA9IFtdO1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgX2xlbiA9IHRleHRDb2Rlcy5sZW5ndGg7IGkgPCBfbGVuOyBpICs9IDIpIHtcblx0XHRcdFx0ZmxhZ3MucHVzaCh0ZXh0Q29kZXMuc3Vic3RyKGksIDIpKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIGZsYWdzO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLmZsYWdzLkZMQUcgPT09IFwibnVtXCIpIHtcblx0XHRcdHJldHVybiB0ZXh0Q29kZXMuc3BsaXQoXCIsXCIpO1xuXHRcdH1cblx0fSxcblx0XG5cdC8qKlxuXHQgKiBBcHBsaWVzIGFuIGFmZml4IHJ1bGUgdG8gYSB3b3JkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gd29yZCBUaGUgYmFzZSB3b3JkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcnVsZSBUaGUgYWZmaXggcnVsZS5cblx0ICogQHJldHVybnMge1N0cmluZ1tdfSBUaGUgbmV3IHdvcmRzIGdlbmVyYXRlZCBieSB0aGUgcnVsZS5cblx0ICovXG5cdFxuXHRfYXBwbHlSdWxlIDogZnVuY3Rpb24gKHdvcmQsIHJ1bGUpIHtcblx0XHR2YXIgZW50cmllcyA9IHJ1bGUuZW50cmllcztcblx0XHR2YXIgbmV3V29yZHMgPSBbXTtcblx0XHRcblx0XHRmb3IgKHZhciBpID0gMCwgX2xlbiA9IGVudHJpZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHR2YXIgZW50cnkgPSBlbnRyaWVzW2ldO1xuXHRcdFx0XG5cdFx0XHRpZiAoIWVudHJ5Lm1hdGNoIHx8IHdvcmQubWF0Y2goZW50cnkubWF0Y2gpKSB7XG5cdFx0XHRcdHZhciBuZXdXb3JkID0gd29yZDtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChlbnRyeS5yZW1vdmUpIHtcblx0XHRcdFx0XHRuZXdXb3JkID0gbmV3V29yZC5yZXBsYWNlKGVudHJ5LnJlbW92ZSwgXCJcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChydWxlLnR5cGUgPT09IFwiU0ZYXCIpIHtcblx0XHRcdFx0XHRuZXdXb3JkID0gbmV3V29yZCArIGVudHJ5LmFkZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRuZXdXb3JkID0gZW50cnkuYWRkICsgbmV3V29yZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bmV3V29yZHMucHVzaChuZXdXb3JkKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChcImNvbnRpbnVhdGlvbkNsYXNzZXNcIiBpbiBlbnRyeSkge1xuXHRcdFx0XHRcdGZvciAodmFyIGogPSAwLCBfamxlbiA9IGVudHJ5LmNvbnRpbnVhdGlvbkNsYXNzZXMubGVuZ3RoOyBqIDwgX2psZW47IGorKykge1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRpbnVhdGlvblJ1bGUgPSB0aGlzLnJ1bGVzW2VudHJ5LmNvbnRpbnVhdGlvbkNsYXNzZXNbal1dO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRpZiAoY29udGludWF0aW9uUnVsZSkge1xuXHRcdFx0XHRcdFx0XHRuZXdXb3JkcyA9IG5ld1dvcmRzLmNvbmNhdCh0aGlzLl9hcHBseVJ1bGUobmV3V29yZCwgY29udGludWF0aW9uUnVsZSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIHNob3VsZG4ndCBoYXBwZW4sIGJ1dCBpdCBkb2VzLCBhdCBsZWFzdCBpbiB0aGUgZGVfREUgZGljdGlvbmFyeS5cblx0XHRcdFx0XHRcdFx0Ly8gSSB0aGluayB0aGUgYXV0aG9yIG1pc3Rha2VubHkgc3VwcGxpZWQgbG93ZXItY2FzZSBydWxlIGNvZGVzIGluc3RlYWQgXG5cdFx0XHRcdFx0XHRcdC8vIG9mIHVwcGVyLWNhc2UuXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gbmV3V29yZHM7XG5cdH0sXG5cdFxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgYSB3b3JkIG9yIGEgY2FwaXRhbGl6YXRpb24gdmFyaWFudCBleGlzdHMgaW4gdGhlIGN1cnJlbnQgZGljdGlvbmFyeS5cblx0ICogVGhlIHdvcmQgaXMgdHJpbW1lZCBhbmQgc2V2ZXJhbCB2YXJpYXRpb25zIG9mIGNhcGl0YWxpemF0aW9ucyBhcmUgY2hlY2tlZC5cblx0ICogSWYgeW91IHdhbnQgdG8gY2hlY2sgYSB3b3JkIHdpdGhvdXQgYW55IGNoYW5nZXMgbWFkZSB0byBpdCwgY2FsbCBjaGVja0V4YWN0KClcblx0ICpcblx0ICogQHNlZSBodHRwOi8vYmxvZy5zdGV2ZW5sZXZpdGhhbi5jb20vYXJjaGl2ZXMvZmFzdGVyLXRyaW0tamF2YXNjcmlwdCByZTp0cmltbWluZyBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYVdvcmQgVGhlIHdvcmQgdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgKi9cblx0XG5cdGNoZWNrIDogZnVuY3Rpb24gKGFXb3JkKSB7XG5cdFx0aWYgKCF0aGlzLmxvYWRlZCkge1xuXHRcdFx0dGhyb3cgXCJEaWN0aW9uYXJ5IG5vdCBsb2FkZWQuXCI7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlXG5cdFx0dmFyIHRyaW1tZWRXb3JkID0gYVdvcmQucmVwbGFjZSgvXlxcc1xccyovLCAnJykucmVwbGFjZSgvXFxzXFxzKiQvLCAnJyk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuY2hlY2tFeGFjdCh0cmltbWVkV29yZCkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRcblx0XHQvLyBUaGUgZXhhY3Qgd29yZCBpcyBub3QgaW4gdGhlIGRpY3Rpb25hcnkuXG5cdFx0aWYgKHRyaW1tZWRXb3JkLnRvVXBwZXJDYXNlKCkgPT09IHRyaW1tZWRXb3JkKSB7XG5cdFx0XHQvLyBUaGUgd29yZCB3YXMgc3VwcGxpZWQgaW4gYWxsIHVwcGVyY2FzZS5cblx0XHRcdC8vIENoZWNrIGZvciBhIGNhcGl0YWxpemVkIGZvcm0gb2YgdGhlIHdvcmQuXG5cdFx0XHR2YXIgY2FwaXRhbGl6ZWRXb3JkID0gdHJpbW1lZFdvcmRbMF0gKyB0cmltbWVkV29yZC5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMuaGFzRmxhZyhjYXBpdGFsaXplZFdvcmQsIFwiS0VFUENBU0VcIikpIHtcblx0XHRcdFx0Ly8gQ2FwaXRhbGl6YXRpb24gdmFyaWFudHMgYXJlIG5vdCBhbGxvd2VkIGZvciB0aGlzIHdvcmQuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMuY2hlY2tFeGFjdChjYXBpdGFsaXplZFdvcmQpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgbG93ZXJjYXNlV29yZCA9IHRyaW1tZWRXb3JkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XG5cdFx0aWYgKGxvd2VyY2FzZVdvcmQgIT09IHRyaW1tZWRXb3JkKSB7XG5cdFx0XHRpZiAodGhpcy5oYXNGbGFnKGxvd2VyY2FzZVdvcmQsIFwiS0VFUENBU0VcIikpIHtcblx0XHRcdFx0Ly8gQ2FwaXRhbGl6YXRpb24gdmFyaWFudHMgYXJlIG5vdCBhbGxvd2VkIGZvciB0aGlzIHdvcmQuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGEgbG93ZXJjYXNlIGZvcm1cblx0XHRcdGlmICh0aGlzLmNoZWNrRXhhY3QobG93ZXJjYXNlV29yZCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0XG5cdC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciBhIHdvcmQgZXhpc3RzIGluIHRoZSBjdXJyZW50IGRpY3Rpb25hcnkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdFxuXHRjaGVja0V4YWN0IDogZnVuY3Rpb24gKHdvcmQpIHtcblx0XHRpZiAoIXRoaXMubG9hZGVkKSB7XG5cdFx0XHR0aHJvdyBcIkRpY3Rpb25hcnkgbm90IGxvYWRlZC5cIjtcblx0XHR9XG5cblx0XHR2YXIgcnVsZUNvZGVzID0gdGhpcy5kaWN0aW9uYXJ5VGFibGVbd29yZF07XG5cdFx0XG5cdFx0dmFyIGksIF9sZW47XG5cdFx0XG5cdFx0aWYgKHR5cGVvZiBydWxlQ29kZXMgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGlzIG1pZ2h0IGJlIGEgY29tcG91bmQgd29yZC5cblx0XHRcdGlmIChcIkNPTVBPVU5ETUlOXCIgaW4gdGhpcy5mbGFncyAmJiB3b3JkLmxlbmd0aCA+PSB0aGlzLmZsYWdzLkNPTVBPVU5ETUlOKSB7XG5cdFx0XHRcdGZvciAoaSA9IDAsIF9sZW4gPSB0aGlzLmNvbXBvdW5kUnVsZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHdvcmQubWF0Y2godGhpcy5jb21wb3VuZFJ1bGVzW2ldKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJ1bGVDb2RlcyA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gYSBudWxsIChidXQgbm90IHVuZGVmaW5lZCkgdmFsdWUgZm9yIGFuIGVudHJ5IGluIHRoZSBkaWN0aW9uYXJ5IHRhYmxlXG5cdFx0XHQvLyBtZWFucyB0aGF0IHRoZSB3b3JkIGlzIGluIHRoZSBkaWN0aW9uYXJ5IGJ1dCBoYXMgbm8gZmxhZ3MuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGVDb2RlcyA9PT0gJ29iamVjdCcpIHsgLy8gdGhpcy5kaWN0aW9uYXJ5WydoYXNPd25Qcm9wZXJ0eSddIHdpbGwgYmUgYSBmdW5jdGlvbi5cblx0XHRcdGZvciAoaSA9IDAsIF9sZW4gPSBydWxlQ29kZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHRcdGlmICghdGhpcy5oYXNGbGFnKHdvcmQsIFwiT05MWUlOQ09NUE9VTkRcIiwgcnVsZUNvZGVzW2ldKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRcblx0LyoqXG5cdCAqIExvb2tzIHVwIHdoZXRoZXIgYSBnaXZlbiB3b3JkIGlzIGZsYWdnZWQgd2l0aCBhIGdpdmVuIGZsYWcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIGluIHF1ZXN0aW9uLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZmxhZyBUaGUgZmxhZyBpbiBxdWVzdGlvbi5cblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdCBcblx0aGFzRmxhZyA6IGZ1bmN0aW9uICh3b3JkLCBmbGFnLCB3b3JkRmxhZ3MpIHtcblx0XHRpZiAoIXRoaXMubG9hZGVkKSB7XG5cdFx0XHR0aHJvdyBcIkRpY3Rpb25hcnkgbm90IGxvYWRlZC5cIjtcblx0XHR9XG5cblx0XHRpZiAoZmxhZyBpbiB0aGlzLmZsYWdzKSB7XG5cdFx0XHRpZiAodHlwZW9mIHdvcmRGbGFncyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0d29yZEZsYWdzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdGhpcy5kaWN0aW9uYXJ5VGFibGVbd29yZF0pO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAod29yZEZsYWdzICYmIHdvcmRGbGFncy5pbmRleE9mKHRoaXMuZmxhZ3NbZmxhZ10pICE9PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRcblx0LyoqXG5cdCAqIFJldHVybnMgYSBsaXN0IG9mIHN1Z2dlc3Rpb25zIGZvciBhIG1pc3NwZWxsZWQgd29yZC5cblx0ICpcblx0ICogQHNlZSBodHRwOi8vd3d3Lm5vcnZpZy5jb20vc3BlbGwtY29ycmVjdC5odG1sIGZvciB0aGUgYmFzaXMgb2YgdGhpcyBzdWdnZXN0b3IuXG5cdCAqIFRoaXMgc3VnZ2VzdG9yIGlzIHByaW1pdGl2ZSwgYnV0IGl0IHdvcmtzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gd29yZCBUaGUgbWlzc3BlbGxpbmcuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXQ9NV0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHN1Z2dlc3Rpb25zIHRvIHJldHVybi5cblx0ICogQHJldHVybnMge1N0cmluZ1tdfSBUaGUgYXJyYXkgb2Ygc3VnZ2VzdGlvbnMuXG5cdCAqL1xuXHRcblx0YWxwaGFiZXQgOiBcIlwiLFxuXHRcblx0c3VnZ2VzdCA6IGZ1bmN0aW9uICh3b3JkLCBsaW1pdCkge1xuXHRcdGlmICghdGhpcy5sb2FkZWQpIHtcblx0XHRcdHRocm93IFwiRGljdGlvbmFyeSBub3QgbG9hZGVkLlwiO1xuXHRcdH1cblxuXHRcdGxpbWl0ID0gbGltaXQgfHwgNTtcblxuXHRcdGlmICh0aGlzLm1lbW9pemVkLmhhc093blByb3BlcnR5KHdvcmQpKSB7XG5cdFx0XHR2YXIgbWVtb2l6ZWRMaW1pdCA9IHRoaXMubWVtb2l6ZWRbd29yZF1bJ2xpbWl0J107XG5cblx0XHRcdC8vIE9ubHkgcmV0dXJuIHRoZSBjYWNoZWQgbGlzdCBpZiBpdCdzIGJpZyBlbm91Z2ggb3IgaWYgdGhlcmUgd2VyZW4ndCBlbm91Z2ggc3VnZ2VzdGlvbnNcblx0XHRcdC8vIHRvIGZpbGwgYSBzbWFsbGVyIGxpbWl0LlxuXHRcdFx0aWYgKGxpbWl0IDw9IG1lbW9pemVkTGltaXQgfHwgdGhpcy5tZW1vaXplZFt3b3JkXVsnc3VnZ2VzdGlvbnMnXS5sZW5ndGggPCBtZW1vaXplZExpbWl0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm1lbW9pemVkW3dvcmRdWydzdWdnZXN0aW9ucyddLnNsaWNlKDAsIGxpbWl0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYgKHRoaXMuY2hlY2sod29yZCkpIHJldHVybiBbXTtcblx0XHRcblx0XHQvLyBDaGVjayB0aGUgcmVwbGFjZW1lbnQgdGFibGUuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIF9sZW4gPSB0aGlzLnJlcGxhY2VtZW50VGFibGUubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHR2YXIgcmVwbGFjZW1lbnRFbnRyeSA9IHRoaXMucmVwbGFjZW1lbnRUYWJsZVtpXTtcblx0XHRcdFxuXHRcdFx0aWYgKHdvcmQuaW5kZXhPZihyZXBsYWNlbWVudEVudHJ5WzBdKSAhPT0gLTEpIHtcblx0XHRcdFx0dmFyIGNvcnJlY3RlZFdvcmQgPSB3b3JkLnJlcGxhY2UocmVwbGFjZW1lbnRFbnRyeVswXSwgcmVwbGFjZW1lbnRFbnRyeVsxXSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAodGhpcy5jaGVjayhjb3JyZWN0ZWRXb3JkKSkge1xuXHRcdFx0XHRcdHJldHVybiBbIGNvcnJlY3RlZFdvcmQgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5hbHBoYWJldCA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcblx0XHRcblx0XHQvKlxuXHRcdGlmICghc2VsZi5hbHBoYWJldCkge1xuXHRcdFx0Ly8gVXNlIHRoZSBhbHBoYWJldCBhcyBpbXBsaWNpdGx5IGRlZmluZWQgYnkgdGhlIHdvcmRzIGluIHRoZSBkaWN0aW9uYXJ5LlxuXHRcdFx0dmFyIGFscGhhSGFzaCA9IHt9O1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciBpIGluIHNlbGYuZGljdGlvbmFyeVRhYmxlKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwLCBfbGVuID0gaS5sZW5ndGg7IGogPCBfbGVuOyBqKyspIHtcblx0XHRcdFx0XHRhbHBoYUhhc2hbaVtqXV0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGZvciAodmFyIGkgaW4gYWxwaGFIYXNoKSB7XG5cdFx0XHRcdHNlbGYuYWxwaGFiZXQgKz0gaTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dmFyIGFscGhhQXJyYXkgPSBzZWxmLmFscGhhYmV0LnNwbGl0KFwiXCIpO1xuXHRcdFx0YWxwaGFBcnJheS5zb3J0KCk7XG5cdFx0XHRzZWxmLmFscGhhYmV0ID0gYWxwaGFBcnJheS5qb2luKFwiXCIpO1xuXHRcdH1cblx0XHQqL1xuXHRcdFxuXHRcdGZ1bmN0aW9uIGVkaXRzMSh3b3Jkcykge1xuXHRcdFx0dmFyIHJ2ID0gW107XG5cdFx0XHRcblx0XHRcdHZhciBpaSwgaSwgaiwgX2lpbGVuLCBfbGVuLCBfamxlbjtcblx0XHRcdFxuXHRcdFx0Zm9yIChpaSA9IDAsIF9paWxlbiA9IHdvcmRzLmxlbmd0aDsgaWkgPCBfaWlsZW47IGlpKyspIHtcblx0XHRcdFx0dmFyIHdvcmQgPSB3b3Jkc1tpaV07XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKGkgPSAwLCBfbGVuID0gd29yZC5sZW5ndGggKyAxOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIHMgPSBbIHdvcmQuc3Vic3RyaW5nKDAsIGkpLCB3b3JkLnN1YnN0cmluZyhpKSBdO1xuXHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoc1sxXSkge1xuXHRcdFx0XHRcdFx0cnYucHVzaChzWzBdICsgc1sxXS5zdWJzdHJpbmcoMSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBFbGltaW5hdGUgdHJhbnNwb3NpdGlvbnMgb2YgaWRlbnRpY2FsIGxldHRlcnNcblx0XHRcdFx0XHRpZiAoc1sxXS5sZW5ndGggPiAxICYmIHNbMV1bMV0gIT09IHNbMV1bMF0pIHtcblx0XHRcdFx0XHRcdHJ2LnB1c2goc1swXSArIHNbMV1bMV0gKyBzWzFdWzBdICsgc1sxXS5zdWJzdHJpbmcoMikpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzWzFdKSB7XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwLCBfamxlbiA9IHNlbGYuYWxwaGFiZXQubGVuZ3RoOyBqIDwgX2psZW47IGorKykge1xuXHRcdFx0XHRcdFx0XHQvLyBFbGltaW5hdGUgcmVwbGFjZW1lbnQgb2YgYSBsZXR0ZXIgYnkgaXRzZWxmXG5cdFx0XHRcdFx0XHRcdGlmIChzZWxmLmFscGhhYmV0W2pdICE9IHNbMV0uc3Vic3RyaW5nKDAsMSkpe1xuXHRcdFx0XHRcdFx0XHRcdHJ2LnB1c2goc1swXSArIHNlbGYuYWxwaGFiZXRbal0gKyBzWzFdLnN1YnN0cmluZygxKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc1sxXSkge1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMCwgX2psZW4gPSBzZWxmLmFscGhhYmV0Lmxlbmd0aDsgaiA8IF9qbGVuOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0cnYucHVzaChzWzBdICsgc2VsZi5hbHBoYWJldFtqXSArIHNbMV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gcnY7XG5cdFx0fVxuXHRcdFxuXHRcdGZ1bmN0aW9uIGtub3duKHdvcmRzKSB7XG5cdFx0XHR2YXIgcnYgPSBbXTtcblx0XHRcdFxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIF9sZW4gPSB3b3Jkcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcblx0XHRcdFx0aWYgKHNlbGYuY2hlY2sod29yZHNbaV0pKSB7XG5cdFx0XHRcdFx0cnYucHVzaCh3b3Jkc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIHJ2O1xuXHRcdH1cblx0XHRcblx0XHRmdW5jdGlvbiBjb3JyZWN0KHdvcmQpIHtcblx0XHRcdC8vIEdldCB0aGUgZWRpdC1kaXN0YW5jZS0xIGFuZCBlZGl0LWRpc3RhbmNlLTIgZm9ybXMgb2YgdGhpcyB3b3JkLlxuXHRcdFx0dmFyIGVkMSA9IGVkaXRzMShbd29yZF0pO1xuXHRcdFx0dmFyIGVkMiA9IGVkaXRzMShlZDEpO1xuXHRcdFx0XG5cdFx0XHR2YXIgY29ycmVjdGlvbnMgPSBrbm93bihlZDEuY29uY2F0KGVkMikpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaSwgX2xlbjtcblx0XHRcdFxuXHRcdFx0Ly8gU29ydCB0aGUgZWRpdHMgYmFzZWQgb24gaG93IG1hbnkgZGlmZmVyZW50IHdheXMgdGhleSB3ZXJlIGNyZWF0ZWQuXG5cdFx0XHR2YXIgd2VpZ2h0ZWRfY29ycmVjdGlvbnMgPSB7fTtcblx0XHRcdFxuXHRcdFx0Zm9yIChpID0gMCwgX2xlbiA9IGNvcnJlY3Rpb25zLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuXHRcdFx0XHRpZiAoIShjb3JyZWN0aW9uc1tpXSBpbiB3ZWlnaHRlZF9jb3JyZWN0aW9ucykpIHtcblx0XHRcdFx0XHR3ZWlnaHRlZF9jb3JyZWN0aW9uc1tjb3JyZWN0aW9uc1tpXV0gPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHdlaWdodGVkX2NvcnJlY3Rpb25zW2NvcnJlY3Rpb25zW2ldXSArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHZhciBzb3J0ZWRfY29ycmVjdGlvbnMgPSBbXTtcblx0XHRcdFxuXHRcdFx0Zm9yIChpIGluIHdlaWdodGVkX2NvcnJlY3Rpb25zKSB7XG5cdFx0XHRcdGlmICh3ZWlnaHRlZF9jb3JyZWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdHNvcnRlZF9jb3JyZWN0aW9ucy5wdXNoKFsgaSwgd2VpZ2h0ZWRfY29ycmVjdGlvbnNbaV0gXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZnVuY3Rpb24gc29ydGVyKGEsIGIpIHtcblx0XHRcdFx0aWYgKGFbMV0gPCBiWzFdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0c29ydGVkX2NvcnJlY3Rpb25zLnNvcnQoc29ydGVyKS5yZXZlcnNlKCk7XG5cdFx0XHRcblx0XHRcdHZhciBydiA9IFtdO1xuXG5cdFx0XHR2YXIgY2FwaXRhbGl6YXRpb25fc2NoZW1lID0gXCJsb3dlcmNhc2VcIjtcblx0XHRcdFxuXHRcdFx0aWYgKHdvcmQudG9VcHBlckNhc2UoKSA9PT0gd29yZCkge1xuXHRcdFx0XHRjYXBpdGFsaXphdGlvbl9zY2hlbWUgPSBcInVwcGVyY2FzZVwiO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAod29yZC5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIHdvcmQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkgPT09IHdvcmQpIHtcblx0XHRcdFx0Y2FwaXRhbGl6YXRpb25fc2NoZW1lID0gXCJjYXBpdGFsaXplZFwiO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRmb3IgKGkgPSAwLCBfbGVuID0gTWF0aC5taW4obGltaXQsIHNvcnRlZF9jb3JyZWN0aW9ucy5sZW5ndGgpOyBpIDwgX2xlbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChcInVwcGVyY2FzZVwiID09PSBjYXBpdGFsaXphdGlvbl9zY2hlbWUpIHtcblx0XHRcdFx0XHRzb3J0ZWRfY29ycmVjdGlvbnNbaV1bMF0gPSBzb3J0ZWRfY29ycmVjdGlvbnNbaV1bMF0udG9VcHBlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChcImNhcGl0YWxpemVkXCIgPT09IGNhcGl0YWxpemF0aW9uX3NjaGVtZSkge1xuXHRcdFx0XHRcdHNvcnRlZF9jb3JyZWN0aW9uc1tpXVswXSA9IHNvcnRlZF9jb3JyZWN0aW9uc1tpXVswXS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIHNvcnRlZF9jb3JyZWN0aW9uc1tpXVswXS5zdWJzdHIoMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmICghc2VsZi5oYXNGbGFnKHNvcnRlZF9jb3JyZWN0aW9uc1tpXVswXSwgXCJOT1NVR0dFU1RcIikpIHtcblx0XHRcdFx0XHRydi5wdXNoKHNvcnRlZF9jb3JyZWN0aW9uc1tpXVswXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIHJ2O1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLm1lbW9pemVkW3dvcmRdID0ge1xuXHRcdFx0J3N1Z2dlc3Rpb25zJzogY29ycmVjdCh3b3JkKSxcblx0XHRcdCdsaW1pdCc6IGxpbWl0XG5cdFx0fTtcblxuXHRcdHJldHVybiB0aGlzLm1lbW9pemVkW3dvcmRdWydzdWdnZXN0aW9ucyddO1xuXHR9XG59O1xufSkoKTtcblxuLy8gU3VwcG9ydCBmb3IgdXNlIGFzIGEgbm9kZS5qcyBtb2R1bGUuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBUeXBvO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cG8tanMvdHlwby5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdHlwby1qcy90eXBvLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZnMgKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIl0sInNvdXJjZVJvb3QiOiIifQ==