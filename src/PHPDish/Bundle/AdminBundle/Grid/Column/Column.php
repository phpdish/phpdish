<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Column;

class Column implements ColumnInterface
{
    protected $sortable = true;

    protected $filterable = true;

    protected $type;

    /**
     * @var string
     */
    protected $operator;

    public function __construct($sortable, $filterable, $operator = null)
    {
        $this->sortable = $sortable;
        $this->filterable = $filterable;
        $this->operator = $operator;
    }

    public function isFilterable()
    {
        return $this->filterable;
    }

    public function isSortable()
    {
        return $this->sortable;
    }

    public function getFilterOperator()
    {
        return $this->operator;
    }
}