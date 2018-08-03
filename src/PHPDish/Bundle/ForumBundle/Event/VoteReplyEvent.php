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

use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class VoteReplyEvent extends VoteTopicEvent
{
    /**
     * @var ReplyInterface
     */
    protected $reply;

    public function __construct(TopicInterface $topic, ReplyInterface $reply, UserInterface $user)
    {
        $this->reply = $reply;
        parent::__construct($topic, $user);
    }

    /**
     * @return ReplyInterface
     */
    public function getReply(): ReplyInterface
    {
        return $this->reply;
    }
}