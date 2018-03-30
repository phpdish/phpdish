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

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Config\Loader\DelegatingLoader;
use Symfony\Component\Config\Loader\LoaderResolver;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class PluginManager
{
    /**
     * @var ContainerBuilder
     */
    protected $container;

    /**
     * @var SimplePlugin[]
     */
    protected $plugins;

    /**
     * @var \Symfony\Component\DependencyInjection\Definition
     */
    protected $routingLoader;

    public function __construct(ContainerBuilder $container)
    {
        $this->container = $container;
        $this->routingLoader = $container->findDefinition('phpdish.plugin.route_loader');
    }

    /**
     * Gets all plugins
     *
     * @return Collection|SimplePlugin[]
     */
    public function getPlugins()
    {
        return $this->plugins;
    }

    /**
     * 安装所有插件
     *
     * @var SimplePlugin[] $plugins
     * @throws \Exception
     */
    public function installAll($plugins)
    {
        foreach ($plugins as $plugin) {
            $this->install($plugin);
        }
    }

    /**
     * 注册插件
     *
     * @param SimplePlugin $plugin
     * @throws \Exception
     */
    public function install(SimplePlugin $plugin)
    {
        $loader = $this->createContainerLoader($this->container,
            new FileLocator($plugin->getRootDir())
        );
        dump($plugin->getRouterResource());
        $plugin->registerServices($loader); //注册插件服务
        dump($plugin->getRouterResource());
        if ($plugin->getRouterResource() !== false) {
            $this->routingLoader->addMethodCall('addResource', [
                $plugin->getRouterResource()
            ]);
        }
        $this->plugins[] = $plugin;
    }


    protected function createContainerLoader(ContainerBuilder $container, FileLocator $fileLocator)
    {
        $resolver = new LoaderResolver([
            new Loader\YamlFileLoader($container, $fileLocator),
            new Loader\XmlFileLoader($container, $fileLocator),
        ]);
        return new DelegatingLoader($resolver);
    }
}