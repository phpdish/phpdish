<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Component\Content\Model;

interface CommentableInterface
{
    /**
     * 获取评论数量.
     *
     * @return int
     */
    public function getCommentCount();
}
