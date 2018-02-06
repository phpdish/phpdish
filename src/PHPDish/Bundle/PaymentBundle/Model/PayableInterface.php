<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

interface PayableInterface
{
    /**
     * 获取交易号
     * @return string
     */
    public function getTransactionId();

    /**
     * 能否继续交易
     * @return boolean
     */
    public function isCanPay();
}