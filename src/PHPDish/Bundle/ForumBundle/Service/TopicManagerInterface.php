<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\Common\Collections\Criteria;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface TopicManagerInterface
{
    /**
     * 创建新话题
     * @param UserInterface $user
     * @return TopicInterface
     */
    public function createTopic(UserInterface $user);

    /**
     * 存储话题
     * @param TopicInterface $topic
     */
    public function saveTopic(TopicInterface $topic);

    /**
     * 根据id查找话题
     * @param int $id
     * @return TopicInterface
     */
    public function findTopicById($id);

    /**
     * 查找指定分类下的话题
     * @param ThreadInterface $thread
     * @param int $page
     * @param int $limit
     * @return Pagerfanta
     */
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null);

    /**
     * 查找指定用户的话题
     * @param UserInterface $user
     * @param int $page
     * @param int $limit
     * @return Pagerfanta
     */
    public function findUserTopics(UserInterface $user, $page, $limit = null);

    /**
     * 查找指定条件的话题
     * @param Criteria $criteria
     * @param int $page
     * @param int $limit
     * @return Pagerfanta
     */
    public function findTopics(Criteria $criteria, $page, $limit = null);

    /**
     * 获取指定时间内的热帖
     * @param \DateTime $date
     * @param int $limit
     * @return TopicInterface[]
     */
    public function findHotTopics(\DateTime $date, $limit);
}