<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface PostManagerInterface
{
    /**
     * 创建一篇文章
     * @param UserInterface $user
     * @return PostInterface
     */
    public function createPost(UserInterface $user);

    /**
     * 更新文章到数据库
     * @param PostInterface $post
     * @return boolean
     */
    public function savePost(PostInterface $post);

    /**
     * 根据id获取文章
     * @param int $id
     * @return PostInterface
     */
    public function findPostById($id);

    /**
     * 获取用户的文章
     * @param UserInterface $user
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findUserPosts(UserInterface $user, $page, $limit = null);

    /**
     * 获取用户的文章
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findLatestPosts($page, $limit = null);

    /**
     * 获取推荐的文章
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findRecommendPosts($page, $limit = null);
}