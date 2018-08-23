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

    /**
     * 设置当前主题
     *
     * @param ThemeInterface $theme
     */
    public function setCurrentTheme($theme);

    /**
     * 获取覆盖的bundle命名空间，在此空间内的模板会被重定向到主题内
     *
     * @return array
     */
    public function getNamespaces();


    /**
     * 获取所有的主题
     *
     * @return ThemeFinderInterface[]
     */
    public function getThemes();
}