<?php

namespace PHPDish\Bundle\PaymentBundle\Event;

use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use Symfony\Component\EventDispatcher\Event;

class PaymentEvent extends Event
{
    /**
     * 交易完成之后触发
     * @var string
     */
    const PAYMENT_PAID = 'payment.paid';

    /**
     * @var PaymentInterface
     */
    protected $payment;

    public function __construct(PaymentInterface $payment)
    {
        $this->payment = $payment;
    }

    /**
     * @return PaymentInterface
     */
    public function getPayment()
    {
        return $this->payment;
    }
}