<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Entity\Category;
use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;
use PHPDish\Bundle\PostBundle\Event\CategoryPersistEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CategoryManager implements CategoryManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    public function __construct(EntityManagerInterface $entityManager, EventDispatcherInterface $eventDispatcher)
    {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * {@inheritdoc}
     */
    public function findAllEnabledCategories()
    {
        return $this->getRepository()->createQueryBuilder('c')
            ->where('c.enabled = 1')
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findUserCategories(UserInterface $user)
    {
        return $this->createGetUserCategoriesQueryBuilder($user)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function getUserCategoriesNumber(UserInterface $user)
    {
        $qb = $this->createGetUserCategoriesQueryBuilder($user);

        return (int)$qb->select($qb->expr()->count('c'))
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * 创建用户专栏查询的query builder.
     *
     * @param UserInterface $user
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function createGetUserCategoriesQueryBuilder(UserInterface $user)
    {
        return $this->getRepository()->createQueryBuilder('c')
            ->where('c.creator = :userId')->setParameter('userId', $user->getId())
            ->orderBy('c.createdAt', 'desc');
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryBySlug($slug)
    {
        return $this->getRepository()->findOneBy([
            'slug' => $slug,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function addManagerForCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->addManager($user);

        return $this->saveCategory($category);
    }

    /**
     * {@inheritdoc}
     */
    public function followCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->addFollower($user);
        $category->setFollowerCount($category->getFollowerCount() + 1);
        $result = $this->saveCategory($category);
        //触发订阅事件
        $this->eventDispatcher->dispatch(Events::CATEGORY_FOLLOWED, new CategoryFollowedEvent($category, $user));

        return $result;
    }

    /**
     * {@inheritdoc}
     */
    public function unFollowCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->removeFollower($user);
        $category->setFollowerCount($category->getFollowerCount() - 1 ?: 0);

        return $this->saveCategory($category);
    }

    /**
     * {@inheritdoc}
     */
    public function createCategory(UserInterface $user)
    {
        $category = new Category();
        $category->setCreator($user)
            ->setCreatedAt(Carbon::now());

        return $category;
    }

    /**
     * {@inheritdoc}
     */
    public function saveCategory(CategoryInterface $category)
    {
        $event = new CategoryPersistEvent($category);
        $this->eventDispatcher->dispatch(Events::CATEGORY_PRE_PERSIST, $event);
        if ($event->isPersistenceAborted()) {
            return false;
        }

        $category->setUpdatedAt(Carbon::now());
        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return true;
    }

    /**
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Category');
    }
}
