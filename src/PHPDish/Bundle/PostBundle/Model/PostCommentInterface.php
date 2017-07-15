<?php
namespace PHPDish\Bundle\PostBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;

interface PostCommentInterface extends CommentInterface, VotableInterface
{
    /**
     * 设置post
     * @param PostInterface $post
     * @return $this
     */
    public function setPost(PostInterface $post);

    /**
     * 获取post
     * @return PostInterface
     */
    public function getPost();
}