<?php

namespace PHPDish\Bundle\CoreBundle;

use PHPDish\Bundle\CoreBundle\Application\Plugin\DependencyInjection\Compiler\RegisterPluginPass;
use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\AlgoliaPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishCoreBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new AlgoliaPass());
        $container->addCompilerPass(new RegisterPluginPass());
    }
}