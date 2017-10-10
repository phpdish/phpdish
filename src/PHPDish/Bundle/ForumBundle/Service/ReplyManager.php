<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Reply;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\ReplyAtUserEvent;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Component\Mention\MentionParserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ReplyManager  implements ReplyManagerInterface
{
    use PaginatorTrait;
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $replyRepository;

    /**
     * @var MarkdownParserInterface
     */
    protected $markdownParser;

    /**
     * @var MentionParserInterface
     */
    protected $mentionParser;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        MarkdownParserInterface $markdownParser,
        MentionParserInterface $mentionParser
    ) {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->replyRepository = $entityManager->getRepository('PHPDishForumBundle:Reply');
        $this->markdownParser = $markdownParser;
        $this->mentionParser = $mentionParser;
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
        $body = $this->markdownParser->transformMarkdown($reply->getOriginalBody());
        $parsedBody = $this->mentionParser->parse($body)->getParsedBody();
        $reply->setUpdatedAt(Carbon::now())
            ->setBody($parsedBody);

        if (!$reply->getId()) {
            $reply->getTopic()->setReplyCount($reply->getTopic()->getReplyCount() + 1);

            //如果提及用户则触发事件
            $this->mentionParser->getMentionedUsers() && $this->eventDispatcher->dispatch(Events::REPLY_AT_USER, new ReplyAtUserEvent(
                $reply,
                $this->mentionParser->getMentionedUsers()
            ));
        }

        $this->entityManager->persist($reply);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null, Criteria $criteria = null)
    {
        $query = $this->replyRepository->createQueryBuilder('r')
            ->where('r.topic = :topicId')->setParameter('topicId', $topic->getId())
            ->addCriteria($criteria)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserReplies(UserInterface $user, $page, $limit = null)
    {
        $query = $this->replyRepository->createQueryBuilder('r')
            ->where('r.user = :userId')->setParameter('userId', $user->getId())
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findReplyById($id)
    {
        return $this->replyRepository->find($id);
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
}