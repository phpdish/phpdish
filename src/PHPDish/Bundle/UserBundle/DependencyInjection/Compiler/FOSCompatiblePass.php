<?php

namespace PHPDish\Bundle\UserBundle\DependencyInjection\Compiler;

use PHPDish\Bundle\UserBundle\Controller\ResettingController;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class FOSCompatiblePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if ($changePassword = $container->findDefinition('fos_user.resetting.controller')) {
            $changePassword->setClass(ResettingController::class);
        }
    }
}