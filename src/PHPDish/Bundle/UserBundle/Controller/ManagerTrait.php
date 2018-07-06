<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\UserBundle\Service\PointManager;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;

trait ManagerTrait
{
    /**
     * 获取用户管理服务
     *
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }

    /**
     * 获取用户积分管理服务
     *
     * @return PointManager
     */
    protected function getPointManager()
    {
        return $this->get('phpdish.manager.point');
    }
}
