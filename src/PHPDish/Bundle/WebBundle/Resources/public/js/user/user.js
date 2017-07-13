webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(29);

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {
	(function ($) {
	    var $document = $(document),
	        $content = $('#content'),
	        $tips = $('#ucenter_tips'),
	        $nav = $('#ucenter_nav'),
	        $page = $('#ucenter_page'),
	        $pageContent = $('#ucenter_page_content'),
	        $loading = $('#ucenter_loading'),
	        ucenterLoading = false,
	        paged = 1;
	    function getUcenterPage(href, pageId) {
	        ucenterLoading = true;
	        $.ajax({
	            type: 'get',
	            url: href,
	            data: {
	                pageId: pageId
	            },
	            complete: function (response) {
	                $pageContent.html(response.responseText);
	                history.pushState(null, '', href);
	                ucenterLoading = false;
	            }
	        });
	    }
	    $document.on('click', 'a[data-page2]', function () {
	        if (ucenterLoading) {
	            return false;
	        }
	        $pageContent.html($loading.clone().removeAttr('id').fadeIn());
	        var pageId = $(this).data('page');
	        var href = $(this).attr('href');
	        $(this).parents('ul').find('a').removeClass('active');
	        $(this).addClass('active');
	        getUcenterPage(href, pageId);
	        return false;
	    }).on('click', '#pagination a', function (e) {
	        if (ucenterLoading) {
	            return false;
	        }
	        $pageContent.html($loading.clone().removeAttr('id').fadeIn());
	        var pageId = $(this).data('page');
	        var href = $(this).attr('href');
	        getUcenterPage(href, pageId);
	        return false;
	    }).on('click', '#get_next, #get_prev, #get_news, #get_message', function () {
	        if (ucenterLoading) {
	            return false;
	        }
	        $pageContent.html($loading.clone().removeAttr('id').fadeIn());
	        paged = parseInt(paged);
	        switch ($(this).attr('id')) {
	            case 'get_news':
	                paged = 'news';
	                break;
	            case 'get_next':
	                paged++;
	                break;
	            case 'get_prev':
	                paged--;
	                break;
	            default:
	                paged = 1;
	        }
	        getUcenterPage();
	        return false;
	    }).on('click', '#more_form-toggle', function () {
	        $('#more_form').fadeToggle();
	        return false;
	    }).on('submit', '#profile', function () {
	        var s = $(this).find('[type=submit]');
	        s.button('loading');
	    }).on('click', '#destroy_other_sessions', function () {
	        if ($(this).hasClass('disabled')) {
	            return;
	        }
	        var s = $(this).button('loading');
	        $.ajax({
	            type: 'POST',
	            url: dmeng.ajaxurl,
	            data: {
	                action: 'dmeng_destroy_other_sessions'
	            },
	            complete: function (e) {
	                s.html(e.responseText);
	                dmeng.getUcenterPage();
	            }
	        });
	        return false;
	    });
	})($);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }

});