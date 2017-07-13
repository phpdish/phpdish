var wangEditor =  require('wangeditor');
// require('wangeditor/dist/css/wangEditor.min.css');
var util  = require('./util.js');
var Emotions = require('./emotion.js');

/**
 * 转换表情数据
 * @param emotions
 * @returns {Array}
 */
function convertEmotions(emotions) {
    return _.map(emotions, function(emotion){
        emotion.value = '[' + emotion.value + ']';
        return emotion;
    });
}

function Editor($element, options)
{
    options = _.merge({
        toolbar: [
            'link',
            'unlink',
            'eraser',
            'quote',
            '|',
            'emotion',
            'img',
            'video',
            'location',
            '|',
            'insertcode',
        ],
        element: $element,
        upload: true
    }, options);

    //公共配置
    wangEditor.config.printLog = false;
    var editor = new wangEditor(options.element);
    editor.config.menus = options.toolbar;
    //配置上传
    editor.config.uploadImgUrl = '/attachments/add?src=wangeditor';
    editor.config.uploadParams = {
        token: util.getToken(),
        user: util.getAuthUser()
    };
    editor.config.uploadImgFileName = 'upfile';
    //配置emotion
    editor.config.emotions = {
        baiduPaoPao: {
            title: "泡泡",
            data: convertEmotions(Emotions.getEmotion('baidu.pp'))
        },
        baiduTuzik: {
            title: "兔斯基",
            data: convertEmotions(Emotions.getEmotion('baidu.tsj'))
        },
        youkuDefault: {
            title: "优酷",
            data: convertEmotions(Emotions.getEmotion('youku.default'))
        },
    };
    editor.create();
    return editor;
}

module.exports = Editor;
