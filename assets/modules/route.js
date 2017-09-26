'use strict';

import $  from 'jquery';

const routes = {
    'page.init': {path: '/pages/init', method: 'POST'}, //页面初始化
    'captcha': '/captcha', ///验证码
    'post.show': '/posts/{id}', //post展示页
    'post.summary': '/posts/summary/{id}', //post的概要信息
    'post.like': {path: '/posts/{id}/like', method: 'POST'},
    'post.follow': {path: '/posts/{id}/unlike', method: 'POST'},
    'comment.load': '/posts/{id}/comments',
    'comment.add': {path: '/posts/{id}/comments', 'method': 'POST'},
    'comment.like': {path: '/comments/{id}/like', method: 'POST'},
    'comment.unlike': {path: '/comments/{id}/unlike', method: 'POST'},

    'category.follow': {path: '/categories/{slug}/followers', method: 'POST'},
    'category.unfollow': {path: '/categories/{slug}/followers', method: 'DELETE'},

    'topic.delete': {path: '/topics/{id}', method: 'DELETE'},
    'topic.toggleRecommend': {path: '/topics/{id}/toggle_recommend', method: 'POST'},

    'upload': {path: '/uploads', method: 'POST'},

    'gift.exchange': {path: '/gifts/{id}/exchange', method: 'POST'},
    'gift.summary': {path: '/gifts/summary/{id}', method: 'POST'},
    'user.follow': {path:'/users/{username}/followers', method: 'POST'},
    'user.unfollow': {path:'/users/{username}/followers', method: 'DELETE'},
    'user.plate': '/users/{id}/plate',
    'user.login': '/users/login',
    'user.register': '/users/register',
    'user.logout': '/users/logout',
    'user.changeAvatar': {path:  '/user/users/avatar', method: 'POST'},
    'topic.follow': {path:'/topics/{id}/follow', method: 'POST'},
    'topic.unfollow': {path:'/topics/{id}/unfollow', method: 'POST'},
    'topic.addReply': {path: '/topics/{id}/replies', method: 'POST'},
    'question.follow': {path:'/questions/{id}/follow', method: 'POST'},
    'question.unfollow': {path:'/questions/{id}/unfollow', method: 'POST'},
    'questionReply.add': {path:'/question-replies/add/{questionId}', method: 'POST'}, //添加问题回复
    'question.add': {path:'/questions/add/{topicId}', method: 'POST'}, //添加问题
    'message.add': {path:'/user/messages/add', method: 'POST'},
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
}

export default Route;