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

use PHPDish\Bundle\ThemeBundle\Model\ThemeInterface;
use PHPDish\Bundle\ThemeBundle\Theming\ThemeManagerInterface;
use Symfony\Component\HttpKernel\Config\FileLocator as BaseFileLocator;
use Symfony\Component\HttpKernel\KernelInterface;

class FileLocator extends BaseFileLocator
{
    /**
     * @var ThemeManagerInterface
     */
    protected $themeManager;

    /**
     * @var ThemeInterface
     */
    protected $currentTheme;

    /**
     * @var KernelInterface
     */
    protected $kernel;

    public function setThemeManager(ThemeManagerInterface $themeManager)
    {
        $this->themeManager = $themeManager;
        $this->currentTheme = $this->themeManager->getCurrentTheme();
        //将当前主题的路径添加入paths
        if ($this->currentTheme) {
            $this->paths[] = $this->currentTheme->getPath();
        }
    }

    /**
     * @param mixed $kernel
     */
    public function setKernel($kernel)
    {
        $this->kernel = $kernel;
    }

    /**
     * {@inheritdoc}
     */
    public function locate($file, $currentPath = null, $first = true)
    {
        if ($this->currentTheme) {
            $bundleName = substr($file, 1);
            if (false !== strpos($bundleName, '/')) {
                list($bundleName) = explode('/', $bundleName, 2);
            }
            if (in_array($bundleName, $this->themeManager->getNamespaces())) {
                $file = $this->kernel->locateResource($file, $this->currentTheme->getPath(), $first);

                return $file;
            }
        }
        return parent::locate($file, $currentPath);
    }
}