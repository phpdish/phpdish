<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;

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
}
