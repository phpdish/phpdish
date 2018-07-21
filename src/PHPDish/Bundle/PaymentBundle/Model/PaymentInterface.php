<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PaymentBundle\Model;


use PHPDish\Bundle\ResourceBundle\Model\EnabledInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface PaymentInterface extends IdentifiableInterface, WalletHistoryInterface, EnabledInterface, UserAwareInterface
{
    /**
     * 已支付/已到账
     * @var string
     */
    const STATUS_OK = 'ok';

    /**
     * 已关闭
     * @var string
     */
    const STATUS_CLOSED = 'closed';

    /**
     * 等待支付
     * @var string
     */
    const STATUS_WAITING = 'waiting';

    /**
     * 订阅专栏
     * @var string
     */
    const TYPE_FOLLOW_CATEGORY = 'follow_category';

    /**
     * 购买电子书
     * @var string
     */
    const TYPE_BUY_BOOK = 'buy_book';

    /**
     * 专栏收入
     * @var string
     */
    const TYPE_CATEGORY_INCOME = 'category_income';

    /**
     * 电子书收入
     * @var string
     */
    const TYPE_BOOK_INCOME = 'book_income';

    /**
     * 电子书收入
     * @var string
     */
    const TYPE_WITHDRAW = 'withdraw';

    /**
     * 最大提现金额
     * @var int
     */
    const WITHDRAW_MAX_AMOUNT = 10000;

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