<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
        return $this->get('phpdish_user.manager.user');
    }

    /**
     * 获取用户积分管理服务
     *
     * @return PointManager
     */
    protected function getPointManager()
    {
        return $this->get('phpdish_user.manager.point');
    }
}
