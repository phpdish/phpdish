<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\Theming;

use PHPDish\Bundle\ThemeBundle\Model\ThemeInterface;

interface ThemeManagerInterface
{
    /**
     * 获取当前主题
     *
     * @return ThemeInterface|null
     */
    public function getCurrentTheme();
}