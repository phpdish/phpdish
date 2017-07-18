<?php
namespace PHPDish\Bundle\PostBundle\Service;

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
     */
    public function findUserPosts(UserInterface $user);
}