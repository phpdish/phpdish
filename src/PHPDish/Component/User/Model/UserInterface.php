<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\User\Model;

use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use Symfony\Component\Security\Core\User\UserInterface as BaseUserInterface;

interface UserInterface extends BaseUserInterface, IdentifiableInterface, DateTimeInterface, EnabledInterface, SocialAwareInterface
{
    /**
     * 男性.
     *
     * @var int
     */
    const GENDER_MEN = 1;

    /**
     * 女性.
     *
     * @var int
     */
    const GENDER_WOMEN = 2;

    /**
     * 是否是女性.
     *
     * @return bool
     */
    public function isWomen();

    /**
     * 添加一个粉丝.
     *
     * @param UserInterface $follower
     *
     * @return UserInterface
     */
    public function addFollower(UserInterface $follower);

    /**
     * 取消粉丝.
     *
     * @param UserInterface $follower
     *
     * @return UserInterface
     */
    public function removeFollower(UserInterface $follower);

    /**
     * 设置粉丝数.
     *
     * @param int $count
     *
     * @return UserInterface
     */
    public function setFollowerCount($count);

    /**
     * 获取粉丝数.
     *
     * @return int
     */
    public function getFollowerCount();

    /**
     * 设置关注的用户数.
     *
     * @param int $count
     *
     * @return UserInterface
     */
    public function setFollowingCount($count);

    /**
     * 获取关注的用户数.
     *
     * @return int
     */
    public function getFollowingCount();


    /**
     * 获取avatar的路径.
     *
     * @return string
     */
    public function getAvatar();

    /**
     * 设置avatar的路径.
     *
     * @param string $avatar
     *
     * @return UserInterface
     */
    public function setAvatar($avatar);

    /**
     * 设置详细资料.
     *
     * @param ProfileInterface $profile
     *
     * @return UserInterface
     */
    public function setProfile(ProfileInterface $profile);

    /**
     * 获取详细资料.
     *
     * @return ProfileInterface
     */
    public function getProfile();

    /**
     * 获取用户的粉丝.
     *
     * @return UserInterface
     */
    public function getFollowers();

    /**
     * 获取正在关注的用户.
     *
     * @return UserInterface[]
     */
    public function getFollowing();

    /**
     * 获取用户的语言
     *
     * @return string
     */
    public function getLocale();

    /**
     * 获取积分
     *
     * @return int
     */
    public function getPoint();

    /**
     * 加积分
     *
     * @param int $point
     */
    public function increasePoint(int $point);
}
