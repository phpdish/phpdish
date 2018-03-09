<?php

namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ReplyInterface extends IdentifiableInterface, CommentInterface, VotableInterface
{
    /**
     * 设置话题.
     *
     * @param TopicInterface $topic
     *
     * @return $this
     */
    public function setTopic(TopicInterface $topic);

    /**
     * 获取话题.
     *
     * @return TopicInterface
     */
    public function getTopic();

    /**
     * 回复是否属于指定用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isBelongsTo(UserInterface $user);
}
