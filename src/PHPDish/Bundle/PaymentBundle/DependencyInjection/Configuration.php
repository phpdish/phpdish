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

use PHPDish\Bundle\PaymentBundle\Model\Payment;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\Wallet;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractConfiguration;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration extends AbstractConfiguration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('phpdish_payment');

        $rootNode->children()
            ->arrayNode('youzan')
                ->children()
                    ->scalarNode('client_id')->cannotBeEmpty()->end()
                    ->scalarNode('client_secret')->cannotBeEmpty()->end()
                    ->scalarNode('kdt_id')->cannotBeEmpty()->end()
                ->end()
            ->end();

        $this->addResourcesSection($rootNode);
        $this->addTemplatesSection($rootNode);
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
