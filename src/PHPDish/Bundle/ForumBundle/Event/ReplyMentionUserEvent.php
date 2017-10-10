<?php

namespace PHPDish\Bundle\ForumBundle\Event;


use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class ReplyMentionUserEvent extends Event
{
    /**
     * @var ReplyInterface
     */
    protected $reply;

    /**
     * @var UserInterface[]
     */
    protected $mentionedUsers;

    public function __construct(ReplyInterface $reply, $mentionUsers)
    {
        $this->reply = $reply;
        $this->mentionedUsers = $mentionUsers;
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
     * @return ReplyMentionUserEvent
     */
    public function setReply($reply)
    {
        $this->reply = $reply;
        return $this;
    }

    /**
     * @return UserInterface[]
     */
    public function getMentionedUsers()
    {
        return $this->mentionedUsers;
    }

    /**
     * @param UserInterface[] $mentionedUsers
     * @return ReplyMentionUserEvent
     */
    public function setMentionedUsers($mentionedUsers)
    {
        $this->mentionedUsers = $mentionedUsers;
        return $this;
    }
}