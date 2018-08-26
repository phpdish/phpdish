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

interface Privileger
{
    /**
     * 获取角色
     *
     * @return RoleInterface[]
     */
    public function getRoles();
}