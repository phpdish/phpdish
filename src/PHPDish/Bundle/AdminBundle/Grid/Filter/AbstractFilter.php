<?php

/*
 * This file is part of the DataGridBundle.
 *
 * (c) Abhoryo <abhoryo@free.fr>
 * (c) Stanislav Turza
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Filter;

use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;

abstract class AbstractFilter implements FilterInterface
{
    /**
     * @var string|null
     */
    protected $operator;

    /**
     * @var ColumnInterface
     */
    protected $column;

    /**
     * @param null|string $operator
     */
    public function setOperator($operator)
    {
        $this->operator = $operator;
    }

    /**
     * {@inheritdoc}
     */
    public function getOperator()
    {
        return $this->operator;
    }

    /**
     * {@inheritdoc}
     */
    public function setColumn(ColumnInterface $column)
    {
        $this->column = $column;
    }

    /**
     * {@inheritdoc}
     */
    public function getColumn()
    {
        return $this->column;
    }

    protected function assertComparable()
    {
        if ($this->operator === null) {
            throw new \LogicException('Please set an operator for the filter');
        }
        if ($this->column === null) {
            throw new \LogicException('Please set an operator for the filter');
        }
    }
}