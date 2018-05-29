'use strict';

import $  from 'jquery';

const routes = {

    //文章相关
    'posts': '/posts',
    'post.show': '/posts/{id}', //post展示页
    'post.delete': {path: '/posts/{id}', method: 'DELETE'},
    'post.vote': {path: '/posts/{id}/voters', method: 'POST'},
    'comment.add': {path: '/posts/{id}/comments', 'method': 'POST'},
    'comment.delete': {path: '/comments/{id}', 'method': 'DELETE'},
    'comment.vote': {path: '/comments/{id}/voters', method: 'POST'},

    //专栏相关
    'category.follow': {path: '/categories/{slug}/followers', method: 'POST'},
    'category.unfollow': {path: '/categories/{slug}/followers', method: 'DELETE'},

    //电子书
    'book.add_summary': {path: '/books/{slug}/summary', method: 'POST'},
    'book.edit_summary': {path: '/books/{slug}/summary/{id}/edit', method: 'POST'},
    'book.move_chapter': {path: '/books/{slug}/chapters/{id}/move', method: 'POST'},

    //用户相关
    'user.follow': {path:'/users/{username}/followers', method: 'POST'},
    'user.unfollow': {path:'/users/{username}/followers', method: 'DELETE'},

    //话题相关
    'topic.follow': {path:'/topics/{id}/follow', method: 'POST'},
    'topic.unfollow': {path:'/topics/{id}/unfollow', method: 'POST'},
    'topic.addReply': {path: '/topics/{id}/replies', method: 'POST'},
    'topic.delete': {path: '/topics/{id}', method: 'DELETE'},
    'topic.toggleRecommend': {path: '/topics/{id}/toggle_recommend', method: 'POST'},
    'topic.toggleTop': {path: '/topics/{id}/toggle_top', method: 'POST'},
    'topic.vote': {path: '/topics/{id}/voters', method: 'POST'},

    'topicReply.delete': {path: '/replies/{id}', method: 'DELETE'},
    'topicReply.vote': {path: '/replies/{id}/voters', method: 'POST'},

    //threads
    'thread.autocomplete': '/threads/autocomplete',
    'thread.follow': {path: '/threads/{slug}/followers', method: 'POST'},
    'thread.unfollow': {path: '/threads/{slug}/followers', method: 'DELETE'},

    //其它
    'upload': {path: '/uploads', method: 'POST'},
    'message.add': {path:'/user/messages/add', method: 'POST'},
    'captcha': '/captcha', ///验证码
    'notifications': '/notifications',
    'notification.count': '/notifications/count',
    //支付结果
    'payment.result': '/payments/result',
    'wallet.withdraw': {path:'/wallet/withdraw', method: 'POST'},
};

function Route()
{
    const _this = this;
    let lastRequest;

    /**
     * name  路由名
     * requirements 占位符 参数id
     * parameters    data请求参数
     * options   对应ajax 的 options
     */
    this.request = function(name, requirements, parameters, options){
        options = options || {};

        if(typeof requirements === 'function'){
            options.success = requirements;
            requirements = {};
            parameters = {};

        }else if(typeof parameters === 'function'){
            options.success = parameters;
            parameters = {};
        }
        const route = this.getRoute(name, requirements);
        options = $.extend({
            dataType: 'json',
            headers: {},
            url: route[0],
            type: route[1],
            data: parameters instanceof $ ? parameters.serialize() : parameters
        }, options);
        if (options.type.toUpperCase() === 'DELETE') {
            options.headers['x-http-method-override'] = 'DELETE';
        } else if (options.type.toUpperCase() === 'PATCH') {
            options.headers['x-http-method-override'] = 'PATCH';
        }
        return this.lastRequest = $.ajax(options);
    };

    this.getRoutePath = function(name, requirements){
        return this.getRoute(name, requirements)[0];
    };


    this.getRoute = function(name, requirements) {
        if(typeof routes[name] !== 'undefined'){
            let method, path;
            if(typeof routes[name] === 'object'){
                path = routes[name].path;
                method = routes[name].method;
            } else {
                path = routes[name];
                method = 'GET';
            }
            if(typeof requirements !== 'undefined'){
                if(typeof requirements !== 'object'){
                    requirements = {id: requirements};
                }
            } else {
                requirements = {};
            }
            $.each(requirements, function (i, n){
                path = path.replace('{'+i+'}', n);
            });
            return [path, method];
        }
        return false;
    };

    /**
     * 定义新的路由
     *
     * @param name
     * @param definition
     */
    this.addRoute = function(name, definition){
        routes[name] = definition;
    };

    /**
     * 合并新的路由
     * @param newRoutes
     */
    this.addRoutes = function(newRoutes){
        $.extend(routes, newRoutes);
    };
}

export default Route;