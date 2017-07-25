<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostPersistEvent;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\PostBundle\Entity\Post;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;

class PostManager implements PostManagerInterface
{
    /**
     * 单页最大显示文章数量
     * @var int
     */
    const MAX_ITEM_NUM = 10;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var MarkdownParserInterface
     */
    protected $markdownParser;

    public function __construct(EventDispatcherInterface $eventDispatcher, EntityManagerInterface $entityManager, MarkdownParserInterface $markdownParser)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->entityManager = $entityManager;
        $this->markdownParser = $markdownParser;
    }

    /**
     * {@inheritdoc}
     */
    public function createPost(UserInterface $user)
    {
        $post = new Post();
        $post->setUser($user);
        return $post;
    }

    /**
     * {@inheritdoc}
     */
    public function savePost(PostInterface $post)
    {
        //Transform markdown format body
        if ($post->getOriginalBody()) {
            $post->setBody($this->markdownParser->transformMarkdown($post->getOriginalBody()));
        }
        $event = new PostPersistEvent($post);
        $this->eventDispatcher->dispatch(Events::POST_PRE_PERSIST, $event);

        if ($event->isPersistenceAborted()) {
            return false;
        }
        $this->entityManager->persist($post);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestPosts($page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('p')
            ->orderBy('p.createdAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findPostById($id)
    {
        return $this->getRepository()
            ->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserPosts(UserInterface $user, $page = 1, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('p')
            ->where(['p.user' => $user->getId()])
            ->orderBy('p.createdAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findRecommendPosts($page = 1, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('p')
            ->where('p.isRecommended = 1')
            ->orderBy('p.createdAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    protected function createPaginator(Query $query, $page, $limit = null)
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($query));
        $paginator->setCurrentPage($page);
        $paginator->setMaxPerPage($limit ?: static::MAX_ITEM_NUM);
        return $paginator;
    }

    /**
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Post');
    }
}