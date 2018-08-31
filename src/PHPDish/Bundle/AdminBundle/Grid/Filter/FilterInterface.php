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

use Doctrine\ORM\Query\Expr;
use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;

interface FilterInterface
{
    /**
     * 获取所属列
     *
     * @return ColumnInterface
     */
    public function getColumn();

    /**
     * 获取操作关系符号
     *
     * @return string
     */
    public function getOperator();

    /**
     * 获取comparison
     *
     * @return Expr\Comparison
     */
    public function getComparison();
}