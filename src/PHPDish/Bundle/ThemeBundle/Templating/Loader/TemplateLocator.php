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
use Symfony\Bundle\FrameworkBundle\Templating\Loader\TemplateLocator as BaseTemplateLocator;

class TemplateLocator extends BaseTemplateLocator implements FileLocatorInterface
{
    /**
     * @var ThemeManagerInterface
     */
    protected $themeManager;

    public function setThemeManager(ThemeManagerInterface $themeManager)
    {
        $this->themeManager = $themeManager;
    }

    /**
     * {@inheritdoc}
     */
    protected function getCacheKey($template)
    {
        $name = $template->getLogicalName();
        if ($currentTheme = $this->themeManager->getCurrentTheme()) {
            return $name . '|' . $currentTheme->getName();
        }
        return $name;
    }
}