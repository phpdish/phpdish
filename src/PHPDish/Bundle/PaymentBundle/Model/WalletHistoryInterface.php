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

use Money\Money;
use PHPDish\Bundle\ResourceBundle\Model\DateTimeInterface;

interface WalletHistoryInterface extends DateTimeInterface
{
    /**
     * 设置金额
     * @param int $amount
     * @return self
     */
    public function setAmount($amount);

    /**
     * 获取金额
     * @return int
     */
    public function getAmount();

    /**
     * 获取价格
     * @return Money
     */
    public function getPrice();

    /**
     * 获取所属钱包
     * @return WalletInterface
     */
    public function getWallet();

    /**
     * 设置wallet
     * @param WalletInterface $wallet
     * @return self
     */
    public function setWallet(WalletInterface $wallet);

    /**
     * 获取类型
     * @return string
     */
    public function getType();

    /**
     * 设置类型
     * @param string $type
     * @return self
     */
    public function setType($type);

    /**
     * 设置描述
     * @param string $description
     * @return self
     */
    public function setDescription($description);

    /**
     * 获取描述
     * @return string
     */
    public function getDescription();

    /**
     * 设置参数
     * @param array $parameters
     * @return self
     */
    public function setParameters($parameters);

    /**
     * 获取参数
     * @return array
     */
    public function getParameters();

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
     * 是否是收入
     * @return boolean
     */
    public function isIncome();

    /**
     * 设置是否是收入
     *
     * @param boolean $income
     * @return self
     */
    public function setIncome($income);
}