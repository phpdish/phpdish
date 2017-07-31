<?php
/**
 * PHPDish user component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\UserBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use Symfony\Component\Security\Core\User\UserInterface as BaseUserInterface;

interface UserInterface extends
    BaseUserInterface,
    IdentifiableInterface,
    DateTimeInterface,
    EnabledInterface
{
    public function avatar($width = 120, $height = 120);

    /**
     * 添加一个粉丝
     * @param UserInterface $user
     * @return UserInterface
     */
    public function addFollower(UserInterface $user);

    /**
     * 设置粉丝数
     * @param int $count
     * @return UserInterface
     */
    public function setFollowerCount($count);

    /**
     * 获取粉丝数
     * @return int
     */
    public function getFollowerCount();

    /**
     * 设置关注的用户数
     * @param int $count
     * @return UserInterface
     */
    public function setFollowingCount($count);

    /**
     * 获取关注的用户数
     * @return int
     */
    public function getFollowingCount();
}