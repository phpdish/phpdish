<?php

namespace PHPDish\Bundle\PaymentBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;

interface WalletHistoryInterface extends IdentifiableInterface, DateTimeInterface, EnabledInterface
{
    /**
     * 专栏收入
     * @var string
     */
    const TYPE_CATEGORY_INCOME = 'category_income';

    /**
     * 获取金额
     * @return int
     */
    public function getAmount();

    /**
     * 获取类型
     * @return string
     */
    public function getType();

    /**
     * 设置类型
     * @param string $type
     * @return WalletHistoryInterface
     */
    public function setType($type);

    /**
     * 设置描述
     * @param string $description
     * @return WalletHistoryInterface
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
     * @return WalletHistoryInterface
     */
    public function setParameters($parameters);

    /**
     * 获取参数
     * @return array
     */
    public function getParameters();
}