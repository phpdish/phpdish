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

class ThemeManager implements ThemeManagerInterface
{
    /**
     * @var ThemeContextInterface
     */
    protected $themeContext;

    /**
     * 当前主题
     *
     * @var ThemeInterface|null
     */
    protected $theme;

    public function __construct(ThemeContextInterface $themeContext)
    {
        $this->themeContext = $themeContext;
    }

    /**
     * {@inheritdoc}
     */
    public function getCurrentTheme()
    {
        if ($this->theme === null) {
            $this->theme = $this->themeContext->getTheme();
        }
        return $this->theme;
    }
}