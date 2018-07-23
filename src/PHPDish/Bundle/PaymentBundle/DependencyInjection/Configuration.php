<?php

namespace PHPDish\Bundle\PaymentBundle\DependencyInjection;

use PHPDish\Bundle\PaymentBundle\Model\Payment;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\Wallet;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('php_dish_payment');

        $rootNode->children()
            ->arrayNode('youzan')
                ->children()
                    ->scalarNode('client_id')->cannotBeEmpty()->end()
                    ->scalarNode('client_secret')->cannotBeEmpty()->end()
                    ->scalarNode('kdt_id')->cannotBeEmpty()->end()
                ->end()
            ->end();

        $this->addResourcesSection($rootNode);

        return $treeBuilder;
    }

    protected function addResourcesSection(ArrayNodeDefinition $rootNode)
    {
        $rootNode
            ->children()
                ->arrayNode('resources')
                    ->children()
                        ->arrayNode('payment')
                            ->children()
                                ->scalarNode('interface')->defaultValue(PaymentInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Payment::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                        ->arrayNode('wallet')
                            ->children()
                                ->scalarNode('interface')->defaultValue(WalletInterface::class)->cannotBeEmpty()->end()
                                ->scalarNode('model')->defaultValue(Wallet::class)->cannotBeEmpty()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();
    }
}
