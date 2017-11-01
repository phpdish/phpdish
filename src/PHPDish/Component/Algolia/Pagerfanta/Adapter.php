<?php

namespace PHPDish\Component\Algolia\Pagerfanta;

use Algolia\AlgoliaSearchBundle\SearchResult\SearchResult;
use Pagerfanta\Adapter\AdapterInterface;

class Adapter implements AdapterInterface
{
    /**
     * @var SearchResult
     */
    protected $searchResult;

    public function __construct($searchResult)
    {
        $this->searchResult = $searchResult;
    }

    /**
     * {@inheritdoc}
     */
    public function getNbResults()
    {
        return $this->searchResult->getNbHits();
    }

    /**
     * {@inheritdoc}
     */
    public function getSlice($offset, $length)
    {
        return $this->searchResult->getHits();
    }
}