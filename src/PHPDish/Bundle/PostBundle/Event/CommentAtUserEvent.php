<?php

namespace PHPDish\Bundle\PostBundle\Event;


use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class CommentAtUserEvent extends Event
{
    /**
     * @var CommentInterface
     */
    protected $comment;

    /**
     * @var UserInterface[]
     */
    protected $mentionedUsers;

    public function __construct(CommentInterface $comment, $mentionUsers)
    {
        $this->comment = $comment;
        $this->mentionedUsers = $mentionUsers;
    }

    /**
     * @return CommentInterface
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * @param CommentInterface $comment
     * @return CommentAtUserEvent
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
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
     * @return CommentAtUserEvent
     */
    public function setMentionedUsers($mentionedUsers)
    {
        $this->mentionedUsers = $mentionedUsers;
        return $this;
    }
}