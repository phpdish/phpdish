<?php

namespace PHPDish\Bundle\ResourceBundle;

use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\DoctrineTargetEntitiesResolverPass;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler\InjectTemplatePass;
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
        $container->addCompilerPass(new InjectTemplatePass());
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