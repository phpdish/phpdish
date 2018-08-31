<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Source;

use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;

interface SourceInterface
{
    /**
     * 获取数据
     *
     * @param ColumnInterface[] $columns
     * @return object
     */
    public function loadSource(array $columns, $offset, $limit);
}