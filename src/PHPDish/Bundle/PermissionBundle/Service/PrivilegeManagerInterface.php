<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PermissionBundle\Service;

use PHPDish\Bundle\PermissionBundle\Model\PermissionInterface;
use PHPDish\Bundle\PermissionBundle\Model\Privileger;
use PHPDish\Bundle\PermissionBundle\Model\RoleInterface;

interface PrivilegeManagerInterface
{
    /**
     * 创建角色
     *
     * @param string $name
     * @param PermissionInterface[]|[] $permissions
     * @return RoleInterface
     */
    public function createRole($name, $permissions = []);

    /**
     * 保存角色
     *
     * @param RoleInterface $role
     */
    public function saveRole(RoleInterface $role);

    /**
     * 判断是否有权限
     *
     * @param Privileger $privileger
     * @param PermissionInterface|string|int $permission
     * @return boolean
     */
    public function hasPermission(Privileger $privileger, $permission);

    /**
     * 判断是否有列出的所有权限
     *
     * @param Privileger $privileger
     * @param PermissionInterface[]|array $permission
     * @return boolean
     */
    public function hasPermissions(Privileger $privileger, $permissions);

    /**
     * 判断是否有列出的任一权限
     *
     * @param Privileger $privileger
     * @param PermissionInterface[]|array $permission
     * @return boolean
     */
    public function hasAnyPermissions(Privileger $privileger, $permissions);

    /**
     * 获取权限树形结构
     *
     * @param Privileger $privileger
     * @return PermissionInterface[]
     */
    public function findPermissionsTree(Privileger $privileger);
}