<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Entity\Topic;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Component\Mention\MentionParserInterface;

class TopicManager implements TopicManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

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
        $this->markdownParser = $markdownParser;
        $this->mentionParser = $mentionParser;
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
        $body = $this->markdownParser->transformMarkdown($topic->getOriginalBody());
        $parsedBody = $this->mentionParser->parse($body)->getParsedBody();
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
        $criteria = Criteria::create()->where(Criteria::expr()->eq('thread', $thread->getId()))
            ->orderBy([
                'updatedAt' => 'DESC'
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
                'createdAt' => 'DESC'
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
//        echo $date->format(\DateTime::ATOM);exit;
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