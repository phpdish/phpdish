'use strict';

const emojis = require('emojilib/emojis.json');
import twemoji from 'twemoji';
import _ from 'lodash';

const emoji = function() {

    _.each(emojis, (emoji, name) => {
        emoji.keywords.unshift(name);
    });

    this.textComplete.register([
        {
            id: 'emoji',
            match: /(^|\s)[:：]([a-z0-9+\-\_]*)$/,
            search: function (term, callback) {
                console.log(term);
                const emojiNames = [];
                 _.forEach(emojis, (emoji, name)=> {
                    if (emoji.keywords.join(' ').toLowerCase().indexOf(term.toLowerCase()) > -1) {
                        emojiNames.push(name);
                    }
                });
                callback(emojiNames);
            },
            template: function (name) {
                return twemoji.parse(emojis[name].char) + ' ' + name;
            },
            replace: function (name) {
                return `$1:${name}: `;
            }
        }
    ]);
};

export default emoji;