<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Forum\Model;

use PHPDish\Component\Cms\Model\TaxonomyInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\User\Model\UserInterface;

interface ThreadInterface extends IdentifiableInterface, DateTimeInterface, TaxonomyInterface, EnabledInterface
{
    /**
     * 获取封面.
     *
     * @return string
     */
    public function getCover();

    /**
     * 设置封面
     *
     * @param string $cover
     * @return ThreadInterface
     */
    public function setCover($cover);

    /**
     * 设置话题数量.
     *
     * @param int $topicCount
     *
     * @return ThreadInterface
     */
    public function setTopicCount($topicCount);

    /**
     * 获取话题数量
     *
     * @return int
     */
    public function getTopicCount();

    /**
     * 获取订阅人数量.
     *
     * @return int
     */
    public function getFollowerCount();

    /**
     * 设置订阅人数量.
     *
     * @param int $count
     *
     * @return ThreadInterface
     */
    public function setFollowerCount($count);

    /**
     * 添加关注者.
     *
     * @param UserInterface $user
     *
     * @return ThreadInterface
     */
    public function addFollower(UserInterface $user);

    /**
     * 取消关注.
     *
     * @param UserInterface $user
     *
     * @return ThreadInterface
     */
    public function removeFollower(UserInterface $user);

    /**
     * 获取订阅者.
     *
     * @return UserInterface[]
     */
    public function getFollowers();

    /**
     * 设置订阅者.
     *
     * @param UserInterface[] $followers
     *
     * @return ThreadInterface
     */
    public function setFollowers(array $followers);

    /**
     * 检查是否被关注.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isFollowedBy(UserInterface $user);
}
