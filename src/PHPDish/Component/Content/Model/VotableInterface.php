<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace  PHPDish\Component\Resource\Model;

use PHPDish\Component\User\Model\UserInterface;

interface VotableInterface
{
    /**
     * 设置赞次数.
     *
     * @param int $voteCount
     *
     * @return VotableInterface
     */
    public function setVoteCount($voteCount);

    /**
     * 获取赞次数.
     *
     * @return int
     */
    public function getVoteCount();

    /**
     * 增加赞次数
     * @param int $count
     * @return self
     */
    public function addVoteCount($count = 1);

    /**
     * 获取投票的人
     *
     * @return UserInterface[]
     */
    public function getVoters();

    /**
     * 添加一个投票者
     *
     * @param UserInterface $user
     * @return self
     */
    public function addVoter(UserInterface $user);

    /**
     * 移除一个投票者
     *
     * @param UserInterface $user
     * @return self
     */
    public function removeVoter(UserInterface $user);

    /**
     * 是否被某个用户投票
     *
     * @param UserInterface $user
     * @return boolean
     */
    public function isVotedBy(UserInterface $user);
}
