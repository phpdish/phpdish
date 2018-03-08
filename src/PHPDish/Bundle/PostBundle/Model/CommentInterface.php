<?php

namespace PHPDish\Bundle\PostBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface as BaseCommentInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;
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
