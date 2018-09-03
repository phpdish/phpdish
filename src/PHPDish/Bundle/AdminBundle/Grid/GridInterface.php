<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid;

use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;
use Symfony\Component\HttpFoundation\Request;

interface GridInterface
{
    /**
     * 最大结果集
     * @var int
     */
    const MAX_RESULTS_NUM = 20;

    /**
     * apply request
     * @param Request $request
     * @return self
     */
    public function handleRequest(Request $request);

    /**
     * 初始化栅格，从数据源获取数据
     *
     * @return void
     */
    public function initialize();

    /**
     * 获取列
     *
     * @return ColumnInterface[]
     */
    public function getColumns();

    /**
     * 判断是否有列
     *
     * @param string $name
     * @return boolean
     */
    public function hasColumn($name);

    /**
     * 获取指定列
     *
     * @param string $name
     * @return ColumnInterface
     */
    public function getColumn($name);

    /**
     * 添加一列
     *
     * @param string $column
     * @param string $type
     * @param array $options
     * @return ColumnInterface
     */
    public function addColumn($column, $type, $options = []);
}