'use strict';

module.exports = {
    /**
     * 创建post
     * @param url
     * @param parameters
     */
    createPostRequest: function (url, parameters){
        var $form = $('<form>');
        $form.attr({
            action: url,
            method: 'post'
        });
        _.forEach(parameters, function(parameter, key){
            if(_.isArray(parameter)){
                _.forEach(parameter, function(_value){
                    var $textarea = $('<textarea>');
                    $textarea.attr('name', key + '[]');
                    $textarea.val(_value);
                    $form.append($textarea);
                });
            }else{
                var $textarea = $('<textarea>');
                $textarea.attr('name', key);
                $textarea.val(parameter);
                $form.append($textarea);
            }
        });
        $form.submit();
    }
};