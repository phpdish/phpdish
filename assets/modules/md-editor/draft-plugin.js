'use strict';

import $ from 'jquery';
import store from 'store';

export default function(options){
    options = $.extend({
        key: '_draft',
        titleElement: null
    }, options);

    //还原draft
    const draft = store.get(options.key) || {};
    if (draft) {
        this.setContent(draft.body);
    }
    this.on('change', () => {
        const markdown = this.getContent();
        //设置draft
        store.set(options.key, {
            title: options.titleElement.val(),
            body: markdown
        });
    });
}