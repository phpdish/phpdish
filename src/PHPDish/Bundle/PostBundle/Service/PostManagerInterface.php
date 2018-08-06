<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface PostManagerInterface
{
    /**
     * 创建一篇文章.
     *
     * @param UserInterface $user
     *
     * @return PostInterface
     */
    public function createPost(UserInterface $user);

    /**
     * 更新文章到数据库.
     *
     * @param PostInterface $post
     *
     * @return bool
     */
    public function savePost(PostInterface $post);

    /**
     * 根据id获取文章.
     *
     * @param int $id
     *
     * @return PostInterface
     */
    public function findPostById($id);

    /**
     * 查找post
     * @param Criteria $criteria
     * @return PostInterface[]|Collection
     */
    public function findPosts(Criteria $criteria);

    /**
     * 查找指定条件的文章.
     *
     * @param Criteria $criteria
     * @param int      $page
     * @param null|int $limit
     *
     * @return Pagerfanta
     */
    public function findPostsPager(Criteria $criteria, $page = 1, $limit = null);

    /**
     * 获取用户的文章.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param int|null      $limit
     *
     * @return Pagerfanta
     */
    public function findUserEnabledPosts(UserInterface $user, $page = 1, $limit = null);

    /**
     * 获取分类下的文章.
     *
     * @param CategoryInterface $category
     * @param int               $page
     * @param null|int          $limit
     *
     * @return Pagerfanta
     */
    public function findCategoryPosts(CategoryInterface $category, $page = 1, $limit = null);

    /**
     * 获取最新文章.
     *
     * @param int      $page
     * @param int|null $limit
     *
     * @return Pagerfanta
     */
    public function findLatestEnabledPosts($page, $limit = null);

    /**
     * 封禁文章.
     *
     * @param PostInterface $post
     */
    public function blockPost(PostInterface $post);

    /**
     * 增加或者减少文章的view数量
     * @param PostInterface $post
     * @param int $views
     */
    public function increasePostViews(PostInterface $post, $views = 1);

    /**
     * 获取用户的post数量
     *
     * @param UserInterface $user
     * @param boolean $ignoreEmptyPost
     * @return int
     */
    public function getUserPostCount(UserInterface $user, $ignoreEmptyPost = true);

    /**
     * 添加投票
     *
     * @param PostInterface $post
     * @param UserInterface $user
     */
    public function addVoter(PostInterface $post, UserInterface $user);

    /**
     * 取消投票
     *
     * @param PostInterface $post
     * @param UserInterface $user
     */
    public function removeVoter(PostInterface $post, UserInterface $user);

    /**
     * 获取post repository
     *
     * @return PostRepository
     */
    public function getPostRepository();
}
