<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class PHPDishThemeExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('theme.yml');
        $loader->load('templaing.yml');

        //替换当前主题为
        if ($config['current_theme']) {
            $container->findDefinition('phpdish_theme.theme_context')->replaceArgument(0, $config['current_theme']);
        }
        $container->findDefinition('phpdish_theme.theme_manager')
            ->replaceArgument(0, $config['configuration_filename'])
            ->replaceArgument(1, $config['configuration_type']);
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias()
    {
        return 'phpdish_theme';
    }
}