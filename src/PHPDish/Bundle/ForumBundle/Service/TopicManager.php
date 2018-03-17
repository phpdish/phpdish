<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Topic;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\VoteTopicEvent;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Component\Core\BodyProcessor\BodyProcessorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\GenericEvent;

class TopicManager implements TopicManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var BodyProcessorInterface
     */
    protected $bodyProcessor;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        BodyProcessorInterface $bodyProcessor
    ) {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->bodyProcessor = $bodyProcessor;
    }

    /**
     * {@inheritdoc}
     */
    public function createTopic(UserInterface $user)
    {
        $topic = new Topic();
        $now = Carbon::now();
        $topic->setUser($user)
            ->setRepliedAt($now)
            ->setCreatedAt($now)
            ->setLastReplyUser($user);

        return $topic;
    }

    /**
     * {@inheritdoc}
     */
    public function saveTopic(TopicInterface $topic)
    {
        $parsedBody = $this->bodyProcessor->process($topic->getOriginalBody());
        $topic->setUpdatedAt(Carbon::now())
            ->setBody($parsedBody);

        //给节点增加话题数
        if (!$topic->getId()) {
            foreach ($topic->getThreads() as $thread) {
                $thread->setTopicCount($thread->getTopicCount() + 1);
            }
        }
        $this->entityManager->persist($topic);
        $this->entityManager->flush();

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function blockTopic(TopicInterface $topic)
    {
        $topic->disable();
        $this->entityManager->persist($topic);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicById($id)
    {
        return $this->getTopicRepository()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null, Criteria $criteria = null)
    {
        $qb = $this->getTopicRepository()->createQueryBuilder('t')
            ->innerJoin('t.threads', 'th')
            ->where('th.id = :threadId')->setParameter('threadId', $thread);
        $criteria && $qb->addCriteria($criteria);

        return $this->createPaginator($qb->getQuery(), $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserTopics(UserInterface $user, $page, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('user', $user->getId()))
            ->orderBy([
                'createdAt' => 'DESC',
            ]);

        return $this->findTopicsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicsPager(Criteria $criteria, $page, $limit = null)
    {
        $query = $this->getTopicRepository()->createQueryBuilder('t')
            ->addCriteria($criteria)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopics(Criteria $criteria)
    {
        return $this->getTopicRepository()->createQueryBuilder('t')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findHotTopics(\DateTime $date, $limit)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->gt('createdAt', $date))
            ->andWhere(Criteria::expr()->eq('enabled', true))
            ->orderBy(['replyCount' => 'desc', 'createdAt' => 'desc'])
            ->setMaxResults($limit);

        return $this->findTopics($criteria);
    }

    /**
     * 创建查询关注话题下的帖子query
     * @param UserInterface $user
     * @param Criteria|null $criteria
     * @return \Doctrine\ORM\Query
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public function findFollowingThreadsTopicsQuery(UserInterface $user, Criteria $criteria = null)
    {
        $qb = $this->getTopicRepository()->createQueryBuilder('t')
            ->leftJoin('t.threads', 'tt')
            ->leftJoin('tt.followers', 'f')
            ->where('f.id = :userId')
            ->setParameter('userId', $user)
            ->orderBy('t.createdAt', 'desc');
        if ($criteria) {
            $qb->addCriteria($criteria);
        }
        return $qb->getQuery();
    }

    /**
     * {@inheritdoc}
     */
    public function findFollowingThreadsTopics(UserInterface $user, $page, $limit = null)
    {
        $query = $this->findFollowingThreadsTopicsQuery($user, Criteria::create()
            ->where(Criteria::expr()->eq('enabled', true))
        );
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function getUserTopicCount(UserInterface $user)
    {
        $qb = $this->getTopicRepository()->createQueryBuilder('p');
        $qb->select($qb->expr()->count('p'))
            ->where('p.enabled = :enabled')->setParameter('enabled', true)
            ->andWhere('p.user = :user')->setParameter('user', $user);
        return $qb->getQuery()->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function addVoter(TopicInterface $topic, UserInterface $user)
    {
        $topic->addVoter($user)
            ->addVoteCount();
        $this->saveTopic($topic);

        $event = new VoteTopicEvent($topic, $user);
        $this->eventDispatcher->dispatch(Events::TOPIC_VOTED, $event);

    }

    /**
     * {@inheritdoc}
     */
    public function removeVoter(TopicInterface $topic, UserInterface $user)
    {
        $topic->removeVoter($user)
            ->addVoteCount(-1);
        $this->saveTopic($topic);
    }

    /**
     * {@inheritdoc}
     */
    public function getTopicRepository()
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Topic');
    }

    /**
     * {@inheritdoc}
     */
    public function getMaxPerPage()
    {
        return 20;
    }
}
