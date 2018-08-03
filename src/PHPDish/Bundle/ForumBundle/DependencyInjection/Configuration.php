<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\DependencyInjection;

use PHPDish\Bundle\ForumBundle\Model\Reply;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\Thread;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\Topic;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
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
        $rootNode = $treeBuilder->root('phpdish_forum');

        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('topic')
                            ->children()
                                ->scalarNode('interface')->defaultValue(TopicInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Topic::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('reply')
                            ->children()
                                ->scalarNode('interface')->defaultValue(ReplyInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Reply::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('thread')
                            ->children()
                                ->scalarNode('interface')->defaultValue(ThreadInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Thread::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        $this->addTemplatesSection($rootNode);
        return $treeBuilder;
    }
}
