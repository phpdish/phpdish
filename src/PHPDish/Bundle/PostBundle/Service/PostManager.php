<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
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

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        MarkdownParserInterface $markdownParser
    ) {
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
        return $this->getPostRepository()
            ->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findPosts(Criteria $criteria)
    {
        return $this->getPostRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findPostsPager(Criteria $criteria, $page = 1, $limit = null)
    {
        $query = $this->getPostRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserEnabledPosts(UserInterface $user, $page = 1, $limit = null)
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq('user', $user))
            ->andWhere(Criteria::expr()->eq('enabled', true))
            ->orderBy(['createdAt' => 'desc']);

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryPosts(CategoryInterface $category, $page = 1, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('category', $category->getId()));

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestEnabledPosts($page, $limit = null)
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq('enabled', true))
            ->andWhere(Criteria::expr()->neq('body', ''))
            ->orderBy(['createdAt' => 'desc']);

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function blockPost(PostInterface $post)
    {
        $post->disable();
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function increasePostViews(PostInterface $post, $views = 1)
    {
        $post->setViewCount($post->getViewCount() + $views);
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getPostRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Post');
    }
}
