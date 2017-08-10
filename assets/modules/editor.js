'use strict';

import WangEditor from 'wangeditor';
import util from './util.js';
import Emotions from './emotion.js';

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
    const editor = new WangEditor(options.element);
    editor.customConfig.menus = options.toolbar;
    //配置上传
    editor.customConfig.uploadImgUrl = '/attachments/add?src=wangeditor';
    editor.customConfig.uploadParams = {
        token: util.getToken(),
        user: util.getAuthUser()
    };
    editor.customConfig.uploadImgFileName = 'upfile';
    //配置emotion
    editor.customConfig.emotions = {
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
        }
    };
    editor.create();

    this.getRawEditor = function(){
        console.log(editor, 70);
        return editor;
    };
}

export default Editor;
