<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Model;

interface RoleInterface
{
    /**
     * @return int
     */
    public function getId();

    /**
     * 角色名称
     *
     * @return string
     */
    public function getName();

    /**
     * 获取权限
     *
     * @return PermissionInterface[]
     */
    public function getPermissions();

    /**
     * 赋予权限
     *
     * @param PermissionInterface $permission
     * @return self
     */
    public function givePermission(PermissionInterface $permission);

    /**
     * 取消授权
     *
     * @param PermissionInterface $permission
     * @return self
     */
    public function revokePermission(PermissionInterface $permission);
}