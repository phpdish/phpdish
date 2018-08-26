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

use Doctrine\Common\Collections\Collection;

class Role implements RoleInterface
{
    /**
     * @var int
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var PermissionInterface[]|Collection
     */
    protected $permissions;

    public function __construct($name, $permissions = [])
    {
        $this->name = $name;
        $this->permissions = $permissions;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Role
     */
    public function setId(int $id): Role
    {
        $this->id = $id;
        return $this;
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