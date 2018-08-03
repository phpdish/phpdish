<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\DependencyInjection;

use PHPDish\Bundle\NotificationBundle\Model\Notification;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationMetadata;
use PHPDish\Bundle\NotificationBundle\Model\NotificationMetadataInterface;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractConfiguration;
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
        $rootNode = $treeBuilder->root('phpdish_notification');

        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('notification')
                            ->children()
                                ->scalarNode('interface')->defaultValue(NotificationInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Notification::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()

                        ->arrayNode('notification_metadata')
                            ->children()
                                ->scalarNode('interface')->defaultValue(NotificationMetadataInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(NotificationMetadata::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        $this->addTemplatesSection($rootNode);
        return $treeBuilder;
    }
}
