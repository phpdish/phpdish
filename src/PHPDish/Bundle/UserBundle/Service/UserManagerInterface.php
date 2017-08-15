<?php
namespace PHPDish\Bundle\UserBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface UserManagerInterface
{
    /**
     * 创建新用户
     * @return UserInterface
     */
    public function createUser();

    /**
     * 保存新用户
     * @param UserInterface $user
     * @return boolean
     */
    public function saveUser(UserInterface $user);

    /**
     * 根据用户名获取用户
     * @param string $username
     * @return UserInterface
     */
    public function findUserByName($username);

    /**
     * 根据邮箱获取用户
     * @param string  $email
     * @return UserInterface
     */
    public function findUserByEmail($email);

    /**
     * 获取最近注册的用户
     * @param int $limit
     * @return UserInterface[]
     */
    public function findLatestUsers($limit);

    /**
     * 查找用户的粉丝
     * @param UserInterface $user
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findUserFollowers(UserInterface $user, $page, $limit = null);

    /**
     * 查找用户正在关注的人
     * @param UserInterface $user
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findUserFollowing(UserInterface $user, $page, $limit = null);

    /**
     * 关注用户
     * @param UserInterface $user
     * @param UserInterface $follower
     * @throws \LogicException
     * @return boolean
     */
    public function followUser(UserInterface $user, UserInterface $follower);

    /**
     * 取消关注用户
     * @param UserInterface $user
     * @param UserInterface $follower
     * @return boolean
     */
    public function unFollowUser(UserInterface $user, UserInterface $follower);
}