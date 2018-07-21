<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CmsBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ThreadInterface extends IdentifiableInterface, TaxonomyInterface
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
     * 检查是否被关注.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isFollowedBy(UserInterface $user);
}
