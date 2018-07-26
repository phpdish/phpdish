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

class InjectServiceManager implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasParameter('phpdish.resources')) {
            return;
        }
        $interfaceMapping= $this->getInterfacesMapping($container->getParameter('phpdish.resources'));
        $entitySubscriberIds = $container->findTaggedServiceIds('phpdish.entity_subscriber');

        foreach ($entitySubscriberIds as $id => $tags) {
            $entitySubscriber = $container->findDefinition($id);
            $class = $entitySubscriber->getClass();
            $entityMapping = call_user_func([$class, 'getSubscribedEntities']);

            foreach ($entityMapping  as $name => $interface) {
                if (!isset($interfaceMapping[$interface])) {
                    throw new \RuntimeException(sprintf('The model for "%s" is not defined', $interface));
                }
                $entitySubscriber->setArgument('$' . $name, $interfaceMapping[$interface]);
            }
        }
    }

    /**
     * @param array $resources
     *
     * @return array
     */
    private function getInterfacesMapping(array $resources): array
    {
        $interfaces = [];
        foreach ($resources as $alias => $resource) {
            foreach ($resource as $resourceItem) {
                $interfaces[$resourceItem['interface']] = $resourceItem['model'];
            }
        }
        return $interfaces;
    }
}