<?php

namespace PHPDish\Bundle\PostBundle\Event;

use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;

class PostCommentedEvent extends PostEvent
{
    /**
     * 评论
     * @var CommentInterface
     */
    protected $comment;

    public function __construct(PostInterface $post, CommentInterface $comment)
    {
        $this->comment = $comment;
        parent::__construct($post);
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
     * @return PostCommentedEvent
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
        return $this;
    }
}