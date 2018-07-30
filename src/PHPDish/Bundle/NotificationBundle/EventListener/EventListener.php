<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface2;

abstract class EventListener
{
    /**
     * @var NotificationManagerInterface2
     */
    protected $notificationManager;

    public function __construct(NotificationManagerInterface2 $notificationManager)
    {
        $this->notificationManager = $notificationManager;
    }
}
