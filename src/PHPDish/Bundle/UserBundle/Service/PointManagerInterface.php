<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Service;


use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface PointManagerInterface
{
    /**
     * 创建积分收益
     *
     * @param UserInterface $user
     * @param int $amount
     * @param string $type
     * @return PointHistoryInterface
     */
    public function createPointHistory(UserInterface $user, $amount, $type = null);

    /**
     * 保存历史
     *
     * @param PointHistoryInterface $history
     */
    public function savePointHistory(PointHistoryInterface $history);

    /**
     * 查询用户的积分历史
     *
     * @param UserInterface $user
     * @param int $page
     * @param null|int $limit
     * @return Pagerfanta
     */
    public function findPointHistories(UserInterface $user, $page, $limit = null);
}