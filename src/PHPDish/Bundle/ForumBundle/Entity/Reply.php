<?php

namespace PHPDish\Bundle\ForumBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\CoreBundle\Model\AbstractComment as BaseComment;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use JMS\Serializer\Annotation as JMS;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Reply extends BaseComment implements ReplyInterface
{
    use VotableTrait;

    /**
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $user;

    /**
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $topic;

    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * {@inheritdoc}
     */
    public function setTopic(TopicInterface $topic)
    {
        $this->topic = $topic;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTopic()
    {
        return $this->topic;
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }
}
