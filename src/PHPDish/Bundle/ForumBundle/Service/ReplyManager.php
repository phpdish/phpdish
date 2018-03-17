<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Reply;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\ReplyMentionUserEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteReplyEvent;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Component\Core\BodyProcessor\BodyProcessorInterface;
use PHPDish\Component\Mention\MentionParserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ReplyManager implements ReplyManagerInterface
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
    public function createReply(TopicInterface $topic, UserInterface $user = null)
    {
        $reply = new Reply();
        $reply->setTopic($topic)
            ->setCreatedAt(Carbon::now());
        $user && $reply->setUser($user);

        return $reply;
    }

    /**
     * {@inheritdoc}
     */
    public function saveReply(ReplyInterface $reply)
    {
        $parsedBody = $this->bodyProcessor->process($reply->getOriginalBody());
        $reply->setUpdatedAt(Carbon::now())
            ->setBody($parsedBody);

        if ($new = !$reply->getId()) {
            $reply->getTopic()->setReplyCount($reply->getTopic()->getReplyCount() + 1);
            $reply->getTopic()->setRepliedAt(Carbon::now());
            $reply->getTopic()->setLastReplyUser($reply->getUser());
        }

        $this->entityManager->persist($reply);
        $this->entityManager->flush();

        //如果是新生成的并且提及了用户则触发事件
        $mentionParser = $this->bodyProcessor->getMentionParser();
        $new && $mentionParser->getMentionedUsers() && $this->eventDispatcher->dispatch(Events::USER_MENTIONED_REPLY, new ReplyMentionUserEvent(
            $reply,
            $mentionParser->getMentionedUsers()
        ));

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findReplies(Criteria $criteria)
    {
        return $this->getReplyRepository()->createQueryBuilder('r')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findRepliesPager(Criteria $criteria, $page, $limit = null)
    {
        $qb = $this->getReplyRepository()->createQueryBuilder('r')
            ->addCriteria($criteria);
        return $this->createPaginator($qb->getQuery(), $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null, Criteria $criteria = null)
    {
        $qb = $this->getReplyRepository()->createQueryBuilder('r')
            ->where('r.topic = :topicId')->setParameter('topicId', $topic->getId());
        if ($criteria) {
            $qb->addCriteria($criteria);
        }
        $query = $qb->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserReplies(UserInterface $user, $page, $limit = null, Criteria $criteria = null)
    {
        $qb = $this->getReplyRepository()->createQueryBuilder('r')
            ->where('r.user = :userId')->setParameter('userId', $user->getId());
        if ($criteria) {
            $qb->addCriteria($criteria);
        }
        $query = $qb->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findReplyById($id)
    {
        return $this->getReplyRepository()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function blockReply(ReplyInterface $reply)
    {
        $reply->disable();
        $topic = $reply->getTopic();
        $topic->setReplyCount($topic->getReplyCount() > 1 ? $topic->getReplyCount() - 1 : 0);
        $this->entityManager->persist($reply);
        $this->entityManager->flush();

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function replyTopic(UserInterface $user, TopicInterface $topic, $body)
    {
        $reply = $this->createReply($topic, $user);
        $reply->setOriginalBody($body);
        $this->saveReply($reply);
        return $reply;
    }

    /**
     * {@inheritdoc}
     */
    public function addVoter(ReplyInterface $reply, UserInterface $user)
    {
        $reply->addVoter($user)
            ->addVoteCount();
        $this->entityManager->persist($reply);
        $this->entityManager->flush();

        //触发事件
        $event = new VoteReplyEvent($reply->getTopic(), $reply, $user);
        $this->eventDispatcher->dispatch(Events::REPLY_VOTED, $event);
    }

    /**
     * {@inheritdoc}
     */
    public function removeVoter(ReplyInterface $reply, UserInterface $user)
    {
        $reply->removeVoter($user)
            ->addVoteCount(-1);
        $this->entityManager->persist($reply);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getReplyRepository(): EntityRepository
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Reply');;
    }
}
