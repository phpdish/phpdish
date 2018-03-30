<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Argument\ServiceClosureArgument;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;

class RegisterPluginListenerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $listenerRegistry = $container->getParameter('phpdish.plugin.listener_registry');
        $eventDispatcherDefinition = $container->findDefinition('event_dispatcher');

        foreach ($listenerRegistry as $index => $listener) {
            if (is_array($listener)) {
                list($eventName, $listener, $priority) = $listener;

                if (is_array($listener)) {
                    list($class, $method) = $listener;
                } else {
                    $class = $listener;
                    $method = '__invoke';
                }

                $id = 'phpdish.plugin.listener_' . $index;
                $listenerDefinition = new Definition($class);
                $listenerDefinition->setAutowired(true);
                $container->setDefinition($id, $listenerDefinition);

                $eventDispatcherDefinition->addMethodCall('addListener', [
                    $eventName,
                    [new ServiceClosureArgument(new Reference($id)), $method],
                    $priority
                ]);

            } else {
                $id = 'phpdish.plugin.subscriber_' . $index;
                $listenerDefinition = new Definition($listener);
                $listenerDefinition->setAutowired(true);
                $container->setDefinition($id, $listenerDefinition);

                $eventDispatcherDefinition->addMethodCall('addSubscriber', [
                    new Reference($id)
                ]);
            }
        }

        $container->getParameterBag()->remove('phpdish.plugin.listener_registry');
    }
}