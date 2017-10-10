<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\UserBundle\Event\UserFollowedEvent;

final class FollowUserListener extends EventListener
{
    /**
     * 用户被关注时，生成通知
     * @param UserFollowedEvent $event
     * @return boolean
     */
    public function onUserFollowed(UserFollowedEvent $event)
    {
        if ($event->getUser() === $event->getFollower()) {
            return false;
        }
        return $this->notificationManager->createFollowUserNotification($event->getUser(), $event->getFollower()) !== false;
    }
}