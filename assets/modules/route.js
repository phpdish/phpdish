'use strict';

var $ = require('jquery');

var routes = {
    'page.init': {path: '/pages/init', method: 'POST'}, //页面初始化
    'captcha': '/captcha', ///验证码
    'post.show': '/posts/{id}', //post展示页
    'post.summary': '/posts/summary/{id}', //post的概要信息
    'post.like': {path: '/posts/{id}/like', method: 'POST'},
    'post.unlike': {path: '/posts/{id}/unlike', method: 'POST'},
    'post.favorite': {path: '/posts/{id}/favorites', method: 'POST'},
    'post.analysis': '/posts/{id}/analysis',
    'comment.load': '/posts/{id}/comments',
    'comment.add': {path: '/posts/{id}/comments', 'method': 'POST'},
    'comment.like': {path: '/comments/{id}/like', method: 'POST'},
    'comment.unlike': {path: '/comments/{id}/unlike', method: 'POST'},
    'gift.exchange': {path: '/gifts/{id}/exchange', method: 'POST'},
    'gift.summary': {path: '/gifts/summary/{id}', method: 'POST'},
    'user.follow': {path:'/users/{id}/follow', method: 'POST'},
    'user.unfollow': {path:'/users/{id}/unfollow', method: 'POST'},
    'user.plate': '/users/{id}/plate',
    'user.login': '/users/login',
    'user.register': '/users/register',
    'user.logout': '/users/logout',
    'user.changeAvatar': {path:  '/user/users/avatar', method: 'POST'},
    'topic.follow': {path:'/topics/{id}/follow', method: 'POST'},
    'topic.unfollow': {path:'/topics/{id}/unfollow', method: 'POST'},
    'question.follow': {path:'/questions/{id}/follow', method: 'POST'},
    'question.unfollow': {path:'/questions/{id}/unfollow', method: 'POST'},
    'questionReply.add': {path:'/question-replies/add/{questionId}', method: 'POST'}, //添加问题回复
    'question.add': {path:'/questions/add/{topicId}', method: 'POST'}, //添加问题
    'message.add': {path:'/user/messages/add', method: 'POST'},
};

function Route()
{
    var _this = this;
    /**
     * name  路由名
     * requirements 占位符 参数id
     * parameters    data请求参数
     * options   对应ajax 的 options
     */
    this.request = function(name, requirements, parameters, options){
        options = options || {};
        if(typeof requirements == 'function'){
            options.success = requirements;
            requirements = {};
            parameters = {};
        }else if(typeof parameters == 'function'){
            options.success = parameters;
            parameters = {};
        }
        var route = this.getRoute(name, requirements);
        $.extend(options, {
            url: route[0],
            type: route[1],
            data: parameters
        });
        return this.lastRequest = $.ajax(options);
    };
    this.getRoute = function(name, requirements) {
        if(typeof routes[name] != 'undefined'){
            var method, path;
            if(typeof routes[name] == 'object'){
                path = routes[name].path;
                method = routes[name].method;
            } else {
                path = routes[name];
                method = 'GET';
            }
            if(typeof requirements != 'undefined'){
                if(typeof requirements != 'object'){
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

    this.getRoutePath = function(name, requirements){
        if(typeof routes[name] != 'undefined'){
            var path;
            if(typeof routes[name] == 'object'){
                path = routes[name].path;
            } else {
                path = routes[name];
            }
            if(typeof requirements != 'undefined'){
                if(typeof requirements != 'object'){
                    requirements = {id: requirements};
                }
            } else {
                requirements = {};
            }
            $.each(requirements, function (i, n){
                path = path.replace('{'+i+'}', n);
            });
            return path;
        }
        return false;
    }
}

module.exports = Route;