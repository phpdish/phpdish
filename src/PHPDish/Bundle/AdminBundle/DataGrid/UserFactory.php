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

class UserFactory extends AbstractGridFactory
{
    /**
     * {@inheritdoc}
     */
    public function factory()
    {
        $source = new Entity(self::getSourceClass());
        $this->grid->setSource($source);

    }

    /**
     * {@inheritdoc}
     */
    public static function getSourceClass()
    {
        return User::class;
    }
}