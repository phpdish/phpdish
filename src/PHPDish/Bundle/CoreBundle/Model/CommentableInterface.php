<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\CoreBundle\Model;

interface CommentableInterface
{
    /**
     * 获取评论数量
     * @return int
     */
    public function getCommentCount();

//    /**
//     * 获取所有的评论
//     * @return CommentInterface[]
//     */
//    public function getComments();
//
//    /**
//     * 添加一条评论
//     * @param CommentInterface $comment
//     * @return $this
//     */
//    public function addComment(CommentInterface $comment);
//
//    /**
//     * 移除一条评论
//     * @param CommentInterface $comment
//     */
//    public function removeComment(CommentInterface $comment);
}