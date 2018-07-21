<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Bundle\CmsBundle\Model;

use Doctrine\Common\Collections\Collection;

interface CommentableInterface
{
    /**
     * 获取评论数量.
     *
     * @return int
     */
    public function getCommentCount();

    /**
     * 获取评论
     *
     * @return CommentInterface[]|Collection
     */
    public function getComments();
}
