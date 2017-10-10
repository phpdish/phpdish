<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;

final class FollowCategoryListener extends EventListener
{
    /**
     * 专栏被关注时给专栏创建者发消息
     * @param CategoryFollowedEvent $event
     * @return boolean
     */
    public function onCategoryFollowed(CategoryFollowedEvent $event)
    {
        if ($event->getCategory()->getCreator() === $event->getFollower()) {
            return false;
        }
        return $this->notificationManager->createFollowCategoryNotification($event->getCategory(), $event->getFollower()) !== false;
    }
}