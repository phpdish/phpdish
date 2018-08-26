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

use APY\DataGridBundle\Grid\Source\Entity;

interface GridSourceFactoryInterface
{
    /**
     * 创建grid源工厂
     *
     * @return Entity
     */
    public function factory();

    /**
     * 获取处理的资源类
     *
     * @return string
     */
    public static function getSourceClass();
}