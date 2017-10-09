<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\ForumBundle\Event\TopicRepliedEvent;

final class ReplyTopicListener extends EventListener
{
    /**
     * 话题被回复时触发
     * @param TopicRepliedEvent $event
     */
    public function onReplyTopic(TopicRepliedEvent $event)
    {
        $this->notificationManager->createReplyTopicNotification($event->getTopic(), $event->getReply());
    }
}