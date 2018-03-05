<?php

namespace PHPDish\Bundle\UserBundle;

use PHPDish\Bundle\UserBundle\DependencyInjection\Compiler\FOSCompatiblePass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishUserBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new FOSCompatiblePass());
    }
}
