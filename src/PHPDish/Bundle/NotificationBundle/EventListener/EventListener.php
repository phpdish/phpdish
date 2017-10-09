<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;

abstract class EventListener
{
    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    public function __construct(NotificationManagerInterface $notificationManager)
    {
        $this->notificationManager = $notificationManager;
    }
}