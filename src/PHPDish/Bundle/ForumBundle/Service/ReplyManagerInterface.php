<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ReplyManagerInterface
{
    /**
     * 根据id查找回复
     * @param int $id
     * @return ReplyInterface
     */
    public function findReplyById($id);

    /**
     * 获取话题下的回复
     * @param TopicInterface $topic
     * @param int $page
     * @param null|int $limit
     * @param Criteria $criteria
     * @return Pagerfanta
     */
    public function findTopicReplies(TopicInterface $topic, $page, $limit = null, Criteria $criteria = null);

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
    public function createReply(TopicInterface $topic, UserInterface $user = null);

    /**
     * 封禁回复
     * @param ReplyInterface $reply
     */
    public function blockReply(ReplyInterface $reply);

    /**
     * 保存回复
     * @param ReplyInterface $reply
     * @return boolean
     */
    public function saveReply(ReplyInterface $reply);
}