webpackJsonp([8],{/***/
"0It5":/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function t(e){return e&&e.__esModule?e:{default:e}}n("6vhR");var o=n("wGMW"),i=t(o),a=n("Jov0"),c=t(a),l=n("b1yq");
//AjaxTab
new i.default(e("[data-pjax-container]"),{container:"#list-container",loader:"#loader",before:function(e){c.default.htmlPlaceholder(e)},success:function(e){new l.FollowUserIntialization(e)}})}).call(t,n("0iPh"))},/***/
wGMW:/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n("Zrlr"),a=o(i);n("u4Nl");var c=n("Jov0"),l=(o(c),function t(n,o){var i=this;(0,a.default)(this,t),e.pjax.defaults.timeout=5e4,this.element=n,this.container=e(o.container),this.element.pjax("li a",o.container),this.options=o,this.element.on("pjax:click",function(t){e(t.target).parent().siblings().removeClass("active").end().addClass("active")}),this.loader=e(this.options.loader),
//绑定事件
e(document).on("pjax:beforeSend",function(e,t,n){"function"==typeof i.options.before&&i.options.before.call(i,i.container,t),i.loader.show()}),e(document).on("pjax:success",function(e,t,n,o,a){"function"==typeof i.options.success&&i.options.success.call(i,i.container,o,t,n,a)}),e(document).on("pjax:complete",function(e,t,n,o){"function"==typeof i.options.complete&&i.options.complete.call(i,e,t,n,o),i.loader.hide()})});t.default=l}).call(t,n("0iPh"))}},["0It5"]);