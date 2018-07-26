<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\DependencyInjection\Compiler;


use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class InjectResourceConfigurationPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $this->injectTemplateNamespace($container);
    }

    protected function injectTemplateNamespace(ContainerBuilder $container)
    {
        if (!$container->hasParameter('phpdish.templates_namespace')) {
            return;
        }
        $resourceConfigurationIds = $container->findTaggedServiceIds('phpdish.resource_configuration');

        $defaultTemplatesNamespace = $container->getParameter('phpdish.templates_namespace');
        foreach ($resourceConfigurationIds as $resourceConfigurationId => $tags) {
            $container->findDefinition($resourceConfigurationId)
                ->addMethodCall('setDefaultTemplatesNamespaceIfNull', [$defaultTemplatesNamespace]);
        }
    }
}