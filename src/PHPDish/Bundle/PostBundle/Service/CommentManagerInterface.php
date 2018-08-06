<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CommentManagerInterface
{
    /**
     * 根据id获取评论.
     *
     * @param int $id
     *
     * @return CommentInterface
     */
    public function findCommentById($id);

    /**
     * 获取评论翻页.
     *
     * @param Criteria $criteria
     * @param int      $page
     * @param null     $limit
     *
     * @return Pagerfanta
     */
    public function findCommentsPager(Criteria $criteria, $page = 1, $limit = null);

    /**
     * 获取评论
     *
     * @param Criteria $criteria
     * @return CommentInterface[]
     */
    public function findComments(Criteria $criteria);

    /**
     * 创建评论.
     *
     * @param PostInterface $post
     * @param UserInterface $user
     *
     * @return CommentInterface
     */
    public function createComment(PostInterface $post, UserInterface $user);

    /**
     * 保存comment.
     *
     * @param CommentInterface $comment
     *
     * @return bool
     */
    public function saveComment(CommentInterface $comment);

    /**
     * 封禁comment.
     *
     * @param CommentInterface $comment
     */
    public function blockComment(CommentInterface $comment);

    /**
     * 添加投票
     *
     * @param CommentInterface $comment
     * @param UserInterface $user
     */
    public function addVoter(CommentInterface $comment, UserInterface $user);

    /**
     * 取消投票
     *
     * @param CommentInterface $comment
     * @param UserInterface $user
     */
    public function removeVoter(CommentInterface $comment, UserInterface $user);

    /**
     * 获取评论 repository
     *
     * @return EntityRepository
     */
    public function getCommentRepository();
}
