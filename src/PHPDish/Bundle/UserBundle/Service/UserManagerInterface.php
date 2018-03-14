<?php

namespace PHPDish\Bundle\UserBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface as BaseUserManagerInterface;

interface UserManagerInterface extends BaseUserManagerInterface
{
    /**
     * 创建新用户.
     *
     * @return UserInterface
     */
    public function createUser();

    /**
     * 保存新用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function saveUser(UserInterface $user);

    /**
     * 根据用户名获取用户.
     *
     * @param string $username
     *
     * @return UserInterface
     */
    public function findUserByName($username);

    /**
     * 根据id获取用户.
     *
     * @param int $id
     *
     * @return UserInterface
     */
    public function findUserById($id);

    /**
     * 根据条件查找
     *
     * @param Criteria $criteria
     * @return UserInterface[]|Collection
     */
    public function findUsersByCriteria(Criteria $criteria);

    /**
     * 查找用户翻页
     * @param Criteria $criteria
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findUsersPager(Criteria $criteria, $page, $limit = null);

    /**
     * 获取最近注册的用户query.
     * @param int $limit
     * @return \Doctrine\ORM\Query
     */
    public function getLatestUsersQuery($limit);

    /**
     * 获取最近注册的用户.
     *
     * @param int $limit
     * @param boolean $caching
     * @return UserInterface[]
     */
    public function findLatestUsers($limit, $caching = false);

    /**
     * 根据用户名获取多个用户.
     *
     * @param array $userNames
     *
     * @return UserInterface[]
     */
    public function findUsersByNames($userNames);

    /**
     * 查找用户的粉丝.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param int|null      $limit
     *
     * @return Pagerfanta
     */
    public function findUserFollowers(UserInterface $user, $page, $limit = null);

    /**
     * 查找用户正在关注的人.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param int|null      $limit
     *
     * @return Pagerfanta
     */
    public function findUserFollowing(UserInterface $user, $page, $limit = null);

    /**
     * 查找专栏的订阅者.
     *
     * @param CategoryInterface $category
     * @param int               $page
     * @param int|null          $limit
     *
     * @return Pagerfanta
     */
    public function findCategoryFollowers(CategoryInterface $category, $page, $limit = null);

    /**
     * 查找话题的点赞人.
     *
     * @param TopicInterface $topic
     * @param int               $page
     * @param int|null          $limit
     *
     * @return Pagerfanta
     */
    public function findTopicVoters(TopicInterface $topic, $page, $limit = null);

    /**
     * 查找话题回复的点赞人.
     *
     * @param ReplyInterface $reply
     * @param int               $page
     * @param int|null          $limit
     *
     * @return Pagerfanta
     */
    public function findTopicReplyVoters(ReplyInterface $reply, $page, $limit = null);

    /**
     * 查找文章的点赞人.
     *
     * @param PostInterface $post
     * @param int               $page
     * @param int|null          $limit
     *
     * @return Pagerfanta
     */
    public function findPostVoters(PostInterface $post, $page, $limit = null);

    /**
     * 关注用户.
     *
     * @param UserInterface $user
     * @param UserInterface $follower
     *
     * @throws \LogicException
     *
     * @return bool
     */
    public function followUser(UserInterface $user, UserInterface $follower);

    /**
     * 取消关注用户.
     *
     * @param UserInterface $user
     * @param UserInterface $follower
     *
     * @return bool
     */
    public function unFollowUser(UserInterface $user, UserInterface $follower);

    /**
     * 检查用户名是否存在.
     *
     * @param string $username
     *
     * @return bool
     */
    public function checkUsernameExist($username);

    /**
     * 检查邮箱是否存在.
     *
     * @param string $email
     *
     * @return bool
     */
    public function checkEmailExist($email);

    /**
     * 获取用户repository
     *
     * @return EntityRepository
     */
    public function getUserRepository();
}
