/**
*  VERSION // 0.1
*  AUTHOR // siegfried.ehret@gmail.com
*
*  LICENSE //
*
*  DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
*                   Version 2, December 2004
* 
* Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
*
* Everyone is permitted to copy and distribute verbatim or modified
* copies of this license document, and changing it is allowed as long
* as the name is changed.
* 
*           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
*   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
* 
* 0. You just DO WHAT THE FUCK YOU WANT TO.
*/
var json2xml = (function (my, undefined) {
  "use strict";
  var tag = function(name, options) {
    options = options || {};
    return "<"+(options.closing ? "/" : "")+name+">";
  };
  var exports = {
    convert:function(obj, rootname) {
      var xml = "";
      for (var i in obj) {
        if(obj.hasOwnProperty(i)){
          var value = obj[i], type = typeof value;
          if (value instanceof Array && type == 'object') {
            for (var sub in value) {
              xml += exports.convert(value[sub]);
            }
          } else if (value instanceof Object && type == 'object') {
            xml += tag(i)+exports.convert(value)+tag(i,{closing:1});
          } else {
            xml += tag(i)+value+tag(i,{closing:1});
          }
        }
      }
      return rootname ? tag(rootname) + xml + tag(rootname,{closing:1}) : xml;
    }
  };
  return exports;
})(json2xml || {});

module.exports = json2xml;
