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

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('phpdish_theme');

        $rootNode
            ->children()
                ->scalarNode('current_theme')->end()
                ->scalarNode('configuration_filename')->defaultValue('composer.json')->end()
                ->scalarNode('configuration_type')->defaultValue('phpdish_theme')->end()
            ->end();
    }
}