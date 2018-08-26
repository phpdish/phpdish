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

use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class Permission implements PermissionInterface
{
    use IdentifiableTrait;

    protected $name;

    /**
     * 英文标记
     *
     * @var slug
     */
    protected $slug;

    protected $route;

    protected $parent;

    protected $children;

    /**
     * @var string
     */
    protected $roles;

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return Permission
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getRoute()
    {
        return $this->route;
    }

    /**
     * @param mixed $route
     * @return Permission
     */
    public function setRoute($route)
    {
        $this->route = $route;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param mixed $parent
     * @return Permission
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @param mixed $children
     * @return Permission
     */
    public function setChildren($children)
    {
        $this->children = $children;
        return $this;
    }
}