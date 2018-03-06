<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use PHPDish\Bundle\PostBundle\Entity\Category;
use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;
use PHPDish\Bundle\PostBundle\Event\CategoryPersistEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Slince\YouzanPay\Api\QRCode;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Router;

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

    /**
     * @var PaymentManagerInterface
     */
    protected $paymentManager;

    /**
     * @var Router
     */
    protected $router;

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        PaymentManagerInterface $paymentManager,
        Router $router
    )
    {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->paymentManager = $paymentManager;
        $this->router = $router;
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
    public function findCategoryById($id)
    {
        return $this->getRepository()->find($id);
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
            $message = $category->isBook() ? sprintf('购买电子书: <a href="%s">%s</a>',
                $this->router->generate('book_view', ['slug' => $category->getSlug()]),
                $category->getName()
            ) : sprintf('订阅专栏: <a href="%s">%s</a>',
                $this->router->generate('category_view', ['slug' => $category->getSlug()]),
                $category->getName()
            );
            //创建交易
            $payment = $this->paymentManager->createPayment($user)
                ->setAmount($category->getCharge())
                ->setDescription($message)
                ->setType($category->isBook() ? PaymentInterface::TYPE_BUY_BOOK
                    : PaymentInterface::TYPE_FOLLOW_CATEGORY)
                ->setPayableId($category->getId());


            $qrCode = $this->paymentManager->charge($payment);
        } else {
            throw new \LogicException('The category is free');
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
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Category');
    }
}
