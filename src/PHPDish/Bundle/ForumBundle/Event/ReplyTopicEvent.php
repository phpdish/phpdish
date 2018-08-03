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
use Symfony\Component\EventDispatcher\Event;

class ReplyTopicEvent extends Event
{
    /**
     * @var TopicInterface
     */
    protected $topic;

    /**
     * @var ReplyInterface
     */
    protected $reply;

    public function __construct(TopicInterface $topic, ReplyInterface $reply)
    {
        $this->topic = $topic;
        $this->reply = $reply;
    }

    /**
     * @return TopicInterface
     */
    public function getTopic()
    {
        return $this->topic;
    }

    /**
     * @param TopicInterface $topic
     *
     * @return ReplyTopicEvent
     */
    public function setTopic($topic)
    {
        $this->topic = $topic;

        return $this;
    }

    /**
     * @return ReplyInterface
     */
    public function getReply()
    {
        return $this->reply;
    }

    /**
     * @param ReplyInterface $reply
     *
     * @return ReplyTopicEvent
     */
    public function setReply($reply)
    {
        $this->reply = $reply;

        return $this;
    }
}
