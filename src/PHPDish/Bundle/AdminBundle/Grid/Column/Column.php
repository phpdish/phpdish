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

use PHPDish\Bundle\AdminBundle\Grid\Filter\FilterInterface;

class Column implements ColumnInterface
{
    protected $name;

    protected $type;

    protected $sortable = true;

    protected $filterable = true;

    /**
     * @var string
     */
    protected $operator;

    /**
     * @var FilterInterface[]
     */
    protected $filters;

    public function __construct($name, $type, $sortable = true)
    {
        $this->name = $name;
        $this->type = $type;
        $this->sortable = $sortable;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * {@inheritdoc}
     */
    public function isFilterable()
    {
        return $this->filterable;
    }

    /**
     * {@inheritdoc}
     */
    public function isSortable()
    {
        return $this->sortable;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return $this->filters;
    }

    /**
     * {@inheritdoc}
     */
    public function addFilter(FilterInterface $filter)
    {
        $this->filters[] = $filter;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilterByOperator($operator)
    {
        //如果只有一个filter，则operator可以忽略
        if ($operator === null && count($this->filters) === 1) {
            return $this->filters[0];
        }
        foreach ($this->filters as $filter) {
            if ($filter->getOperator() === $operator) {
                return $filter;
            }
        }
        return null;
    }
}