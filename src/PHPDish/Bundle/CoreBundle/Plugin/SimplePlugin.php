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

namespace PHPDish\Bundle\CoreBundle\Plugin;

use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

abstract class SimplePlugin
{
    /**
     * @var string
     */
    protected $rootDir;

    /**
     * 注册服务
     *
     * @param LoaderInterface $loader
     * @throws \Exception
     */
    public function registerServices(LoaderInterface $loader)
    {
        $loader->load('services.yml');
    }

    /**
     * 获取路由资源
     *
     * @return string|false
     */
    public function getRouterResource()
    {
        if (file_exists($this->getRootDir() . '/routing.yml')) {
            return $this->getRootDir() . '/routing.yml';
        }
        return false;
    }

    /**
     * 获取插件目录
     *
     * @return string
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