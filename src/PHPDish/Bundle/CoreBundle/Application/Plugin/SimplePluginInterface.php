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
use Symfony\Component\HttpKernel\Bundle\BundleInterface;

interface SimplePluginInterface extends BundleInterface
{
    /**
     * 注册服务
     *
     * @throws \Exception
     */
    public function getServicesSource();

    /**
     * 获取路由资源
     *
     * @return string|false
     */
    public function getRouterResource();

    /**
     * 获取插件目录
     *
     * @return string
     */
    public function getRootDir();
}