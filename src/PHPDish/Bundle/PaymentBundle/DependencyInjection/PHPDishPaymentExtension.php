<?php

namespace PHPDish\Bundle\PaymentBundle\DependencyInjection;

use Slince\YouzanPay\ApiContext;
use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class PHPDishPaymentExtension extends Extension
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
    }
}
