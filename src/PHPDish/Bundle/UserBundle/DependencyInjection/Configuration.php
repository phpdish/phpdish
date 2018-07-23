<?php

namespace PHPDish\Bundle\UserBundle\DependencyInjection;

use PHPDish\Bundle\UserBundle\Model\User;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
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
        $rootNode = $treeBuilder->root('phpdish_user');

        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('user')
                            ->children()
                                ->scalarNode('interface')->defaultValue(UserInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(User::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
