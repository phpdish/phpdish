'use strict';

import '../modules/common.js';
import AjaxTab from '../modules/ajaxtab.js';
import Util from '../modules/util.js';
import {FollowUserIntialization} from '../modules/actions.js';

//AjaxTab
new AjaxTab($('[data-pjax-container]'), {
    container: '#list-container',
    loader: '#loader',
    before: (container) => {
        Util.htmlPlaceholder(container);
    },
    success: (container) => {
        new FollowUserIntialization(container);
    }
});
