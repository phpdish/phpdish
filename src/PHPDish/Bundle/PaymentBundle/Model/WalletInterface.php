<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use Money\Money;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface WalletInterface extends IdentifiableInterface, UserAwareInterface, DateTimeInterface
{
    /**
     * 获取余额
     * @return int
     */
    public function getAmount();

    /**
     * 设置余额
     *
     * @param int $amount
     * @return WalletInterface
     */
    public function setAmount($amount);

    /**
     * 获取冻结余额
     *
     * @return int
     */
    public function getFreezeAmount();

    /**
     * 设置冻结余额
     *
     * @param int $amount
     * @return WalletInterface
     */
    public function setFreezeAmount($amount);

    /**
     * 获取用户
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取钱包记录
     * @return WalletHistoryInterface[]
     */
    public function getHistories();

    /**
     * 添加一条记录
     *
     * @param WalletHistoryInterface $history
     * @return WalletInterface
     */
    public function addHistory(WalletHistoryInterface $history);

    /**
     * 获取价格
     * @return Money
     */
    public function getPrice();

    /**
     * 获取冻结余额
     * @return Money
     */
    public function getFreezePrice();

    /**
     * 冻结部分余额
     *
     * @param int $amount
     * @return WalletInterface
     */
    public function freeze($amount);

    /**
     * 释放冻结金额
     * @param int $amount
     * @return WalletInterface
     */
    public function release($amount);
}