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
            ->children()
                ->arrayNode('imagine_resolver')
                    ->children()
                        ->scalarNode('cdn_host')->defaultNull()->end()
                        ->scalarNode('web_root')->defaultValue('%kernel.root_dir%/../web')->cannotBeEmpty()->end()
                        ->scalarNode('cache_prefix')->defaultValue('media/cache')->cannotBeEmpty()->end()
                    ->end()
                ->end()
                ->scalarNode('default_mapping')->defaultNull()->end()
                ->arrayNode('mappings')
                    ->useAttributeAsKey('alias')
                    ->isRequired()
                    ->requiresAtLeastOneElement()
                    ->prototype('array')
                    ->children()
                        ->scalarNode('filesystem_service')->cannotBeEmpty()->end()  //对应filesystem service id
                        ->scalarNode('base_url')->cannotBeEmpty()->end() //访问的基础域名
                        ->scalarNode('namer')->end() //访问的基础域名
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
