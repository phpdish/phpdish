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

use PHPDish\Bundle\ResourceBundle\Metadata\ResourceRegistry;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

class RegisterResourcePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasParameter('phpdish.resources')) {
            return;
        }
        $resourceRegistry = new Definition(ResourceRegistry::class);
        $resourceRegistry->setArgument(0, $container->getParameter('phpdish.resources'));

        $container->setDefinition('phpdish.resource_registry', $resourceRegistry);
    }
}