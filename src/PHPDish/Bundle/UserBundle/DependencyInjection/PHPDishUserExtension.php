<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Bundle\UserBundle\DependencyInjection;

use PHPDish\Bundle\ResourceBundle\DependencyInjection\AbstractExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @see http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class PHPDishUserExtension extends AbstractExtension
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

        $this->registerResources($config['resources'], $container);
        $this->registerResourcesConfiguration($config['resources'], $config['templates'], $config['templates_namespace'], $container);

        //process oauth provider
        $oauthUserProvider = $container->findDefinition('phpdish_user.oauth.user_provider');
        $oauthUserProvider->replaceArgument(2, new Reference($config['avatar_downloader']));
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias()
    {
        return 'phpdish_user';
    }
}
