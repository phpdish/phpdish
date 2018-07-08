<?php

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