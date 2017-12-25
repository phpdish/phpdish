<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;

interface ThreadManagerInterface
{
    /**
     * 查找所有启用的thread.
     *
     * @return ThreadInterface[]
     */
    public function findEnabledThreads();

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
}
