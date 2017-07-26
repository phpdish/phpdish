<?php
namespace PHPDish\Bundle\ForumBundle\Service;

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
     * @param ThreadInterface $thread
     * @param int $page
     * @param int $limit
     * @return Pagerfanta
     */
    public function findThreadTopics(ThreadInterface $thread, $page, $limit = null);
}