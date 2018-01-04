<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Overtrue\Pinyin\Pinyin;
use PHPDish\Bundle\ForumBundle\Entity\Thread;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;

class ThreadManager implements ThreadManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var Pinyin
     */
    protected $pinyin;

    public function __construct(EntityManagerInterface $entityManager, Pinyin $pinyin)
    {
        $this->entityManager = $entityManager;
        $this->pinyin = $pinyin;
    }

    /**
     * {@inheritdoc}
     */
    public function findEnabledThreads($limit = null)
    {
        return $this->getThreadRepository()->findBy(['enabled' => true], null, $limit);
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
    public function createThread()
    {
        $thread = new Thread();
        $thread->setCreatedAt(Carbon::now());
        return $thread;
    }

    /**
     * {@inheritdoc}
     */
    public function saveThread(ThreadInterface $thread)
    {
        $this->entityManager->persist($thread);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function createThreadsByNames($names)
    {
        $threads = [];
        foreach ($names as $name) {
            $thread = $this->createThread();
            $thread->setName($name)
                ->setSlug($this->pinyin->permalink($name))
                ->setDescription($name);
            $threads[] = $thread;
        }
        return $threads;
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
