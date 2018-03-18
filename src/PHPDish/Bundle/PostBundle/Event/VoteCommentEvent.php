<?php

namespace PHPDish\Bundle\PostBundle\Event;

use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class VoteCommentEvent extends VotePostEvent
{
    /**
     * @var CommentInterface
     */
    protected $comment;

    public function __construct(PostInterface $post, CommentInterface $comment, UserInterface $user)
    {
        $this->comment = $comment;
        parent::__construct($post, $user);
    }

    /**
     * @return CommentInterface
     */
    public function getComment(): CommentInterface
    {
        return $this->comment;
    }
}