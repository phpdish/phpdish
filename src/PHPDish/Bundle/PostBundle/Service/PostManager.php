<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostPersistEvent;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\PostBundle\Entity\Post;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;

class PostManager implements PostManagerInterface
{
    use PaginatorTrait;

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
        $post->setUser($user)->setCreatedAt(Carbon::now());
        return $post;
    }

    /**
     * {@inheritdoc}
     */
    public function savePost(PostInterface $post)
    {
        $post->setUpdatedAt(Carbon::now());
        if (!$post->getId()) {
            $post->getCategory()->setPostCount($post->getCategory()->getPostCount() + 1);
        }
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
    public function findPostById($id)
    {
        return $this->getRepository()
            ->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findPosts(Criteria $criteria, $page = 1, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }


    /**
     * {@inheritdoc}
     */
    public function findUserPosts(UserInterface $user, $page = 1, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('user', $user->getId()))->orderBy(['createdAt' => 'desc']);
        return $this->findPosts($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryPosts(CategoryInterface $category, $page  = 1, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('category', $category->getId()));
        return $this->findPosts($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestPosts($page, $limit = null)
    {
        $criteria = Criteria::create()->orderBy(['createdAt'  => 'desc']);
        return $this->findPosts($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findPostsByCriteria(Criteria $criteria)
    {
        return $this->getRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery()->getResult();
    }

    /**
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Post');
    }
}