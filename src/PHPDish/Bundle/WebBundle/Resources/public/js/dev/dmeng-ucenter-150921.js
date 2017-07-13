/*! 
 * dmeng ucenter (http://www.dmeng.net) 
 * 7:58 2015/9/21
 * @author steven.chan.chihyu(http://duomeng.me)
 */
!function ($) {
  'use strict';

  var $document = $(document);

  dmeng.loginurl = function () {
    return dmeng.ucenter.loginurl.replace( 'dmeng_current_page_url', dmeng.current_page_url );
  }
  
  dmeng.logouturl = function () {
    return dmeng.ucenter.logouturl.replace( 'dmeng_current_page_url', dmeng.current_page_url );
  }
  
	dmeng.newMessage = function (num) {
		var num = parseInt(num),
				mid = '#newMessage';
    if ($(mid).length<1) {
      $('#ucenterAvatar').after( $('<li/>').attr({ 'id':mid.replace('#', '') }).html($('<a/>')).hide() );
    }
    if (num<1) {
      $(mid).fadeOut();
    } else {
      $(mid).fadeIn().children('a').attr({ 'title': dmeng.ucenter.text.news_title.replace( '%s', num ), 'href': dmeng.ucenter.url_format.replace( '%s', 'message' )}).html(num)
    }
	}

  $document.ready(function () {
    dmeng.readyAjax.done(function (data) {
      
        if (data.userdata) {
          
        var float_menu_id = '#float-nav-menu',
          uc_id = '#ucenterAvatar',
          hid = '#ucenterHome';
          
          $(float_menu_id).prepend( $('<li/>').attr({ 'id':uc_id.replace('#', '') }).html($('<a/>').attr({ 'id':hid.replace('#', '') })) );
        
          dmeng.user.ID = 0;
          if (data.userdata.ID) {
            dmeng.user.ID = data.userdata.ID;
            if (data.userdata.user_info) {
              if (data.userdata.user_info.credit) {
                dmeng.current_page_url = dmeng.updateQueryString(dmeng.current_page_url, 'fid', dmeng.user.ID);
                $('#shareNotice').button('friend');
              }
              var user_info = '', homepage = dmeng.ucenter.url_format.replace('%s', 'home');
              $.each(data.userdata.user_info, function (key, value) {
                user_info += '<a href="'+dmeng.ucenter.url_format.replace('%s', key)+'" title="'+dmeng.ucenter.text[key]+'"><em>'+dmeng.ucenter.text[key]+'</em>('+value+')</a>';
              });
              user_info += '<a class="logout_url" href="'+dmeng.logouturl()+'" title="'+dmeng.ucenter.text.logout+'">&laquo; '+dmeng.ucenter.text.logout+'</a>';
            }
            $(hid).attr({ 'title':data.userdata.display_name, 'href':homepage }).css({ 'background-image':'url('+dmeng.htmlDecode(data.userdata.avatar)+')'}).prepend( '<div id="userInfoBox" class="floatBoxWrapper"><div class="floatBox"><a class="fn" href="'+homepage+'">'+data.userdata.display_name+'</a>'+user_info+'</div></div>' );
            dmeng.newMessage(data.userdata.news);
          } else {
            $(hid).attr({ 'title':data.userdata.welcome, 'href':dmeng.loginurl() });
          }

        }
    });
  }).on('click', '#userInfoBox', function(e){
    if ('A'!=e.target.tagName)
      return false;
  });

}(jQuery);
