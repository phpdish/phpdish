<?php

namespace PHPDish\Bundle\NotificationBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationManagerInterface
{
    /**
     * 创建新的通知
     * @return NotificationInterface
     */
    public function createNotification();

    /**
     * 保存通知
     * @param NotificationInterface $notification
     */
    public function saveNotification(NotificationInterface $notification);

    /**
     * 创建关注消息
     * @param UserInterface $user
     * @param UserInterface $follower
     * @return NotificationInterface
     */
    public function createFollowUserNotification(UserInterface $user, UserInterface $follower);

    /**
     * 创建回复主题通知
     * @param TopicInterface $topic
     * @param ReplyInterface $reply
     * @return NotificationInterface
     */
    public function createReplyTopicNotification(TopicInterface $topic, ReplyInterface $reply);

    /**
     * 获取用户未读通知的数量
     * @param UserInterface $user
     * @return int
     */
    public function getUserUnSeenNotificationCount(UserInterface $user);

    /**
     * 查找用户的通知
     * @param UserInterface $user
     * @param int $page
     * @param null $limit
     * @return Pagerfanta
     */
    public function findUserNotifications(UserInterface $user, $page, $limit = null);
}