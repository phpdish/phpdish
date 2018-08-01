<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\EventListener;

use PHPDish\Bundle\CoreBundle\Util\NotificationHelper;
use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;
use PHPDish\Bundle\PostBundle\Event\CommentMentionUserEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostCommentedEvent;
use PHPDish\Bundle\PostBundle\Event\VoteCommentEvent;
use PHPDish\Bundle\PostBundle\Event\VotePostEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PostSubscriber implements EventSubscriberInterface
{
    /**
     * @var NotificationHelper
     */
    protected $notificationHelper;

    public function __construct(NotificationHelper $notificationHelper)
    {
        $this->notificationHelper = $notificationHelper;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::POST_COMMENTED => 'onPostCommented',
            Events::POST_VOTED => 'onPostVoted',
            Events::COMMENT_VOTED => 'onCommentVoted',
            Events::USER_MENTIONED_COMMENT => 'onUserMentioned',
            Events::CATEGORY_FOLLOWED => 'onCategoryFollowed'
        ];
    }

    /**
     * 文章被评论时触发.
     *
     * @param PostCommentedEvent $event
     */
    public function onPostCommented(PostCommentedEvent $event)
    {
        if ($event->getPost()->getUser() === $event->getComment()->getUser()) {
            return;
        }

        $notification = $this->notificationHelper->createCommentPostNotification($event->getPost(), $event->getComment());

        $this->notificationHelper->sendNotification($event->getPost()->getUser(), $notification);
    }

    /**
     * 文章被点赞触发.
     *
     * @param VotePostEvent $event
     *
     */
    public function onPostVoted(VotePostEvent $event)
    {
        if ($event->getPost()->getUser() === $event->getVoter()) {
            return;
        }

        $this->notificationHelper
            ->createVotePostNotification($event->getPost(), $event->getVoter());
    }

    /**
     * 评论被点赞时触发.
     *
     * @param VoteCommentEvent $event
     */
    public function onCommentVoted(VoteCommentEvent $event)
    {
        //自己点赞自己不用通知
        if ($event->getComment()->getUser() === $event->getVoter()) {
            return;
        }
        $this->notificationHelper->createVoteCommentNotification(
            $event->getPost(),
            $event->getComment(),
            $event->getVoter()
        );
    }

    /**
     * 当用户在文章评论中被提及.
     *
     * @param CommentMentionUserEvent $event
     */
    public function onUserMentioned(CommentMentionUserEvent $event)
    {
        foreach ($event->getMentionedUsers() as $user) {
            if (
                $event->getComment()->getUser() === $user
                || $event->getComment()->getPost()->getUser() === $user
            ) {
                continue;
            }
            $this->notificationHelper->createMentionUserInPostNotification($event->getComment());
        }
    }

    /**
     * 专栏被关注时给专栏创建者发消息.
     *
     * @param CategoryFollowedEvent $event
     */
    public function onCategoryFollowed(CategoryFollowedEvent $event)
    {
        if ($event->getCategory()->getCreator() === $event->getFollower()) {
            return;
        }
        $this->notificationHelper->createFollowCategoryNotification($event->getCategory(), $event->getFollower());
    }
}
