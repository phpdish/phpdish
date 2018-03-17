<?php

declare(strict_types=1);

namespace PHPDish\Bundle\ForumBundle\Event;

use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class VoteTopicEvent extends Event
{
    /**
     * @var TopicInterface
     */
    protected $topic;

    /**
     * @var UserInterface
     */
    protected $voter;

    public function __construct(TopicInterface $topic, UserInterface $user)
    {
        $this->topic = $topic;
        $this->voter = $user;
    }

    /**
     * @return TopicInterface
     */
    public function getTopic(): TopicInterface
    {
        return $this->topic;
    }

    /**
     * @return UserInterface
     */
    public function getVoter(): UserInterface
    {
        return $this->voter;
    }
}