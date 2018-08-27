<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\DataGrid;

use APY\DataGridBundle\Grid\Source\Entity;
use PHPDish\Bundle\CoreBundle\Model\User;

class UserSourceFactory implements GridSourceFactoryInterface
{

    public function factory()
    {
        return new Entity(self::getSourceClass());
    }

    public static function getSourceClass()
    {
        return User::class;
    }
}