<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface TransactionInterface extends DateTimeInterface, EnabledInterface, IdentifiableInterface, UserAwareInterface
{
    const STATUS_OK = 'ok';

    const STATUS_CLOSED = 'closed';

    const STATUS_WAITING = 'waiting';

    /**
     * 获取交易资源
     *
     * @return PayableInterface
     */
    public function getPayable();

    /**
     * 获取交易流水号
     * @return string
     */
    public function getSerialNo();
}