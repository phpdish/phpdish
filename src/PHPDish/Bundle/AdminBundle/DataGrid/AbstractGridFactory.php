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

abstract class AbstractGridFactory implements GridFactoryInterface
{
    /**
     * @var Grid
     */
    protected $grid;

    public function __construct(Grid $grid)
    {
        $this->grid = $grid;
    }
}