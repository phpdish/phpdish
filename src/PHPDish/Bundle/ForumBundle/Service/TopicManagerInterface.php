<?php

namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface TopicManagerInterface
{
    /**
     * 创建新话题.
     *
     * @param UserInterface $user
     *
     * @return TopicInterface
     */
    public function createTopic(UserInterface $user);

    /**
     * 存储话题.
     *
     * @param TopicInterface $topic
     */
    public function saveTopic(TopicInterface $topic);

    /**
     * 根据id查找话题.
     *
     * @param int $id
     *
     * @return TopicInterface
     */
    public function findTopicById($id);

    /**
     * 封禁topic.
     *
     * @param TopicInterface $topic
     */
    public function blockTopic(TopicInterface $topic);

    /**
     * 查找指定分类下的话题.
     *
     * @param ThreadInterface $thread
     * @param int             $page
     * @param int             $limit
     * @param Criteria $criteria
     *
     * @return Pagerfanta
     */
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null, Criteria $criteria = null);

    /**
     * 查找指定用户的话题.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param int           $limit
     *
     * @return Pagerfanta
     */
    public function findUserTopics(UserInterface $user, $page, $limit = null);

    /**
     * 查找指定条件的话题.
     *
     * @param Criteria $criteria
     *
     * @return Collection|TopicInterface[]
     */
    public function findTopics(Criteria $criteria);

    /**
     * 查找指定条件的话题翻页.
     *
     * @param Criteria $criteria
     * @param int      $page
     * @param int      $limit
     *
     * @return Pagerfanta
     */
    public function findTopicsPager(Criteria $criteria, $page, $limit = null);

    /**
     * 获取指定时间内的热帖.
     *
     * @param \DateTime $date
     * @param int       $limit
     *
     * @return TopicInterface[]
     */
    public function findHotTopics(\DateTime $date, $limit);

    /**
     * 获取订阅的节点下的话题
     *
     * @param UserInterface $user
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findFollowingThreadsTopics(UserInterface $user, $page, $limit = null);

    /**
     * 获取用户的话题数量
     *
     * @param UserInterface $user
     * @return int
     */
    public function getUserTopicCount(UserInterface $user);

    /**
     * 添加投票
     *
     * @param TopicInterface $topic
     * @param UserInterface $user
     */
    public function addVoter(TopicInterface $topic, UserInterface $user);

    /**
     * 取消投票
     *
     * @param TopicInterface $topic
     * @param UserInterface $user
     */
    public function removeVoter(TopicInterface $topic, UserInterface $user);

    /**
     * 获取话题的repository
     *
     * @return EntityRepository
     */
    public function getTopicRepository();
}
