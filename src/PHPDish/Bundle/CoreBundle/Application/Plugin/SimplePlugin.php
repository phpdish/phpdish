<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Application\Plugin;

use Symfony\Component\HttpKernel\Bundle\Bundle;

abstract class SimplePlugin extends Bundle implements SimplePluginInterface
{
    use PHPDishPluginTrait;

    /**
     * @var string
     */
    protected $rootDir;

    /**
     * {@inheritdoc}
     */
    public function getServicesSource()
    {
        if (file_exists($this->getRootDir() . '/services.yml')) {
            return $this->getRootDir() . '/services.yml';
        }
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getRouterResource()
    {
        if (file_exists($this->getRootDir() . '/routing.yml')) {
            return $this->getRootDir() . '/routing.yml';
        }
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getTranslationDir()
    {
        $translationsDir = $this->getRootDir() . '/translations';
        if (file_exists($translationsDir) && is_dir($translationsDir)) {
            return $translationsDir;
        }
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getRootDir()
    {
        if (null === $this->rootDir) {
            $r = new \ReflectionObject($this);
            $dir = $rootDir = dirname($r->getFileName());
            while (!file_exists($dir.'/composer.json')) {
                if ($dir === dirname($dir)) {
                    return $this->rootDir = $rootDir;
                }
                $dir = dirname($dir);
            }
            $this->rootDir = $dir;
        }

        return $this->rootDir;
    }
}