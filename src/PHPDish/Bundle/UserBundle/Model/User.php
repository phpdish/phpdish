<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Model;

use Carbon\Carbon;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use FOS\MessageBundle\Model\ParticipantInterface;
use PHPDish\Bundle\ResourceBundle\Model\DateTimeTrait;
use FOS\UserBundle\Model\User as BaseUser;

class User extends BaseUser implements UserInterface, ParticipantInterface
{
    use DateTimeTrait;

    /**
     * @var int
     */
    protected $gender = 0;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $avatar;

    /**
     * @var string
     */
    protected $followingCount = 0;

    /**
     * @var int
     */
    protected $followerCount = 0;

    /**
     * 个人资料.
     *
     * @var ProfileInterface[]|Collection
     */
    protected $profile;

    /**
     * 关注我的用户.
     *
     * @var ArrayCollection|UserInterface[]
     */
    protected $followers;

    /**
     * 我关注的用户.
     *
     * @var ArrayCollection|UserInterface[]
     */
    protected $following;

    /**
     * @var string
     */
    protected $qqId;

    /**
     * @var string
     */
    protected $qqAccessToken;

    /**
     * @var string
     */
    protected $weiboId;

    /**
     * @var string
     */
    protected $weiboAccessToken;

    /**
     * @var string
     */
    protected $githubId;

    /**
     * @var string
     */
    protected $githubAccessToken;

    /**
     * @var int
     */
    protected $point = 0;

    /**
     * @var PointHistoryInterface[]|Collection
     */
    protected $pointHistories;

    public function __construct()
    {
        parent::__construct();
        //关注我的
        $this->followers = new ArrayCollection();
        //我关注的
        $this->following = new ArrayCollection();
        //创建时间
        $this->setCreatedAt(Carbon::now());
        //更新时间
        $this->setUpdatedAt(Carbon::now());
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * {@inheritdoc}
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set gender.
     *
     * @param int $gender
     *
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender.
     *
     * @return int
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * {@inheritdoc}
     */
    public function isWomen()
    {
        return $this->gender == static::GENDER_WOMEN;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowingCount($followingCount)
    {
        $this->followingCount = $followingCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowingCount()
    {
        return $this->followingCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowerCount($count)
    {
        $this->followerCount = $count;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowerCount()
    {
        return $this->followerCount;
    }

    /**
     * 检查用户是否被某个用户关注.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contains($user);
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return User
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritdoc}
     */
    public function addFollower(UserInterface $follower)
    {
        $this->followers[] = $follower;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function removeFollower(UserInterface $follower)
    {
        $this->followers->removeElement($follower);
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowers()
    {
        return $this->followers;
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowing()
    {
        return $this->following;
    }

    /**
     * {@inheritdoc}
     */
    public function getAvatar()
    {
        return $this->avatar ?: 'user1.jpg';
    }

    /**
     * {@inheritdoc}
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function enable()
    {
        $this->setEnabled(true);
    }

    /**
     * {@inheritdoc}
     */
    public function disable()
    {
        $this->setEnabled(false);
    }

    /**
     * {@inheritdoc}
     */
    public function getProfile()
    {
        return $this->profile->first();
    }

    /**
     * {@inheritdoc}
     */
    public function setProfile(ProfileInterface $profile)
    {
        $this->profile->clear();
        $profile->setUser($this);
        $this->profile[] = $profile;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getQqId()
    {
        return $this->qqId;
    }

    /**
     * {@inheritdoc}
     */
    public function setQqId($qqId)
    {
        $this->qqId = $qqId;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getQqAccessToken()
    {
        return $this->qqAccessToken;
    }

    /**
     * {@inheritdoc}
     */
    public function setQqAccessToken($qqAccessToken)
    {
        $this->qqAccessToken = $qqAccessToken;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getWeiboId()
    {
        return $this->weiboId;
    }

    /**
     * {@inheritdoc}
     */
    public function setWeiboId($weiboId)
    {
        $this->weiboId = $weiboId;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getWeiboAccessToken()
    {
        return $this->weiboAccessToken;
    }

    /**
     * {@inheritdoc}
     */
    public function setWeiboAccessToken($weiboAccessToken)
    {
        $this->weiboAccessToken = $weiboAccessToken;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getGithubId()
    {
        return $this->githubId;
    }

    /**
     * {@inheritdoc}
     */
    public function setGithubId($githubId)
    {
        $this->githubId = $githubId;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getGithubAccessToken()
    {
        return $this->githubAccessToken;
    }

    /**
     * {@inheritdoc}
     */
    public function setGithubAccessToken($githubAccessToken)
    {
        $this->githubAccessToken = $githubAccessToken;

        return $this;
    }

    /**
     * @return int
     */
    public function getPoint()
    {
        return $this->point;
    }

    /**
     * @param int $point
     * @return User
     */
    public function addPoint(int $point)
    {
        $this->point += $point;
        $this->point = max($this->point, 0);
        return $this;
    }
}
