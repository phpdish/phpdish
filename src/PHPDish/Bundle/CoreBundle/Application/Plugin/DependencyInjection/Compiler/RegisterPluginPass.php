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

namespace PHPDish\Bundle\CoreBundle\Application\Plugin\DependencyInjection\Compiler;

use PHPDish\Bundle\CoreBundle\Application\Plugin\SimplePluginInterface;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Config\Loader\DelegatingLoader;
use Symfony\Component\Config\Loader\LoaderResolver;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\Finder\Finder;

class RegisterPluginPass implements CompilerPassInterface
{
    /**
     * @var ContainerBuilder
     */
    protected $container;

    /**
     * @var Definition
     */
    protected $routingLoaderDefinition;

    /**
     * @var Definition
     */
    protected $translatorDefinition;

    protected $translationsFiles = [];

    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $this->container = $container;

        $this->routingLoaderDefinition = $container->findDefinition('phpdish.plugin.route_loader');
        $this->translatorDefinition = $container->findDefinition('translator');

        //注册插件
        foreach ($container->getParameter('kernel.simple_plugins_metadata') as $plugin) {
            $this->install($plugin);
        }

        //注册所有的翻译文件
        $options = $this->translatorDefinition->getArgument(4);
        if (isset($options['resource_files'])) {
            $options['resource_files'] = array_merge_recursive($options['resource_files'], $this->translationsFiles);
        }
        $this->translatorDefinition->replaceArgument(4, $options);
    }

    /**
     * 注册插件
     *
     * @param array $pluginMetadata
     * @throws \Exception
     */
    public function install($pluginMetadata)
    {
        ////注册插件服务
        if ($pluginMetadata['servicesSource'] !== false) {
            $loader = $this->createContainerLoader($this->container,
                new FileLocator($pluginMetadata['path'])
            );
            $loader->load($pluginMetadata['servicesSource']);
        }

        //注册路由
        if ($pluginMetadata['routerSource'] !== false) {
            $this->routingLoaderDefinition->addMethodCall('addResource', [
                $pluginMetadata['routerSource']
            ]);
        }
        //注册翻译资源
        if ($pluginMetadata['translationDir'] !== false) {
            $finder = Finder::create()
                ->followLinks()
                ->files()
                ->filter(function (\SplFileInfo $file) {
                    return 2 === substr_count($file->getBasename(), '.') && preg_match('/\.\w+$/', $file->getBasename());
                })
                ->in($pluginMetadata['translationDir'])
                ->sortByName();

            foreach ($finder as $file) {
                list(, $locale) = explode('.', $file->getBasename(), 3);
                if (!isset($this->translationsFiles[$locale])) {
                    $this->translationsFiles[$locale] = [];
                }
                $this->translationsFiles[$locale][] = (string) $file;
            }
        }
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