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

use PHPDish\Bundle\ThemeBundle\Model\Theme;
use PHPDish\Bundle\ThemeBundle\Model\ThemeAuthor;
use PHPDish\Bundle\ThemeBundle\Model\ThemeInterface;
use PHPDish\Bundle\ThemeBundle\Model\ThemeScreenshot;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class ThemeFinder implements ThemeFinderInterface
{
    /**
     * 主题声明文件，默认是 composer.json
     * @var string
     */
    protected $filename;

    protected $repoType;

    public function __construct($filename, $repoType)
    {
        $this->filename = $filename;
        $this->repoType = $repoType;
    }

    /**
     * 查找指定目录下的所有主题
     *
     * @param string|array $directory
     * @return ThemeInterface[]
     */
    public function find($directory)
    {
        $finder = new Finder();
        $finder->in($directory)->name($this->filename)->ignoreUnreadableDirs();
        $themes = [];
        foreach ($finder as $file) {
            $theme = $this->hydrateTheme($file);
            if ($theme === false) {
                continue;
            }
            $themes[] = $theme;
        }
        return $themes;
    }

    /**
     * @param SplFileInfo $file
     * @return bool|Theme
     */
    protected function hydrateTheme(SplFileInfo $file)
    {
        $configuration = json_decode($file->getContents(), true);
        if (!isset($configuration['type']) || $configuration['type'] !== $this->repoType) {
            return false;
        }
        $theme = new Theme($configuration['name'] ?? 'Unknown', $file->getRealPath());
        $theme->setDescription($configuration['description'] ?? null);
        $theme->setAuthors($this->convertAuthorsArraysToAuthorsObjects($configuration['authors'] ?? []));
        $theme->setScreenshots($this->convertScreenshotsArraysToScreenshotsObjects($configuration['screenshots'] ?? []));
        return $theme;
    }


    /**
     * @param array $authorsArrays
     *
     * @return array|ThemeAuthor[]
     */
    private function convertAuthorsArraysToAuthorsObjects(array $authorsArrays): array
    {
        return array_map(function (array $authorArray) {
            $author = new ThemeAuthor();

            $author->setName($authorArray['name'] ?? null);
            $author->setEmail($authorArray['email'] ?? null);
            $author->setHomepage($authorArray['homepage'] ?? null);
            $author->setRole($authorArray['role'] ?? null);

            return $author;
        }, $authorsArrays);
    }

    /**
     * @param array $screenshotsArrays
     *
     * @return array|ThemeScreenshot[]
     */
    private function convertScreenshotsArraysToScreenshotsObjects(array $screenshotsArrays): array
    {
        return array_map(function (array $screenshotArray) {
            if (!array_key_exists('path', $screenshotArray)) {
                throw new \InvalidArgumentException('Screenshot path is required.');
            }

            $themeScreenshot = new ThemeScreenshot($screenshotArray['path']);
            $themeScreenshot->setTitle($screenshotArray['title'] ?? null);
            $themeScreenshot->setDescription($screenshotArray['description'] ?? null);
            return $themeScreenshot;

        }, $screenshotsArrays);
    }
}