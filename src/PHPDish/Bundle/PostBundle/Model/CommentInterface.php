<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace  PHPDish\Bundle\PostBundle\Model;

use PHPDish\Bundle\CmsBundle\Model\CommentInterface as BaseCommentInterface;
use PHPDish\Bundle\CmsBundle\Model\VotableInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;

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
}
