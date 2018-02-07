<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface PaymentInterface extends DateTimeInterface, EnabledInterface, IdentifiableInterface, UserAwareInterface
{
    const STATUS_OK = 'ok';

    const STATUS_CLOSED = 'closed';

    const STATUS_WAITING = 'waiting';

    /**
     * 获取交易资源
     *
     * @return int
     */
    public function getPayableId();

    /**
     * 获取交易流水号
     * @return string
     */
    public function getSerialNo();

    /**
     * 获取状态
     * @return string
     */
    public function getStatus();

    /**
     * 获取支付类型
     * @return string
     */
    public function getPaymentType();

    /**
     * 获取价格
     *
     * @return int
     */
    public function getAmount();

    /**
     * 获取交易描述
     * @return string
     */
    public function getDescription();

    /**
     * 设置价格
     *
     * @param int $amount
     * @return PaymentInterface
     */
    public function setAmount($amount);

    /**
     * 获取交易id
     * @return string
     */
    public function getQrId();
}