<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;

abstract class AbstractConfiguration
{
    /**
     * 添加模板模块配置
     *
     * @param ArrayNodeDefinition $rootNode
     */
    protected function addTemplatesSection(ArrayNodeDefinition $rootNode)
    {
        $rootNode
            ->children()
                ->scalarNode('templates_namespace')->defaultNull()->end()
                ->arrayNode('templates')
                    ->scalarPrototype()->end()
                ->end()
            ->end();
    }
}