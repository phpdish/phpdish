<?php

namespace PHPDish\Bundle\CoreBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('phpdish_core');

        $this->addAssetsSection($rootNode);

        return $treeBuilder;
    }

    protected function addAssetsSection(ArrayNodeDefinition $rootNode)
    {
        $rootNode
            ->children()
                ->arrayNode('assets')
                    ->isRequired()
                    ->children()
                        // 管理员的资源设置
                        ->arrayNode('admin')
                            ->children()
                                ->scalarNode('cdn_host')->defaultNull()->end()
                            ->end()
                        ->end()
                        // 前端的资源设置
                        ->arrayNode('web')
                            ->children()
                                ->scalarNode('cdn_host')->defaultNull()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();
    }
}
