/*! 
 * dmeng base (http://www.dmeng.net) 
 * 7:58 2015/9/21
 * @author steven.chan.chihyu(http://duomeng.me)
 */

dmeng.user = {};

!function ($) {
  'use strict';

  var $document = $(document),
    $window = $(window);

  dmeng.lazyload = function () {
    $('.entry-thumbnail img, img.avatar, img.look').lazyload({
      effect : "show"
    });
    $('#sidebar img.avatar,#sidebar img.look').lazyload({
      effect : "show"
    });
  }

  dmeng.hashOffset = function (h) {
    var h = h ? h : location.hash,
      $h = $(h);
    if ($(h).length <= 0)
      return null;
    var st = $(h).offset().top;
    if (!dmeng.is_mobile)
      st = st-parseInt($('#masthead .navbar').outerHeight(true));
    return st;
  }
  dmeng.goHash = function (h) {
    var st = dmeng.hashOffset(h);
    if (null!==st)
      $('html,body').animate({scrollTop:st}, 800);
  }
  //~ @function set cookie
  dmeng.setCookie = function (c_name, value, expire, path) {
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expire*1000);
    document.cookie=c_name+ "=" +escape(value)+((expire==null) ? "" : ";expires="+exdate.toGMTString())+((path==null) ? "" : ";path="+path);
  }
  //~ @function get cookie
  dmeng.getCookie = function (c_name) {
    if (document.cookie.length>0) {
      var c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1) {
        c_start=c_start + c_name.length+1;
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
    return ""
  }
  //~ @function get query arg
  dmeng.getQueryString = function (key) {
     var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!=null)
       return unescape(r[2]);
     return null;
  }
  //~ @function update query arg
  dmeng.updateQueryString = function (uri, key, value) {
    var reg = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var sep = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(reg))
      return uri.replace(reg, '$1' + key + "=" + value + '$2');
    return uri + sep + key + "=" + value;
  }
  dmeng.htmlEncode = function (value) {
    return $('<div/>').text(value).html();
  }
  dmeng.htmlDecode = function (value) {
    return $('<div/>').html(value).text();
  }
  dmeng.numberFormat = function (number) {
    var n = parseInt(number.toString().replace(',', '')),
        prefix = 'kMGTPEZY';
    if (n<100000) {
      return number;
    }
    for (var i=-1; n>=1000; i++) {
      n /= 1000;
    }
    return Math.floor(n)+prefix.charAt(i)+'+';
  }

  dmeng.pageUrl = location.href;
  dmeng.commentsLoading = 0;
  dmeng.commentsID = '#comments';
  dmeng.commentsThread = '#thread-comments';
  dmeng.commentsLoadID = '#comments-loading';

  dmeng.commentsLoad = function (paged) {
    if (dmeng.commentsLoading)
      return;
    if ($(dmeng.commentsLoadID).length>0 && $(dmeng.commentsLoadID).hasClass('loaded')==false && ( $(dmeng.commentsLoadID).offset().top-$window.height()-$window.scrollTop() ) <= 0) {
      dmeng.commentsLoading = 1;
      $.post( dmeng.ajaxurl, { action: 'get_comments_template', cpage: ( paged ? paged : dmeng.cpage ), post_id: dmeng.post_id }, function (data) {
        $(dmeng.commentsID).after( $(dmeng.commentsLoadID).addClass('loaded').hide() ).html(data);
        dmeng.commentsLoading = 0;
        dmeng.each_vote();
        dmeng.lazyload();
        if (window.location.hash.indexOf('#comment')===0)
          dmeng.goHash();
      });
    }
  }

  window.addComment = {
    moveForm : function (comment, parent, respond, post) {
      var c = '#'+comment;
      var l = $('#commentform .help-block a');
      if ($(c).next("form").length>0) {
        $(c).find('.comment-reply-link').removeClass('highlight');
        $('#comment_parent').val('0');
        $('#'+respond).append($('#commentform'));
        dmeng.isReply = 0;
      } else {
        $('.comment-reply-link').removeClass('highlight');
        $(c).find('.comment-reply-link').addClass('highlight');
        $('#comment_parent').val(parent);
        $(c).after($('#commentform'));
        dmeng.goHash('#'+comment);
        dmeng.isReply = 1;
      }
      return false;
    }
  }

  dmeng.vote = function (t, i, v, e) {
    if (!dmeng._wpnonce)
      return;
    e.parent().addClass('disabled').children().addClass('disabled');
    $.ajax({
      type: 'POST',
      url: dmeng.ajaxurl,
      data: {
        action: 'dmeng_vote_ajax',
        vote: { type: t, id: i, vote: v },
        _wpnonce: dmeng._wpnonce
      },
      complete: function (response) {
        response = response.responseText;
        if (isNaN(response)===false) {
          e.parent().removeClass('disabled').children().removeClass('disabled');
          var cookieTime, vote;
          if (e.hasClass('active')) {
            e.removeClass('active');
            cookieTime = -1;
          } else {
            e.addClass('active').siblings().addClass('disabled').parent().addClass('disabled');
            cookieTime = 3600*24;
          }
          e.blur().children('.num').html(response);
          dmeng.setCookie('dm_vote_'+t+'_'+i, v, cookieTime, '/');
        }
      }
    });
    return false;
  }
  dmeng.each_vote = function () {
    if (dmeng.user.ID)
      return;
    $(".vote-group").each(function () {
      if ($(this).hasClass("disabled"))
        return;
      var i = $(this).attr('data-vote-id'),
        t = $.trim($(this).attr('data-vote-type'))=='post' ? 'post' : 'comment',
        c = dmeng.getCookie('dm_vote_'+t+'_'+i);
      if (c!=null && (c=='up'||c=='down')) {
        $(this).addClass("disabled");
        $(this).children("."+c).addClass("active").siblings().addClass("disabled");
      }
    });
  }

  dmeng.ready = function () {
    dmeng.commentsLoad();

    var readyData = {action: 'dmeng_ready', tracker: dmeng.tracker},
        fid = dmeng.getQueryString('fid');

    if (fid) {
      dmeng.setCookie('dm_fid', fid, 86400, '/');
      readyData.fid = fid;
    }

    if (window.location.hash.indexOf('#comment')===0)
      dmeng.goHash('#comments');

    dmeng.readyAjax = $.ajax({
      type: 'POST',
      url: dmeng.ajaxurl,
      data: readyData,
      complete: function (e) {
        var data = e.responseJSON;
        if (!data)
          return;

        dmeng._wpnonce = { hash: dmeng.tracker.hash, nonce: data._wpnonce };
        $("[data-num-views='true']").html(data.tracker);

        if (data.comments) {
          $("[data-num-comments='true']").html(data.comments);
        }

        var vote_id = '[data-vote-type="post"]';
        if (data.post_vote && $(vote_id).length>0) {
          if (data.post_vote.up) {
            $(vote_id+' .up .num').html(data.post_vote.up);
          }
          if (data.post_vote.down) {
            $(vote_id+' .down .num').html(data.post_vote.down);
          }
          if (data.post_vote.active) {
            $(vote_id).addClass('disabled').children().addClass('disabled');
            $(vote_id+' .'+data.post_vote.active).addClass('active').removeClass('disabled');
          }
        }

      }
    });

    dmeng.each_vote();
    dmeng.lazyload();
    dmeng.codePrettify();
    
    if (dmeng.isluri && $('.dmengslide').length>0 )
      $.getScript(dmeng.isluri);

  }

  dmeng.hideLookPopover = function () {
    var actionID = '#looks-image';
    if ($(actionID+':hover').length<=0)
      $(actionID).popover('hide');

    $document.off('click', 'body', dmeng.hideLookPopover );
  }

  dmeng.codePrettify = function () {
    if (!dmeng.cpfuri)
      return;
    $('.entry-content code').each(function () {
      if ($(this).hasClass('prettyprint'))
        return;
      if ($(this).parent('pre').length>0 || $(this).parent('.prettyprint').length>0)
        return;
      if ($(this).data('linenums'))
        $(this).wrap('<pre />').parent().addClass('prettyprint linenums');
      else
        $(this).addClass('prettyprint');
    });
    if ($('.prettyprint').length>0) {
      $.getScript(dmeng.cpfuri, function(){
        prettyPrint();
      });
    }
  }

  $document.on('click', '[data-toggle=hash] a[href*=#]', function(e){
    e.preventDefault();
    var st = dmeng.hashOffset(this.hash);
    if (null!==st)
      $('html,body').animate({scrollTop:st}, 800);
  }).on('click', '#pagination-comments a', function () {
    if ($(dmeng.commentsLoadID).length<=0)  return;
    var url = $(this).attr('href'),
      paged = parseInt(url.match(/cpage=([0-9]+)/)[1]);
    $(dmeng.commentsThread).html( $(dmeng.commentsLoadID).removeClass('loaded').show() );
    dmeng.commentsLoad( paged );
    history.pushState(null, '', url);
    dmeng.goHash('#thread-comments');
    return false;
  }).on("submit","#commentform",function () {
    var s = $('#commentsubmit'),
      c = $('#comment'),
      errorID = '#error-page',
      errorAlert = '#comment-error-alert';
    s.button('loading');
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize(),
      beforeSend: function () {
        c.prop('disabled', true);
      },
      complete: function (e) {
        e = e.responseText;
        if (e.search(errorID)>0) {
          $(errorAlert).html($.trim(e.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im)[1])).fadeIn( 400, function () {
            setTimeout( function () {
              $(errorAlert).fadeOut();
            }, 3000 );
          } );
        } else {
          $('#comments').html(e);
          if (!dmeng.isReply) dmeng.goHash('#thread-comments');
        }
        s.button('reset');
         c.prop('disabled', false);
        history.pushState(null, '', dmeng.pageUrl);
        dmeng.lazyload();
      }
    });
    return false;
  }).on('click', '#goTop', function (e) {
    if (
      e.target.id==$(this).attr('id')
      || $(e.target).parent().attr('id')==$(this).attr('id')
    ) {
      $('html,body').animate({scrollTop: '0px'}, 800);
    }
  }).on('click', '#goBottom', function () {
    dmeng.goHash('#colophon');
  }).on('click', '#goComments', function () {
    dmeng.goHash('#comments');
  }).on('click', '#goVote', function () {
    dmeng.goHash('#post-vote');
  }).on('click', '#refresh', function () {
    location.reload();
  }).on('click', '.vote-group a',function (e) {
    if ($(this).hasClass("disabled") || ($(this).hasClass('active') && !dmeng.user.ID) )
      return;

    var lastTime = dmeng.voteTS ? dmeng.voteTS : 0;
    if ((e.timeStamp - lastTime)<1000)
      return;
    dmeng.voteTS = e.timeStamp;

    var parent = $(this).parent(),
      i = parent.attr('data-vote-id'),
      t = $.trim(parent.attr('data-vote-type'))=='post' ? 'post' : 'comment',
      v = $(this).hasClass('up') ? 'up' : 'down',
      v = $(this).hasClass('active') ? 'cancel_'+v : v;
    dmeng.vote(t, i, v, $(this));
  }).on('click', '.article_index h5', function () {
    $(this).parent('.article_index').children('ul').toggle();
  }).on( 'click', '#set-font-small, #set-font-big',function () {
    $(this).addClass("disabled");
    $(this).siblings().removeClass("disabled");
    $("#content .entry-content").css( $(this).attr('id')=='set-font-small' ? {"font-size":"initial"} : {"font-size":"larger"} );
  }).on('click', '#looks-image',function () {

    if (!dmeng.look || $('#comment').prop('disabled'))
      return false;

    var html = '<ul id="looks-list" class="clearfix">';
    $.each( dmeng.look.files, function (title, file) {
      html += '<li title="'+title+'"><img src="'+dmeng.look.uri+file+'" alt="'+title+'" width="22" height="22" />';
    });
    html += '</ul>';
    if (typeof $(this).data('original-title') == 'undefined') {
      $(this).popover({
        container: '#commentform',
        trigger: 'manual',
        html: true,
        placement: 'right',
        template: '<div class="popover look-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" id="looks"></div></div>',
        content: html
      });
    }
    $(this).popover('toggle');

    $document.on('click', 'body', dmeng.hideLookPopover );

  }).on('click', '#looks li',function () {

      var cid = '#comment',
              val = $(cid).val(),
              length = val.length,
              selectionStart = $(cid).prop('selectionStart'),
              look = '[' + $(this).attr('title') + ']',
              selectionRange = selectionStart+look.length;

    $(cid).val( val.slice(0, selectionStart)+look+val.slice(selectionStart, length) ).focus();
    $(cid)[0].setSelectionRange(selectionRange, selectionRange);

    dmeng.hideLookPopover();
    return false;
  }).on( 'click', '#privacy-action',function () {
    if ($('#comment').prop('disabled')) return false;
    var active = $(this).hasClass('active'),
      codeStart = '[pem]',
      codeEnd = '[/pem]',
      code = active ? codeEnd : codeStart,
      cid = '#comment',
      val = $(cid).val(),
      length = val.length,
      selectionStart = $(cid).prop('selectionStart'),
      selectionEnd = $(cid).prop('selectionEnd'),
      selectionRange = selectionStart,
      start = val.slice(selectionStart-codeStart.length, selectionStart)==codeStart,
      end = val.slice(selectionEnd, selectionEnd+codeEnd.length)==codeEnd,
      newVal = val;
    if (!start || !end) {
        if (selectionStart===selectionEnd) {
          if (selectionStart===length) {
            newVal = val+codeStart+codeEnd;
            selectionRange = selectionStart+codeStart.length;
          } else {
            newVal = val.slice(0, selectionStart) + code + val.slice(selectionStart, length);
            $(this).button( ( active ? 'reset' : 'endtag' ) ).button('toggle');
            selectionRange = selectionStart+code.length;
          }
        } else {
          var c = val.slice(selectionStart, selectionEnd),
          c = c.replace(codeStart, '').replace(codeEnd, '');
          newVal = val.slice(0, selectionStart) + codeStart + c + codeEnd + val.slice(selectionEnd, length);
          selectionRange = selectionStart+c.length+codeStart.length+codeEnd.length;
        }
    }
    $(cid).val(newVal).focus();
    $(cid)[0].setSelectionRange(selectionRange, selectionRange);
  }).ready(function () {
    dmeng.ready();
    dmeng.readied = true;
  });

}(jQuery);
