<?php

namespace PHPDish\Bundle\PaymentBundle\Service;

use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface WalletManagerInterface
{
    /**
     * 创建钱包
     * @param UserInterface $user
     * @return WalletInterface
     */
    public function createWallet(UserInterface $user);

    /**
     * 保存钱包
     * @param WalletInterface $wallet
     */
    public function saveWallet(WalletInterface $wallet);

    /**
     * 往钱包添加一条记录
     * @param WalletInterface $wallet
     * @param WalletHistoryInterface $history
     */
    public function addHistory(WalletInterface $wallet, WalletHistoryInterface $history);

    /**
     * 给用户添加订阅收入,语法糖
     * @param UserInterface $user
     * @param $amount
     */
    public function addCategoryIncome(UserInterface $user, $amount);

    /**
     * 创建一条历史记录
     * @return WalletHistoryInterface
     */
    public function createHistory();

    /**
     * 获取用户的钱包
     * @param UserInterface $user
     * @return WalletInterface
     */
    public function getUserWallet(UserInterface $user);
}