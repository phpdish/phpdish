<?php

namespace PHPDish\Bundle\NotificationBundle\Service;

use Doctrine\ORM\EntityRepository;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationManagerInterface2
{
    /**
     * 创建新的通知.
     *
     * @return NotificationInterface
     */
    public function createNotification();

    /**
     * 保存通知.
     *
     * @param NotificationInterface $notification
     */
    public function saveNotification(NotificationInterface $notification);

    /**
     * 创建关注消息.
     *
     * @param UserInterface $user
     * @param UserInterface $follower
     *
     * @return NotificationInterface
     */
    public function createFollowUserNotification(UserInterface $user, UserInterface $follower);

    /**
     * 创建回复主题通知.
     *
     * @param TopicInterface $topic
     * @param ReplyInterface $reply
     *
     * @return NotificationInterface
     */
    public function createReplyTopicNotification(TopicInterface $topic, ReplyInterface $reply);

    /**
     * 创建评论文章通知.
     *
     * @param PostInterface    $post
     * @param CommentInterface $comment
     *
     * @return NotificationInterface
     */
    public function createCommentPostNotification(PostInterface $post, CommentInterface $comment);

    /**
     * 创建在话题艾特用户通知.
     *
     * @param UserInterface  $user
     * @param ReplyInterface $reply
     *
     * @return NotificationInterface
     */
    public function createAtUserInTopicNotification(UserInterface $user, ReplyInterface $reply);

    /**
     * 创建在话题艾特用户通知.
     *
     * @param UserInterface    $user
     * @param CommentInterface $comment
     *
     * @return NotificationInterface
     */
    public function createMentionUserInPostNotification(UserInterface $user, CommentInterface $comment);

    /**
     * 创建订阅专栏通知.
     *
     * @param CategoryInterface $category
     * @param UserInterface     $user
     *
     * @return NotificationInterface
     */
    public function createFollowCategoryNotification(CategoryInterface $category, UserInterface $user);

    /**
     * 创建提现处理结果通知
     *
     * @param PaymentInterface $payment
     * @return NotificationInterface
     */
    public function createWithdrawNotification(PaymentInterface $payment);

    /**
     * 创建回复点赞通知
     *
     * @param TopicInterface $topic
     * @param UserInterface $user
     * @return NotificationInterface
     */
    public function createVoteTopicNotification(TopicInterface $topic, UserInterface $user);

    /**
     * 创建回复点赞通知
     *
     * @param TopicInterface $topic
     * @param ReplyInterface $reply
     * @param UserInterface $user
     * @return NotificationInterface
     */
    public function createVoteReplyNotification(TopicInterface $topic, ReplyInterface $reply, UserInterface $user);

    /**
     * 创建文章点赞通知
     *
     * @param PostInterface $post
     * @param UserInterface $user
     * @return NotificationInterface
     */
    public function createVotePostNotification(PostInterface $post, UserInterface $user);

    /**
     * 创建评论点赞通知
     *
     * @param PostInterface $post
     * @param CommentInterface $comment
     * @param UserInterface $user
     * @return NotificationInterface
     */
    public function createVoteCommentNotification(PostInterface $post, CommentInterface $comment, UserInterface $user);

    /**
     * 获取用户未读通知的数量.
     *
     * @param UserInterface $user
     *
     * @return int
     */
    public function getUserUnSeenNotificationCount(UserInterface $user);

    /**
     * 查找用户的通知.
     *
     * @param UserInterface $user
     * @param int           $page
     * @param null          $limit
     *
     * @return Pagerfanta
     */
    public function findUserNotifications(UserInterface $user, $page, $limit = null);

    /**
     * 将多个通知设置为已读.
     *
     * @param array $notifications
     */
    public function readNotifications($notifications);

    /**
     * 获取repository
     *
     * @return EntityRepository
     */
    public function getRepository();
}
