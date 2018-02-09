<?php

namespace PHPDish\Bundle\PaymentBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\PaymentBundle\Entity\Payment;
use PHPDish\Bundle\PaymentBundle\Entity\Wallet;
use PHPDish\Bundle\PaymentBundle\Entity\WalletHistory;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class WalletManager implements WalletManagerInterface
{
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
        $wallet = $this->getRepository()->findOneBy([
            'user' => $user
        ]);
        if (!$wallet) {
            $wallet = $this->createWallet($user);
        }
        return $wallet;
    }

    /**
     * {@inheritdoc}
     */
    public function addCategoryIncome(UserInterface $user, $amount)
    {
        $wallet = $this->getUserWallet($user);
        $history = $this->createHistory();
        $history->setAmount($amount)
            ->setType(Payment::TYPE_CATEGORY_INCOME)
            ->setStatus(Payment::STATUS_OK)
            ->setUser($wallet->getUser());
        $this->addHistory($wallet, $history);
    }

    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPaymentBundle:Wallet');
    }
}