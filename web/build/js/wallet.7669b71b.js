webpackJsonp([11],{EPPZ:function(a,t,n){"use strict";(function(a){function t(a){return a&&a.__esModule?a:{default:a}}var l=n("mueN"),e=t(l),r=n("Jov0"),i=t(r),o=a('[data-role="wallet-info"]');o.length>0&&function(a){var t=o.find('[data-role="withdraw"]'),n=o.find("[data-amount]"),l=(0,e.default)(t);t.on("click",function(){if(l.isDisabled())return!1;l.lock();var a=n.data("amount");i.default.dialog.inputs(Translator.trans("wallet.withdraw"),[{name:"amount",required:!0,placeholder:Translator.trans("wallet.withdraw_amount")},{name:"alipay_account",required:!0,placeholder:Translator.trans("wallet.alipay_account")}],{rules:{amount:{required:!0,digits:!0,min:100,max:Math.floor(a/100)}},messages:{amount:{required:Translator.trans("wallet.validation.amount.required"),digits:Translator.trans("wallet.validation.amount.digits"),min:Translator.trans("wallet.validation.amount.min"),max:Translator.trans("wallet.validation.amount.max")},alipay_account:{required:Translator.trans("wallet.validation.alipay_account.required")}}},{width:300}).then(function(a){a.amount=100*a.amount,i.default.request("wallet.withdraw",{},a).done(function(a){i.default.dialog.message(Translator.trans("wallet.withdraw_apply_success")).flash(function(){location.reload()})}).fail(function(a){i.default.dialog.message(a.responseJSON.error).flash(function(){})}).always(function(){l.release()})},function(){l.release()})})}()}).call(t,n("0iPh"))}},["EPPZ"]);