<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Reply;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Component\Mention\MentionParserInterface;

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

    public function __construct(EntityManagerInterface $entityManager, MarkdownParserInterface $markdownParser, MentionParserInterface $mentionParser)
    {
        $this->entityManager = $entityManager;
        $this->replyRepository = $entityManager->getRepository('PHPDishForumBundle:Reply');
        $this->markdownParser = $markdownParser;
        $this->mentionParser = $mentionParser;
    }

    /**
     * {@inheritdoc}
     */
    public function createReply(TopicInterface $topic, UserInterface $user)
    {
        $reply = new Reply();
        $reply->setTopic($topic)
            ->setUser($user)
            ->setCreatedAt(Carbon::now());
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
        $reply->getTopic()->setReplyCount($reply->getTopic()->getReplyCount() + 1);
        $this->entityManager->persist($reply);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null)
    {
        $query = $this->replyRepository->createQueryBuilder('r')
            ->where('r.topic = :topicId')->setParameter('topicId', $topic->getId())
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
}