webpackJsonp([9],{/***/
"JOa/":/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function t(e){return e&&e.__esModule?e:{default:e}}n("6vhR");var o=n("wGMW"),a=t(o),i=n("Jov0"),c=t(i),s=n("b1yq"),l=n("JS9y"),u=t(l);
//AjaxTab
new a.default(e("[data-pjax-container]"),{container:"#list-container",loader:"#loader",before:function(e){c.default.htmlPlaceholder(e)},success:function(e){new s.FollowUserIntialization(e),u.default.parse(e[0])}})}).call(t,n("9ZC0"))},/***/
wGMW:/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("AA3o"),i=o(a);n("2SKx");var c=n("Jov0"),s=(o(c),function t(n,o){var a=this;(0,i.default)(this,t),e.pjax.defaults.timeout=5e4,this.element=n,this.container=e(o.container),this.element.pjax("li a",o.container),this.options=o,this.element.on("pjax:click",function(t){e(t.target).parent().siblings().removeClass("active").end().addClass("active")}),this.loader=e(this.options.loader),
//绑定事件
e(document).on("pjax:beforeSend",function(e,t,n){"function"==typeof a.options.before&&a.options.before.call(a,a.container,t),a.loader.show()}),e(document).on("pjax:success",function(e,t,n,o,i){"function"==typeof a.options.success&&a.options.success.call(a,a.container,o,t,n,i)}),e(document).on("pjax:complete",function(e,t,n,o){"function"==typeof a.options.complete&&a.options.complete.call(a,e,t,n,o),a.loader.hide()})});t.default=s}).call(t,n("9ZC0"))}},["JOa/"]);