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
use PHPDish\Component\Core\BodyProcessor\BodyProcessorInterface;

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
     * @var ReplyManagerInterface
     */
    protected $replyManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        BodyProcessorInterface $bodyProcessor,
        ReplyManagerInterface $replyManager
    ) {
        $this->entityManager = $entityManager;
        $this->bodyProcessor = $bodyProcessor;
        $this->replyManager = $replyManager;
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
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('thread', $thread->getId()))
            ->orderBy([
                'updatedAt' => 'DESC',
            ]);

        return $this->findTopics($criteria, $page, $limit);
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

        return $this->findTopics($criteria, $page, $limit);
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
            ->andWhere('t.enabled = :enabled')->setParameter('enabled', true)
            ->orderBy('t.replyCount', 'desc')
            ->addOrderBy('t.createdAt', 'desc')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function replyTopic(UserInterface $user, TopicInterface $topic, $body)
    {
        $reply = $this->replyManager->createReply($topic, $user);
        $reply->setOriginalBody($body);
        $this->replyManager->saveReply($reply);
        return $reply;
    }

    /**
     * @return EntityRepository
     */
    protected function getTopicRepository()
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
