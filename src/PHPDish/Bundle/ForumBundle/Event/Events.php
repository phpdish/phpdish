<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Event;

final class Events
{
    /**
     * 话题被回复时触发.
     *
     * @var string
     */
    const TOPIC_REPLIED = 'topic.replied';

    /**
     * 话题创建之后触发.
     *
     * @var string
     */
    const TOPIC_CREATED = 'topic.created';

    /**
     * 回复中提及用户.
     *
     * @var string
     */
    const USER_MENTIONED_REPLY = 'user.mentioned.reply';

    /**
     * 话题被点赞触发
     * @var string
     */
    const TOPIC_VOTED = 'topic.voted';

    /**
     * 回复被点赞触发
     * @var string
     */
    const REPLY_VOTED = 'reply.voted';
}
