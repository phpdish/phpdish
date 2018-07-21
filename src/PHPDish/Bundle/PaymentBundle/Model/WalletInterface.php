<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Payment\Model;

use Money\Money;
use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\User\Model\UserAwareInterface;
use PHPDish\Component\User\Model\UserInterface;

interface WalletInterface extends IdentifiableInterface, DateTimeInterface, UserAwareInterface
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