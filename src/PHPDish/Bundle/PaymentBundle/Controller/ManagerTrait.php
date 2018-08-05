<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
        return $this->get('phpdish_payment.manager.payment');
    }

    /**
     * 获取钱包管理.
     *
     * @return WalletManagerInterface
     */
    protected function getWalletManager()
    {
        return $this->get('phpdish_payment.manager.wallet');
    }
}
