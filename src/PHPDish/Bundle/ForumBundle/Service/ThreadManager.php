<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Overtrue\Pinyin\Pinyin;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Model\Thread;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class ThreadManager implements ThreadManagerInterface, ServiceManagerInterface
{

    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var Pinyin
     */
    protected $pinyin;

    protected $threadEntity;

    public function __construct($threadEntity, EntityManagerInterface $entityManager, Pinyin $pinyin)
    {
        $this->threadEntity = $threadEntity;
        $this->entityManager = $entityManager;
        $this->pinyin = $pinyin;
    }

    /**
     * {@inheritdoc}
     */
    public function findThreads(Criteria $criteria)
    {
        return $this->getThreadRepository()->createQueryBuilder('t')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }


    /**
     * {@inheritdoc}
     */
    public function findThreadsPager(Criteria $criteria, $page, $limit = null)
    {
        $qb = $this->getThreadRepository()->createQueryBuilder('t')
            ->addCriteria($criteria);
        return $this->createPaginator($qb->getQuery(), $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserFollowingThreads(UserInterface $user, $page, $limit = null, Criteria $criteria = null)
    {
        $qb = $this->getThreadRepository()->createQueryBuilder('t')
            ->leftJoin('t.followers', 'f')
            ->where('f.id = :userId')
            ->setParameter('userId', $user);
        $criteria && $qb->addCriteria($criteria);
        return $this->createPaginator($qb->getQuery(), $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findEnabledThreads($limit = null)
    {
        return $this->getThreadRepository()->findBy(['enabled' => true], [
            'followerCount' => 'desc'
        ], $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadById($id)
    {
        return $this->getThreadRepository()->find($id);
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
     * {@inheritdoc}
     */
    public function followThread(ThreadInterface $thread, UserInterface $user)
    {
        $thread->addFollower($user);
        $thread->setFollowerCount($thread->getFollowerCount() + 1);
        $this->saveThread($thread);
    }

    /**
     * {@inheritdoc}
     */
    public function unFollowThread(ThreadInterface $thread, UserInterface $user)
    {
        $thread->removeFollower($user);
        $thread->setFollowerCount($thread->getFollowerCount() - 1 ?: 0);
        $this->saveThread($thread);
    }

    /**
     * {@inheritdoc}
     */
    public function getThreadRepository()
    {
        return $this->entityManager->getRepository($this->threadEntity);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'threadEntity' => ThreadInterface::class
        ];
    }
}
