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

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;

abstract class NotificationManagerAwareEventListener
{
    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    public function __construct(NotificationManagerInterface $notificationManager)
    {
        $this->notificationManager = $notificationManager;
    }

    /**
     * 获取 notification manager
     * @return NotificationManagerInterface
     */
    public function getNotificationManager()
    {
        return $this->notificationManager;
    }
}
