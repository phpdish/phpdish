<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ReplyManagerInterface
{
    /**
     * 根据id查找回复.
     *
     * @param int $id
     *
     * @return ReplyInterface
     */
    public function findReplyById($id);

    /**
     * 获取话题下的回复.
     *
     * @param TopicInterface $topic
     * @param int            $page
     * @param null|int       $limit
     * @param Criteria       $criteria
     *
     * @return Pagerfanta
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null, Criteria $criteria = null);

    /**
     * 获取话题下的回复.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param null|int      $limit
     * @param Criteria       $criteria
     * @return Pagerfanta
     */
    public function findUserReplies(UserInterface $user, $page, $limit = null, Criteria $criteria = null);

    /**
     * 获取回复
     *
     * @param Criteria $criteria
     * @return ReplyInterface[]
     */
    public function findReplies(Criteria $criteria);

    /**
     * 获取回复，翻页
     * @param Criteria $criteria
     * @param int $page
     * @param int $limit
     * @return Pagerfanta
     */
    public function findRepliesPager(Criteria $criteria, $page, $limit = null);

    /**
     * 创建一条回复.
     *
     * @param TopicInterface $topic
     * @param UserInterface  $user
     *
     * @return ReplyInterface
     */
    public function createReply(TopicInterface $topic, UserInterface $user = null);

    /**
     * 封禁回复.
     *
     * @param ReplyInterface $reply
     */
    public function blockReply(ReplyInterface $reply);

    /**
     * 保存回复.
     *
     * @param ReplyInterface $reply
     *
     * @return bool
     */
    public function saveReply(ReplyInterface $reply);

    /**
     * 回复主题
     *
     * @param UserInterface $user
     * @param TopicInterface $topic
     * @param string $body
     * @return ReplyInterface
     */
    public function replyTopic(UserInterface $user, TopicInterface $topic, $body);

    /**
     * 添加投票
     *
     * @param ReplyInterface $reply
     * @param UserInterface $user
     */
    public function addVoter(ReplyInterface $reply, UserInterface $user);

    /**
     * 取消投票
     *
     * @param ReplyInterface $reply
     * @param UserInterface $user
     */
    public function removeVoter(ReplyInterface $reply, UserInterface $user);

    /**
     * 获取 reply repository
     * @return EntityRepository
     */
    public function getReplyRepository(): EntityRepository;
}
