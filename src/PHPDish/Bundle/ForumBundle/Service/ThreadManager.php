<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class ThreadManager implements ThreadManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function findEnabledThreads()
    {
        return $this->getThreadRepository()->findBy(['enabled' => true]);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadBySlug($slug)
    {
        return $this->getThreadRepository()->findOneBy(['slug' => $slug]);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadsByNames($names)
    {
        $qb = $this->getThreadRepository()->createQueryBuilder('t');
        return $qb->where($qb->expr()->in('t.name', $names))
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function searchThreads($term)
    {
        $qb = $this->getThreadRepository()->createQueryBuilder('t');
        return $qb->where($qb->expr()->like('t.name', ':term'))
            ->orWhere($qb->expr()->like('t.description', ':term'))
            ->setParameter('term', "%{$term}%")
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return EntityRepository
     */
    protected function getThreadRepository()
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Thread');
    }
}
