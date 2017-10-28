'use strict';

import '../modules/common.js';
import AjaxTab from '../modules/ajaxtab.js';
import Util from '../modules/util.js';

//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#list-container',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    }
});
