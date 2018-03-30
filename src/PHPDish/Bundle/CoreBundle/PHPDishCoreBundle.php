<?php

namespace PHPDish\Bundle\CoreBundle;

use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\AlgoliaPass;
use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\RegisterPluginListenerPass;
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
        $container->addCompilerPass(new RegisterPluginListenerPass());
    }
}