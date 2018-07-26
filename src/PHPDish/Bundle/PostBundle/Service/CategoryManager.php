<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use PHPDish\Bundle\PostBundle\Model\Category;
use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;
use PHPDish\Bundle\PostBundle\Event\CategoryPersistEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Translation\TranslatorInterface;

class CategoryManager implements CategoryManagerInterface, ServiceManagerInterface
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

    /**
     * @var PaymentManagerInterface
     */
    protected $paymentManager;

    /**
     * @var Router
     */
    protected $router;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    protected $categoryEntity;

    public function __construct(
        $categoryEntity,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        PaymentManagerInterface $paymentManager,
        Router $router,
        TranslatorInterface $translator
    )
    {
        $this->categoryEntity = $categoryEntity;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->paymentManager = $paymentManager;
        $this->router = $router;
        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    public function findCategories(Criteria $criteria)
    {
        return $this->getCategoryRepository()->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoriesPager(Criteria $criteria, $page, $limit = null)
    {
        $query = $this->getCategoryRepository()->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findAllEnabledCategories()
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('enabled', true));
        return $this->findCategories($criteria);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserCategories(UserInterface $user)
    {
        return $this->createGetUserCategoriesQueryBuilder($user)
            ->andWhere('c.isBook = :isBook')->setParameter('isBook', false)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function getUserCategoriesNumber(UserInterface $user)
    {
        $qb = $this->createGetUserCategoriesQueryBuilder($user)
            ->andWhere('c.isBook = :isBook')->setParameter('isBook', false);

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
    public function createGetUserCategoriesQueryBuilder(UserInterface $user)
    {
        return $this->getCategoryRepository()->createQueryBuilder('c')
            ->where('c.creator = :userId')->setParameter('userId', $user->getId())
            ->orderBy('c.createdAt', 'desc');
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryBySlug($slug)
    {
        return $this->getCategoryRepository()->findOneBy([
            'slug' => $slug,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryById($id)
    {
        return $this->getCategoryRepository()->find($id);
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
    public function payForCategory(CategoryInterface $category, UserInterface $user)
    {
        if ($category->isCharging()) {
            //发起付费
            $message = $category->isBook() ?
                $this->translator->trans('book.buy_book', [
                    '%book%' => sprintf('<a href="%s">%s</a>',
                        $this->router->generate('book_view', ['slug' => $category->getSlug()]),
                        $category->getName()
                    )
                ]):
                $this->translator->trans('category.subscribe_category', [
                    '%category%' => sprintf('<a href="%s">%s</a>',
                        $this->router->generate('category_view', ['slug' => $category->getSlug()]),
                        $category->getName()
                    )
                ]);

            //创建交易
            $payment = $this->paymentManager->createPayment($user)
                ->setAmount($category->getCharge())
                ->setDescription($message)
                ->setType($category->isBook() ? PaymentInterface::TYPE_BUY_BOOK
                    : PaymentInterface::TYPE_FOLLOW_CATEGORY)
                ->setPayableId($category->getId());


            $qrCode = $this->paymentManager->charge($payment);
        } else {
            throw new \LogicException($this->translator->trans('category.is_free'));
        }
        return $qrCode;
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
     * {@inheritdoc}
     */
    public function getCategoryRepository()
    {
        return $this->entityManager->getRepository($this->categoryEntity);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'categoryEntity' => CategoryInterface::class
        ];
    }
}
