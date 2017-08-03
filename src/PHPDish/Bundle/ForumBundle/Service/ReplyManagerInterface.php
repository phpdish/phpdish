<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;

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
}