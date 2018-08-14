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


class GenericThemeContext implements ThemeContextInterface
{
    /**
     * @var string
     */
    protected $currentThemeName;

    /**
     * @var ThemeFinderInterface
     */
    protected $themeFinder;

    public function __construct($currentThemeName, ThemeFinderInterface $themeFinder)
    {
        $this->currentThemeName = $currentThemeName;
        $this->themeFinder = $themeFinder;
    }

    /**
     * @return string
     */
    public function getCurrentThemeName()
    {
        return $this->currentThemeName;
    }

    /**
     * {@inheritdoc}
     */
    public function getTheme()
    {
        if ($this->currentThemeName) {
            foreach ($this->themeFinder->find() as $theme) {
                if ($theme->getName() === $this->currentThemeName) {
                    return $theme;
                }
            }
            throw new \InvalidArgumentException(sprintf('The theme "%s" is not found', $this->currentThemeName));
        }
        return null;
    }
}