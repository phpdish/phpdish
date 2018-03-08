<?php

namespace  PHPDish\Bundle\PostBundle\Entity;

use PHPDish\Bundle\CoreBundle\Entity\Comment as BaseComment;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use JMS\Serializer\Annotation as JMS;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Comment extends BaseComment implements CommentInterface
{
    use IdentifiableTrait, VotableTrait;

    /**
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $post;

    /**
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $user;

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
    public function getUser()
    {
        return $this->user;
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->user === $user;
    }
}
