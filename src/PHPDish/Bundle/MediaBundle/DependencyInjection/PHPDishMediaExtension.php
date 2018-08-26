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
        //处理配置
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        //加载服务配置
        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        //process imagine resolver
        $imagineResolver = $container->findDefinition('phpdish_media.imagine.resolver');
        $imagineResolver->replaceArgument('$webRootDir', $config['imagine_resolver']['web_root']);
        $imagineResolver->replaceArgument('$cachePrefix', $config['imagine_resolver']['cache_prefix']);
        $imagineResolver->replaceArgument('$baseUrl', $config['imagine_resolver']['cdn_host']);

        //process twig extension
        $container->findDefinition('phpdish_media.twig_extension')->replaceArgument(1, $config['imagine_resolver']['cdn_host']);
        // process media mapping
        $this->processMediaMapping($config, $container);

        //process oneup uploader
        $this->processOneupUploader($config, $container);
    }

    protected function processMediaMapping($config, ContainerBuilder $container)
    {
        $defaultAlias = empty($config['default_mapping']) ? key($config['mappings']) : $config['default_mapping'];

        foreach ($config['mappings'] as $alias => $mappingConfig) {
            $filesystemId = $mappingConfig['filesystem_service'];

            $fileManagerDefinition = new ChildDefinition('phpdish_media.file_manager.private');
            $fileManagerDefinition->replaceArgument(0, new Reference($filesystemId));
            $container->setDefinition('phpdish_media.file_manager.'.$alias, $fileManagerDefinition);

            //自定义配置namer
            if (!empty($mappingConfig['namer'])) {
                $container->setAlias('phpdish_media.file_namer.'.$alias, $mappingConfig['namer']);
            } else {
                $fileNamerDefinition = new ChildDefinition('phpdish_media.file_namer.private');
                $fileNamerDefinition->replaceArgument(0, new Reference($filesystemId));
                $container->setDefinition('phpdish_media.file_namer.'.$alias, $fileNamerDefinition);
            }

            $urlBuilderDefinition = new ChildDefinition('phpdish_media.url_builder.private');
            $urlBuilderDefinition->replaceArgument(1, $mappingConfig['base_url']);
            $container->setDefinition('phpdish_media.url_builder.'.$alias, $urlBuilderDefinition);

            $fileFactoryDefinition = new ChildDefinition('phpdish_media.file_factory.private');
            $fileFactoryDefinition->replaceArgument(0, new Reference('phpdish_media.file_namer.'.$alias));
            $container->setDefinition('phpdish_media.file_factory.'.$alias, $fileFactoryDefinition);

            $fileUploaderDefinition = new ChildDefinition('phpdish_media.file_uploader.private');
            $fileUploaderDefinition->replaceArgument(0, new Reference('phpdish_media.file_factory.'.$alias));
            $fileUploaderDefinition->replaceArgument(1, new Reference('phpdish_media.file_manager.'.$alias));
            $container->setDefinition('phpdish_media.file_uploader.'.$alias, $fileUploaderDefinition);

            $fileDownloaderDefinition = new ChildDefinition('phpdish_media.file_downloader.private');
            $fileDownloaderDefinition->replaceArgument(1, new Reference('phpdish_media.file_manager.'.$alias));
            $fileDownloaderDefinition->replaceArgument(2, new Reference('phpdish_media.file_factory.'.$alias));
            $container->setDefinition('phpdish_media.file_downloader.'.$alias, $fileDownloaderDefinition);
        }
        //为添加别名
        $container->addAliases([
            'phpdish_media.file_manager' => 'phpdish_media.file_manager.'.$defaultAlias,
            'phpdish_media.file_namer' => 'phpdish_media.file_namer.'.$defaultAlias,
            'phpdish_media.url_builder' => 'phpdish_media.url_builder.'.$defaultAlias,
            'phpdish_media.file_factory' => 'phpdish_media.file_factory.'.$defaultAlias,
            'phpdish_media.file_uploader' => 'phpdish_media.file_uploader.'.$defaultAlias,
            'phpdish_media.file_downloader' => 'phpdish_media.file_downloader.'.$defaultAlias,
        ]);
    }

    protected function processOneupUploader($config, ContainerBuilder $container)
    {
        foreach ($config['mappings'] as $alias => $mappingConfig) {
            $filesystemId = $mappingConfig['filesystem_service'];

            $definition = new ChildDefinition('phpdish_media.oneup_file_namer.private');
            $definition->replaceArgument(0, new Reference($filesystemId));
            $container->setDefinition('phpdish_media.oneup_file_namer.'.$alias, $definition);
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