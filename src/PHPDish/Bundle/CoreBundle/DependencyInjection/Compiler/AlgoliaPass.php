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
        //没有设置账号的不开启
        if (!$container->hasParameter('algolia.application_id') ||
            ($container->getParameter('algolia.application_id') === 'phpdish'
            && $container->getParameter('algolia.api_key') === 'phpdish')
        ) {
            $container->setAlias('search.engine', 'search.engine.null');
            $container->findDefinition('search.search_indexer_subscriber')
                ->clearTag('doctrine.event_subscriber')
                ->clearTag('doctrine_mongodb.odm.event_subscriber');
            $container->setParameter('algolia_search.doctrineSubscribedEvents', []);
        }
    }
}