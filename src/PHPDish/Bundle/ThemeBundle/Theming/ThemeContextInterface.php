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

interface ThemeContextInterface
{
    /**
     * Should not throw any exception if failed to get theme.
     *
     * @return ThemeInterface|null
     */
    public function getTheme();
}