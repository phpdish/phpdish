<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\PermissionBundle\Model\Role as BaseRole;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class Role extends BaseRole implements IdentifiableInterface
{
    use IdentifiableTrait;
}