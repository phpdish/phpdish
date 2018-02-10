<?php

namespace PHPDish\Bundle\PaymentBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
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
     * @param CategoryInterface $category
     * @param UserInterface $follower
     * @param int|null $amount
     */
    public function addCategoryIncome(UserInterface $user, CategoryInterface $category, UserInterface $follower, $amount = null);

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

    /**
     * 获取用户的钱包的记录
     * @param WalletInterface $wallet
     * @param int $page
     * @param int $limit
     * @return WalletHistoryInterface[]|Pagerfanta
     */
    public function findUserWalletHistories(WalletInterface $wallet,  $page, $limit = null);
}