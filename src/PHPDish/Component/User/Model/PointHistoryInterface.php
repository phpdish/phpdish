<?php

namespace PHPDish\Component\User\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;

interface PointHistoryInterface extends IdentifiableInterface, DateTimeInterface, UserAwareInterface
{
    /**
     * 获取积分类型
     *
     * @return string
     */
    public function getType();

    /**
     * 获取积分数量
     *
     * @return int
     */
    public function getAmount();

    /**
     * 是否是收入
     * @return boolean
     */
    public function isIncome();
}