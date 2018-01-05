<?php
/**
 * PHPDish forum component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

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
