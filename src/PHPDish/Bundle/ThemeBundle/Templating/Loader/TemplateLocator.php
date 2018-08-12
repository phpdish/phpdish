<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\Templating\Loader;

use PHPDish\Bundle\ThemeBundle\Theming\ThemeManagerInterface;
use Symfony\Component\Config\FileLocatorInterface;

class TemplateLocator implements FileLocatorInterface
{
    /**
     * @var ThemeManagerInterface
     */
    protected $themeManager;

    public function __construct(ThemeManagerInterface $themeManager)
    {
        $this->themeManager = $themeManager;
    }

    public function locate($name, $currentPath = null, $first = true)
    {
    }
}