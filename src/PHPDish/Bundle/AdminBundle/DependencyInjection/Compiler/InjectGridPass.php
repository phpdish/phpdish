<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class InjectGridPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        //注册grid factory
        $this->registerGridFactory($container);
        //替换grid extension
//        $container->findDefinition('');
    }

    protected function registerGridFactory(ContainerBuilder $container)
    {
        $serviceIds = $container->findTaggedServiceIds('admin.grid_factory');

        $gridSourceFactory = $container->findDefinition('phpdish_admin.grid_factory');
        foreach ($serviceIds as $id => $tags) {
            $class = $container->findDefinition($id)
                ->getClass();
            $sourceClass = call_user_func([$class, 'getSourceClass']);
            $gridSourceFactory->addMethodCall('addFactory', [$sourceClass, new Reference($id)]);
        }
    }
}