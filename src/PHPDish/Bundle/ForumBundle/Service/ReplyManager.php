<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Reply;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;

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

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->replyRepository = $entityManager->getRepository('PHPDishForumBundle:Reply');
    }

    /**
     * {@inheritdoc}
     */
    public function createReply(TopicInterface $topic)
    {
        $reply = new Reply();
        $reply->setTopic($topic);
        return $reply;
    }

    /**
     * {@inheritdoc}
     */
    public function saveReply(ReplyInterface $reply)
    {
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
}