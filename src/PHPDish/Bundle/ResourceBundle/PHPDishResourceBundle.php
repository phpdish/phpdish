<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle;

use PHPDish\Bundle\ResourceBundle\Controller\ResourceConfigurationInterface;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\DoctrineTargetEntitiesResolverPass;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\InjectResourceConfigurationPass;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\InjectServiceManager;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\RegisterResourcePass;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\PHPDishResourceExtension;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishResourceBundle extends Bundle
{

    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new DoctrineTargetEntitiesResolverPass(), PassConfig::TYPE_BEFORE_OPTIMIZATION, 1);
        $container->addCompilerPass(new RegisterResourcePass());
        $container->addCompilerPass(new InjectResourceConfigurationPass());
        $container->addCompilerPass(new InjectServiceManager());
    }

    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishResourceExtension();
        }
        return $this->extension;
    }
}