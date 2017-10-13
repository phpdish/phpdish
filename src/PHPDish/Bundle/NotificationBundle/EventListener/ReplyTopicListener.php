<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\ForumBundle\Event\TopicRepliedEvent;

final class ReplyTopicListener extends EventListener
{
    /**
     * 话题被回复时触发.
     *
     * @param TopicRepliedEvent $event
     *
     * @return bool
     */
    public function onTopicReplied(TopicRepliedEvent $event)
    {
        if ($event->getTopic()->getUser() === $event->getReply()->getUser()) {
            return false;
        }

        return $this->notificationManager->createReplyTopicNotification($event->getTopic(), $event->getReply()) !== false;
    }
}
