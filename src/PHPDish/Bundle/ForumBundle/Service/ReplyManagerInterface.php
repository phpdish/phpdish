<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ReplyManagerInterface
{
    /**
     * 获取话题下的回复
     * @param TopicInterface $topic
     * @param int $page
     * @param null|int $limit
     * @return Pagerfanta
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null);

    /**
     * 获取话题下的回复
     * @param UserInterface $user
     * @param int $page
     * @param null|int $limit
     * @return Pagerfanta
     */
    public function findUserReplies(UserInterface $user, $page, $limit = null);

    /**
     * 创建一条回复
     * @param TopicInterface $topic
     * @param UserInterface $user
     * @return ReplyInterface
     */
    public function createReply(TopicInterface $topic, UserInterface $user);

    /**
     * 保存回复
     * @param ReplyInterface $reply
     * @return boolean
     */
    public function saveReply(ReplyInterface $reply);
}