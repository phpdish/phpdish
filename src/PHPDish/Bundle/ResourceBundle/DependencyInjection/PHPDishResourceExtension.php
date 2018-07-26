<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\DependencyInjection;

use PHPDish\Bundle\ResourceBundle\Controller\ResourceConfigurationInterface;
use PHPDish\Bundle\ResourceBundle\Service\EntitySubscriberInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class PHPDishResourceExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        if ($config['templates_namespace']) {
            $container->setParameter('phpdish.templates_namespace', $config['templates_namespace']);
        }
        // load default services
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yml');

        //AutoConfigure
        $container->registerForAutoconfiguration(ResourceConfigurationInterface::class)
            ->addTag('phpdish.resource_configuration');

        $container->registerForAutoconfiguration(EntitySubscriberInterface::class)
            ->addTag('phpdish.entity_subscriber');

        $container->registerForAutoconfiguration(ServiceManagerInterface::class)
            ->addTag('phpdish.service_manager');
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias()
    {
        return 'phpdish_resource';
    }
}