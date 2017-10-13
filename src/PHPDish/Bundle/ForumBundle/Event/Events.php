<?php

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
     * 回复中提及用户.
     *
     * @var string
     */
    const USER_MENTIONED_REPLY = 'user.mentioned.reply';
}
