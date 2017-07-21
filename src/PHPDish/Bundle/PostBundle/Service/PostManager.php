<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostPersistEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\PostBundle\Entity\Post;

class PostManager implements PostManagerInterface
{
    const MAX_ITEM_NUM = 10;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(EventDispatcherInterface $eventDispatcher, EntityManagerInterface $entityManager)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->entityManager = $entityManager;
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
        return $this->entityManager->getRepository('PHPDishPostBundle:Post')
            ->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserPosts(UserInterface $user, $page = 1, $limit = null)
    {
        $query = $this->entityManager->getRepository('PHPDishPostBundle:Post')
            ->createQueryBuilder('p')
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
}