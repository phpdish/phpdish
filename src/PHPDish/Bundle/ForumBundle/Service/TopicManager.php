<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Topic;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class TopicManager implements TopicManagerInterface
{
    use PaginatorTrait;

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
        $topic->setUpdatedAt(Carbon::now());
        $this->entityManager->persist($topic);
        $this->entityManager->flush();
        return true;
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
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null)
    {
        $query = $this->getTopicRepository()->createQueryBuilder('t')
            ->where('t.thread = :threadId')->setParameter('threadId', $thread->getId())
            ->orderBy('t.updatedAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserTopics(UserInterface $user, $page, $limit = null)
    {
        $query = $this->getTopicRepository()->createQueryBuilder('t')
            ->where('t.user = :userId')->setParameter('userId', $user->getId())
            ->orderBy('t.createdAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopics(Criteria $criteria, $page, $limit = null)
    {
        $query = $this->getTopicRepository()->createQueryBuilder('t')
            ->addCriteria($criteria)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }


    /**
     * {@inheritdoc}
     */
    public function findHotTopics(\DateTime $date, $limit)
    {
        return $this->getTopicRepository()->createQueryBuilder('t')
            ->where('t.createdAt > :beginDate')->setParameter('beginDate', $date)
            ->orderBy('t.replyCount', 'desc')
            ->addOrderBy('t.createdAt', 'desc')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return EntityRepository
     */
    protected function getTopicRepository()
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Topic');
    }
}