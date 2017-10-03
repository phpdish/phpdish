<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CategoryInterface extends TaxonomyInterface, EnabledInterface
{
    /**
     * 获取封面
     * @return string
     */
    public function getCover();

    /**
     * 设置创建人
     * @param UserInterface $creator
     * @return $this
     */
    public function setCreator(UserInterface $creator);

    /**
     * 获取创建人
     * @return UserInterface
     */
    public function getCreator();

    /**
     * 获取文章数量
     * @return int
     */
    public function getPostCount();

    /**
     * 获取订阅人数量
     * @return int
     */
    public function getFollowerCount();

    /**
     * 设置订阅人数量
     * @param int $count
     * @return $this
     */
    public function setFollowerCount($count);

    /**
     * 添加一个管理员
     * @param UserInterface $user
     * @return $this
     */
    public function addManager(UserInterface $user);

    /**
     * 添加关注者
     * @param UserInterface $user
     * @return $this
     */
    public function addFollower(UserInterface $user);

    /**
     * 取消关注
     * @param UserInterface $user
     * @return $this
     */
    public function removeFollower(UserInterface $user);

    /**
     * 获取管理员
     * @return UserInterface[]|ArrayCollection
     */
    public function getManagers();

    /**
     * 是否推荐
     * @return boolean
     */
    public function isRecommended();

    /**
     * 检查分类是否被关注
     * @param UserInterface $user
     * @return boolean
     */
    public function isFollowedBy(UserInterface $user);
}