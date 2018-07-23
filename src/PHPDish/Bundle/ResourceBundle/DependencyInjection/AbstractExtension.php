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

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

abstract class AbstractExtension extends Extension
{

    protected function registerResources(array $resources, ContainerBuilder $container) {

        $resolvedResources = $container->hasParameter('phpdish.resources')
            ? $container->getParameter('phpdish.resources') : [];

        $resolvedResources = array_merge($resolvedResources, [$this->getAlias() => $resources]);
        $container->setParameter('phpdish.resources', $resolvedResources);
    }
}