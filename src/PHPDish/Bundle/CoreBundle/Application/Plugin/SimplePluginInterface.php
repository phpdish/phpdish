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

use Symfony\Component\Config\Loader\LoaderInterface;

interface SimplePluginInterface
{
    /**
     * 注册服务
     *
     * @param LoaderInterface $loader
     * @throws \Exception
     */
    public function registerServices(LoaderInterface $loader);

    /**
     * 获取路由资源
     *
     * @return string|false
     */
    public function getRouterResource();

    /**
     * 返回翻译文件路径
     *
     * @return string|false
     */
    public function getTranslationDir();

    /**
     * 获取插件目录
     *
     * @return string
     */
    public function getRootDir();
}