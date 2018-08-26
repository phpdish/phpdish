<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PermissionBundle\DependencyInjection;

use PHPDish\Bundle\PermissionBundle\Model\Permission;
use PHPDish\Bundle\PermissionBundle\Model\PermissionInterface;
use PHPDish\Bundle\PermissionBundle\Model\PrivilegerInterface;
use PHPDish\Bundle\PermissionBundle\Model\Role;
use PHPDish\Bundle\PermissionBundle\Model\RoleInterface;
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
        $rootNode = $treeBuilder->root('phpdish_permission');

        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('privileger')
                            ->children()
                                ->scalarNode('interface')->defaultValue(PrivilegerInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('role')
                            ->children()
                                ->scalarNode('interface')->defaultValue(RoleInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Role::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('permission')
                            ->children()
                                ->scalarNode('interface')->defaultValue(PermissionInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Permission::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}