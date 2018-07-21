<?php

namespace PHPDish\Bundle\UserBundle;

use PHPDish\Bundle\ResourceBundle\AbstractBundle;
use PHPDish\Bundle\UserBundle\DependencyInjection\Compiler\FOSCompatiblePass;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class PHPDishUserBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new FOSCompatiblePass());
    }

    /**
     * {@inheritdoc}
     */
    protected function getModelNamespace()
    {
        return 'PHPDish\Bundle\UserBundle\Model';
    }
}
