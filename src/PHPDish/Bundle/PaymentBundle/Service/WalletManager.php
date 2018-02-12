<?php

namespace PHPDish\Bundle\PaymentBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PaymentBundle\Entity\Payment;
use PHPDish\Bundle\PaymentBundle\Entity\Wallet;
use PHPDish\Bundle\PaymentBundle\Entity\WalletHistory;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Router;

class WalletManager implements WalletManagerInterface
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
     * @var UserManagerInterface
     */
    protected $userManager;

    /**
     * @var Router
     */
    protected $router;

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        UserManagerInterface $userManager
    )
    {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->userManager = $userManager;
    }

    /**
     * {@inheritdoc}
     */
    public function createWallet(UserInterface $user)
    {
        $wallet = new Wallet();
        $now = Carbon::now();
        $wallet->setUser($user)
            ->setCreatedAt($now)
            ->setUpdatedAt($now);
        return $wallet;
    }

    /**
     * {@inheritdoc}
     */
    public function saveWallet(WalletInterface $wallet)
    {
        $this->entityManager->persist($wallet);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function addHistory(WalletInterface $wallet, WalletHistoryInterface $history)
    {
        $wallet->addHistory($history);
        //收入的话，增加钱包余额
        if ($history->isIncome()) {
            $wallet->setAmount(
                $wallet->getAmount() + $history->getAmount()
            );
        }
        $this->saveWallet($wallet);
    }

    /**
     * {@inheritdoc}
     */
    public function createHistory()
    {
        $history = new Payment();
        $now = Carbon::now();
        $history->setUpdatedAt($now)->setCreatedAt($now);
        return $history;
    }

    /**
     * {@inheritdoc}
     */
    public function getUserWallet(UserInterface $user)
    {
        $wallet = $this->getWalletRepository()->findOneBy([
            'user' => $user
        ]);
        if (!$wallet) {
            $wallet = $this->createWallet($user);
            $this->saveWallet($wallet);
        }
        $wallet->setUser($user);
        return $wallet;
    }

    /**
     * {@inheritdoc}
     */
    public function addCategoryIncome(UserInterface $user, CategoryInterface $category, UserInterface $follower, $amount = null)
    {
        $wallet = $this->getUserWallet($user);
        $history = $this->createHistory();

        if ($category->isBook()) {
            $description = sprintf("<a href=\"%s\">%s</a> 购买了你的书籍 <a href=\"%s\">《%s》</a>",
                    $this->router->generate('user_view', ['username' => $follower->getUsername()]),
                    $follower->getUsername(),
                    $this->router->generate('book_view', ['slug' => $category->getSlug()]),
                    $category->getName()
            );
        } else {
            $description = sprintf("<a href=\"%s\">%s</a> 订阅了你的专栏 <a href=\"%s\">《%s》</a>",
                $this->router->generate('user_view', ['username' => $follower->getUsername()]),
                $follower->getUsername(),
                $this->router->generate('category_view', ['slug' => $category->getSlug()]),
                $category->getName()
            );
        }

        $history->setAmount($amount ?: $category->getCharge())
            ->setType($category->isBook() ? PaymentInterface::TYPE_BOOK_INCOME : PaymentInterface::TYPE_CATEGORY_INCOME)
            ->setDescription($description)
            ->setStatus(PaymentInterface::STATUS_OK)
            ->setUser($wallet->getUser());
        $this->addHistory($wallet, $history);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserWalletHistories(WalletInterface $wallet, $page, $limit = null)
    {
        $query = $this->getHistoryRepository()->createQueryBuilder('wh')
            ->where('wh.wallet = :wallet')->setParameter('wallet', $wallet)
            ->orderBy('wh.updatedAt', 'desc')
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function withdraw(WalletInterface $wallet, $amount, $alipay)
    {
        $amount = intval($amount);
        if ($amount < PaymentInterface::WITHDRAW_MAX_AMOUNT) {
            throw new \LogicException(sprintf('提现金额必须大于 %d', PaymentInterface::WITHDRAW_MAX_AMOUNT));
        }
        if ($wallet->getAmount() < $amount) {
            throw new \LogicException('余额不足');
        }
        if (!$alipay) {
            throw new \LogicException('需要提供支付宝账户');
        }

        $history = $this->createHistory();
        $history->setType(PaymentInterface::TYPE_WITHDRAW)
            ->setAmount($amount)
            ->setDescription('')
            ->setStatus(PaymentInterface::STATUS_WAITING)
            ->setDescription(sprintf('提现到: %s', $alipay))
            ->setUser($wallet->getUser());
        //钱包余额冻结
        $wallet->freeze($amount);
        $this->addHistory($wallet, $history);

        return $history;
    }

    /**
     * {@inheritdoc}
     */
    public function refuseWithdraw(WalletHistoryInterface $history, $reason = null)
    {
        $history->getWallet()->release($history->getAmount()); //钱包释放资本
        $history->setDescription(
            $history->getDescription() . ";拒绝原因：" . ($reason ?: '暂无原因')
        );
        $history->setStatus(PaymentInterface::STATUS_CLOSED);
        $this->entityManager->persist($history);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function approveWithdraw(WalletHistoryInterface $history, $reason = null)
    {
        $wallet = $history->getWallet();
        $history->getWallet()->setFreezeAmount(
            $wallet->getFreezeAmount() - $history->getAmount()
        ); //减去冻结的金额
        $history->setDescription(
            $history->getDescription() . ";完成：" . ($reason ?: '暂无原因')
        );
        $history->setStatus(PaymentInterface::STATUS_OK);
        $this->entityManager->persist($history);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function findWalletHistoryById($id)
    {
        return $this->getHistoryRepository()->find($id);
    }

    /**
     * @return EntityRepository
     */
    protected function getWalletRepository()
    {
        return $this->entityManager->getRepository('PHPDishPaymentBundle:Wallet');
    }

    /**
     * @return EntityRepository
     */
    protected function getHistoryRepository()
    {
        return $this->entityManager->getRepository('PHPDishPaymentBundle:Payment');
    }
}