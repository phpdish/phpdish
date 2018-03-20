<?php

namespace PHPDish\Bundle\CoreBundle\Search\Algolia;

use Algolia\SearchBundle\IndexManagerInterface;
use Pagerfanta\Adapter\AdapterInterface;

class AlgoliaAdapter implements AdapterInterface
{
    protected $query;

    protected $entityClass;

    protected $entityManager;

    /**
     * @var IndexManagerInterface
     */
    protected $indexManager;

    protected $options;

    public function __construct($query, $entityClass, $entityManager, $indexManager, array $options)
    {
        $this->query = $query;
        $this->entityClass = $entityClass;
        $this->entityManager = $entityManager;
        $this->indexManager = $indexManager;
        $this->options = $options;
    }

    /**
     * {@inheritdoc}
     */
    public function getNbResults()
    {
        return $this->indexManager->count(
            $this->query,
            $this->entityClass,
            $this->options
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getSlice($offset, $length)
    {
        return array_filter($this->indexManager->search(
            $this->query,
            $this->entityClass,
            $this->entityManager,
            $offset / $length + 1,
            $length,
            $this->options
        ));
    }
}