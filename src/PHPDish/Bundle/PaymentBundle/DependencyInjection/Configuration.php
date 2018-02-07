<?php

namespace PHPDish\Bundle\PaymentBundle\DependencyInjection;

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
        $rootNode = $treeBuilder->root('php_dish_payment');

        $rootNode->children()
            ->arrayNode('youzan')
                ->children()
                    ->scalarNode('client_id')->cannotBeEmpty()->end()
                    ->scalarNode('client_secret')->cannotBeEmpty()->end()
                    ->scalarNode('kdt_id')->cannotBeEmpty()->end()
                ->end()
            ->end();
        return $treeBuilder;
    }
}
