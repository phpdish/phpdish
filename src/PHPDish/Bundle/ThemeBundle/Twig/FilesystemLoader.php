<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\Twig;

use PHPDish\Bundle\ThemeBundle\Theming\ThemeManagerInterface;
use Symfony\Bundle\TwigBundle\Loader\FilesystemLoader as BaseFilesystemLoader;
use Twig\Error\LoaderError;

class FilesystemLoader extends BaseFilesystemLoader
{
    /**
     * @var ThemeManagerInterface
     */
    protected $themeManager;

    /**
     * 模板名称后缀
     * @var string
     */
    protected $templateLogicNameSuffix = '';

    /**
     * @param ThemeManagerInterface $themeManager
     */
    public function setThemeManager(ThemeManagerInterface $themeManager)
    {
        $this->themeManager = $themeManager;
        //当前主题后缀，防止动态切换主题导致模板位置索引错误
        if ($activeTheme = $themeManager->getCurrentTheme()) {
            $this->templateLogicNameSuffix = '|' . $activeTheme->getName();
        }
    }

    /**
     * {@inheritdoc}
     */
    public function findTemplate($template, $throw = true)
    {
        //补全模板名称后缀
        $logicalName = (string) $template . $this->templateLogicNameSuffix;

        if (isset($this->cache[$logicalName])) {
            return $this->cache[$logicalName];
        }

        $file = null;
        $previous = null;

        try {
            $template = $this->parser->parse($template);
            $file = $this->locator->locate($template);
        } catch (\Exception $e) {
            $previous = $e;

            // for BC
            try {
                $file = parent::findTemplate((string) $template);
            } catch (LoaderError $e) {
                $previous = $e;
            }
        }

        if (false === $file || null === $file) {
            if ($throw) {
                throw new LoaderError(sprintf('Unable to find template "%s".', $logicalName), -1, null, $previous);
            }

            return false;
        }
        return $this->cache[$logicalName] = $file;
    }
}