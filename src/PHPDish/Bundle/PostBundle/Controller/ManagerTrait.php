<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\PostBundle\Service\BookManagerInterface;
use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;
use PHPDish\Bundle\PostBundle\Service\CommentManagerInterface;
use PHPDish\Bundle\PostBundle\Service\PostManagerInterface;

trait ManagerTrait
{
    /**
     * 获取post管理服务
     *
     * @return PostManagerInterface
     */
    protected function getPostManager()
    {
        return $this->get('phpdish.manager.post');
    }

    /**
     * 获取分类管理.
     *
     * @return CategoryManagerInterface
     */
    protected function getCategoryManager()
    {
        return $this->get('phpdish.manager.category');
    }

    /**
     * 获取评论管理服务
     *
     * @return CommentManagerInterface
     */
    public function getPostCommentManager()
    {
        return $this->get('phpdish.manager.post.comment');
    }

    /**
     * 获取 book 管理
     * @return BookManagerInterface
     */
    public function getBookManager()
    {
        return $this->get('phpdish.manager.book');
    }
}
