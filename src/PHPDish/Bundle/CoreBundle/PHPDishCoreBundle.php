<?php

namespace PHPDish\Bundle\CoreBundle;

use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\AlgoliaPass;
use PHPDish\Bundle\CoreBundle\Plugin\Finder\PluginFinder;
use PHPDish\Bundle\CoreBundle\Plugin\PluginManager;
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

        //注册轻便版插件
        $pluginFinder = new PluginFinder($container->getParameter('kernel.project_dir'));
        $pluginManager = new PluginManager($container);
        $pluginManager->installAll($pluginFinder->findAll());
    }
}