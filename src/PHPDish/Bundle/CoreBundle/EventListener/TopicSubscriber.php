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

use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\ReplyTopicEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteReplyEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteTopicEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class TopicSubscriber extends NotificationManagerAwareEventListener implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::TOPIC_REPLIED => 'onTopicReplied',
            Events::TOPIC_VOTED => 'onTopicVoted',
            Events::REPLY_VOTED => 'onReplyVoted',
        ];
    }

    /**
     * 话题被回复时触发.
     *
     * @param ReplyTopicEvent $event
     *
     * @return bool
     */
    public function onTopicReplied(ReplyTopicEvent $event)
    {
        if ($event->getTopic()->getUser() === $event->getReply()->getUser()) {
            return false;
        }

        return $this->notificationManager->createReplyTopicNotification($event->getTopic(), $event->getReply()) !== false;
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
        $this->notificationManager->createVoteTopicNotification($event->getTopic(), $event->getVoter());
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
        $this->notificationManager->createVoteReplyNotification(
            $event->getTopic(),
            $event->getReply(),
            $event->getVoter()
        );
    }
}
