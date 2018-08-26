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

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class Role implements RoleInterface
{
    use IdentifiableTrait;

    /**
     * @var string
     */
    protected $name;

    /**
     * 英文标记
     *
     * @var slug
     */
    protected $slug;

    /**
     * @var PermissionInterface[]|Collection
     */
    protected $permissions;

    /**
     * @var PrivilegerInterface[]
     */
    protected $users;

    public function __construct($name, $permissions = [])
    {
        $this->name = $name;
        $this->permissions = $permissions;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Role
     */
    public function setName(string $name): Role
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return Collection|PermissionInterface[]
     */
    public function getPermissions()
    {
        return $this->permissions;
    }

    /**
     * @param Collection|PermissionInterface[] $permissions
     * @return Role
     */
    public function setPermissions($permissions)
    {
        $this->permissions = $permissions;
        return $this;
    }

    public function givePermission(PermissionInterface $permission)
    {
        $this->permissions[] = $permission;
    }

    public function revokePermission(PermissionInterface $permission)
    {
        $this->permissions->removeElement($permission);
    }
}