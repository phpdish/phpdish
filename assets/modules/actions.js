'use strict';

import Util from './util.js';
import lockButton from '../modules/button-lock.js';
import $ from 'jquery';
import QRCodePayment from './qrcode-payment.js';

class FollowCategoryIntialization{
    constructor($container){
        $container.find('[data-role="follow-category"]').each(function(){
            const $follow = $(this);
            const price = $follow.data('price');
            const btnText = price ? `${price} 订阅` : '免费订阅';

            //关注专栏
            $follow.on('click', '[data-action="follow"]', function(){
                const $this = $(this);
                const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
                const buttonLock = lockButton($this);
                const wait = Util.dialog.wait.ballPulse();
                Util.request('category.follow', {'slug': slug}).done(function(response){
                    if (response.require_payment) {
                        new QRCodePayment(response.qrcode);
                        return;
                    }
                    $this.attr('data-action', 'unfollow').removeClass('u-btn-outline-primary').addClass('btn-default')
                        .html('<i class="if i-check"></i> 已订阅');

                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    wait.close();
                    buttonLock.release();
                });
            }).on('click', '[data-action="unfollow"]', function(){
                const $this = $(this);
                const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
                const buttonLock = lockButton($this);
                Util.request('category.unfollow', {'slug': slug}).done(function(response){
                    $this.attr('data-action', 'follow').removeClass('btn-default').addClass('u-btn-outline-primary')
                        .html(`<i class="if i-plus"></i> ${btnText}`);
                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    buttonLock.release();
                });
            });
        });
    }
}

class FollowThreadIntialization{
    constructor($container){
        $container.find('[data-role="follow-thread"]').each(function(){
            const $follow = $(this);
            //关注节点
            $follow.on('click', '[data-action="follow"]', function(){
                const $this = $(this);
                const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
                const buttonLock = lockButton($this);

                Util.request('thread.follow', {'slug': slug}).done(function(response){
                    $this.attr('data-action', 'unfollow').removeClass('u-btn-outline-primary').addClass('btn-default')
                        .html('<i class="if i-check"></i> 已关注');

                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    buttonLock.release();
                });
            }).on('click', '[data-action="unfollow"]', function(){
                const $this = $(this);
                const slug = $this.data('slug') || $this.closest('[data-slug]').data('slug');
                const buttonLock = lockButton($this);
                Util.request('thread.unfollow', {'slug': slug}).done(function(response){
                    $this.attr('data-action', 'follow').removeClass('btn-default').addClass('u-btn-outline-primary')
                        .html('<i class="if i-plus"></i> 关注');
                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    buttonLock.release();
                });
            });
        });
    }
}

/**
 * 用户关注
 */
class FollowUserIntialization {
    constructor($container){
        $container.find('[data-role="follow"]').each(function(){
            const $follow = $(this);

            $follow.on('click', '[data-action="follow"]', function(){
                const $this = $(this);
                const username = $this.data('username') || $this.closest('[data-username]').data('username');
                const buttonLock = lockButton($this);
                Util.request('user.follow', {'username': username}).done(function(response){
                    $this.attr('data-action', 'unfollow').removeClass('u-btn-outline-primary').addClass('btn-default')
                        .html('<i class="if i-check"></i> 已关注');
                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    buttonLock.release();
                });
            }).on('click', '[data-action="unfollow"]', function(){
                const $this = $(this);
                const username = $this.data('username') || $this.closest('[data-username]').data('username');
                const buttonLock = lockButton($this);
                Util.request('user.unfollow', {'username': username}).done(function(response){
                    $this.attr('data-action', 'follow').removeClass('btn-default').addClass('u-btn-outline-primary')
                        .html('<i class="if i-plus"></i> 关注');
                }).fail(function(response){
                    Util.dialog.message(response.responseJSON.error).flash();
                }).always(() => {
                    buttonLock.release();
                });
            });
        });
    }
}


export { FollowCategoryIntialization, FollowThreadIntialization, FollowUserIntialization };

