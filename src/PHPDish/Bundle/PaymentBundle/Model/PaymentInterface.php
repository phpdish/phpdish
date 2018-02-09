<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface PaymentInterface extends WalletHistoryInterface, EnabledInterface, IdentifiableInterface, UserAwareInterface
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
     * 专栏收入
     * @var string
     */
    const TYPE_CATEGORY_INCOME = 'category_income';

    /**
     * 书籍收入
     * @var string
     */
    const TYPE_BOOK_INCOME = 'book_income';

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
     * 设置交易状态
     *
     * @param string $status
     * @return PaymentInterface
     */
    public function setStatus($status);

    /**
     * 获取支付类型
     * @return string
     */
    public function getType();

    /**
     * 设置类型
     * @param string $type
     * @return PaymentInterface
     */
    public function setType($type);

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
     * 设置参数
     * @param array $parameters
     * @return PaymentInterface
     */
    public function setParameters($parameters);

    /**
     * 获取参数
     * @return array
     */
    public function getParameters();
}