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

use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use Symfony\Component\EventDispatcher\Event;

class TopicEvent extends Event
{
    /**
     * @var TopicInterface
     */
    protected $topic;

    public function __construct(TopicInterface $topic)
    {
        $this->topic = $topic;
    }

    /**
     * Gets the topic for the event.
     *
     * @return TopicInterface
     */
    public function getTopic()
    {
        return $this->topic;
    }
}