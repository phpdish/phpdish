<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Util;

use PHPDish\Bundle\CoreBundle\Model\Notification;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Translation\TranslatorInterface;

final class NotificationHelper
{
    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    /**
     * {@inheritdoc}
     */
    public function createFollowUserNotification(UserInterface $user, UserInterface $follower)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.follow_user.subject'),
            $this->translator->trans('notification.follow_user.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_FOLLOW_USER,
            'follower_id' => $user->getId(),
            'follower_username' => $user->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createReplyTopicNotification(TopicInterface $topic, ReplyInterface $reply)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.reply_topic.subject'),
            $this->translator->trans('notification.reply_topic.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_REPLY_TOPIC,
            'topic_id' => $topic->getId(),
            'reply_id' => $reply->getId(),
            'reply_user_id' => $reply->getUser()->getId(),
            'reply_user_username' => $reply->getUser()->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createCommentPostNotification(PostInterface $post, CommentInterface $comment)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.comment_post.subject'),
            $this->translator->trans('notification.comment_post.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_COMMENT_POST,
            'post_id' => $post->getId(),
            'comment_id' => $comment->getId(),
            'comment_user_id' => $comment->getUser()->getId(),
            'comment_user_username' => $comment->getUser()->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createMentionUserInPostNotification(CommentInterface $comment)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.mention_user_post.subject'),
            $this->translator->trans('notification.mention_user_post.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_MENTION_USER_IN_POST,
            'post_id' => $comment->getPost()->getId(),
            'comment_id' => $comment->getId(),
            'comment_user_id' => $comment->getUser()->getId(),
            'comment_user_username' => $comment->getUser()->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createMentionUserInTopicNotification(ReplyInterface $reply)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.mention_user_topic.subject'),
            $this->translator->trans('notification.mention_user_topic.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_MENTION_USER_IN_TOPIC,
            'topic_id' => $reply->getTopic()->getId(),
            'reply_id' => $reply->getId(),
            'reply_user_id' => $reply->getUser()->getId(),
            'reply_user_username' => $reply->getUser()->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createFollowCategoryNotification(CategoryInterface $category, UserInterface $follower)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.follow_category.subject'),
            $this->translator->trans('notification.follow_category.message')
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_FOLLOW_CATEGORY,
            'category_id' => $category->getId(),
            'follower_id' => $follower->getId(),
            'follower_username' => $follower->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createWithdrawNotification(PaymentInterface $payment)
    {
        $message = $payment->getStatus() === PaymentInterface::STATUS_OK
            ? $this->translator->trans('notification.withdraw.message.your_withdraw_was_approved', ['%payment%' => $payment->getDescription()])
            : $this->translator->trans('notification.withdraw.message.your_withdraw_was_declined', ['%payment%' => $payment->getDescription()]);

        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.withdraw.subject'),
            $message
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_HANDLE_WITHDRAW,
            'payment_id' => $payment->getId(),
            'payment_serial_no' => $payment->getSerialNo(),
        ]);
        
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteTopicNotification(TopicInterface $topic, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($topic->getUser())
            ->setTopic($topic)
            ->setFromUser($user)
            ->setMessage($topic->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_TOPIC);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteReplyNotification(TopicInterface $topic, ReplyInterface $reply, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($reply->getUser())
            ->setTopic($topic)
            ->setReply($reply)
            ->setFromUser($user)
            ->setMessage($reply->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_REPLY);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVotePostNotification(PostInterface $post, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($post->getUser())
            ->setPost($post)
            ->setFromUser($user)
            ->setMessage($post->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_POST);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteCommentNotification(PostInterface $post, CommentInterface $comment, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($comment->getUser())
            ->setPost($post)
            ->setComment($comment)
            ->setFromUser($user)
            ->setMessage($comment->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_COMMENT);
        $this->saveNotification($notification);

        return $notification;
    }
}