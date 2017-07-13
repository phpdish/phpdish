/*! dmeng 2.1 slide */
!(function($){
  'use strict';
  window.dmengSlide = [];
  var dmengSlidePn = function(scroll, next){
    var x = scroll.currentPage.pageX;
    next ? x++ : x--;
    if ( x >= scroll.pages.length ) {
      x = 0;
    } else if ( x < 0 ) {
      x = scroll.pages.length;
    }
    scroll.goToPage(x, 0);
  };
  $(document).ready(function(){
    $('.dmengslide-wrapper').each(function(i){
      $(this).show();
      var 
        id = 'dmengslide-'+i,
        $c = $(this).children('.dmengslide-scroller'),
        $s = $c.children('.dmengslide'),
        w = $(this).width(), 
        rePaged = function(e, i, n){
          e.children('.dmengslide-indicator').html('<sup>'+i+'</sup>/<sub>'+n+'</sub>');
        },
        autoRePaged = function(scroll, time, now){
          if (now && $('#'+scroll.wrapper.id+':hover').length<=0)
            dmengSlidePn(scroll, true);
          now = true;
          setTimeout(function(){
            autoRePaged(scroll, time, now);
          }, time);
        };
      rePaged($(this), 1, $s.length);
      $(this).attr({'id':id, 'data-slide-id':i});
      $c.css({'width':w*$s.length});
      $s.each(function(){
        $(this).css({'width':w});
      });
      dmengSlide[i] = new IScroll('#'+id, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapSpeed: 600,
        keyBindings: true,
        click: true
      });
      dmengSlide[i].on('scrollEnd', function () {
        rePaged($(this.wrapper), this.currentPage.pageX+1, this.pages.length);
      });
      autoRePaged(dmengSlide[i], 5000);
    });
  }).on('click', '.dmengslide-prev, .dmengslide-next', function(){
    var scroll = dmengSlide[$(this).parents('.dmengslide-wrapper').data('slide-id')],
        next = $(this).hasClass('dmengslide-next') ? true : false;
    dmengSlidePn(scroll, next);
  });
})(jQuery);