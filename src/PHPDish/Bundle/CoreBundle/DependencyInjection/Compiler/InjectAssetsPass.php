<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler;


use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class InjectAssetsPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        //设置web assets package 为默认
        $container->setAlias('assets._default_package', 'assets._package_web');
        // 如果是url assets
        $this->processPackage($container, 'web');
        $this->processPackage($container, 'admin');
    }

    protected function processPackage(ContainerBuilder $container, $type)
    {
        $cdnHost = $container->getParameter('cdn.host.' . $type);
        if (strpos($cdnHost, 'http') === 0) {
            $version = $container->findDefinition('assets._package_' . $type)->getArgument(1);
            $package = new ChildDefinition('assets.url_package');
            $package
                ->setPublic(false)
                ->replaceArgument(0, $cdnHost)
                ->replaceArgument(1, $version);
        } else {
            $version = $container->findDefinition('assets._package_' . $type)->getArgument(1);
            $package = new ChildDefinition('assets.path_package');
            $package
                ->setPublic(false)
                ->replaceArgument(0, $cdnHost)
                ->replaceArgument(1, $version);
        }
        $container->setDefinition('assets._package_'.$type, $package);
    }
}