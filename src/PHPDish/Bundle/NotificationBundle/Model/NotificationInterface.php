<?php

namespace PHPDish\Bundle\NotificationBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationInterface extends IdentifiableInterface
{
    /**
     * 是否是系统通知（没有发送人）
     * @return boolean
     */
    public function isSystem();

    /**
     * 获取通知的接收人.
     *
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取创建人.
     *
     * @return UserInterface
     */
    public function getFromUser();

    /**
     * 获取主题.
     *
     * @return string
     */
    public function getSubject();

    /**
     * 获取话题.
     *
     * @return TopicInterface
     */
    public function getTopic();

    /**
     * 获取回复.
     *
     * @return ReplyInterface
     */
    public function getReply();

    /**
     * 获取文章.
     *
     * @return PostInterface
     */
    public function getPost();

    /**
     * 获取评论.
     *
     * @return CommentInterface
     */
    public function getComment();

    /**
     * 获取交易历史
     * @return PaymentInterface
     */
    public function getPayment();
}
