<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PaymentBundle\DependencyInjection;

use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractExtension;
use Slince\YouzanPay\ApiContext;
use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

class PHPDishPaymentExtension extends AbstractExtension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        if (isset($config['youzan'])) {
            $container->setDefinition('phpdish.payment_gateway.youzan.api_context', new Definition(ApiContext::class, [
                $config['youzan']['client_id'],
                $config['youzan']['client_secret'],
                $config['youzan']['kdt_id']
            ]));
            if ($container->hasDefinition('phpdish.payment_gateway.youzan')) {
                $youzanPayDef = $container->getDefinition('phpdish.payment_gateway.youzan');
                $youzanPayDef->replaceArgument(0, new Reference('phpdish.payment_gateway.youzan.api_context'));
            }
        }

        //注册到资源管理
        $this->registerResources($config['resources'], $container);
        $this->registerResourcesConfiguration($config['resources'], $config['templates'], $config['templates_namespace'], $container);
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias()
    {
        return 'phpdish_payment';
    }
}
