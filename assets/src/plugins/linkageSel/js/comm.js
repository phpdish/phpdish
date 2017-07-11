/*
 ajax.about from jQuery validation plug-in 1.5.5
 http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 http://docs.jquery.com/Plugins/Validation 
 */
//ajax mode: abort
//usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
//if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 

;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);
