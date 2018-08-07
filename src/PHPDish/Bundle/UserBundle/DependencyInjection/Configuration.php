<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\DependencyInjection;

use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractConfiguration;
use PHPDish\Bundle\UserBundle\Model\PointHistory;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\Profile;
use PHPDish\Bundle\UserBundle\Model\ProfileInterface;
use PHPDish\Bundle\UserBundle\Model\User;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration extends AbstractConfiguration implements ConfigurationInterface
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
                ->scalarNode('avatar_downloader')->isRequired()->cannotBeEmpty()->end()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('user')
                            ->children()
                                ->scalarNode('interface')->defaultValue(UserInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(User::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('profile')
                            ->children()
                                ->scalarNode('interface')->defaultValue(ProfileInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Profile::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('point_history')
                            ->children()
                                ->scalarNode('interface')->defaultValue(PointHistoryInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(PointHistory::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        $this->addTemplatesSection($rootNode);
        return $treeBuilder;
    }
}
