<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Servuce\PaginatorTrait;
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
        $topic->setUser($user);
        return $topic;
    }

    /**
     * {@inheritdoc}
     */
    public function saveTopic(TopicInterface $topic)
    {
        $this->entityManager->persist($topic);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicById($id)
    {
        return $this->getThreadRepository()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null)
    {
        $query = $this->getThreadRepository()->createQueryBuilder('t')
            ->where('t.threadId = :threadId')->setParameter('threadId', $thread->getId())
            ->orderBy('t.updatedAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * @return EntityRepository
     */
    protected function getThreadRepository()
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Topic');
    }
}