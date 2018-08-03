<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
     * 提现被确认
     * @var string
     */
    const WITHDRAW_APPROVED = 'withdraw.approved';

    /**
     * 提现拒绝
     * @var string
     */
    const WITHDRAW_DECLINED = 'withdraw.declined';

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