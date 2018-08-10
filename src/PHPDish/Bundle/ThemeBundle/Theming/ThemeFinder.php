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
use Symfony\Component\Finder\Finder;

class ThemeFinder
{
    /**
     * 主题声明文件，默认是 composer.json
     * @var string
     */
    protected $filename;

    public function __construct($filename)
    {
        $this->filename = $filename;
    }

    /**
     * 查找指定目录下的所有主题
     *
     * @param string|array $directory
     * @return ThemeInterface[]
     */
    public function find($directory)
    {
        $files = $this->findThemConfigurationFiles($directory);
        foreach ($files as $file) {

        }
    }

    public static function createTheme($content)
    {
        $configuration = json_decode($content, true);
    }

    protected function findThemConfigurationFiles($directory)
    {
         $finder = new Finder();
        $finder->in($directory)->name($this->filename)->ignoreUnreadableDirs();
        return $finder;
    }
}