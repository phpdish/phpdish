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
     * 渲染当前grid
     * @param string|null $template
     * @return string
     */
    public function render($template = null);

    /**
     * 获取列
     *
     * @return ColumnInterface[]
     */
    public function getColumns();
}