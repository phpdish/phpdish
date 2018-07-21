<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\PointHistory as BasePointHistory;

class PointHistory extends BasePointHistory
{
    const TYPE_SIGN_IN = 'sign_in';

    const TYPE_CHECK_IN = 'check_in';

    const TYPE_POST_ARTICLE = 'post_article';

    const TYPE_POST_TOPIC = 'post_topic';

    const TYPE_REMOVE_TOPIC = 'remove_topic';
    const TYPE_REMOVE_POST = 'remove_post';
    /**
     * 话题被回复
     *
     * @var string
     */
    const TYPE_TOPIC_REPLY = 'topic_reply';

    const TYPE_POST_TOPIC_REPLY = 'post_topic_reply';

    const TYPE_TOPIC_VOTED = 'topic_voted';

    const TYPE_REPLY_VOTED = 'reply_voted';

    const TYPE_AWARD = 'award';
}