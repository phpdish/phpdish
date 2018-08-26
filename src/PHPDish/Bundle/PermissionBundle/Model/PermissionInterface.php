<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PermissionBundle\Model;

use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;

interface PermissionInterface extends IdentifiableInterface
{
    public function getName();

    public function getRoute();

    /**
     * 获取父级权限
     *
     * @return PermissionInterface
     */
    public function getParent();

    /**
     * 获取子级权限
     *
     * @return PermissionInterface[]
     */
    public function getChildren();
}