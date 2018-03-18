<?php

namespace PHPDish\Bundle\CoreBundle\Search;

use Algolia\AlgoliaSearchBundle\Indexer\Indexer;
use Algolia\AlgoliaSearchBundle\SearchResult\SearchResult;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Pagerfanta\Pagerfanta;
use PHPDish\Component\Algolia\Pagerfanta\Adapter;

class AlgoliaSearch implements SearchServiceInterface
{
    /**
     * @var Indexer
     */
    protected $indexer;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    public function __construct(Indexer $indexer, EntityManagerInterface $entityManager)
    {
        $this->indexer = $indexer;
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function queryUsers($term, array $options = [])
    {
        return $this->createPagerfanta(
            $this->searcFromAlgolia($term, 'PHPDishUserBundle:User', $options)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function queryPosts($term, array $options = [])
    {
        return $this->createPagerfanta(
            $this->searcFromAlgolia($term, 'PHPDishPostBundle:Post', $options)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function queryTopics($term, array $options = [])
    {
        return $this->createPagerfanta(
            $this->searcFromAlgolia($term, 'PHPDishForumBundle:Topic', $options)
        );
    }

    /**
     * 从Algolia获取搜索结果
     *
     * @param string $keyword
     * @param string $entity
     * @param array $options
     * @return SearchResult
     */
    protected function searcFromAlgolia($keyword, $entity, $options)
    {
        return $this->indexer->search(
            $this->entityManager,
            $entity,
            $keyword,
            $options
        );
    }

    /**
     * 创建分页
     *
     * @param SearchResult $searchResult
     * @return Pagerfanta
     */
    protected function createPagerfanta(SearchResult $searchResult)
    {
        $adapter = new Adapter($searchResult);
        $pagerfanta  = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($searchResult->getHitsPerPage())
            ->setCurrentPage($searchResult->getPage() + 1);
        return $pagerfanta;
    }
}