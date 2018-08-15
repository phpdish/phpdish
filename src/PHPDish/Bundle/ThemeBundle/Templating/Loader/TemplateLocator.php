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
use Symfony\Component\Templating\TemplateReferenceInterface;

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

    public function locate($template, $currentPath = null, $first = true)
    {
        if (!$template instanceof TemplateReferenceInterface) {
            throw new \InvalidArgumentException('The template must be an instance of TemplateReferenceInterface.');
        }
        if (
            $this->themeManager->getCurrentTheme()
            && ($bundle = $template->get('bundle'))
            && in_array($bundle, $this->themeManager->getNamespaces())
        ) {
            $template->set('bundle', false);
        }
        return parent::locate($template, $currentPath, $first);
    }
}