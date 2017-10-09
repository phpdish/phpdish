<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\UserBundle\Event\UserFollowedEvent;

final class FollowUserListener extends EventListener
{
    /**
     * 用户被关注时，生成通知
     * @param UserFollowedEvent $event
     */
    public function onFollowUser(UserFollowedEvent $event)
    {
        $this->notificationManager->createFollowUserNotification($event->getUser(), $event->getFollower());
    }
}