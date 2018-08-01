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

use PHPDish\Bundle\PostBundle\Event\CategoryFollowedEvent;

final class FollowCategoryListener extends EventListener
{
    /**
     * 专栏被关注时给专栏创建者发消息.
     *
     * @param CategoryFollowedEvent $event
     *
     * @return bool
     */
    public function onCategoryFollowed(CategoryFollowedEvent $event)
    {
        if ($event->getCategory()->getCreator() === $event->getFollower()) {
            return false;
        }

        return $this->notificationManager->createFollowCategoryNotification($event->getCategory(), $event->getFollower()) !== false;
    }
}
