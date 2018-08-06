<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\MediaBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

class PHPDishMediaExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        //process imagine resolver
        $imagineResolver = $container->findDefinition('phpdish_media.imagine.resolver');
        $imagineResolver->replaceArgument('$webRootDir', $config['url_builder']['web_root']);
        $imagineResolver->replaceArgument('$cachePrefix', $config['url_builder']['cache_prefix']);
        $imagineResolver->replaceArgument('$baseUrl', $config['url_builder']['cdn_host']);

        // process media mapping
        if (!empty($config['maps'])) {
            $this->processMediaMapping($config, $container);
        }
    }

    protected function processMediaMapping($config, ContainerBuilder $container)
    {
        foreach ($config['maps'] as $alias => $config) {
            $id = $config['filesystem_service'];

            $fileManagerDefinition = new ChildDefinition('phpdish_media.file_manager');
            $fileManagerDefinition->replaceArgument(0, new Reference($id));
            $container->setDefinition('phpdish_media.file_manager.'.$alias, $fileManagerDefinition);

            $fileNamerDefinition = new ChildDefinition('phpdish_media.file_namer');
            $fileNamerDefinition->replaceArgument(0, new Reference($id));
            $container->setDefinition('phpdish_media.file_namer.'.$alias, $fileNamerDefinition);

            $urlBuilderDefinition = new ChildDefinition('phpdish_media.url_builder');
            $urlBuilderDefinition->replaceArgument(1, $config['path']);
            $container->setDefinition('phpdish_media.url_builder.'.$alias, $urlBuilderDefinition);

            $fileFactoryDefinition = new ChildDefinition('phpdish_media.file_factory');
            $fileFactoryDefinition->replaceArgument(0, new Reference('phpdish_media.file_namer.'.$alias));
            $container->setDefinition('phpdish_media.file_factory.'.$alias, $fileFactoryDefinition);

            $fileUploaderDefinition = new ChildDefinition('phpdish_media.file_uploader');
            $fileUploaderDefinition->replaceArgument(0, new Reference('phpdish_media.file_factory.'.$alias));
            $fileUploaderDefinition->replaceArgument(1, new Reference('phpdish_media.file_manager.'.$alias));
            $container->setDefinition('phpdish_media.file_uploader.'.$alias, $fileUploaderDefinition);

            $fileDownloaderDefinition = new ChildDefinition('phpdish_media.file_downloader');
            $fileDownloaderDefinition->replaceArgument(1, new Reference('phpdish_media.file_manager.'.$alias));
            $fileDownloaderDefinition->replaceArgument(2, new Reference('phpdish_media.file_namer.'.$alias));
            $container->setDefinition('phpdish_media.file_downloader.'.$alias, $fileDownloaderDefinition);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias()
    {
        return 'phpdish_media';
    }
}