<?php

namespace PHPDish\Bundle\PostBundle\DependencyInjection;

use PHPDish\Bundle\PostBundle\Model\Category;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\Comment;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\Post;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractConfiguration;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
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
        $rootNode = $treeBuilder->root('phpdish_post');

        $this->addResourcesSection($rootNode);
        $this->addTemplatesSection($rootNode);

        return $treeBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function addResourcesSection(ArrayNodeDefinition $rootNode)
    {
        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('post')
                            ->children()
                                ->scalarNode('interface')->defaultValue(PostInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Post::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('comment')
                            ->children()
                                ->scalarNode('interface')->defaultValue(CommentInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Comment::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('category')
                            ->children()
                                ->scalarNode('interface')->defaultValue(CategoryInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Category::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();
    }
}
