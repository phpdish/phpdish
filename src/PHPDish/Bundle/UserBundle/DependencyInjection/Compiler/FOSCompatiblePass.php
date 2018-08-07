<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\DependencyInjection\Compiler;

use PHPDish\Bundle\UserBundle\Controller\ResettingController;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class FOSCompatiblePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if ($changePassword = $container->findDefinition('fos_user.resetting.controller')) {
            $changePassword->setClass(ResettingController::class)
                ->addMethodCall('setResourceConfiguration', [
                    new Reference('phpdish_resource.configuration.phpdish_user')
                ]);
        }
    }
}