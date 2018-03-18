<?php

namespace PHPDish\Bundle\CoreBundle\Search;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface SearchServiceInterface
{
    /**
     * 查询用户
     *
     * @param string $term
     * @param array $options
     * @return UserInterface[]|Pagerfanta
     */
    public function queryUsers($term, array $options = []);

    /**
     * 查询文章
     *
     * @param string $term
     * @param array $options
     * @return PostInterface[]|Pagerfanta
     */
    public function queryPosts($term, array $options = []);

    /**
     * 查询专栏
     *
     * @param string $term
     * @param array $options
     * @return PostInterface[]|Pagerfanta
     */
    public function queryTopics($term, array $options = []);
}