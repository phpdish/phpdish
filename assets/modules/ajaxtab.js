'use strict';

import 'jquery-pjax';
import Util from '../modules/util.js';

class AjaxTab
{
    constructor($element, options){
        $.pjax.defaults.timeout = 50000;

        this.element = $element;
        this.container = $(options.container);
        this.element.pjax('li a', options.container);
        this.options = options;
        this.element.on('pjax:click', function(event) {
            const $target = $(event.target);
            const $selfTab = $target.parent();
            $selfTab.siblings().removeClass('active')
                .end().addClass('active');
        });

        this.loader = $(this.options.loader);

        //绑定事件
        $(document).on('pjax:beforeSend', (event, xhr, options) => {
            if (typeof this.options.before === 'function') {
                this.options.before.call(this, this.container, xhr);
            }
            this.loader.show();
        });

        $(document).on('pjax:success', (event, data, status, xhr, options) => {
            if (typeof this.options.complete === 'function') {
                this.options.complete.call(this, event, data, status, xhr, options);
            }
        });


        $(document).on('pjax:complete', (event, xhr, textStatus, options) => {
            if (typeof this.options.complete === 'function') {
                this.options.complete.call(this, event, xhr, textStatus, options);
            }
            this.loader.hide();
        });

        // Util.htmlPlaceholder(this.container);
    }
}

export default AjaxTab;