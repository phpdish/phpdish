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

use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\GridBuilder;
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
        $this->addColumns($gridBuilder);
        $this->addFilters($gridBuilder);
        return $gridBuilder->getGrid();
    }

    protected function addFilters(GridBuilder $gridBuilder)
    {
    }

    protected function addColumns(GridBuilder $gridBuilder)
    {
        $rowAction = new RowAction('user.action.show', 'admin_user_show');
        $gridBuilder
            ->add('id','number', [
                'primary' => 'true',
            ])
            ->add('username', 'text', [
                'title' => 'user.username'
            ])
            ->add('gender', 'boolean', [
                'title' => 'user.gender',
                'size' => -1
            ])
            ->add('createdAt', 'datetime', [
                'title' => 'user.created_at'
            ])
            ->add('lastLogin', 'datetime', [
                'title' => 'user.last_login'
            ])
            ->add('enabled', 'boolean', [
                'title' => 'user.enabled',
                'size' => -1
            ])
            ->addAction($rowAction);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSourceClass()
    {
        return User::class;
    }
}