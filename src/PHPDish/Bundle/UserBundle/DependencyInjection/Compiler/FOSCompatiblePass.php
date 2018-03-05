<?php

namespace PHPDish\Bundle\UserBundle\DependencyInjection\Compiler;

use PHPDish\Bundle\UserBundle\Controller\ChangePasswordController;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class FOSCompatiblePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if ($changePassword = $container->findDefinition('fos_user.change_password.controller')) {
//            $changePassword->setClass(ChangePasswordController::class);
        }
    }
}