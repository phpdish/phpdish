<?php

namespace PHPDish\Bundle\PaymentBundle\Controller;

use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use PHPDish\Bundle\PaymentBundle\Service\WalletManagerInterface;

trait ManagerTrait
{
    /**
     * 获取 payment 管理服务
     *
     * @return PaymentManagerInterface
     */
    protected function getPaymentManager()
    {
        return $this->get('phpdish.manager.payment');
    }

    /**
     * 获取钱包管理.
     *
     * @return WalletManagerInterface
     */
    protected function getWalletManager()
    {
        return $this->get('phpdish.manager.wallet');
    }
}
