<?php

namespace PHPDish\Bundle\CoreBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class AlgoliaPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if ($algoliaClient = $container->findDefinition('algolia_client')) {
            $algoliaClient->setArguments([
                '%algolia.application_id%',
                '%algolia.api_key%',
            ]);
        }
    }
}