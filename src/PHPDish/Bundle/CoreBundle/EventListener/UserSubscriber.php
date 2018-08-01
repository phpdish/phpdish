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
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserFollowedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class UserSubscriber implements EventSubscriberInterface
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
            Events::USER_FOLLOWED => 'onUserFollowed'
        ];
    }

    /**
     * 用户被关注时，生成通知.
     *
     * @param UserFollowedEvent $event
     *
     */
    public function onUserFollowed(UserFollowedEvent $event)
    {
        if ($event->getUser() === $event->getFollower()) {
            return;
        }
        $notification = $this->notificationHelper->createFollowUserNotification($event->getFollower());
        $this->notificationHelper->sendNotification($event->getUser(), $notification);
    }
}
