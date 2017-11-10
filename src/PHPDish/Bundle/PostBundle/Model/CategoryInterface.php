<?php
/**
 * PHPDish post component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace  PHPDish\Bundle\PostBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CategoryInterface extends TaxonomyInterface, EnabledInterface
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
     * @return CategoryInterface
     */
    public function setCover($cover);

    /**
     * 设置创建人.
     *
     * @param UserInterface $creator
     *
     * @return CategoryInterface
     */
    public function setCreator(UserInterface $creator);

    /**
     * 获取创建人.
     *
     * @return UserInterface
     */
    public function getCreator();

    /**
     * 设置文章数量.
     *
     * @param int $postCount
     *
     * @return CategoryInterface
     */
    public function setPostCount($postCount);

    /**
     * 获取文章数量.
     *
     * @return int
     */
    public function getPostCount();

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
     * @return CategoryInterface
     */
    public function setFollowerCount($count);

    /**
     * 添加一个管理员.
     *
     * @param UserInterface $user
     *
     * @return $this
     */
    public function addManager(UserInterface $user);

    /**
     * 添加关注者.
     *
     * @param UserInterface $user
     *
     * @return CategoryInterface
     */
    public function addFollower(UserInterface $user);

    /**
     * 取消关注.
     *
     * @param UserInterface $user
     *
     * @return CategoryInterface
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
     * @return CategoryInterface
     */
    public function setFollowers(array $followers);

    /**
     * 获取管理员.
     *
     * @return UserInterface[]|ArrayCollection
     */
    public function getManagers();

    /**
     * 是否推荐.
     *
     * @return bool
     */
    public function isRecommended();

    /**
     * 检查分类是否被关注.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isFollowedBy(UserInterface $user);

    /**
     * 是否属于某个用户.
     *
     * @param UserInterface $user
     */
    public function isBelongsTo(UserInterface $user);
}
