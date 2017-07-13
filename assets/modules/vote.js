'use strict';

var util = require('./util.js');
var Cookies = require('js-cookie');

function Vote($voteGroup, options) {
    var $up = $voteGroup.find('[data-choose="like"]');
    var $down = $voteGroup.find('[data-choose="unlike"]');
    //合并配置
    options = _.merge({
        'cookie': true //启用cookie防止多次点击
    }, options);
    //如果优先配置了则不会在自动获取
    var type = options.type || $voteGroup.data('type');
    var id =  options.id || $voteGroup.data('id');

    function checkEnabled()
    {
        if($voteGroup.hasClass('disabled')){
            return false;
        }
        //检查cookie
        return !(options.cookie && Cookies.get('_vote_' + type + id));
    }

    /**
     * 获取路由名
     * @param choose
     * @returns {string}
     */
    function getVoteRouteName(choose) {
        return type + '.'+ choose;
    }

    /**
     * 处理点击事件
     * @param choose
     */
    function handle(choose) {
        var _this = this;
        if(this._processing){
            return false;
        }
        //无法处理
        if(!checkEnabled()){
            $voteGroup.removeClass('disabled').addClass('disabled');
            return false;
        }
        var $this = $(this);
        _this._processing = true;// 防止重复操作
        util.request(getVoteRouteName(choose), id,  function(response){
            if(response.code == 0) {
                $this.addClass("active");
                var cookieTime = 3600 * 24
                $this.children(".num").html(choose == 'like' ? response.info.vote.praise_nums : response.info.vote.stamp_nums);
                Cookies.set('_vote_' + type + id, choose, {path: '/', expires: 1});
                if(options.cookie){
                    $voteGroup.addClass('disabled');
                }
            }
        }).complete(function(){
            _this._processing = false;
        });
    }

    function init(){
        //如果启用了cookie防重复点击
        if(!checkEnabled()){
            $voteGroup.removeClass('disabled').addClass('disabled');
            return false;
        }
        $up.on('click', function(){
            handle.call(this, 'like');
        });
        $down.on('click', function(){
            handle.call(this, 'unlike');
        });
    }
    init();
}

Vote.TYPE_POST = 'post';
Vote.TYPE_COMMENT = 'comment';

module.exports = Vote;