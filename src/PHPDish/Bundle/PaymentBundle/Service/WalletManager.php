<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PaymentBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\PaymentBundle\Event\PaymentEvent;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Translation\TranslatorInterface;

class WalletManager implements WalletManagerInterface, ServiceManagerInterface
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

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    protected $walletEntity;

    protected $paymentEntity;

    public function __construct(
        $walletEntity,
        $paymentEntity,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        RouterInterface $router,
        UserManagerInterface $userManager,
        TranslatorInterface $translator
    )
    {
        $this->walletEntity = $walletEntity;
        $this->paymentEntity = $paymentEntity;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->router = $router;
        $this->userManager = $userManager;
        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    public function createWallet(UserInterface $user)
    {
        $wallet = new $this->walletEntity;
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
        $history = new $this->paymentEntity;
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
            throw new \LogicException($this->translator->trans('withdraw.amount_should_greater_than',
                PaymentInterface::WITHDRAW_MAX_AMOUNT)
            );
        }
        if ($wallet->getAmount() < $amount) {
            throw new \LogicException($this->translator->trans('withdraw.not_encough_balance'));
        }
        if (!$alipay) {
            throw new \LogicException($this->translator->trans('withdraw.need_provide_alipay'));
        }

        $history = $this->createHistory();
        $history->setType(PaymentInterface::TYPE_WITHDRAW)
            ->setAmount($amount)
            ->setDescription('')
            ->setStatus(PaymentInterface::STATUS_WAITING)
            ->setDescription($this->translator->trans('withdraw.to', ['%alipay%' => $alipay]))
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
            $history->getDescription() . "; " . $this->translator->trans('withdraw.decline_reason', [
                '%reason%' => $reason ?: $this->translator->trans('withdraw.no_reason')
            ])
        );
        $history->setStatus(PaymentInterface::STATUS_CLOSED);
        $this->entityManager->persist($history);
        $this->entityManager->flush();
        //提现拒绝之后
        $this->eventDispatcher->dispatch(PaymentEvent::WITHDRAW_DECLINED, new PaymentEvent($history));
    }

    /**
     * {@inheritdoc}
     */
    public function approveWithdraw(WalletHistoryInterface $history, $reason = null)
    {
        $wallet = $history->getWallet();
        $wallet->setFreezeAmount(
            $wallet->getFreezeAmount() - $history->getAmount()
        ); //减去冻结的金额
        $history->setDescription(
            $history->getDescription() . "; " . $this->translator->trans('withdraw.approve_reason', [
                '%reason%' => $reason ?: $this->translator->trans('withdraw.no_reason')
            ])
        );
        $history->setStatus(PaymentInterface::STATUS_OK);
        $this->entityManager->persist($history);
        $this->entityManager->flush();
        //提现
        $this->eventDispatcher->dispatch(PaymentEvent::WITHDRAW_APPROVED, new PaymentEvent($history));
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
        return $this->entityManager->getRepository($this->walletEntity);
    }

    /**
     * @return EntityRepository
     */
    protected function getHistoryRepository()
    {
        return $this->entityManager->getRepository($this->paymentEntity);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'walletEntity' => WalletInterface::class,
            'paymentEntity' => PaymentInterface::class,
        ];
    }
}