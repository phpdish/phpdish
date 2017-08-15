<?php
namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;
use PHPDish\Bundle\PostBundle\Service\PostManagerInterface;

trait ManagerTrait
{
    /**
     * 获取post管理服务
     * @return PostManagerInterface
     */
    protected function getPostManager()
    {
        return $this->get('phpdish.manager.post');
    }

    /**
     * 获取分类管理
     * @return CategoryManagerInterface
     */
    protected function getCategoryManager()
    {
        return $this->get('phpdish.manager.category');
    }
}