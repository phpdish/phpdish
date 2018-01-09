<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ThreadManagerInterface
{
    /**
     * 查找所有启用的thread.
     *
     * @param int|null $limit
     * @return ThreadInterface[]
     */
    public function findEnabledThreads($limit = null);

    /**
     * 根据slug查找thredd.
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
     * 获取节点
     *
     * @param int $page
     * @param int|null $limit
     * @param Criteria|null $criteria
     * @return Pagerfanta
     */
    public function findThreads($page, $limit = null, Criteria $criteria = null);

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
}
