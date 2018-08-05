<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * 注册所有的资源到服务对象
 */
class RegisterResourcePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (
            !$container->hasParameter('phpdish.resources')
            || !$container->hasDefinition('phpdish_resource.resource_registry')
        ) {
            return;
        }
        $resourceRegistry = $container->findDefinition('phpdish_resource.resource_registry');
        $resourceRegistry->setArgument(0, $container->getParameter('phpdish.resources'));
    }
}