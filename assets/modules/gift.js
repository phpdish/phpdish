'use strict';
var util = require('module/util.js');

function Gift(giftId)
{
    var $action = $('#exchange-action'),
        $tips = $('#exchange-tips'),
        $confirm = $('#exchange-confirm'),
        $info = $('#gift-info'),
        $exchangeNum = $('#exchange_num'),
        $exchange = $('#exchange'),
        $giftContent = $('#gift-content'),
        $showGiftAction = $('#show-gift-action');

    var $document = $('document');

    function initGift(response) {
        var gift = response.info.gift;
        if(!gift){
            return;
        }
        //展示提示有隐藏区
        if (gift.hidden_content) {
            $showGiftAction.show();
            $giftContent.show().children('.content').html(gift.hidden_content);
        }
        $exchange.html(gift.exchange.title);
        $exchangeNum.html(gift.exchange.nums);

        if (gift.exchange.enable) {
            $exchange.removeClass('disabled btn-default').addClass('btn-success');
            //积分大于0的需要兑换确认
            if (parseInt(gift.points) > 0) {
                $exchange.attr({
                    'data-toggle': 'collapse',
                    'href': '#exchange-confirm',
                    'aria-expanded': 'false',
                    'aria-controls': 'exchange-confirm'
                });
            } else {
                $exchange.addClass('exchange-submit');
            }
        } else if(gift.exchange.reason == 1) {
            $exchange.removeClass('disabled btn-default').addClass('btn-success');
            $exchange.html('请您先登录').on('click', function(){
                window.location.href = util.route.getRoutePath('user.login');
                return false;
            });
        }
        $info.find('.credit em').html(gift.points);
        $info.find('.stock em').html(gift.stock < 0 ? '不限量' : gift.stock);
        $info.find('.buyers em').html(gift.exchange_nums);
    }

    /**
     * 兑换礼物
     * @returns {boolean}
     */
    function exchange(){
        $exchange.button('loading');
        util.request('gift.exchange', giftId, function(response){
            initGift(response);
            if(response.code == 0){
                $exchange.html(response.message);
            }else{
                $tips.html(response.message).addClass('text-danger');
                $exchange.html(response.message).removeClass('btn-success').addClass('btn-default disabled').prop('disabled', true);
                return false;
            }
        });
        return false;
    }

    function init() {
        util.request('gift.summary', giftId, function(response){
            initGift(response);
        });
        $exchange.on('click', function(){
            if ($(this).hasClass('exchange-submit')) {
                exchange();
            }
        });
        $('#exchange-cancel').on('click', function(){
            $confirm.collapse('hide');
        });
        $('#exchange-submit').on('click', function(){
            $confirm.collapse('hide');
            exchange();
        });
    }
    init();
}

module.exports = Gift;