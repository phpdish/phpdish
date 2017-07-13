/*! 
 * dmeng pc (http://www.dmeng.net) 
 * 7:58 2015/9/21
 * @author steven.chan.chihyu(http://duomeng.me)
 */
!function ($) {
  'use strict';

  var $document = $(document),
      $window = $(window);

  dmeng.floatNav = function () {
    var $main = $('#main'),
        $floatNav = $('#float-nav'),
        $menu =  $floatNav.children('#float-nav-menu'),
        main_width = $main.width(),
        nav_width = $floatNav.width(),
        mtop = 0-50-$menu.height()/2;
    if ( (main_width+nav_width*2+20)>$window.width() ) {
      $floatNav.css({ 'left':'auto', 'right':'10px', 'margin-top':mtop, 'margin-left': 0 });
    } else {
      $floatNav.css({ 'left':'50%', 'right':'auto', 'margin-top':mtop, 'margin-left': main_width/2+10 });
    }
    $menu.fadeIn();
  }

  dmeng.fixedLastAside = function (rs) {

    if (!dmeng.readied)
      return;
  
    var $masthead = $('#masthead'),
            $main = $('#main'),
            $content = $('#content'),
            $sidebar = $('#sidebar'),
            $e = $sidebar.children('aside').last();

    if ($e.length<=0 || $content.height() <= $sidebar.height()) {
      return;
    }

    var st = $window.scrollTop(),
        etop = parseInt($e.css('marginTop'));

    if (! $e.attr('data-offset-top') || $e.hasClass('static') || rs) {
      $e.attr('data-offset-top', $e.offset().top-etop).css('width', $sidebar.width());
    }

    var ot = $e.attr('data-offset-top'),
            et = ot - st,
            $nav = $masthead.children('.navbar'),
            t = $nav.outerHeight(),
            w = $window.width();

    if (w>991) {
      
      var mot = $main.offset().top,
          eot = $main.outerHeight() + mot - $e.outerHeight(true),
          nh = $nav.outerHeight(true);
      
      if (et<=t && false===$e.hasClass('fixed')) {
        $e.removeClass('absolute static').addClass('fixed').css({'top': t});
      }

      if ((st-etop)>=eot-nh && false===$e.hasClass('absolute')) {
        $e.removeClass('fixed static').addClass('absolute').css({'top': eot-$masthead.outerHeight(true)});
      }
    }

    if ((w<992 || et>t) && false===$e.hasClass('static')) {
      $e.removeClass('fixed absolute').addClass('static');
    }

  }

  dmeng.fixedNavbar = function () {
    var $m = $('#masthead'),
        $h = $m.find('.header-content'),
        $n = $m.find('.navbar'),
        ht = $h.outerHeight(true),
        st = $window.scrollTop();
    
    $m.css('height', $n.outerHeight()+ht);
    
    if (st>=ht &&  $window.width()>=768) {
      $n.removeClass('navbar-static-top').addClass('navbar-fixed-top');
    }
    
    if (st<ht) {
      $n.removeClass('navbar-fixed-top').addClass('navbar-static-top');
    }
    
  }

  dmeng.scroll = function () {
    dmeng.commentsLoad();
    dmeng.fixedLastAside(0);
    dmeng.fixedNavbar();
    var $goTop = $('#goTop');
    if ($window.scrollTop() >  ($window.height() / 2)) {
      if ( $goTop.is(':hidden') ) {
        $goTop.fadeIn();
      }
    } else {
      if ( $goTop.is(':visible') ) {
        $goTop.fadeOut();
      }
    }
  }

  dmeng.resize = function () {
    dmeng.fixedLastAside(1);
    dmeng.fixedNavbar();
    dmeng.floatNav();
  }

  $document.on('mouseenter', '#pageShare', function () {
    var $qrcode = $('#shareQrcode');
    if (!$qrcode.attr('src'))
      $qrcode.attr('src', $qrcode.data('api')+dmeng.current_page_url);
  }).on('click', '#sharePrompt', function (e) {
    prompt($(this).data('notice'), document.title+' '+dmeng.current_page_url);
    return false;
  }).on('mouseenter mouseleave', '.dropdown', function (e) {
    if ($window.width() > 767) {
      if (e.type=='mouseenter') {
        $(this).addClass('open');
      } else {
        $(this).removeClass('open');
      }
    }
  }).on('click', '.dropdown-toggle', function () {
    if ($(this).attr('href')) {
      window.location = $(this).attr('href');
    }
  }).ready(function () {
    dmeng.fixedLastAside(1);
    dmeng.fixedNavbar();
    dmeng.readyAjax.done(function () {
      dmeng.floatNav();
    });
  });

  $window.scroll(function () {
    dmeng.scroll();
  }).resize(function () {
    dmeng.resize();
  });

}(jQuery);
