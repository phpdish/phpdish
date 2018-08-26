<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle;

use PHPDish\Bundle\CoreBundle\Application\Plugin\DependencyInjection\Compiler\RegisterPluginPass;
use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\AlgoliaPass;
use PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler\InjectAssetsPass;
use PHPDish\Bundle\CoreBundle\DependencyInjection\PHPDishCoreExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishCoreBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new AlgoliaPass());
        $container->addCompilerPass(new RegisterPluginPass());
        $container->addCompilerPass(new InjectAssetsPass());
    }

    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishCoreExtension();
        }
        return $this->extension;
    }
}