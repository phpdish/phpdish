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
     * 订阅专栏
     * @var string
     */
    const TYPE_FOLLOW_CATEGORY = 'follow_category';

    /**
     * 购买书籍
     * @var string
     */
    const TYPE_BUY_BOOK = 'buy_book';

    /**
     * 获取交易资源
     *
     * @return int
     */
    public function getPayableId();

    /**
     * 设置购买的资源的id
     * @param int $payableId
     * @return PaymentInterface
     */
    public function setPayableId($payableId);

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
     * 设置交易描述
     * @param string $description
     * @return PaymentInterface
     */
    public function setDescription($description);

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

    /**
     * 设置 QR ID
     * @param int $qrId
     * @return PaymentInterface
     */
    public function setQrId($qrId);

    /**
     * 设置类型
     * @param string $paymentType
     * @return PaymentInterface
     */
    public function setPaymentType($paymentType);
}