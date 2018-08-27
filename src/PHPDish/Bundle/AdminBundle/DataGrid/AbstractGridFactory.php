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

use APY\DataGridBundle\Grid\Grid;
use APY\DataGridBundle\Grid\GridFactoryInterface as APYGridFactoryInterface;

abstract class AbstractGridFactory implements GridFactoryInterface
{
    /**
     * @var Grid
     */
    protected $grid;

    /**
     * @var APYGridFactoryInterface
     */
    protected $gridFactory;

    public function __construct(Grid $grid, APYGridFactoryInterface $gridFactory)
    {
        $this->grid = $grid;
        $this->gridFactory = $gridFactory;
    }
}