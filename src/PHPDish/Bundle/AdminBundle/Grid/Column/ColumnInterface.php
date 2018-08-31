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

interface ColumnInterface
{
    /**
     * @return bool
     */
    public function isSortable();

    /**
     * @return bool
     */
    public function isFilterable();

    /**
     * 获取过滤操作符
     *
     * @return string
     */
    public function getFilterOperator();
}