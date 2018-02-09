<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface WalletInterface extends IdentifiableInterface, DateTimeInterface
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
}