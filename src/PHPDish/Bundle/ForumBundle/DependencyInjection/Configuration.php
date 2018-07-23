<?php

namespace PHPDish\Bundle\ForumBundle\DependencyInjection;

use PHPDish\Bundle\ForumBundle\Model\Reply;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\Thread;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\Topic;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
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
        return $treeBuilder;
    }
}
