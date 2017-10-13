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
}
