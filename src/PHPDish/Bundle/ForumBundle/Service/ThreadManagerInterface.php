<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ThreadManagerInterface
{
    /**
     * 获取节点
     *
     * @param Criteria $criteria
     * @return ThreadInterface[]|Collection
     */
    public function findThreads(Criteria $criteria);

    /**
     * 获取节点
     *
     * @param Criteria|null $criteria
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findThreadsPager(Criteria $criteria, $page, $limit = null);

    /**
     * 获取用户关注的节点
     *
     * @param UserInterface $user
     * @param int $page
     * @param int|null $limit
     * @param Criteria|null $criteria
     * @return Pagerfanta
     */
    public function findUserFollowingThreads(UserInterface $user, $page, $limit = null, Criteria $criteria = null);

    /**
     * 查找所有启用的thread.
     *
     * @param int|null $limit
     * @return ThreadInterface[]
     */
    public function findEnabledThreads($limit = null);

    /**
     * 根据id查找thread
     *
     * @param int $id
     *
     * @return ThreadInterface
     */
    public function findThreadById($id);

    /**
     * 根据slug查找thread.
     *
     * @param string $slug
     *
     * @return ThreadInterface
     */
    public function findThreadBySlug($slug);

    /**
     * 根据名称获取多个thread
     * @param array $names
     * @return ThreadInterface[]
     */
    public function findThreadsByNames($names);

    /**
     * 搜索thread
     * @param string $term
     * @return ThreadInterface[]
     */
    public function searchThreads($term);

    /**
     * 创建thread
     * @return ThreadInterface
     */
    public function createThread();

    /**
     * 保存thread
     * @param ThreadInterface $thread
     */
    public function saveThread(ThreadInterface $thread);

    /**
     * 创建多个thread
     * @param array $names
     * @return ThreadInterface[]
     */
    public function createThreadsByNames($names);

    /**
     * 关注thread.
     *
     * @param ThreadInterface $thread
     * @param UserInterface     $user
     *
     * @return bool
     */
    public function followThread(ThreadInterface $thread, UserInterface $user);

    /**
     * 取消关注thread
     *
     * @param ThreadInterface $thread
     * @param UserInterface     $user
     *
     * @return bool
     */
    public function unFollowThread(ThreadInterface $thread, UserInterface $user);

    /**
     * 获取节点repository
     *
     * @return EntityRepository
     */
    public function getThreadRepository();
}
