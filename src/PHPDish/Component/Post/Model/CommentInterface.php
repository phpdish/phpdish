<?php

namespace PHPDish\Bundle\PostBundle\Model;

use PHPDish\Component\Resource\Model\CommentInterface as BaseCommentInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\Resource\Model\VotableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CommentInterface extends IdentifiableInterface, BaseCommentInterface, VotableInterface
{
    /**
     * 设置post.
     *
     * @param PostInterface $post
     *
     * @return $this
     */
    public function setPost(PostInterface $post);

    /**
     * 获取post.
     *
     * @return PostInterface
     */
    public function getPost();

    /**
     * 是否属于某个用户.
     *
     * @param UserInterface $user
     */
    public function isBelongsTo(UserInterface $user);
}
