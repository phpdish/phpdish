<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\GridFactory;

use PHPDish\Bundle\CoreBundle\Model\User;

class UserFactory extends AbstractGridFactory
{
    public function getGrid()
    {
        $grid = $this->factory->createGrid($this->getEntityClass());
        $grid->addColumn('username', 'text', [
            'sortable' => true
        ]);
        return $grid;
    }

    public function getEntityClass()
    {
        return User::class;
    }
}