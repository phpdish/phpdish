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

class Factory
{
    /**
     * 创建column
     *
     * @param string $name
     * @param string $type
     * @param array $options
     * @return ColumnInterface
     */
    public function createColumn($name, $type, $options = [])
    {
    }
}