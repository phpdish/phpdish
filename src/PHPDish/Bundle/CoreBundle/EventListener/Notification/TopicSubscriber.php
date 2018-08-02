<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\EventListener\Notification;

use PHPDish\Bundle\CoreBundle\Util\NotificationHelper;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\ReplyMentionUserEvent;
use PHPDish\Bundle\ForumBundle\Event\ReplyTopicEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteReplyEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteTopicEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class TopicSubscriber implements EventSubscriberInterface
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
            Events::TOPIC_REPLIED => 'onTopicReplied',
            Events::TOPIC_VOTED => 'onTopicVoted',
            Events::REPLY_VOTED => 'onReplyVoted',
            Events::USER_MENTIONED_REPLY => 'onUserMentioned'
        ];
    }

    /**
     * 话题被回复时触发.
     *
     * @param ReplyTopicEvent $event
     */
    public function onTopicReplied(ReplyTopicEvent $event)
    {
        if ($event->getTopic()->getUser() === $event->getReply()->getUser()) {
            return;
        }
        $notification = $this->notificationHelper->createReplyTopicNotification($event->getTopic(), $event->getReply());

        $this->notificationHelper->sendNotification($event->getTopic()->getUser(), $notification);
    }

    /**
     * 话题被点赞时触发.
     *
     * @param VoteTopicEvent $event
     */
    public function onTopicVoted(VoteTopicEvent $event)
    {
        //自己点赞自己不用通知
        if ($event->getTopic()->getUser() === $event->getVoter()) {
            return;
        }
        $notification = $this->notificationHelper->createVoteTopicNotification($event->getTopic(), $event->getVoter());

        $this->notificationHelper->sendNotification($event->getTopic()->getUser(), $notification);
    }

    /**
     * 回复被点赞时触发.
     *
     * @param VoteReplyEvent $event
     */
    public function onReplyVoted(VoteReplyEvent $event)
    {
        //自己点赞自己不用通知
        if ($event->getReply()->getUser() === $event->getVoter()) {
            return;
        }
        $notification = $this->notificationHelper->createVoteReplyNotification(
            $event->getTopic(),
            $event->getReply(),
            $event->getVoter()
        );

        $this->notificationHelper->sendNotification($event->getReply()->getUser(), $notification);
    }

    /**
     * 当用户在话题回复中被提及.
     *
     * @param ReplyMentionUserEvent $event
     */
    public function onUserMentioned(ReplyMentionUserEvent $event)
    {
        //不能艾特自己, 不能艾特楼主，楼主本身就会收到消息
        $author = $event->getReply()->getUser();
        $maintainer = $event->getReply()->getTopic()->getUser();

        $participants = array_filter($event->getMentionedUsers(), function($user) use ($author, $maintainer){
            return $user !== $author && $user !== $maintainer;
        });
        $notification = $this->notificationHelper->createMentionUserInTopicNotification($event->getReply());

        $this->notificationHelper->sendNotification($participants, $notification);
    }

}
