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
        $gridBuilder = $this->gridFactory->createBuilder('grid', $source, [
            'persistence'  => true,
            'route'=> 'admin_user_index',
            'filterable'   => false,
            'sortable'     => false,
            'max_per_page' => 20,
        ]);
        $grid = $gridBuilder
            ->add('id','number', [
                'primary' => 'true',
            ])
            ->add('username', 'text', [
                'title' => '用户名'
            ])
            ->add('gender', 'boolean', [
                'title' => '性别'
            ])
            ->add('avatar', '', [
                'title' => '头像'
            ])
            ->getGrid();
        return $grid;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSourceClass()
    {
        return User::class;
    }
}