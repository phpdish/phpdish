<?php

namespace PHPDish\Bundle\CoreBundle\Search\Algolia;

use Algolia\SearchBundle\IndexManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\CoreBundle\Search\SearchProviderInterface;
use PHPDish\Bundle\ForumBundle\Entity\Topic;
use PHPDish\Bundle\PostBundle\Entity\Post;
use PHPDish\Bundle\UserBundle\Model\User;

class AlgoliaSearch implements SearchProviderInterface
{
    /**
     * @var IndexManagerInterface
     */
    protected $indexer;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(IndexManagerInterface $indexer, EntityManagerInterface $entityManager)
    {
        $this->indexer = $indexer;
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function queryUsers($term, array $options = [])
    {
        return $this->createPagerfanta($term, User::class, $options);
    }

    /**
     * {@inheritdoc}
     */
    public function queryPosts($term, array $options = [])
    {
        return $this->createPagerfanta($term, Post::class, $options);
    }

    /**
     * {@inheritdoc}
     */
    public function queryTopics($term, array $options = [])
    {
        return $this->createPagerfanta($term, Topic::class, $options);
    }


    /**
     * 创建分页
     *
     * @param string $keyword
     * @param string $entity
     * @param array $options
     * @return Pagerfanta
     */
    protected function createPagerfanta($keyword, $entity, $options)
    {
        $page = $options['page'] ?? 1;
        $length = $options['length'] ?? 10;
        unset($options['page']);
        unset($options['length']);

//        dump($page);
//        dump($length);exit;
        $adapter = new AlgoliaAdapter($keyword, $entity, $this->entityManager, $this->indexer, $options);
        $pagerfanta  = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($length)
            ->setCurrentPage($page);
        return $pagerfanta;
    }
}