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
        $rootNode = $treeBuilder->root('phpdish_media');

        $rootNode
            ->fixXmlConfig('map')
            ->children()

                ->arrayNode('url_builder')
                    ->children()
                        ->scalarNode('cdn_host')->defaultNull()->end()
                        ->scalarNode('web_root')->defaultValue('%kernel.root_dir%/../web')->cannotBeEmpty()->end()
                        ->scalarNode('cache_prefix')->defaultValue('media/cache')->cannotBeEmpty()->end()
                    ->end()
                ->end()

                ->arrayNode('maps')
                    ->useAttributeAsKey('alias')
                    ->prototype('array')
                    ->children()
                        ->scalarNode('filesystem_service')->cannotBeEmpty()->end()
                        ->scalarNode('path')->cannotBeEmpty()->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
