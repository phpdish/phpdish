<?php
namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;

interface ReplyInterface extends CommentInterface, VotableInterface
{
    /**
     * 设置话题
     * @param TopicInterface $topic
     * @return $this
     */
    public function setTopic(TopicInterface $topic);

    /**
     * 获取话题
     * @return TopicInterface
     */
    public function getTopic();
}