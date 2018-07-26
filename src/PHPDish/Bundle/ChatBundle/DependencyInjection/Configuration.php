<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ChatBundle\DependencyInjection;

use PHPDish\Bundle\ChatBundle\Model\Message;
use PHPDish\Bundle\ChatBundle\Model\MessageMetadata;
use PHPDish\Bundle\ChatBundle\Model\Thread;
use PHPDish\Bundle\ChatBundle\Model\ThreadMetadata;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractConfiguration;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration extends AbstractConfiguration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('phpdish_chat');

        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('message')
                            ->children()
                                ->scalarNode('interface')->defaultValue(\FOS\MessageBundle\Model\Message::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Message::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()

                        ->arrayNode('message_metadata')
                            ->children()
                                ->scalarNode('interface')->defaultValue(\FOS\MessageBundle\Model\MessageMetadata::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(MessageMetadata::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()

                        ->arrayNode('message_thread')
                            ->children()
                                ->scalarNode('interface')->defaultValue(\FOS\MessageBundle\Model\ThreadInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Thread::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()

                        ->arrayNode('message_thread_metadata')
                            ->children()
                                ->scalarNode('interface')->defaultValue(\FOS\MessageBundle\Model\ThreadMetadata::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(ThreadMetadata::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        $this->addTemplatesSection($rootNode);
        return $treeBuilder;
    }
}
