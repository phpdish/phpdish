<?php

namespace PHPDish\Bundle\PaymentBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\PaymentBundle\Entity\Payment;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Slince\YouzanPay\YouzanPay;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class PaymentManager implements PaymentManagerInterface
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
     * @var YouzanPay
     */
    protected $youzanPay;

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        YouzanPay $youzanPay
    )
    {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->youzanPay = $youzanPay;
    }

    /**
     * {@inheritdoc}
     */
    public function createPayment(UserInterface $user = null)
    {
        $payment = new Payment();
        $now = Carbon::now();
        $payment->setUser($user)
            ->setStatus(PaymentInterface::STATUS_WAITING)
            ->setCreatedAt($now)
            ->setUpdatedAt($now);
        return $payment;
    }

    /**
     * {@inheritdoc}
     */
    public function savePayment(PaymentInterface $payment)
    {
        $this->entityManager->persist($payment);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function charge(PaymentInterface $payment)
    {
        $qrCode = $this->youzanPay->charge([
            'name' => $payment->getDescription(),
            'price' => $payment->getAmount(),
            'source' => $payment->getSerialNo()
        ]);
        $payment->setQrId($qrCode->getId());
        $this->savePayment($payment);
        return $qrCode;
    }

    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPaymentBundle:Payment');
    }
}