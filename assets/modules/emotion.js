'use strict';

//提取umeditor中的表情数据
var group = {};
$('td[class^="edui-emotion"]').each(function(){
    var $this = $(this);
    var groupName = $this.attr('class').replace('edui-emotion-', '');
    var realurl = $this.data('realurl');
    if(typeof group[groupName] == 'undefined'){
        group[groupName] = [];
    }
    var name = $this.find('img').attr('title');
    group[groupName].push({
        value: name,
        icon: realurl
    });
});


//百度的表情包数据
var BAIDU_EMOTION = {
    "jd": [
        {
            "value": "Kiss",
            "icon": "http://img.baidu.com/hi/jx2/j_0001.gif"
        },
        {
            "value": "Love",
            "icon": "http://img.baidu.com/hi/jx2/j_0002.gif"
        },
        {
            "value": "Yeah",
            "icon": "http://img.baidu.com/hi/jx2/j_0003.gif"
        },
        {
            "value": "啊！",
            "icon": "http://img.baidu.com/hi/jx2/j_0004.gif"
        },
        {
            "value": "背扭",
            "icon": "http://img.baidu.com/hi/jx2/j_0005.gif"
        },
        {
            "value": "顶",
            "icon": "http://img.baidu.com/hi/jx2/j_0006.gif"
        },
        {
            "value": "抖胸",
            "icon": "http://img.baidu.com/hi/jx2/j_0007.gif"
        },
        {
            "value": "88",
            "icon": "http://img.baidu.com/hi/jx2/j_0008.gif"
        },
        {
            "value": "汗",
            "icon": "http://img.baidu.com/hi/jx2/j_0009.gif"
        },
        {
            "value": "瞌睡",
            "icon": "http://img.baidu.com/hi/jx2/j_0010.gif"
        },
        {
            "value": "鲁拉",
            "icon": "http://img.baidu.com/hi/jx2/j_0011.gif"
        },
        {
            "value": "拍砖",
            "icon": "http://img.baidu.com/hi/jx2/j_0012.gif"
        },
        {
            "value": "揉脸",
            "icon": "http://img.baidu.com/hi/jx2/j_0013.gif"
        },
        {
            "value": "生日快乐",
            "icon": "http://img.baidu.com/hi/jx2/j_0014.gif"
        },
        {
            "value": "大笑",
            "icon": "http://img.baidu.com/hi/jx2/j_0015.gif"
        },
        {
            "value": "瀑布汗~",
            "icon": "http://img.baidu.com/hi/jx2/j_0016.gif"
        },
        {
            "value": "惊讶",
            "icon": "http://img.baidu.com/hi/jx2/j_0017.gif"
        },
        {
            "value": "臭美",
            "icon": "http://img.baidu.com/hi/jx2/j_0018.gif"
        },
        {
            "value": "傻笑",
            "icon": "http://img.baidu.com/hi/jx2/j_0019.gif"
        },
        {
            "value": "抛媚眼",
            "icon": "http://img.baidu.com/hi/jx2/j_0020.gif"
        },
        {
            "value": "发怒",
            "icon": "http://img.baidu.com/hi/jx2/j_0021.gif"
        },
        {
            "value": "打酱油",
            "icon": "http://img.baidu.com/hi/jx2/j_0022.gif"
        },
        {
            "value": "俯卧撑",
            "icon": "http://img.baidu.com/hi/jx2/j_0023.gif"
        },
        {
            "value": "气愤",
            "icon": "http://img.baidu.com/hi/jx2/j_0024.gif"
        },
        {
            "value": "?",
            "icon": "http://img.baidu.com/hi/jx2/j_0025.gif"
        },
        {
            "value": "吻",
            "icon": "http://img.baidu.com/hi/jx2/j_0026.gif"
        },
        {
            "value": "怒",
            "icon": "http://img.baidu.com/hi/jx2/j_0027.gif"
        },
        {
            "value": "胜利",
            "icon": "http://img.baidu.com/hi/jx2/j_0028.gif"
        },
        {
            "value": "HI",
            "icon": "http://img.baidu.com/hi/jx2/j_0029.gif"
        },
        {
            "value": "KISS",
            "icon": "http://img.baidu.com/hi/jx2/j_0030.gif"
        },
        {
            "value": "不说",
            "icon": "http://img.baidu.com/hi/jx2/j_0031.gif"
        },
        {
            "value": "不要",
            "icon": "http://img.baidu.com/hi/jx2/j_0032.gif"
        },
        {
            "value": "扯花",
            "icon": "http://img.baidu.com/hi/jx2/j_0033.gif"
        },
        {
            "value": "大心",
            "icon": "http://img.baidu.com/hi/jx2/j_0034.gif"
        },
        {
            "value": "顶",
            "icon": "http://img.baidu.com/hi/jx2/j_0035.gif"
        },
        {
            "value": "大惊",
            "icon": "http://img.baidu.com/hi/jx2/j_0036.gif"
        },
        {
            "value": "飞吻",
            "icon": "http://img.baidu.com/hi/jx2/j_0037.gif"
        },
        {
            "value": "鬼脸",
            "icon": "http://img.baidu.com/hi/jx2/j_0038.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/jx2/j_0039.gif"
        },
        {
            "value": "口水",
            "icon": "http://img.baidu.com/hi/jx2/j_0040.gif"
        },
        {
            "value": "狂哭",
            "icon": "http://img.baidu.com/hi/jx2/j_0041.gif"
        },
        {
            "value": "来",
            "icon": "http://img.baidu.com/hi/jx2/j_0042.gif"
        },
        {
            "value": "发财了",
            "icon": "http://img.baidu.com/hi/jx2/j_0043.gif"
        },
        {
            "value": "吃西瓜",
            "icon": "http://img.baidu.com/hi/jx2/j_0044.gif"
        },
        {
            "value": "套牢",
            "icon": "http://img.baidu.com/hi/jx2/j_0045.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/jx2/j_0046.gif"
        },
        {
            "value": "庆祝",
            "icon": "http://img.baidu.com/hi/jx2/j_0047.gif"
        },
        {
            "value": "我来了",
            "icon": "http://img.baidu.com/hi/jx2/j_0048.gif"
        },
        {
            "value": "敲打",
            "icon": "http://img.baidu.com/hi/jx2/j_0049.gif"
        },
        {
            "value": "晕了",
            "icon": "http://img.baidu.com/hi/jx2/j_0050.gif"
        },
        {
            "value": "胜利",
            "icon": "http://img.baidu.com/hi/jx2/j_0051.gif"
        },
        {
            "value": "臭美",
            "icon": "http://img.baidu.com/hi/jx2/j_0052.gif"
        },
        {
            "value": "被打了",
            "icon": "http://img.baidu.com/hi/jx2/j_0053.gif"
        },
        {
            "value": "贪吃",
            "icon": "http://img.baidu.com/hi/jx2/j_0054.gif"
        },
        {
            "value": "迎接",
            "icon": "http://img.baidu.com/hi/jx2/j_0055.gif"
        },
        {
            "value": "酷",
            "icon": "http://img.baidu.com/hi/jx2/j_0056.gif"
        },
        {
            "value": "微笑",
            "icon": "http://img.baidu.com/hi/jx2/j_0057.gif"
        },
        {
            "value": "亲吻",
            "icon": "http://img.baidu.com/hi/jx2/j_0058.gif"
        },
        {
            "value": "调皮",
            "icon": "http://img.baidu.com/hi/jx2/j_0059.gif"
        },
        {
            "value": "惊恐",
            "icon": "http://img.baidu.com/hi/jx2/j_0060.gif"
        },
        {
            "value": "耍酷",
            "icon": "http://img.baidu.com/hi/jx2/j_0061.gif"
        },
        {
            "value": "发火",
            "icon": "http://img.baidu.com/hi/jx2/j_0062.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/jx2/j_0063.gif"
        },
        {
            "value": "汗水",
            "icon": "http://img.baidu.com/hi/jx2/j_0064.gif"
        },
        {
            "value": "大哭",
            "icon": "http://img.baidu.com/hi/jx2/j_0065.gif"
        },
        {
            "value": "",
            "icon": "http://img.baidu.com/hi/jx2/j_0066.gif"
        },
        {
            "value": "加油",
            "icon": "http://img.baidu.com/hi/jx2/j_0067.gif"
        },
        {
            "value": "困",
            "icon": "http://img.baidu.com/hi/jx2/j_0068.gif"
        },
        {
            "value": "你NB",
            "icon": "http://img.baidu.com/hi/jx2/j_0069.gif"
        },
        {
            "value": "晕倒",
            "icon": "http://img.baidu.com/hi/jx2/j_0070.gif"
        },
        {
            "value": "开心",
            "icon": "http://img.baidu.com/hi/jx2/j_0071.gif"
        },
        {
            "value": "偷笑",
            "icon": "http://img.baidu.com/hi/jx2/j_0072.gif"
        },
        {
            "value": "大哭",
            "icon": "http://img.baidu.com/hi/jx2/j_0073.gif"
        },
        {
            "value": "滴汗",
            "icon": "http://img.baidu.com/hi/jx2/j_0074.gif"
        },
        {
            "value": "叹气",
            "icon": "http://img.baidu.com/hi/jx2/j_0075.gif"
        },
        {
            "value": "超赞",
            "icon": "http://img.baidu.com/hi/jx2/j_0076.gif"
        },
        {
            "value": "??",
            "icon": "http://img.baidu.com/hi/jx2/j_0077.gif"
        },
        {
            "value": "飞吻",
            "icon": "http://img.baidu.com/hi/jx2/j_0078.gif"
        },
        {
            "value": "天使",
            "icon": "http://img.baidu.com/hi/jx2/j_0079.gif"
        },
        {
            "value": "撒花",
            "icon": "http://img.baidu.com/hi/jx2/j_0080.gif"
        },
        {
            "value": "生气",
            "icon": "http://img.baidu.com/hi/jx2/j_0081.gif"
        },
        {
            "value": "被砸",
            "icon": "http://img.baidu.com/hi/jx2/j_0082.gif"
        },
        {
            "value": "吓傻",
            "icon": "http://img.baidu.com/hi/jx2/j_0083.gif"
        },
        {
            "value": "随意吐",
            "icon": "http://img.baidu.com/hi/jx2/j_0084.gif"
        }
        ],
        "tsj": [
        {
            "value": "Kiss",
            "icon": "http://img.baidu.com/hi/tsj/t_0001.gif"
        },
        {
            "value": "Love",
            "icon": "http://img.baidu.com/hi/tsj/t_0002.gif"
        },
        {
            "value": "Yeah",
            "icon": "http://img.baidu.com/hi/tsj/t_0003.gif"
        },
        {
            "value": "啊！",
            "icon": "http://img.baidu.com/hi/tsj/t_0004.gif"
        },
        {
            "value": "背扭",
            "icon": "http://img.baidu.com/hi/tsj/t_0005.gif"
        },
        {
            "value": "顶",
            "icon": "http://img.baidu.com/hi/tsj/t_0006.gif"
        },
        {
            "value": "抖胸",
            "icon": "http://img.baidu.com/hi/tsj/t_0007.gif"
        },
        {
            "value": "88",
            "icon": "http://img.baidu.com/hi/tsj/t_0008.gif"
        },
        {
            "value": "汗",
            "icon": "http://img.baidu.com/hi/tsj/t_0009.gif"
        },
        {
            "value": "瞌睡",
            "icon": "http://img.baidu.com/hi/tsj/t_0010.gif"
        },
        {
            "value": "鲁拉",
            "icon": "http://img.baidu.com/hi/tsj/t_0011.gif"
        },
        {
            "value": "拍砖",
            "icon": "http://img.baidu.com/hi/tsj/t_0012.gif"
        },
        {
            "value": "揉脸",
            "icon": "http://img.baidu.com/hi/tsj/t_0013.gif"
        },
        {
            "value": "生日快乐",
            "icon": "http://img.baidu.com/hi/tsj/t_0014.gif"
        },
        {
            "value": "摊手",
            "icon": "http://img.baidu.com/hi/tsj/t_0015.gif"
        },
        {
            "value": "睡觉",
            "icon": "http://img.baidu.com/hi/tsj/t_0016.gif"
        },
        {
            "value": "瘫坐",
            "icon": "http://img.baidu.com/hi/tsj/t_0017.gif"
        },
        {
            "value": "无聊",
            "icon": "http://img.baidu.com/hi/tsj/t_0018.gif"
        },
        {
            "value": "星星闪",
            "icon": "http://img.baidu.com/hi/tsj/t_0019.gif"
        },
        {
            "value": "旋转",
            "icon": "http://img.baidu.com/hi/tsj/t_0020.gif"
        },
        {
            "value": "也不行",
            "icon": "http://img.baidu.com/hi/tsj/t_0021.gif"
        },
        {
            "value": "郁闷",
            "icon": "http://img.baidu.com/hi/tsj/t_0022.gif"
        },
        {
            "value": "正Music",
            "icon": "http://img.baidu.com/hi/tsj/t_0023.gif"
        },
        {
            "value": "抓墙",
            "icon": "http://img.baidu.com/hi/tsj/t_0024.gif"
        },
        {
            "value": "撞墙至死",
            "icon": "http://img.baidu.com/hi/tsj/t_0025.gif"
        },
        {
            "value": "歪头",
            "icon": "http://img.baidu.com/hi/tsj/t_0026.gif"
        },
        {
            "value": "戳眼",
            "icon": "http://img.baidu.com/hi/tsj/t_0027.gif"
        },
        {
            "value": "飘过",
            "icon": "http://img.baidu.com/hi/tsj/t_0028.gif"
        },
        {
            "value": "互相拍砖",
            "icon": "http://img.baidu.com/hi/tsj/t_0029.gif"
        },
        {
            "value": "砍死你",
            "icon": "http://img.baidu.com/hi/tsj/t_0030.gif"
        },
        {
            "value": "扔桌子",
            "icon": "http://img.baidu.com/hi/tsj/t_0031.gif"
        },
        {
            "value": "少林寺",
            "icon": "http://img.baidu.com/hi/tsj/t_0032.gif"
        },
        {
            "value": "什么？",
            "icon": "http://img.baidu.com/hi/tsj/t_0033.gif"
        },
        {
            "value": "转头",
            "icon": "http://img.baidu.com/hi/tsj/t_0034.gif"
        },
        {
            "value": "我爱牛奶",
            "icon": "http://img.baidu.com/hi/tsj/t_0035.gif"
        },
        {
            "value": "我踢",
            "icon": "http://img.baidu.com/hi/tsj/t_0036.gif"
        },
        {
            "value": "摇晃",
            "icon": "http://img.baidu.com/hi/tsj/t_0037.gif"
        },
        {
            "value": "晕厥",
            "icon": "http://img.baidu.com/hi/tsj/t_0038.gif"
        },
        {
            "value": "在笼子里",
            "icon": "http://img.baidu.com/hi/tsj/t_0039.gif"
        },
        {
            "value": "震荡",
            "icon": "http://img.baidu.com/hi/tsj/t_0040.gif"
        }
        ],
        "ldw": [
        {
            "value": "大笑",
            "icon": "http://img.baidu.com/hi/ldw/w_0001.gif"
        },
        {
            "value": "瀑布汗~",
            "icon": "http://img.baidu.com/hi/ldw/w_0002.gif"
        },
        {
            "value": "惊讶",
            "icon": "http://img.baidu.com/hi/ldw/w_0003.gif"
        },
        {
            "value": "臭美",
            "icon": "http://img.baidu.com/hi/ldw/w_0004.gif"
        },
        {
            "value": "傻笑",
            "icon": "http://img.baidu.com/hi/ldw/w_0005.gif"
        },
        {
            "value": "抛媚眼",
            "icon": "http://img.baidu.com/hi/ldw/w_0006.gif"
        },
        {
            "value": "发怒",
            "icon": "http://img.baidu.com/hi/ldw/w_0007.gif"
        },
        {
            "value": "我错了",
            "icon": "http://img.baidu.com/hi/ldw/w_0008.gif"
        },
        {
            "value": "money",
            "icon": "http://img.baidu.com/hi/ldw/w_0009.gif"
        },
        {
            "value": "气愤",
            "icon": "http://img.baidu.com/hi/ldw/w_0010.gif"
        },
        {
            "value": "挑逗",
            "icon": "http://img.baidu.com/hi/ldw/w_0011.gif"
        },
        {
            "value": "吻",
            "icon": "http://img.baidu.com/hi/ldw/w_0012.gif"
        },
        {
            "value": "怒",
            "icon": "http://img.baidu.com/hi/ldw/w_0013.gif"
        },
        {
            "value": "胜利",
            "icon": "http://img.baidu.com/hi/ldw/w_0014.gif"
        },
        {
            "value": "委屈",
            "icon": "http://img.baidu.com/hi/ldw/w_0015.gif"
        },
        {
            "value": "受伤",
            "icon": "http://img.baidu.com/hi/ldw/w_0016.gif"
        },
        {
            "value": "说啥呢？",
            "icon": "http://img.baidu.com/hi/ldw/w_0017.gif"
        },
        {
            "value": "闭嘴",
            "icon": "http://img.baidu.com/hi/ldw/w_0018.gif"
        },
        {
            "value": "不",
            "icon": "http://img.baidu.com/hi/ldw/w_0019.gif"
        },
        {
            "value": "逗你玩儿",
            "icon": "http://img.baidu.com/hi/ldw/w_0020.gif"
        },
        {
            "value": "飞吻",
            "icon": "http://img.baidu.com/hi/ldw/w_0021.gif"
        },
        {
            "value": "眩晕",
            "icon": "http://img.baidu.com/hi/ldw/w_0022.gif"
        },
        {
            "value": "魔法",
            "icon": "http://img.baidu.com/hi/ldw/w_0023.gif"
        },
        {
            "value": "我来了",
            "icon": "http://img.baidu.com/hi/ldw/w_0024.gif"
        },
        {
            "value": "睡了",
            "icon": "http://img.baidu.com/hi/ldw/w_0025.gif"
        },
        {
            "value": "我打",
            "icon": "http://img.baidu.com/hi/ldw/w_0026.gif"
        },
        {
            "value": "闭嘴",
            "icon": "http://img.baidu.com/hi/ldw/w_0027.gif"
        },
        {
            "value": "打",
            "icon": "http://img.baidu.com/hi/ldw/w_0028.gif"
        },
        {
            "value": "打晕了",
            "icon": "http://img.baidu.com/hi/ldw/w_0029.gif"
        },
        {
            "value": "刷牙",
            "icon": "http://img.baidu.com/hi/ldw/w_0030.gif"
        },
        {
            "value": "爆揍",
            "icon": "http://img.baidu.com/hi/ldw/w_0031.gif"
        },
        {
            "value": "炸弹",
            "icon": "http://img.baidu.com/hi/ldw/w_0032.gif"
        },
        {
            "value": "倒立",
            "icon": "http://img.baidu.com/hi/ldw/w_0033.gif"
        },
        {
            "value": "刮胡子",
            "icon": "http://img.baidu.com/hi/ldw/w_0034.gif"
        },
        {
            "value": "邪恶的笑",
            "icon": "http://img.baidu.com/hi/ldw/w_0035.gif"
        },
        {
            "value": "不要不要",
            "icon": "http://img.baidu.com/hi/ldw/w_0036.gif"
        },
        {
            "value": "爱恋中",
            "icon": "http://img.baidu.com/hi/ldw/w_0037.gif"
        },
        {
            "value": "放大仔细看",
            "icon": "http://img.baidu.com/hi/ldw/w_0038.gif"
        },
        {
            "value": "偷窥",
            "icon": "http://img.baidu.com/hi/ldw/w_0039.gif"
        },
        {
            "value": "超高兴",
            "icon": "http://img.baidu.com/hi/ldw/w_0040.gif"
        },
        {
            "value": "晕",
            "icon": "http://img.baidu.com/hi/ldw/w_0041.gif"
        },
        {
            "value": "松口气",
            "icon": "http://img.baidu.com/hi/ldw/w_0042.gif"
        },
        {
            "value": "我跑",
            "icon": "http://img.baidu.com/hi/ldw/w_0043.gif"
        },
        {
            "value": "享受",
            "icon": "http://img.baidu.com/hi/ldw/w_0044.gif"
        },
        {
            "value": "修养",
            "icon": "http://img.baidu.com/hi/ldw/w_0045.gif"
        },
        {
            "value": "哭",
            "icon": "http://img.baidu.com/hi/ldw/w_0046.gif"
        },
        {
            "value": "汗",
            "icon": "http://img.baidu.com/hi/ldw/w_0047.gif"
        },
        {
            "value": "啊~",
            "icon": "http://img.baidu.com/hi/ldw/w_0048.gif"
        },
        {
            "value": "热烈欢迎",
            "icon": "http://img.baidu.com/hi/ldw/w_0049.gif"
        },
        {
            "value": "打酱油",
            "icon": "http://img.baidu.com/hi/ldw/w_0050.gif"
        },
        {
            "value": "俯卧撑",
            "icon": "http://img.baidu.com/hi/ldw/w_0051.gif"
        },
        {
            "value": "?",
            "icon": "http://img.baidu.com/hi/ldw/w_0052.gif"
        }
        ],
        "bb": [
        {
            "value": "HI",
            "icon": "http://img.baidu.com/hi/bobo/B_0001.gif"
        },
        {
            "value": "KISS",
            "icon": "http://img.baidu.com/hi/bobo/B_0002.gif"
        },
        {
            "value": "不说",
            "icon": "http://img.baidu.com/hi/bobo/B_0003.gif"
        },
        {
            "value": "不要",
            "icon": "http://img.baidu.com/hi/bobo/B_0004.gif"
        },
        {
            "value": "扯花",
            "icon": "http://img.baidu.com/hi/bobo/B_0005.gif"
        },
        {
            "value": "大心",
            "icon": "http://img.baidu.com/hi/bobo/B_0006.gif"
        },
        {
            "value": "顶",
            "icon": "http://img.baidu.com/hi/bobo/B_0007.gif"
        },
        {
            "value": "大惊",
            "icon": "http://img.baidu.com/hi/bobo/B_0008.gif"
        },
        {
            "value": "飞吻",
            "icon": "http://img.baidu.com/hi/bobo/B_0009.gif"
        },
        {
            "value": "鬼脸",
            "icon": "http://img.baidu.com/hi/bobo/B_0010.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/bobo/B_0011.gif"
        },
        {
            "value": "口水",
            "icon": "http://img.baidu.com/hi/bobo/B_0012.gif"
        },
        {
            "value": "狂哭",
            "icon": "http://img.baidu.com/hi/bobo/B_0013.gif"
        },
        {
            "value": "来",
            "icon": "http://img.baidu.com/hi/bobo/B_0014.gif"
        },
        {
            "value": "泪眼",
            "icon": "http://img.baidu.com/hi/bobo/B_0015.gif"
        },
        {
            "value": "流泪",
            "icon": "http://img.baidu.com/hi/bobo/B_0016.gif"
        },
        {
            "value": "生气",
            "icon": "http://img.baidu.com/hi/bobo/B_0017.gif"
        },
        {
            "value": "吐舌",
            "icon": "http://img.baidu.com/hi/bobo/B_0018.gif"
        },
        {
            "value": "喜欢",
            "icon": "http://img.baidu.com/hi/bobo/B_0019.gif"
        },
        {
            "value": "旋转",
            "icon": "http://img.baidu.com/hi/bobo/B_0020.gif"
        },
        {
            "value": "再见",
            "icon": "http://img.baidu.com/hi/bobo/B_0021.gif"
        },
        {
            "value": "抓狂",
            "icon": "http://img.baidu.com/hi/bobo/B_0022.gif"
        },
        {
            "value": "汗",
            "icon": "http://img.baidu.com/hi/bobo/B_0023.gif"
        },
        {
            "value": "鄙视",
            "icon": "http://img.baidu.com/hi/bobo/B_0024.gif"
        },
        {
            "value": "拜",
            "icon": "http://img.baidu.com/hi/bobo/B_0025.gif"
        },
        {
            "value": "吐血",
            "icon": "http://img.baidu.com/hi/bobo/B_0026.gif"
        },
        {
            "value": "嘘",
            "icon": "http://img.baidu.com/hi/bobo/B_0027.gif"
        },
        {
            "value": "打人",
            "icon": "http://img.baidu.com/hi/bobo/B_0028.gif"
        },
        {
            "value": "蹦跳",
            "icon": "http://img.baidu.com/hi/bobo/B_0029.gif"
        },
        {
            "value": "变脸",
            "icon": "http://img.baidu.com/hi/bobo/B_0030.gif"
        },
        {
            "value": "扯肉",
            "icon": "http://img.baidu.com/hi/bobo/B_0031.gif"
        },
        {
            "value": "吃To",
            "icon": "http://img.baidu.com/hi/bobo/B_0032.gif"
        },
        {
            "value": "吃花",
            "icon": "http://img.baidu.com/hi/bobo/B_0033.gif"
        },
        {
            "value": "吹泡泡糖",
            "icon": "http://img.baidu.com/hi/bobo/B_0034.gif"
        },
        {
            "value": "大变身",
            "icon": "http://img.baidu.com/hi/bobo/B_0035.gif"
        },
        {
            "value": "飞天舞",
            "icon": "http://img.baidu.com/hi/bobo/B_0036.gif"
        },
        {
            "value": "回眸",
            "icon": "http://img.baidu.com/hi/bobo/B_0037.gif"
        },
        {
            "value": "可怜",
            "icon": "http://img.baidu.com/hi/bobo/B_0038.gif"
        },
        {
            "value": "猛抽",
            "icon": "http://img.baidu.com/hi/bobo/B_0039.gif"
        },
        {
            "value": "泡泡",
            "icon": "http://img.baidu.com/hi/bobo/B_0040.gif"
        },
        {
            "value": "苹果",
            "icon": "http://img.baidu.com/hi/bobo/B_0041.gif"
        },
        {
            "value": "亲",
            "icon": "http://img.baidu.com/hi/bobo/B_0042.gif"
        },
        {
            "value": "",
            "icon": "http://img.baidu.com/hi/bobo/B_0043.gif"
        },
        {
            "value": "骚舞",
            "icon": "http://img.baidu.com/hi/bobo/B_0044.gif"
        },
        {
            "value": "烧香",
            "icon": "http://img.baidu.com/hi/bobo/B_0045.gif"
        },
        {
            "value": "睡",
            "icon": "http://img.baidu.com/hi/bobo/B_0046.gif"
        },
        {
            "value": "套娃娃",
            "icon": "http://img.baidu.com/hi/bobo/B_0047.gif"
        },
        {
            "value": "捅捅",
            "icon": "http://img.baidu.com/hi/bobo/B_0048.gif"
        },
        {
            "value": "舞倒",
            "icon": "http://img.baidu.com/hi/bobo/B_0049.gif"
        },
        {
            "value": "西红柿",
            "icon": "http://img.baidu.com/hi/bobo/B_0050.gif"
        },
        {
            "value": "爱慕",
            "icon": "http://img.baidu.com/hi/bobo/B_0051.gif"
        },
        {
            "value": "摇",
            "icon": "http://img.baidu.com/hi/bobo/B_0052.gif"
        },
        {
            "value": "摇摆",
            "icon": "http://img.baidu.com/hi/bobo/B_0053.gif"
        },
        {
            "value": "杂耍",
            "icon": "http://img.baidu.com/hi/bobo/B_0054.gif"
        },
        {
            "value": "招财",
            "icon": "http://img.baidu.com/hi/bobo/B_0055.gif"
        },
        {
            "value": "被殴",
            "icon": "http://img.baidu.com/hi/bobo/B_0056.gif"
        },
        {
            "value": "被球闷",
            "icon": "http://img.baidu.com/hi/bobo/B_0057.gif"
        },
        {
            "value": "大惊",
            "icon": "http://img.baidu.com/hi/bobo/B_0058.gif"
        },
        {
            "value": "理想",
            "icon": "http://img.baidu.com/hi/bobo/B_0059.gif"
        },
        {
            "value": "欧打",
            "icon": "http://img.baidu.com/hi/bobo/B_0060.gif"
        },
        {
            "value": "呕吐",
            "icon": "http://img.baidu.com/hi/bobo/B_0061.gif"
        },
        {
            "value": "碎",
            "icon": "http://img.baidu.com/hi/bobo/B_0062.gif"
        },
        {
            "value": "吐痰",
            "icon": "http://img.baidu.com/hi/bobo/B_0063.gif"
        }
        ],
        "cat": [
        {
            "value": "发财了",
            "icon": "http://img.baidu.com/hi/babycat/C_0001.gif"
        },
        {
            "value": "吃西瓜",
            "icon": "http://img.baidu.com/hi/babycat/C_0002.gif"
        },
        {
            "value": "套牢",
            "icon": "http://img.baidu.com/hi/babycat/C_0003.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/babycat/C_0004.gif"
        },
        {
            "value": "庆祝",
            "icon": "http://img.baidu.com/hi/babycat/C_0005.gif"
        },
        {
            "value": "我来了",
            "icon": "http://img.baidu.com/hi/babycat/C_0006.gif"
        },
        {
            "value": "敲打",
            "icon": "http://img.baidu.com/hi/babycat/C_0007.gif"
        },
        {
            "value": "晕了",
            "icon": "http://img.baidu.com/hi/babycat/C_0008.gif"
        },
        {
            "value": "胜利",
            "icon": "http://img.baidu.com/hi/babycat/C_0009.gif"
        },
        {
            "value": "臭美",
            "icon": "http://img.baidu.com/hi/babycat/C_0010.gif"
        },
        {
            "value": "被打了",
            "icon": "http://img.baidu.com/hi/babycat/C_0011.gif"
        },
        {
            "value": "贪吃",
            "icon": "http://img.baidu.com/hi/babycat/C_0012.gif"
        },
        {
            "value": "迎接",
            "icon": "http://img.baidu.com/hi/babycat/C_0013.gif"
        },
        {
            "value": "酷",
            "icon": "http://img.baidu.com/hi/babycat/C_0014.gif"
        },
        {
            "value": "顶",
            "icon": "http://img.baidu.com/hi/babycat/C_0015.gif"
        },
        {
            "value": "幸运",
            "icon": "http://img.baidu.com/hi/babycat/C_0016.gif"
        },
        {
            "value": "爱心",
            "icon": "http://img.baidu.com/hi/babycat/C_0017.gif"
        },
        {
            "value": "躲",
            "icon": "http://img.baidu.com/hi/babycat/C_0018.gif"
        },
        {
            "value": "送花",
            "icon": "http://img.baidu.com/hi/babycat/C_0019.gif"
        },
        {
            "value": "选择",
            "icon": "http://img.baidu.com/hi/babycat/C_0020.gif"
        }
        ],
        "pp": [
        {
            "value": "微笑",
            "icon": "http://img.baidu.com/hi/face/i_f01.gif"
        },
        {
            "value": "亲吻",
            "icon": "http://img.baidu.com/hi/face/i_f02.gif"
        },
        {
            "value": "调皮",
            "icon": "http://img.baidu.com/hi/face/i_f03.gif"
        },
        {
            "value": "惊讶",
            "icon": "http://img.baidu.com/hi/face/i_f04.gif"
        },
        {
            "value": "耍酷",
            "icon": "http://img.baidu.com/hi/face/i_f05.gif"
        },
        {
            "value": "发火",
            "icon": "http://img.baidu.com/hi/face/i_f06.gif"
        },
        {
            "value": "害羞",
            "icon": "http://img.baidu.com/hi/face/i_f07.gif"
        },
        {
            "value": "汗水",
            "icon": "http://img.baidu.com/hi/face/i_f08.gif"
        },
        {
            "value": "大哭",
            "icon": "http://img.baidu.com/hi/face/i_f09.gif"
        },
        {
            "value": "得意",
            "icon": "http://img.baidu.com/hi/face/i_f10.gif"
        },
        {
            "value": "鄙视",
            "icon": "http://img.baidu.com/hi/face/i_f11.gif"
        },
        {
            "value": "困",
            "icon": "http://img.baidu.com/hi/face/i_f12.gif"
        },
        {
            "value": "夸奖",
            "icon": "http://img.baidu.com/hi/face/i_f13.gif"
        },
        {
            "value": "晕倒",
            "icon": "http://img.baidu.com/hi/face/i_f14.gif"
        },
        {
            "value": "疑问",
            "icon": "http://img.baidu.com/hi/face/i_f15.gif"
        },
        {
            "value": "媒婆",
            "icon": "http://img.baidu.com/hi/face/i_f16.gif"
        },
        {
            "value": "狂吐",
            "icon": "http://img.baidu.com/hi/face/i_f17.gif"
        },
        {
            "value": "青蛙",
            "icon": "http://img.baidu.com/hi/face/i_f18.gif"
        },
        {
            "value": "发愁",
            "icon": "http://img.baidu.com/hi/face/i_f19.gif"
        },
        {
            "value": "亲吻",
            "icon": "http://img.baidu.com/hi/face/i_f20.gif"
        },
        {
            "value": "",
            "icon": "http://img.baidu.com/hi/face/i_f21.gif"
        },
        {
            "value": "爱心",
            "icon": "http://img.baidu.com/hi/face/i_f22.gif"
        },
        {
            "value": "心碎",
            "icon": "http://img.baidu.com/hi/face/i_f23.gif"
        },
        {
            "value": "玫瑰",
            "icon": "http://img.baidu.com/hi/face/i_f24.gif"
        },
        {
            "value": "礼物",
            "icon": "http://img.baidu.com/hi/face/i_f25.gif"
        },
        {
            "value": "哭",
            "icon": "http://img.baidu.com/hi/face/i_f26.gif"
        },
        {
            "value": "奸笑",
            "icon": "http://img.baidu.com/hi/face/i_f27.gif"
        },
        {
            "value": "可爱",
            "icon": "http://img.baidu.com/hi/face/i_f28.gif"
        },
        {
            "value": "得意",
            "icon": "http://img.baidu.com/hi/face/i_f29.gif"
        },
        {
            "value": "呲牙",
            "icon": "http://img.baidu.com/hi/face/i_f30.gif"
        },
        {
            "value": "暴汗",
            "icon": "http://img.baidu.com/hi/face/i_f31.gif"
        },
        {
            "value": "楚楚可怜",
            "icon": "http://img.baidu.com/hi/face/i_f32.gif"
        },
        {
            "value": "困",
            "icon": "http://img.baidu.com/hi/face/i_f33.gif"
        },
        {
            "value": "哭",
            "icon": "http://img.baidu.com/hi/face/i_f34.gif"
        },
        {
            "value": "生气",
            "icon": "http://img.baidu.com/hi/face/i_f35.gif"
        },
        {
            "value": "惊讶",
            "icon": "http://img.baidu.com/hi/face/i_f36.gif"
        },
        {
            "value": "口水",
            "icon": "http://img.baidu.com/hi/face/i_f37.gif"
        },
        {
            "value": "彩虹",
            "icon": "http://img.baidu.com/hi/face/i_f38.gif"
        },
        {
            "value": "夜空",
            "icon": "http://img.baidu.com/hi/face/i_f39.gif"
        },
        {
            "value": "太阳",
            "icon": "http://img.baidu.com/hi/face/i_f40.gif"
        },
        {
            "value": "钱钱",
            "icon": "http://img.baidu.com/hi/face/i_f41.gif"
        },
        {
            "value": "灯泡",
            "icon": "http://img.baidu.com/hi/face/i_f42.gif"
        },
        {
            "value": "咖啡",
            "icon": "http://img.baidu.com/hi/face/i_f43.gif"
        },
        {
            "value": "蛋糕",
            "icon": "http://img.baidu.com/hi/face/i_f44.gif"
        },
        {
            "value": "音乐",
            "icon": "http://img.baidu.com/hi/face/i_f45.gif"
        },
        {
            "value": "爱",
            "icon": "http://img.baidu.com/hi/face/i_f46.gif"
        },
        {
            "value": "胜利",
            "icon": "http://img.baidu.com/hi/face/i_f47.gif"
        },
        {
            "value": "赞",
            "icon": "http://img.baidu.com/hi/face/i_f48.gif"
        },
        {
            "value": "鄙视",
            "icon": "http://img.baidu.com/hi/face/i_f49.gif"
        },
        {
            "value": "OK",
            "icon": "http://img.baidu.com/hi/face/i_f50.gif"
        }
        ],
        "youa": [
        {
            "value": "男兜",
            "icon": "http://img.baidu.com/hi/youa/y_0001.gif"
        },
        {
            "value": "女兜",
            "icon": "http://img.baidu.com/hi/youa/y_0002.gif"
        },
        {
            "value": "开心",
            "icon": "http://img.baidu.com/hi/youa/y_0003.gif"
        },
        {
            "value": "乖乖",
            "icon": "http://img.baidu.com/hi/youa/y_0004.gif"
        },
        {
            "value": "偷笑",
            "icon": "http://img.baidu.com/hi/youa/y_0005.gif"
        },
        {
            "value": "大笑",
            "icon": "http://img.baidu.com/hi/youa/y_0006.gif"
        },
        {
            "value": "抽泣",
            "icon": "http://img.baidu.com/hi/youa/y_0007.gif"
        },
        {
            "value": "大哭",
            "icon": "http://img.baidu.com/hi/youa/y_0008.gif"
        },
        {
            "value": "无奈",
            "icon": "http://img.baidu.com/hi/youa/y_0009.gif"
        },
        {
            "value": "滴汗",
            "icon": "http://img.baidu.com/hi/youa/y_0010.gif"
        },
        {
            "value": "叹气",
            "icon": "http://img.baidu.com/hi/youa/y_0011.gif"
        },
        {
            "value": "狂晕",
            "icon": "http://img.baidu.com/hi/youa/y_0012.gif"
        },
        {
            "value": "委屈",
            "icon": "http://img.baidu.com/hi/youa/y_0013.gif"
        },
        {
            "value": "超赞",
            "icon": "http://img.baidu.com/hi/youa/y_0014.gif"
        },
        {
            "value": "??",
            "icon": "http://img.baidu.com/hi/youa/y_0015.gif"
        },
        {
            "value": "疑问",
            "icon": "http://img.baidu.com/hi/youa/y_0016.gif"
        },
        {
            "value": "飞吻",
            "icon": "http://img.baidu.com/hi/youa/y_0017.gif"
        },
        {
            "value": "天使",
            "icon": "http://img.baidu.com/hi/youa/y_0018.gif"
        },
        {
            "value": "撒花",
            "icon": "http://img.baidu.com/hi/youa/y_0019.gif"
        },
        {
            "value": "生气",
            "icon": "http://img.baidu.com/hi/youa/y_0020.gif"
        },
        {
            "value": "被砸",
            "icon": "http://img.baidu.com/hi/youa/y_0021.gif"
        },
        {
            "value": "口水",
            "icon": "http://img.baidu.com/hi/youa/y_0022.gif"
        },
        {
            "value": "泪奔",
            "icon": "http://img.baidu.com/hi/youa/y_0023.gif"
        },
        {
            "value": "吓傻",
            "icon": "http://img.baidu.com/hi/youa/y_0024.gif"
        },
        {
            "value": "吐舌头",
            "icon": "http://img.baidu.com/hi/youa/y_0025.gif"
        },
        {
            "value": "点头",
            "icon": "http://img.baidu.com/hi/youa/y_0026.gif"
        },
        {
            "value": "随意吐",
            "icon": "http://img.baidu.com/hi/youa/y_0027.gif"
        },
        {
            "value": "旋转",
            "icon": "http://img.baidu.com/hi/youa/y_0028.gif"
        },
        {
            "value": "困困",
            "icon": "http://img.baidu.com/hi/youa/y_0029.gif"
        },
        {
            "value": "鄙视",
            "icon": "http://img.baidu.com/hi/youa/y_0030.gif"
        },
        {
            "value": "狂顶",
            "icon": "http://img.baidu.com/hi/youa/y_0031.gif"
        },
        {
            "value": "篮球",
            "icon": "http://img.baidu.com/hi/youa/y_0032.gif"
        },
        {
            "value": "再见",
            "icon": "http://img.baidu.com/hi/youa/y_0033.gif"
        },
        {
            "value": "欢迎光临",
            "icon": "http://img.baidu.com/hi/youa/y_0034.gif"
        },
        {
            "value": "恭喜发财",
            "icon": "http://img.baidu.com/hi/youa/y_0035.gif"
        },
        {
            "value": "稍等",
            "icon": "http://img.baidu.com/hi/youa/y_0036.gif"
        },
        {
            "value": "我在线",
            "icon": "http://img.baidu.com/hi/youa/y_0037.gif"
        },
        {
            "value": "恕不议价",
            "icon": "http://img.baidu.com/hi/youa/y_0038.gif"
        },
        {
            "value": "库房有货",
            "icon": "http://img.baidu.com/hi/youa/y_0039.gif"
        },
        {
            "value": "货在路上",
            "icon": "http://img.baidu.com/hi/youa/y_0040.gif"
        }
    ]
};
//优酷的表情
var YOUKU_EMOTION = {
    default: [
        {
            "value": "赞",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Yo17_b004bfd.gif",
        },
        {
            "value": "稀饭",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo7_7763f6e.gif",
        },
        {
            "value": "愤怒",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo4_502d0ea.gif",
        },
        {
            "value": "吐",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo14_96290a9.gif",
        },
        {
            "value": "无语",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo5_3759641.gif",
        },
        {
            "value": "难过",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Yo2_e99eaf1.gif",
        },
        {
            "value": "汗",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo11_26573f1.gif",
        },
        {
            "value": "搞笑",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Qoo12_befe041.gif",
        },
        {
            "value": "牛",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Zoo7_b50c0f1.gif",
        },
        {
            "value": "强",
            "icon": "http://css.ykimg.com/youku/dist/img/comment/smiley/Zoo8_92b3fdf.gif",
        }
    ]
};
const Emotions = {
    /**
     * 表情数据
     */
    emotions: {},

    /**
     * 追加表情数据
     * @param vendor
     * @param data
     */
    append: function(vendor, data){
        this.emotions[vendor] = data;
    },

    /**
     * 获取emotion数据
     * @param name
     * @returns {}
     */
    getEmotion: function(name){
        var splits = name.split('.');
        if(splits.length == 2){
            return this.emotions[splits[0]][splits[1]];
        }else if(splits.length == 1){
            return this.emotions[splits[0]];
        }
    }
};
//写入表情数据
Emotions.append('baidu', BAIDU_EMOTION);
Emotions.append('youku', YOUKU_EMOTION);

export default Emotions;