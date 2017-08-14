'use strict';

const GithubEmojiPlugin = function() {
    $.ajax({
        'url': 'https://api.github.com/emojis',
        'dataType': 'jsonp'
    }).then( response => {
        const emojis = response.data;
        this.textComplete.register([
            {
                id: 'emoji',
                match: /(^|\s)[:：]([a-z0-9+\-\_]*)$/,
                search: function (term, callback) {
                    callback(Object.keys(emojis).filter(function (name) {
                        return name.startsWith(term);
                    }));
                },
                template: function (name) {
                    return `<img src="${emojis[name]}"/> ${name}`;
                },
                replace: function (name) {
                    return `$1:${name}: `;
                }
            }
        ]);
    });
};

export default GithubEmojiPlugin;