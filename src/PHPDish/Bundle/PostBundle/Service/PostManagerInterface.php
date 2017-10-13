<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
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
     * 获取用户的文章.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param int|null      $limit
     *
     * @return Pagerfanta
     */
    public function findUserPosts(UserInterface $user, $page = 1, $limit = null);

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
     * 查找指定条件的文章.
     *
     * @param Criteria $criteria
     * @param int      $page
     * @param null|int $limit
     *
     * @return Pagerfanta
     */
    public function findPosts(Criteria $criteria, $page = 1, $limit = null);

    /**
     * 获取最新文章.
     *
     * @param int      $page
     * @param int|null $limit
     *
     * @return Pagerfanta
     */
    public function findLatestPosts($page, $limit = null);

    /**
     * 根据criteria获取一组文章，不支持翻页.
     *
     * @param Criteria $criteria
     *
     * @return PostInterface[]
     */
    public function findPostsByCriteria(Criteria $criteria);

    /**
     * 封禁文章.
     *
     * @param PostInterface $post
     */
    public function blockPost(PostInterface $post);
}
