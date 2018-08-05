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
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Translation\TranslatorInterface;

final class NotificationHelper
{
    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @var RouterInterface
     */
    protected $router;

    public function __construct(
        NotificationManagerInterface $notificationManager,
        TranslatorInterface $translator,
        RouterInterface $router
    ) {
        $this->notificationManager = $notificationManager;
        $this->translator = $translator;
        $this->router = $router;
    }

    /**
     * {@inheritdoc}
     */
    public function createFollowUserNotification(UserInterface $follower)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.follow_user.subject', [
                '%username%' => $follower->getUsername(),
                '%url%' => $this->router->generate('user_view', ['username' => $follower->getUsername()])
            ])
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_FOLLOW_USER,
            'follower_id' => $follower->getId(),
            'follower_username' => $follower->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createReplyTopicNotification(TopicInterface $topic, ReplyInterface $reply)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.reply_topic.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $reply->getUser()->getUsername()]),
                '%username%' =>$reply->getUser()->getUsername(),
                '%topicUrl%' => $this->router->generate('topic_view', ['id' => $topic->getId()]),
                '%topicTitle%' => $topic->getTitle()
            ]),
            $reply->getBody()
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
            $this->translator->trans('notification.comment_post.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $comment->getUser()->getUsername()]),
                '%username%' =>$comment->getUser()->getUsername(),
                '%postUrl%' => $this->router->generate('post_view', ['id' => $post->getId()]),
                '%postTitle%' => $post->getTitle()
            ]),
            $comment->getBody()
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
            $this->translator->trans('notification.mention_user_post.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $comment->getUser()->getUsername()]),
                '%username%' => $comment->getUser()->getUsername(),
                '%postUrl%' => $this->router->generate('post_view', ['id' => $comment->getPost()->getId()]),
                '%postTitle%' => $comment->getPost()->getTitle()
            ])
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
            $this->translator->trans('notification.mention_user_topic.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $reply->getUser()->getUsername()]),
                '%username%' => $reply->getUser()->getUsername(),
                '%topicUrl%' => $this->router->generate('post_view', ['id' => $reply->getTopic()->getId()]),
                '%topicTitle%' => $reply->getTopic()->getTitle()
            ])
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
        if ($category->isBook()) {
            $notification = $this->notificationManager->createNotification(
                $this->translator->trans('notification.follow_book.subject', [
                    '%userUrl%' => $this->router->generate('user_view', ['username' => $follower->getUsername()]),
                    '%username%' => $follower->getUsername(),
                    '%bookUrl%' => $this->router->generate('book_view', ['slug' => $category->getSlug()]),
                    '%bookTitle%' => $category->getName()
                ])
            );
        } else {
            $notification = $this->notificationManager->createNotification(
                $this->translator->trans('notification.follow_category.subject', [
                    '%userUrl%' => $this->router->generate('user_view', ['username' => $follower->getUsername()]),
                    '%username%' => $follower->getUsername(),
                    '%categoryUrl%' => $this->router->generate('category_view', ['slug' => $category->getSlug()]),
                    '%categoryTitle%' => $category->getName()
                ])
            );
        }
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
            ? $this->translator->trans('notification.withdraw.subject.your_withdraw_was_approved', ['%payment%' => $payment->getDescription()])
            : $this->translator->trans('notification.withdraw.subject.your_withdraw_was_declined', ['%payment%' => $payment->getDescription()]);

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
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.vote_topic.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $user->getUsername()]),
                '%username%' => $user->getUsername(),
                '%topicUrl%' => $this->router->generate('topic_view', ['id'=>$topic->getId()]),
                '%topicTitle%' => $topic->getTitle()
            ])
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_VOTE_TOPIC,
            'topic_id' => $topic->getId(),
            'voter_id' => $user->getId(),
            'voter_username' => $user->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteReplyNotification(TopicInterface $topic, ReplyInterface $reply, UserInterface $user)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.vote_reply.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $user->getUsername()]),
                '%username%' => $user->getUsername(),
                '%topicUrl%' => $this->router->generate('topic_view', ['id'=>$topic->getId()]),
                '%topicTitle%' => $topic->getTitle()
            ])
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_VOTE_REPLY,
            'topic_id' => $topic->getId(),
            'reply_id' => $reply->getId(),
            'voter_id' => $user->getId(),
            'voter_username' => $user->getUsername(),
        ]);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVotePostNotification(PostInterface $post, UserInterface $user)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.vote_post.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $user->getUsername()]),
                '%username%' => $user->getUsername(),
                '%postUrl%' => $this->router->generate('post_view', ['id'=>$post->getId()]),
                '%postTitle%' => $post->getTitle()
            ])
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_VOTE_POST,
            'post_id' => $post->getId(),
            'voter_id' => $user->getId(),
            'voter_username' => $user->getUsername(),
        ]);

        return $notification;
    }
    /**
     * {@inheritdoc}
     */
    public function createVoteCommentNotification(PostInterface $post, CommentInterface $comment, UserInterface $user)
    {
        $notification = $this->notificationManager->createNotification(
            $this->translator->trans('notification.vote_comment.subject', [
                '%userUrl%' => $this->router->generate('user_view', ['username' => $user->getUsername()]),
                '%username%' => $user->getUsername(),
                '%postUrl%' => $this->router->generate('post_view', ['id'=>$post->getId()]),
                '%postTitle%' => $post->getTitle()
            ])
        );
        $notification->addParameters([
            'subject' => Notification::SUBJECT_VOTE_COMMENT,
            'post_id' => $post->getId(),
            'comment_id' => $comment->getId(),
            'voter_id' => $user->getId(),
            'voter_username' => $user->getUsername(),
        ]);
        return $notification;
    }

    /**
     * 发送消息
     *
     * @param UserInterface[]|UserInterface $participant
     * @param $notification
     */
    public function sendNotification($participant, $notification)
    {
        $participants = is_array($participant) ? $participant : [$participant];
        $this->notificationManager->sendNotification($participants, $notification, true);
    }

    public function __destruct()
    {
        $this->notificationManager->flush();
    }
}