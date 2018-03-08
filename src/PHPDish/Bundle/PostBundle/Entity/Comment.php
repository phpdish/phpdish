<?php

namespace  PHPDish\Bundle\PostBundle\Entity;

use PHPDish\Bundle\CoreBundle\Entity\Comment as BaseComment;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Comment extends BaseComment implements CommentInterface
{
    use IdentifiableTrait, VotableTrait;

    /**
     * @var PostInterface
     */
    protected $post;

    /**
     * {@inheritdoc}
     */
    public function setPost(PostInterface $post)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPost()
    {
        return $this->post;
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->user === $user;
    }
}
